"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/data";
import { images } from "@/lib/images";

export default function Testimonial() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const t = testimonials[index];

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + total) % total);

  return (
    <section
      aria-label="Customer testimonials"
      className="relative isolate overflow-hidden bg-background py-16 sm:py-24 lg:py-36 xl:py-44"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={images.testimonialBg}
          alt=""
          fill
          aria-hidden
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-background/55" />
      </div>

      <div className="mx-auto flex max-w-[1100px] flex-col items-center px-5 text-center sm:px-6 lg:px-16">
        <span className="mb-6 text-[10px] uppercase tracking-[0.45em] text-muted sm:mb-10 sm:text-[11.5px] lg:mb-12 lg:text-[12.5px]">
          In Their Words
        </span>

        <div className="relative min-h-[140px] w-full sm:min-h-[200px] lg:min-h-[260px]">
          <blockquote className="font-serif text-[24px] font-light leading-[1.3] tracking-[-0.005em] text-foreground sm:text-[34px] lg:text-[52px] xl:text-[60px]">
            <span className="mr-1 align-top text-2xl text-muted sm:mr-2 sm:text-3xl lg:text-4xl">&ldquo;</span>
            {t.quote}
            <span className="ml-0.5 align-top text-2xl text-muted sm:ml-1 sm:text-3xl lg:text-4xl">&rdquo;</span>
          </blockquote>
        </div>

        <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-muted sm:mt-10 sm:text-[11px] lg:mt-12 lg:text-[12px]">
          — {t.name}
        </p>

        <div className="mt-8 flex items-center gap-6 sm:mt-14 sm:gap-10 lg:mt-16">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-light)] text-foreground transition-colors hover:border-foreground sm:h-11 sm:w-11"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-0.5"
              strokeWidth={1.4}
            />
          </button>

          <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-muted sm:text-[10.5px]">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-5 bg-[var(--border-light)] sm:w-6" />
            <span>{String(total).padStart(2, "0")}</span>
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-light)] text-foreground transition-colors hover:border-foreground sm:h-11 sm:w-11"
          >
            <ArrowRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5"
              strokeWidth={1.4}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
