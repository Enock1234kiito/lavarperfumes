"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Home, ShoppingBag, LayoutGrid, User } from "lucide-react";
import { useAdminAuth } from "@/lib/useAdminAuth";
import SignInModal from "./SignInModal";

function scrollToTopIfSamePath(pathname: string, href: string) {
  const [hrefPath] = href.split("#");
  if (hrefPath === pathname && typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAdmin, ready } = useAdminAuth();
  const [signInOpen, setSignInOpen] = useState(false);

  function onAccountClick() {
    if (!ready) return;
    if (isAdmin) router.push("/admin");
    else setSignInOpen(true);
  }

  const items = [
    { label: "Home", Icon: Home, href: "/" },
    { label: "Shop", Icon: ShoppingBag, href: "/gallery" },
    { label: "Collections", Icon: LayoutGrid, href: "/#collections" },
    {
      label: "Account",
      Icon: User,
      onClick: onAccountClick,
    },
  ];

  return (
    <>
      <nav className="sticky top-[64px] z-40 w-full border-b border-[var(--border-light)] bg-[var(--background)] md:hidden">
        <ul className="mx-auto flex max-w-[1400px] items-stretch justify-around">
          {items.map(({ label, Icon, href, onClick }) => {
            const content = (
              <>
                <Icon className="h-5 w-5" strokeWidth={1.3} />
                <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-foreground/85">
                  {label}
                </span>
              </>
            );

            return (
              <li key={label} className="flex-1">
                {href ? (
                  <Link
                    href={href}
                    onClick={() => scrollToTopIfSamePath(pathname, href)}
                    className="flex flex-col items-center justify-center px-1 py-2.5 text-foreground transition-colors hover:text-foreground"
                  >
                    {content}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={onClick}
                    className="flex w-full flex-col items-center justify-center px-1 py-2.5 text-foreground transition-colors hover:text-foreground"
                  >
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
    </>
  );
}
