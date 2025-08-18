import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import {
  Instagram,
  Store,
  Palette,
  FolderOpen,
  ArrowRight,
  CheckCircle2,
  CirclePlus,
  Settings,
  BarChart3
} from "lucide-react";

interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  primaryAction: {
    label: string;
    route: string;
    icon: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    route: string;
    icon: React.ReactNode;
  };
  status: 'connected' | 'not-connected' | 'none';
  statusMessage?: string;
}

const AdminMenuPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isInstagramConnected, setIsInstagramConnected] = useState(false);
  const [hasOnlineStore, setHasOnlineStore] = useState(false);
  
  const storeName = user?.storeName || "사업장";

  // Mock data - 실제로는 서버나 로컬 스토리지에서 가져와야 함
  useEffect(() => {
    const savedStatus = localStorage.getItem('instagram_connected');
    const storeStatus = localStorage.getItem('has_online_store');
    setIsInstagramConnected(savedStatus === 'true');
    setHasOnlineStore(storeStatus === 'true');
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: 'instagram',
      title: '홍보 계정 관리',
      description: '인스타그램을 통해 고객과 소통하고 제품을 홍보하세요',
      icon: <Instagram className="h-8 w-8" />,
      primaryAction: isInstagramConnected ? {
        label: '내 계정 관리하기',
        route: '/instagram',
        icon: <Settings className="h-5 w-5" />
      } : {
        label: '계정 생성하기',
        route: '/instagram/create',
        icon: <CirclePlus className="h-5 w-5" />
      },
      secondaryAction: isInstagramConnected ? {
        label: '마케팅 성과 보기',
        route: '/dashboard',
        icon: <BarChart3 className="h-5 w-5" />
      } : undefined,
      status: isInstagramConnected ? 'connected' : 'not-connected',
      statusMessage: isInstagramConnected ? '연결됨' : '연결 안 됨'
    },
    {
      id: 'online-store',
      title: '온라인 사업장 관리',
      description: '나만의 쇼핑몰 홈페이지를 만들고 관리하세요',
      icon: <Store className="h-8 w-8" />,
      primaryAction: hasOnlineStore ? {
        label: '내 사이트 관리하기',
        route: '/store/manage',
        icon: <Settings className="h-5 w-5" />
      } : {
        label: '사이트 생성하기',
        route: '/store/create',
        icon: <CirclePlus className="h-5 w-5" />
      },
      status: hasOnlineStore ? 'connected' : 'not-connected',
      statusMessage: hasOnlineStore ? '운영 중' : '미생성'
    },
    {
      id: 'theme',
      title: '가게 테마 설정',
      description: '브랜드에 맞는 색상과 스타일을 선택하세요',
      icon: <Palette className="h-8 w-8" />,
      primaryAction: {
        label: '테마 설정하기',
        route: '/theme',
        icon: <ArrowRight className="h-5 w-5" />
      },
      status: 'none'
    },
    {
      id: 'assets',
      title: '작업 보관함',
      description: '이미지, 텍스트 등 마케팅 자료를 보관하고 관리하세요',
      icon: <FolderOpen className="h-8 w-8" />,
      primaryAction: {
        label: '보관함 열기',
        route: '/studio',
        icon: <ArrowRight className="h-5 w-5" />
      },
      status: 'none'
    }
  ];

  const getStatusBadge = (status: MenuItem['status'], message?: string) => {
    if (status === 'none') return null;
    
    return (
      <Badge 
        variant={status === 'connected' ? 'default' : 'secondary'}
        className={`${
          status === 'connected' 
            ? 'bg-success text-success-foreground' 
            : 'bg-muted text-muted-foreground'
        } flex items-center gap-1`}
      >
        {status === 'connected' && <CheckCircle2 className="h-3 w-3" />}
        {message}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            관리 메뉴
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {storeName}의 온라인 마케팅을 시작하세요.
            <br />
            필요한 도구들을 한곳에서 관리할 수 있습니다.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <Card 
              key={item.id} 
              className="card-soft hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-1">
                        {item.title}
                      </CardTitle>
                      {getStatusBadge(item.status, item.statusMessage)}
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base mt-3 leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <Button
                    size="lg"
                    className="w-full justify-between text-lg py-6"
                    onClick={() => navigate(item.primaryAction.route)}
                  >
                    <span className="flex items-center gap-2">
                      {item.primaryAction.icon}
                      {item.primaryAction.label}
                    </span>
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                  
                  {item.secondaryAction && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full justify-between text-lg py-6"
                      onClick={() => navigate(item.secondaryAction.route)}
                    >
                      <span className="flex items-center gap-2">
                        {item.secondaryAction.icon}
                        {item.secondaryAction.label}
                      </span>
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <Card className="card-soft max-w-2xl mx-auto">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold mb-3">도움이 필요하신가요?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                각 메뉴를 클릭하면 쉽고 간단하게 시작할 수 있도록 안내해드립니다.
              </p>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8"
              >
                사용 가이드 보기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminMenuPage;