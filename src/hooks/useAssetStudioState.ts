import { useState } from 'react';

export type ContentType = "detail" | "feed" | "reels" | "story";

export interface EditableCopy {
  title: string;
  description: string;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  hashtags: string;
  cta: string;
}

export interface ProductFeature {
  id: string;
  label: string;
  popular?: boolean;
}

export const useAssetStudioState = () => {
  // Basic state
  const [currentStep, setCurrentStep] = useState(1);
  const [contentType, setContentType] = useState<ContentType | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Content generation state
  const [productName, setProductName] = useState("");
  const [keywords, setKeywords] = useState(["", "", ""]);
  const [showCopyGeneration, setShowCopyGeneration] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableCopy, setEditableCopy] = useState<EditableCopy | null>(null);
  
  // Product features for non-detail types
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  const productFeatures: ProductFeature[] = [
    { id: "premium", label: "프리미엄 품질", popular: true },
    { id: "handmade", label: "수제 제작" },
    { id: "eco", label: "친환경 소재", popular: true },
    { id: "durable", label: "뛰어난 내구성" },
    { id: "comfortable", label: "편안한 착용감" },
    { id: "stylish", label: "세련된 디자인", popular: true },
    { id: "affordable", label: "합리적 가격" },
    { id: "versatile", label: "다양한 활용" }
  ];

  // Handlers
  const handleContentTypeSelect = (type: ContentType) => {
    setContentType(type);
    setCurrentStep(1);
    // Reset other states when changing content type
    setSelectedImage(null);
    setShowResults(false);
    setProductName("");
    setKeywords(["", "", ""]);
    setShowCopyGeneration(false);
    setEditableCopy(null);
    setSelectedFeatures([]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 2000);
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleSaveToCalendar = () => {
    const content = {
      id: Date.now(),
      image: selectedImage!,
      copy: editableCopy || {
        title: `✨ ${productName || "상품"} 상세 정보`,
        description: "품질과 디자인을 모두 갖춘 프리미엄 제품입니다",
        feature1: keywords[0] || "고품질 소재 사용",
        feature2: keywords[1] || "우수한 내구성", 
        feature3: keywords[2] || "완벽한 핏",
        feature4: "",
        hashtags: `#${productName.replace(/\s+/g, '')} #프리미엄 #추천`,
        cta: "지금 바로 구매하고 특별한 혜택 받아보세요!"
      },
      features: keywords.filter(k => k.trim()),
      createdAt: new Date().toISOString(),
      contentType
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('generatedContent') || '[]');
    existing.push(content);
    localStorage.setItem('generatedContent', JSON.stringify(existing));
    
    alert('캘린더에 저장되었습니다!');
  };

  // Helper function to expand keywords for detail content
  const expandKeyword = (keyword: string): string => {
    const expansions: Record<string, string> = {
      "프리미엄 냉감 소재": "최고급 냉감 원단을 사용하여 체온을 효과적으로 조절하고 땀 흡수가 빠릅니다.",
      "국내산 원단": "100% 국내 생산 원단으로 품질이 우수하고 안전성이 검증되었습니다.",
      "맞춤 제작": "고객님의 침대 사이즈에 완벽하게 맞춰 제작되어 흘러내림 없이 깔끔합니다.",
      "고품질 소재 사용": "엄선된 최고급 소재만을 사용하여 오래도록 변함없는 품질을 보장합니다.",
      "우수한 내구성": "특수 제작 공법으로 세탁 후에도 형태가 변하지 않고 오래 사용할 수 있습니다.",
      "완벽한 핏": "정밀한 재단과 봉제로 몸에 완벽하게 맞아 편안함을 극대화했습니다."
    };

    return expansions[keyword] || `${keyword}으로 더욱 특별한 제품입니다.`;
  };

  return {
    // State
    currentStep,
    setCurrentStep,
    contentType,
    selectedImage,
    setSelectedImage,
    isProcessing,
    showResults,
    productName,
    setProductName,
    keywords,
    setKeywords,
    showCopyGeneration,
    setShowCopyGeneration,
    isEditing,
    setIsEditing,
    editableCopy,
    setEditableCopy,
    selectedFeatures,
    productFeatures,
    
    // Handlers
    handleContentTypeSelect,
    handleImageUpload,
    handleGenerate,
    handleFeatureToggle,
    handleSaveToCalendar,
    expandKeyword
  };
};