import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  X, 
  Clock, 
  DollarSign,
  Users,
  TrendingUp,
  Zap,
  Target,
  BarChart3,
  ArrowRight,
  Lightbulb,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ComparisonItem {
  feature: string;
  traditional: {
    available: boolean;
    description: string;
    effort: 'low' | 'medium' | 'high';
  };
  automated: {
    available: boolean;
    description: string;
    effort: 'low' | 'medium' | 'high';
  };
}

const ComparisonPage = () => {
  const navigate = useNavigate();

  const comparisonData: ComparisonItem[] = [
    {
      feature: "마케팅 소재 제작",
      traditional: {
        available: true,
        description: "디자인 업체 의뢰하거나 직접 제작 (2-3일 소요)",
        effort: 'high'
      },
      automated: {
        available: true,
        description: "AI가 상품사진으로 자동 생성 (5분 완료)",
        effort: 'low'
      }
    },
    {
      feature: "마케팅 문구 작성",
      traditional: {
        available: true,
        description: "트렌드 조사 후 직접 작성 (1-2시간)",
        effort: 'high'
      },
      automated: {
        available: true,
        description: "상품 특징 기반 자동 생성 및 제안",
        effort: 'low'
      }
    },
    {
      feature: "SNS 게시 일정 관리",
      traditional: {
        available: true,
        description: "수동으로 시간 맞춰 직접 게시",
        effort: 'medium'
      },
      automated: {
        available: true,
        description: "드래그&드롭으로 예약, 자동 게시",
        effort: 'low'
      }
    },
    {
      feature: "성과 분석",
      traditional: {
        available: false,
        description: "각 플랫폼을 개별 확인해야 함",
        effort: 'high'
      },
      automated: {
        available: true,
        description: "통합 대시보드에서 한눈에 확인",
        effort: 'low'
      }
    },
    {
      feature: "A/B 테스트",
      traditional: {
        available: false,
        description: "직접 여러 버전 제작하고 수동 비교",
        effort: 'high'
      },
      automated: {
        available: true,
        description: "자동으로 여러 버전 생성 및 성과 비교",
        effort: 'low'
      }
    },
    {
      feature: "고객 응답 관리",
      traditional: {
        available: true,
        description: "각 SNS를 직접 확인하고 답변",
        effort: 'medium'
      },
      automated: {
        available: true,
        description: "통합 알림으로 빠른 응답 가능",
        effort: 'low'
      }
    },
    {
      feature: "브랜드 일관성",
      traditional: {
        available: false,
        description: "매번 수동으로 색상과 폰트 맞춤",
        effort: 'high'
      },
      automated: {
        available: true,
        description: "설정한 브랜드 가이드라인 자동 적용",
        effort: 'low'
      }
    },
    {
      feature: "계절/트렌드 대응",
      traditional: {
        available: false,
        description: "직접 트렌드 조사하고 콘텐츠 수정",
        effort: 'high'
      },
      automated: {
        available: true,
        description: "계절과 트렌드 데이터 기반 자동 제안",
        effort: 'low'
      }
    }
  ];

  const costComparison = [
    {
      category: "디자인 제작비",
      traditional: "월 15-30만원",
      automated: "포함됨",
      savings: "월 20만원 절약"
    },
    {
      category: "마케팅 담당자 인건비",
      traditional: "월 100-150만원",
      automated: "자동화",
      savings: "월 100만원 절약"
    },
    {
      category: "툴 구독료",
      traditional: "월 5-10만원",
      automated: "통합 서비스",
      savings: "월 7만원 절약"
    }
  ];

  const timeComparison = [
    {
      task: "게시물 1개 제작",
      traditional: "3-4시간",
      automated: "15분",
      efficiency: "16배 빨라짐"
    },
    {
      task: "주간 콘텐츠 계획",
      traditional: "5-6시간",
      automated: "30분",
      efficiency: "10배 빨라짐"
    },
    {
      task: "성과 분석",
      traditional: "2-3시간",
      automated: "5분",
      efficiency: "24배 빨라짐"
    }
  ];

  const getEffortBadge = (effort: 'low' | 'medium' | 'high') => {
    switch (effort) {
      case 'low':
        return <Badge className="bg-success text-success-foreground">쉬움</Badge>;
      case 'medium':
        return <Badge className="bg-warning text-warning-foreground">보통</Badge>;
      case 'high':
        return <Badge className="bg-destructive text-destructive-foreground">어려움</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">기존 방식 vs 올인원 자동화</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            전통적인 마케팅 방식과 올인원 자동화 솔루션을 비교해보세요.<br />
            시간과 비용을 얼마나 절약할 수 있는지 확인해보세요.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="card-soft text-center">
            <CardContent className="p-6">
              <Clock className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">90%</h3>
              <p className="text-muted-foreground">시간 절약</p>
            </CardContent>
          </Card>
          <Card className="card-soft text-center">
            <CardContent className="p-6">
              <DollarSign className="mx-auto h-12 w-12 text-success mb-4" />
              <h3 className="text-2xl font-bold text-success mb-2">월 120만원</h3>
              <p className="text-muted-foreground">비용 절감</p>
            </CardContent>
          </Card>
          <Card className="card-soft text-center">
            <CardContent className="p-6">
              <TrendingUp className="mx-auto h-12 w-12 text-warning mb-4" />
              <h3 className="text-2xl font-bold text-warning mb-2">3배</h3>
              <p className="text-muted-foreground">마케팅 효과 향상</p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Comparison Table */}
        <Card className="card-soft mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Target className="mr-3 h-6 w-6" />
              기능별 상세 비교
            </CardTitle>
            <CardDescription>
              각 마케팅 업무를 어떻게 처리하는지 비교해보세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-semibold">기능</th>
                    <th className="text-center py-4 px-4 font-semibold">기존 방식</th>
                    <th className="text-center py-4 px-4 font-semibold">올인원 자동화</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-4 px-4 font-medium">{item.feature}</td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-2">
                            {item.traditional.available ? (
                              <CheckCircle2 className="h-5 w-5 text-warning" />
                            ) : (
                              <X className="h-5 w-5 text-destructive" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.traditional.description}
                          </p>
                          {getEffortBadge(item.traditional.effort)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-center">
                          <div className="flex items-center justify-center mb-2">
                            {item.automated.available ? (
                              <CheckCircle2 className="h-5 w-5 text-success" />
                            ) : (
                              <X className="h-5 w-5 text-destructive" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.automated.description}
                          </p>
                          {getEffortBadge(item.automated.effort)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Cost Comparison */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <DollarSign className="mr-2 h-6 w-6" />
                비용 비교
              </CardTitle>
              <CardDescription>
                월간 마케팅 비용 절감 효과
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {costComparison.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.category}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>기존: {item.traditional}</span>
                        <ArrowRight className="h-4 w-4" />
                        <span>자동화: {item.automated}</span>
                      </div>
                    </div>
                    <Badge className="bg-success text-success-foreground">
                      {item.savings}
                    </Badge>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">총 절약액</span>
                    <span className="text-2xl font-bold text-success">월 127만원</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time Comparison */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Clock className="mr-2 h-6 w-6" />
                시간 효율성 비교
              </CardTitle>
              <CardDescription>
                각 작업별 소요 시간 단축 효과
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeComparison.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.task}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>기존: {item.traditional}</span>
                        <ArrowRight className="h-4 w-4" />
                        <span>자동화: {item.automated}</span>
                      </div>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">
                      {item.efficiency}
                    </Badge>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 text-primary">
                      <Zap className="h-5 w-5" />
                      <span className="text-lg font-semibold">주당 20시간 절약</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits Summary */}
        <Card className="card-soft mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Lightbulb className="mr-3 h-6 w-6" />
              올인원 자동화의 핵심 장점
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">원스톱 서비스</h3>
                <p className="text-sm text-muted-foreground">
                  여러 업체에 의뢰할 필요 없이 한 곳에서 모든 것을 해결
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-success" />
                </div>
                <h3 className="font-semibold mb-2">즉시 수정 가능</h3>
                <p className="text-sm text-muted-foreground">
                  대화형 인터페이스로 실시간 수정과 개선
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-warning" />
                </div>
                <h3 className="font-semibold mb-2">데이터 기반 최적화</h3>
                <p className="text-sm text-muted-foreground">
                  성과 데이터를 분석해 지속적으로 개선
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">브랜드 일관성</h3>
                <p className="text-sm text-muted-foreground">
                  모든 콘텐츠에 브랜드 가이드라인 자동 적용
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Card className="card-soft max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">지금 시작해보세요!</h2>
              <p className="text-lg text-muted-foreground mb-6">
                복잡한 마케팅 업무를 자동화하고<br />
                더 많은 시간을 사업 운영에 집중하세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/studio')}
                  className="btn-large gradient-primary text-white"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  무료로 체험하기
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="btn-large"
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  성과 확인하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;