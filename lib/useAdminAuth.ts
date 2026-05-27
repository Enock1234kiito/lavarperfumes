"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { adminEmail, auth, firebaseReady } from "./firebase";

export type AuthState = {
  loading: boolean;
  user: User | null;
  isAdmin: boolean;
  ready: boolean;
};

export function useAdminAuth(): AuthState {
  const [state, setState] = useState<AuthState>({
    loading: true,
    user: null,
    isAdmin: false,
    ready: firebaseReady,
  });

  useEffect(() => {
    if (!auth) {
      setState({ loading: false, user: null, isAdmin: false, ready: false });
      return;
    }
    const unsub = onAuthStateChanged(auth, (user) => {
      const allowed = adminEmail.length > 0 && user?.email === adminEmail;
      setState({
        loading: false,
        user,
        isAdmin: Boolean(user && allowed),
        ready: true,
      });
    });
    return unsub;
  }, []);

  return state;
}
