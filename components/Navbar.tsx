"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { Menu, ShoppingBag, User, X } from "lucide-react";

import { auth } from "@/lib/firebase";
import { useAdminAuth } from "@/lib/useAdminAuth";
import SignInModal from "./SignInModal";

const leftLinks = [
  { label: "Shop", href: "/gallery" },
  { label: "Collections", href: "/#collections" },
  { label: "About", href: "/story" },
];

function scrollToTopIfSamePath(pathname: string, href: string) {
  const [hrefPath] = href.split("#");
  if (hrefPath === pathname && typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

type MoreLink =
  | { label: string; href: string }
  | { label: string; action: "open-chat" };

const moreLinks: MoreLink[] = [
  { label: "Our Story", href: "/story" },
  { label: "Gallery", href: "/gallery" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Help & Chat", action: "open-chat" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAdmin, ready } = useAdminAuth();
  const [signInOpen, setSignInOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function onAdminClick() {
    if (!ready) return;
    if (isAdmin) router.push("/admin");
    else setSignInOpen(true);
  }

  async function onAdminSignOut() {
    if (auth) await signOut(auth);
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[var(--background)]">
        <nav className="mx-auto flex max-w-[1500px] items-center px-5 py-4 sm:px-6 sm:py-5 lg:px-16 lg:py-7 xl:px-20">
          {/* Left: hamburger (mobile) + desktop links */}
          <div className="flex flex-1 items-center gap-4">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="text-foreground transition-colors hover:text-foreground md:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={1.3} />
            </button>

            <ul className="hidden items-center gap-9 text-[13px] uppercase tracking-[0.18em] text-foreground/85 md:flex">
              {leftLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={() => scrollToTopIfSamePath(pathname, l.href)}
                    className="transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Center logo */}
          <Link
            href="/"
            onClick={() => scrollToTopIfSamePath(pathname, "/")}
            className="flex flex-col items-center justify-center text-center"
          >
            <span className="font-serif text-[22px] font-light tracking-[0.4em] text-foreground sm:text-[26px] sm:tracking-[0.5em] md:text-[30px]">
              LAVARA
            </span>
            <span className="mt-0.5 text-[8px] uppercase tracking-[0.45em] text-muted sm:text-[9px]">
              Perfumes
            </span>
          </Link>

          {/* Right icons */}
          <div className="flex flex-1 items-center justify-end gap-4 text-foreground/90 sm:gap-5 md:gap-6">
            <button
              onClick={onAdminClick}
              aria-label={isAdmin ? "Open admin" : "Admin sign-in"}
              title={isAdmin ? "Manage stock" : "Admin sign-in"}
              className="relative hidden md:inline-flex transition-colors hover:text-foreground"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.25} />
              {isAdmin ? (
                <span
                  aria-hidden="true"
                  className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-foreground"
                />
              ) : null}
            </button>
            <Link
              href="/gallery"
              aria-label="Shop"
              className="relative inline-flex text-foreground transition-colors hover:text-foreground"
            >
              <ShoppingBag className="h-[20px] w-[20px]" strokeWidth={1.25} />
              <span
                aria-hidden="true"
                className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[8.5px] font-medium text-background"
              >
                0
              </span>
            </Link>
          </div>
        </nav>
      </header>

      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />

      {/* Mobile menu sheet */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-foreground/40" />
          <div
            className="absolute inset-y-0 left-0 w-[78%] max-w-[320px] bg-[var(--background)] px-6 pt-6 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-serif text-[20px] tracking-[0.4em]">
                LAVARA
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-light)] text-foreground transition-colors hover:border-foreground"
              >
                <X className="h-4 w-4" strokeWidth={1.4} />
              </button>
            </div>
            <ul className="flex flex-col gap-1">
              {moreLinks.map((l) => (
                <li key={l.label}>
                  {"href" in l ? (
                    <Link
                      href={l.href}
                      onClick={() => {
                        setMenuOpen(false);
                        scrollToTopIfSamePath(pathname, l.href);
                      }}
                      className="block border-b border-[var(--border-light)] py-4 font-serif text-[18px] font-light"
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        window.dispatchEvent(new Event("lavara:open-chat"));
                      }}
                      className="block w-full border-b border-[var(--border-light)] py-4 text-left font-serif text-[18px] font-light"
                    >
                      {l.label}
                    </button>
                  )}
                </li>
              ))}
              {ready && isAdmin ? (
                <>
                  <li>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        router.push("/admin");
                      }}
                      className="block w-full border-b border-[var(--border-light)] py-4 text-left font-serif text-[18px] font-light"
                    >
                      Manage Stock
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onAdminSignOut();
                      }}
                      className="block w-full border-b border-[var(--border-light)] py-4 text-left font-serif text-[18px] font-light"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
