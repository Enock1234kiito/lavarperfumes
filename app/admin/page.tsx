"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAdminAuth } from "@/lib/useAdminAuth";
import LoginForm from "./LoginForm";
import AdminPanel from "./AdminPanel";

export default function AdminPage() {
  const { loading, user, isAdmin, ready } = useAdminAuth();

  if (!ready) {
    return (
      <div className="mx-auto max-w-md px-6 py-32 text-center">
        <h1 className="font-serif text-2xl font-light">
          Firebase is not configured
        </h1>
        <p className="mt-4 text-[13px] leading-[1.7] text-muted">
          Copy <code>.env.local.example</code> to <code>.env.local</code>, fill
          in your Firebase web config keys, then restart the dev server. See{" "}
          <Link href="/" className="underline">
            home
          </Link>{" "}
          for the rest of the page.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-md px-6 py-32 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-muted">
          Loading…
        </p>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-6 py-32 text-center">
        <h1 className="font-serif text-2xl font-light">Not authorized</h1>
        <p className="mt-4 text-[13px] leading-[1.7] text-muted">
          The signed-in account ({user.email}) is not the configured Lavara
          admin. Set <code>NEXT_PUBLIC_ADMIN_EMAIL</code> to this address if it
          should be allowed.
        </p>
        <button
          onClick={() => auth && signOut(auth)}
          className="mt-8 rounded-full border border-[var(--border-light)] px-5 py-3 text-[11px] uppercase tracking-[0.28em]"
        >
          Sign out
        </button>
      </div>
    );
  }

  return <AdminPanel email={user.email ?? ""} />;
}
