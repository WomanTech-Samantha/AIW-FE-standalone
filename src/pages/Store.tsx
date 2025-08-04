import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import {
  Store,
  Plus,
  ExternalLink,
  Settings,
  Package,
  ShoppingCart,
  BarChart3,
  Palette,
  Users,
  TrendingUp,
  Calendar,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Star,
  MessageSquare,
  Truck,
  CreditCard,
  Eye,
  Heart,
  Bell,
  DollarSign,
  Activity,
  Target,
  Filter
} from "lucide-react";

const StorePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasOnlineStore, setHasOnlineStore] = useState(false);
  const [storeUrl, setStoreUrl] = useState("");

  useEffect(() => {
    // 쇼핑몰 생성 상태 확인
    const storeStatus = localStorage.getItem('has_online_store');
    setHasOnlineStore(storeStatus === 'true');
    
    if (storeStatus === 'true') {
      // 쇼핑몰 URL 생성
      const storeName = user?.storeName || "mystore";
      const subdomain = storeName.toLowerCase().replace(/[^a-z0-9]/g, '');
      setStoreUrl(`https://${subdomain}.allinwom.com`);
    }
  }, [user]);

  // 쇼핑몰이 생성되지 않은 경우의 UI
  if (!hasOnlineStore) {
    return (
      <div className="min-h-screen no-transition">
        <div className="max-w-5xl mx-auto py-2">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🛍️ 나만의 쇼핑몰 만들기
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {user?.storeName || "사업장"}의 온라인 스토어를 만들어서<br />
              더 많은 고객을 만나보세요!
            </p>
          </div>

          {/* Main CTA */}
          <div className="text-center mb-16">
            <Card className="max-w-2xl mx-auto card-soft">
              <CardContent className="p-8">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Store className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  쇼핑몰이 아직 생성되지 않았어요
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  몇 분만에 전문적인 온라인 스토어를 만들 수 있어요.<br />
                  복잡한 설정 없이 바로 시작하세요!
                </p>
                <Button 
                  size="lg" 
                  className="text-xl px-8 py-6"
                  onClick={() => navigate('/store/create')}
                >
                  <Plus className="mr-2 h-6 w-6" />
                  쇼핑몰 만들기
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">매출 증대</h3>
                <p className="text-muted-foreground">
                  24시간 언제나 주문받는<br />
                  온라인 매장으로 매출 up!
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">고객 확대</h3>
                <p className="text-muted-foreground">
                  전국 어디서나 접근 가능한<br />
                  온라인으로 고객층 확장
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">브랜드 강화</h3>
                <p className="text-muted-foreground">
                  전문적인 디자인으로<br />
                  브랜드 이미지 업그레이드
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">포함된 기능들</CardTitle>
              <CardDescription className="text-center text-lg">
                복잡한 설정 없이 바로 사용할 수 있어요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: <Package className="h-5 w-5" />, title: "상품 관리", desc: "사진과 설명으로 상품을 쉽게 등록" },
                  { icon: <ShoppingCart className="h-5 w-5" />, title: "주문 관리", desc: "들어온 주문을 한눈에 확인" },
                  { icon: <BarChart3 className="h-5 w-5" />, title: "매출 분석", desc: "매출 현황을 그래프로 확인" },
                  { icon: <Palette className="h-5 w-5" />, title: "디자인 설정", desc: "브랜드에 맞는 색상과 테마" },
                  { icon: <ExternalLink className="h-5 w-5" />, title: "모바일 최적화", desc: "스마트폰에서도 완벽하게" },
                  { icon: <Settings className="h-5 w-5" />, title: "간편 설정", desc: "복잡한 설정 없이 바로 시작" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-success mt-1">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 flex items-center gap-2">
                        {feature.icon}
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 쇼핑몰이 생성된 경우의 UI (대시보드)
  return (
    <div className="min-h-screen no-transition">
      <div className="py-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">쇼핑몰 관리</h1>
            <p className="text-lg text-muted-foreground">
              {user?.storeName || "나의 스토어"} 온라인 매장을 관리하세요
            </p>
          </div>
          <Button 
            size="lg"
            onClick={() => window.open(storeUrl, '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-5 w-5" />
            사이트 바로가기
          </Button>
        </div>

        {/* 중요 알림 */}
        <div className="mb-6">
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-orange-600" />
                <div className="flex-1">
                  <p className="font-medium text-orange-800">처리 대기 중인 주문 3건이 있습니다</p>
                  <p className="text-sm text-orange-600">빠른 처리로 고객 만족도를 높여보세요</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/store/orders')}>
                  확인하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 주요 지표 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">오늘 매출</p>
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">₩847,000</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <p className="text-sm text-green-600">+12.5% 어제 대비</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">신규 주문</p>
                <ShoppingCart className="h-5 w-5 text-blue-500" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">12</p>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="text-xs">3건 처리 대기</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">방문자 수</p>
                <Users className="h-5 w-5 text-purple-500" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">156</p>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4 text-purple-500" />
                  <p className="text-sm text-muted-foreground">현재 8명 접속 중</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">전환율</p>
                <Target className="h-5 w-5 text-orange-500" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">7.7%</p>
                <div className="flex items-center gap-1">
                  <Activity className="h-4 w-4 text-orange-500" />
                  <p className="text-sm text-orange-600">+2.1% 지난주 대비</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 추가 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">이번 주 매출 동향</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">월요일</span>
                  <span className="font-medium">₩523,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">화요일</span>
                  <span className="font-medium">₩689,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">수요일</span>
                  <span className="font-medium">₩847,000</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span className="text-sm">목요일</span>
                  <span className="text-sm">진행 중</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">인기 상품 TOP 3</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">1</Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium">프리미엄 침구 세트</p>
                    <p className="text-xs text-muted-foreground">34회 판매</p>
                  </div>
                  <Heart className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">2</Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium">암막 커튼</p>
                    <p className="text-xs text-muted-foreground">28회 판매</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">3</Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium">쿠션 커버 세트</p>
                    <p className="text-xs text-muted-foreground">21회 판매</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">최근 리뷰</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[1,2,3,4,5].map(star => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">김***님</span>
                  </div>
                  <p className="text-xs">"품질이 정말 좋아요! 다음에도 구매할게요"</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[1,2,3,4].map(star => (
                        <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="h-3 w-3 text-gray-300" />
                    </div>
                    <span className="text-xs text-muted-foreground">박***님</span>
                  </div>
                  <p className="text-xs">"배송이 빨라서 만족합니다"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 급한 할일 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              오늘 처리해야 할 일
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <Clock className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm font-medium">주문 처리</p>
                  <p className="text-xs text-muted-foreground">3건 대기 중</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <Truck className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">배송 준비</p>
                  <p className="text-xs text-muted-foreground">5건 준비 중</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">고객 문의</p>
                  <p className="text-xs text-muted-foreground">2건 답변 대기</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Package className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">재고 부족</p>
                  <p className="text-xs text-muted-foreground">1개 상품</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">상품 관리</h3>
                  <p className="text-sm text-muted-foreground">상품 등록, 수정, 삭제</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/store/products')}
              >
                상품 관리하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">주문 관리</h3>
                  <p className="text-sm text-muted-foreground">주문 확인 및 배송 처리</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/store/orders')}
              >
                주문 관리하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Settings className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">쇼핑몰 설정</h3>
                  <p className="text-sm text-muted-foreground">디자인, 정보 수정</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/store/settings')}
              >
                설정하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">매출 분석</h3>
                  <p className="text-sm text-muted-foreground">매출 현황 및 통계</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/store/analytics')}
              >
                분석 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Plus className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">새 상품 추가</h3>
                  <p className="text-sm text-muted-foreground">새로운 상품 등록</p>
                </div>
              </div>
              <Button 
                className="w-full"
                onClick={() => navigate('/store/products/add')}
              >
                상품 추가하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">프로모션</h3>
                  <p className="text-sm text-muted-foreground">할인 이벤트 관리</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/store/promotions')}
              >
                프로모션 관리
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 최근 활동 및 개선 제안 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                최근 활동
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">새 주문 2건 접수</p>
                    <p className="text-xs text-muted-foreground">5분 전</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">프리미엄 침구 세트 리뷰 등록</p>
                    <p className="text-xs text-muted-foreground">1시간 전</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">쿠션 커버 세트 재고 부족 알림</p>
                    <p className="text-xs text-muted-foreground">3시간 전</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">고객 문의 답변 완료</p>
                    <p className="text-xs text-muted-foreground">4시간 전</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                성장 제안
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">매출 증대 기회</span>
                  </div>
                  <p className="text-xs text-green-700">인기 상품 '프리미엄 침구 세트'의 관련 상품을 추가하면 매출을 20% 더 늘릴 수 있어요</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">고객 유지</span>
                  </div>
                  <p className="text-xs text-blue-700">리뷰 작성 고객에게 다음 구매시 5% 할인 쿠폰을 제공해보세요</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">재고 최적화</span>
                  </div>
                  <p className="text-xs text-orange-700">쿠션 커버 세트 재주문 시기입니다. 지난달 대비 판매량이 40% 증가했어요</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 빠른 실행 */}
        <Card className="mt-6 bg-gradient-to-r from-primary/5 to-primary-glow/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              오늘의 추천 작업
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                <div className="flex items-center gap-2 w-full">
                  <MessageSquare className="h-4 w-4" />
                  <span className="font-medium">고객 문의 답변</span>
                </div>
                <p className="text-xs text-muted-foreground text-left">2건의 문의가 답변을 기다리고 있어요</p>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2" onClick={() => navigate('/store/products/add')}>
                <div className="flex items-center gap-2 w-full">
                  <Plus className="h-4 w-4" />
                  <span className="font-medium">신상품 등록</span>
                </div>
                <p className="text-xs text-muted-foreground text-left">새로운 상품으로 고객의 관심을 끌어보세요</p>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                <div className="flex items-center gap-2 w-full">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">할인 이벤트</span>
                </div>
                <p className="text-xs text-muted-foreground text-left">주말 특가 이벤트를 계획해보세요</p>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StorePage;