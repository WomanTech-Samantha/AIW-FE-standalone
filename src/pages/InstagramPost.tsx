import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { checkInstagramConnection, isBusinessOrCreatorAccount, getAccountType, validateInstagramToken } from "@/utils/instagramAuth";
import { 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon, 
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Eye
} from "lucide-react";

const InstagramPostPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: "" });

  // 연동 상태 및 계정 유형 확인
  useEffect(() => {
    const checkConnectionAndAccountType = async () => {
      const connection = checkInstagramConnection();
      if (!connection.isConnected) {
        navigate('/instagram/connect');
        return;
      }

      // 계정 유형 확인
      if (!isBusinessOrCreatorAccount()) {
        setUploadStatus({
          type: 'error',
          message: `현재 계정 유형: ${getAccountType() || 'PERSONAL'}. Instagram 비즈니스 또는 크리에이터 계정으로 전환해주세요.`
        });
        return;
      }

      // 토큰 유효성 검증
      const tokenValidation = await validateInstagramToken(connection.data.token);
      if (!tokenValidation.isValid) {
        console.error('토큰 유효성 검증 실패:', tokenValidation.error);
        localStorage.removeItem('instagram_access_token');
        localStorage.removeItem('instagram_user');
        navigate('/instagram/connect');
      }
    };

    checkConnectionAndAccountType();
  }, [navigate]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (10MB 제한)
      if (file.size > 10 * 1024 * 1024) {
        setUploadStatus({
          type: 'error',
          message: '이미지 파일 크기는 10MB 이하여야 합니다.'
        });
        return;
      }

      // 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        setUploadStatus({
          type: 'error',
          message: '이미지 파일만 업로드 가능합니다.'
        });
        return;
      }

      setSelectedImage(file);
      
      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      setUploadStatus({ type: null, message: "" });
    }
  };

  const handlePost = async () => {
    if (!selectedImage) {
      setUploadStatus({
        type: 'error',
        message: '게시할 이미지를 선택해주세요.'
      });
      return;
    }

    if (!caption.trim()) {
      setUploadStatus({
        type: 'error',
        message: '캡션을 입력해주세요.'
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus({ type: null, message: "" });

    // 배포용 모의 게시 프로세스
    try {
      console.log('배포용 모의 Instagram 게시 시작:', {
        caption: caption,
        imageSize: selectedImage.size,
        imageType: selectedImage.type
      });

      // 모의 게시 처리 (2-4초 지연)
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

      // 성공적으로 "게시"됨
      setUploadStatus({
        type: 'success',
        message: 'Instagram에 성공적으로 게시되었습니다! 🎉'
      });

      console.log('배포용 모의 게시 완료');

      // 입력 필드 초기화
      setSelectedImage(null);
      setImagePreview("");
      setCaption("");
      
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // 3초 후 관리 페이지로 이동
      setTimeout(() => {
        navigate('/instagram/manage');
      }, 3000);

    } catch (error: any) {
      console.error('모의 게시 실패:', error);
      
      setUploadStatus({
        type: 'error',
        message: '게시 중 오류가 발생했습니다. 다시 시도해주세요.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <Send className="h-8 w-8 text-blue-500" />
              Instagram 게시
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              이미지와 캡션으로 Instagram에 콘텐츠를 게시하세요
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 이미지 업로드 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                이미지 선택
              </CardTitle>
              <CardDescription>
                게시할 이미지를 업로드하세요 (최대 10MB)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!imagePreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">이미지 업로드</h3>
                  <p className="text-sm text-muted-foreground">
                    클릭하거나 드래그하여 이미지를 선택하세요
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG, GIF 지원 (최대 10MB)
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={imagePreview} 
                      alt="선택된 이미지" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      이미지 변경
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearImage}
                    >
                      제거
                    </Button>
                  </div>
                  {selectedImage && (
                    <div className="text-sm text-muted-foreground">
                      <p>파일명: {selectedImage.name}</p>
                      <p>크기: {(selectedImage.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  )}
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </CardContent>
          </Card>

          {/* 캡션 및 게시 */}
          <Card>
            <CardHeader>
              <CardTitle>캡션 및 게시 설정</CardTitle>
              <CardDescription>
                게시물에 표시될 캡션과 설정을 입력하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="caption">캡션</Label>
                <Textarea
                  id="caption"
                  placeholder="이 게시물에 대한 설명을 작성해주세요...
                  
#해시태그를 사용해보세요
@계정을 태그할 수도 있습니다"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="mt-2 min-h-[200px] resize-none"
                  maxLength={2200}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>해시태그와 멘션을 포함할 수 있습니다</span>
                  <span>{caption.length}/2200</span>
                </div>
              </div>

              {/* 상태 메시지 */}
              {uploadStatus.type && (
                <Alert variant={uploadStatus.type === 'error' ? 'destructive' : 'default'}>
                  {uploadStatus.type === 'success' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{uploadStatus.message}</AlertDescription>
                </Alert>
              )}

              {/* 미리보기 */}
              {imagePreview && caption && (
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    게시물 미리보기
                  </h4>
                  <div className="bg-white rounded-lg border p-3 max-w-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        {JSON.parse(localStorage.getItem('instagram_user') || '{}').username || 'username'}
                      </span>
                    </div>
                    <div className="aspect-square bg-gray-100 rounded mb-2 overflow-hidden">
                      <img src={imagePreview} alt="미리보기" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm line-clamp-3">{caption}</p>
                  </div>
                </div>
              )}

              {/* 게시 버튼 */}
              <div className="space-y-3">
                <Button
                  onClick={handlePost}
                  disabled={isUploading || !selectedImage || !caption.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      게시 중...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Instagram에 게시
                    </>
                  )}
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" disabled>
                    <Calendar className="mr-2 h-4 w-4" />
                    예약 게시
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/studio')}
                  >
                    스튜디오로 이동
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstagramPostPage;