import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Upload,
  ImageIcon,
  Wand2,
  Zap,
  Sparkles,
  CheckCircle2,
  Eye,
  ArrowRight
} from "lucide-react";
import { ContentType } from "@/hooks/useAssetStudioState";

interface Step1ImageUploadProps {
  contentType: ContentType;
  selectedImage: string | null;
  isProcessing: boolean;
  showResults: boolean;
  storyText?: string;
  setStoryText?: (text: string) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  onGenerate: () => void;
  onNextStep: () => void;
}

export const Step1ImageUpload = ({
  contentType,
  selectedImage,
  isProcessing,
  showResults,
  storyText,
  setStoryText,
  onImageUpload,
  onImageRemove,
  onGenerate,
  onNextStep
}: Step1ImageUploadProps) => {
  const getContentTypeInfo = () => {
    switch (contentType) {
      case "detail":
        return {
          title: "상품 상세용",
          description: "고해상도 상세 이미지로 변환합니다",
          buttonText: "상품 사진 보정하기",
          helpText: "상품 특징이 잘 보이도록 최적화합니다",
          resultTitle: "상세 이미지",
          resultDescription: "상세 페이지에 들어갈 이미지입니다.",
          resultIcon: "고화질 변환",
          nextStepText: "2단계 상품 정보 입력"
        };
      case "feed":
        return {
          title: "인스타 피드용",
          description: "1:1 정방형 피드에 최적화합니다",
          buttonText: "피드용 이미지 보정하기",
          helpText: "인스타그램 피드에 눈에 띄도록 보정합니다",
          resultTitle: "피드 이미지",
          resultDescription: "1:1 피드용",
          resultIcon: "정방형 최적화",
          nextStepText: "2단계 피드 콘텐츠 설정"
        };
      case "reels":
        return {
          title: "릴스 썸네일용",
          description: "9:16 세로형 릴스에 맞게 조정합니다",
          buttonText: "릴스용 썸네일 보정하기",
          helpText: "동영상 썸네일로 시선을 끌도록 편집합니다",
          resultTitle: "릴스 썸네일",
          resultDescription: "9:16 릴스용",
          resultIcon: "세로형 최적화",
          nextStepText: "2단계 릴스 콘텐츠 설정"
        };
      case "story":
        return {
          title: "스토리용",
          description: "스토리 전용 세로형으로 편집합니다",
          buttonText: "스토리용 이미지 보정하기",
          helpText: "24시간 스토리에 최적화된 디자인을 적용합니다",
          resultTitle: "스토리 이미지",
          resultDescription: "스토리용 이미지입니다.",
          resultIcon: "스토리 최적화",
          nextStepText: "3단계 스토리 업로드"
        };
      default:
        return {
          title: "",
          description: "",
          buttonText: "",
          helpText: "",
          resultTitle: "",
          resultDescription: "",
          resultIcon: "",
          nextStepText: ""
        };
    }
  };

  const info = getContentTypeInfo();

  return (
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
              <label className="block border-2 border-dashed border-muted-foreground/25 text-center p-8 cursor-pointer hover:border-primary">
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
                  onChange={onImageUpload}
                  className="sr-only"
                />
              </label>
            ) : (
              <div className="space-y-4">
                <div className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <img
                    src={selectedImage}
                    alt="업로드된 상품"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={onImageRemove}
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
                이미지 보정 - {info.title}
              </CardTitle>
              <CardDescription>
                {info.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full btn-large bg-primary text-primary-foreground"
                onClick={onGenerate}
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
                    {info.buttonText}
                  </>
                )}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                {info.helpText}
              </p>
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
                  {info.resultTitle} 변환 완료!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <div className="w-full max-w-sm">
                    <p className="text-sm font-medium mb-2 text-center">
                      {info.resultDescription}
                    </p>
                    <div className="w-full h-64 bg-primary/10 rounded border flex items-center justify-center relative overflow-hidden">
                      <span className="text-sm font-medium">✨ {info.resultIcon}</span>
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

            {/* Story Text Input */}
            {contentType === "story" && (
              <Card className="card-soft">
                <CardHeader>
                  <CardTitle className="text-lg">스토리 문구</CardTitle>
                  <CardDescription>
                    스토리에 올릴 문구를 입력해주세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={storyText || ""}
                    onChange={(e) => setStoryText?.(e.target.value)}
                    placeholder="스토리에 올릴 문구를 입력하세요..."
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 1 Navigation */}
            <div className="mt-6 text-center">
              <Button
                onClick={onNextStep}
                className="btn-large bg-primary text-primary-foreground"
              >
{info.nextStepText}
                <ArrowRight className="ml-2 h-5 w-5" />
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
  );
};