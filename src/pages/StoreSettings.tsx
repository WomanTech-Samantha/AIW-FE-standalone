
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Store, Palette, Layout, Upload, Sparkles, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/MockAuthContext";
import CozyHome from "@/templates/Cozy/CozyHome";
import ChicFashion from "@/templates/Chic/ChicHome";
import BeautyShop from "@/templates/Beauty/BeautyHome";
import "@/templates/base.css";

export default function StoreSettingsPage() {
  const navigate = useNavigate();
  
  // 변경사항 추적
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState<any>(null);
  const { user, completeOnboarding, updateUserProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  // 브랜드 기본 정보 (사용자 정보와 직결)
  const [business, setBusiness] = useState(user?.business ?? "");
  const [storeName, setStoreName] = useState(user?.storeName ?? "");

  // 사이트 생성 정보
  const [selectedTheme, setSelectedTheme] = useState(user?.theme ?? "");
  const [selectedTemplate, setSelectedTemplate] = useState(user?.template ?? "");
  const [subdomain, setSubdomain] = useState(user?.subdomain ?? "");
  const [isSubdomainValid, setIsSubdomainValid] = useState(true);
  const [brandImageUrl, setBrandImageUrl] = useState(user?.brandImageUrl ?? "");
  const [brandImageFile, setBrandImageFile] = useState<File | null>(null);
  const [brandImagePreview, setBrandImagePreview] = useState<string>(user?.brandImageUrl ?? "");
  const [tagline, setTagline] = useState(user?.tagline ?? "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // AI 이미지 생성 상태
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // 상호명을 서브도메인으로 변환
  const convertToSubdomain = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  useEffect(() => {
    if (storeName && !subdomain) {
      setSubdomain(convertToSubdomain(storeName));
    }
  }, [storeName, subdomain]);

  // 사용자 데이터가 변경될 때 state 업데이트
  useEffect(() => {
    if (user) {
      const userData = {
        business: user.business ?? "",
        storeName: user.storeName ?? "",
        theme: user.theme ?? "",
        template: user.template ?? "",
        subdomain: user.subdomain ?? "",
        brandImageUrl: user.brandImageUrl ?? "",
        tagline: user.tagline ?? ""
      };
      
      setBusiness(userData.business);
      setStoreName(userData.storeName);
      setSelectedTheme(userData.theme);
      setSelectedTemplate(userData.template);
      setSubdomain(userData.subdomain);
      setBrandImageUrl(userData.brandImageUrl);
      setBrandImagePreview(userData.brandImageUrl);
      setTagline(userData.tagline);
      
      setOriginalData(userData);
    }
  }, [user]);

  // AI 이미지 생성 함수
  const generateAIImage = () => {
    setIsGeneratingImage(true);
    
    // 2초 후 이미지 생성
    setTimeout(() => {
      // 업종에 따른 색상
      const colors = {
        "침구": "#9B7EBD",
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
      setIsGeneratingImage(false);
    }, 2000);
  };

  // 파일 업로드 핸들러
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBrandImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBrandImagePreview(reader.result as string);
        setBrandImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
      name: "편안한",
      description: "포근하고 따뜻한 분위기의 템플릿",
      mockupImage: "🏠"
    },
    {
      id: "chic", 
      name: "시크한",
      description: "세련되고 우아한 미니멀 템플릿",
      mockupImage: "✨"
    },
    {
      id: "beauty",
      name: "자연스러운", 
      description: "부드러운 감성의 템플릿",
      mockupImage: "🌿"
    }
  ];

  // 서브도메인 유효성 검사
  useEffect(() => {
    const isValid = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(subdomain) && subdomain.length >= 3;
    setIsSubdomainValid(isValid);
  }, [subdomain]);
  
  // 변경사항 감지
  useEffect(() => {
    if (!originalData) return;
    
    const currentData = {
      business,
      storeName,
      theme: selectedTheme,
      template: selectedTemplate,
      subdomain,
      brandImageUrl: brandImageFile ? brandImagePreview : brandImageUrl,
      tagline
    };
    
    const hasChanged = JSON.stringify(currentData) !== JSON.stringify(originalData);
    setHasChanges(hasChanged);
  }, [business, storeName, selectedTheme, selectedTemplate, subdomain, brandImageUrl, brandImagePreview, brandImageFile, tagline, originalData]);

  const handleSave = async () => {
    setIsSaving(true);
    
    // 사용자 정보 업데이트
    updateUserProfile({
      business,
      storeName,
      theme: selectedTheme,
      template: selectedTemplate,
      subdomain,
      brandImageUrl: brandImageFile ? brandImagePreview : brandImageUrl,
      tagline
    });
    
    setTimeout(() => {
      setIsSaving(false);
      
      // 개선된 성공 메시지와 자동 리다이렉트
      const confirmRedirect = confirm(
        "🎉 스토어 설정이 성공적으로 저장되었습니다!\n\n스토어 관리 페이지로 이동하시겠습니까?"
      );
      
      if (confirmRedirect) {
        navigate('/store');
      }
    }, 1500);
  };
  
  const handleGoBack = () => {
    if (hasChanges) {
      if (confirm('변경사항이 저장되지 않았습니다. 정말 나가시겠습니까?')) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto px-4 py-6">
        
        <div className="mb-8">
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
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">쇼핑몰 설정</h1>
            <p className="text-lg text-muted-foreground">
              쇼핑몰의 디자인과 정보를 설정하세요
            </p>
          </div>
        </div>

        <div className="space-y-6">
          
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
                  {["침구·이불", "수공예"].map((label) => (
                    <div
                      key={label}
                      onClick={() => setBusiness(label)}
                      className={`cursor-pointer p-4 rounded-lg border-2 transition-all text-center ${
                        business === label 
                          ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <span className={`font-medium ${
                          business === label ? 'text-primary font-semibold' : 'text-gray-700'
                        }`}>
                          {label}
                        </span>
                        {business === label && (
                          <CheckCircle2 className="ml-2 h-4 w-4 text-primary" />
                        )}
                      </div>
                    </div>
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
                  placeholder="예: 지수침구"
                />
              </div>
              
              <div>
                <Label htmlFor="tagline" className="text-base mb-2 block">
                  슬로건
                </Label>
                <Input
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="text-lg"
                  placeholder="예: 당신의 편안한 일상을 위한 프리미엄 침구"
                />
              </div>

              <div>
                <Label htmlFor="subdomain" className="text-base mb-2 block">
                  쇼핑몰 주소 (서브도메인)
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="subdomain"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                    className={`text-lg ${!isSubdomainValid && subdomain ? 'border-red-500' : ''}`}
                    placeholder="mystore"
                  />
                  <span className="text-lg text-muted-foreground">.allinwom.com</span>
                </div>
                {!isSubdomainValid && subdomain && (
                  <p className="text-sm text-red-500 mt-1">
                    서브도메인은 영문 소문자, 숫자, 하이픈(-)만 사용 가능하며 3자 이상이어야 합니다
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-6 w-6" />
                브랜드 이미지
              </CardTitle>
              <CardDescription>
                브랜드를 대표하는 로고나 이미지를 설정하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                {brandImagePreview && (
                  <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                    <img 
                      src={brandImagePreview} 
                      alt="브랜드 이미지" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    이미지 업로드
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateAIImage}
                    disabled={isGeneratingImage || !storeName || !business}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {isGeneratingImage ? 'AI 이미지 생성 중...' : 'AI로 생성하기'}
                  </Button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                {!storeName || !business ? (
                  <p className="text-sm text-muted-foreground">
                    AI 이미지를 생성하려면 업종과 상호명을 먼저 입력해주세요
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>

          
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-6 w-6" />
                테마 선택
              </CardTitle>
              <CardDescription>
                쇼핑몰의 색상 테마를 선택하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {themeOptions.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      selectedTheme === theme.id 
                        ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`font-medium ${
                        selectedTheme === theme.id ? 'text-primary font-semibold' : 'text-gray-700'
                      }`}>
                        {theme.name}
                      </span>
                      {selectedTheme === theme.id && (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      <div 
                        className={`h-8 rounded ${selectedTheme === theme.id ? 'ring-1 ring-gray-300' : ''}`}
                        style={{ backgroundColor: theme.palette.primary }}
                      />
                      <div 
                        className={`h-8 rounded ${selectedTheme === theme.id ? 'ring-1 ring-gray-300' : ''}`}
                        style={{ backgroundColor: theme.palette.secondary }}
                      />
                      <div 
                        className={`h-8 rounded ${selectedTheme === theme.id ? 'ring-1 ring-gray-300' : ''}`}
                        style={{ backgroundColor: theme.palette.accent }}
                      />
                      <div 
                        className={`h-8 rounded border ${selectedTheme === theme.id ? 'ring-1 ring-gray-300' : ''}`}
                        style={{ backgroundColor: theme.palette.background }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-6 w-6" />
                템플릿 선택
              </CardTitle>
              <CardDescription>
                쇼핑몰의 레이아웃 템플릿을 선택하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`cursor-pointer rounded-lg border-2 transition-all ${
                      selectedTemplate === template.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="p-4">
                      <div className="text-4xl text-center mb-3">{template.mockupImage}</div>
                      <h3 className="font-medium text-center mb-1">{template.name}</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        {template.description}
                      </p>
                      {selectedTemplate === template.id && (
                        <div className="flex justify-center mt-3">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          
          {selectedTemplate && (
            <Card className="card-soft">
              <CardHeader>
                <CardTitle>템플릿 미리보기</CardTitle>
                <CardDescription>실제 스토어의 미리보기입니다</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div 
                  className="border rounded-lg overflow-auto" 
                  style={{ 
                    height: 'auto',
                    maxHeight: '600px',
                    fontSize: '0.6rem',
                    transform: 'scale(0.65)',
                    transformOrigin: 'top left',
                    width: '154%',
                    ...(selectedTheme && (() => {
                      const selectedThemeData = themeOptions.find(t => t.id === selectedTheme);
                      return selectedThemeData ? {
                        '--color-primary': selectedThemeData.palette.primary,
                        '--color-secondary': selectedThemeData.palette.secondary,
                        '--color-accent': selectedThemeData.palette.accent,
                        '--color-background': selectedThemeData.palette.background,
                        '--color-surface': selectedThemeData.palette.surface,
                        '--color-text': selectedThemeData.palette.text,
                        '--color-text-light': selectedThemeData.palette.textLight,
                        '--color-border': selectedThemeData.palette.border
                      } as React.CSSProperties : {};
                    })())
                  }}
                >
                  <div style={{ pointerEvents: 'none' }} className="cursor-default">
                    {selectedTemplate === 'cozy' && <CozyHome />}
                    {selectedTemplate === 'chic' && <ChicFashion />}
                    {selectedTemplate === 'beauty' && <BeautyShop />}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          
          <div className="flex justify-center pt-4 pb-6">
            <Button
              size="lg"
              onClick={handleSave}
              disabled={isSaving || !isSubdomainValid || !subdomain || !storeName || !business}
              className="px-8"
            >
              {isSaving ? '저장 중...' : '설정 저장'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}