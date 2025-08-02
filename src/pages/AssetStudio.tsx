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
  Zap,
  ShoppingBag,
  Hash,
  Video,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AssetStudioPage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [contentType, setContentType] = useState<"detail" | "feed" | "reels" | "story" | null>(null);

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

  // Mock auto-generated copy based on selected features and content type
  const generateCopy = () => {
    let titles, descriptions, hashtags, ctas;
    
    switch(contentType) {
      case "detail":
        titles = [
          "✨ 프리미엄 냉감 이불 상세 정보",
          "📐 맞춤 제작 침구의 모든 것",
          "🛡️ 항균 침구 제품 상세 안내"
        ];
        descriptions = [
          "▶ 소재: 프리미엄 냉감 원단 (폴리에스터 70%, 텐셀 30%)\n▶ 특징: 여름철 최적화, 항균 처리 완료\n▶ 관리법: 찬물 세탁 권장, 표백제 사용 금지\n▶ 사이즈: 싱글/퀸/킹 맞춤 가능",
          "▶ 맞춤 제작 과정\n1. 사이즈 측정 및 상담\n2. 원단 선택 (20가지 중 택1)\n3. 제작 기간: 5-7일\n4. 무료 배송 및 설치",
          "▶ 항균 인증 획득\n- KC 안전 인증 완료\n- 99.9% 항균 효과\n- 민감 피부에도 안전\n- 3년 품질 보증"
        ];
        break;
        
      case "feed":
        titles = [
          "시원한 여름밤을 책임지는 냉감 이불 🧊",
          "우리 집 딱 맞는 사이즈로 맞춤 제작 ✂️",
          "건강한 잠자리, 항균 처리된 프리미엄 침구 🛡️"
        ];
        descriptions = [
          "더운 여름밤도 시원하게! 특수 냉감 원단으로 만든 이불로 숙면을 경험해보세요. 항균 처리까지 완료되어 위생적이고 안전해요.",
          "일반 사이즈가 맞지 않나요? 고객님의 침대에 딱 맞는 사이즈로 맞춤 제작해드립니다. 20년 경력의 숙련된 장인이 직접 제작해요.",
          "매일 사용하는 침구, 깨끗하고 안전해야죠. 항균 처리된 원단으로 세균 걱정 없이 편안한 잠자리를 만들어드려요."
        ];
        break;
        
      case "reels":
        titles = [
          "🎬 3초만에 보는 냉감 이불 효과!",
          "✂️ 맞춤 제작 과정 대공개",
          "🛡️ 항균 침구가 필요한 이유"
        ];
        descriptions = [
          "💨 바람만 스쳐도 시원한 냉감 이불!\n\n✅ 여름철 필수템\n✅ 에어컨 비용 절감\n✅ 숙면 보장\n\n🎵 더 자세한 정보는 프로필 링크!",
          "🎥 우리 가게 맞춤 제작 과정\n\n0:00 - 고객 상담\n0:05 - 사이즈 측정\n0:10 - 원단 재단\n0:15 - 완성!\n\n📲 DM으로 상담하세요",
          "😱 침구에 세균이?\n\n매일 8시간 함께하는 침구\n항균 처리는 선택이 아닌 필수!\n\n💪 우리 가게 모든 제품 항균 인증"
        ];
        break;
        
      case "story":
        titles = [
          "🔥 오늘만 특가!",
          "📍 매장 방문 이벤트",
          "⏰ 마감 임박!"
        ];
        descriptions = [
          "스토리 보신 분들만!\n\n냉감 이불 20% 할인\n선착순 10명\n\nDM으로 '스토리' 보내주세요 🎁",
          "오늘 매장 방문하시면?\n\n☕ 시원한 음료 서비스\n🎁 미니 쿠션 증정\n📐 무료 사이즈 상담\n\n영업시간: 10:00-20:00",
          "⏰ 6시간 남았어요!\n\n항균 이불 세트\n정가 150,000원 → 99,000원\n\n지금 바로 연락주세요 📞"
        ];
        break;
        
      default:
        titles = ["제품을 선택해주세요"];
        descriptions = ["콘텐츠 타입을 먼저 선택해주세요"];
    }
    
    hashtags = contentType === "story" 
      ? ["#지숙커튼침구 #오늘만특가 #스토리이벤트"]
      : [
          "#냉감이불맛집 #여름침구 #시원한이불 #지숙커튼침구",
          "#맞춤제작 #사이즈주문제작 #침구맞춤 #커튼맞춤",
          "#항균침구 #건강한잠자리 #프리미엄침구 #안전한침구"
        ];
    
    ctas = contentType === "story"
      ? ["👆 위로 스와이프해서 더보기"]
      : [
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
    if (!contentType) {
      alert("먼저 콘텐츠 타입을 선택해주세요.");
      return;
    }
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 2000);
  };
  
  const handleContentTypeSelect = (type: "detail" | "feed" | "reels" | "story") => {
    setContentType(type);
    setShowResults(false); // Reset results when changing content type
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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">마케팅 에셋 생성하기</h1>
          <p className="text-lg text-muted-foreground">
            상품 사진을 마케팅 자료로 자동 변환 후 업로드 예약까지 완료하세요.
          </p>
        </div>
        
        {/* Content Type Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">어떤 콘텐츠를 만드시겠어요?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant={contentType === "detail" ? "default" : "outline"}
              onClick={() => handleContentTypeSelect("detail")}
              className={`h-auto flex-col p-4 space-y-2 ${contentType === "detail" ? "gradient-primary text-white" : ""}`}
            >
              <ShoppingBag className="h-8 w-8" />
              <span className="font-medium">상품 상세 이미지</span>
              <span className="text-xs opacity-80">쇼핑몰용 상세페이지</span>
            </Button>
            
            <Button
              variant={contentType === "feed" ? "default" : "outline"}
              onClick={() => handleContentTypeSelect("feed")}
              className={`h-auto flex-col p-4 space-y-2 ${contentType === "feed" ? "gradient-primary text-white" : ""}`}
            >
              <Hash className="h-8 w-8" />
              <span className="font-medium">인스타 피드</span>
              <span className="text-xs opacity-80">정방형 게시물</span>
            </Button>
            
            <Button
              variant={contentType === "reels" ? "default" : "outline"}
              onClick={() => handleContentTypeSelect("reels")}
              className={`h-auto flex-col p-4 space-y-2 ${contentType === "reels" ? "gradient-primary text-white" : ""}`}
            >
              <Video className="h-8 w-8" />
              <span className="font-medium">인스타 릴스</span>
              <span className="text-xs opacity-80">짧은 동영상</span>
            </Button>
            
            <Button
              variant={contentType === "story" ? "default" : "outline"}
              onClick={() => handleContentTypeSelect("story")}
              className={`h-auto flex-col p-4 space-y-2 ${contentType === "story" ? "gradient-primary text-white" : ""}`}
            >
              <Clock className="h-8 w-8" />
              <span className="font-medium">인스타 스토리</span>
              <span className="text-xs opacity-80">24시간 한정</span>
            </Button>
          </div>
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
            {selectedImage && contentType && (
              <Card className="card-soft">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Wand2 className="mr-2 h-6 w-6" />
                    이미지 보정 - {
                      contentType === "detail" ? "상품 상세용" :
                      contentType === "feed" ? "인스타 피드용" :
                      contentType === "reels" ? "릴스 썸네일용" :
                      "스토리용"
                    }
                  </CardTitle>
                  <CardDescription>
                    {contentType === "detail" && "고해상도 상세 이미지로 변환합니다"}
                    {contentType === "feed" && "1:1 정방형 피드에 최적화합니다"}
                    {contentType === "reels" && "9:16 세로형 릴스에 맞게 조정합니다"}
                    {contentType === "story" && "스토리 전용 세로형으로 편집합니다"}
                  </CardDescription>
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
                        {contentType === "detail" ? "상세 이미지 생성" :
                         contentType === "feed" ? "피드 이미지 생성" :
                         contentType === "reels" ? "릴스 썸네일 생성" :
                         "스토리 이미지 생성"}
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    {contentType === "detail" && "상품 특징이 잘 보이도록 최적화합니다"}
                    {contentType === "feed" && "인스타그램 피드에 눈에 띄도록 보정합니다"}
                    {contentType === "reels" && "동영상 썸네일로 시선을 끌도록 편집합니다"}
                    {contentType === "story" && "24시간 스토리에 최적화된 디자인을 적용합니다"}
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
                      {contentType === "detail" ? "상세 이미지" :
                       contentType === "feed" ? "피드 이미지" :
                       contentType === "reels" ? "릴스 썸네일" :
                       "스토리 이미지"} 변환 완료!
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
                        <p className="text-sm font-medium mb-2">
                          {contentType === "detail" ? "상세 페이지용" :
                           contentType === "feed" ? "1:1 피드용" :
                           contentType === "reels" ? "9:16 릴스용" :
                           "9:16 스토리용"}
                        </p>
                        <div className={`w-full ${
                          contentType === "detail" ? "h-48" :
                          contentType === "feed" ? "h-32" :
                          "h-48"
                        } bg-gradient-to-br from-primary/20 to-primary-glow/20 rounded border flex items-center justify-center relative overflow-hidden`}>
                          <span className="text-sm font-medium">✨ {
                            contentType === "detail" ? "고화질 변환" :
                            contentType === "feed" ? "정방형 최적화" :
                            contentType === "reels" ? "세로형 최적화" :
                            "스토리 최적화"
                          }</span>
                          {contentType === "story" && (
                            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                              24시간
                            </div>
                          )}
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