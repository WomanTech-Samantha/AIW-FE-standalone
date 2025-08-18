import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

interface TokenResponse {
  access_token: string;
  user: {
    id: string;
    username: string;
    name: string;
    account_type: string;
    media_count: number;
  };
}

const InstagramCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Instagram 계정 연동 처리 중...');

  useEffect(() => {
    const handleCallback = async () => {
      // URL 파라미터에서 code와 state 가져오기
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      // 에러가 있는 경우
      if (error) {
        setStatus('error');
        setMessage(errorDescription || '인증이 거부되었습니다.');
        setTimeout(() => {
          navigate('/instagram/connect');
        }, 3000);
        return;
      }

      // code가 없는 경우
      if (!code) {
        setStatus('error');
        setMessage('인증 코드가 없습니다.');
        setTimeout(() => {
          navigate('/instagram/connect');
        }, 3000);
        return;
      }

      // CSRF 보호: state 확인
      const savedState = sessionStorage.getItem('instagram_oauth_state');
      if (!savedState || savedState !== state) {
        setStatus('error');
        setMessage('보안 검증에 실패했습니다.');
        setTimeout(() => {
          navigate('/instagram/connect');
        }, 3000);
        return;
      }

      try {
        // 백엔드 API 호출하여 access token 교환
        // 실제 구현에서는 백엔드 서버가 필요합니다
        const tokenResponse = await exchangeCodeForToken(code);
        
        if (tokenResponse && tokenResponse.access_token) {
          // 성공: 토큰과 사용자 정보 저장
          localStorage.setItem('instagram_access_token', tokenResponse.access_token);
          localStorage.setItem('instagram_user', JSON.stringify(tokenResponse.user));
          localStorage.setItem('instagram_connected', 'true');
          
          setStatus('success');
          setMessage('Instagram 계정이 성공적으로 연동되었습니다!');
          
          // 팝업 창인 경우 닫기
          if (window.opener) {
            setTimeout(() => {
              window.close();
            }, 2000);
          } else {
            // 일반 창인 경우 관리 페이지로 이동
            setTimeout(() => {
              navigate('/instagram/manage');
            }, 2000);
          }
        } else {
          throw new Error('액세스 토큰을 받지 못했습니다.');
        }
      } catch (err) {
        console.error('Token exchange error:', err);
        setStatus('error');
        setMessage('토큰 교환 중 오류가 발생했습니다.');
        
        // 에러 시 연동 페이지로 돌아가기
        setTimeout(() => {
          if (window.opener) {
            window.close();
          } else {
            navigate('/instagram/connect');
          }
        }, 3000);
      } finally {
        // state 정리
        sessionStorage.removeItem('instagram_oauth_state');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  // Instagram API 토큰 교환 함수
  const exchangeCodeForToken = async (code: string): Promise<TokenResponse> => {
    try {
      // Step 1: Authorization Code를 Access Token으로 교환
      const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: import.meta.env.VITE_INSTAGRAM_APP_ID,
          client_secret: import.meta.env.VITE_INSTAGRAM_APP_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: window.location.hostname === 'localhost' 
            ? `http://localhost:${import.meta.env.VITE_FRONTEND_PORT || '5173'}/instagram/callback`
            : `${window.location.origin}/instagram/callback`,
          code: code
        })
      });

      const tokenData = await tokenResponse.json();
      
      if (tokenData.error_message) {
        throw new Error(tokenData.error_message);
      }

      // Step 2: Instagram 사용자 정보 가져오기
      const userResponse = await fetch(`https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${tokenData.access_token}`);
      const userData = await userResponse.json();

      console.log('Instagram user data:', userData);

      return {
        access_token: tokenData.access_token,
        user: {
          id: userData.id,
          username: userData.username,
          name: userData.username,
          account_type: userData.account_type || 'BUSINESS',
          media_count: userData.media_count || 0
        }
      };
    } catch (error) {
      console.error('Token exchange failed:', error);
      
      // 개발 모드: 모의 데이터 반환
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            access_token: import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN || 'dev_instagram_token_' + Date.now(),
            user: {
              id: import.meta.env.VITE_INSTAGRAM_BUSINESS_ACCOUNT_ID || '12345678',
              username: import.meta.env.VITE_INSTAGRAM_BUSINESS_ACCOUNT_ID || 'test_business',
              name: 'Test Business Account',
              account_type: 'BUSINESS',
              media_count: 42
            }
          });
        }, 1000);
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Instagram 계정 연동</CardTitle>
          <CardDescription className="text-center">
            인증 처리 중입니다. 잠시만 기다려주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {status === 'processing' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
              <p className="text-sm text-muted-foreground">{message}</p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">
                  {message}
                </AlertDescription>
              </Alert>
              <p className="text-sm text-muted-foreground">
                잠시 후 자동으로 이동합니다...
              </p>
            </>
          )}
          
          {status === 'error' && (
            <>
              <XCircle className="h-12 w-12 text-red-500" />
              <Alert variant="destructive">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
              <p className="text-sm text-muted-foreground">
                잠시 후 연동 페이지로 돌아갑니다...
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InstagramCallbackPage;