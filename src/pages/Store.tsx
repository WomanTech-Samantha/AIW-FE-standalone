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
          </Button>
        </div>
      </div>
    );
  }

  // 스토어가 있는 경우
  return (
    <div className="page-container">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">온라인 스토어</h1>
          <p className="text-lg text-muted-foreground">
            스토어 현황을 확인하고 관리하세요
          </p>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        <Card className="card-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  {user?.storeName || "내 스토어"} <span className="text-sm font-normal text-muted-foreground">· {user?.business || "일반"} 상점</span>
                </CardTitle>
                <CardDescription>
                  스토어 기본 정보 및 최근 활동
                </CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                운영중
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="pr-4 border-r border-border/50">
                <h3 className="font-semibold mb-3 text-base flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  기본 정보
                </h3>
                <div className="space-y-3">
                  <div className="p-2 bg-muted/30 rounded-md">
                    <Label className="text-sm font-medium text-muted-foreground">스토어 URL</Label>
                    <p className="text-base font-medium break-all mt-1">{storeUrl}</p>
                  </div>
                  <div className="p-2 bg-muted/30 rounded-md">
                    <Label className="text-sm font-medium text-muted-foreground">개설일</Label>
                    <p className="text-base font-medium mt-1">2025년 8월 19일</p>
                  </div>
                </div>
              </div>
              
              <div className="pl-4">
                <h3 className="font-semibold mb-3 text-base flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  최근 활동
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-md">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                      <ShoppingCart className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">새 주문 접수</p>
                      <p className="text-sm text-muted-foreground">5분 전</p>
                    </div>
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 rounded-md">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center border border-green-200">
                      <Star className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">리뷰 등록</p>
                      <p className="text-sm text-muted-foreground">1시간 전</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        
        <Card className="card-soft">
          <CardHeader>
            <CardTitle>빠른 작업</CardTitle>
            <CardDescription>
              자주 사용하는 기능들을 빠르게 실행하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="justify-between px-4 py-4 h-auto text-lg font-semibold bg-orange-50/50 border-orange-200 hover:bg-orange-100/50 text-orange-900 hover:text-orange-900"
                onClick={() => navigate('/product-add')}
              >
                상품 추가
                <Plus className="h-10 w-10 text-orange-600" />
              </Button>
              <Button 
                variant="outline" 
                className="justify-between px-4 py-4 h-auto text-lg font-semibold bg-blue-50/50 border-blue-200 hover:bg-blue-100/50 text-blue-900 hover:text-blue-900 cursor-pointer"
                onClick={() => {}}
              >
                주문 관리
                <ShoppingCart className="h-10 w-10 text-blue-600" />
              </Button>
              <Button 
                variant="outline" 
                className="justify-between px-4 py-4 h-auto text-lg font-semibold bg-teal-50/50 border-teal-200 hover:bg-teal-100/50 text-teal-900 hover:text-teal-900"
                onClick={handleStoreSettings}
              >
                스토어 설정
                <Settings className="h-10 w-10 text-teal-600" />
              </Button>
              <Button 
                variant="outline" 
                className="justify-between px-4 py-4 h-auto text-lg font-semibold bg-purple-50/50 border-purple-200 hover:bg-purple-100/50 text-purple-900 hover:text-purple-900"
                onClick={handleViewStore}
              >
                스토어 바로가기
                <ExternalLink className="h-10 w-10 text-purple-600" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      
      <Card className="card-soft mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            오늘의 스토어 현황
          </CardTitle>
          <CardDescription>실시간 스토어 운영 지표를 확인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                  <span className="text-base font-medium text-blue-900">주문</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  <TrendingUp className="h-3 w-3" />
                  +8.2%
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-900">12건</div>
              <p className="text-sm text-blue-600">어제 대비 증가</p>
            </div>

            <div className="p-4 bg-green-50/50 rounded-lg border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-base font-medium text-green-900">매출</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  <TrendingUp className="h-3 w-3" />
                  +12.1%
                </div>
              </div>
              <div className="text-2xl font-bold text-green-900">₩340,000</div>
              <p className="text-sm text-green-600">목표 달성률 78%</p>
            </div>

            <div className="p-4 bg-purple-50/50 rounded-lg border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-base font-medium text-purple-900">방문자</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  <TrendingUp className="h-3 w-3" />
                  +5.7%
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-900">1,254명</div>
              <p className="text-sm text-purple-600">평균 세션 3.2분</p>
            </div>

            <div className="p-4 bg-orange-50/50 rounded-lg border border-orange-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-orange-600" />
                  <span className="text-base font-medium text-orange-900">구매전환율</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  <TrendingUp className="h-3 w-3" />
                  +0.3%
                </div>
              </div>
              <div className="text-2xl font-bold text-orange-900">2.8%</div>
              <p className="text-sm text-orange-600">방문자 중 구매한 비율</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    
  );
};

// Label 컴포넌트 정의 (누락된 부분)
const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <label className={className}>{children}</label>;
};

export default StorePage;