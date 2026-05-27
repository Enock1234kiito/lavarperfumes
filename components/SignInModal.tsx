"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { X } from "lucide-react";
import { auth, firebaseReady } from "@/lib/firebase";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SignInModal({ open, onClose }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!open) return;
    setEmail("");
    setPassword("");
    setError(null);
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!firebaseReady || !auth) {
      setError("Firebase is not configured.");
      return;
    }
    setError(null);
    setPending(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
      router.push("/admin");
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? "";
      setError(
        code === "auth/invalid-credential"
          ? "Invalid email or password."
          : `Sign-in failed: ${code || (err as Error).message}`,
      );
    } finally {
      setPending(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-background px-8 py-10 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-light)] transition-colors hover:border-foreground"
        >
          <X className="h-4 w-4" strokeWidth={1.4} />
        </button>

        <p className="text-[10px] uppercase tracking-[0.45em] text-muted">
          Lavara Atelier
        </p>
        <h2 className="mt-2 font-serif text-[26px] font-light leading-tight">
          Atelier sign-in
        </h2>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            required
          />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
            required
          />

          {error ? (
            <p className="text-[12px] text-red-700/80">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[var(--button-dark)] px-7 py-4 text-[12px] uppercase tracking-[0.28em] text-background transition-opacity disabled:opacity-50"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  autoComplete,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10.5px] uppercase tracking-[0.32em] text-muted">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        className="w-full border-b border-[var(--border-light)] bg-transparent py-2.5 text-[15px] text-foreground outline-none transition-colors focus:border-foreground"
      />
    </label>
  );
}
