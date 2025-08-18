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

  // 컴포넌트 마운트시 연동 상태 확인 및 자동 리다이렉트 체크
  useEffect(() => {
    // 하드코딩된 연결 상태로 바로 manage 페이지로 이동
    const connection = checkInstagramConnection();
    if (connection.isConnected) {
      // 약간의 지연 후 이동 (사용자가 연결 상태를 확인할 수 있도록)
      setTimeout(() => {
        navigate('/instagram/manage');
      }, 1500);
      return;
    }
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
