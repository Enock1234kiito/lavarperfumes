import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata = {
  title: "Our Ingredients — Lavara Perfumes",
  description:
    "Explore the scent families behind Lavara — Woody, Fresh, Floral, Gourmand, and Warm & Sensual — and the ingredients we love within each.",
};

type Family = {
  name: string;
  tagline: string;
  description: string;
  ingredients: string[];
};

const families: Family[] = [
  {
    name: "Woody",
    tagline: "Grounding, elegant, and quietly confident.",
    description:
      "Woody notes bring warmth, depth, and timeless sophistication to our fragrances.",
    ingredients: [
      "Sandalwood",
      "Cedarwood",
      "Vetiver",
      "Patchouli",
      "Oud",
      "Cashmere Wood",
    ],
  },
  {
    name: "Fresh",
    tagline: "Clean, airy, and energizing.",
    description:
      "Fresh notes evoke clarity, freedom, soft mornings, and effortless confidence.",
    ingredients: [
      "Bergamot",
      "Lemon Zest",
      "Grapefruit",
      "Green Tea",
      "Marine Notes",
      "Fresh Herbs",
      "Citrus Accord",
    ],
  },
  {
    name: "Floral",
    tagline: "Soft, emotional, and expressive.",
    description:
      "Floral ingredients bring romance, depth, comfort, and quiet beauty.",
    ingredients: [
      "Jasmine",
      "Rose",
      "Orange Blossom",
      "Lavender",
      "Peony",
      "Iris",
      "Lily Accord",
    ],
  },
  {
    name: "Gourmand",
    tagline: "Comforting, addictive, and memorable.",
    description:
      "Inspired by edible notes, gourmand accords create warmth, intimacy, and desire.",
    ingredients: [
      "Vanilla",
      "Tonka Bean",
      "Caramel Accord",
      "Cocoa",
      "Honey",
      "Almond",
      "Soft Spice Notes",
    ],
  },
  {
    name: "Warm & Sensual",
    tagline: "Rich, comforting, and magnetic.",
    description:
      "Warm ingredients create a lasting trail that feels intimate and unforgettable.",
    ingredients: [
      "Amber",
      "Musk",
      "Vanilla Absolute",
      "Cinnamon",
      "Benzoin",
      "Incense",
      "Resinous Woods",
    ],
  },
];

export default function IngredientsPage() {
  return (
    <>
      <Navbar />
      <BottomNav />
      <main className="flex flex-col">
        <section className="bg-background py-10 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-[860px] px-5 sm:px-6 lg:px-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.32em] text-foreground transition-colors hover:text-foreground sm:text-[11.5px]"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span className="border-b border-foreground/40 pb-0.5">Back</span>
            </Link>

            <header className="mt-8 border-b border-[var(--border-light)] pb-8 sm:mt-12 sm:pb-10">
              <p className="text-[10.5px] uppercase tracking-[0.45em] text-muted sm:text-[11.5px]">
                The House of Lavara
              </p>
              <h1 className="mt-3 font-serif text-[34px] font-light leading-[1.02] tracking-[-0.01em] sm:text-[52px] lg:text-[80px] xl:text-[96px]">
                Our Ingredients
              </h1>
              <p className="mt-5 max-w-2xl text-[13.5px] leading-[1.8] text-muted sm:mt-7 sm:text-[14.5px]">
                At Lavara, every fragrance is built around emotion, memory, and
                atmosphere. We carefully blend scent families that feel familiar
                yet deeply expressive — crafted to linger in both presence and
                memory.
              </p>
            </header>

            <div className="mt-10 flex flex-col gap-12 sm:mt-16 sm:gap-16">
              {families.map((f, i) => (
                <section
                  key={f.name}
                  className="grid gap-6 sm:grid-cols-[1fr_1.4fr] sm:gap-10 lg:gap-14"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.45em] text-muted sm:text-[11px]">
                      {String(i + 1).padStart(2, "0")} — Scent Family
                    </p>
                    <h2 className="mt-3 font-serif text-[30px] font-light leading-[1.05] tracking-[-0.01em] sm:text-[36px] lg:text-[52px] xl:text-[60px]">
                      {f.name}
                    </h2>
                  </div>

                  <div className="flex flex-col gap-5 sm:gap-6">
                    <p className="font-serif text-[18px] font-light italic leading-[1.45] tracking-[-0.005em] text-foreground sm:text-[22px]">
                      {f.tagline}
                    </p>
                    <p className="text-[13.5px] leading-[1.8] text-foreground/85 sm:text-[14.5px]">
                      {f.description}
                    </p>

                    <div className="mt-2">
                      <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-muted sm:text-[10.5px]">
                        Ingredients we love
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {f.ingredients.map((ing) => (
                          <li
                            key={ing}
                            className="rounded-full border border-[var(--border-light)] bg-[var(--section-beige)] px-3.5 py-1.5 text-[11.5px] tracking-[0.05em] text-foreground sm:px-4 sm:py-2 sm:text-[12.5px]"
                          >
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-16 border-t border-[var(--border-light)] pt-10 text-center sm:mt-24 sm:pt-14">
              <p className="mx-auto max-w-xl font-serif text-[18px] font-light italic leading-[1.5] tracking-[-0.005em] text-foreground sm:text-[22px] lg:text-[26px]">
                Every ingredient is chosen not only for how it smells, but for
                how it makes you feel — because fragrance should do more than
                sit on skin.
              </p>

              <Link
                href="/gallery"
                className="mt-8 inline-block border border-foreground/80 px-7 py-3.5 text-[10.5px] uppercase tracking-[0.32em] text-foreground transition-colors hover:bg-foreground hover:text-background sm:mt-12 sm:px-9 sm:py-4 sm:text-[11.5px]"
              >
                Explore the Collection
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
