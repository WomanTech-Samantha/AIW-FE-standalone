import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown,
  Eye, 
  Heart, 
  MessageCircle,
  Share2,
  Calendar,
  Target,
  Award,
  Users,
  BarChart3,
  LineChart,
  Palette,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  type: 'milestone' | 'improvement' | 'goal';
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

  // Mock dashboard data based on requirements
  const metrics: MetricCard[] = [
    {
      title: "총 노출 수",
      value: "12,300",
      change: "+28%",
      changeType: 'increase',
      icon: <Eye className="h-6 w-6" />,
      color: "text-blue-600"
    },
    {
      title: "좋아요",
      value: "640",
      change: "+19%",
      changeType: 'increase',
      icon: <Heart className="h-6 w-6" />,
      color: "text-red-500"
    },
    {
      title: "댓글",
      value: "89",
      change: "+12%",
      changeType: 'increase',
      icon: <MessageCircle className="h-6 w-6" />,
      color: "text-green-600"
    },
    {
      title: "공유 수",
      value: "34",
      change: "+8%",
      changeType: 'increase',
      icon: <Share2 className="h-6 w-6" />,
      color: "text-purple-600"
    },
    {
      title: "게시물 수",
      value: "12",
      change: "+2",
      changeType: 'increase',
      icon: <Calendar className="h-6 w-6" />,
      color: "text-orange-600"
    },
    {
      title: "팔로워 증가",
      value: "47",
      change: "+15%",
      changeType: 'increase',
      icon: <Users className="h-6 w-6" />,
      color: "text-cyan-600"
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: '첫 1000 노출 달성!',
      description: '게시물이 1,000명 이상에게 노출되었어요',
      icon: '🎉',
      date: '2024-01-15',
      type: 'milestone'
    },
    {
      id: '2',
      title: '좋아요 상승률 20% 돌파',
      description: '지난 주 대비 좋아요가 크게 증가했어요',
      icon: '❤️',
      date: '2024-01-14',
      type: 'improvement'
    },
    {
      id: '3',
      title: '월간 게시 목표 달성',
      description: '이번 달 목표했던 10개 게시물을 완료했어요',
      icon: '🎯',
      date: '2024-01-13',
      type: 'goal'
    }
  ];

  const topPosts = [
    {
      id: 1,
      title: "시원한 여름밤을 책임지는 냉감 이불",
      views: 3420,
      likes: 156,
      engagement: "4.6%"
    },
    {
      id: 2,
      title: "우리 집 딱 맞는 사이즈로 맞춤 제작",
      views: 2890,
      likes: 132,
      engagement: "4.2%"
    },
    {
      id: 3,
      title: "건강한 잠자리, 항균 처리된 프리미엄 침구",
      views: 2456,
      likes: 118,
      engagement: "3.8%"
    }
  ];

  const periodOptions = [
    { value: '7days', label: '지난 7일' },
    { value: '30days', label: '지난 30일' },
    { value: '90days', label: '지난 3개월' }
  ];

  return (
    <div className="page-container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">마케팅 대시보드</h1>
            <p className="text-lg text-muted-foreground">
              지숙커튼&침구의 마케팅 성과를 한눈에 확인하세요
            </p>
          </div>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/studio')}
              className="btn-large"
            >
              <Palette className="mr-2 h-5 w-5" />
              스튜디오로
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/calendar')}
              className="btn-large"
            >
              <Calendar className="mr-2 h-5 w-5" />
              캘린더로
            </Button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-border bg-card p-1">
            {periodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedPeriod(option.value)}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                  selectedPeriod === option.value
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="card-soft hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full bg-muted ${metric.color}`}>
                    {metric.icon}
                  </div>
                  <div className={`flex items-center space-x-1 ${
                    metric.changeType === 'increase' ? 'text-success' : 'text-destructive'
                  }`}>
                    {metric.changeType === 'increase' ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Chart */}
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <BarChart3 className="mr-2 h-6 w-6" />
                  성과 추이
                </CardTitle>
                <CardDescription>
                  최근 30일간 주요 지표 변화
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mock Chart - In real app, use recharts */}
                <div className="h-64 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="mx-auto h-16 w-16 text-primary mb-4" />
                    <p className="text-lg font-medium">노출 수 꾸준히 상승 중!</p>
                    <p className="text-sm text-muted-foreground">
                      평균 일일 노출: 410명 (+15% vs 지난달)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Posts */}
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <TrendingUp className="mr-2 h-6 w-6" />
                  인기 게시물
                </CardTitle>
                <CardDescription>
                  이번 달 가장 성과가 좋은 게시물들
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPosts.map((post, index) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium line-clamp-1">{post.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {post.views.toLocaleString()}
                            </span>
                            <span className="flex items-center">
                              <Heart className="h-4 w-4 mr-1" />
                              {post.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        참여율 {post.engagement}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Award className="mr-2 h-6 w-6" />
                  최근 성과
                </CardTitle>
                <CardDescription>
                  새로운 마일스톤과 개선사항
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(achievement.date).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Target className="mr-2 h-6 w-6" />
                  빠른 실행
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/studio')}
                >
                  <Palette className="mr-2 h-4 w-4" />
                  새 콘텐츠 생성
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/calendar')}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  게시물 예약
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/comparison')}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  효과 비교하기
                </Button>
              </CardContent>
            </Card>

            {/* Monthly Goal */}
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-xl">이번 달 목표</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>노출 수 목표</span>
                      <span>12,300 / 15,000</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>게시물 수 목표</span>
                      <span>12 / 15</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '80%' }} />
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

export default DashboardPage;