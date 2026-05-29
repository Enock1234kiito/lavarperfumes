"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { products as fallbackProducts } from "@/lib/data";
import { firebaseReady } from "@/lib/firebase";
import { subscribeProducts } from "@/lib/products";
import type { Product } from "@/lib/types";
import { COLLECTIONS, categoryToSlug, findCollection } from "@/lib/collections";

const WHATSAPP = "233537729075";

function whatsappLink(product: Product) {
  const text = encodeURIComponent(
    `Hi Lavara, I'd like to order ${product.name} (${product.category}) — GH₵${product.price}. Please let me know availability.`,
  );
  return `https://wa.me/${WHATSAPP}?text=${text}`;
}

export default function GalleryGrid() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const activeCollection = categoryParam ? findCollection(categoryParam) : null;

  const [products, setProducts] = useState<Product[]>(fallbackProducts);

  useEffect(() => {
    if (!firebaseReady) return;
    return subscribeProducts(
      (live) => {
        if (live.length > 0) setProducts(live);
      },
      (err) => console.error("Firestore subscription failed:", err),
    );
  }, []);

  const filtered = useMemo(() => {
    if (!activeCollection) return products;
    return products.filter(
      (p) => categoryToSlug(p.category) === activeCollection.slug,
    );
  }, [products, activeCollection]);

  const heading = activeCollection ? activeCollection.name : "All Fragrances";

  return (
    <section className="bg-background py-10 sm:py-16 lg:py-24 xl:py-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-6 lg:px-16 xl:px-20">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between gap-4 sm:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.32em] text-foreground transition-colors hover:text-foreground sm:text-[11.5px]"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span className="border-b border-foreground/40 pb-0.5">Back</span>
          </Link>
          <span className="text-[10.5px] uppercase tracking-[0.32em] text-muted sm:text-[11.5px]">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Heading */}
        <div className="mb-7 text-center sm:mb-12 lg:mb-16">
          <p className="font-serif text-[14px] italic text-muted sm:text-[16px] lg:text-[18px]">
            Gallery
          </p>
          <h1 className="mt-1 font-serif text-[32px] font-light leading-[1.02] tracking-[-0.01em] sm:mt-2 sm:text-[52px] lg:text-[80px] xl:text-[96px]">
            {heading}
          </h1>
        </div>

        {/* Filter chips */}
        <div className="-mx-5 mb-10 overflow-x-auto px-5 sm:mx-0 sm:px-0 sm:mb-14">
          <ul className="flex min-w-max items-center gap-2 sm:justify-center sm:gap-3">
            <li>
              <Link
                href="/gallery"
                className={`block rounded-full border px-4 py-2 text-[10.5px] uppercase tracking-[0.28em] transition-colors sm:px-5 sm:py-2.5 sm:text-[11.5px] ${
                  !activeCollection
                    ? "border-foreground bg-foreground text-background"
                    : "border-[var(--border-light)] text-foreground hover:border-foreground"
                }`}
              >
                All
              </Link>
            </li>
            {COLLECTIONS.map((c) => {
              const isActive = activeCollection?.slug === c.slug;
              return (
                <li key={c.slug}>
                  <Link
                    href={`/gallery?category=${c.slug}`}
                    className={`block rounded-full border px-4 py-2 text-[10.5px] uppercase tracking-[0.28em] transition-colors sm:px-5 sm:py-2.5 sm:text-[11.5px] ${
                      isActive
                        ? "border-foreground bg-foreground text-background"
                        : "border-[var(--border-light)] text-foreground hover:border-foreground"
                    }`}
                  >
                    {c.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-[13px] text-muted">
            No products in this collection yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-20 xl:gap-x-12">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i === 0} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const imgs =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];
  const [active, setActive] = useState(0);
  const hasMultiple = imgs.length > 1;
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  function prev() {
    setActive((i) => (i - 1 + imgs.length) % imgs.length);
  }
  function next() {
    setActive((i) => (i + 1) % imgs.length);
  }

  function onTouchStart(e: React.TouchEvent) {
    if (!hasMultiple) return;
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (!touchRef.current || !hasMultiple) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    touchRef.current = null;
    if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) next();
      else prev();
    }
  }

  return (
    <article className="group flex flex-col">
      <div
        className="relative aspect-[3/4] overflow-hidden bg-[var(--section-beige)] touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={imgs[active]}
          alt={`${product.name} — ${product.category}`}
          fill
          priority={priority && active === 0}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 32vw, 48vw"
          className="object-cover object-center transition-all duration-500"
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-foreground transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-foreground transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
              {imgs.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === i ? "w-4 bg-white" : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3 sm:mt-6">
        <div className="min-w-0">
          <h3 className="font-serif text-[16px] font-light tracking-[-0.005em] sm:text-[20px] lg:text-[22px]">
            {product.name}
          </h3>
          <p className="mt-1 truncate text-[9.5px] uppercase tracking-[0.3em] text-muted sm:text-[10.5px] lg:text-[11px]">
            {product.category}
          </p>
        </div>
        <span className="shrink-0 font-serif text-[15px] font-light sm:text-[18px] lg:text-[20px]">
          GH₵{product.price}
        </span>
      </div>

      <a
        href={whatsappLink(product)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 text-[9.5px] uppercase tracking-[0.3em] text-foreground sm:text-[10.5px]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-3 w-3 sm:h-3.5 sm:w-3.5"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="border-b border-foreground/40 pb-1">Order</span>
        <ArrowUpRight
          className="h-3 w-3 sm:h-3.5 sm:w-3.5"
          strokeWidth={1.4}
        />
      </a>
    </article>
  );
}
