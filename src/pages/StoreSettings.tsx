import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import CozyHome from "@/templates/Cozy/CozyHome";
import ChicFashion from "@/templates/Chic/ChicHome";
import BeautyShop from "@/templates/Beauty/BeautyHome";
import "@/templates/base.css";
import { 
  ArrowLeft, 
  Palette,
  Save,
  CheckCircle2,
  Upload,
  Sparkles,
  Store,
  Globe
} from "lucide-react";

const StoreSettingsPage = () => {
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 온보딩에서 설정한 모든 정보 가져오기
  const [business, setBusiness] = useState(user?.business || "");
  const [storeName, setStoreName] = useState(user?.storeName || "");
  const [selectedTheme, setSelectedTheme] = useState(user?.theme || "");
  const [selectedTemplate, setSelectedTemplate] = useState(user?.template || "");
  const [subdomain, setSubdomain] = useState(user?.subdomain || "");
  const [tagline, setTagline] = useState(user?.tagline || "");
  const [brandImageUrl, setBrandImageUrl] = useState(user?.brandImageUrl || "");
  const [brandImageFile, setBrandImageFile] = useState<File | null>(null);
  const [brandImagePreview, setBrandImagePreview] = useState<string>(user?.brandImageUrl || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isSubdomainValid, setIsSubdomainValid] = useState(true);

  const themeOptions = [
    { 
      id: "warm-rose", 
      name: "웜 로즈", 
      color: "#D4526E",
      palette: {
        primary: '#D4526E',
        secondary: '#F5B7B1',
        accent: '#E8A49C',
        background: '#FAF3F0',
        surface: '#FFFFFF',
        text: '#2C2C2C',
        textLight: '#666666',
        border: '#E5E5E5'
      }
    },
    { 
      id: "sage-green", 
      name: "세이지 그린", 
      color: "#6B8E65",
      palette: {
        primary: '#6B8E65',
        secondary: '#A8C09C',
        accent: '#8FA885',
        background: '#F5F7F4',
        surface: '#FFFFFF',
        text: '#2C2C2C',
        textLight: '#666666',
        border: '#E5E5E5'
      }
    },
    { 
      id: "dusty-blue", 
      name: "더스티 블루", 
      color: "#7189A6",
      palette: {
        primary: '#7189A6',
        secondary: '#A8B8CC',
        accent: '#8DA3C0',
        background: '#F4F6F8',
        surface: '#FFFFFF',
        text: '#2C2C2C',
        textLight: '#666666',
        border: '#E5E5E5'
      }
    },
    { 
      id: "terracotta", 
      name: "테라코타", 
      color: "#C67B5C",
      palette: {
        primary: '#C67B5C',
        secondary: '#E5A985',
        accent: '#D69373',
        background: '#FAF6F3',
        surface: '#FFFFFF',
        text: '#2C2C2C',
        textLight: '#666666',
        border: '#E5E5E5'
      }
    },
    { 
      id: "lavender", 
      name: "라벤더", 
      color: "#9B7EBD",
      palette: {
        primary: '#9B7EBD',
        secondary: '#C4A9D8',
        accent: '#B195CC',
        background: '#F7F5F9',
        surface: '#FFFFFF',
        text: '#2C2C2C',
        textLight: '#666666',
        border: '#E5E5E5'
      }
    }
  ];

  const templates = [
    {
      id: "cozy",
      name: "코지",
      description: "포근하고 따뜻한 분위기의 템플릿",
      mockupImage: "🏠"
    },
    {
      id: "chic", 
      name: "시크",
      description: "세련되고 우아한 미니멀 템플릿",
      mockupImage: "✨"
    },
    {
      id: "beauty",
      name: "내추럴", 
      description: "자연스럽고 부드러운 감성의 템플릿",
      mockupImage: "🌿"
    }
  ];

  // 서브도메인 유효성 검사
  useEffect(() => {
    const isValid = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(subdomain) && subdomain.length >= 3;
    setIsSubdomainValid(isValid);
  }, [subdomain]);

  const handleSave = async () => {
    setIsSaving(true);
    
    // AuthContext의 completeOnboarding 함수를 사용해서 사용자 정보 업데이트
    setTimeout(() => {
      completeOnboarding({
        business,
        storeName,
        theme: selectedTheme,
        template: selectedTemplate,
        subdomain,
        brandImageUrl,
        tagline
      });
      setIsSaving(false);
      alert("설정이 저장되었습니다!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">쇼핑몰 설정</h1>
          <p className="text-lg text-muted-foreground">
            쇼핑몰의 디자인과 정보를 수정하세요
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* 기본 정보 설정 */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-6 w-6" />
                기본 정보
              </CardTitle>
              <CardDescription>
                쇼핑몰의 기본 정보를 설정하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base mb-4 block">업종</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["🛏️ 침구·이불", "🪟 커튼·블라인드", "👗 의류·패션", "🍽️ 음식·요리", "💄 뷰티·화장품", "🧵 수공예"].map((label) => (
                    <Button
                      key={label}
                      variant={business === label ? "default" : "outline"}
                      onClick={() => setBusiness(label)}
                      className="h-auto p-4"
                    >
                      {label} {business === label && <CheckCircle2 className="ml-2 h-4 w-4" />}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="storeName" className="text-base mb-2 block">
                  상호명
                </Label>
                <Input
                  id="storeName"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="text-lg"
                  placeholder="예: 지숙커튼&침구"
                />
              </div>
            </CardContent>
          </Card>

          {/* 사이트 주소 설정 */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6" />
                사이트 주소
              </CardTitle>
              <CardDescription>
                온라인 스토어의 주소를 설정하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="subdomain" className="text-base mb-4 block">사이트 주소</Label>
                <div className="flex items-center gap-2 text-lg">
                  <span className="text-muted-foreground">https://</span>
                  <Input
                    id="subdomain"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                    className={`font-mono ${!isSubdomainValid ? 'border-destructive' : ''}`}
                  />
                  <span className="text-muted-foreground">.allinwom.com</span>
                </div>
                {!isSubdomainValid && subdomain && (
                  <p className="text-sm text-destructive mt-2">
                    영문 소문자, 숫자, 하이픈만 사용 가능하며 3자 이상이어야 합니다
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 템플릿 선택 */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle>템플릿 선택</CardTitle>
              <CardDescription>
                사이트 디자인 템플릿을 선택하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedTemplate === template.id ? 'border-primary shadow-md' : ''
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-4xl mb-3">{template.mockupImage}</div>
                      <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      {selectedTemplate === template.id && (
                        <CheckCircle2 className="h-6 w-6 text-primary mx-auto" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 테마 색상 설정 */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-6 w-6" />
                테마 색상
              </CardTitle>
              <CardDescription>
                쇼핑몰의 색상을 설정하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {themeOptions.map((theme) => (
                  <Button
                    key={theme.id}
                    variant={selectedTheme === theme.id ? "default" : "outline"}
                    className="h-auto p-3 flex items-center gap-3"
                    style={selectedTheme === theme.id ? { 
                      backgroundColor: theme.color, 
                      borderColor: theme.color,
                      color: 'white'
                    } : {}}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    {selectedTheme === theme.id ? (
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    ) : (
                      <div 
                        className="w-5 h-5 rounded-full"
                        style={{ backgroundColor: theme.color }}
                      />
                    )}
                    <span className="text-sm">{theme.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 브랜드 이미지 및 슬로건 */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle>브랜드 설정</CardTitle>
              <CardDescription>
                브랜드 이미지와 슬로건을 설정하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base mb-4 block">브랜드 대표 이미지</Label>
                {!brandImagePreview ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <CardContent className="p-6 text-center">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h4 className="font-medium text-lg mb-2">이미지 업로드</h4>
                        <p className="text-sm text-muted-foreground">
                          보유하신 로고나 대표 이미지를 업로드하세요
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => {
                        const colors = {
                          "침구": "#9B7EBD",
                          "커튼": "#6B8E65",
                          "의류": "#D4526E",
                          "음식": "#C67B5C",
                          "뷰티": "#E8A49C",
                          "수공예": "#7189A6"
                        };
                        
                        const businessType = Object.keys(colors).find(key => business.includes(key));
                        const color = colors[businessType] || "#9B7EBD";
                        const initials = storeName.slice(0, 2).toUpperCase() || "AI";

                        const mockImage = `data:image/svg+xml;base64,${btoa(`
                          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="200" height="200" fill="#FAFAFA"/>
                            <circle cx="100" cy="100" r="70" fill="${color}"/>
                            <text x="100" y="115" font-family="Arial" font-size="40" font-weight="bold" fill="white" text-anchor="middle">${initials}</text>
                          </svg>
                        `)}`;
                        
                        setBrandImagePreview(mockImage);
                        setBrandImageUrl(mockImage);
                      }}
                    >
                      <CardContent className="p-6 text-center">
                        <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h4 className="font-medium text-lg mb-2">AI로 생성하기</h4>
                        <p className="text-sm text-muted-foreground">
                          업종과 상호명을 바탕으로 이미지를 자동 생성해드려요
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-primary">
                      <img src={brandImagePreview} alt="브랜드 이미지" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setBrandImageFile(null);
                          setBrandImagePreview("");
                          setBrandImageUrl("");
                        }}
                      >
                        다시 선택
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-3 h-3 mr-1" />
                        이미지 변경
                      </Button>
                    </div>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        alert('이미지 파일 크기는 5MB 이하여야 합니다.');
                        return;
                      }
                      
                      setBrandImageFile(file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setBrandImagePreview(reader.result as string);
                        setBrandImageUrl(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              
              <div>
                <Label htmlFor="tagline" className="text-base mb-2 block">
                  슬로건 (선택)
                </Label>
                <Input
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="text-lg"
                  placeholder="예: 더 따뜻한 밤, 더 편안한 아침"
                />
              </div>
            </CardContent>
          </Card>

          {/* 미리보기 섹션 */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle>미리보기</CardTitle>
              <CardDescription>
                변경사항이 어떻게 보일지 확인하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg shadow-lg p-8">
                {/* 헤더 미리보기 */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b">
                  {brandImagePreview && (
                    <img src={brandImagePreview} alt="브랜드" className="w-12 h-12 rounded-full object-cover" />
                  )}
                  <div>
                    <h3 className="font-bold text-xl" style={{ color: themeOptions.find(t => t.id === selectedTheme)?.color }}>
                      {storeName || "상호명"}
                    </h3>
                    {tagline && (
                      <p className="text-sm text-muted-foreground">
                        {tagline}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* 템플릿과 테마 적용 미리보기 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: themeOptions.find(t => t.id === selectedTheme)?.color }}
                    />
                    <span className="text-sm">선택된 테마: {themeOptions.find(t => t.id === selectedTheme)?.name || "없음"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">선택된 템플릿: {templates.find(t => t.id === selectedTemplate)?.name || "없음"}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    https://{subdomain || "your-store"}.allinwom.com
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 저장 버튼 */}
        <div className="flex justify-center mt-12 pb-8">
          <Button 
            size="lg" 
            onClick={handleSave}
            disabled={isSaving || !business || !storeName || !selectedTheme || !selectedTemplate || !subdomain || !isSubdomainValid}
            className="text-lg px-8 py-6"
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                저장 중...
              </div>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                설정 저장하기
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoreSettingsPage;