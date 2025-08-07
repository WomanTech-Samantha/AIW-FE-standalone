import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Instagram, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

interface InstagramLoginProps {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

const InstagramLogin = ({ onSuccess, onError }: InstagramLoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [instagramUser, setInstagramUser] = useState<any>(null);

  // Facebook SDK 초기화 (Instagram Login을 위해 필요)
  useEffect(() => {
    // 먼저 localStorage에서 기존 연동 정보 확인
    const savedToken = localStorage.getItem('instagram_access_token');
    const savedUser = localStorage.getItem('instagram_user');
    
    if (savedToken && savedUser) {
      try {
        setAccessToken(savedToken);
        setInstagramUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing saved user data:', e);
        // 잘못된 데이터는 삭제
        localStorage.removeItem('instagram_user');
        localStorage.removeItem('instagram_access_token');
        localStorage.removeItem('instagram_connected');
      }
    }

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

      // SDK 로그인 상태는 확인하지만 자동 로그인은 하지 않음
      // (localStorage에 있는 데이터를 우선 사용)
      if (!savedToken) {
        window.FB.getLoginStatus(function(response: any) {
          if (response.status === 'connected') {
            console.log('Facebook SDK: User is logged in');
            // 사용자가 명시적으로 로그인하지 않는 한 자동 연동하지 않음
          }
        });
      }
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

  // Instagram Login (Facebook SDK 사용하지만 Instagram 전용 권한)
  const handleInstagramLogin = () => {
    if (!sdkLoaded || !window.FB) {
      setError("Facebook SDK가 로드되지 않았습니다.");
      return;
    }

    if (!import.meta.env.VITE_FACEBOOK_APP_ID) {
      setError("Facebook App ID가 설정되지 않았습니다. .env 파일을 확인해주세요.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Instagram Login - 단순화된 권한만 요청
    window.FB.login(
      function(response: any) {
        console.log('Instagram login response:', response);
        
        if (response.status === 'connected') {
          // 로그인 성공
          const { accessToken, userID } = response.authResponse;
          setAccessToken(accessToken);
          
          // Instagram 사용자 정보 가져오기
          fetchInstagramUserInfo(accessToken);
          
          if (onSuccess) {
            onSuccess(response);
          }
        } else if (response.status === 'not_authorized') {
          setError("앱 권한이 거부되었습니다.");
          if (onError) {
            onError({ message: "Authorization denied" });
          }
        } else {
          setError("Instagram 로그인이 취소되었습니다.");
          if (onError) {
            onError({ message: "Login cancelled" });
          }
        }
        
        setIsLoading(false);
      },
      {
        // Instagram Login에 필요한 최소 권한만 요청
        scope: 'instagram_basic,instagram_content_publish',
        // Instagram API endpoint를 사용할 수 있도록 설정
        auth_type: 'rerequest'
      }
    );
  };

  // Instagram 사용자 정보 가져오기
  const fetchInstagramUserInfo = async (token: string) => {
    try {
      // Instagram Graph API를 통해 사용자 정보 가져오기
      window.FB.api(
        '/me',
        'GET',
        {
          fields: 'id,username,account_type,media_count',
          access_token: token
        },
        function(response: any) {
          if (response && !response.error) {
            console.log('Instagram user info:', response);
            setInstagramUser(response);
            
            // 로컬 스토리지에 저장
            localStorage.setItem('instagram_user', JSON.stringify(response));
            localStorage.setItem('instagram_access_token', token);
            localStorage.setItem('instagram_connected', 'true');
          } else {
            console.error('Error fetching Instagram info:', response.error);
            setError('Instagram 사용자 정보를 가져올 수 없습니다.');
          }
        }
      );
    } catch (err) {
      console.error('Error in fetchInstagramUserInfo:', err);
      setError('Instagram 정보 조회 중 오류가 발생했습니다.');
    }
  };

  // Instagram 미디어 정보 가져오기 (선택사항)
  const fetchInstagramMedia = async (token: string) => {
    try {
      window.FB.api(
        '/me/media',
        'GET',
        {
          fields: 'id,media_type,media_url,thumbnail_url,timestamp,caption',
          limit: 10,
          access_token: token
        },
        function(response: any) {
          if (response && response.data) {
            console.log('Instagram media:', response.data);
            localStorage.setItem('instagram_recent_media', JSON.stringify(response.data));
          }
        }
      );
    } catch (err) {
      console.error('Error fetching Instagram media:', err);
    }
  };

  // 로그아웃
  const handleLogout = () => {
    if (window.FB) {
      window.FB.logout(function(response: any) {
        console.log('Logged out:', response);
        setAccessToken(null);
        setInstagramUser(null);
        localStorage.removeItem('instagram_user');
        localStorage.removeItem('instagram_access_token');
        localStorage.removeItem('instagram_connected');
        localStorage.removeItem('instagram_recent_media');
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Instagram className="h-6 w-6 text-pink-500" />
          Instagram 계정 연동
        </CardTitle>
        <CardDescription>
          Instagram 비즈니스 계정에 직접 연결하여 콘텐츠를 관리하세요
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {instagramUser ? (
          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">@{instagramUser.username}</p>
                    <p className="text-sm text-muted-foreground">
                      {instagramUser.account_type} • {instagramUser.media_count}개 게시물
                    </p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="flex-1"
              >
                연동 해제
              </Button>
              <Button 
                onClick={() => fetchInstagramMedia(accessToken!)}
                className="flex-1"
              >
                최근 게시물 확인
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">✨ 간편한 Instagram 연동</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Facebook 페이지 없이도 연동 가능</li>
                <li>• 콘텐츠 게시 및 관리</li>
                <li>• 미디어 인사이트 확인</li>
                <li>• 댓글 관리 기능</li>
              </ul>
            </div>

            <Button
              onClick={handleInstagramLogin}
              disabled={isLoading || !sdkLoaded}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  연결 중...
                </>
              ) : (
                <>
                  <Instagram className="mr-2 h-5 w-5" />
                  Instagram 계정으로 로그인
                </>
              )}
            </Button>

            {!sdkLoaded && (
              <p className="text-sm text-muted-foreground text-center">
                SDK 로딩 중...
              </p>
            )}
          </div>
        )}

        <div className="pt-4 border-t">
          <h4 className="font-semibold mb-2">필요한 권한:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Instagram 기본 정보 접근</li>
            <li>• 콘텐츠 게시 및 수정</li>
            <li>• 미디어 인사이트 조회</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            💡 Facebook 페이지 없이도 Instagram 비즈니스 계정만으로 모든 기능을 사용할 수 있습니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstagramLogin;