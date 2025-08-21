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
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const InstagramPostPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [thumbnailPage, setThumbnailPage] = useState(0);
  const [showTipSection, setShowTipSection] = useState(true);
  const [showInstagramGuide, setShowInstagramGuide] = useState(false);
  const [caption, setCaption] = useState("");
  const [captionFocused, setCaptionFocused] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);
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
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Instagram은 최대 10장까지
    const totalImages = selectedImages.length + files.length;
    if (totalImages > 10) {
      setUploadStatus({
        type: 'error',
        message: '최대 10장까지 업로드 가능합니다.'
      });
      return;
    }

    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    files.forEach(file => {
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

      validFiles.push(file);
      
      // 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        validPreviews.push(reader.result as string);
        if (validPreviews.length === validFiles.length) {
          setSelectedImages(prev => {
            const newImages = [...prev, ...validFiles];
            // 새로 추가된 이미지 중 마지막 이미지를 현재 인덱스로 설정
            setCurrentImageIndex(newImages.length - 1);
            // 새 이미지가 추가된 페이지로 썸네일 페이지 이동
            setThumbnailPage(Math.floor((newImages.length - 1) / 5));
            return newImages;
          });
          setImagePreviews(prev => [...prev, ...validPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
      
    setUploadStatus({ type: null, message: "" });
  };

  const handlePost = async () => {
    if (selectedImages.length === 0) {
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
        imageCount: selectedImages.length,
        images: selectedImages.map(img => ({ size: img.size, type: img.type }))
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
      setSelectedImages([]);
      setImagePreviews([]);
      setCurrentImageIndex(0);
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

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    setSelectedImages(newImages);
    setImagePreviews(newPreviews);
    
    if (currentImageIndex >= newImages.length) {
      setCurrentImageIndex(Math.max(0, newImages.length - 1));
    }
    
    // 썸네일 페이지도 조정
    if (newImages.length > 0) {
      const newCurrentPage = Math.floor(currentImageIndex / 5);
      const maxPage = Math.floor((newImages.length - 1) / 5);
      setThumbnailPage(Math.min(newCurrentPage, maxPage));
    } else {
      setThumbnailPage(0);
    }
    
    if (newImages.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearAllImages = () => {
    setSelectedImages([]);
    setImagePreviews([]);
    setCurrentImageIndex(0);
    setThumbnailPage(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => {
      const newIndex = (prev + 1) % imagePreviews.length;
      // 썸네일 페이지도 함께 업데이트
      setThumbnailPage(Math.floor(newIndex / 5));
      return newIndex;
    });
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => {
      const newIndex = (prev - 1 + imagePreviews.length) % imagePreviews.length;
      // 썸네일 페이지도 함께 업데이트
      setThumbnailPage(Math.floor(newIndex / 5));
      return newIndex;
    });
  };

  // 캡션에서 해시태그와 멘션을 파란색으로 렌더링하는 함수
  const formatCaption = (text: string) => {
    if (!text) return text;
    
    const parts = text.split(/(\s+)/);
    return parts.map((part, index) => {
      if (part.startsWith('#') || part.startsWith('@')) {
        return (
          <span key={index} className="text-blue-600 font-medium">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const nextPreviewImage = () => {
    setPreviewImageIndex((prev) => (prev + 1) % imagePreviews.length);
  };

  const prevPreviewImage = () => {
    setPreviewImageIndex((prev) => (prev - 1 + imagePreviews.length) % imagePreviews.length);
  };

  const handleGoBack = () => {
    if (selectedImages.length > 0) {
      if (confirm('작업 중인 내용이 있습니다. 정말 나가시겠습니까?')) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="mb-6">
          <div className="mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleGoBack}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              뒤로가기
            </Button>
          </div>
          
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Send className="h-6 w-6 text-pink-500" />
              Instagram 홍보 게시
            </h1>
            <p className="text-gray-600 mb-8">
              인스타그램 비즈니스 계정으로 홍보용 피드를 게시하고 손님과 소통해보세요
            </p>
          </div>
          
          {showTipSection && (
          <div className="flex justify-end">
            <div className="relative border-pink-300 rounded-lg border-2 p-3 max-w-md text-right bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden group">
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:hidden animate-shimmer"></div>
              
                
                <button
                  onClick={() => setShowTipSection(false)}
                  className="absolute top-1 right-1 rounded-full bg-gray-100 hover:bg-gray-300 z-20"
                >
                  <X className="h-3 w-3 text-gray-600 hover:text-gray-800" />
                </button>
                
                <p className="text-sm text-gray-700 relative z-10 pr-4">
                <span className="font-medium ">TIP) </span>
                인스타그램 홍보 이미지를 AI로 간편하게 만들어볼 수 있어요✨
              </p>
              <Button
                variant="link"
                onClick={() => navigate('/studio')}
                size="sm"
                className="text-sm font-medium text-pink-400 underline p-0 relative z-10" 
              >
                콘텐츠 작업공간으로 가기
                <ExternalLink className="h-2 w-2 inline" />
              </Button>
            </div>
          </div>
          )}
        </div>

        <div className="space-y-6">
          
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <ImageIcon className="h-5 w-5 text-pink-500" />
                홍보 이미지
                <span className="text-sm font-normal text-gray-500">
                  (총 10장 중 {selectedImages.length}장 등록됨)
                </span>
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                각 10MB 이하의 고화질 이미지 권장
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {imagePreviews.length === 0 ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all duration-300"
                >
                  <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-gray-900">이미지 업로드</h3>
                  <p className="text-gray-600">
                    홍보할 상품이나 서비스 이미지를 선택하세요
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    JPG, PNG, GIF 지원 • 고화질 이미지 권장
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 flex justify-center">
                      {currentImageIndex > 0 && (
                        <button
                          onClick={prevImage}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    
                    <div className="relative flex-1 max-w-sm mx-auto">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <img 
                          src={imagePreviews[currentImageIndex]} 
                          alt={`홍보 이미지 ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      
                      {imagePreviews.length > 1 && (
                        <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                          {currentImageIndex + 1} / {imagePreviews.length}
                        </div>
                      )}
                      
                      
                      <button
                        onClick={() => removeImage(currentImageIndex)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-all shadow-sm"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="w-10 flex justify-center">
                      {currentImageIndex < imagePreviews.length - 1 && (
                        <button
                          onClick={nextImage}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  
                  <div className="w-full space-y-3">
                    
                    {(() => {
                      // totalItems는 실제 이미지 + 추가 버튼(+1칸)을 포함하되, 최대 10장까지만
                      const totalItems = Math.min(selectedImages.length + (selectedImages.length < 10 ? 1 : 0), 10);
                      const totalPages = Math.ceil(totalItems / 5);
                      const startIndex = thumbnailPage * 5;
                      
                      return (
                        <>
                          <div className="flex items-center justify-center gap-2">
                            
                            <div className="w-6 flex justify-center">
                              {thumbnailPage > 0 && (
                                <button
                                  onClick={() => {
                                    const newPage = thumbnailPage - 1;
                                    setThumbnailPage(newPage);
                                    // 이전 페이지의 첫 번째 이미지로 이동
                                    setCurrentImageIndex(newPage * 5);
                                  }}
                                  className="p-1 rounded hover:bg-gray-100"
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                            
                            
                            <div className="flex gap-2">
                              {Array.from({ length: 5 }, (_, i) => {
                                const index = startIndex + i;
                                
                                if (index < selectedImages.length) {
                                  // 실제 이미지
                                  return (
                                    <div
                                      key={index}
                                      className="relative group"
                                    >
                                      <button
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                          index === currentImageIndex 
                                            ? 'border-pink-400 scale-105' 
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                      >
                                        <img 
                                          src={imagePreviews[index]} 
                                          alt={`썸네일 ${index + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </button>
                                      
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removeImage(index);
                                        }}
                                        className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white p-0.5 rounded-full transition-all shadow-sm opacity-0 group-hover:opacity-100"
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </div>
                                  );
                                } else if (index === selectedImages.length && selectedImages.length < 10) {
                                  // 추가 버튼 (+1 칸)
                                  return (
                                    <button
                                      key={index}
                                      onClick={() => fileInputRef.current?.click()}
                                      className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 hover:border-pink-400 hover:bg-pink-50 transition-all flex items-center justify-center"
                                    >
                                      <Plus className="h-5 w-5 text-gray-400" />
                                    </button>
                                  );
                                } else {
                                  // 빈 자리표시 (점선 네모)
                                  return (
                                    <div
                                      key={index}
                                      className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-200"
                                    />
                                  );
                                }
                              })}
                            </div>
                            
                            
                            <div className="w-6 flex justify-center">
                              {thumbnailPage < totalPages - 1 && (
                                <button
                                  onClick={() => {
                                    const newPage = thumbnailPage + 1;
                                    setThumbnailPage(newPage);
                                    const nextPageStart = newPage * 5;
                                    // 다음 페이지의 첫 번째 이미지로 이동
                                    if (nextPageStart < selectedImages.length) {
                                      setCurrentImageIndex(nextPageStart);
                                    } else {
                                      // 추가 버튼이 있는 페이지면 마지막 이미지로 이동
                                      setCurrentImageIndex(Math.max(0, selectedImages.length - 1));
                                    }
                                  }}
                                  className="p-1 rounded hover:bg-gray-100"
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </div>
                          
                          
                          {totalPages > 1 && (
                            <div className="flex justify-center gap-1">
                              {Array.from({ length: totalPages }, (_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full transition-all ${
                                    i === thumbnailPage ? 'bg-pink-400' : 'bg-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  
                  
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllImages}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      전체 삭제
                    </Button>
                  </div>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageSelect}
              />
            </CardContent>
          </Card>

          
          <div className="space-y-4">
            <Card className="shadow-sm border border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900 text-lg">홍보 메시지</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  고객의 관심을 끌 수 있는 매력적인 홍보 메시지를 작성하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="caption" className="text-gray-700 font-medium">캡션</Label>
                  <Textarea
                    id="caption"
                    placeholder={captionFocused ? "" : "[예시] 신메뉴입니다~ 빨리 소진될 수 있으니 원하시는 손님은 일찍 방문해주세요💗   \n~~~~\n위치: 서울 강남구 카페골목 \n가격: 아메리카노 4,500원 /\n문의: 010-1234-5678 ~~~~\n\n#카페 #신메뉴 #강남맛집 #강남카페 #강남_카페 #강남추천 #강남커피 #커피\n#데이트카페 #디저트 #할인이벤트\n#친구들과 #분위기좋은곳 @서울다먹자 @서울맛집추천"}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    onFocus={() => setCaptionFocused(true)}
                    onBlur={() => setCaptionFocused(false)}
                    className="mt-2 min-h-[180px] resize-none !border-gray-300 focus:!border-gray-400 focus:!ring-gray-400 focus:!ring-2"
                    maxLength={2200}
                  />
                  <div className="flex justify-end text-xs text-gray-500 mt-2">
                    <span className={caption.length > 2000 ? 'text-red-500 font-medium' : ''}>{caption.length}/2200</span>
                  </div>
                </div>

                
                <div className="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setShowInstagramGuide(!showInstagramGuide)}
                    className="w-full p-4 text-left hover:bg-blue-100 transition-colors flex items-center justify-between"
                  >
                    <h4 className="text-sm font-medium text-blue-800">SNS 초보 사장님을 위한 Instagram 홍보 가이드</h4>
                    {showInstagramGuide ? (
                      <ChevronUp className="h-4 w-4 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-blue-600" />
                    )}
                  </button>
                  
                  {showInstagramGuide && (
                    <div className="px-4 pb-4 space-y-2 text-sm text-blue-700 border-t border-blue-200">
                      <p className="pt-3"><strong>해시태그란?</strong> #으로 시작하는 키워드입니다.<br />
                      <span className="text-s">#브랜드명 #지역명 #상품명처럼 관련 키워드를 15-20개 사용하시면 더 많은 사람들이 검색을 통해 회원님의 게시물을 발견할 수 있어요.</span></p>
                      <p><strong>멘션이란?</strong> @계정명으로 다른 계정을 태그하는 기능입니다.<br />
                      <span className="text-s">@파트너업체나 @유명한_계정을 태그하면 서로 홍보 효과를 얻을 수 있습니다.</span></p>
                      <p><strong>게시 시간:</strong> 많은 사람들이 Instagram을 보는 오후 7-9시에 게시하시면 더 많은 반응을 얻을 수 있어요.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            
            {uploadStatus.type && (
              <Alert 
                variant={uploadStatus.type === 'error' ? 'destructive' : 'default'}
                className={uploadStatus.type === 'success' ? 'border-green-200 bg-green-50' : ''}
              >
                {uploadStatus.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertDescription>{uploadStatus.message}</AlertDescription>
              </Alert>
            )}

            
            {imagePreviews.length > 0 && caption && (
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2 text-gray-700">
                    <Eye className="h-4 w-4" />
                    게시물 미리보기
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border rounded-lg p-3 max-w-sm mx-auto">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {(JSON.parse(localStorage.getItem('instagram_user') || '{}').username || 'user')[0].toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {JSON.parse(localStorage.getItem('instagram_user') || '{}').username || 'business_account'}
                      </span>
                    </div>
                    <div className="aspect-square bg-gray-100 rounded mb-3 overflow-hidden relative">
                      <img 
                        src={imagePreviews[previewImageIndex]} 
                        alt="미리보기" 
                        className="w-full h-full object-cover" 
                      />
                      
                      
                      {imagePreviews.length > 1 && previewImageIndex > 0 && (
                        <button
                          onClick={prevPreviewImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full transition-all"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                      )}
                      
                      
                      {imagePreviews.length > 1 && previewImageIndex < imagePreviews.length - 1 && (
                        <button
                          onClick={nextPreviewImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full transition-all"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      )}
                      
                      {imagePreviews.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                          {previewImageIndex + 1}/{imagePreviews.length}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-900 line-clamp-4">
                      {formatCaption(caption)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            
            <Card className="shadow-sm border border-gray-200">
              <CardContent className="pt-6">
                <div className="flex gap-3 items-stretch">
                  <Button 
                    variant="outline" 
                    disabled
                    className="text-sm text-gray-500 h-12"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    예약 게시
                  </Button>
                  
                  <Button
                    onClick={handlePost}
                    disabled={isUploading || selectedImages.length === 0 || !caption.trim()}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed h-12"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Instagram에 게시 중...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Instagram에 홍보 게시
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramPostPage;