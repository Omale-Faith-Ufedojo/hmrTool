import { useState, useEffect } from "react";

const STORAGE_KEY = "faithmed_user";

export default function useAuth() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  function signIn({ email }) {
    if (!email) return { ok: false };
    const u = { id: Date.now(), email };
    setUser(u);
    return { ok: true, user: u };
  }

  function signOut() {
    setUser(null);
  }

  return { user, signIn, signOut };
}
