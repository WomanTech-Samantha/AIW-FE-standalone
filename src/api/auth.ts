const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  profileImage?: string;
  hasOnboarded: boolean;
  storeName?: string;
  business?: string;
  color?: string;
  theme?: string;
  template?: string;
  subdomain?: string;
  brandImageUrl?: string;
  tagline?: string;
  loginType: 'email' | 'google' | 'kakao' | 'naver';
  socialId?: string;
  isEmailVerified: boolean;
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    language: 'ko' | 'en';
    timezone: string;
  };
  status: 'active' | 'inactive' | 'suspended';
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    refreshToken: string;
    user: User;
  };
  message?: string;
  timestamp: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

class AuthAPI {
  private getHeaders(token?: string) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw data;
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // 회원가입
  async signup(payload: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  }): Promise<AuthResponse> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // 로그인
  async login(email: string, password: string): Promise<AuthResponse> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // 소셜 로그인
  async socialLogin(provider: string, accessToken: string, idToken?: string): Promise<AuthResponse> {
    return this.request(`/auth/social/${provider}`, {
      method: 'POST',
      body: JSON.stringify({ accessToken, idToken }),
    });
  }

  // 토큰 갱신
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  // 토큰 검증
  async validateToken(token: string): Promise<{ success: boolean; data: { user: User } }> {
    return this.request('/auth/validate', {
      method: 'GET',
      headers: this.getHeaders(token),
    });
  }

  // 로그아웃
  async logout(token: string): Promise<{ success: boolean; message: string }> {
    return this.request('/auth/logout', {
      method: 'POST',
      headers: this.getHeaders(token),
    });
  }

  // 이메일 중복 확인
  async checkEmail(email: string): Promise<{
    success: boolean;
    data: {
      available: boolean;
      message: string;
    };
  }> {
    return this.request('/auth/check-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // 비밀번호 변경
  async changePassword(
    token: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<{ success: boolean; message: string }> {
    return this.request('/auth/change-password', {
      method: 'PATCH',
      headers: this.getHeaders(token),
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    });
  }

  // 사용자 정보 조회
  async getUser(token: string): Promise<{ success: boolean; data: { user: User } }> {
    return this.request('/users/me', {
      method: 'GET',
      headers: this.getHeaders(token),
    });
  }

  // 사용자 정보 수정
  async updateUser(
    token: string,
    data: {
      name?: string;
      phone?: string;
      profileImage?: string;
    }
  ): Promise<{ success: boolean; data: { user: User }; message: string }> {
    return this.request('/users/me', {
      method: 'PATCH',
      headers: this.getHeaders(token),
      body: JSON.stringify(data),
    });
  }

  // 사용자 설정 조회
  async getUserPreferences(token: string): Promise<{
    success: boolean;
    data: {
      preferences: User['preferences'];
    };
  }> {
    return this.request('/users/preferences', {
      method: 'GET',
      headers: this.getHeaders(token),
    });
  }

  // 사용자 설정 수정
  async updateUserPreferences(
    token: string,
    preferences: Partial<User['preferences']>
  ): Promise<{
    success: boolean;
    data: { preferences: User['preferences'] };
    message: string;
  }> {
    return this.request('/users/preferences', {
      method: 'PATCH',
      headers: this.getHeaders(token),
      body: JSON.stringify(preferences),
    });
  }
}

export const authAPI = new AuthAPI();