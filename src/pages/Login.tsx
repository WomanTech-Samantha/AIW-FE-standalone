import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useSimpleKakaoLoginV2 } from "@/hooks/useSimpleKakaoLoginV2";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialLoginButton } from "@/components/ui/social-login-button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useSimpleNaverLoginV2 } from "@/hooks/useSimpleNaverLoginV2";

function LoginForm() {
  const { login, socialLogin, user, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();
  const location = useLocation() as any;

  // 이미 로그인된 사용자가 로그인 페이지에 접근하면 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      const to = location.state?.from?.pathname;
      const hasOnboarded = user?.hasOnboarded ?? JSON.parse(localStorage.getItem("auth_user") || "{}")?.hasOnboarded;
      
      if (hasOnboarded) {
        nav(to || "/studio", { replace: true });
      } else {
        nav("/onboarding", { replace: true });
      }
    }
  }, [isAuthenticated, user, nav, location]);

  const handleLoginSuccess = () => {
    const to = location.state?.from?.pathname;
    const hasOnboarded = (user?.hasOnboarded) ?? JSON.parse(localStorage.getItem("auth_user") || "{}")?.hasOnboarded;
    if (hasOnboarded) nav(to || "/studio", { replace: true });
    else nav("/onboarding", { replace: true });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await login(email, password);
      handleLoginSuccess();
    } catch (error: any) {
      const errorMessage = error.message || "로그인에 실패했습니다";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // 구글 로그인
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      
      try {
        setIsLoading(true);
        
        // access_token이 있는지 확인
        const accessToken = tokenResponse.access_token;
        
        if (!accessToken) {
          throw new Error('액세스 토큰을 받지 못했습니다.');
        }
        
        // 구글 사용자 정보 가져오기
        const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('사용자 정보를 가져올 수 없습니다.');
        }
        
        const userData = await response.json();
        
        await socialLogin('google', {
          email: userData.email,
          name: userData.name,
          picture: userData.picture
        });
        
        handleLoginSuccess();
        toast.success("구글 로그인 성공!");
      } catch (error) {
        toast.error("구글 로그인에 실패했습니다.");
        console.error('Google login error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      toast.error("구글 로그인에 실패했습니다.");
      console.error('Google login error:', error);
    },
    flow: 'implicit',  // auth-code 대신 implicit 사용
    scope: 'openid email profile'
  });

  // 카카오 로그인
  const { login: kakaoLogin } = useSimpleKakaoLoginV2({
    onSuccess: async (userData) => {
      try {
        setIsLoading(true);
        await socialLogin('kakao', {
          email: userData.email,
          name: userData.name,
          picture: userData.picture
        });
        
        handleLoginSuccess();
        toast.success("카카오 로그인 성공!");
      } catch (error) {
        toast.error("카카오 로그인에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    },
    onFailure: (error) => {
      toast.error("카카오 로그인에 실패했습니다.");
      console.error('Kakao login error:', error);
    }
  });

  // 네이버 로그인
  const { login: naverLogin } = useSimpleNaverLoginV2({
    onSuccess: async (userData) => {
      try {
        setIsLoading(true);
        await socialLogin('naver', {
          email: userData.email,
          name: userData.name || userData.nickname,
          picture: userData.profile_image
        });
        
        handleLoginSuccess();
        toast.success("네이버 로그인 성공!");
      } catch (error) {
        toast.error("네이버 로그인에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    },
    onFailure: (error) => {
      toast.error("네이버 로그인에 실패했습니다.");
      console.error('Naver login error:', error);
    }
  });

  const handleNaverLogin = () => {
    naverLogin();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-soft">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">
            로그인
          </CardTitle>
          <CardDescription className="text-gray-600">
            소셜 계정 또는 이메일로 로그인하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="space-y-2">
            <SocialLoginButton
              provider="google"
              onClick={() => googleLogin()}
              disabled={isLoading}
            />
            
            <SocialLoginButton
              provider="kakao"
              onClick={() => kakaoLogin()}
              disabled={isLoading}
            />
            
            <SocialLoginButton
              provider="naver"
              onClick={handleNaverLogin}
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">또는</span>
            </div>
          </div>

          
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">이메일</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="example@email.com"
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">비밀번호</Label>
              <Input 
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="비밀번호 입력"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                className="h-11"
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}
            <Button 
              className="w-full h-11 bg-primary text-primary-foreground hover:opacity-90" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              회원이 아니신가요?{" "}
              <Link 
                to="/signup" 
                className="font-medium text-primary hover:text-primary/80 underline underline-offset-4"
              >
                회원가입
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Login() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    console.warn('VITE_GOOGLE_CLIENT_ID is not set in environment variables');
    return <LoginForm />;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <LoginForm />
    </GoogleOAuthProvider>
  );
}
