import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { images } from "@/lib/images";

export default function EveryScent() {
  return (
    <section
      id="story"
      className="relative isolate overflow-hidden bg-[#1b1b1b] py-16 sm:py-24 lg:py-36 xl:py-44"
    >
      <Image
        src={images.storyStill}
        alt=""
        fill
        aria-hidden
        className="absolute inset-0 -z-10 object-cover object-left opacity-65 sm:object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/15" />

      <div className="mx-auto flex max-w-[1500px] flex-col items-end px-5 text-right sm:px-6 lg:px-16 xl:px-20">
        <div className="max-w-[420px] sm:max-w-[520px] lg:max-w-[640px]">
          <p className="mb-3 text-[10px] uppercase tracking-[0.45em] text-background/60 sm:mb-5 sm:text-[11.5px] lg:text-[12.5px]">
            The Lavara Promise
          </p>
          <h2 className="font-serif text-[28px] font-light uppercase leading-[1.08] tracking-[0.02em] text-background sm:text-[44px] lg:text-[72px] xl:text-[88px]">
            Every Scent
            <br />
            Tells a Story.
          </h2>
          <p className="mt-4 text-[12.5px] leading-[1.75] text-background/75 sm:mt-7 sm:text-[14.5px] lg:mt-10 lg:text-[16px] lg:leading-[1.8]">
            From the first note to the last, Lavara creates memories that
            linger — moments suspended, presence remembered.
          </p>
          <a
            href="/gallery"
            className="group mt-7 inline-flex items-center gap-2.5 border border-background/70 px-6 py-3 text-[10.5px] uppercase tracking-[0.32em] text-background transition-colors hover:bg-background hover:text-foreground sm:mt-10 sm:gap-3 sm:px-8 sm:py-3.5 sm:text-[11.5px] lg:mt-14 lg:px-10 lg:py-4 lg:text-[12.5px] lg:tracking-[0.36em]"
          >
            Discover Now
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45 sm:h-4 sm:w-4 lg:h-[18px] lg:w-[18px]"
              strokeWidth={1.4}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
