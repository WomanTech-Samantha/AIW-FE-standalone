import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { checkInstagramConnection, disconnectInstagram } from "@/utils/instagramAuth";
import { 
  Instagram, 
  User, 
  Image, 
  TrendingUp, 
  Settings,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Users,
  Heart,
  MessageCircle
} from "lucide-react";

const InstagramManagePage = () => {
  const navigate = useNavigate();
  const [instagramData, setInstagramData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadInstagramData();
  }, []);

  const loadInstagramData = () => {
    const connection = checkInstagramConnection();
    
    if (connection.isConnected && connection.data) {
      setInstagramData(connection.data);
    } else {
      // 연동되지 않은 경우 연동 페이지로 리다이렉션
      navigate('/instagram/connect');
      return;
    }
    
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      if (!instagramData?.token || !instagramData?.user?.id) {
        throw new Error('Instagram 연동 정보가 없습니다.');
      }

      // API 호출로 최신 데이터 갱신
      const userInfoUrl = `https://graph.instagram.com/${instagramData.user.id}?fields=id,username,account_type,media_count&access_token=${instagramData.token}`;
      
      const response = await fetch(userInfoUrl);
      const userData = await response.json();
      
      if (userData.error) {
        throw new Error(`Instagram API 오류: ${userData.error.message}`);
      }

      // 업데이트된 데이터 저장
      const updatedUser = {
        id: userData.id,
        username: userData.username,
        name: userData.username,
        account_type: userData.account_type || 'BUSINESS',
        media_count: userData.media_count || 0
      };

      localStorage.setItem('instagram_user', JSON.stringify(updatedUser));
      setInstagramData(prev => ({
        ...prev,
        user: updatedUser
      }));

    } catch (error: any) {
      console.error('데이터 갱신 실패:', error);
      alert('데이터 갱신에 실패했습니다: ' + error.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDisconnect = () => {
    if (confirm('Instagram 계정 연동을 해제하시겠습니까?')) {
      disconnectInstagram();
      localStorage.removeItem('instagram_connected');
      navigate('/instagram/connect');
    }
  };

  if (isLoading) {
    return (
      <div className="page-container flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Instagram 데이터 로드 중...</p>
        </div>
      </div>
    );
  }

  if (!instagramData) {
    return null;
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <Instagram className="h-8 w-8 text-pink-500" />
              Instagram 관리
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              연동된 Instagram 계정을 관리하고 콘텐츠를 게시하세요
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? '갱신 중...' : '데이터 갱신'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 계정 정보 */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                계정 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold">@{instagramData.user.username}</h3>
                <Badge 
                  variant={instagramData.user.account_type === 'BUSINESS' ? 'default' : 'secondary'}
                  className="mt-1"
                >
                  {instagramData.user.account_type}
                </Badge>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">계정 ID</span>
                  <span className="text-sm font-mono">{instagramData.user.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">미디어 수</span>
                  <span className="text-sm font-semibold">{instagramData.user.media_count}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">연동 상태</span>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-600">연결됨</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => window.open(`https://instagram.com/${instagramData.user.username}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Instagram에서 보기
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-red-600 hover:text-red-700"
                  onClick={handleDisconnect}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  연동 해제
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 기능 카드들 */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 콘텐츠 게시 */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/instagram/post')}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Image className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">콘텐츠 게시</h3>
                <p className="text-sm text-muted-foreground">
                  이미지와 캡션으로 Instagram에 직접 게시하세요
                </p>
              </CardContent>
            </Card>

            {/* 인사이트 */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/instagram/insights')}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">인사이트</h3>
                <p className="text-sm text-muted-foreground">
                  게시물 성과와 팔로워 분석을 확인하세요
                </p>
              </CardContent>
            </Card>

            {/* 댓글 관리 */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/instagram/comments')}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">댓글 관리</h3>
                <p className="text-sm text-muted-foreground">
                  댓글을 모니터링하고 답변하세요
                </p>
              </CardContent>
            </Card>

            {/* 미디어 라이브러리 */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/instagram/media')}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Image className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold mb-2">미디어 라이브러리</h3>
                <p className="text-sm text-muted-foreground">
                  게시된 모든 콘텐츠를 관리하세요
                </p>
              </CardContent>
            </Card>

            {/* 일정 관리 */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/calendar')}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Settings className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">일정 관리</h3>
                <p className="text-sm text-muted-foreground">
                  콘텐츠 게시 일정을 관리하세요
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramManagePage;