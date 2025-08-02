import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download, Calendar } from "lucide-react";
import { EditableCopy } from "@/hooks/useAssetStudioState";

interface StoryFinalPreviewProps {
  selectedImage: string;
  productName: string;
  editableCopy: EditableCopy | null;
  storyText?: string;
  onSaveToCalendar: () => void;
}

export const StoryFinalPreview = ({
  selectedImage,
  productName,
  editableCopy,
  storyText,
  onSaveToCalendar
}: StoryFinalPreviewProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="card-soft">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <CheckCircle2 className="mr-2 h-6 w-6 text-success" />
            최종 스토리 이미지
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-6 bg-white max-h-[600px] overflow-y-auto">
            {/* 상품 이미지 - 세로형 */}
            <div className="mb-6 flex justify-center">
              <div className="w-48 h-64 relative">
                <img
                  src={selectedImage}
                  alt="스토리 이미지"
                  className="w-full h-full object-contain rounded-lg"
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  24시간
                </div>
              </div>
            </div>
            
            {/* 메인 텍스트 */}
            <div className="text-center mb-6">
              <p className="text-lg leading-relaxed font-bold">
                {storyText || "⏰ 24시간만! 놓치면 후회하는 특별 기회"}
              </p>
            </div>
            
            {/* 해시태그 */}
            <div className="text-center">
              <p className="text-sm text-primary">
                {editableCopy?.hashtags || `#${productName.replace(/\s+/g, '')} #스토리 #한정특가`}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1 btn-large">
                <Download className="mr-2 h-5 w-5" />
                다운로드
              </Button>
              <Button
                onClick={onSaveToCalendar}
                className="flex-1 btn-large gradient-primary text-white"
              >
                <Calendar className="mr-2 h-5 w-5" />
                업로드 예약
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};