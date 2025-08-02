import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ImageIcon, 
  Hash, 
  Video, 
  Clock,
  ArrowLeft 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Custom hooks and components
import { useAssetStudioState } from "@/hooks/useAssetStudioState";
import { Step1ImageUpload } from "@/components/AssetStudio/Step1ImageUpload";
import { DetailContentSettings } from "@/components/AssetStudio/Step2/DetailContentSettings";
import { FeedContentSettings } from "@/components/AssetStudio/Step2/FeedContentSettings";
import { ReelsContentSettings } from "@/components/AssetStudio/Step2/ReelsContentSettings";
import { StoryContentSettings } from "@/components/AssetStudio/Step2/StoryContentSettings";
import { DetailFinalPreview } from "@/components/AssetStudio/Step3/DetailFinalPreview";
import { FeedFinalPreview } from "@/components/AssetStudio/Step3/FeedFinalPreview";
import { ReelsFinalPreview } from "@/components/AssetStudio/Step3/ReelsFinalPreview";
import { StoryFinalPreview } from "@/components/AssetStudio/Step3/StoryFinalPreview";

const AssetStudioPage = () => {
  const navigate = useNavigate();
  const {
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
  } = useAssetStudioState();

  // Content type configuration
  const contentTypes = [
    {
      id: "detail" as const,
      icon: <ImageIcon className="h-8 w-8" />,
      title: "상품 상세 이미지",
      description: "상품의 세부 정보를 담은 상세 페이지용 이미지"
    },
    {
      id: "feed" as const,
      icon: <Hash className="h-8 w-8" />,
      title: "인스타 피드",
      description: "인스타 피드에 올라갈 정방형 이미지"
    },
    {
      id: "reels" as const,
      icon: <Video className="h-8 w-8" />,
      title: "인스타 릴스",
      description: "인스타 업로드용 짧은 동영상"
    },
    {
      id: "story" as const,
      icon: <Clock className="h-8 w-8" />,
      title: "인스타 스토리",
      description: "24시간 동안만 유지되는 인스타 게시물"
    }
  ];

  // Step 2 component mapping
  const renderStep2Component = () => {
    const commonProps = {
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
      onPreviousStep: () => setCurrentStep(1),
      onNextStep: () => setCurrentStep(3)
    };

    switch (contentType) {
      case "detail":
        return <DetailContentSettings {...commonProps} />;
      case "feed":
        return <FeedContentSettings {...commonProps} />;
      case "reels":
        return <ReelsContentSettings {...commonProps} />;
      case "story":
        return <StoryContentSettings {...commonProps} />;
      default:
        return null;
    }
  };

  // Step 3 component mapping
  const renderStep3Component = () => {
    if (!selectedImage) return null;

    const commonProps = {
      selectedImage,
      productName,
      editableCopy,
      onSaveToCalendar: handleSaveToCalendar
    };

    switch (contentType) {
      case "detail":
        return (
          <DetailFinalPreview 
            {...commonProps}
            keywords={keywords}
            expandKeyword={expandKeyword}
          />
        );
      case "feed":
        return <FeedFinalPreview {...commonProps} />;
      case "reels":
        return <ReelsFinalPreview {...commonProps} />;
      case "story":
        return <StoryFinalPreview {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              뒤로 가기
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">마케팅 에셋 생성하기</h1>
            <p className="text-lg text-muted-foreground">
              AI가 상품 사진을 마케팅 자료로 자동 변환해드려요
            </p>
          </div>
        </div>

        {/* Content Type Selection */}
        <div className="mb-8">
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="text-2xl">어떤 종류의 콘텐츠를 만드시겠어요?</CardTitle>
              <CardDescription>
                콘텐츠 종류에 따라 최적화된 이미지와 문구를 생성해드려요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {contentTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={contentType === type.id ? "default" : "outline"}
                    onClick={() => handleContentTypeSelect(type.id)}
                    className={`h-auto flex-col p-4 space-y-2 ${
                      contentType === type.id ? "gradient-primary text-white" : ""
                    }`}
                  >
                    {type.icon}
                    <span className="font-medium">{type.title}</span>
                    <span className="text-xs opacity-80">{type.description}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Step Progress Indicator */}
        {contentType && (
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === currentStep ? "bg-primary text-white" :
                    step < currentStep ? "bg-success text-white" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {step < currentStep ? "✓" : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-1 mx-2 ${
                      step < currentStep ? "bg-success" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-2 text-sm text-muted-foreground">
              {currentStep === 1 && "이미지 업로드 및 보정"}
              {currentStep === 2 && "상품 정보 입력 및 문구 생성"}
              {currentStep === 3 && "최종 상세 이미지 확인"}
            </div>
          </div>
        )}

        {/* Step Content */}
        {currentStep === 1 && contentType && (
          <Step1ImageUpload
            contentType={contentType}
            selectedImage={selectedImage}
            isProcessing={isProcessing}
            showResults={showResults}
            selectedFeatures={selectedFeatures}
            productFeatures={productFeatures}
            onImageUpload={handleImageUpload}
            onImageRemove={() => setSelectedImage(null)}
            onGenerate={handleGenerate}
            onFeatureToggle={handleFeatureToggle}
            onNextStep={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && contentType && (
          renderStep2Component()
        )}

        {currentStep === 3 && contentType && (
          renderStep3Component()
        )}
      </div>
    </div>
  );
};

export default AssetStudioPage;