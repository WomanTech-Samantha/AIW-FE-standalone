import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/MockAuthContext";
import { Instagram, Settings, LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { checkInstagramConnection } from "@/utils/instagramAuth";

export default function TopNavBar() {
  const { user, logout, resetDemo } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isInstagramConnected, setIsInstagramConnected] = useState(false);
  const [hasOnlineStore, setHasOnlineStore] = useState(false);

  const isContentWorkspaceActive = pathname.startsWith("/studio") || pathname === "/instagram";
  const isStoreActive = pathname.startsWith("/store");
  
  useEffect(() => {
    // Instagram 연동 상태 확인
    const connection = checkInstagramConnection();
    setIsInstagramConnected(connection.isConnected);
    
    const savedStore = localStorage.getItem('has_online_store');
    setHasOnlineStore(savedStore === 'true');
  }, []);

  // Instagram 연동 상태 변경 감지를 위한 useEffect
  useEffect(() => {
    const checkConnection = () => {
      const connection = checkInstagramConnection();
      setIsInstagramConnected(connection.isConnected);
    };

    // localStorage 변경 감지
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'instagram_access_token' || e.key === 'instagram_user' || e.key === 'instagram_connected') {
        checkConnection();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 페이지 포커스 시에도 확인 (다른 탭에서 연동 상태가 변경될 수 있음)
    const handleFocus = () => {
      checkConnection();
    };
    
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // MockAuth user 상태 변경 감지
  useEffect(() => {
    if (user?.instagramConnected !== undefined) {
      setIsInstagramConnected(user.instagramConnected);
    }
  }, [user?.instagramConnected]);

  return (
    <TooltipProvider>
      <header className="bg-background border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/studio" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center border-[2.5px] border-black">
                <span className="text-black font-bold text-lg leading-none flex items-center justify-center transform translate-x-[0.5px] -translate-y-[0.5px]">A</span>
              </div>
              <span className="font-bold text-xl text-foreground hidden sm:block">ALL IN WOM</span>
              <span className="font-bold text-lg text-foreground block sm:hidden">AIW</span>
            </Link>
            
            <nav className="flex-1 flex justify-center">
              <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1">
                <NavLink
                  to="/studio"
                  className={() =>
                    isContentWorkspaceActive
                      ? "px-3 sm:px-6 py-2 rounded-full bg-background font-semibold shadow-sm transition-all text-sm sm:text-base"
                      : "px-3 sm:px-6 py-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-background/50 transition-all text-sm sm:text-base"
                  }
                >
                  <span className="block sm:hidden">콘텐츠</span>
                  <span className="hidden sm:block">콘텐츠 작업공간</span>
                </NavLink>
                <NavLink
                  to="/store"
                  className={() =>
                    isStoreActive
                      ? "px-3 sm:px-6 py-2 rounded-full bg-background font-semibold shadow-sm transition-all text-sm sm:text-base"
                      : "px-3 sm:px-6 py-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-background/50 transition-all text-sm sm:text-base"
                  }
                >
                  쇼핑몰
                </NavLink>
              </div>
            </nav>
            
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  {/* 인스타그램 관리 메뉴 */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      title={isInstagramConnected 
                        ? '인스타그램 관리' 
                        : '인스타그램 계정 동기화'}
                      className={`${
                        isInstagramConnected 
                          ? 'text-foreground hover:bg-accent' 
                          : 'text-muted-foreground hover:bg-accent'
                      }`}
                      onClick={() => {
                        if (isInstagramConnected) {
                          navigate('/instagram/manage');
                        } else {
                          navigate('/instagram/connect');
                        }
                      }}
                    >
                      <Instagram className="h-4 w-4" />
                      {isInstagramConnected ? (
                        <span className="hidden min-[1050px]:inline ml-2">인스타그램 관리</span>
                      ) : (
                        <span className="hidden min-[1050px]:inline ml-2">인스타 연동</span>
                      )}
                    </Button>
                  </div>
                  
                  <div className="h-8 w-px bg-border" />
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/settings')}
                    className="text-muted-foreground hover:text-foreground hover:bg-accent"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="hidden min-[1050px]:inline ml-2">설정</span>
                  </Button>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          resetDemo();
                          logout();
                          navigate('/');
                        }}
                        className="text-muted-foreground hover:text-foreground hover:bg-accent"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="hidden min-[1050px]:inline ml-2">로그아웃</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>로그아웃</p>
                    </TooltipContent>
                  </Tooltip>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate('/onboarding')}
                  >
                    시작하기
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}