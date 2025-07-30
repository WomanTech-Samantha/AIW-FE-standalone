import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Wand2,
  Download,
  Eye,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ImageIcon,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AssetStudioPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Sample product features for bedding/curtain business
  const productFeatures = [
    { id: "summer_cool", label: "여름용 냉감", popular: true },
    { id: "custom_size", label: "사이즈 맞춤 제작", popular: true },
    { id: "antibacterial", label: "항균 처리" },
    { id: "hypoallergenic", label: "알레르기 방지" },
    { id: "easy_wash", label: "세탁 간편" },
    { id: "eco_friendly", label: "친환경 소재" },
    { id: "fire_resistant", label: "난연 처리" },
    { id: "blackout", label: "암막 기능" }
  ];

  // Mock auto-generated copy based on selected features
  const generateCopy = () => {
    const titles = [
      "시원한 여름밤을 책임지는 냉감 이불 🧊",
      "우리 집 딱 맞는 사이즈로 맞춤 제작 ✂️",
      "건강한 잠자리, 항균 처리된 프리미엄 침구 🛡️"
    ];

    const descriptions = [
      "더운 여름밤도 시원하게! 특수 냉감 원단으로 만든 이불로 숙면을 경험해보세요. 항균 처리까지 완료되어 위생적이고 안전해요.",
      "일반 사이즈가 맞지 않나요? 고객님의 침대에 딱 맞는 사이즈로 맞춤 제작해드립니다. 20년 경력의 숙련된 장인이 직접 제작해요.",
      "매일 사용하는 침구, 깨끗하고 안전해야죠. 항균 처리된 원단으로 세균 걱정 없이 편안한 잠자리를 만들어드려요."
    ];

    const hashtags = [
      "#냉감이불맛집 #여름침구 #시원한이불 #지숙커튼침구",
      "#맞춤제작 #사이즈주문제작 #침구맞춤 #커튼맞춤",
      "#항균침구 #건강한잠자리 #프리미엄침구 #안전한침구"
    ];

    const ctas = [
      "📞 지금 주문하고 시원한 여름 보내세요!",
      "💬 사이즈 상담 받아보세요 (무료)",
      "🛒 건강한 잠자리, 지금 시작하세요!"
    ];

    const randomIndex = Math.floor(Math.random() * titles.length);
    return {
      title: titles[randomIndex],
      description: descriptions[randomIndex],
      hashtags: hashtags[randomIndex],
      cta: ctas[randomIndex]
    };
  };

  const mockGeneratedCopy = generateCopy();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleGenerate = () => {
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 2000);
  };

  const handleSaveToCalendar = () => {
    // Save generated content to localStorage
    const generatedContent = {
      id: Date.now(),
      image: selectedImage,
      copy: mockGeneratedCopy,
      features: selectedFeatures,
      createdAt: new Date().toISOString()
    };

    const existingContent = JSON.parse(localStorage.getItem('generatedContent') || '[]');
    localStorage.setItem('generatedContent', JSON.stringify([...existingContent, generatedContent]));

    navigate('/calendar');
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">에셋 스튜디오</h1>
            <p className="text-lg text-muted-foreground">
              상품 사진을 마케팅 자료로 자동 변환 후 업로드 예약까지 완료하세요.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/instagram')}
            className="btn-large"
          >
            <Calendar className="mr-2 h-5 w-5" />
            인스타 직접 업로드
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Upload & Settings */}
          <div className="space-y-6">
            {/* Image Upload */}
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <ImageIcon className="mr-2 h-6 w-6" />
                  상품 사진 업로드
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedImage ? (
                  <label className="block border-2 border-dashed … text-center p-8 cursor-pointer hover:border-primary">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium">이미지를 선택해주세요</p>
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG 파일 (최대 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </label>
                ) : (
                  <div className="space-y-4">
                    <img
                      src={selectedImage}
                      alt="업로드된 상품"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setSelectedImage(null)}
                      className="w-full"
                    >
                      다른 이미지 선택
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Background Enhancement */}
            {selectedImage && (
              <Card className="card-soft">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Wand2 className="mr-2 h-6 w-6" />
                    이미지 보정
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full btn-large gradient-primary text-white"
                    onClick={handleGenerate}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                        처리 중...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
                        배경 정리 & 보정 실행
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    AI가 자동으로 배경을 정리하고 이미지를 보정해드려요
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Product Features */}
            {selectedImage && (
              <Card className="card-soft">
                <CardHeader>
                  <CardTitle className="text-xl">강조할 특징 선택</CardTitle>
                  <CardDescription>
                    선택하신 특징을 바탕으로 마케팅 문구를 자동 생성해드려요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {productFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${selectedFeatures.includes(feature.id)
                          ? "bg-primary/10 border-primary"
                          : "bg-card border-border hover:border-primary/50"
                          }`}
                        onClick={() => handleFeatureToggle(feature.id)}
                      >
                        <Checkbox
                          checked={selectedFeatures.includes(feature.id)}
                          onChange={() => { }} // Handled by parent click
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium">{feature.label}</span>
                          {feature.popular && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              인기
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Results */}
          <div className="space-y-6">
            {showResults ? (
              <>
                {/* Before/After Comparison */}
                <Card className="card-soft">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <CheckCircle2 className="mr-2 h-6 w-6 text-success" />
                      변환 완료!
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">원본</p>
                        <img
                          src={selectedImage!}
                          alt="원본"
                          className="w-full h-32 object-cover rounded border"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">보정된 이미지</p>
                        <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded border flex items-center justify-center">
                          <span className="text-sm font-medium">✨ AI 보정 완료</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Auto-generated Copy */}
                <Card className="card-soft">
                  <CardHeader>
                    <CardTitle className="text-xl">자동 생성된 마케팅 문구</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">제목</label>
                      <div className="mt-1 p-3 bg-muted rounded border">
                        <p className="text-base font-medium">{mockGeneratedCopy.title}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">설명</label>
                      <div className="mt-1 p-3 bg-muted rounded border">
                        <p className="text-sm leading-relaxed">{mockGeneratedCopy.description}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">해시태그</label>
                      <div className="mt-1 p-3 bg-muted rounded border">
                        <p className="text-sm text-primary">{mockGeneratedCopy.hashtags}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">행동 유도</label>
                      <div className="mt-1 p-3 bg-muted rounded border">
                        <p className="text-sm font-medium">{mockGeneratedCopy.cta}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1 btn-large">
                    <Download className="mr-2 h-5 w-5" />
                    다운로드
                  </Button>
                  <Button
                    onClick={handleSaveToCalendar}
                    className="flex-1 btn-large gradient-primary text-white"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    캘린더에 저장
                  </Button>
                </div>
              </>
            ) : (
              <Card className="card-soft h-64 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Eye className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">결과 미리보기</p>
                    <p className="text-sm text-muted-foreground">
                      이미지를 업로드하고 보정을 실행하면<br />
                      결과를 여기에서 확인할 수 있어요
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetStudioPage;