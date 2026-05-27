import Link from "next/link";
import { Mail } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Perfumes", href: "#" },
      { label: "Best Sellers", href: "#bestsellers" },
      { label: "Discovery Sets", href: "#" },
      { label: "Gift Cards", href: "#" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "Signature Collection", href: "#signature" },
      { label: "Les Intenses", href: "#" },
      { label: "Fresh & Floral", href: "#" },
      { label: "Woody & Warm", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "#story" },
      { label: "Ingredients", href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "Journal", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Help & FAQs", href: "#" },
      { label: "Shipping & Returns", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Email", href: "mailto:hello@lavara.example.com", Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative bg-background pt-12 pb-8 text-foreground sm:pt-16 sm:pb-10">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-12">
        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 border-t border-[var(--border-light)] pt-10 sm:gap-10 md:grid-cols-4 md:gap-8 lg:pt-14">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-[10px] uppercase tracking-[0.32em] text-muted sm:mb-5 sm:text-[10.5px]">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-[12.5px] text-foreground/85 sm:space-y-3 sm:text-[13px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant LAVARA brand lockup */}
        <div className="mt-14 flex flex-col items-center text-center sm:mt-20 lg:mt-28">
          <p className="max-w-md text-[12.5px] leading-[1.75] text-muted sm:text-[13.5px]">
            A slow house composing rare, lingering fragrances — drawn for the
            quiet luxury era.
          </p>

          <div className="mt-8 flex items-center gap-4 sm:mt-10">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-light)] text-foreground transition-colors hover:border-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <h2
            aria-label="Lavara"
            className="mt-10 select-none font-serif text-[13vw] font-light leading-[0.85] tracking-[0.08em] text-foreground/95 sm:mt-14 sm:text-[16vw] sm:tracking-[0.14em] lg:text-[15vw] lg:tracking-[0.18em] xl:text-[200px]"
          >
            LAVARA
          </h2>
          <span className="-mt-1 text-[9px] uppercase tracking-[0.55em] text-muted sm:text-[10px] lg:text-[11px]">
            Perfume — Est. 2026
          </span>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[var(--border-light)] pt-6 text-[10px] uppercase tracking-[0.32em] text-muted sm:mt-16 sm:gap-4 sm:pt-7 sm:text-[11px] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Lavara Maison. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
            <li>
              <Link href="#" className="hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-foreground">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
