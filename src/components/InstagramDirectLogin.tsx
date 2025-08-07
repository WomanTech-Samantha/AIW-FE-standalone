import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Instagram, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Info,
  Link2
} from "lucide-react";

interface InstagramDirectLoginProps {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

const InstagramDirectLogin = ({ onSuccess, onError }: InstagramDirectLoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Instagram Platform OAuth URL 생성 (Business Login)
  const getInstagramAuthUrl = () => {
    const clientId = import.meta.env.VITE_FACEBOOK_APP_ID;
    const redirectUri = `${window.location.origin}/instagram/callback`;
    const state = Math.random().toString(36).substring(7);
    
    // sessionStorage에 state 저장 (CSRF 보호)
    sessionStorage.setItem('instagram_oauth_state', state);
    
    // Instagram Platform API OAuth 엔드포인트
    const baseUrl = 'https://www.facebook.com/v21.0/dialog/oauth';
    
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      state: state,
      // Instagram Business Login에 필요한 권한
      scope: 'instagram_basic,instagram_content_publish,instagram_manage_insights,instagram_manage_comments'
    });
    
    return `${baseUrl}?${params.toString()}`;
  };

  // Instagram Direct Login 시작
  const handleInstagramLogin = () => {
    setIsLoading(true);
    setError(null);

    const authUrl = getInstagramAuthUrl();
    
    // 현재 창에서 리다이렉트 (팝업 대신)
    window.location.href = authUrl;
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
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* 메인 로그인 카드 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Instagram className="h-7 w-7 text-pink-500" />
            Instagram으로 직접 로그인
          </CardTitle>
          <CardDescription>
            Facebook 페이지 없이 Instagram 계정만으로 연동하세요
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
                    <p><strong>계정:</strong> @{userInfo.username}</p>
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
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  <strong>Instagram Login 방식의 장점:</strong>
                  <ul className="mt-2 text-sm space-y-1">
                    <li>• Facebook 페이지 생성 불필요</li>
                    <li>• Instagram 계정만으로 바로 연동</li>
                    <li>• 간단한 2단계 인증 프로세스</li>
                    <li>• 콘텐츠 게시 및 인사이트 조회 가능</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleInstagramLogin}
                disabled={isLoading}
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    연동 중...
                  </>
                ) : (
                  <>
                    <Instagram className="mr-2 h-5 w-5" />
                    Instagram 계정으로 로그인
                  </>
                )}
              </Button>

              <div className="text-center text-xs text-muted-foreground">
                <p>로그인 시 Instagram의 OAuth 2.0을 통해 안전하게 인증됩니다</p>
                <p className="mt-1">비즈니스 계정 전환이 필요할 수 있습니다</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 요구사항 체크리스트 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            연동 전 체크리스트
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-5 w-5 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">1</div>
              <div className="flex-1">
                <p className="font-medium">Instagram 비즈니스 계정 전환</p>
                <p className="text-sm text-muted-foreground">
                  설정 → 계정 → 계정 유형 전환 → 비즈니스 선택
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 h-5 w-5 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">2</div>
              <div className="flex-1">
                <p className="font-medium">프로필 완성도 확인</p>
                <p className="text-sm text-muted-foreground">
                  프로필 사진, 비즈니스 카테고리, 연락처 정보 입력
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 h-5 w-5 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">3</div>
              <div className="flex-1">
                <p className="font-medium">2단계 인증 활성화 (권장)</p>
                <p className="text-sm text-muted-foreground">
                  보안 강화를 위해 2단계 인증 설정 권장
                </p>
              </div>
            </div>
          </div>
          
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>개발 모드:</strong> 현재 테스트 사용자만 로그인 가능합니다.
              Facebook 개발자 콘솔에서 테스터로 추가된 계정을 사용하세요.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstagramDirectLogin;