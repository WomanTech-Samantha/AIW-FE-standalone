import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Instagram, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Shield,
  Key,
  ExternalLink,
  Info
} from "lucide-react";

interface InstagramBusinessLoginProps {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

const InstagramBusinessLogin = ({ onSuccess, onError }: InstagramBusinessLoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Facebook Login URL 생성 (Instagram Graph API는 Facebook Login을 통해서만 접근)
  const getFacebookAuthUrl = () => {
    const clientId = import.meta.env.VITE_FACEBOOK_APP_ID;
    // 개발 환경에서는 localhost:8080 사용
    const redirectUri = window.location.hostname === 'localhost' 
      ? `http://localhost:8080/instagram/callback`
      : `${window.location.origin}/instagram/callback`;
    
    // Facebook Login v18.0 표준 스코프
    // pages_show_list: 페이지 목록 조회
    // pages_read_engagement: 페이지 인사이트
    // instagram_basic: Instagram 기본 정보
    // instagram_manage_comments: 댓글 관리
    // instagram_manage_insights: 인사이트 조회
    // instagram_content_publish: 콘텐츠 게시
    const scope = 'email,public_profile,pages_show_list,pages_read_engagement';
    
    const state = Math.random().toString(36).substring(7);
    sessionStorage.setItem('instagram_oauth_state', state);

    // Facebook OAuth Dialog v18.0
    return `https://www.facebook.com/v18.0/dialog/oauth?` +
      `client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&response_type=code` +
      `&state=${state}`;
  };

  // Facebook Login 시작
  const handleFacebookLogin = () => {
    setIsLoading(true);
    setError(null);

    const authUrl = getFacebookAuthUrl();
    
    // 새 창으로 열기 (팝업 차단 방지)
    const width = 600;
    const height = 700;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    const popup = window.open(
      authUrl,
      'Facebook Login',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes`
    );

    // 팝업 창 모니터링
    const checkPopup = setInterval(() => {
      try {
        if (popup && popup.closed) {
          clearInterval(checkPopup);
          setIsLoading(false);
          
          // 로그인 성공 여부 확인
          const token = localStorage.getItem('instagram_access_token');
          if (token) {
            setAccessToken(token);
            const savedUser = localStorage.getItem('instagram_user');
            if (savedUser) {
              setUserInfo(JSON.parse(savedUser));
            }
            if (onSuccess) {
              onSuccess({ token, user: savedUser });
            }
          }
        }
      } catch (e) {
        // 크로스 오리진 에러는 무시
      }
    }, 1000);
  };

  // 기존 연동 상태 확인
  useEffect(() => {
    const savedToken = localStorage.getItem('instagram_access_token');
    const savedUser = localStorage.getItem('instagram_user');
    
    if (savedToken && savedUser) {
      try {
        setAccessToken(savedToken);
        setUserInfo(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  // 연동 해제
  const handleDisconnect = () => {
    localStorage.removeItem('instagram_access_token');
    localStorage.removeItem('instagram_user');
    localStorage.removeItem('instagram_connected');
    setAccessToken(null);
    setUserInfo(null);
    window.location.reload();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 메인 로그인 카드 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Instagram className="h-7 w-7 text-pink-500" />
            Instagram 비즈니스 계정 연동
          </CardTitle>
          <CardDescription>
            Facebook 페이지를 통해 Instagram 비즈니스 계정을 연동합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {accessToken && userInfo ? (
            // 연동 완료 상태
            <div className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">연동 완료!</AlertTitle>
                <AlertDescription className="text-green-700">
                  <div className="mt-2 space-y-1">
                    <p><strong>계정:</strong> @{userInfo.username || userInfo.name}</p>
                    <p><strong>ID:</strong> {userInfo.id}</p>
                    {userInfo.account_type && (
                      <p><strong>계정 유형:</strong> {userInfo.account_type}</p>
                    )}
                  </div>
                </AlertDescription>
              </Alert>

              <div className="flex gap-2">
                <Button 
                  onClick={handleDisconnect}
                  variant="outline"
                  className="flex-1"
                >
                  연동 해제
                </Button>
                <Button 
                  onClick={() => window.location.href = '/instagram/manage'}
                  className="flex-1"
                >
                  관리 페이지로 이동
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            // 연동 전 상태
            <div className="space-y-6">
              <Alert className="border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800">중요 안내</AlertTitle>
                <AlertDescription className="text-amber-700 space-y-2 mt-2">
                  <p>✓ Facebook 계정으로 로그인합니다</p>
                  <p>✓ Instagram 비즈니스 계정이 Facebook 페이지에 연결되어 있어야 합니다</p>
                  <p>✓ 개발 모드에서는 테스트 사용자만 로그인 가능합니다</p>
                </AlertDescription>
              </Alert>

              <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  요청 권한
                </h3>
                <ul className="text-sm space-y-1 text-blue-800">
                  <li>✓ Facebook 페이지 접근</li>
                  <li>✓ 연결된 Instagram 계정 관리</li>
                  <li>✓ 게시물 및 인사이트 조회</li>
                </ul>
              </div>

              <Button
                onClick={handleFacebookLogin}
                disabled={isLoading}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    연동 중...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook으로 계속하기
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Facebook OAuth 2.0을 통해 안전하게 인증됩니다
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 설정 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">연동 전 준비사항</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="setup" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="setup">1. 계정 연결</TabsTrigger>
              <TabsTrigger value="test">2. 테스트 사용자</TabsTrigger>
              <TabsTrigger value="urls">3. URL 설정</TabsTrigger>
            </TabsList>
            
            <TabsContent value="setup" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Instagram을 Facebook 페이지에 연결</h4>
                <ol className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-600">1.</span>
                    Facebook 페이지 설정으로 이동
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-600">2.</span>
                    왼쪽 메뉴에서 "Instagram" 선택
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-600">3.</span>
                    "계정 연결" 클릭 후 Instagram 로그인
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-600">4.</span>
                    비즈니스 계정이어야 연결 가능
                  </li>
                </ol>
              </div>
            </TabsContent>
            
            <TabsContent value="test" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">테스트 사용자 추가 (개발 모드)</h4>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-800 mb-2">
                    Facebook 개발자 콘솔에서:
                  </p>
                  <ol className="text-xs space-y-1 text-amber-700">
                    <li>1. 앱 대시보드 → 역할 → 역할</li>
                    <li>2. "테스터 추가" 클릭</li>
                    <li>3. Facebook 사용자 ID 또는 이메일 입력</li>
                    <li>4. 초대 수락 (Facebook 알림 확인)</li>
                  </ol>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://developers.facebook.com/apps/${import.meta.env.VITE_FACEBOOK_APP_ID}/roles/roles/`, '_blank')}
                  className="w-full"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  테스터 추가 페이지 열기
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="urls" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">OAuth 리디렉션 URL 설정</h4>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-1 text-sm">Facebook 로그인 설정에 추가:</p>
                  <code className="text-xs bg-white px-2 py-1 rounded block mt-2">
                    http://localhost:8080/instagram/callback
                  </code>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700">
                    <strong>경로:</strong> Facebook 로그인 → 설정 → 유효한 OAuth 리디렉션 URI
                  </p>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://developers.facebook.com/apps/${import.meta.env.VITE_FACEBOOK_APP_ID}/fb-login/settings/`, '_blank')}
                  className="w-full"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Facebook 로그인 설정 열기
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstagramBusinessLogin;