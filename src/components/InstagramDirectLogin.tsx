import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context/MockAuthContext";
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
  const { setInstagramConnection } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Instagram API with Instagram Login OAuth URL 생성
  const getInstagramAuthUrl = () => {
    const clientId = import.meta.env.VITE_INSTAGRAM_APP_ID;
    // .env에서 redirect_uri 가져오기 (없으면 현재 origin 사용)
    const redirectUri = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI || `${window.location.origin}/instagram/callback`;
    const state = Math.random().toString(36).substring(7);
    
    console.log('Instagram Auth URL 생성:', { clientId, redirectUri });
    
    // sessionStorage에 state 저장 (CSRF 보호)
    sessionStorage.setItem('instagram_oauth_state', state);
    
    // Instagram Login OAuth 엔드포인트
    const baseUrl = 'https://www.instagram.com/oauth/authorize';
    
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      state: state,
      // Instagram API with Instagram Login 새로운 권한 (2025년 1월 27일부터 필수)
      scope: 'instagram_business_basic,instagram_business_content_publish,instagram_business_manage_messages,instagram_business_manage_comments'
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

  // 개발용 액세스 토큰으로 직접 테스트
  const handleDirectTokenTest = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const devAccessToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
      const businessAccountId = import.meta.env.VITE_INSTAGRAM_BUSINESS_ACCOUNT_ID;

      if (!devAccessToken || !businessAccountId) {
        throw new Error('개발용 토큰 또는 비즈니스 계정 ID가 설정되지 않았습니다.');
      }

      console.log('개발용 토큰으로 API 테스트 시작:', { 
        token: devAccessToken.substring(0, 20) + '...', 
        accountId: businessAccountId 
      });

      // Instagram Graph API로 사용자 정보 조회
      const userInfoUrl = `https://graph.instagram.com/${businessAccountId}?fields=id,username,account_type,media_count&access_token=${devAccessToken}`;
      
      const response = await fetch(userInfoUrl);
      const userData = await response.json();
      
      console.log('Instagram API 응답:', userData);

      if (userData.error) {
        throw new Error(`Instagram API 오류: ${userData.error.message}`);
      }

      // 성공적으로 데이터를 받았으면 연동 완료 상태로 설정
      setAccessToken(devAccessToken);
      setUserInfo({
        id: userData.id,
        username: userData.username,
        name: userData.username,
        account_type: userData.account_type || 'BUSINESS',
        media_count: userData.media_count || 0
      });

      // 로컬 스토리지에 저장
      localStorage.setItem('instagram_access_token', devAccessToken);
      localStorage.setItem('instagram_user', JSON.stringify({
        id: userData.id,
        username: userData.username,
        name: userData.username,
        account_type: userData.account_type || 'BUSINESS',
        media_count: userData.media_count || 0
      }));
      localStorage.setItem('instagram_connected', 'true');
      
      // MockAuth 상태 업데이트
      setInstagramConnection(true);

      console.log('Instagram 연동 완료:', userData.username);

      if (onSuccess) {
        onSuccess({
          access_token: devAccessToken,
          user: userData
        });
      }

    } catch (err: any) {
      console.error('Instagram API 호출 실패:', err);
      setError(err.message);
      if (onError) {
        onError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 연동 상태 확인
  useEffect(() => {
    // localStorage에서 기존 연동 정보 확인
    const token = localStorage.getItem('instagram_access_token');
    const userStr = localStorage.getItem('instagram_user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setAccessToken(token);
        setUserInfo(user);
        console.log('기존 Instagram 연동 정보 로드:', user.username);
        
        // MockAuth 상태 업데이트 
        setInstagramConnection(true);
        
        // 기존 연동 정보 로드할 때는 onSuccess 콜백 호출하지 않음
        // (새로 연동할 때만 호출하도록 함)
      } catch (e) {
        console.error('Instagram 사용자 정보 파싱 실패:', e);
        localStorage.removeItem('instagram_access_token');
        localStorage.removeItem('instagram_user');
        localStorage.removeItem('instagram_connected');
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* 메인 로그인 카드 */}
      <Card className="border-2">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-center mb-4">
            <Instagram className="h-12 w-12 text-pink-500" />
          </div>
          <CardTitle className="text-xl text-center">Instagram 비즈니스 계정 연동하기</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!accessToken ? (
            <>
              {/* 연동 버튼 */}
              <Button 
                onClick={handleDirectTokenTest}
                disabled={isLoading}
                className="w-full bg-pink-500 text-white hover:bg-pink-600"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    연동 중...
                  </>
                ) : (
                  <>
                    <Instagram className="mr-2 h-5 w-5" />
                    데모 계정 연결
                  </>
                )}
              </Button>
            </>
          ) : (
            // 연동 완료 상태
            <div className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">연동 완료</AlertTitle>
                <AlertDescription className="text-green-700">
                  Instagram 계정이 성공적으로 연동되었습니다
                </AlertDescription>
              </Alert>

              {userInfo && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">사용자명</span>
                    <span className="font-medium">@{userInfo.username}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">계정 유형</span>
                    <span className="font-medium">{userInfo.account_type}</span>
                  </div>
                  {userInfo.media_count !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">게시물 수</span>
                      <span className="font-medium">{userInfo.media_count}</span>
                    </div>
                  )}
                </div>
              )}

              <Button 
                onClick={() => {
                  localStorage.removeItem('instagram_access_token');
                  localStorage.removeItem('instagram_user');
                  localStorage.removeItem('instagram_connected');
                  setInstagramConnection(false);
                  setAccessToken(null);
                  setUserInfo(null);
                }}
                variant="outline"
                className="w-full"
              >
                연동 해제
              </Button>
            </div>
          )}

          {/* 에러 메시지 */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

    </div>
  );
};

export default InstagramDirectLogin;