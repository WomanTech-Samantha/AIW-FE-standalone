import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowRight, Upload, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const steps = [1, 2, 3, 4];

interface StoreTemplate {
  id: string;
  name: string;
  description: string;
  mockupImage: string;
}

export default function OnboardingPage() {
  const nav = useNavigate();
  const { user, completeOnboarding } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);

  // 브랜드 기본 정보 (사용자 정보와 직결)
  const [business, setBusiness] = useState(user?.business ?? "");
  const [storeName, setStoreName] = useState(user?.storeName ?? "");

  // 사이트 생성 정보
  const [selectedTheme, setSelectedTheme] = useState("warm");
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [subdomain, setSubdomain] = useState("");
  const [isSubdomainValid, setIsSubdomainValid] = useState(true);
  const [brandImageUrl, setBrandImageUrl] = useState("");
  const [brandImageFile, setBrandImageFile] = useState<File | null>(null);
  const [brandImagePreview, setBrandImagePreview] = useState<string>("");
  const [tagline, setTagline] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user?.hasOnboarded) nav("/studio", { replace: true });
  }, [user, nav]);

  // 상호명을 서브도메인으로 변환
  const convertToSubdomain = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  useEffect(() => {
    if (storeName && !subdomain) {
      setSubdomain(convertToSubdomain(storeName));
    }
  }, [storeName, subdomain]);

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
      mockupImage: "🏪"
    },
    {
      id: "modern", 
      name: "모던 부티크",
      description: "세련되고 현대적인 감각의 디자인",
      mockupImage: "🛍️"
    },
    {
      id: "minimal",
      name: "미니멀 샵", 
      description: "단순하고 깔끔한 미니멀 디자인",
      mockupImage: "📱"
    }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1: return business !== "" && storeName.trim().length > 0;
      case 2: return selectedTheme !== "" && subdomain && isSubdomainValid;
      case 3: return selectedTemplate !== "";
      case 4: return true;
      default: return false;
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCreating(true);
      
      // 사이트 생성 프로세스 시뮬레이션
      setTimeout(() => {
        setIsCreating(false);
        // 온보딩 완료 및 사이트 생성 상태 저장
        completeOnboarding({ 
          business, 
          storeName,
          theme: selectedTheme,
          template: selectedTemplate,
          subdomain,
          brandImageUrl,
          tagline
        });
        localStorage.setItem('has_online_store', 'true');
        nav("/studio", { replace: true });
      }, 3000);
    }
  };

  const progress = Math.round((currentStep / steps.length) * 100);

  if (isCreating) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold mb-4">설정 완료 중...</h2>
            <p className="text-muted-foreground">
              사용자 정보를 저장하고<br />
              온라인 스토어를 준비하고 있어요!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">사업장 정보 입력</h1>
          <div className="flex justify-center items-center space-x-2 text-lg">
            <span className="font-medium">{storeName ? `${storeName}의 온라인 스토어를 만들어보세요` : "온라인 스토어를 만들어보세요 🏠"}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-between text-sm font-medium mb-2">
            <span>진행상황</span>
            <span>{currentStep}/{steps.length}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div className="bg-primary h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="card-soft">
            <CardContent className="p-8 space-y-6">
              
              {/* Step 1: 브랜드 기본 정보 */}
              {currentStep === 1 && (
                <>
                  <CardHeader className="p-0">
                    <CardTitle>브랜드 기본 정보</CardTitle>
                    <CardDescription>사업장의 기본 정보를 입력해주세요</CardDescription>
                  </CardHeader>
                  
                  <div className="space-y-6">
                    <div>
                      <Label className="text-lg mb-4 block">업종 선택</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {["🛏️ 침구·이불", "🪟 커튼·블라인드", "👗 의류·패션", "🍽️ 음식·요리", "💄 뷰티·화장품", "🧵 수공예"].map((label) => (
                          <Button
                            key={label}
                            variant={business === label ? "default" : "outline"}
                            onClick={() => setBusiness(label)}
                            className="h-auto p-4"
                          >
                            {label} {business === label && <CheckCircle2 className="ml-2 h-4 w-4" />}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="storeName" className="text-lg mb-2 block">상호명</Label>
                      <Input 
                        id="storeName" 
                        value={storeName} 
                        onChange={(e) => setStoreName(e.target.value)} 
                        placeholder="예: 지숙커튼&침구"
                        className="text-lg"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: 사이트 테마 및 주소 */}
              {currentStep === 2 && (
                <>
                  <CardHeader className="p-0">
                    <CardTitle>사이트 테마 색상 및 주소</CardTitle>
                    <CardDescription>온라인 스토어의 테마 색상과 주소를 설정하세요</CardDescription>
                  </CardHeader>
                  
                  <div className="space-y-6">
                    <div>
                      <Label className="text-lg mb-4 block">브랜드 테마 색상 설정</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {themeOptions.map((theme) => (
                          <Button
                            key={theme.id}
                            variant={selectedTheme === theme.id ? "default" : "outline"}
                            className="h-auto p-4 flex flex-col items-center gap-3"
                            style={selectedTheme === theme.id ? { 
                              backgroundColor: theme.color, 
                              borderColor: theme.color,
                              color: 'white'
                            } : {}}
                            onClick={() => setSelectedTheme(theme.id)}
                          >
                            {selectedTheme === theme.id ? (
                              <CheckCircle2 className="h-8 w-8 text-white" />
                            ) : (
                              <div 
                                className="w-8 h-8 rounded-full"
                                style={{ backgroundColor: theme.color }}
                              />
                            )}
                            <span className="text-sm">{theme.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subdomain" className="text-lg mb-4 block">사이트 주소</Label>
                      <div className="flex items-center gap-2 text-lg">
                        <span className="text-muted-foreground">https://</span>
                        <Input
                          id="subdomain"
                          value={subdomain}
                          onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                          className={`font-mono ${!isSubdomainValid ? 'border-destructive' : ''}`}
                        />
                        <span className="text-muted-foreground">.allinwom.com</span>
                      </div>
                      {!isSubdomainValid && (
                        <p className="text-sm text-destructive mt-2">
                          영문 소문자, 숫자, 하이픈만 사용 가능하며 3자 이상이어야 합니다
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: 사이트 템플릿 */}
              {currentStep === 3 && (
                <>
                  <CardHeader className="p-0">
                    <CardTitle>사이트 템플릿</CardTitle>
                    <CardDescription>사이트 디자인 템플릿을 선택하세요</CardDescription>
                  </CardHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {templates.map((template) => (
                      <Card 
                        key={template.id}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          selectedTemplate === template.id ? 'border-primary shadow-md' : ''
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="text-6xl mb-4">{template.mockupImage}</div>
                          <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                          {selectedTemplate === template.id && (
                            <div className="mt-4">
                              <CheckCircle2 className="h-6 w-6 text-primary mx-auto" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {/* Step 4: 브랜드 이미지 (선택) */}
              {currentStep === 4 && (
                <>
                  <CardHeader className="p-0">
                    <CardTitle>브랜드 이미지 (선택사항)</CardTitle>
                    <CardDescription>로고나 대표 이미지를 추가하거나 나중에 설정할 수 있어요</CardDescription>
                  </CardHeader>
                  
                  <div className="space-y-6">
                    <div>
                      <Label>브랜드 대표 이미지</Label>
                      {!brandImagePreview ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <Card 
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <CardContent className="p-6 text-center">
                              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                              <h4 className="font-medium text-lg mb-2">이미지 업로드</h4>
                              <p className="text-sm text-muted-foreground">
                                보유하신 로고나 대표 이미지를 업로드하세요
                              </p>
                            </CardContent>
                          </Card>
                          
                          <Card 
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => {
                              const mockImage = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGQkVCIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iODAiIGZpbGw9IiNGRjg4NjYiLz4KPHRleHQgeD0iMTAwIiB5PSIxMTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0MCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7sspjtjbDtg508L3RleHQ+Cjwvc3ZnPg==`;
                              setBrandImagePreview(mockImage);
                              setBrandImageUrl(mockImage);
                            }}
                          >
                            <CardContent className="p-6 text-center">
                              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                              <h4 className="font-medium text-lg mb-2">AI로 생성하기</h4>
                              <p className="text-sm text-muted-foreground">
                                업종과 상호명을 바탕으로 이미지를 자동 생성해드려요
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-4 mt-4">
                          <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-primary">
                            <img src={brandImagePreview} alt="브랜드 이미지" className="w-full h-full object-cover" />
                            <Button
                              variant="secondary"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                setBrandImageFile(null);
                                setBrandImagePreview("");
                                setBrandImageUrl("");
                              }}
                            >
                              다시 선택
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setBrandImageFile(file);
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setBrandImagePreview(reader.result as string);
                              setBrandImageUrl(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tagline">슬로건 (선택)</Label>
                      <Input 
                        id="tagline" 
                        placeholder="예: 더 따뜻한 밤, 더 편안한 아침" 
                        value={tagline} 
                        onChange={(e) => setTagline(e.target.value)} 
                        className="text-lg mt-2"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 mt-8 border-t">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="btn-large"
                >
                  이전
                </Button>
                <Button onClick={handleNext} disabled={!canProceed()} className="btn-large">
                  {currentStep === steps.length ? "설정 완료" : "다음"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}