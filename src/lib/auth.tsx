import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type SessionUser = { name: string; email: string };

type StoredUser = SessionUser & { password: string };

type AuthContextValue = {
  user: SessionUser | null;
  ready: boolean;
  signup: (name: string, email: string, password: string) => string | null;
  login: (email: string, password: string) => string | null;
  logout: () => void;
};

const USERS_KEY = "wlt.users";
const SESSION_KEY = "wlt.session";

export const studioAccount = {
  name: "William L. Todd",
  email: "appleseed20240717@gmail.com",
  password: "admin2026",
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const users = readUsers().filter((entry) => entry.email !== studioAccount.email);
      users.push({ ...studioAccount });
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const session = JSON.parse(raw) as SessionUser;
        if (session?.email && session?.name) setUser(session);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
    setReady(true);
  }, []);

  const signup = (name: string, email: string, password: string) => {
    const users = readUsers();
    const normalized = email.trim().toLowerCase();
    if (users.some((entry) => entry.email === normalized)) {
      return "An account with this email already exists on this device.";
    }
    const next = { name: name.trim(), email: normalized, password };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, next]));
    const session = { name: next.name, email: next.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return null;
  };

  const login = (email: string, password: string) => {
    const normalized = email.trim().toLowerCase();
    const found = readUsers().find((entry) => entry.email === normalized && entry.password === password);
    if (!found) return "Those credentials do not match an account on this device.";
    const session = { name: found.name, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return null;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, ready, signup, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
