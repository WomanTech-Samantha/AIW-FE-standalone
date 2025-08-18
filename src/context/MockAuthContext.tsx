import React, { createContext, useContext, useState, useCallback } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  onboardingCompleted?: boolean;
  hasOnlineStore?: boolean;
  hasOnboarded?: boolean;
  storeName?: string;
  storeUrl?: string;
  bio?: string;
  profileImage?: string;
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
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  socialLogin: (provider: any, userData: any) => Promise<void>;
  signup: (payload: { email: string; password: string; name: string; phone?: string }) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: (profile: Partial<User>) => void;
  updateUserProfile: (profile: Partial<User>) => void;
  checkEmail: (email: string) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<void>;
  resetDemo: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // localStorage에서 사용자 데이터 복원
  const getInitialUser = (): User => {
    try {
      const savedUser = localStorage.getItem('demo_user_data');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (error) {
      console.error('Failed to load user data from localStorage:', error);
    }
    
    // 기본값
    return {
      id: "demo-user-001",
      email: "demo@example.com",
      name: "데모 사용자",
      phone: "010-1234-5678",
      onboardingCompleted: false,
      hasOnlineStore: false
    };
  };

  const [user, setUser] = useState<User>(getInitialUser());
  const [isLoading] = useState(false);

  const isAuthenticated = true;

  const login: AuthContextValue["login"] = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const socialLogin: AuthContextValue["socialLogin"] = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const signup: AuthContextValue["signup"] = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const logout = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const checkEmail = async (): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return true;
  };

  const completeOnboarding: AuthContextValue["completeOnboarding"] = (profile) => {
    const updatedUser = user ? {
      ...user,
      ...profile,
      onboardingCompleted: true,
      hasOnlineStore: true,
      hasOnboarded: true
    } : null;
    
    if (updatedUser) {
      setUser(updatedUser);
      // localStorage에 저장
      try {
        localStorage.setItem('demo_user_data', JSON.stringify(updatedUser));
        console.log('User data saved to localStorage:', updatedUser);
      } catch (error) {
        console.error('Failed to save user data to localStorage:', error);
      }
    }
  };

  const updateUserProfile = useCallback((profile: Partial<User>) => {
    const updatedUser = user ? {
      ...user,
      ...profile
    } : null;
    
    if (updatedUser) {
      setUser(updatedUser);
      // localStorage에 저장
      try {
        localStorage.setItem('demo_user_data', JSON.stringify(updatedUser));
        console.log('User profile updated:', updatedUser);
      } catch (error) {
        console.error('Failed to save user data to localStorage:', error);
      }
    }
  }, [user]);

  const changePassword = async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const resetDemo = useCallback(() => {
    // localStorage 초기화
    try {
      localStorage.removeItem('demo_user_data');
      localStorage.removeItem('has_online_store');
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
    
    // 사용자 상태 초기화
    const initialUser: User = {
      id: "demo-user-001",
      email: "demo@example.com", 
      name: "데모 사용자",
      phone: "010-1234-5678",
      onboardingCompleted: false,
      hasOnlineStore: false
    };
    
    setUser(initialUser);
    console.log('Demo data reset completed');
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    socialLogin,
    signup,
    logout,
    completeOnboarding,
    updateUserProfile,
    checkEmail,
    changePassword,
    resetDemo
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};