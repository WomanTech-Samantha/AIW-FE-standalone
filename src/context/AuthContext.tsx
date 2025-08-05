import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  email: string;
  name?: string;
  storeName?: string;
  hasOnboarded: boolean;  // 온보딩 여부

  // 온보딩 필드들
  business?: string;
  color?: string;
  theme?: string;
  template?: string;
  subdomain?: string;
  brandImageUrl?: string;
  tagline?: string;
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: { email: string; password: string; name?: string }) => Promise<void>;
  logout: () => void;
  completeOnboarding: (profile: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // 앱 시작 시 localStorage에서 복원
  useEffect(() => {
    const raw = localStorage.getItem("auth_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const isAuthenticated = !!user;

  const persist = (u: User | null) => {
    if (u) localStorage.setItem("auth_user", JSON.stringify(u));
    else localStorage.removeItem("auth_user");
    setUser(u);
  };

  const login: AuthContextValue["login"] = async (email, _password) => {
    // TODO: 실제 API 연동 시 교체
    // 데모: 이메일이 같으면 기존 계정 불러오고, 없으면 임시 계정 생성
    const raw = localStorage.getItem("auth_user");
    if (raw) {
      const existing = JSON.parse(raw) as User;
      if (existing.email === email) {
        persist(existing);
        return;
      }
    }
    const temp: User = {
      id: crypto.randomUUID(),
      email,
      name: email.split("@")[0],
      hasOnboarded: false,
    };
    persist(temp);
  };

  const signup: AuthContextValue["signup"] = async ({ email, password: _p, name }) => {
    // TODO: 실제 API 연동 시 교체
    const fresh: User = {
      id: crypto.randomUUID(),
      email,
      name,
      hasOnboarded: false,
    };
    persist(fresh);
  };

  const logout = () => {
    persist(null);
  };

  const completeOnboarding: AuthContextValue["completeOnboarding"] = (profile) => {
    if (!user) return;
    const updated: User = { ...user, ...profile, hasOnboarded: true };
    persist(updated);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated, login, signup, logout, completeOnboarding }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
