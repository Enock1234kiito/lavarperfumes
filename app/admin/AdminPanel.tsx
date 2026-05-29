"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import { deleteProduct, subscribeProducts } from "@/lib/products";
import type { Product } from "@/lib/types";
import ProductFormModal from "@/components/ProductFormModal";
import AdminChat from "@/components/AdminChat";

export default function AdminPanel({ email }: { email: string }) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);

  async function onSignOut() {
    if (auth) await signOut(auth);
    router.push("/");
  }

  useEffect(() => {
    return subscribeProducts(
      (live) => setProducts(live),
      (err) => console.error(err),
    );
  }, []);

  async function onDelete(p: Product) {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    try {
      await deleteProduct(p.id, p.imagePath);
    } catch (e: unknown) {
      alert(`Delete failed: ${(e as Error).message}`);
    }
  }

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-6 sm:py-14 lg:px-16 lg:py-24 xl:px-20">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--border-light)] pb-6 sm:items-end sm:gap-4 sm:pb-8">
        <div className="min-w-0 flex-1">
          <p className="text-[9.5px] uppercase tracking-[0.4em] text-muted sm:text-[10px] sm:tracking-[0.45em]">
            Lavara Atelier
          </p>
          <h1 className="mt-2 font-serif text-[28px] font-light leading-[1.02] tracking-[-0.01em] sm:text-[36px] lg:text-[56px] xl:text-[64px]">
            Stock Manager
          </h1>
          <p className="mt-2 break-all text-[10.5px] uppercase tracking-[0.28em] text-muted sm:text-[12px] sm:tracking-[0.32em]">
            {email}
          </p>
        </div>

        <button
          onClick={onSignOut}
          className="shrink-0 rounded-full bg-[var(--button-dark)] px-4 py-2.5 text-[10px] uppercase tracking-[0.24em] text-background sm:px-5 sm:py-3 sm:text-[11px] sm:tracking-[0.28em]"
        >
          Sign out
        </button>
      </header>

      <section className="mt-8 sm:mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-[9.5px] uppercase tracking-[0.4em] text-muted sm:text-[10px] sm:tracking-[0.45em]">
            Current Stock — {products.length}
          </h2>
          {products.length === 0 ? (
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted sm:text-[10.5px] sm:tracking-[0.3em]">
              Nothing yet — add your first below
            </span>
          ) : null}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-6 lg:grid-cols-4">
          {products.map((p) => (
            <article
              key={p.id}
              className="group relative flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-background/40">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute right-2 top-2 flex gap-1.5 sm:right-3 sm:top-3 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setEditing(p)}
                    aria-label={`Edit ${p.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/90 backdrop-blur transition-colors hover:bg-background sm:h-9 sm:w-9"
                  >
                    <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.4} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(p)}
                    aria-label={`Delete ${p.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/90 backdrop-blur transition-colors hover:bg-background sm:h-9 sm:w-9"
                  >
                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.4} />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex items-start justify-between gap-2 sm:mt-5 sm:gap-3">
                <div className="min-w-0">
                  <h3 className="truncate font-serif text-[15px] font-light tracking-[-0.005em] sm:text-[20px]">
                    {p.name}
                  </h3>
                  <p className="mt-1 truncate text-[9px] uppercase tracking-[0.25em] text-muted sm:text-[10.5px] sm:tracking-[0.3em]">
                    {p.category}
                  </p>
                </div>
                <span className="shrink-0 font-serif text-[14px] font-light sm:text-[18px]">
                  GH₵{p.price}
                </span>
              </div>
            </article>
          ))}

          <button
            type="button"
            onClick={() => setAdding(true)}
            className="group flex flex-col items-stretch text-left"
          >
            <div className="relative flex aspect-[3/4] items-center justify-center border border-dashed border-[var(--border-light)] bg-background/40 transition-colors group-hover:border-foreground">
              <div className="flex flex-col items-center gap-2 text-muted transition-colors group-hover:text-foreground sm:gap-3">
                <Plus className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.2} />
                <span className="text-[9.5px] uppercase tracking-[0.28em] sm:text-[10.5px] sm:tracking-[0.32em]">
                  Add product
                </span>
              </div>
            </div>
            <div className="mt-3 text-[9px] uppercase tracking-[0.25em] text-muted sm:mt-5 sm:text-[10.5px] sm:tracking-[0.3em]">
              New listing
            </div>
          </button>
        </div>
      </section>

      <AdminChat />

      <ProductFormModal
        open={adding}
        product={null}
        onClose={() => setAdding(false)}
      />
      <ProductFormModal
        open={Boolean(editing)}
        product={editing}
        onClose={() => setEditing(null)}
      />
    </div>
  );
}
