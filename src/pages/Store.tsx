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
  CheckCircle2
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
      <div className="min-h-screen bg-gradient-warm no-transition">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
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
    <div className="min-h-screen bg-gradient-warm no-transition">
      <div className="container mx-auto px-4 py-8">
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">오늘 방문자</p>
                  <p className="text-2xl font-bold">42</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">새 주문</p>
                  <p className="text-2xl font-bold">7</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">등록 상품</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <Package className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">이번 달 매출</p>
                  <p className="text-2xl font-bold">₩2.8M</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

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

        {/* Quick Tips */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-primary-glow/5">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">💡 운영 팁</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">매출 증대 방법</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• 정기적으로 새 상품 업로드</li>
                  <li>• 고객 후기 적극 활용</li>
                  <li>• 시즌별 할인 이벤트 진행</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">고객 만족도 향상</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• 빠른 주문 처리 및 배송</li>
                  <li>• 상품 사진을 선명하게</li>
                  <li>• 문의사항에 신속한 답변</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StorePage;