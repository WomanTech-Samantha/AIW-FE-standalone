import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const steps = [1, 2, 3, 4, 5];

export default function OnboardingPage() {
  const nav = useNavigate();
  const { user, completeOnboarding } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);

  // 기존 스텝 유지 + 추가 항목
  const [business, setBusiness] = useState(user?.business ?? "");
  const [color, setColor] = useState(user?.color ?? "");
  const [theme, setTheme] = useState<"warm" | "calm" | "nature" | "elegant" | "fresh" | "soft" | "">("");
  const [storeName, setStoreName] = useState(user?.storeName ?? "");
  const [brandImageUrl, setBrandImageUrl] = useState("");
  const [tagline, setTagline] = useState("");

  useEffect(() => {
    // 이미 온보딩이 끝난 사용자라면 대시보드로
    if (user?.hasOnboarded) nav("/dashboard", { replace: true });
  }, [user, nav]);

  const canProceed = () => {
    switch (currentStep) {
      case 1: return business !== "";
      case 2: return color !== "" && theme !== "";
      case 3: return true;  // SNS 모의 처리
      case 4: return storeName.trim().length > 0;
      case 5: return true;  // 브랜드 이미지/슬로건은 선택사항으로
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
    else {
      completeOnboarding({ business, color, theme, storeName, brandImageUrl, tagline });
      nav("/dashboard", { replace: true });
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brandImageUrl">브랜드 대표 이미지 URL</Label>
                      <Input id="brandImageUrl" placeholder="https://..." value={brandImageUrl} onChange={(e) => setBrandImageUrl(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tagline">슬로건(선택)</Label>
                      <Input id="tagline" placeholder="예: 더 따뜻한 밤, 더 편안한 아침" value={tagline} onChange={(e) => setTagline(e.target.value)} />
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
