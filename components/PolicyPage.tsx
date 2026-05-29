import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { PolicySection } from "@/lib/policies";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  sections: PolicySection[];
};

export default function PolicyPage({ eyebrow, title, intro, sections }: Props) {
  return (
    <section className="bg-background py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-[860px] px-5 sm:px-6 lg:px-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.32em] text-foreground transition-colors hover:text-foreground sm:text-[11.5px]"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          <span className="border-b border-foreground/40 pb-0.5">Back</span>
        </Link>

        {/* Heading */}
        <header className="mt-8 border-b border-[var(--border-light)] pb-8 sm:mt-12 sm:pb-10">
          <p className="text-[10.5px] uppercase tracking-[0.45em] text-muted sm:text-[11.5px]">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-[34px] font-light leading-[1.02] tracking-[-0.01em] sm:text-[52px] lg:text-[76px] xl:text-[88px]">
            {title}
          </h1>
          {intro ? (
            <p className="mt-5 max-w-2xl text-[13.5px] leading-[1.8] text-muted sm:mt-7 sm:text-[14.5px]">
              {intro}
            </p>
          ) : null}
        </header>

        {/* Sections */}
        <div className="mt-10 flex flex-col gap-12 sm:mt-14 sm:gap-16">
          {sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-6 sm:gap-8">
              <h2 className="font-serif text-[24px] font-light leading-[1.1] tracking-[-0.005em] sm:text-[32px] lg:text-[44px]">
                {section.heading}
              </h2>

              <div className="flex flex-col gap-7 sm:gap-9">
                {section.subsections.map((sub, i) => (
                  <div key={i} className="flex flex-col gap-3 sm:gap-4">
                    {sub.title ? (
                      <h3 className="text-[11px] uppercase tracking-[0.32em] text-foreground sm:text-[12px]">
                        {sub.title}
                      </h3>
                    ) : null}

                    {sub.body ? (
                      <p className="text-[13.5px] leading-[1.8] text-foreground/85 sm:text-[14.5px]">
                        {sub.body}
                      </p>
                    ) : null}

                    {sub.bullets && sub.bullets.length > 0 ? (
                      <ul className="flex flex-col gap-2.5 sm:gap-3">
                        {sub.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="flex gap-3 text-[13.5px] leading-[1.8] text-foreground/85 sm:text-[14.5px]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[12px] inline-block h-[3px] w-[3px] shrink-0 rounded-full bg-foreground/70 sm:mt-[14px]"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
