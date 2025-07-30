import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function TopNavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isPlaygroundActive = pathname.startsWith("/studio") || pathname === "/instagram";
  const isDashboardActive = pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">ALL‑IN‑WOM</Link>
        <nav className="flex items-center gap-4">
          <NavLink
            to="/studio"
            className={() =>
              isPlaygroundActive
                ? "font-semibold"
                : "text-muted-foreground"
            }
          >
            Playground
          </NavLink>
          <NavLink
            to="/dashboard"
            className={() =>
              isDashboardActive
                ? "font-semibold"
                : "text-muted-foreground"
            }
          >
            관리
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:block">
                {user.storeName
                  ? `${user.storeName} 사장님, 안녕하세요!`
                  : `${user.name ?? user.email} 사장님, 안녕하세요!`}
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
  );
}
