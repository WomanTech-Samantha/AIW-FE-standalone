import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Video, ImageIcon, ArrowRight, Instagram, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function InstagramPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Instagram 연동 상태 확인
    const instagramConnected = localStorage.getItem('instagram_connected');
    setIsConnected(instagramConnected === 'true');
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const onUpload = () => {
    if (!file) return;
    // TODO: 실제 업로드 로직
    alert(`${file.name} 업로드 완료!`);
  };

  return (
    <div className="page-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">인스타그램 업로드</h1>
            <p className="text-lg text-muted-foreground">
              스토리·피드·릴스용 이미지를 업로드하세요
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/studio')}
            className="btn-large"
          >
            <ImageIcon className="mr-2 h-5 w-5" />
            마케팅 에셋 생성하기로
          </Button>
        </div>

        {!isConnected && (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <div className="flex items-center justify-between">
                <span>Instagram 계정이 연동되지 않았습니다. 먼저 계정을 연동해주세요.</span>
                <Button
                  onClick={() => navigate('/instagram/connect')}
                  size="sm"
                  className="ml-4"
                >
                  <Instagram className="mr-2 h-4 w-4" />
                  계정 연동하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Card className="card-soft max-w-md mx-auto mb-6">
          <CardHeader>
            <CardTitle>업로드할 미디어 선택</CardTitle>
            <CardDescription>
              {isConnected ? "스토리·피드·릴스 모두 지원" : "계정 연동 후 사용 가능"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <input 
              type="file" 
              accept="image/*,video/*" 
              onChange={onFileChange}
              disabled={!isConnected}
            />
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            size="senior"
            onClick={onUpload}
            disabled={!file || !isConnected}
            className="gradient-primary text-white shadow-lg hover:shadow-xl"
          >
            <Upload className="mr-2 h-6 w-6" />
            {!isConnected ? "계정 연동 필요" : file ? `${file.name} 업로드` : "파일 선택 후 업로드"}
          </Button>
        </div>
    </div>
  );
}

export default InstagramPage;