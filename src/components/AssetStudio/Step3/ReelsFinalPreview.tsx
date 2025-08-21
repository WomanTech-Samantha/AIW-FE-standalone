import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download, Calendar } from "lucide-react";
import { EditableCopy } from "@/hooks/useAssetStudioState";

interface ReelsFinalPreviewProps {
  selectedImage: string;
  productName: string;
  editableCopy: EditableCopy | null;
  onSaveToCalendar: () => void;
}

export const ReelsFinalPreview = ({
  selectedImage,
  productName,
  editableCopy,
  onSaveToCalendar
}: ReelsFinalPreviewProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="card-soft">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <CheckCircle2 className="mr-2 h-6 w-6 text-success" />
            최종 릴스 썸네일
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-6 bg-white max-h-[600px] overflow-y-auto">
            
            <div className="mb-6 flex justify-center">
              <div className="w-48 h-64">
                <img
                  src={selectedImage}
                  alt="릴스 썸네일"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
            
            
            <div className="text-center mb-6">
              <p className="text-lg leading-relaxed font-bold">
                {editableCopy?.description || "이것만 알면 당신도 전문가! 🔥 지금 바로 확인해보세요"}
              </p>
            </div>
            
            
            <div className="text-center">
              <p className="text-sm text-primary">
                {editableCopy?.hashtags || `#${productName.replace(/\s+/g, '')} #릴스 #인스타그램 #트렌드`}
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