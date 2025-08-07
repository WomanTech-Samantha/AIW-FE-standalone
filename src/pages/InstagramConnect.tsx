import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import InstagramDirectLogin from "@/components/InstagramDirectLogin";

const InstagramConnectPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isInstagramLoginComplete, setIsInstagramLoginComplete] = useState(false);

  // 컴포넌트 마운트 시 연동 상태 확인
  useEffect(() => {
    const connected = localStorage.getItem('instagram_connected');
    if (connected === 'true') {
      setIsInstagramLoginComplete(true);
    }
  }, []);

  // 개발용: 연동 상태 초기화 함수
  const clearConnection = () => {
    localStorage.removeItem('instagram_connected');
    localStorage.removeItem('instagram_user');
    localStorage.removeItem('instagram_access_token');
    localStorage.removeItem('instagram_recent_media');
    setIsInstagramLoginComplete(false);
    window.location.reload();
  };

  const handleInstagramLoginSuccess = (response: any) => {
    console.log('Instagram login successful:', response);
    setIsInstagramLoginComplete(true);
    // 로그인 성공 후 관리 페이지로 이동
    setTimeout(() => {
      navigate('/instagram/manage');
    }, 2000);
  };

  const handleInstagramLoginError = (error: any) => {
    console.error('Instagram login failed:', error);
    setIsInstagramLoginComplete(false);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Instagram 비즈니스 계정 연동</h1>
        <p className="text-lg text-muted-foreground">
          콘텐츠를 자동으로 게시하고 관리하기 위해 계정을 연결하세요
        </p>
        {/* 개발용 디버그 버튼 */}
        {isInstagramLoginComplete && (
          <Button
            onClick={clearConnection}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            연동 초기화 (개발용)
          </Button>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <InstagramDirectLogin 
          onSuccess={handleInstagramLoginSuccess}
          onError={handleInstagramLoginError}
        />
      </div>
    </div>
  );
};

export default InstagramConnectPage;