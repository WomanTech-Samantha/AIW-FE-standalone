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
  Calendar,
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
      setIsLoading(false);
    } else {
      // 연동되지 않은 경우 연동 페이지로 리다이렉션
      navigate('/instagram/connect');
      return;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      // 배포용 모의 데이터 갱신
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      // 약간 변경된 데이터로 업데이트 (게시물 수 등)
      const updatedUser = {
        ...instagramData.user,
        media_count: instagramData.user.media_count + Math.floor(Math.random() * 3)
      };

      setInstagramData(prev => ({
        ...prev,
        user: updatedUser
      }));

      console.log('배포용 모의 데이터 갱신 완료:', updatedUser);

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
            <CardHeader className="mt-4">
              <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                <User className="h-5 w-5" />
                계정 관리
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-orange-400">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">@{instagramData.user.username}</h3>
                  <Badge 
                    variant={instagramData.user.account_type === 'BUSINESS' ? 'default' : 'secondary'}
                    className="mt-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  >
                    {instagramData.user.account_type === 'BUSINESS' ? '비즈니스 계정' : instagramData.user.account_type}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-3 justify-end my-6">
                <button 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium mt-4 text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => window.open(`https://instagram.com/${instagramData.user.username}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 text-blue-600" />
                  프로필 보기
                </button>
                <button 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium  mt-4 text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                  onClick={handleDisconnect}
                >
                  <AlertCircle className="h-4 w-4" />
                  연동 해제
                </button>
              </div>

              <Separator className="my-4" />

              {/* 빠른 액션 */}
              <div className="grid grid-cols-3 gap-3 py-2">
                <button
                  className="flex flex-col items-center gap-3 p-5 text-sm font-medium bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all"
                  onClick={() => navigate('/instagram/post')}
                >
                  <Image className="h-7 w-7 text-blue-600" />
                  <div className="text-center">
                    <div className="font-semibold text-blue-800 text-sm">바로 게시</div>
                  </div>
                </button>
                <button
                  className="flex flex-col items-center gap-3 p-5 text-sm font-medium bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all"
                  onClick={() => navigate('/instagram/comments')}
                >
                  <MessageCircle className="h-7 w-7 text-purple-600" />
                  <div className="text-center">
                    <div className="font-semibold text-purple-800 text-sm">댓글 관리</div>
                  </div>
                </button>
                <button
                  className="flex flex-col items-center gap-3 p-5 text-sm font-medium bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg hover:from-orange-100 hover:to-orange-200 transition-all"
                  onClick={() => navigate('/calendar')}
                >
                  <Calendar className="h-7 w-7 text-orange-600" />
                  <div className="text-center">
                    <div className="font-semibold text-orange-800 text-sm">업로드 예약</div>
                  </div>
                </button>
              </div>


            </CardContent>
          </Card>
        </div>

        {/* 계정 현황 및 인사이트 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="mt-4">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-green-500" />
                계정 현황
              </CardTitle>
              <CardDescription className="text-lg">
                최근 성과와 활동 현황을 한눈에 확인하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 mb-8">
              {/* 성과 지표 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-20 border">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <div className="text-lg">👁️</div>
                    </div>
                    <p className="text-lg font-bold text-gray-800">1,247</p>
                    <p className="text-xs text-gray-600">노출수</p>
                  </div>

                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Users className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-lg font-bold text-gray-800">892</p>
                    <p className="text-xs text-gray-600">도달수</p>
                  </div>

                  <div className="text-center">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Heart className="w-4 h-4 text-pink-600" />
                    </div>
                    <p className="text-lg font-bold text-gray-800">156</p>
                    <p className="text-xs text-gray-600">좋아요</p>
                  </div>

                  <div className="text-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <MessageCircle className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="text-lg font-bold text-gray-800">34</p>
                    <p className="text-xs text-gray-600">댓글</p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* 최근 게시물 */}
              <div>
                <h3 className="font-semibold mb-3">최근 게시물</h3>
                <div className="flex gap-3 overflow-x-auto pb-4 my-8">
                  {/* 오늘: 피드 게시물 */}
                  <div className="border rounded-lg overflow-hidden flex-shrink-0 shadow-sm relative cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200" style={{ width: '200px', height: '280px' }}>
                    <div className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative" style={{ height: '200px' }}>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-gray-800 text-xs pointer-events-none">피드</Badge>
                      </div>
                      <div className="h-full flex items-center justify-center">
                        <Image className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="p-3 bg-white" style={{ height: '80px' }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500">오늘</span>
                      </div>
                      <p className="text-sm mb-1 line-clamp-2">✨ 신제품 런칭! 특별한 할인 혜택과 함께 만나보세요 💖 #신제품 #특가 #한정판 #놓치면후회 #베스트셀러</p>
                      <div className="flex gap-3 text-xs text-gray-600">
                        <span>좋아요 234</span>
                        <span>댓글 18</span>
                      </div>
                    </div>
                  </div>

                  {/* 1일 전: 스토리 */}
                  <div className="border rounded-lg overflow-hidden flex-shrink-0 shadow-sm relative cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200" style={{ width: '140px', height: '280px' }}>
                    <div className="bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 relative" style={{ height: '280px' }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-gray-800 text-xs pointer-events-none">스토리</Badge>
                      </div>
                      <div className="absolute bottom-4 right-3 text-white text-right">
                        <div className="text-xs mb-2 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm inline-block">1일 전</div>
                        <div className="text-sm font-bold mb-1 drop-shadow-lg">오늘의 OOTD 💕</div>
                        <div className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm inline-block">👀 156</div>
                      </div>
                    </div>
                  </div>

                  {/* 2일 전: 릴스 */}
                  <div className="border rounded-lg overflow-hidden flex-shrink-0 shadow-sm relative cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200" style={{ width: '160px', height: '280px' }}>
                    <div className="bg-gradient-to-br from-violet-400 via-purple-600 to-pink-600 relative" style={{ height: '280px' }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-gray-800 text-xs pointer-events-none">릴스</Badge>
                      </div>
                      <div className="absolute center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-sm border border-white/40">
                          <div className="w-0 h-0 border-l-8 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-3 text-white">
                        <div className="text-xs mb-2 bg-gradient-to-r from-pink-500/80 to-purple-500/80 px-3 py-1 rounded-full backdrop-blur-sm font-medium inline-block">2일 전</div>
                        <div className="text-sm font-bold mb-1 drop-shadow-lg max-w-[120px]">5분만에 완성하는 스킨케어 루틴 ✨</div>
                        <div className="text-xs bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm inline-block">▶️ 1.2K</div>
                      </div>
                    </div>
                  </div>

                  {/* 3일 전: 피드 게시물 */}
                  <div className="border rounded-lg overflow-hidden flex-shrink-0 shadow-sm relative cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200" style={{ width: '200px', height: '280px' }}>
                    <div className="bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 relative" style={{ height: '200px' }}>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-gray-800 text-xs pointer-events-none">피드</Badge>
                      </div>
                      <div className="h-full flex items-center justify-center">
                        <Image className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="p-3 bg-white" style={{ height: '80px' }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500">3일 전</span>
                      </div>
                      <p className="text-sm mb-1 line-clamp-2">🌟 고객님들의 진짜 후기! "정말 만족해요" 리뷰 모음 📝 #고객후기 #만족도100 #리얼리뷰 #믿고구매</p>
                      <div className="flex gap-3 text-xs text-gray-600">
                        <span>좋아요 189</span>
                        <span>댓글 24</span>
                      </div>
                    </div>
                  </div>

                  {/* 4일 전: 릴스 */}
                  <div className="border rounded-lg overflow-hidden flex-shrink-0 shadow-sm relative cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200" style={{ width: '160px', height: '280px' }}>
                    <div className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 relative" style={{ height: '280px' }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-gray-800 text-xs pointer-events-none">릴스</Badge>
                      </div>
                      <div className="absolute center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-sm border border-white/40">
                          <div className="w-0 h-0 border-l-8 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-3 text-white text-right">
                        <div className="text-xs mb-2 bg-gradient-to-l from-orange-500/80 to-red-500/80 px-3 py-1 rounded-full backdrop-blur-sm font-medium inline-block">4일 전</div>
                        <div className="text-sm font-bold mb-1 drop-shadow-lg max-w-[120px]">우리 브랜드의 감동 스토리 💝</div>
                        <div className="text-xs bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm inline-block">🔥 2.8K</div>
                      </div>
                    </div>
                  </div>

                  {/* 5일 전: 피드 게시물 */}
                  <div className="border rounded-lg overflow-hidden flex-shrink-0 shadow-sm relative cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200" style={{ width: '200px', height: '280px' }}>
                    <div className="bg-gradient-to-br from-indigo-400 via-blue-500 to-cyan-600 relative" style={{ height: '200px' }}>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-gray-800 text-xs pointer-events-none">피드</Badge>
                      </div>
                      <div className="h-full flex items-center justify-center">
                        <Image className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="p-3 bg-white" style={{ height: '80px' }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500">5일 전</span>
                      </div>
                      <p className="text-sm mb-1 line-clamp-2">🎉 주말 특가 EVENT! 최대 50% 할인 기회를 놓치지 마세요 ⏰ #주말특가 #최대할인 #한정시간 #지금구매</p>
                      <div className="flex gap-3 text-xs text-gray-600">
                        <span>좋아요 312</span>
                        <span>댓글 45</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstagramManagePage;