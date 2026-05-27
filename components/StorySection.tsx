import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { images } from "@/lib/images";

export default function StorySection() {
  return (
    <section id="story" className="relative bg-background py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-12">
        {/* Mobile: text first, then single image */}
        {/* Desktop: image — text — image */}
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[1fr_1.05fr_1fr] lg:gap-14">
          {/* Left image — hidden on mobile, shown on desktop */}
          <div className="hidden group relative overflow-hidden lg:block lg:h-[560px]">
            <Image
              src={images.storyModel}
              alt="Editorial portrait — soft natural light on shoulders and neck"
              fill
              sizes="33vw"
              className="object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
          </div>

          {/* Center text */}
          <div className="order-1 flex flex-col items-center justify-center px-2 text-center lg:order-none lg:px-6">
            <span className="mb-4 text-[10px] uppercase tracking-[0.45em] text-muted sm:mb-6">
              Our Story
            </span>
            <h2 className="font-serif text-[28px] font-light leading-[1.15] tracking-[-0.005em] sm:text-[36px] lg:text-[46px]">
              Rooted in Nature.
              <br />
              <em className="not-italic">Inspired by Emotion.</em>
            </h2>
            <p className="mt-5 max-w-md text-[13.5px] leading-[1.8] text-muted sm:mt-7 sm:text-[14.5px]">
              Lavara is a slow house — composed of perfumers, growers and
              artisans who believe a fragrance should feel like a quiet ritual.
              We work in small batches, with raw materials traced from origin,
              so each bottle carries the season it was born from.
            </p>
            <a
              href="#bestsellers"
              className="group mt-7 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] sm:mt-9 sm:text-[12px]"
            >
              <span className="border-b border-foreground/50 pb-1 transition-colors group-hover:border-foreground">
                Learn Our Story
              </span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.4}
              />
            </a>
          </div>

          {/* Right image — shown on all screens */}
          <div className="order-2 group relative h-[260px] overflow-hidden rounded-lg sm:h-[360px] lg:order-none lg:h-[560px] lg:rounded-none">
            <Image
              src={images.storyStill}
              alt="Still life — perfume bottle resting on warm linen"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover object-center mix-blend-multiply transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
