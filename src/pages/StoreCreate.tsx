import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Palette,
  Globe,
  Monitor,
  Smartphone,
  ShoppingBag,
  Star,
  ExternalLink,
  Plus,
  Instagram
} from "lucide-react";

const steps = [1, 2, 3, 4];

interface StoreTemplate {
  id: string;
  name: string;
  description: string;
  features: string[];
  mockupImage: string;
  category: 'classic' | 'modern' | 'minimal';
}

const StoreCreatePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  
  // 온보딩 정보 불러오기
  const [selectedTheme, setSelectedTheme] = useState(user?.theme || "warm");
  const [selectedColor, setSelectedColor] = useState(user?.color || "warm");
  const [storeName] = useState(user?.storeName || "");
  
  // 2단계: 도메인 설정
  const [subdomain, setSubdomain] = useState("");
  const [isSubdomainValid, setIsSubdomainValid] = useState(true);
  
  // 3단계: 템플릿 선택
  const [selectedTemplate, setSelectedTemplate] = useState("");
  
  // 4단계: 생성 결과
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  // 상호명을 영어로 변환하는 함수 (간단한 로직)
  const translateToEnglish = (koreanName: string) => {
    const translationMap: { [key: string]: string } = {
      '커튼': 'curtain',
      '침구': 'bedding',
      '가구': 'furniture',
      '홈': 'home',
      '인테리어': 'interior',
      '패브릭': 'fabric',
      '텍스타일': 'textile'
    };
    
    let englishName = koreanName.toLowerCase();
    for (const [korean, english] of Object.entries(translationMap)) {
      englishName = englishName.replace(korean, english);
    }
    
    // 특수문자 제거 및 공백을 하이픈으로
    englishName = englishName
      .replace(/[^a-z0-9가-힣\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[가-힣]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    return englishName || 'mystore';
  };

  useEffect(() => {
    // 초기 서브도메인 설정
    if (storeName && !subdomain) {
      setSubdomain(translateToEnglish(storeName));
    }
  }, [storeName, subdomain]);

  // 서브도메인 유효성 검사
  useEffect(() => {
    const isValid = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(subdomain) && subdomain.length >= 3;
    setIsSubdomainValid(isValid);
  }, [subdomain]);

  const themeOptions = [
    { id: "warm", name: "따뜻한 주황", color: "#FF8866" },
    { id: "calm", name: "차분한 파랑", color: "#4A90E2" },
    { id: "nature", name: "자연 녹색", color: "#27AE60" },
    { id: "elegant", name: "우아한 보라", color: "#8E44AD" },
    { id: "fresh", name: "상쾌한 민트", color: "#1ABC9C" },
    { id: "soft", name: "부드러운 핑크", color: "#E91E63" },
  ];

  const templates: StoreTemplate[] = [
    {
      id: "classic",
      name: "클래식 스토어",
      description: "전통적이고 신뢰감 있는 디자인",
      features: ["깔끔한 상품 진열", "카테고리별 정리", "고객 후기 섹션"],
      mockupImage: "🏪",
      category: "classic"
    },
    {
      id: "modern",
      name: "모던 부티크",
      description: "세련되고 현대적인 감각의 디자인",
      features: ["대형 이미지 배너", "트렌디한 레이아웃", "SNS 연동"],
      mockupImage: "🛍️",
      category: "modern"
    },
    {
      id: "minimal",
      name: "미니멀 샵",
      description: "단순하고 깔끔한 미니멀 디자인",
      features: ["여백을 활용한 디자인", "빠른 로딩", "모바일 최적화"],
      mockupImage: "📱",
      category: "minimal"
    }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedTheme && selectedColor;
      case 2: return subdomain && isSubdomainValid;
      case 3: return selectedTemplate;
      case 4: return true;
      default: return false;
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // 사이트 생성 프로세스 시작
      setIsCreating(true);
      
      // 모의 생성 프로세스 (3초 대기)
      setTimeout(() => {
        setIsCreating(false);
        setIsCreated(true);
        // 로컬스토리지에 사이트 생성 상태 저장
        localStorage.setItem('has_online_store', 'true');
      }, 3000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFullDomain = () => {
    return `https://${subdomain}.allinwom.com`;
  };

  const progress = Math.round((currentStep / steps.length) * 100);

  if (isCreated) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              🎉 쇼핑몰이 생성되었습니다!
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              {storeName}의 온라인 스토어가 준비되었어요
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              주소: <span className="font-mono text-primary">{getFullDomain()}</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <ExternalLink className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">사이트 바로가기</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    새로 만든 쇼핑몰을 확인해보세요
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => window.open(getFullDomain(), '_blank')}
                  >
                    방문하기
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Plus className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">새 상품 추가하기</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    첫 번째 상품을 등록해보세요
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/store/products/add')}
                  >
                    상품 등록
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Instagram className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">인스타그램에 올리기</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    프로필에 쇼핑몰 주소를 추가하세요
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/store/instagram-guide')}
                  >
                    주소 올리기
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/store')}
              >
                쇼핑몰 메뉴로 돌아가기
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold mb-4">쇼핑몰 생성 중...</h2>
            <p className="text-muted-foreground">
              잠시만 기다려주세요. 멋진 쇼핑몰을 준비하고 있어요!
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">쇼핑몰 만들기</h1>
          <p className="text-lg text-muted-foreground">
            {storeName}의 온라인 스토어를 만들어보세요
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
              
              {/* Step 1: 브랜드 테마 확인 */}
              {currentStep === 1 && (
                <>
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl">브랜드 테마 확인</CardTitle>
                    <CardDescription>
                      온보딩에서 설정한 테마를 그대로 사용하시거나 수정할 수 있어요
                    </CardDescription>
                  </CardHeader>
                  
                  <div className="space-y-6">
                    <div>
                      <Label className="text-lg mb-4 block">현재 선택된 테마</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {themeOptions.map((theme) => (
                          <Button
                            key={theme.id}
                            variant={selectedTheme === theme.id ? "default" : "outline"}
                            className="h-auto p-4 flex flex-col items-center gap-3"
                            onClick={() => {
                              setSelectedTheme(theme.id);
                              setSelectedColor(theme.id);
                            }}
                          >
                            <div 
                              className="w-8 h-8 rounded-full"
                              style={{ backgroundColor: theme.color }}
                            />
                            <span className="text-sm">{theme.name}</span>
                            {selectedTheme === theme.id && (
                              <CheckCircle2 className="h-4 w-4" />
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        💡 선택한 테마는 쇼핑몰의 전체 색상과 분위기를 결정합니다. 
                        나중에 관리자 화면에서 언제든 변경할 수 있어요.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: 서브도메인 설정 */}
              {currentStep === 2 && (
                <>
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl">쇼핑몰 주소 설정</CardTitle>
                    <CardDescription>
                      고객들이 접속할 쇼핑몰 주소를 설정해주세요
                    </CardDescription>
                  </CardHeader>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="subdomain" className="text-lg mb-4 block">
                        쇼핑몰 주소
                      </Label>
                      <div className="flex items-center gap-2 text-lg">
                        <span className="text-muted-foreground">https://</span>
                        <Input
                          id="subdomain"
                          value={subdomain}
                          onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                          className={`font-mono text-lg ${!isSubdomainValid ? 'border-destructive' : ''}`}
                          placeholder="mystore"
                        />
                        <span className="text-muted-foreground">.allinwom.com</span>
                      </div>
                      {!isSubdomainValid && subdomain && (
                        <p className="text-sm text-destructive mt-2">
                          영문 소문자, 숫자, 하이픈만 사용 가능하며 3자 이상이어야 합니다
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">완성된 주소:</p>
                      <p className="font-mono text-primary text-lg">
                        {getFullDomain()}
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        💡 주소는 한 번 설정하면 변경하기 어려우니 신중히 선택해주세요. 
                        고객들이 기억하기 쉬운 주소가 좋아요!
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: 템플릿 선택 */}
              {currentStep === 3 && (
                <>
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl">쇼핑몰 템플릿 선택</CardTitle>
                    <CardDescription>
                      브랜드에 맞는 디자인 템플릿을 선택해주세요
                    </CardDescription>
                  </CardHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {templates.map((template) => (
                      <Card 
                        key={template.id}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          selectedTemplate === template.id 
                            ? 'border-primary shadow-md' 
                            : ''
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <CardContent className="p-6">
                          <div className="text-center mb-4">
                            <div className="text-6xl mb-4">{template.mockupImage}</div>
                            <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {template.description}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium">주요 특징:</p>
                            {template.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-success" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          {selectedTemplate === template.id && (
                            <div className="mt-4 flex items-center justify-center">
                              <Badge className="bg-primary">선택됨</Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {/* Step 4: 최종 확인 */}
              {currentStep === 4 && (
                <>
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl">설정 확인</CardTitle>
                    <CardDescription>
                      선택한 내용을 확인하고 쇼핑몰을 생성하세요
                    </CardDescription>
                  </CardHeader>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Palette className="h-5 w-5" />
                            브랜드 테마
                          </h4>
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-6 h-6 rounded-full"
                              style={{ 
                                backgroundColor: themeOptions.find(t => t.id === selectedTheme)?.color 
                              }}
                            />
                            <span>{themeOptions.find(t => t.id === selectedTheme)?.name}</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            쇼핑몰 주소
                          </h4>
                          <p className="font-mono text-sm text-primary">
                            {getFullDomain()}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Monitor className="h-5 w-5" />
                          선택한 템플릿
                        </h4>
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">
                            {templates.find(t => t.id === selectedTemplate)?.mockupImage}
                          </span>
                          <div>
                            <p className="font-medium">
                              {templates.find(t => t.id === selectedTemplate)?.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {templates.find(t => t.id === selectedTemplate)?.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">
                        🎉 준비 완료!
                      </h4>
                      <p className="text-green-700">
                        모든 설정이 완료되었습니다. 
                        "쇼핑몰 생성하기" 버튼을 클릭하면 멋진 온라인 스토어가 만들어져요!
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 mt-8 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="btn-large"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  이전
                </Button>
                
                <Button 
                  onClick={handleNext} 
                  disabled={!canProceed()} 
                  className="btn-large"
                >
                  {currentStep === steps.length ? "쇼핑몰 생성하기" : "다음"}
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

export default StoreCreatePage;