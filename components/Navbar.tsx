"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { Menu, User, X } from "lucide-react";

import { auth } from "@/lib/firebase";
import { useAdminAuth } from "@/lib/useAdminAuth";
import SignInModal from "./SignInModal";

const leftLinks = [
  { label: "Shop", href: "#bestsellers" },
  { label: "Collections", href: "#signature" },
  { label: "About", href: "#story" },
  { label: "Journal", href: "#journal" },
];

export default function Navbar() {
  const router = useRouter();
  const { isAdmin, ready } = useAdminAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function onAdminClick() {
    if (!ready) return;
    if (isAdmin) {
      router.push("/admin");
    } else {
      setSignInOpen(true);
    }
  }

  async function onAdminSignOut() {
    if (auth) await signOut(auth);
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-colors duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-[var(--border-light)]/60"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center px-5 py-4 sm:px-6 sm:py-5 lg:px-12 lg:py-6">
          {/* Left links (desktop) / hamburger (mobile) */}
          <div className="flex flex-1 items-center">
            <ul className="hidden items-center gap-9 text-[13px] uppercase tracking-[0.18em] text-foreground/85 md:flex">
              {leftLinks.map((l) => (
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

            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="md:hidden text-foreground"
            >
              <Menu className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>

          {/* Center logo */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center text-center"
          >
            <span className="font-serif text-[22px] font-light tracking-[0.5em] text-foreground sm:text-[26px] md:text-[30px]">
              LAVARA
            </span>
            <span className="mt-0.5 text-[8px] uppercase tracking-[0.45em] text-muted sm:text-[9px]">
              Perfume
            </span>
          </Link>

          {/* Right icons */}
          <div className="flex flex-1 items-center justify-end gap-5 text-foreground/90 md:gap-6">
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
          </div>
        </nav>
      </header>

      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
            <span className="font-serif text-[22px] tracking-[0.5em]">
              LAVARA
            </span>
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
          <ul className="mt-10 flex flex-col items-center gap-7 text-center sm:mt-12 sm:gap-8">
            {leftLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-serif text-2xl font-light tracking-wide sm:text-3xl"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {ready ? (
              <li className="mt-2 text-[11px] uppercase tracking-[0.32em] text-muted">
                {isAdmin ? (
                  <>
                    <button
                      onClick={() => {
                        setOpen(false);
                        router.push("/admin");
                      }}
                      className="hover:text-foreground"
                    >
                      Manage stock
                    </button>
                    <span className="mx-3 opacity-50">·</span>
                    <button
                      onClick={() => {
                        setOpen(false);
                        onAdminSignOut();
                      }}
                      className="hover:text-foreground"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setOpen(false);
                      setSignInOpen(true);
                    }}
                    className="hover:text-foreground"
                  >
                    Admin
                  </button>
                )}
              </li>
            ) : null}
          </ul>
        </div>
      )}
    </>
  );
}
