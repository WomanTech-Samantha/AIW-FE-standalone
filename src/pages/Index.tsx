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
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="mr-2 h-4 w-4" />
            여성 1인 소상공인 전용 마케팅 솔루션
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            오프라인 매장,<br />온라인으로 날개를 달다
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            복잡한 온라인 마케팅, 이제 클릭 한 번으로 끝내세요.<br />
            AI가 당신의 마케팅 전담팀이 되어드립니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="senior"
              onClick={() => navigate('/onboarding')}
              className="gradient-primary text-white shadow-lg hover:shadow-xl"
            >
              <Store className="mr-3 h-6 w-6" />
              무료로 시작하기
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="senior"
              onClick={() => navigate('/comparison')}
              className="border-2"
            >
              <BarChart3 className="mr-3 h-6 w-6" />
              효과 먼저 확인하기
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

        {/* Demo Section */}
        <Card className="card-soft max-w-5xl mx-auto mb-16">
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
            <p className="text-lg text-muted-foreground">
              여러 업체에 의뢰하던 일을 이제 한 곳에서 해결하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-soft hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-8">
                  <div className={`${feature.color} mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <Card className="card-soft max-w-4xl mx-auto mb-16">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">이미 많은 사업자들이 선택했어요</span>
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

        {/* CTA Section */}
        <div className="text-center">
          <Card className="card-soft max-w-3xl mx-auto">
            <CardContent className="p-12">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Heart className="h-6 w-6 text-red-500" />
                <span className="text-lg font-semibold">사업자를 위해 만들어진 특별한 솔루션</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                오늘부터 마케팅 걱정 끝!
              </h2>

              <p className="text-xl text-muted-foreground mb-8">
                복잡했던 온라인 마케팅이 이렇게 쉬울 줄 몰랐어요.<br />
                지금 시작해서 첫 번째 마케팅 자료를 만들어보세요.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="senior"
                  onClick={() => navigate('/onboarding')}
                  className="gradient-primary text-white shadow-lg hover:shadow-xl"
                >
                  <Zap className="mr-3 h-6 w-6" />
                  지금 무료로 시작하기
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="senior"
                  onClick={() => navigate('/dashboard')}
                  className="border-2"
                >
                  <BarChart3 className="mr-3 h-6 w-6" />
                  데모 먼저 보기
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-4 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>신용카드 불필요</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>30일 무료 체험</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>언제든 취소 가능</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
