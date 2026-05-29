import { Leaf, Droplet, Globe, Lock, Sparkles } from "lucide-react";

const features = [
  { Icon: Leaf, label: "Finest\nIngredients" },
  { Icon: Sparkles, label: "Long Lasting\nPerformance" },
  { Icon: Droplet, label: "Crafted\nWith Care" },
  { Icon: Globe, label: "Worldwide\nShipping" },
  { Icon: Lock, label: "Secure\nPayment" },
];

export default function FeatureBadges() {
  return (
    <section className="bg-[var(--section-beige)] py-6 sm:py-10 lg:py-14">
      <div className="mx-auto max-w-[1400px] px-3 sm:px-6 lg:px-12">
        <ul className="grid grid-cols-5 gap-2 sm:gap-6 lg:gap-10">
          {features.map(({ Icon, label }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-2 text-center sm:gap-3"
            >
              <Icon
                className="h-6 w-6 text-foreground sm:h-7 sm:w-7 lg:h-8 lg:w-8"
                strokeWidth={1.2}
              />
              <span className="whitespace-pre-line text-[9px] uppercase tracking-[0.18em] leading-[1.4] text-foreground/85 sm:text-[10px] sm:tracking-[0.22em] lg:text-[11px]">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
