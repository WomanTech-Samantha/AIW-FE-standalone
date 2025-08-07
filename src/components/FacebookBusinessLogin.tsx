import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Facebook, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

interface FacebookBusinessLoginProps {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

const FacebookBusinessLogin = ({ onSuccess, onError }: FacebookBusinessLoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Facebook SDK 초기화
  useEffect(() => {
    // Facebook SDK 스크립트 로드
    const loadFacebookSDK = () => {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/ko_KR/sdk.js";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    };

    // SDK 초기화 설정
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID || '',
        cookie: true,
        xfbml: true,
        version: 'v21.0'
      });

      setSdkLoaded(true);

      // 기존 로그인 상태 확인
      window.FB.getLoginStatus(function(response: any) {
        if (response.status === 'connected') {
          console.log('Already logged in:', response);
          setAccessToken(response.authResponse.accessToken);
        }
      });
    };

    if (!window.FB) {
      loadFacebookSDK();
    } else {
      setSdkLoaded(true);
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  // 비즈니스 통합 사용자 액세스 토큰으로 로그인
  const handleBusinessLogin = () => {
    if (!sdkLoaded || !window.FB) {
      setError("Facebook SDK가 로드되지 않았습니다.");
      return;
    }

    if (!import.meta.env.VITE_FACEBOOK_CONFIG_ID) {
      setError("Facebook Config ID가 설정되지 않았습니다. .env 파일을 확인해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // 비즈니스 로그인 다이얼로그 호출
    window.FB.login(
      function(response: any) {
        console.log('Business login response:', response);
        
        if (response.status === 'connected') {
          // 로그인 성공
          const { accessToken, userID } = response.authResponse;
          setAccessToken(accessToken);
          
          // 비즈니스 계정 정보 가져오기
          fetchBusinessAccountInfo(accessToken, userID);
          
          if (onSuccess) {
            onSuccess(response);
          }
        } else if (response.status === 'not_authorized') {
          setError("앱 권한이 거부되었습니다.");
          if (onError) {
            onError({ message: "Authorization denied" });
          }
        } else {
          setError("Facebook 로그인이 취소되었습니다.");
          if (onError) {
            onError({ message: "Login cancelled" });
          }
        }
        
        setIsLoading(false);
      },
      {
        config_id: import.meta.env.VITE_FACEBOOK_CONFIG_ID,
        response_type: 'code',
        override_default_response_type: true,
        scope: 'email,public_profile,instagram_basic,instagram_content_publish,pages_show_list,pages_read_engagement,business_management'
      }
    );
  };

  // 표준 사용자 액세스 토큰으로 로그인 (폴백)
  const handleStandardLogin = () => {
    if (!sdkLoaded || !window.FB) {
      setError("Facebook SDK가 로드되지 않았습니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    window.FB.login(
      function(response: any) {
        console.log('Standard login response:', response);
        
        if (response.status === 'connected') {
          const { accessToken, userID } = response.authResponse;
          setAccessToken(accessToken);
          
          // 연결된 Instagram 비즈니스 계정 가져오기
          fetchInstagramAccounts(accessToken);
          
          if (onSuccess) {
            onSuccess(response);
          }
        } else {
          setError("Facebook 로그인이 실패했습니다.");
          if (onError) {
            onError(response);
          }
        }
        
        setIsLoading(false);
      },
      {
        scope: 'email,public_profile,instagram_basic,instagram_content_publish,pages_show_list,pages_read_engagement'
      }
    );
  };

  // 비즈니스 계정 정보 가져오기
  const fetchBusinessAccountInfo = async (token: string, userId: string) => {
    try {
      window.FB.api(
        `/me`,
        'GET',
        {
          fields: 'id,name,email',
          access_token: token
        },
        function(response: any) {
          if (response && !response.error) {
            console.log('Business account info:', response);
            // 로컬 스토리지에 저장
            localStorage.setItem('facebook_business_user', JSON.stringify(response));
            localStorage.setItem('facebook_access_token', token);
          } else {
            console.error('Error fetching business info:', response.error);
          }
        }
      );
    } catch (err) {
      console.error('Error in fetchBusinessAccountInfo:', err);
    }
  };

  // Instagram 비즈니스 계정 가져오기
  const fetchInstagramAccounts = async (token: string) => {
    try {
      // 먼저 페이지 목록 가져오기
      window.FB.api(
        '/me/accounts',
        'GET',
        {
          access_token: token
        },
        function(response: any) {
          if (response && response.data) {
            console.log('Facebook Pages:', response.data);
            
            // 각 페이지에서 Instagram 비즈니스 계정 확인
            response.data.forEach((page: any) => {
              window.FB.api(
                `/${page.id}`,
                'GET',
                {
                  fields: 'instagram_business_account',
                  access_token: page.access_token || token
                },
                function(igResponse: any) {
                  if (igResponse && igResponse.instagram_business_account) {
                    console.log('Instagram Business Account found:', igResponse);
                    // Instagram 계정 정보 저장
                    localStorage.setItem('instagram_business_account', JSON.stringify({
                      id: igResponse.instagram_business_account.id,
                      page_id: page.id,
                      page_name: page.name,
                      page_access_token: page.access_token
                    }));
                  }
                }
              );
            });
          }
        }
      );
    } catch (err) {
      console.error('Error fetching Instagram accounts:', err);
    }
  };

  // 로그아웃
  const handleLogout = () => {
    if (window.FB) {
      window.FB.logout(function(response: any) {
        console.log('Logged out:', response);
        setAccessToken(null);
        localStorage.removeItem('facebook_business_user');
        localStorage.removeItem('facebook_access_token');
        localStorage.removeItem('instagram_business_account');
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Facebook className="h-6 w-6 text-blue-600" />
          Facebook 비즈니스 로그인
        </CardTitle>
        <CardDescription>
          Instagram 비즈니스 계정을 관리하기 위해 Facebook 비즈니스 계정으로 로그인해주세요
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {accessToken ? (
          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription>
                Facebook 계정이 연결되었습니다!
              </AlertDescription>
            </Alert>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="flex-1"
              >
                로그아웃
              </Button>
              <Button 
                onClick={() => fetchInstagramAccounts(accessToken)}
                className="flex-1"
              >
                Instagram 계정 확인
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">비즈니스 통합 로그인 (권장)</h3>
              <p className="text-sm text-muted-foreground">
                비즈니스 관리자 계정을 통해 안전하게 Instagram을 연동합니다.
                장기 액세스 토큰을 사용하여 안정적인 연동이 가능합니다.
              </p>
              <Button
                onClick={handleBusinessLogin}
                disabled={isLoading || !sdkLoaded}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    연결 중...
                  </>
                ) : (
                  <>
                    <Facebook className="mr-2 h-4 w-4" />
                    비즈니스 계정으로 로그인
                  </>
                )}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">또는</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">표준 로그인</h3>
              <p className="text-sm text-muted-foreground">
                일반 Facebook 계정으로 로그인합니다.
                페이지 관리자 권한이 있는 계정이 필요합니다.
              </p>
              <Button
                onClick={handleStandardLogin}
                disabled={isLoading || !sdkLoaded}
                variant="outline"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    연결 중...
                  </>
                ) : (
                  <>
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook으로 로그인
                  </>
                )}
              </Button>
            </div>

            {!sdkLoaded && (
              <p className="text-sm text-muted-foreground text-center">
                Facebook SDK 로딩 중...
              </p>
            )}
          </div>
        )}

        <div className="pt-4 border-t">
          <h4 className="font-semibold mb-2">필요한 권한:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Instagram 비즈니스 계정 접근</li>
            <li>• 콘텐츠 게시 및 관리</li>
            <li>• 페이지 관리 권한</li>
            <li>• 비즈니스 관리자 접근 (비즈니스 로그인 시)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacebookBusinessLogin;