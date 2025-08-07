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

  // Instagram OAuth URL 생성
  const getInstagramAuthUrl = () => {
    const clientId = import.meta.env.VITE_FACEBOOK_APP_ID;
    const redirectUri = `${window.location.origin}/instagram/callback`;
    // 개발 모드: 테스트 사용자로 추가된 계정만 사용 가능
    // 프로덕션: App Review 통과 후 모든 사용자 사용 가능
    const scope = 'email,public_profile,instagram_basic,instagram_content_publish,pages_show_list,pages_read_engagement';
    const responseType = 'code';
    const state = Math.random().toString(36).substring(7); // CSRF 보호용

    // State를 sessionStorage에 저장
    sessionStorage.setItem('instagram_oauth_state', state);

    return `https://www.facebook.com/v21.0/dialog/oauth?` +
      `client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&response_type=${responseType}` +
      `&state=${state}`;
  };

  // Instagram Business Login 시작
  const handleInstagramBusinessLogin = () => {
    setIsLoading(true);
    setError(null);

    const authUrl = getInstagramAuthUrl();
    
    // 팝업 창으로 열기
    const width = 600;
    const height = 700;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    const popup = window.open(
      authUrl,
      'Instagram Business Login',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
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
            Instagram Business API를 통해 콘텐츠를 자동으로 관리하세요
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
              <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  필요한 권한
                </h3>
                <ul className="text-sm space-y-1 text-blue-800">
                  <li>✓ Instagram 비즈니스 계정 접근</li>
                  <li>✓ 콘텐츠 게시 및 관리</li>
                  <li>✓ 페이지 인사이트 조회</li>
                  <li className="text-amber-600 text-xs mt-2">
                    ※ 개발 모드: 테스트 사용자만 로그인 가능
                  </li>
                </ul>
              </div>

              <Button
                onClick={handleInstagramBusinessLogin}
                disabled={isLoading}
                size="lg"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    연동 중...
                  </>
                ) : (
                  <>
                    <Instagram className="mr-2 h-5 w-5" />
                    Instagram Business 계정으로 로그인
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                로그인 시 Facebook의 OAuth 2.0을 통해 안전하게 인증됩니다
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
          <Tabs defaultValue="business" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="business">비즈니스 계정 전환</TabsTrigger>
              <TabsTrigger value="api">API 설정</TabsTrigger>
            </TabsList>
            
            <TabsContent value="business" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Instagram 비즈니스 계정 전환 방법</h4>
                <ol className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="font-semibold text-pink-500">1.</span>
                    Instagram 앱에서 프로필로 이동
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-pink-500">2.</span>
                    설정 → 계정 → 계정 유형 전환
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-pink-500">3.</span>
                    '비즈니스'를 선택하고 카테고리 설정
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-pink-500">4.</span>
                    연락처 정보 입력 (선택사항)
                  </li>
                </ol>
                
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    비즈니스 계정으로 전환해도 기존 팔로워나 게시물은 그대로 유지됩니다.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>
            
            <TabsContent value="api" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">개발 모드 설정</h4>
                <div className="space-y-2 text-sm">
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <p className="font-medium mb-2 text-amber-800">🔧 테스트 사용자 추가 필요</p>
                    <ol className="text-xs space-y-1 text-amber-700">
                      <li>1. Facebook 개발자 콘솔 → 앱 대시보드</li>
                      <li>2. 역할(Roles) → 테스트 사용자(Test Users)</li>
                      <li>3. 테스트할 계정 추가</li>
                      <li>4. 해당 계정으로만 로그인 가능</li>
                    </ol>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium mb-1">앱 ID</p>
                    <code className="text-xs bg-white px-2 py-1 rounded">
                      {import.meta.env.VITE_FACEBOOK_APP_ID || '설정 필요'}
                    </code>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium mb-1">리디렉션 URL (등록 필수)</p>
                    <code className="text-xs bg-white px-2 py-1 rounded">
                      {window.location.origin}/instagram/callback
                    </code>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://developers.facebook.com/apps', '_blank')}
                  className="w-full"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Facebook 개발자 콘솔 열기
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