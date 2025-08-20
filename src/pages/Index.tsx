import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Store,
  Zap,
  Target,
  BarChart3,
  Clock,
  DollarSign,
  Heart,
  Sparkles,
  CheckCircle2,
  Users,
  Palette
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/context/MockAuthContext";
import PublicStore from "./PublicStore";

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetDemo } = useAuth();

  // 랜딩페이지 접근 시 사용자 데이터 초기화 (데모 리셋)
  useEffect(() => {
    // store 파라미터가 없는 경우에만 초기화 (랜딩페이지일 때만)
    if (!searchParams.get('store')) {
      resetDemo();
    }
  }, [searchParams, resetDemo]);

  // store 파라미터가 있으면 PublicStore 컴포넌트 렌더링
  if (searchParams.get('store')) {
    return <PublicStore />;
  }

  const features = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "AI 마케팅 에셋 생성",
      description: "상품 사진을 마케팅 자료로 자동 변환",
      color: "text-blue-600"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "스마트 예약 발행",
      description: "드래그&드롭으로 간편한 SNS 예약",
      color: "text-green-600"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "통합 성과 분석",
      description: "한눈에 보는 마케팅 효과 대시보드",
      color: "text-purple-600"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "자동 최적화",
      description: "AI가 분석한 최적의 마케팅 전략 제안",
      color: "text-orange-600"
    }
  ];

  const benefits = [
    { text: "월 120만원 마케팅 비용 절약", icon: <DollarSign className="h-5 w-5" /> },
    { text: "주당 20시간 업무 시간 단축", icon: <Clock className="h-5 w-5" /> },
    { text: "90% 시간 절약으로 사업에 집중", icon: <Target className="h-5 w-5" /> },
    { text: "3배 향상된 마케팅 효과", icon: <BarChart3 className="h-5 w-5" /> }
  ];

  return (
    <div className="pg-container">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-6xl mx-auto mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            <Sparkles className="mr-2 h-4 w-4" />
            여성 1인 소상공인 전용 마케팅 솔루션
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
            오프라인 매장,<br />온라인으로 날개를 달다
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            복잡한 온라인 마케팅, 이제 클릭 한 번으로 끝내세요.<br />
            올인움 AI가 당신의 마케팅 전담팀이 되어드립니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center max-w-[600px] mx-auto mt-12 mb-12">
            <Button
              size="senior"
              onClick={() => navigate('/onboarding')}
              className="gradient-primary text-white shadow-lg hover:shadow-xl w-[280px]"
            >
              <Store className="mr-3 h-6 w-6" />
              무료로 시작하기
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="senior"
              onClick={() => navigate('/comparison')}
              className="border-2 w-[280px]"
            >
              <BarChart3 className="mr-3 h-6 w-6" />
              기존 방식과 비교하기
            </Button>
            <Button
              variant="outline"
              size="senior"
              onClick={() => navigate('/store')}
              className="border-2 w-[280px]"
            >
              <Store className="mr-3 h-6 w-6" />
              내 쇼핑몰 미리보기
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="senior"
              onClick={() => navigate('/dashboard')}
              className="border-2 w-[280px]"
            >
              <BarChart3 className="mr-3 h-6 w-6" />
              실제 홍보 효과 미리보기
            </Button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-success font-medium">
                {benefit.icon}
                <span className="text-sm">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <Card className="card-soft max-w-6xl mx-auto mb-16">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">이미 많은 사업자들이 올인움과 성공하고 계십니다!</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">200+</h3>
                <p className="text-muted-foreground">활성 사용자</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-success mb-2">1,500+</h3>
                <p className="text-muted-foreground">생성된 마케팅 자료</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-warning mb-2">95%</h3>
                <p className="text-muted-foreground">만족도</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 실제 사용 후기 섹션 */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">실제 사용자 후기</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="card-soft">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-blue-600">김</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">김○○님</h4>
                    <p className="text-sm text-muted-foreground">침구용품 사업 · 3년차</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "딸이 하는 것만 봤지, 인스타 할 줄을 몰랐는데 올인움으로 하니까 너무 쉬워요.
                  매출도 30%나 늘었어요."
                </p>
                <div className="flex text-yellow-400">
                  {"★".repeat(5)}
                </div>
              </CardContent>
            </Card>

            <Card className="card-soft">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-green-600">박</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">박○○님</h4>
                    <p className="text-sm text-muted-foreground">수공예품 공방 · 5년차</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "컴퓨터 잘 몰라도 쉽게 사용할 수 있어요.
                  예쁜 상품 사진이 자동으로 만들어져서 너무 만족해요."
                </p>
                <div className="flex text-yellow-400">
                  {"★".repeat(5)}
                </div>
              </CardContent>
            </Card>

            <Card className="card-soft">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-purple-600">이</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">이○○님</h4>
                    <p className="text-sm text-muted-foreground">온라인 쇼핑몰 · 2년차</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "처음엔 반신반의했는데, 정말 손님들이 늘었어요.
                  이제 올인움 없이는 못 해요!"
                </p>
                <div className="flex text-yellow-400">
                  {"★".repeat(5)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Demo Section */}
        <Card className="card-soft max-w-6xl mx-auto mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl mb-4">
              복잡한 사용법을 익혀야 하는 여타 툴과는 다릅니다!
            </CardTitle>
            <CardDescription className="text-lg">
              올인움에서는 버튼 하나만 누르면 브랜딩과 마케팅이 저절로 됩니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">간편한 브랜드 컨셉 설정</h3>
                <p className="text-sm text-muted-foreground">
                  업종과 브랜드 컬러만 선택하면<br />
                  모든 준비 완료
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-success">2</span>
                </div>
                <h3 className="font-semibold mb-2">AI 자동 생성 및 업로드</h3>
                <p className="text-sm text-muted-foreground">
                  상품 사진만 올리면<br />
                  마케팅 자료 자동 완성 후 업로드까지
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-warning">3</span>
                </div>
                <h3 className="font-semibold mb-2">눈으로 보이는 성과 확인</h3>
                <p className="text-sm text-muted-foreground">
                  예) 노출 12,300회 (+28%)<br />
                  좋아요 640개 (+19%) 달성
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              모든 마케팅 업무를 하나로
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="card-soft hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className={`${feature.color} mb-3`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>


        {/* 안심 요소 섹션 */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">궁금한 점이 있으시면 언제든 연락주세요.</h2>
              <p className="text-xl text-muted-foreground">
                친절한 상담으로 도와드리겠습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card className="card-soft text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">전화 상담</h3>
                  <p className="text-lg font-bold text-blue-600 mb-2">1588-0000</p>
                  <p className="text-muted-foreground">
                    평일 9:00~18:00<br />
                    토요일 9:00~15:00
                  </p>
                </CardContent>
              </Card>

              <Card className="card-soft text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">카카오톡 상담</h3>
                  <p className="text-lg font-bold text-yellow-600 mb-2">@올인움</p>
                  <p className="text-muted-foreground">
                    24시간 언제든지<br />
                    빠른 답변 드려요
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto shadow-sm">
                <h3 className="text-lg font-semibold mb-2 text-green-600">✅ 안심하고 시작하세요</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>30일 무료 체험</strong><br />
                    부담 없이 먼저 써보세요
                  </div>
                  <div>
                    <strong>언제든 해지 가능</strong><br />
                    복잡한 절차 없이 간단히
                  </div>
                  <div>
                    <strong>개인정보 보호</strong><br />
                    안전하게 관리됩니다
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
