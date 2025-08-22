import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Edit2, ArrowRight } from "lucide-react";
import { EditableCopy } from "@/hooks/useAssetStudioState";

interface ReelsContentSettingsProps {
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

export const ReelsContentSettings = ({
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
}: ReelsContentSettingsProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="space-y-6">
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="text-xl">릴스 콘텐츠 설정</CardTitle>
              <CardDescription>
                인스타그램 릴스에 올릴 콘텐츠 정보를 입력해주세요
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
                      placeholder={`키워드 ${index + 1} (예: ${
                        index === 0 ? "프리미엄 냉감 소재" :
                        index === 1 ? "국내산 원단" :
                          "맞춤 제작"
                      })`}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  입력한 키워드를 바탕으로 릴스 문구가 자동 생성됩니다
                </p>
              </div>

              <Button
                onClick={() => setShowCopyGeneration(true)}
                className="w-full btn-large gradient-primary text-white"
                disabled={!productName.trim()}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                릴스 제목 및 해시태그 생성하기
              </Button>
            </CardContent>
          </Card>
        </div>

        
        <div className="space-y-6">
          {showCopyGeneration && (
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  <span>자동 생성된 릴스 제목 및 해시태그</span>
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
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">릴스 제목</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableCopy?.title || `🔥 ${productName || "상품"} 릴스용 영상`}
                      onChange={(e) => setEditableCopy((prev: EditableCopy | null) => prev ? { ...prev, title: e.target.value } : {
                        title: e.target.value,
                        description: "",
                        feature1: "",
                        feature2: "",
                        feature3: "",
                        feature4: "",
                        hashtags: "",
                        cta: ""
                      })}
                      className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="릴스 제목을 입력하세요..."
                    />
                  ) : (
                    <div className="mt-1 p-3 bg-muted rounded border">
                      <p className="text-base font-medium">{editableCopy?.title || `🔥 ${productName || "상품"} 릴스용 영상`}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">해시태그</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableCopy?.hashtags || `#${productName.replace(/\s+/g, '')} #릴스 #인스타그램 #트렌드`}
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
                      <p className="text-sm text-primary">{editableCopy?.hashtags || `#${productName.replace(/\s+/g, '')} #릴스 #인스타그램 #트렌드`}</p>
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
3단계 최종 릴스 생성
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};