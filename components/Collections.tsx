import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    name: "Woody",
    slug: "woody",
    tagline: "Grounded.\nDeep. Timeless.",
    image: "/images/woody.png",
  },
  {
    name: "Fresh",
    slug: "fresh",
    tagline: "Clean.\nCrisp. Invigorating.",
    image: "/images/Fresh.png",
  },
  {
    name: "Floral",
    slug: "floral",
    tagline: "Soft.\nElegant. Expressive.",
    image: "/images/Floral.png",
  },
  {
    name: "Edible",
    slug: "edible",
    tagline: "Warm.\nIndulgent. Addictive.",
    image: "/images/Edible.png",
  },
  {
    name: "Warm",
    slug: "warm",
    tagline: "Sensual.\nRich. Comforting.",
    image: "/images/Warm.png",
  },
  {
    name: "Body Care",
    slug: "body-care",
    tagline: "Nourish.\nSoften. Glow.",
    image: "/images/Body care.png",
  },
];

export default function Collections() {
  return (
    <section
      id="collections"
      className="bg-[var(--section-beige)] py-12 sm:py-20 lg:py-28 xl:py-32"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-6 lg:px-16 xl:px-20">
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-14 lg:mb-20">
          <div>
            <p className="font-serif text-[14px] italic text-muted sm:text-[15px] lg:text-[18px]">
              Explore
            </p>
            <h2 className="mt-1 font-serif text-[26px] font-light leading-[1.05] tracking-[-0.01em] sm:mt-2 sm:text-[42px] lg:text-[64px] xl:text-[76px]">
              Our Collections
            </h2>
          </div>
          <Link
            href="/gallery"
            className="group inline-flex shrink-0 items-center gap-2 border-b border-foreground/50 pb-1 text-[10.5px] uppercase tracking-[0.32em] text-foreground transition-colors hover:border-foreground sm:text-[11.5px] lg:text-[12.5px] lg:tracking-[0.36em]"
          >
            View All
            <ArrowRight
              className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 lg:h-3.5 lg:w-3.5"
              strokeWidth={1.4}
            />
          </Link>
        </div>

        <ul className="grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6 lg:gap-6 xl:gap-8">
          {collections.map((c) => (
            <li
              key={c.name}
              className="group relative aspect-[1/1.6] overflow-hidden sm:aspect-[1/1.8] lg:aspect-[1/2.2]"
            >
              <Link
                href={`/gallery?category=${c.slug}`}
                aria-label={`Explore ${c.name}`}
                className="absolute inset-0 block"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(min-width: 1024px) 15vw, 31vw"
                  className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/0 to-black/70 transition-opacity duration-700 group-hover:from-black/15 group-hover:to-black/80" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-2 text-background sm:gap-2 sm:p-3 lg:gap-3 lg:p-5">
                  <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] sm:text-[11px] lg:text-[13px] lg:tracking-[0.28em]">
                    {c.name}
                  </p>
                  <p className="hidden whitespace-pre-line text-[9.5px] leading-[1.45] text-background/85 sm:block sm:text-[10.5px] lg:text-[12.5px] lg:leading-[1.55]">
                    {c.tagline}
                  </p>
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-background/70 text-background transition-all duration-500 group-hover:border-background group-hover:bg-background/10 sm:h-7 sm:w-7 lg:mt-2 lg:h-9 lg:w-9">
                    <ArrowRight
                      className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 lg:h-4 lg:w-4"
                      strokeWidth={1.4}
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
