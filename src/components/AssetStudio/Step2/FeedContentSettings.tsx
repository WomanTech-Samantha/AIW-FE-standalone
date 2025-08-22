import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Edit2, ArrowRight, Heart, Coffee, Briefcase, Smile } from "lucide-react";
import { EditableCopy } from "@/hooks/useAssetStudioState";

interface FeedContentSettingsProps {
  productName: string;
  setProductName: (name: string) => void;
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  showCopyGeneration: boolean;
  setShowCopyGeneration: (show: boolean) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  editableCopy: EditableCopy | null;
  setEditableCopy: (copy: EditableCopy | null) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
}

export const FeedContentSettings = ({
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
  onPreviousStep,
  onNextStep
}: FeedContentSettingsProps) => {
  const [selectedStyle, setSelectedStyle] = useState<string>("");

  const styleOptions = [
    { id: "friendly", label: "친밀/밈 스타일", icon: <Smile className="h-4 w-4" />, description: "재미있고 친근한 톤" },
    { id: "calm", label: "차분한 스타일", icon: <Coffee className="h-4 w-4" />, description: "차분하고 안정적인 톤" },
    { id: "professional", label: "전문적인 스타일", icon: <Briefcase className="h-4 w-4" />, description: "신뢰감 있는 전문적인 톤" },
    { id: "emotional", label: "감성적인 스타일", icon: <Heart className="h-4 w-4" />, description: "감정에 호소하는 톤" }
  ];
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="space-y-6">
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="text-xl">피드 콘텐츠 설정</CardTitle>
              <CardDescription>
                인스타그램 피드에 올릴 콘텐츠 정보를 입력해주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">상품 이름</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="예: 지속쿨링 냉감 이불"
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">강조 키워드 (최대 3개)</label>
                <div className="space-y-2 mt-1">
                  {keywords.map((keyword, index) => (
                    <input
                      key={index}
                      type="text"
                      value={keyword}
                      onChange={(e) => {
                        const newKeywords = [...keywords];
                        newKeywords[index] = e.target.value;
                        setKeywords(newKeywords);
                      }}
                      placeholder={`키워드 ${index + 1} (예: ${index === 0 ? "프리미엄 냉감 소재" :
                          index === 1 ? "국내산 원단" :
                            "맞춤 제작"
                        })`}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  입력한 키워드를 바탕으로 피드 문구가 자동 생성됩니다
                </p>
              </div>

              <Button
                onClick={() => setShowCopyGeneration(true)}
                className="w-full btn-large gradient-primary text-white"
                disabled={!productName.trim()}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                피드 본문 및 해시태그 생성하기
              </Button>
            </CardContent>
          </Card>
        </div>

        
        <div className="space-y-6">
          {showCopyGeneration && (
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  <span>자동 생성된 피드 문구</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    {isEditing ? "저장" : "수정"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">문구 스타일 선택</label>
                  <div className="grid grid-cols-2 gap-3">
                    {styleOptions.map((style) => (
                      <Button
                        key={style.id}
                        variant={selectedStyle === style.id ? "default" : "outline"}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`h-auto p-3 ${selectedStyle === style.id ? "gradient-primary text-white" : ""
                          }`}
                      >
                        <div className="flex items-center space-x-2">
                          {style.icon}
                          <span className="font-medium text-sm">{style.label}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">피드 본문</label>
                  {isEditing ? (
                    <textarea
                      value={editableCopy?.description || "품질과 디자인을 모두 갖춘 프리미엄 제품입니다 ✨"}
                      onChange={(e) => setEditableCopy((prev: EditableCopy | null) => prev ? { ...prev, description: e.target.value } : {
                        title: "",
                        description: e.target.value,
                        feature1: "",
                        feature2: "",
                        feature3: "",
                        feature4: "",
                        hashtags: "",
                        cta: ""
                      })}
                      rows={4}
                      className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="인스타그램 피드에 올릴 본문을 입력하세요..."
                    />
                  ) : (
                    <div className="mt-1 p-3 bg-muted rounded border">
                      <p className="text-sm leading-relaxed whitespace-pre-line">{editableCopy?.description || "품질과 디자인을 모두 갖춘 프리미엄 제품입니다 ✨"}</p>
                    </div>
                  )}
                </div>

                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">해시태그</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableCopy?.hashtags || `#${productName.replace(/\s+/g, '')} #인스타그램 #피드`}
                      onChange={(e) => setEditableCopy((prev: EditableCopy | null) => prev ? { ...prev, hashtags: e.target.value } : {
                        title: "",
                        description: "",
                        feature1: "",
                        feature2: "",
                        feature3: "",
                        feature4: "",
                        hashtags: e.target.value,
                        cta: ""
                      })}
                      className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="#해시태그를 입력하세요"
                    />
                  ) : (
                    <div className="mt-1 p-3 bg-muted rounded border">
                      <p className="text-sm text-primary">{editableCopy?.hashtags || `#${productName.replace(/\s+/g, '')} #인스타그램 #피드`}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        
        <div className="col-span-1 lg:col-span-2 flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={onPreviousStep}
            className="btn-large"
          >
            이전 단계
          </Button>
          <Button
            onClick={onNextStep}
            className="btn-large gradient-primary text-white"
            disabled={!productName.trim()}
          >
3단계 최종 피드 생성
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};