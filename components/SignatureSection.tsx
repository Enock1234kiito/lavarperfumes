import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { featuredProduct } from "@/lib/data";
import { images } from "@/lib/images";

export default function SignatureSection() {
  const p = featuredProduct;

  return (
    <section
      id="signature"
      className="relative bg-[var(--section-beige)] py-12 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-12">
        {/* Mobile: image first, then text + details stacked */}
        {/* Desktop: 3-column grid */}
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-16">
          {/* Image — shown first on mobile via order */}
          <div className="order-1 group relative h-[280px] overflow-hidden rounded-lg sm:h-[400px] lg:order-2 lg:h-[640px]">
            <Image
              src={images.signature}
              alt="Guests discovering VEIL Eau de Parfum at an outdoor summer tasting"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
          </div>

          {/* Left text */}
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <span className="mb-4 text-[10px] uppercase tracking-[0.45em] text-muted sm:mb-6">
              Signature Collection
            </span>
            <h2 className="font-serif text-[28px] font-light leading-[1.1] tracking-[-0.005em] sm:text-[34px] lg:text-[50px]">
              Timeless Scents
              <br />
              Crafted with
              <br />
              <em className="not-italic text-foreground/90">Rare Ingredients.</em>
            </h2>
            <p className="mt-5 max-w-[360px] text-[13.5px] leading-[1.75] text-muted sm:mt-7 sm:text-[14.5px]">
              Each Lavara composition is shaped slowly — by hand, by season, by
              scent memory. From Mysore sandalwood to Calabrian bergamot, every
              note is sourced for character, not volume.
            </p>
            <a
              href="#bestsellers"
              className="group mt-7 inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.28em] text-foreground sm:mt-9 sm:text-[12px]"
            >
              <span className="border-b border-foreground/50 pb-1 transition-colors group-hover:border-foreground">
                Explore Collection
              </span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.4}
              />
            </a>
          </div>

          {/* Right product details */}
          <div className="order-3 flex flex-col justify-center">
            <span className="mb-4 text-[10px] uppercase tracking-[0.45em] text-muted sm:mb-6">
              Featured · {p.category}
            </span>
            <h3 className="font-serif text-[26px] font-light tracking-[-0.005em] sm:text-[32px] lg:text-[40px]">
              {p.name}
            </h3>
            <p className="mt-3 text-[13px] leading-[1.7] text-muted sm:text-[13.5px]">
              {p.description}
            </p>

            <dl className="mt-6 space-y-4 border-t border-[var(--border-light)] pt-5 sm:mt-8 sm:space-y-5 sm:pt-6">
              <NoteRow label="Top Notes" values={p.notes.top} />
              <NoteRow label="Heart Notes" values={p.notes.heart} />
              <NoteRow label="Base Notes" values={p.notes.base} />
            </dl>

            <div className="mt-7 flex items-center justify-between border-t border-[var(--border-light)] pt-4 sm:mt-9 sm:pt-5">
              <span className="font-serif text-xl font-light sm:text-2xl">GH₵{p.price}</span>
              <a
                href="#bestsellers"
                className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em]"
              >
                <span className="border-b border-foreground/50 pb-1 transition-colors group-hover:border-foreground">
                  Shop Now
                </span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.4}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NoteRow({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-[10.5px] uppercase tracking-[0.32em] text-muted">
        {label}
      </dt>
      <dd className="max-w-[60%] text-right text-[13px] text-foreground/85">
        {values.join(" · ")}
      </dd>
    </div>
  );
}
