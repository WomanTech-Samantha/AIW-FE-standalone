import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { 
  Instagram, 
  Facebook,
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  Smartphone,
  Monitor
} from "lucide-react";

const steps = [1, 2, 3];

const InstagramConnectPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // 연동 프로세스 시작
      setIsConnecting(true);
      
      // 모의 연동 프로세스 (3초 대기)
      setTimeout(() => {
        setIsConnecting(false);
        // 로컬스토리지에 연동 상태 저장
        localStorage.setItem('instagram_connected', 'true');
        navigate('/instagram/manage');
      }, 3000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const progress = Math.round((currentStep / steps.length) * 100);

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold mb-4">계정 연동 중...</h2>
            <p className="text-muted-foreground">
              인스타그램과 페이스북을 연결하고 있어요.<br />
              잠시만 기다려주세요!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">인스타그램 계정 연동</h1>
          <p className="text-lg text-muted-foreground">
            비즈니스 인스타그램과 페이스북 페이지를 연결해주세요
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-between text-sm font-medium mb-2">
            <span>진행상황</span>
            <span>{currentStep}/{steps.length}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="card-soft">
            <CardContent className="p-8">
              
              {/* Step 1: 비즈니스 계정 확인 */}
              {currentStep === 1 && (
                <>
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Instagram className="h-8 w-8 text-pink-500" />
                      비즈니스 인스타그램 계정 확인
                    </CardTitle>
                    <CardDescription>
                      마케팅 기능을 사용하려면 비즈니스 계정이 필요해요
                    </CardDescription>
                  </CardHeader>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <AlertCircle className="h-6 w-6 text-blue-600" />
                        비즈니스 계정이 없으신가요?
                      </h3>
                      <p className="text-blue-800 mb-4">
                        개인 계정을 비즈니스 계정으로 전환하거나 새로 만들 수 있어요.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <Smartphone className="h-8 w-8 text-blue-600 mb-3" />
                          <h4 className="font-medium mb-2">모바일에서</h4>
                          <p className="text-sm text-blue-700">
                            인스타그램 앱 → 설정 → 계정 → 비즈니스 계정으로 전환
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <Monitor className="h-8 w-8 text-blue-600 mb-3" />
                          <h4 className="font-medium mb-2">웹에서</h4>
                          <p className="text-sm text-blue-700">
                            인스타그램 웹 → 설정 → 계정 유형 및 도구 → 비즈니스로 전환
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                        이미 비즈니스 계정이 있으신가요?
                      </h3>
                      <p className="text-green-800 mb-4">
                        좋아요! 다음 단계로 넘어가서 페이스북 페이지를 연결해보세요.
                      </p>
                      <Button 
                        onClick={() => window.open('https://business.instagram.com/', '_blank')}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        비즈니스 계정 확인하기
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: 페이스북 페이지 연결 */}
              {currentStep === 2 && (
                <>
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Facebook className="h-8 w-8 text-blue-600" />
                      페이스북 페이지 연결
                    </CardTitle>
                    <CardDescription>
                      인스타그램 비즈니스 계정과 페이스북 페이지를 연결해주세요
                    </CardDescription>
                  </CardHeader>
                  
                  <div className="space-y-6">
                    <div className="bg-amber-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <AlertCircle className="h-6 w-6 text-amber-600" />
                        페이스북 페이지가 필요한 이유
                      </h3>
                      <ul className="space-y-2 text-amber-800">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600">•</span>
                          인스타그램 비즈니스 기능 활용
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600">•</span>
                          마케팅 성과 데이터 확인
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-600">•</span>
                          자동 게시물 관리
                        </li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="p-6 text-center">
                          <h4 className="font-semibold text-lg mb-4">페이스북 페이지 만들기</h4>
                          <p className="text-muted-foreground mb-4">
                            {user?.storeName || "사업장"}을 위한<br />
                            페이스북 페이지를 새로 만들어요
                          </p>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => window.open('https://www.facebook.com/pages/create/', '_blank')}
                          >
                            <Facebook className="mr-2 h-4 w-4" />
                            페이지 만들기
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6 text-center">
                          <h4 className="font-semibold text-lg mb-4">기존 페이지 연결</h4>
                          <p className="text-muted-foreground mb-4">
                            이미 만든 페이스북 페이지가<br />
                            있으시다면 바로 연결하세요
                          </p>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => window.open('https://business.facebook.com/', '_blank')}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            페이지 관리하기
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-medium mb-3">💡 연결 방법</h4>
                      <ol className="space-y-2 text-sm text-blue-800">
                        <li>1. 인스타그램 비즈니스 계정 설정으로 이동</li>
                        <li>2. "페이지 연결" 또는 "Facebook 연결" 선택</li>
                        <li>3. 연결할 페이스북 페이지 선택</li>
                        <li>4. 권한 승인 후 연결 완료</li>
                      </ol>
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: 권한 승인 */}
              {currentStep === 3 && (
                <>
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl">연동 권한 승인</CardTitle>
                    <CardDescription>
                      ALL-IN-WOM이 계정을 관리할 수 있도록 권한을 허용해주세요
                    </CardDescription>
                  </CardHeader>
                  
                  <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                        준비 완료!
                      </h3>
                      <p className="text-green-800 mb-4">
                        비즈니스 인스타그램 계정과 페이스북 페이지가 준비되었다면
                        이제 ALL-IN-WOM과 연동할 차례예요.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">필요한 권한</h4>
                        <div className="space-y-3">
                          {[
                            "게시물 읽기 및 작성",
                            "계정 정보 확인",
                            "성과 데이터 조회", 
                            "댓글 및 메시지 관리"
                          ].map((permission, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <CheckCircle2 className="h-5 w-5 text-success" />
                              <span>{permission}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">안전한 연동</h4>
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p className="flex items-start gap-2">
                            <span className="text-primary">🔒</span>
                            모든 데이터는 암호화되어 안전하게 보호됩니다
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-primary">⚡</span>
                            언제든지 연동을 해제할 수 있습니다
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-primary">👥</span>
                            사용자의 개인정보는 수집하지 않습니다
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 mt-8 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="btn-large"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  이전
                </Button>
                
                <Button 
                  onClick={handleNext} 
                  className="btn-large"
                >
                  {currentStep === steps.length ? "연동 시작하기" : "다음"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstagramConnectPage;