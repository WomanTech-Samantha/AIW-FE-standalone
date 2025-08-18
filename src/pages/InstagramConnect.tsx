import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/MockAuthContext";
import { checkInstagramConnection, disconnectInstagram } from "@/utils/instagramAuth";
import InstagramDirectLogin from "@/components/InstagramDirectLogin";

const InstagramConnectPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isInstagramLoginComplete, setIsInstagramLoginComplete] = useState(false);

  // 컴포?�트 마운?????�동 ?�태 ?�인 �??�시�?체크
  useEffect(() => {
    // 초기 체크
    const connection = checkInstagramConnection();
    if (connection.isConnected) {
      navigate('/instagram/manage');
      return;
    }

    // ?�시�??�동 ?�태 체크 (1초마??
    const interval = setInterval(() => {
      const currentConnection = checkInstagramConnection();
      if (currentConnection.isConnected) {
        setIsInstagramLoginComplete(true);
        navigate('/instagram/manage');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  // 개발?? ?�동 ?�태 초기???�수
  const clearConnection = () => {
    disconnectInstagram();
    localStorage.removeItem('instagram_connected');
    localStorage.removeItem('instagram_recent_media');
    setIsInstagramLoginComplete(false);
    window.location.reload();
  };

  const handleInstagramLoginSuccess = (response: any) => {
    console.log('Instagram login successful:', response);
    setIsInstagramLoginComplete(true);
    // 로그???�공 ??관�??�이지�??�동
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
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Instagram 비즈?�스 계정 ?�동</h1>
        <p className="text-lg text-muted-foreground">
          콘텐츠�? ?�동?�로 게시?�고 관리하�??�해 계정???�결?�세??        </p>
        {/* 개발???�버�?버튼 */}
        {isInstagramLoginComplete && (
          <Button
            onClick={clearConnection}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            ?�동 초기??(개발??
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
