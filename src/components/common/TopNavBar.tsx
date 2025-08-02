import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Instagram, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

export default function TopNavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isInstagramConnected, setIsInstagramConnected] = useState(false);
  const [hasOnlineStore, setHasOnlineStore] = useState(false);

  const isPlaygroundActive = pathname.startsWith("/studio") || pathname === "/instagram";
  const isStoreActive = pathname.startsWith("/store");
  
  useEffect(() => {
    // Mock data - 실제로는 서버나 로컬 스토리지에서 가져와야 함
    const savedInstagram = localStorage.getItem('instagram_connected');
    const savedStore = localStorage.getItem('has_online_store');
    setIsInstagramConnected(savedInstagram === 'true');
    setHasOnlineStore(savedStore === 'true');
  }, []);

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">ALL‑IN‑WOM</Link>
          
          {/* 중앙 메뉴 영역 */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 bg-muted/50 rounded-full px-1 py-1">
            <div className="flex items-center gap-1">
              <NavLink
                to="/studio"
                className={() =>
                  isPlaygroundActive
                    ? "px-3 sm:px-6 py-2 rounded-full bg-background font-semibold shadow-sm transition-all text-sm sm:text-base"
                    : "px-3 sm:px-6 py-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-background/50 transition-all text-sm sm:text-base"
                }
              >
                <span className="block sm:hidden">Play</span>
                <span className="hidden sm:block">Playground</span>
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
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* 인스타그램 관리 메뉴 */}
                <div className="flex items-center gap-2 mr-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    title={isInstagramConnected 
                      ? '인스타그램 관리' 
                      : '인스타그램 계정 연동하기'}
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
                    <Instagram className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">
                      {isInstagramConnected ? '인스타' : '인스타 연동'}
                    </span>
                  </Button>
                </div>
                
                <div className="h-8 w-px bg-border" />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/settings')}
                  className="flex items-center gap-2"
                  title="설정"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden md:inline ml-2">설정</span>
                </Button>
                
                <span className="text-sm text-muted-foreground hidden lg:block">
                  {user.storeName
                    ? `${user.storeName} 사장님`
                    : `${user.name ?? user.email} 사장님`}
                </span>
                <Button variant="outline" size="sm" onClick={() => { logout(); navigate("/"); }}>
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>로그인</Button>
                <Button size="sm" onClick={() => navigate("/signup")}>회원가입</Button>
              </>
            )}
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
