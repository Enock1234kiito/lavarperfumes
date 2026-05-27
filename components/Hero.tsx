import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { images } from "@/lib/images";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden lg:min-h-[88vh]"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-6 px-5 pt-6 pb-10 sm:gap-10 sm:px-6 sm:pt-8 sm:pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:px-12 lg:pt-12 lg:pb-20">
        <div className="relative z-10 max-w-xl">
          <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-muted sm:mb-6 sm:text-[11px]">
            Eau de Parfum · 2026
          </p>

          <h1 className="font-serif text-[36px] font-light leading-[1.05] tracking-[-0.01em] text-foreground sm:text-[58px] lg:text-[78px]">
            A fragrance
            <br />
            that <em className="not-italic">lingers</em>
            <br />
            like memory.
          </h1>

          <p className="mt-5 max-w-[420px] text-[14px] leading-[1.7] text-muted sm:mt-8 sm:text-[15px]">
            Soft on skin. Powerful in presence. Crafted for the quiet luxury era —
            where rare ingredients meet the patience of the artisan.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-6">
            <a
              href="#bestsellers"
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--button-dark)] px-6 py-3.5 text-[11px] uppercase tracking-[0.28em] text-background transition-transform duration-500 hover:-translate-y-0.5 sm:px-7 sm:py-4 sm:text-[12px]"
            >
              Discover Collection
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45"
                strokeWidth={1.4}
              />
            </a>

            <a
              href="#story"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-foreground sm:text-[12px]"
            >
              <span className="border-b border-foreground/40 pb-1 transition-colors group-hover:border-foreground">
                Experience Lavara
              </span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.4}
              />
            </a>
          </div>
        </div>

        <div className="relative h-[300px] w-full overflow-hidden rounded-lg sm:h-[460px] lg:h-[640px]">
          <Image
            src={images.hero}
            alt="Guests sampling VEIL Eau de Parfum at an intimate evening launch event"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-6 hidden text-[10px] uppercase tracking-[0.45em] text-muted lg:block lg:left-12">
        Nº 01 · Quiet Luxury
      </div>
      <div className="absolute bottom-8 right-6 hidden text-[10px] uppercase tracking-[0.45em] text-muted lg:block lg:right-12">
        Scroll ↓
      </div>
    </section>
  );
}
