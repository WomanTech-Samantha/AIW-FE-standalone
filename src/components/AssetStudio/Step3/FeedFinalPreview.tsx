import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download, Calendar } from "lucide-react";
import { EditableCopy } from "@/hooks/useAssetStudioState";

interface FeedFinalPreviewProps {
  selectedImage: string;
  productName: string;
  editableCopy: EditableCopy | null;
  onSaveToCalendar: () => void;
}

export const FeedFinalPreview = ({
  selectedImage,
  productName,
  editableCopy,
  onSaveToCalendar
}: FeedFinalPreviewProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="card-soft">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <CheckCircle2 className="mr-2 h-6 w-6 text-success" />
            최종 피드 이미지
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-6 bg-white max-h-[600px] overflow-y-auto">
            {/* 상품 이미지 */}
            <div className="mb-6">
              <img
                src={selectedImage}
                alt="피드 콘텐츠"
                className="w-full h-64 object-contain rounded-lg"
              />
            </div>
            
            {/* 메인 텍스트 */}
            <div className="text-center mb-6">
              <p className="text-lg leading-relaxed">
                {editableCopy?.description || "새로운 상품을 소개합니다! 놓치지 마세요 ✨"}
              </p>
            </div>
            
            {/* 해시태그 */}
            <div className="text-center">
              <p className="text-sm text-primary">
                {editableCopy?.hashtags || `#${productName.replace(/\s+/g, '')} #인스타그램 #피드`}
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