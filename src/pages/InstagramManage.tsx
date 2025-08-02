import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import {
  Instagram,
  BarChart3,
  Calendar,
  MessageCircle,
  Heart,
  Eye,
  Users,
  TrendingUp,
  Settings,
  ExternalLink,
  Plus,
  ArrowRight,
  Palette
} from "lucide-react";

const InstagramManagePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [accountData, setAccountData] = useState({
    username: "",
    followers: 0,
    following: 0,
    posts: 0,
    profileImage: ""
  });

  useEffect(() => {
    // 모의 계정 데이터 로드
    const mockData = {
      username: user?.storeName?.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || "mystore",
      followers: 1247,
      following: 156,
      posts: 23,
      profileImage: "https://via.placeholder.com/100x100/FF8866/FFFFFF?text=로고"
    };
    setAccountData(mockData);
  }, [user]);

  const stats = [
    {
      title: "오늘 노출수",
      value: "2,340",
      change: "+12%",
      icon: <Eye className="h-5 w-5" />,
      color: "text-blue-600"
    },
    {
      title: "좋아요",
      value: "156",
      change: "+8%", 
      icon: <Heart className="h-5 w-5" />,
      color: "text-red-500"
    },
    {
      title: "댓글",
      value: "42",
      change: "+15%",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "text-green-600"
    },
    {
      title: "팔로워 증가",
      value: "+23",
      change: "이번 주",
      icon: <Users className="h-5 w-5" />,
      color: "text-purple-600"
    }
  ];

  const recentPosts = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x300/FF8866/FFFFFF?text=상품1",
      caption: "따뜻한 겨울밤을 책임지는 프리미엄 이불 세트 ✨",
      likes: 89,
      comments: 12,
      posted: "2시간 전"
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300x300/4A90E2/FFFFFF?text=상품2", 
      caption: "우리 집 분위기를 바꿔주는 감성 커튼 🏠",
      likes: 67,
      comments: 8,
      posted: "5시간 전"
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300x300/27AE60/FFFFFF?text=상품3",
      caption: "건강한 잠자리를 위한 천연소재 침구 🌿",  
      likes: 134,
      comments: 23,
      posted: "1일 전"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">인스타그램 관리</h1>
            <p className="text-lg text-muted-foreground">
              비즈니스 계정 운영 현황을 확인하고 관리하세요
            </p>
          </div>
          <Button 
            size="lg"
            onClick={() => window.open(`https://instagram.com/${accountData.username}`, '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-5 w-5" />
            계정 바로가기
          </Button>
        </div>

        {/* Account Info */}
        <Card className="card-soft mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <img 
                src={accountData.profileImage} 
                alt="프로필" 
                className="w-20 h-20 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">@{accountData.username}</h3>
                <div className="flex items-center gap-6 text-muted-foreground">
                  <span><strong className="text-foreground">{accountData.posts}</strong> 게시물</span>
                  <span><strong className="text-foreground">{accountData.followers.toLocaleString()}</strong> 팔로워</span>
                  <span><strong className="text-foreground">{accountData.following}</strong> 팔로잉</span>
                </div>
              </div>
              <Badge className="bg-success text-success-foreground">
                연결됨
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <span className="text-sm text-success font-medium">{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Posts */}
            <Card className="card-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">최근 게시물</CardTitle>
                    <CardDescription>
                      최근에 업로드한 게시물들의 성과를 확인하세요
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => navigate('/studio')}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    새 게시물
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-sm transition-shadow">
                      <img 
                        src={post.image} 
                        alt="게시물" 
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium line-clamp-2 mb-2">{post.caption}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {post.comments}
                          </span>
                          <span>{post.posted}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  성과 추이
                </CardTitle>
                <CardDescription>
                  최근 30일간 주요 지표 변화
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-16 w-16 text-primary mb-4" />
                    <p className="text-lg font-medium">꾸준한 성장 중!</p>
                    <p className="text-sm text-muted-foreground">
                      평균 일일 노출수: 2,100회 (+18% vs 지난달)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-xl">빠른 실행</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/studio')}
                >
                  <Palette className="mr-2 h-4 w-4" />
                  콘텐츠 제작
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/calendar')}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  게시 일정 관리
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard')}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  마케팅 대시보드
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/instagram/settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  계정 설정
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-xl">💡 운영 팁</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">게시 최적 시간</h4>
                    <p className="text-muted-foreground">
                      오후 7-9시, 오후 12-1시에 게시하면 더 많은 사람들이 봐요
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">해시태그 활용</h4>
                    <p className="text-muted-foreground">
                      업종 관련 해시태그 5-10개를 꾸준히 사용하세요
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">스토리 활용</h4>
                    <p className="text-muted-foreground">
                      일상적인 모습이나 비하인드를 스토리로 공유해보세요
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card className="card-soft bg-green-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-green-800">
                  <Instagram className="h-6 w-6" />
                  연동 상태
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>비즈니스 계정</span>
                    <Badge className="bg-success text-success-foreground">활성</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>페이스북 페이지</span>
                    <Badge className="bg-success text-success-foreground">연결됨</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>API 액세스</span>
                    <Badge className="bg-success text-success-foreground">정상</Badge>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                  onClick={() => navigate('/instagram/settings')}
                >
                  연동 설정 관리
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramManagePage;