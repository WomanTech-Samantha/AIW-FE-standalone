import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { 
  Instagram, 
  Copy, 
  CheckCircle2, 
  ArrowLeft,
  ExternalLink,
  Smartphone,
  User,
  Link as LinkIcon
} from "lucide-react";

const InstagramGuidePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [storeUrl, setStoreUrl] = useState("");

  useEffect(() => {
    // 생성된 쇼핑몰 URL 가져오기 (실제로는 서버에서)
    const storeName = user?.storeName || "mystore";
    const subdomain = storeName.toLowerCase().replace(/[^a-z0-9]/g, '');
    setStoreUrl(`https://${subdomain}.allinwom.com`);
  }, [user]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  const steps = [
    {
      step: 1,
      title: "인스타그램 앱 열기",
      description: "스마트폰에서 인스타그램 앱을 실행하세요",
      icon: <Instagram className="h-8 w-8" />
    },
    {
      step: 2,
      title: "프로필 편집하기",
      description: "우하단 프로필 탭 > '프로필 편집' 버튼 클릭",
      icon: <User className="h-8 w-8" />
    },
    {
      step: 3,
      title: "웹사이트 주소 입력",
      description: "'웹사이트' 항목에 아래 주소를 복사해서 붙여넣기",
      icon: <LinkIcon className="h-8 w-8" />
    },
    {
      step: 4,
      title: "저장하기",
      description: "우상단 '완료' 버튼을 눌러 변경사항 저장",
      icon: <CheckCircle2 className="h-8 w-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            📸 인스타그램에 쇼핑몰 주소 올리기
          </h1>
          <p className="text-lg text-muted-foreground">
            팔로워들이 쉽게 쇼핑몰을 찾을 수 있도록 프로필에 주소를 추가해보세요
          </p>
        </div>

        {/* URL 복사 섹션 */}
        <Card className="card-soft mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <LinkIcon className="h-6 w-6" />
              쇼핑몰 주소
            </CardTitle>
            <CardDescription>
              아래 주소를 복사해서 인스타그램 프로필에 붙여넣으세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <p className="font-mono text-lg text-primary break-all">
                  {storeUrl}
                </p>
              </div>
              <Button
                onClick={copyToClipboard}
                className="flex items-center gap-2 min-w-[100px]"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    복사됨!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    복사하기
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              💡 주소를 복사한 후 아래 단계를 따라 인스타그램에 추가하세요
            </p>
          </CardContent>
        </Card>

        {/* 단계별 가이드 */}
        <div className="space-y-6">
          {steps.map((stepItem, index) => (
            <Card key={stepItem.step} className="card-soft">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      {stepItem.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                        {stepItem.step}
                      </div>
                      <h3 className="text-xl font-semibold">{stepItem.title}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {stepItem.description}
                    </p>
                    
                    {stepItem.step === 3 && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium mb-2">
                          👆 여기서 위의 주소를 붙여넣으세요
                        </p>
                        <p className="text-sm text-blue-700">
                          복사한 주소를 길게 눌러서 '붙여넣기'를 선택하면 됩니다
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 완료 후 안내 */}
        <Card className="card-soft mt-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-success" />
              완료하신 후에는
            </h3>
            <div className="space-y-3 text-muted-foreground">
              <p className="flex items-start gap-2">
                <span className="text-primary">•</span>
                팔로워들이 프로필에서 바로 쇼핑몰로 이동할 수 있어요
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary">•</span>
                스토리나 게시물에서 "프로필 링크 확인" 멘션을 활용하세요
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary">•</span>
                정기적으로 새 상품이나 할인 소식을 올려 고객을 유도하세요
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 액션 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/store')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            쇼핑몰 메뉴로 돌아가기
          </Button>
          
          <Button 
            size="lg"
            onClick={() => {
              // 인스타그램 앱 또는 웹으로 이동
              const instagramUrl = 'instagram://user?username=';
              const webUrl = 'https://www.instagram.com/';
              
              try {
                window.location.href = instagramUrl;
                setTimeout(() => {
                  window.open(webUrl, '_blank');
                }, 1000);
              } catch {
                window.open(webUrl, '_blank');
              }
            }}
            className="flex items-center gap-2"
          >
            <Instagram className="h-5 w-5" />
            인스타그램으로 이동
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.open(storeUrl, '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-5 w-5" />
            내 쇼핑몰 확인하기
          </Button>
        </div>

        {/* 추가 팁 */}
        <Card className="card-soft mt-8 bg-gradient-to-r from-primary/5 to-primary-glow/5">
          <CardContent className="p-6">
            <h4 className="font-semibold text-lg mb-3">💡 마케팅 팁</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium mb-2">게시물 활용법</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• 상품 사진과 함께 "링크는 프로필에"</li>
                  <li>• 할인 이벤트 공지하기</li>
                  <li>• 고객 후기 리포스트</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">스토리 활용법</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• 신상품 출시 미리보기</li>
                  <li>• 하이라이트에 상품 카테고리별 정리</li>
                  <li>• 쇼핑몰 링크 스티커 활용</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstagramGuidePage;