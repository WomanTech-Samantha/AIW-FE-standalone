import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/MockAuthContext";
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
  const [hasOnlineStore, setHasOnlineStore] = useState<boolean | null>(null);
  const [storeUrl, setStoreUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Mock 데이터로 스토어 정보 설정
      fetchUserStore();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchUserStore = async () => {
    try {
      setIsLoading(true);
      
      // Mock 스토어 데이터
      setTimeout(() => {
        if (user?.hasOnlineStore) {
          const mockStoreUrl = `https://${user.subdomain || 'demo-store'}.allinwom.com`;
          console.log('Store.tsx - Setting user store URL:', mockStoreUrl);
          setStoreUrl(mockStoreUrl);
          setHasOnlineStore(true);
        } else {
          console.log('Store.tsx - User has no store yet');
          setHasOnlineStore(false);
        }
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('스토어 URL 조회 실패:', error);
      setHasOnlineStore(false);
      setIsLoading(false);
    }
  };

  const handleCreateStore = () => {
    navigate('/onboarding');
  };

  const handleStoreSettings = () => {
    navigate('/store/settings');
  };

  const handleViewStore = () => {
    if (user?.subdomain) {
      // 현재 앱 내에서 스토어 페이지로 이동
      const storeRoute = `/?store=${user.subdomain}`;
      console.log('Navigating to store route:', storeRoute);
      window.open(storeRoute, '_blank');
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="page-container">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-muted-foreground">스토어 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 스토어가 없는 경우
  if (hasOnlineStore === false) {
    return (
      <div className="page-container">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Store className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              온라인 스토어를 만들어보세요
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              몇 분만에 나만의 온라인 쇼핑몰을 만들고 고객에게 상품을 판매할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="card-soft">
              <CardContent className="pt-6 text-center">
                <Palette className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">쉬운 디자인</h3>
                <p className="text-sm text-muted-foreground">
                  드래그 앤 드롭으로 간편하게 스토어를 꾸며보세요
                </p>
              </CardContent>
            </Card>

            <Card className="card-soft">
              <CardContent className="pt-6 text-center">
                <ShoppingCart className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">완전한 기능</h3>
                <p className="text-sm text-muted-foreground">
                  결제, 배송, 재고관리까지 모든 기능이 포함되어 있습니다
                </p>
              </CardContent>
            </Card>

            <Card className="card-soft">
              <CardContent className="pt-6 text-center">
                <BarChart3 className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">실시간 분석</h3>
                <p className="text-sm text-muted-foreground">
                  매출, 방문자, 주문 현황을 실시간으로 확인하세요
                </p>
              </CardContent>
            </Card>
          </div>

          <Button 
            size="lg" 
            onClick={handleCreateStore}
            className="text-lg px-8 py-6"
          >
            <Plus className="mr-2 h-6 w-6" />
            온라인 스토어 만들기
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    );
  }

  // 스토어가 있는 경우
  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">온라인 스토어</h1>
          <p className="text-lg text-muted-foreground">
            스토어 현황을 확인하고 관리하세요
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            onClick={handleStoreSettings}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            스토어 설정
          </Button>
          <Button 
            onClick={handleViewStore}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            스토어 보기
          </Button>
        </div>
      </div>

      {/* 스토어 정보 카드 */}
      <Card className="card-soft mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-6 w-6" />
                {user?.storeName || "내 스토어"}
              </CardTitle>
              <CardDescription>
                온라인 스토어 기본 정보
              </CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              운영중
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">스토어 URL</Label>
              <p className="text-base font-medium break-all">{storeUrl}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">업종</Label>
              <p className="text-base font-medium">{user?.business || "일반"}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">개설일</Label>
              <p className="text-base font-medium">2025년 8월 19일</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 통계 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="card-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">오늘 주문</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+8.2%</span>
              <span className="text-muted-foreground ml-1">어제 대비</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">오늘 매출</p>
                <p className="text-2xl font-bold">₩340,000</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+12.1%</span>
              <span className="text-muted-foreground ml-1">어제 대비</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">방문자</p>
                <p className="text-2xl font-bold">1,254</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+5.7%</span>
              <span className="text-muted-foreground ml-1">어제 대비</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">전환율</p>
                <p className="text-2xl font-bold">2.8%</p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+0.3%</span>
              <span className="text-muted-foreground ml-1">어제 대비</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 빠른 작업 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="card-soft">
          <CardHeader>
            <CardTitle>빠른 작업</CardTitle>
            <CardDescription>
              자주 사용하는 기능들을 빠르게 실행하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col gap-2"
                onClick={() => navigate('/studio')}
              >
                <Package className="h-8 w-8" />
                <span>상품 추가</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col gap-2"
                onClick={handleStoreSettings}
              >
                <Settings className="h-8 w-8" />
                <span>스토어 설정</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col gap-2"
                onClick={() => navigate('/dashboard')}
              >
                <BarChart3 className="h-8 w-8" />
                <span>분석 보기</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col gap-2"
                onClick={handleViewStore}
              >
                <Eye className="h-8 w-8" />
                <span>스토어 미리보기</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
            <CardDescription>
              스토어의 최근 활동 내역입니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">새 주문이 접수되었습니다</p>
                  <p className="text-xs text-muted-foreground">5분 전</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">고객 리뷰가 등록되었습니다</p>
                  <p className="text-xs text-muted-foreground">1시간 전</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Package className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">상품이 재고 부족 상태입니다</p>
                  <p className="text-xs text-muted-foreground">3시간 전</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Truck className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">배송이 완료되었습니다</p>
                  <p className="text-xs text-muted-foreground">5시간 전</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Label 컴포넌트 정의 (누락된 부분)
const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <label className={className}>{children}</label>;
};

export default StorePage;