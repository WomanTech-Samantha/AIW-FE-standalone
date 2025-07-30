import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">죄송해요! 페이지를 찾을 수 없어요</p>
        <a href="/" className="text-primary hover:text-primary/80 underline text-lg">
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default NotFound;
