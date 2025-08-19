import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Save,
  Package,
  Wand2,
  RefreshCw,
  CheckCircle,
  ArrowRight,
  ImageIcon
} from "lucide-react";

const ProductAddPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 폼 상태
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<number | null>(null);

  // 데모 상품 예시 데이터
  const demoProducts = [
    {
      id: 1,
      name: "손뜨개 마크라메 벽걸이",
      price: "68000",
      keywords: ["마크라메", "핸드메이드", "보헤미안", "인테리어"],
      imageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755358464/products/original/1755358464564_%ED%95%98%ED%8A%B8_%ED%8C%A8%EC%B9%98%EC%9B%8C%ED%81%AC_original.jpg",
      enhancedImageUrl: "" // 나중에 URL 추가 예정
    },
    {
      id: 2,
      name: "퀼트 러그 매트",
      price: "75000",
      keywords: ["퀼트", "러그", "인테리어", "포근"],
      imageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755358464/products/original/1755358464564_%ED%95%98%ED%8A%B8_%ED%8C%A8%EC%B9%98%EC%9B%8C%ED%81%AC_original.jpg",
      enhancedImageUrl: "" // 나중에 URL 추가 예정
    },
    {
      id: 3,
      name: "핸드메이드 패치워크 코스터",
      price: "12000",
      keywords: ["핸드메이드", "패치워크", "수공예", "인테리어"],
      imageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755358464/products/original/1755358464564_%ED%95%98%ED%8A%B8_%ED%8C%A8%EC%B9%98%EC%9B%8C%ED%81%AC_original.jpg",
      enhancedImageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755358463/products/enhanced/1755358461387_%ED%95%98%ED%8A%B8_%ED%8C%A8%EC%B9%98%EC%9B%8C%ED%81%AC_enhanced.jpg"
    },
    {
      id: 4,
      name: "패브릭 핸드메이드 파우치",
      price: "25000",
      keywords: ["패브릭", "파우치", "핸드메이드", "감성"],
      imageUrl: "https://res.cloudinary.com/dojsq7mnw/image/upload/v1755358464/products/original/1755358464564_%ED%95%98%ED%8A%B8_%ED%8C%A8%EC%B9%98%EC%9B%8C%ED%81%AC_original.jpg",
      enhancedImageUrl: "" // 나중에 URL 추가 예정
    }
  ];


  // 가격 포맷팅 함수
  const formatPrice = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (!numbers) return '';
    return Number(numbers).toLocaleString() + '원';
  };

  // 가격 입력 처리
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    setProductPrice(value);
  };

  // AI 처리 상태
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [generatedFeatures, setGeneratedFeatures] = useState<Array<{ feature: string, detail: string }>>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<Array<{ feature: string, detail: string }>>([]);
  const [editingFeature, setEditingFeature] = useState<number | null>(null);
  const [regeneratingImage, setRegeneratingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


  // 로딩 메시지 상태
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState("");

  // 로딩 메시지 배열
  const loadingMessages = [
    "AI 작업중... 🎨",
    "완벽한 이미지를 위해 고민중입니다 ☕",
    "AI 화가가 열심히 그리고 있어요! ✨",
    "픽셀 하나하나 정성스럽게 배치중... 🔍",
    "잠깐 기지개라도 펴보시는 건 어떠세요? 🙆‍♀️",
    "색상 조합 중... 🌈",
    "프로 사진작가처럼 각도를 조정중이에요 📸",
    "빛과 그림자 조화... 💡",
    "평균 1분 정도의 시간이 필요해요 ⏰",
    "마법을 부리는 중... ✨"
  ];

  // 단계 관리
  const [currentStep, setCurrentStep] = useState<"input" | "preview" | "complete">("input");

  // 로딩 메시지 순환 useEffect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isProcessing || regeneratingImage) {
      // 첫 번째 메시지 즉시 설정
      const getRandomMessage = () => {
        const randomIndex = Math.floor(Math.random() * loadingMessages.length);
        return loadingMessages[randomIndex];
      };

      setCurrentLoadingMessage(getRandomMessage());

      // 2~4초 랜덤 간격으로 메시지 변경
      const scheduleNext = () => {
        const randomDelay = Math.floor(Math.random() * 2000) + 2000; // 2000~4000ms
        interval = setTimeout(() => {
          setCurrentLoadingMessage(getRandomMessage());
          scheduleNext(); // 다음 메시지 스케줄
        }, randomDelay);
      };

      scheduleNext();
    } else {
      setCurrentLoadingMessage("");
    }

    return () => {
      if (interval) {
        clearTimeout(interval);
      }
    };
  }, [isProcessing, regeneratingImage]);

  // 키워드 추가
  const handleAddKeyword = () => {
    if (keywords.length >= 4) {
      alert("최대 4개까지 키워드를 추가할 수 있습니다.");
      return;
    }
    if (currentKeyword.trim()) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword("");
    }
  };

  // 키워드 삭제
  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  // 키워드 입력 시 엔터 처리
  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  // 데모 상품 로드
  const loadDemoProduct = async (demo: typeof demoProducts[0]) => {
    try {
      // 선택된 데모 설정
      setSelectedDemo(demo.id);

      // 상품 정보 설정
      setProductName(demo.name);
      setProductPrice(demo.price);
      setKeywords(demo.keywords);

      // 이미지 다운로드 및 File 객체로 변환
      const response = await fetch(demo.imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `${demo.name}.jpg`, { type: blob.type });

      setProductImage(file);
      setImagePreview(demo.imageUrl);

    } catch (error) {
      console.error('데모 상품 로드 실패:', error);
      // 에러 시에도 텍스트 정보는 설정
      setSelectedDemo(demo.id);
      setProductName(demo.name);
      setProductPrice(demo.price);
      setKeywords(demo.keywords);
    }
  };

  // 이미지를 Base64로 변환하는 유틸리티 함수
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // data:image/jpeg;base64, 부분을 제거하고 base64 데이터만 추출
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // 이미지 업로드 처리
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 제거
  const handleRemoveImage = () => {
    setProductImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // AI 처리 시작 (Mock)
  const handleProcessWithAI = async () => {
    if (!productName || !productPrice || keywords.length === 0 || !productImage) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }

    setIsProcessing(true);

    try {
      console.log('Mock AI 처리 시작:', {
        productName: productName.trim(),
        keywords: keywords
      });

      // Mock 이미지 생성 시뮬레이션 (10-15초 사이 랜덤)
      const delay = Math.floor(Math.random() * 5000) + 10000; // 10-15초
      await new Promise(resolve => setTimeout(resolve, delay));

      // Mock 생성된 이미지 URL - 각 데모 상품별 개별 이미지 사용
      const selectedDemoProduct = demoProducts.find(d => d.id === selectedDemo);
      if (selectedDemoProduct?.enhancedImageUrl) {
        setEnhancedImage(selectedDemoProduct.enhancedImageUrl);
      } else {
        setEnhancedImage("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%234F46E5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='24' font-family='sans-serif'%3EEnhanced Product%3C/text%3E%3C/svg%3E");
      }

      // Mock 상품 특징 생성 (키워드 기반)
      const mockFeatures = generateMockFeatures(keywords);
      setGeneratedFeatures(mockFeatures);
      setSelectedFeatures(mockFeatures);

      setHasProcessed(true);
      setCurrentStep("preview");

      console.log('Mock AI 처리 완료');

    } catch (error: any) {
      console.error("AI 처리 실패:", error);
      alert("AI 처리 중 오류가 발생했습니다. (데모)");
    } finally {
      setIsProcessing(false);
    }
  };

  // Mock 특징 생성 함수
  const generateMockFeatures = (keywords: string[]) => {
    const featureTemplates = [
      {
        feature: "프리미엄 품질",
        detail: "최고급 소재와 정교한 기술로 제작된 프리미엄 품질의 제품입니다. 오래도록 변함없는 우수한 품질을 경험해보세요."
      },
      {
        feature: "편리한 사용",
        detail: "사용자의 편의를 고려한 실용적인 설계로 일상생활에서 더욱 편리하게 사용할 수 있습니다."
      },
      {
        feature: "만족도 보장",
        detail: "많은 고객들의 긍정적인 후기와 높은 만족도를 자랑하는 검증된 제품입니다."
      }
    ];

    // 키워드 수에 맞게 특징 반환
    return featureTemplates.slice(0, Math.min(keywords.length, 3));
  };

  // 개별 특징 재생성 (Mock)
  const handleRegenerateFeature = async (index: number) => {
    setEditingFeature(index);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock 대안 특징들
      const alternativeFeatures = [
        [
          { feature: "즉각 냉감 효과", detail: "쿨링 폴리에스터 원단을 채택하여 몸에 닿는 순간 즉시 청량한 느낌을 줍니다. 더운 날씨에도 땀과 열기를 빠르게 흡수하고 배출해 수면 내내 시원하고 쾌적한 환경을 제공합니다." },
          { feature: "프리미엄 통기성", detail: "3D 메쉬 구조로 공기 순환이 원활하여 습기와 열기를 효과적으로 배출합니다. 밤새 쾌적한 온도를 유지하여 깊은 잠에 빠질 수 있도록 도와줍니다." },
          { feature: "순간 냉각 시스템", detail: "특수 냉각 섬유가 체온을 감지하여 자동으로 온도를 조절합니다. 무더운 여름밤에도 시원함을 유지하여 편안한 잠자리를 제공합니다." }
        ],
        [
          { feature: "항균 & 방취 기능", detail: "특수 항균 처리로 세균 번식을 억제하고 불쾌한 냄새를 방지합니다. 오랜 시간 사용해도 깨끗하고 상쾌한 상태를 유지하여 건강하고 위생적인 수면 환경을 조성합니다." },
          { feature: "친환경 소재", detail: "100% 재활용 폴리에스터를 사용한 친환경 제품입니다. 환경을 생각하는 마음과 함께 건강한 수면을 제공하여 지구와 가족 모두에게 좋은 선택입니다." },
          { feature: "자연 항균 처리", detail: "천연 은이온 기술로 99.9% 항균 효과를 제공합니다. 화학 처리 없이도 자연스럽게 세균과 바이러스를 억제하여 안전하고 깨끗한 수면 환경을 만들어줍니다." }
        ],
        [
          { feature: "극세사 부드러운 터치", detail: "고밀도 극세사 원단으로 비단처럼 부드럽고 매끄러운 촉감을 선사합니다. 민감한 피부에도 자극 없이 편안하며, 고급스러운 질감으로 호텔급 수면의 품질을 경험할 수 있습니다." },
          { feature: "간편한 세탁 관리", detail: "일반 가정용 세탁기로 간편하게 세탁 가능하며, 빠른 건조로 관리가 용이합니다. 형태 변형 없이 오래도록 부드러운 촉감을 유지합니다." },
          { feature: "실크 같은 질감", detail: "마이크로파이버 기술로 실크보다 더 부드러운 촉감을 구현했습니다. 피부에 닿는 순간 느껴지는 매끄러움으로 최상급 편안함을 선사합니다." }
        ]
      ];

      // 현재 특징과 다른 대안 선택
      const currentFeature = selectedFeatures[index].feature;
      const alternatives = alternativeFeatures[index];
      const newFeature = alternatives.find(alt => alt.feature !== currentFeature) || alternatives[0];

      const updatedFeatures = [...selectedFeatures];
      updatedFeatures[index] = newFeature;
      setSelectedFeatures(updatedFeatures);

    } catch (error) {
      console.error("특징 재생성 실패:", error);
      alert("재생성 중 오류가 발생했습니다. (데모)");
    } finally {
      setEditingFeature(null);
    }
  };

  // 이미지 생성 또는 재생성 (Mock)
  const handleRegenerateImage = async () => {
    setRegeneratingImage(true);

    try {
      // Mock 재생성 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock 이미지 색상 변경
      const colors = ['4F46E5', '10B981', 'F59E0B', 'EF4444'];
      const currentColor = enhancedImage?.match(/fill='%23([A-F0-9]+)'/)?.[1] || '4F46E5';
      const currentIndex = colors.indexOf(currentColor);
      const nextColor = colors[(currentIndex + 1) % colors.length];
      setEnhancedImage(`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23${nextColor}'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='24' font-family='sans-serif'%3EEnhanced Product%3C/text%3E%3C/svg%3E`);

    } catch (error) {
      console.error("이미지 재생성 실패:", error);
      alert("이미지 재생성 중 오류가 발생했습니다. (데모)");
    } finally {
      setRegeneratingImage(false);
    }
  };

  // 최종 저장 (Mock)
  const handleFinalSave = async () => {
    if (isSaving) {
      return; // 이미 저장 중이면 중복 실행 방지
    }

    if (!enhancedImage || selectedFeatures.length === 0) {
      alert('생성된 이미지와 특징이 필요합니다.');
      return;
    }

    if (!productName.trim() || !productPrice) {
      alert('상품명과 가격을 입력해주세요.');
      return;
    }

    setIsSaving(true);

    try {
      console.log('[Mock Product Save] 상품 저장 시작');

      // Mock 저장 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 2000));

      // localStorage에 저장
      const savedProducts = JSON.parse(localStorage.getItem('demo_products') || '[]');
      const newProduct = {
        id: `product-${Date.now()}`,
        name: productName.trim(),
        price: parseInt(productPrice.toString()),
        keywords: keywords,
        features: selectedFeatures,
        thumbnailUrl: enhancedImage,
        originalImage: imagePreview,
        images: [enhancedImage],
        createdAt: new Date().toISOString()
      };

      savedProducts.push(newProduct);
      localStorage.setItem('demo_products', JSON.stringify(savedProducts));

      console.log('[Mock Product Save] 저장 완료:', newProduct);

      // 완료 화면으로 이동
      setCurrentStep("complete");

      // 2초 후 스튜디오로 이동
      setTimeout(() => {
        navigate("/studio");
      }, 2000);

    } catch (error) {
      console.error('[Mock Product Save] 저장 실패:', error);
      alert(`상품 저장 중 오류가 발생했습니다: 데모 환경에서는 오류가 발생할 수 있습니다.`);
    } finally {
      setIsSaving(false);
    }
  };

  // 완료 화면
  if (currentStep === "complete") {
    return (
      <div className="page-container">
        <div className="max-w-2xl mx-auto text-center py-16">
          <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-6" />
          <h1 className="text-3xl font-bold mb-4">상품이 성공적으로 추가되었습니다!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            AI가 보정한 이미지와 설명으로 마케팅 에셋을 생성할 준비가 완료되었습니다.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/studio")}
            className="px-8"
          >
            스튜디오로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/studio")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {currentStep === "input" ? "상품 추가하기" : "AI 처리 결과 확인"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {currentStep === "input"
                ? "사장님의 제품을 소개해주세요. 올인움이 멋진 마케팅 자료를 만들어드릴게요!"
                : "AI가 생성한 이미지와 설명을 확인하고 수정하세요"
              }
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* 입력 단계 */}
        {currentStep === "input" && (
          <div className="space-y-6">
            {/* 데모 상품 선택 섹션 */}
            <Card className="card-soft border-emerald-200 bg-emerald-50/50">
              <CardHeader>
                <CardTitle className="text-xl text-emerald-800">🚀 빠른 데모 시연을 위한 상품 예시</CardTitle>
                <CardDescription className="text-emerald-600">
                  아래 번호를 선택하시면 AI 처리 과정을 바로 확인하실 수 있습니다!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-start gap-3">
                  {demoProducts.map((demo) => (
                    <Button
                      key={demo.id}
                      variant="outline"
                      onClick={() => loadDemoProduct(demo)}
                      className={`relative w-20 h-20 p-0 rounded-t-xl font-bold text-2xl transition-all duration-300 transform ${selectedDemo === demo.id
                        ? 'bg-white text-emerald-600 border-emerald-400 shadow-lg scale-110 translate-y-[-12px] z-10 border-b-white'
                        : 'bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200 hover:text-gray-600 translate-y-0'
                        }`}
                      style={{
                        boxShadow: selectedDemo === demo.id ? '0 -6px 16px rgba(16, 185, 129, 0.2)' : undefined
                      }}
                    >
                      {demo.id}
                    </Button>
                  ))}
                </div>
                {/* 사전 바닥 라인 */}
                <div className="h-1 bg-emerald-100 rounded-full mt-[-1px] relative z-0"></div>
              </CardContent>
            </Card>

            {/* 기존 상품 정보 입력 카드 */}
            <Card className="card-soft">
              <CardHeader>
                <CardTitle>상품 정보 입력</CardTitle>
                <CardDescription>
                  데모 버전에서는 위의 예시 상품을 선택해주세요. 실제 버전에서는 직접 입력이 가능합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 상품 이름 */}
                <div className="space-y-2">
                  <Label htmlFor="product-name" className="text-base font-semibold">
                    상품 이름
                  </Label>
                  <Input
                    id="product-name"
                    type="text"
                    placeholder="위의 예시 상품을 선택하면 자동으로 입력됩니다"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="h-12 text-base"
                    disabled={true}
                  />
                </div>

                {/* 가격 */}
                <div className="space-y-2">
                  <Label htmlFor="product-price" className="text-base font-semibold">
                    가격
                  </Label>
                  <div className="relative">
                    <Input
                      id="product-price"
                      type="text"
                      placeholder="예시 상품 선택 시 자동 입력"
                      value={productPrice}
                      onChange={handlePriceChange}
                      className="h-12 text-base"
                      disabled={true}
                    />
                    {productPrice && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        → {formatPrice(productPrice)}
                      </div>
                    )}
                  </div>
                </div>

                {/* 제품 강조 키워드 */}
                <div className="space-y-2">
                  <Label htmlFor="keywords" className="text-base font-semibold">
                    제품 강조 키워드 (최대 4개)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="keywords"
                      type="text"
                      placeholder="예시 상품 선택 시 키워드가 자동으로 설정됩니다"
                      value={currentKeyword}
                      onChange={(e) => setCurrentKeyword(e.target.value)}
                      onKeyPress={handleKeywordKeyPress}
                      className="h-12 text-base flex-1"
                      disabled={true}
                    />
                    <Button
                      onClick={handleAddKeyword}
                      disabled={true}
                      className="h-12 px-6"
                    >
                      <Plus className="h-5 w-5 mr-1" />
                      추가
                    </Button>
                  </div>

                  {/* 추가된 키워드 표시 */}
                  {keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {keywords.map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-sm py-2 px-3"
                        >
                          {keyword}
                          <button
                            onClick={() => handleRemoveKeyword(index)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground">
                    데모 버전에서는 위의 예시 상품을 선택하면 키워드가 자동으로 설정됩니다. 이 키워드를 토대로 다음 페이지에 마케팅 문구가 생성됩니다.
                  </p>
                </div>


                {/* 상품 이미지 업로드 */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">
                    상품 이미지
                  </Label>

                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center bg-gray-50">
                      <Package className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                      <p className="text-base font-medium text-gray-500">예시 상품 선택 시 이미지가 자동으로 설정됩니다</p>
                      <p className="text-sm text-gray-400 mt-1">
                        데모 버전에서는 직접 업로드가 제한됩니다
                      </p>
                    </div>
                  ) : (
                    <div className="relative border rounded-lg p-4">
                      <img
                        src={imagePreview}
                        alt="상품 미리보기"
                        className="w-full max-w-48 mx-auto"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white border-gray-300 text-gray-600 hover:text-gray-800"
                        onClick={handleRemoveImage}
                        disabled={true}
                      >
                        <X className="h-4 w-4 mr-1" />
                        사진 변경
                      </Button>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  <p className="text-sm text-muted-foreground">
                    데모 버전에서는 예시 상품의 이미지만 사용 가능합니다. 실제 버전에서는 올인움 AI가 업로드한 이미지를 자동으로 보정해드립니다.
                  </p>
                </div>

              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === "preview" && (
          <div className="space-y-6">
            {/* 이미지 비교 */}
            <Card className="card-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>이미지 보정 결과</CardTitle>
                    <CardDescription>
                      AI가 원본 이미지를 마케팅용으로 보정했습니다
                    </CardDescription>
                  </div>
                  {hasProcessed && (
                    <Button
                      variant="outline"
                      onClick={handleRegenerateImage}
                      disabled={regeneratingImage}
                      className="flex items-center gap-2 transition-all duration-500 ease-in-out min-w-[140px]"
                      style={{
                        width: regeneratingImage ? 'auto' : undefined,
                        minWidth: regeneratingImage ? '200px' : '140px'
                      }}
                    >
                      <RefreshCw className={`h-4 w-4 ${regeneratingImage ? 'animate-spin' : ''}`} />
                      {regeneratingImage ? (currentLoadingMessage || "이미지 재생성 중...") : "이미지 재생성"}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 원본 이미지 */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">원본 이미지</Label>
                    <div className="border rounded-lg p-4 bg-gray-50 min-h-[280px] flex items-center justify-center">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="원본 이미지"
                          className="w-full max-w-48 mx-auto"
                        />
                      ) : (
                        <div className="w-full max-w-48 mx-auto aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 보정된 이미지 */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">AI 보정 이미지</Label>
                    <div className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-purple-50 relative min-h-[280px] flex items-center justify-center">
                      {enhancedImage ? (
                        <img
                          src={enhancedImage}
                          alt="보정된 이미지"
                          className="w-full max-w-48 mx-auto"
                        />
                      ) : (
                        <div className="w-full max-w-48 mx-auto aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                          <div className="flex flex-col items-center gap-2">
                            <ImageIcon className="h-12 w-12 text-gray-400" />
                            <span className="text-sm text-gray-500">이미지 생성 중...</span>
                          </div>
                        </div>
                      )}
                      {regeneratingImage && (
                        <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
                          <div className="flex flex-col items-center gap-2 text-primary">
                            <RefreshCw className="h-6 w-6 animate-spin" />
                            <span className="text-sm font-medium">{enhancedImage ? '새 이미지 생성 중...' : '이미지 생성 중...'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 상품 특징 선택 */}
            <Card className="card-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>AI 생성 상품 특징</CardTitle>
                    <CardDescription>
                      입력한 키워드를 바탕으로 생성된 3가지 특징을 확인하세요
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedFeatures.length === 0 ? (
                  // 플레이스홀더 상태
                  <div className="space-y-4">
                    {[1, 2, 3].map((num) => (
                      <Card key={num} className="border-gray-200 bg-gray-50/50">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="text-sm font-medium">
                                  특징 {num}
                                </Badge>
                                <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                              <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  selectedFeatures.map((item, index) => (
                    <Card
                      key={index}
                      className="border-gray-200 bg-gray-50/50 relative"
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-sm font-medium">
                                특징 {index + 1}
                              </Badge>
                              <h4 className="text-lg font-bold text-primary">
                                {item.feature}
                              </h4>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRegenerateFeature(index)}
                              disabled={editingFeature === index}
                              className="text-gray-500 hover:text-primary"
                            >
                              <RefreshCw className={`h-4 w-4 ${editingFeature === index ? 'animate-spin' : ''}`} />
                            </Button>
                          </div>
                          <p className="text-base leading-relaxed text-gray-700">
                            {item.detail}
                          </p>
                          {editingFeature === index && (
                            <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
                              <div className="flex items-center gap-2 text-primary">
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                <span className="text-sm font-medium">새로운 특징 생성 중...</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            size="lg"
            onClick={() => currentStep === "preview" ? setCurrentStep("input") : navigate("/studio")}
            className="px-8"
          >
            {currentStep === "preview" ? "이전" : "취소"}
          </Button>

          {currentStep === "input" && (
            <Button
              size="lg"
              onClick={handleProcessWithAI}
              disabled={isProcessing || !productName || !productPrice || keywords.length === 0 || !productImage}
              className="px-8 bg-primary hover:bg-primary/90 transition-all duration-500 ease-in-out min-w-[200px]"
              style={{
                width: isProcessing ? 'auto' : undefined,
                minWidth: isProcessing ? '250px' : '200px'
              }}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  {currentLoadingMessage || "AI 처리 중..."}
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5 mr-2" />
                  스마트 생성하기
                </>
              )}
            </Button>
          )}

          {currentStep === "preview" && (
            <Button
              size="lg"
              onClick={handleFinalSave}
              className="px-8 bg-primary hover:bg-primary/90"
              disabled={isSaving}
            >
              <Save className="h-5 w-5 mr-2" />
              {isSaving ? '저장 중...' : '상품 저장하기'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductAddPage;