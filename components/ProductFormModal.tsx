"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Plus, UploadCloud, X } from "lucide-react";
import { createProduct, updateProduct } from "@/lib/products";
import type { Product } from "@/lib/types";
import { COLLECTIONS } from "@/lib/collections";

const MAX_IMAGES = 10;

type Props = {
  open: boolean;
  product?: Product | null;
  onClose: () => void;
};

const blankNotes = { top: "", heart: "", base: "" };

function joinNotes(arr: string[] | undefined): string {
  return (arr ?? []).join(", ");
}

export default function ProductFormModal({ open, product, onClose }: Props) {
  const editing = Boolean(product);

  const [name, setName] = useState("");
  const [category, setCategory] = useState(COLLECTIONS[0].name);
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState(blankNotes);
  const [files, setFiles] = useState<(File | null)[]>([null, null]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setPrice(String(product.price));
      setDescription(product.description);
      setNotes({
        top: joinNotes(product.notes.top),
        heart: joinNotes(product.notes.heart),
        base: joinNotes(product.notes.base),
      });
      const imgs = product.gallery && product.gallery.length > 0
        ? product.gallery
        : [product.image];
      setExistingImages(imgs);
      setFiles(imgs.map(() => null));
    } else {
      setName("");
      setCategory(COLLECTIONS[0].name);
      setPrice("");
      setDescription("");
      setNotes(blankNotes);
      setExistingImages([]);
      setFiles([null, null]);
    }
    setError(null);
  }, [open, product]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function addSlot() {
    setFiles((f) => [...f, null]);
    setExistingImages((imgs) => [...imgs, ""]);
  }

  function removeSlot(index: number) {
    if (files.length <= 2) return;
    setFiles((f) => f.filter((_, i) => i !== index));
    setExistingImages((imgs) => imgs.filter((_, i) => i !== index));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const hasNewFiles = files.some((f) => f !== null);
    const hasExisting = existingImages.some((img) => img);
    if (!editing && !hasNewFiles) {
      setError("Upload at least one image.");
      return;
    }
    if (editing && !hasNewFiles && !hasExisting) {
      setError("At least one image is required.");
      return;
    }

    setPending(true);
    setError(null);
    try {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const parsedNotes = {
        top: notes.top.split(",").map((s) => s.trim()).filter(Boolean),
        heart: notes.heart.split(",").map((s) => s.trim()).filter(Boolean),
        base: notes.base.split(",").map((s) => s.trim()).filter(Boolean),
      };
      const payload = {
        name,
        slug,
        description,
        price: Number(price || 0),
        category,
        featured: product?.featured ?? false,
        notes: parsedNotes,
        gallery: existingImages.filter(Boolean),
      };

      if (editing && product) {
        await updateProduct(product.id, {
          ...payload,
          imageFile: files[0] ?? undefined,
          imageName: slug,
          currentImagePath: product.imagePath,
          galleryFiles: files,
        });
      } else {
        const mainFile = files.find((f) => f !== null);
        if (!mainFile) {
          setError("Upload at least one image.");
          return;
        }
        await createProduct({
          ...payload,
          imageFile: mainFile,
          imageName: slug,
          galleryFiles: files,
        });
      }
      onClose();
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setPending(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-[1000px] overflow-y-auto bg-background shadow-2xl"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border-light)] bg-background/95 px-6 py-4 backdrop-blur lg:px-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.45em] text-muted">
              Lavara Atelier
            </p>
            <h2 className="mt-1 font-serif text-[24px] font-light leading-tight lg:text-[28px]">
              {editing ? `Edit "${product?.name}"` : "Add new product"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-light)] transition-colors hover:border-foreground"
          >
            <X className="h-4 w-4" strokeWidth={1.4} />
          </button>
        </header>

        <form
          onSubmit={onSubmit}
          className="px-6 py-8 lg:px-10 lg:py-10"
        >
          {/* Image slots */}
          <div className="mb-8">
            <span className="mb-3 block text-[10px] uppercase tracking-[0.32em] text-muted">
              Product Images (minimum 2, up to {MAX_IMAGES})
            </span>
            <div className="flex flex-wrap gap-4">
              {files.map((file, i) => (
                <ImageSlot
                  key={i}
                  index={i}
                  file={file}
                  existingSrc={existingImages[i] || null}
                  onFile={(f) =>
                    setFiles((prev) => prev.map((p, j) => (j === i ? f : p)))
                  }
                  onRemove={files.length > 2 ? () => removeSlot(i) : undefined}
                  label={i === 0 ? "Main" : `Image ${i + 1}`}
                />
              ))}
              {files.length < MAX_IMAGES && (
                <button
                  type="button"
                  onClick={addSlot}
                  className="flex h-[160px] w-[120px] flex-col items-center justify-center gap-2 border border-dashed border-[var(--border-light)] text-muted transition-colors hover:border-foreground hover:text-foreground"
                >
                  <Plus className="h-5 w-5" strokeWidth={1.2} />
                  <span className="text-[9px] uppercase tracking-[0.3em]">Add</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Name" value={name} onChange={setName} required />
            <label className="block">
              <span className="mb-1.5 block text-[10px] uppercase tracking-[0.32em] text-muted">
                Collection
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full border-b border-[var(--border-light)] bg-transparent py-2.5 text-[14px] text-foreground outline-none transition-colors focus:border-foreground"
              >
                {COLLECTIONS.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <Field
              label="Price (GH₵)"
              type="number"
              value={price}
              onChange={setPrice}
              required
            />
            <Field
              label="Slug (auto)"
              value={name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              onChange={() => {}}
              disabled
            />
            <div className="sm:col-span-2">
              <Field
                label="Description"
                value={description}
                onChange={setDescription}
                multiline
              />
            </div>
            <Field
              label="Top Notes (comma-sep)"
              value={notes.top}
              onChange={(v) => setNotes((n) => ({ ...n, top: v }))}
            />
            <Field
              label="Heart Notes (comma-sep)"
              value={notes.heart}
              onChange={(v) => setNotes((n) => ({ ...n, heart: v }))}
            />
            <Field
              label="Base Notes (comma-sep)"
              value={notes.base}
              onChange={(v) => setNotes((n) => ({ ...n, base: v }))}
            />

            <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--button-dark)] px-7 py-4 text-[11px] uppercase tracking-[0.28em] text-background transition-opacity disabled:opacity-50"
              >
                <UploadCloud className="h-4 w-4" strokeWidth={1.4} />
                {pending
                  ? editing
                    ? "Saving…"
                    : "Uploading…"
                  : editing
                    ? "Save changes"
                    : "Add product"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-[11px] uppercase tracking-[0.28em] text-muted hover:text-foreground"
              >
                Cancel
              </button>
              {error ? (
                <span className="text-[11px] text-red-700/80">{error}</span>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function ImageSlot({
  index,
  file,
  existingSrc,
  onFile,
  onRemove,
  label,
}: {
  index: number;
  file: File | null;
  existingSrc: string | null;
  onFile: (f: File | null) => void;
  onRemove?: () => void;
  label: string;
}) {
  const previewSrc = file ? URL.createObjectURL(file) : existingSrc;

  return (
    <div className="relative">
      <label className="group relative flex h-[160px] w-[120px] cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed border-[var(--border-light)] bg-background/30 transition-colors hover:border-foreground">
        {previewSrc ? (
          file ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewSrc}
              alt={`${label} preview`}
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={previewSrc}
              alt={`${label} current`}
              fill
              sizes="120px"
              className="object-cover"
            />
          )
        ) : (
          <span className="flex flex-col items-center gap-1.5 text-center text-muted">
            <UploadCloud className="h-4 w-4" strokeWidth={1.2} />
            <span className="text-[9px] uppercase tracking-[0.3em]">{label}</span>
          </span>
        )}
        {previewSrc && (
          <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center bg-foreground/70 py-1.5 text-[8px] uppercase tracking-[0.3em] text-background opacity-0 transition-opacity group-hover:opacity-100">
            Replace
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </label>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove image ${index + 1}`}
          className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background text-[10px]"
        >
          <X className="h-3 w-3" strokeWidth={2} />
        </button>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  disabled,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.32em] text-muted">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          required={required}
          disabled={disabled}
          className="w-full resize-none border-b border-[var(--border-light)] bg-transparent py-2.5 text-[14px] text-foreground outline-none transition-colors focus:border-foreground disabled:opacity-60"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          step={type === "number" ? "0.01" : undefined}
          className="w-full border-b border-[var(--border-light)] bg-transparent py-2.5 text-[14px] text-foreground outline-none transition-colors focus:border-foreground disabled:opacity-60"
        />
      )}
    </label>
  );
}
