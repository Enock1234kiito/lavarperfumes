"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { products as fallbackProducts } from "@/lib/data";
import { firebaseReady } from "@/lib/firebase";
import { subscribeProducts } from "@/lib/products";
import type { Product } from "@/lib/types";

const WHATSAPP = "233537729075";

function whatsappLink(product: Product) {
  const text = encodeURIComponent(
    `Hi Lavara, I'd like to order ${product.name} (${product.category}) — GH₵${product.price}. Please let me know availability.`,
  );
  return `https://wa.me/${WHATSAPP}?text=${text}`;
}

export default function BestSellers() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!firebaseReady) return;
    const unsub = subscribeProducts(
      (live) => {
        if (live.length > 0) setProducts(live);
      },
      (err) => console.error("Firestore subscription failed:", err),
    );
    return unsub;
  }, []);

  function prevProduct() { setCurrent((i) => (i - 1 + products.length) % products.length); }
  function nextProduct() { setCurrent((i) => (i + 1) % products.length); }

  return (
    <section
      id="bestsellers"
      className="relative bg-background py-12 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-12">
        <div className="mb-10 flex flex-col items-center text-center sm:mb-12 lg:mb-16">
          <span className="mb-4 text-[10px] uppercase tracking-[0.45em] text-muted sm:mb-5">
            Best Sellers
          </span>
          <h2 className="font-serif text-[30px] font-light leading-[1.1] tracking-[-0.005em] sm:text-[42px] lg:text-[58px]">
            Loved by <em className="not-italic">Thousands</em>
          </h2>
          <p className="mt-4 max-w-lg text-[13px] leading-[1.7] text-muted sm:mt-5 sm:text-[14px]">
            Four scents our customers return to — each composed in small
            batches, in the Lavara atelier.
          </p>
        </div>

        {/* Mobile: single product with prev/next buttons */}
        <div className="lg:hidden">
          {products[current] && <ProductCard key={products[current].id} product={products[current]} mobile />}

          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              onClick={prevProduct}
              aria-label="Previous product"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-light)] text-foreground transition-colors hover:border-foreground"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <span className="text-[11px] uppercase tracking-[0.32em] text-muted">
              {current + 1} / {products.length}
            </span>
            <button
              onClick={nextProduct}
              aria-label="Next product"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-light)] text-foreground transition-colors hover:border-foreground"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, mobile }: { product: Product; mobile?: boolean }) {
  const imgs = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];
  const [active, setActive] = useState(0);
  const hasMultiple = imgs.length > 1;
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  function prev() { setActive((i) => (i - 1 + imgs.length) % imgs.length); }
  function next() { setActive((i) => (i + 1) % imgs.length); }

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
    <article className={`group relative ${mobile ? "w-full" : ""}`}>
      <div
        className="relative aspect-[3/4] overflow-hidden bg-background/40 touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={imgs[active]}
          alt={`${product.name} — ${product.category} fragrance by Lavara`}
          fill
          sizes="(min-width: 1024px) 22vw, 75vw"
          className="object-cover object-center transition-all duration-500"
        />

        {hasMultiple && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-foreground sm:h-8 sm:w-8 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-foreground sm:h-8 sm:w-8 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {imgs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active === i
                      ? "w-5 bg-white"
                      : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3 sm:mt-5">
        <div>
          <h3 className="font-serif text-[18px] font-light tracking-[-0.005em] sm:text-[20px]">
            {product.name}
          </h3>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted sm:text-[10.5px]">
            {product.category}
          </p>
        </div>
        <span className="font-serif text-[16px] font-light sm:text-[18px]">GH₵{product.price}</span>
      </div>

      <a
        href={whatsappLink(product)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-foreground sm:mt-4 sm:text-[10.5px]"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="border-b border-foreground/40 pb-1 transition-colors group-hover:border-foreground">
          Order on WhatsApp
        </span>
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.4}
        />
      </a>
    </article>
  );
}
