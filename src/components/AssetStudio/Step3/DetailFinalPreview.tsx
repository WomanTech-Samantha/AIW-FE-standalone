import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download, Calendar } from "lucide-react";
import { EditableCopy } from "@/hooks/useAssetStudioState";

interface DetailFinalPreviewProps {
  selectedImage: string;
  productName: string;
  keywords: string[];
  editableCopy: EditableCopy | null;
  expandKeyword: (keyword: string) => string;
  onSaveToCalendar: () => void;
}

export const DetailFinalPreview = ({
  selectedImage,
  productName,
  keywords,
  editableCopy,
  expandKeyword,
  onSaveToCalendar
}: DetailFinalPreviewProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="card-soft">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <CheckCircle2 className="mr-2 h-6 w-6 text-success" />
            최종 상세 이미지
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-6 bg-white max-h-[600px] overflow-y-auto">
            {/* 상품 이미지 */}
            <div className="mb-6">
              <img
                src={selectedImage}
                alt="상품"
                className="w-full h-64 object-contain rounded-lg"
              />
            </div>

            {/* 제목 */}
            <h2 className="text-2xl font-bold mb-4 text-center">
              {editableCopy?.title || `✨ ${productName || "상품"} 상세 정보`}
            </h2>

            {/* 설명 */}
            <p className="text-gray-600 mb-6 text-center">
              {editableCopy?.description || "품질과 디자인을 모두 갖춘 프리미엄 제품입니다"}
            </p>

            {/* Features */}
            <div className="space-y-4 mb-6">
              {keywords.filter(k => k.trim()).map((keyword, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                  <p className="text-sm">{expandKeyword(keyword)}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-primary text-white p-4 rounded-lg text-center">
              <p className="font-bold text-lg">
                {editableCopy?.cta || "📞 지금 주문하고 만족스러운 경험을 해보세요!"}
              </p>
            </div>

            {/* 해시태그 */}
            <div className="mt-4 text-center">
              <p className="text-sm text-primary">
                {editableCopy?.hashtags || `#${productName?.replace(/\s/g, '') || "프리미엄제품"} #품질보장 #고객만족`}
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