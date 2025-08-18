import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowRight, Upload, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/MockAuthContext";
import CozyHome from "@/templates/Cozy/CozyHome";
import ChicFashion from "@/templates/Chic/ChicHome";
import BeautyShop from "@/templates/Beauty/BeautyHome";
import "@/templates/base.css";

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
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [isSubdomainValid, setIsSubdomainValid] = useState(true);
  const [brandImageUrl, setBrandImageUrl] = useState("");
  const [brandImageFile, setBrandImageFile] = useState<File | null>(null);
  const [brandImagePreview, setBrandImagePreview] = useState<string>("");
  const [tagline, setTagline] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // AI 이미지 생성 상태
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  useEffect(() => {
    if (user?.hasOnboarded) nav("/studio", { replace: true });
  }, [user, nav]);

  // 상호명을 서브도메인으로 변환
  const convertToSubdomain = (name: string) => {
    if (!name.trim()) return '';
    
    const converted = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    
    // 변환 결과가 너무 짧으면 빈 문자열 반환 (자동 설정하지 않음)
    if (converted.length < 3) {
      return '';
    }
    
    return converted;
  };

  useEffect(() => {
    if (storeName) {
      const converted = convertToSubdomain(storeName);
      if (converted !== subdomain) {
        setSubdomain(converted);
      }
    } else {
      // 상호명이 비어있으면 서브도메인도 비우기
      setSubdomain('');
    }
  }, [storeName]);

  useEffect(() => {
    const isValid = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(subdomain) && subdomain.length >= 3;
    setIsSubdomainValid(isValid);
  }, [subdomain]);

  // AI 이미지 생성 함수
  const generateAIImage = () => {
    setIsGeneratingImage(true);
    
    // 2초 후 이미지 생성
    setTimeout(() => {
      // 업종에 따른 색상
      const colors = {
        "침구": "#9B7EBD",
        "커튼": "#6B8E65",
        "의류": "#D4526E",
        "음식": "#C67B5C",
        "뷰티": "#E8A49C",
        "수공예": "#7189A6"
      };
      
      const businessType = Object.keys(colors).find(key => business.includes(key));
      const color = colors[businessType] || "#9B7EBD";
      const initials = storeName.slice(0, 2).toUpperCase() || "AI";

      const mockImage = `data:image/svg+xml;base64,${btoa(`
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" fill="#FAFAFA"/>
          <circle cx="100" cy="100" r="70" fill="${color}"/>
          <text x="100" y="115" font-family="Arial" font-size="40" font-weight="bold" fill="white" text-anchor="middle">${initials}</text>
        </svg>
      `)}`;
      
      setBrandImagePreview(mockImage);
      setBrandImageUrl(mockImage);
      setIsGeneratingImage(false);
    }, 2000);
  };

  const themeOptions = [
    { 
      id: "warm-rose", 
      name: "웜 로즈", 
      color: "#D4526E",
      palette: {
        primary: '#D4526E',
        secondary: '#F5B7B1',
        accent: '#E8A49C',
        background: '#FAF3F0',
        surface: '#FFFFFF',
        text: '#2C2C2C',
        textLight: '#666666',
        border: '#E5E5E5'
      }
    },
    { 
      id: "sage-green", 
      name: "세이지 그린", 
      color: "#6B8E65",
      palette: {
        primary: '#6B8E65',
        secondary: '#A8C09C',
        accent: '#8FA885',
        background: '#F5F7F4',
        surface: '#FFFFFF',
        text: '#2C2C2C',
        textLight: '#666666',
        border: '#E5E5E5'
      }
    },
    { 
      id: "dusty-blue", 
      name: "더스티 블루", 
      color: "#7189A6",
      palette: {
        primary: '#7189A6',
        secondary: '#A8B8CC',
        accent: '#8DA3C0',
        background: '#F4F6F8',
        surface: '#FFFFFF',
        text: '#2C2C2C',
        textLight: '#666666',
        border: '#E5E5E5'
      }
    },
    { 
      id: "terracotta", 
      name: "테라코타", 
      color: "#C67B5C",
      palette: {
        primary: '#C67B5C',
        secondary: '#E5A985',
        accent: '#D69373',
        background: '#FAF6F3',
        surface: '#FFFFFF',
        text: '#2C2C2C',
        textLight: '#666666',
        border: '#E5E5E5'
      }
    },
    { 
      id: "lavender", 
      name: "라벤더", 
      color: "#9B7EBD",
      palette: {
        primary: '#9B7EBD',
        secondary: '#C4A9D8',
        accent: '#B195CC',
        background: '#F7F5F9',
        surface: '#FFFFFF',
        text: '#2C2C2C',
        textLight: '#666666',
        border: '#E5E5E5'
      }
    }
  ];

  const templates: StoreTemplate[] = [
    {
      id: "cozy",
      name: "편안한",
      description: "포근하고 따뜻한 분위기의 템플릿",
      mockupImage: "🏠"
    },
    {
      id: "chic", 
      name: "시크한",
      description: "세련되고 우아한 미니멀 템플릿",
      mockupImage: "✨"
    },
    {
      id: "beauty",
      name: "자연스러운", 
      description: "부드러운 감성의 템플릿",
      mockupImage: "🌿"
    }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1: return business !== "" && storeName.trim().length > 0;
      case 2: return subdomain && isSubdomainValid;
      case 3: return selectedTheme !== "" && selectedTemplate !== "";
      case 4: return true;
      default: return false;
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCreating(true);
      
      try {
        // 온보딩 완료 API 호출
        await completeOnboarding({ 
          business, 
          storeName,
          theme: selectedTheme,
          template: selectedTemplate,
          subdomain,
          brandImageUrl: brandImageFile ? brandImagePreview : brandImageUrl,
          tagline
        });
        
        localStorage.setItem('has_online_store', 'true');
        nav("/studio", { replace: true });
      } catch (error) {
        console.error('온보딩 완료 실패:', error);
        setIsCreating(false);
        // 에러 처리 - 실제로는 토스트나 알림 표시
        alert('온보딩 완료 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
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

              {/* Step 2: 사이트 주소 */}
              {currentStep === 2 && (
                <>
                  <CardHeader className="p-0">
                    <CardTitle>사이트 주소 설정</CardTitle>
                    <CardDescription>온라인 스토어의 주소를 설정하세요</CardDescription>
                  </CardHeader>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="subdomain" className="text-lg mb-4 block">사이트 주소</Label>
                      <div className="flex items-center gap-2 text-lg">
                        <span className="text-muted-foreground">https://</span>
                        <Input
                          id="subdomain"
                          value={subdomain}
                          onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                          className={`font-mono ${!isSubdomainValid ? 'border-destructive' : ''}`}
                          autoComplete="off"
                          placeholder="mystore"
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

              {/* Step 3: 사이트 템플릿 및 테마 */}
              {currentStep === 3 && (
                <>
                  <CardHeader className="p-0">
                    <CardTitle>사이트 템플릿 및 테마</CardTitle>
                    <CardDescription>사이트 디자인과 색상을 선택하세요</CardDescription>
                  </CardHeader>
                  
                  <div className="space-y-8">
                    {/* 템플릿 선택 */}
                    <div>
                      <Label className="text-lg mb-4 block">템플릿 선택</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {templates.map((template) => (
                          <Card 
                            key={template.id}
                            className={`cursor-pointer transition-all hover:shadow-lg ${
                              selectedTemplate === template.id ? 'border-primary shadow-md' : ''
                            }`}
                            onClick={() => setSelectedTemplate(template.id)}
                          >
                            <CardContent className="p-4 text-center">
                              <div className="text-4xl mb-3">{template.mockupImage}</div>
                              <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                              <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                              {selectedTemplate === template.id && (
                                <CheckCircle2 className="h-6 w-6 text-primary mx-auto" />
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* 테마 색상 선택 */}
                    {selectedTemplate && (
                      <div>
                        <Label className="text-lg mb-4 block">테마 색상</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {themeOptions.map((theme) => (
                            <Button
                              key={theme.id}
                              variant={selectedTheme === theme.id ? "default" : "outline"}
                              className="h-auto p-3 flex items-center gap-3"
                              style={selectedTheme === theme.id ? { 
                                backgroundColor: theme.color, 
                                borderColor: theme.color,
                                color: 'white'
                              } : {}}
                              onClick={() => setSelectedTheme(theme.id)}
                            >
                              {selectedTheme === theme.id ? (
                                <CheckCircle2 className="h-5 w-5 text-white" />
                              ) : (
                                <div 
                                  className="w-5 h-5 rounded-full"
                                  style={{ backgroundColor: theme.color }}
                                />
                              )}
                              <span className="text-sm">{theme.name}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 템플릿 미리보기 */}
                    {selectedTemplate && selectedTheme && (
                      <div>
                        <Label className="text-lg mb-4 block">미리보기</Label>
                        <div className="border rounded-lg shadow-lg bg-white overflow-hidden">
                          <div className="h-[400px] overflow-auto">
                            <div 
                              className="transform scale-50 origin-top-left"
                              style={{
                                width: '200%',
                                height: '200%',
                                ...(() => {
                                  const selectedPalette = themeOptions.find(t => t.id === selectedTheme)?.palette;
                                  if (!selectedPalette) return {};
                                  
                                  return {
                                    '--color-primary': selectedPalette.primary,
                                    '--color-secondary': selectedPalette.secondary,
                                    '--color-accent': selectedPalette.accent,
                                    '--color-background': selectedPalette.background,
                                    '--color-surface': selectedPalette.surface,
                                    '--color-text': selectedPalette.text,
                                    '--color-textLight': selectedPalette.textLight,
                                    '--color-border': selectedPalette.border
                                  } as React.CSSProperties;
                                })()
                              } as React.CSSProperties}
                            >
                              {selectedTemplate === 'cozy' && <CozyHome />}
                              {selectedTemplate === 'chic' && <ChicFashion />}
                              {selectedTemplate === 'beauty' && <BeautyShop />}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
                            className={`cursor-pointer hover:shadow-md transition-shadow ${
                              isGeneratingImage ? 'opacity-50 cursor-wait' : ''
                            }`}
                            onClick={() => !isGeneratingImage && generateAIImage()}
                          >
                            <CardContent className="p-6 text-center">
                              {isGeneratingImage ? (
                                <>
                                  <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                                  <h4 className="font-medium text-lg mb-2">이미지 생성 중...</h4>
                                  <p className="text-sm text-muted-foreground">
                                    AI가 열심히 만들고 있어요
                                  </p>
                                </>
                              ) : (
                                <>
                                  <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                                  <h4 className="font-medium text-lg mb-2">AI로 생성하기</h4>
                                  <p className="text-sm text-muted-foreground">
                                    업종과 상호명을 바탕으로 이미지를 자동 생성해드려요
                                  </p>
                                </>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-4 mt-4">
                          <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-primary">
                            <img src={brandImagePreview} alt="브랜드 이미지" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setBrandImageFile(null);
                                setBrandImagePreview("");
                                setBrandImageUrl("");
                              }}
                            >
                              뒤로 가기
                            </Button>
                            {!brandImageFile && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => generateAIImage()}
                                disabled={isGeneratingImage}
                              >
                                {isGeneratingImage ? (
                                  <>
                                    <div className="animate-spin w-3 h-3 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
                                    생성 중...
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    다시 생성
                                  </>
                                )}
                              </Button>
                            )}
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
                            // 파일 크기 체크 (5MB 제한)
                            if (file.size > 5 * 1024 * 1024) {
                              alert('이미지 파일 크기는 5MB 이하여야 합니다.');
                              return;
                            }
                            
                            setBrandImageFile(file);
                            const reader = new FileReader();
                            
                            reader.onerror = () => {
                              console.error('파일 읽기 오류');
                              alert('이미지를 읽는 중 오류가 발생했습니다.');
                            };
                            
                            reader.onloadend = () => {
                              setBrandImagePreview(reader.result as string);
                              // Data URL은 미리보기용으로만 사용
                              setBrandImageUrl('');
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tagline">브랜드 대표 문장 (선택)</Label>
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