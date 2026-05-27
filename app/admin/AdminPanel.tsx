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
    <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-20">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--border-light)] pb-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.45em] text-muted">
            Lavara Atelier
          </p>
          <h1 className="mt-2 font-serif text-[36px] font-light leading-[1.05] tracking-[-0.005em] lg:text-[44px]">
            Stock Manager
          </h1>
          <p className="mt-2 text-[12px] uppercase tracking-[0.32em] text-muted">
            {email}
          </p>
        </div>

        <button
          onClick={onSignOut}
          className="rounded-full bg-[var(--button-dark)] px-5 py-3 text-[11px] uppercase tracking-[0.28em] text-background"
        >
          Sign out
        </button>
      </header>

      <section className="mt-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[10px] uppercase tracking-[0.45em] text-muted">
            Current Stock — {products.length}
          </h2>
          {products.length === 0 ? (
            <span className="text-[10.5px] uppercase tracking-[0.3em] text-muted">
              Nothing yet — add your first below
            </span>
          ) : null}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                <div className="absolute right-3 top-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditing(p)}
                    aria-label={`Edit ${p.name}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/85 backdrop-blur transition-colors hover:bg-background"
                  >
                    <Pencil className="h-4 w-4" strokeWidth={1.4} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(p)}
                    aria-label={`Delete ${p.name}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/85 backdrop-blur transition-colors hover:bg-background"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.4} />
                  </button>
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-[20px] font-light tracking-[-0.005em]">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-[10.5px] uppercase tracking-[0.3em] text-muted">
                    {p.category}
                  </p>
                </div>
                <span className="font-serif text-[18px] font-light">
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
              <div className="flex flex-col items-center gap-3 text-muted transition-colors group-hover:text-foreground">
                <Plus className="h-7 w-7" strokeWidth={1.2} />
                <span className="text-[10.5px] uppercase tracking-[0.32em]">
                  Add product
                </span>
              </div>
            </div>
            <div className="mt-5 text-[10.5px] uppercase tracking-[0.3em] text-muted">
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
