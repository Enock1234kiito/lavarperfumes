import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

import { db, storage } from "./firebase";
import type { Product } from "./types";

const COLLECTION = "products";

function fromDoc(id: string, data: DocumentData): Product {
  return {
    id,
    name: data.name ?? "",
    slug: data.slug ?? id,
    description: data.description ?? "",
    price: typeof data.price === "number" ? data.price : Number(data.price ?? 0),
    image: data.image ?? "",
    gallery: Array.isArray(data.gallery) ? data.gallery : undefined,
    imagePath: typeof data.imagePath === "string" ? data.imagePath : undefined,
    category: data.category ?? "",
    featured: Boolean(data.featured),
    notes: {
      top: Array.isArray(data.notes?.top) ? data.notes.top : [],
      heart: Array.isArray(data.notes?.heart) ? data.notes.heart : [],
      base: Array.isArray(data.notes?.base) ? data.notes.base : [],
    },
  };
}

function createdAtMs(data: DocumentData): number {
  const v = data.createdAt;
  if (v && typeof v.toMillis === "function") return v.toMillis();
  if (typeof v === "number") return v;
  return Number.POSITIVE_INFINITY;
}

function sortAndMap(docs: QueryDocumentSnapshot[]): Product[] {
  return docs
    .slice()
    .sort((a, b) => createdAtMs(a.data()) - createdAtMs(b.data()))
    .map((d) => fromDoc(d.id, d.data()));
}

export async function fetchProducts(): Promise<Product[]> {
  if (!db) return [];
  const snap = await getDocs(collection(db, COLLECTION));
  return sortAndMap(snap.docs);
}

export function subscribeProducts(
  cb: (products: Product[]) => void,
  onError?: (err: unknown) => void,
) {
  if (!db) {
    cb([]);
    return () => {};
  }
  return onSnapshot(
    collection(db, COLLECTION),
    (snap) => cb(sortAndMap(snap.docs)),
    (err) => onError?.(err),
  );
}

export type NewProductInput = Omit<Product, "id" | "image"> & {
  imageFile: File | Blob;
  imageName?: string;
  galleryFiles?: (File | null)[];
};

async function uploadGalleryFiles(
  files: (File | null)[],
  existingGallery: string[],
  slug: string,
): Promise<string[]> {
  if (!storage) return existingGallery;
  const urls: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file) {
      const filename = `${Date.now()}-${slug}-${i}.jpg`;
      const path = `products/${filename}`;
      const fileRef = storageRef(storage, path);
      await uploadBytes(fileRef, file, {
        contentType: file.type || "image/jpeg",
      });
      urls.push(await getDownloadURL(fileRef));
    } else if (existingGallery[i]) {
      urls.push(existingGallery[i]);
    }
  }
  return urls.filter(Boolean);
}

export async function createProduct(input: NewProductInput): Promise<string> {
  if (!db || !storage) throw new Error("Firebase is not configured.");

  const safeSlug = input.slug || input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const filename = `${Date.now()}-${input.imageName ?? safeSlug}.jpg`;
  const path = `products/${filename}`;
  const fileRef = storageRef(storage, path);

  await uploadBytes(fileRef, input.imageFile, {
    contentType: input.imageFile instanceof File ? input.imageFile.type : "image/jpeg",
  });
  const imageUrl = await getDownloadURL(fileRef);

  const galleryUrls = input.galleryFiles
    ? await uploadGalleryFiles(input.galleryFiles, input.gallery ?? [], safeSlug)
    : [imageUrl];

  const docRef = await addDoc(collection(db, COLLECTION), {
    name: input.name,
    slug: safeSlug,
    description: input.description,
    price: input.price,
    image: galleryUrls[0] || imageUrl,
    gallery: galleryUrls,
    imagePath: path,
    category: input.category,
    featured: input.featured,
    notes: input.notes,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export type UpdateProductInput = Omit<Product, "id" | "image"> & {
  imageFile?: File | Blob;
  imageName?: string;
  currentImagePath?: string;
  galleryFiles?: (File | null)[];
};

export async function updateProduct(
  id: string,
  input: UpdateProductInput,
): Promise<void> {
  if (!db || !storage) throw new Error("Firebase is not configured.");

  const safeSlug =
    input.slug || input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const patch: DocumentData = {
    name: input.name,
    slug: safeSlug,
    description: input.description,
    price: input.price,
    category: input.category,
    featured: input.featured,
    notes: input.notes,
  };

  if (input.galleryFiles) {
    const galleryUrls = await uploadGalleryFiles(
      input.galleryFiles,
      input.gallery ?? [],
      safeSlug,
    );
    patch.gallery = galleryUrls;
    patch.image = galleryUrls[0] || patch.image;
  }

  if (input.imageFile && !input.galleryFiles) {
    const filename = `${Date.now()}-${input.imageName ?? safeSlug}.jpg`;
    const path = `products/${filename}`;
    const fileRef = storageRef(storage, path);
    await uploadBytes(fileRef, input.imageFile, {
      contentType:
        input.imageFile instanceof File ? input.imageFile.type : "image/jpeg",
    });
    patch.image = await getDownloadURL(fileRef);
    patch.imagePath = path;

    if (input.currentImagePath) {
      try {
        await deleteObject(storageRef(storage, input.currentImagePath));
      } catch {
        // old image may already be gone
      }
    }
  }

  await updateDoc(doc(db, COLLECTION, id), patch);
}

export async function deleteProduct(id: string, imagePath?: string) {
  if (!db) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(db, COLLECTION, id));
  if (imagePath && storage) {
    try {
      await deleteObject(storageRef(storage, imagePath));
    } catch {
      // image may already be missing — ignore
    }
  }
}
