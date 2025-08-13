import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authAPI, User, AuthResponse, ApiError } from "../api/auth";

type SocialLoginProvider = 'google' | 'kakao' | 'naver';

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  socialLogin: (provider: SocialLoginProvider, userData: any) => Promise<void>;
  signup: (payload: { email: string; password: string; name: string; phone?: string }) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: (profile: Partial<User>) => void;
  checkEmail: (email: string) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // localStorage 완전 정리 헬퍼 함수
  const clearAllLocalStorage = () => {
    const keysToRemove = [
      "auth_token",
      "refresh_token", 
      "auth_user",
      "has_online_store",
      "token"
    ];
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    console.log('🧹 localStorage 정리 완료:', keysToRemove);
  };

  // 앱 시작 시 토큰에서 사용자 정보 복원
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (token) {
          const response = await authAPI.validateToken(token);
          if (response.success) {
            setUser(response.data.user);
          } else {
            // 토큰이 유효하지 않으면 모든 관련 데이터 제거
            clearAllLocalStorage();
          }
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        // 토큰 검증 실패 시 모든 관련 데이터 제거
        clearAllLocalStorage();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const isAuthenticated = !!user && !isLoading;

  const login: AuthContextValue["login"] = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("refresh_token", response.data.refreshToken);
        setUser(response.data.user);
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.error?.message || '로그인에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin: AuthContextValue["socialLogin"] = async (provider, userData) => {
    try {
      setIsLoading(true);
      
      // 소셜 로그인은 프론트엔드에서 받은 토큰으로 백엔드 인증
      const response = await authAPI.socialLogin(provider, userData.accessToken, userData.idToken);
      
      if (response.success) {
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("refresh_token", response.data.refreshToken);
        setUser(response.data.user);
      }
    } catch (error: any) {
      console.error('Social login failed:', error);
      throw new Error(error.error?.message || '소셜 로그인에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  const signup: AuthContextValue["signup"] = async ({ email, password, name, phone }) => {
    try {
      setIsLoading(true);
      const response = await authAPI.signup({ email, password, name, phone });
      
      if (response.success) {
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("refresh_token", response.data.refreshToken);
        setUser(response.data.user);
      }
    } catch (error: any) {
      console.error('Signup failed:', error);
      throw new Error(error.error?.message || '회원가입에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        await authAPI.logout(token);
      }
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      // 모든 관련 localStorage 데이터 정리
      clearAllLocalStorage();
      setUser(null);
    }
  };

  const checkEmail = async (email: string): Promise<boolean> => {
    try {
      const response = await authAPI.checkEmail(email);
      return response.data.available;
    } catch (error) {
      console.error('Email check failed:', error);
      return false;
    }
  };

  const completeOnboarding: AuthContextValue["completeOnboarding"] = async (profile) => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        throw new Error("로그인이 필요합니다");
      }

      const response = await authAPI.completeOnboarding(token, profile as any);
      
      if (response.success) {
        // 서버에서 업데이트된 사용자 정보로 갱신
        setUser(response.data.user);
      }
    } catch (error: any) {
      console.error('Complete onboarding failed:', error);
      throw new Error(error.error?.message || '온보딩 완료에 실패했습니다');
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string, confirmPassword: string): Promise<void> => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        throw new Error("로그인이 필요합니다");
      }

      await authAPI.changePassword(token, currentPassword, newPassword, confirmPassword);
    } catch (error: any) {
      console.error('Change password failed:', error);
      throw new Error(error.error?.message || '비밀번호 변경에 실패했습니다');
    }
  };

  const value = useMemo(
    () => ({ 
      user, 
      isAuthenticated, 
      isLoading,
      login, 
      socialLogin, 
      signup, 
      logout, 
      completeOnboarding,
      checkEmail,
      changePassword
    }),
    [user, isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
