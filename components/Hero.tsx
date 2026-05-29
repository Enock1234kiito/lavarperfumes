import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { images } from "@/lib/images";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full bg-[var(--background)]"
    >
      <div className="mx-auto grid max-w-[1500px] grid-cols-[1.05fr_0.95fr] items-center gap-4 px-5 py-8 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:px-16 lg:py-28 xl:gap-24 xl:px-20 xl:py-32">
        {/* Text — left */}
        <div className="max-w-xl lg:max-w-none">
          <p className="mb-3 text-[10px] uppercase tracking-[0.45em] text-muted sm:mb-5 sm:text-[11.5px] lg:text-[12px]">
            Eau de Parfum · 2026
          </p>
          <h1 className="font-serif text-[26px] font-light leading-[1.04] tracking-[-0.012em] text-foreground sm:text-[52px] lg:text-[88px] xl:text-[104px]">
            Fragrance is
            <br />
            how you speak
            <br />
            <em className="not-italic">without words.</em>
          </h1>

          <p className="mt-5 text-[9px] uppercase tracking-[0.32em] text-foreground/80 sm:mt-7 sm:text-[11px] lg:mt-10 lg:text-[12.5px] lg:tracking-[0.38em]">
            <span className="block">Crafted to be felt.</span>
            <span className="mt-1 block font-medium text-foreground">
              Made to be remembered.
            </span>
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 sm:mt-9 sm:gap-6 lg:mt-12 lg:gap-8">
            <a
              href="#collections"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--button-dark)] px-5 py-3 text-[9.5px] uppercase tracking-[0.28em] text-background transition-transform duration-500 hover:-translate-y-0.5 sm:gap-3 sm:px-7 sm:py-4 sm:text-[11.5px] lg:px-9 lg:py-[18px] lg:text-[12.5px] lg:tracking-[0.32em]"
            >
              Discover Collections
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45 sm:h-4 sm:w-4 lg:h-[18px] lg:w-[18px]"
                strokeWidth={1.4}
              />
            </a>
            <a
              href="/story"
              className="group inline-flex items-center gap-2 text-[9.5px] uppercase tracking-[0.28em] text-foreground sm:text-[11.5px] lg:text-[12.5px] lg:tracking-[0.32em]"
            >
              <span className="border-b border-foreground/40 pb-1 transition-colors group-hover:border-foreground">
                Our Story
              </span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4 lg:h-[18px] lg:w-[18px]"
                strokeWidth={1.4}
              />
            </a>
          </div>
        </div>

        {/* Image — right */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm sm:aspect-[4/5] lg:aspect-[3/4] xl:aspect-[4/5]">
          <Image
            src={images.hero}
            alt="Lavara perfume showcase"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Decorative footer line — desktop only */}
      <div className="mx-auto hidden max-w-[1500px] items-center justify-between border-t border-[var(--border-light)] px-16 py-5 text-[10px] uppercase tracking-[0.45em] text-muted lg:flex xl:px-20">
        <span>Nº 01 · Quiet Luxury</span>
        <span>Scroll ↓</span>
      </div>
    </section>
  );
}
