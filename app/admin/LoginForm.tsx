"use client";

import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!auth) {
      setError("Firebase auth is not configured. Set NEXT_PUBLIC_FIREBASE_* env vars.");
      return;
    }
    setError(null);
    setPending(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? "";
      setError(
        code === "auth/invalid-credential"
          ? "Invalid email or password."
          : `Login failed: ${code || (err as Error).message}`,
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 py-12 sm:min-h-[calc(100vh-160px)] sm:px-6 sm:py-20">
      <h1 className="font-serif text-[28px] font-light tracking-[-0.01em] sm:text-3xl">
        Atelier sign-in
      </h1>
      <p className="mt-2 text-[11px] uppercase tracking-[0.32em] text-muted sm:text-[12px]">
        Lavara Admin
      </p>

      <form onSubmit={onSubmit} className="mt-8 w-full space-y-5 sm:mt-10">
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
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[var(--button-dark)] px-7 py-4 text-[12px] uppercase tracking-[0.28em] text-background transition-opacity disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
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
        className="w-full border-b border-[var(--border-light)] bg-transparent py-2.5 text-[15px] tracking-[0.005em] text-foreground outline-none transition-colors focus:border-foreground"
      />
    </label>
  );
}
