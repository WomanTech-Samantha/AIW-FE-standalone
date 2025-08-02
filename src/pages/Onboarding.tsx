import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowRight, Upload, Image, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const steps = [1, 2, 3];

export default function OnboardingPage() {
  const nav = useNavigate();
  const { user, completeOnboarding } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);

  // 브랜드 기본 정보만 수집
  const [business, setBusiness] = useState(user?.business ?? "");
  const [storeName, setStoreName] = useState(user?.storeName ?? "");
  
  // 사이트 생성 관련 정보
  const [selectedTheme, setSelectedTheme] = useState("warm");
  const [selectedColor, setSelectedColor] = useState("warm");
  const [subdomain, setSubdomain] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [brandImageUrl, setBrandImageUrl] = useState("");
  const [brandImageFile, setBrandImageFile] = useState<File | null>(null);
  const [brandImagePreview, setBrandImagePreview] = useState<string>("");
  const [tagline, setTagline] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubdomainValid, setIsSubdomainValid] = useState(true);

  useEffect(() => {
    // 이미 온보딩이 끝난 사용자라면 콘텐츠 작업공간으로
    if (user?.hasOnboarded) nav("/studio", { replace: true });
  }, [user, nav]);

  const canProceed = () => {
    switch (currentStep) {
      case 1: return business !== "";
      case 2: return color !== "" && theme !== "";
      case 3: return true;  // SNS 모의 처리
      case 4: return storeName.trim().length > 0;
      case 5: return true;  // 브랜드 이미지/슬로건은 선택사항으로
      case 6: return true;  // 환영 메시지
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
    else {
      completeOnboarding({ business, color, theme, storeName, brandImageUrl, tagline });
      nav("/studio", { replace: true });
    }
  };

  const progress = Math.round((currentStep / steps.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">회원님의 소중한 사업장에 대해 알려주세요.</h1>
          <div className="flex justify-center items-center space-x-2 text-lg">
            <span className="font-medium">{storeName || "🏠"}</span>
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

        {/* Main */}
        <div className="max-w-4xl mx-auto">
          <Card className="card-soft">
            <CardContent className="p-8 space-y-6">
              {currentStep === 1 && (
                <>
                  <CardHeader className="p-0">
                    <CardTitle>업종 선택</CardTitle>
                    <CardDescription>맞춤형 템플릿과 자동화를 구성합니다</CardDescription>
                  </CardHeader>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    {["🛏️ 침구·이불", "🪟 커튼·블라인드", "👗 의류·패션", "🍽️ 음식·요리", "💄 뷰티·화장품", "🧵 수공예"].map((label) => (
                      <Button
                        key={label}
                        variant={business === label ? "default" : "outline"}
                        onClick={() => setBusiness(label)}
                      >
                        {label} {business === label && <CheckCircle2 className="ml-2 h-4 w-4" />}
                      </Button>
                    ))}
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <CardHeader className="p-0">
                    <CardTitle>브랜드 컬러 & 테마</CardTitle>
                    <CardDescription>모든 마케팅 자산에 일관되게 반영돼요</CardDescription>
                  </CardHeader>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: "warm", name: "따뜻한 주황" },
                      { id: "calm", name: "차분한 파랑" },
                      { id: "nature", name: "자연 녹색" },
                      { id: "elegant", name: "우아한 보라" },
                      { id: "fresh", name: "상쾌한 민트" },
                      { id: "soft", name: "부드러운 핑크" },
                    ].map(({ id, name }) => (
                      <Button key={id} variant={color === id ? "default" : "outline"} onClick={() => { setColor(id); setTheme(id as any); }}>
                        {name} {color === id && <CheckCircle2 className="ml-2 h-4 w-4" />}
                      </Button>
                    ))}
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <CardHeader className="p-0">
                    <CardTitle>SNS 연동(선택)</CardTitle>
                    <CardDescription>나중에 설정에서 언제든 연결할 수 있어요</CardDescription>
                  </CardHeader>
                  <div className="flex justify-center items-center gap-6">
                    <Button variant="outline">페이스북 연결 🔗</Button>
                    <Button variant="outline">인스타그램 연결 🔗</Button>
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <CardHeader className="p-0">
                    <CardTitle>상호명 입력</CardTitle>
                    <CardDescription>문서/이미지에 자동 반영됩니다</CardDescription>
                  </CardHeader>
                  <div className="space-y-2">
                    <Label htmlFor="storeName">상호명</Label>
                    <Input id="storeName" value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="예: 지숙커튼&침구" />
                  </div>
                </>
              )}

              {currentStep === 5 && (
                <>
                  <CardHeader className="p-0">
                    <CardTitle>브랜드 이미지/슬로건</CardTitle>
                    <CardDescription>선택 입력: 초기 마케팅 자산에 사용돼요</CardDescription>
                  </CardHeader>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label>브랜드 대표 이미지</Label>
                      {!brandImagePreview ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card 
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <CardContent className="p-6 text-center">
                              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                              <h4 className="font-medium text-lg mb-2">이미지 업로드</h4>
                              <p className="text-sm text-muted-foreground">
                                보유하신 로고나 대표 이미지를<br />
                                업로드하세요
                              </p>
                            </CardContent>
                          </Card>
                          
                          <Card 
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => {
                              // AI 생성 로직 - 실제로는 API 호출이 필요
                              const mockGeneratedImage = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGQkVCIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iODAiIGZpbGw9IiNGRjg4NjYiLz4KPHRleHQgeD0iMTAwIiB5PSIxMTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0MCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7sspjtjbDtg508L3RleHQ+Cjwvc3ZnPg==`;
                              setBrandImagePreview(mockGeneratedImage);
                              setBrandImageUrl(mockGeneratedImage);
                            }}
                          >
                            <CardContent className="p-6 text-center">
                              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                              <h4 className="font-medium text-lg mb-2">AI로 생성하기</h4>
                              <p className="text-sm text-muted-foreground">
                                업종과 상호명을 바탕으로<br />
                                이미지를 자동 생성해드려요
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-4">
                          <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-primary">
                            <img 
                              src={brandImagePreview} 
                              alt="브랜드 이미지 미리보기" 
                              className="w-full h-full object-cover"
                            />
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="tagline">슬로건(선택)</Label>
                      <Input 
                        id="tagline" 
                        placeholder="예: 더 따뜻한 밤, 더 편안한 아침" 
                        value={tagline} 
                        onChange={(e) => setTagline(e.target.value)} 
                        className="text-lg"
                      />
                    </div>
                  </div>
                </>
              )}

              {currentStep === 6 && (
                <>
                  <div className="text-center py-8">
                    <div className="mb-8">
                      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-12 w-12 text-primary" />
                      </div>
                      <h2 className="text-3xl font-bold mb-4">
                        {storeName} 사장님, 환영합니다!
                      </h2>
                      <p className="text-xl text-muted-foreground leading-relaxed">
                        이제부터 ALL-IN-WOM이 사장님의 온라인 마케팅을 도와드릴게요.
                        <br />
                        AI가 만드는 맞춤형 콘텐츠로 더 많은 고객을 만나보세요!
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                      <Card className="bg-muted/30">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl mb-2">🎨</div>
                          <h4 className="font-medium">콘텐츠 제작</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            AI가 전문적인 홍보물을 자동으로 만들어드려요
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-muted/30">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl mb-2">📅</div>
                          <h4 className="font-medium">일정 관리</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            최적의 시간에 자동으로 게시물을 올려드려요
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-muted/30">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl mb-2">📊</div>
                          <h4 className="font-medium">성과 분석</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            마케팅 효과를 한눈에 확인할 수 있어요
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </>
              )}

              {/* Nav buttons */}
              <div className="flex justify-between pt-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="btn-large"
                >
                  이전
                </Button>
                <Button onClick={handleNext} disabled={!canProceed()} className="btn-large">
                  {currentStep === steps.length ? "시작하기" : "다음"}
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
