import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { 
  ArrowLeft, 
  Palette,
  Save,
  CheckCircle2
} from "lucide-react";

const StoreSettingsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [selectedTheme, setSelectedTheme] = useState(user?.theme || "warm");
  const [selectedColor, setSelectedColor] = useState(user?.color || "warm");
  const [storeName, setStoreName] = useState(user?.storeName || "");
  const [tagline, setTagline] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const themeOptions = [
    { id: "warm", name: "따뜻한 주황", color: "#FF8866" },
    { id: "calm", name: "차분한 파랑", color: "#4A90E2" },
    { id: "nature", name: "자연 녹색", color: "#27AE60" },
    { id: "elegant", name: "우아한 보라", color: "#8E44AD" },
    { id: "fresh", name: "상쾌한 민트", color: "#1ABC9C" },
    { id: "soft", name: "부드러운 핑크", color: "#E91E63" },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    
    // 모의 저장 프로세스 (실제로는 서버 API 호출)
    setTimeout(() => {
      setIsSaving(false);
      // 성공 메시지 표시 (토스트 등)
      alert("설정이 저장되었습니다!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/store')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            쇼핑몰로 돌아가기
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">쇼핑몰 설정</h1>
            <p className="text-lg text-muted-foreground">
              쇼핑몰의 디자인과 정보를 설정하세요
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 설정 섹션 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 브랜드 테마 설정 */}
            <Card className="card-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-6 w-6" />
                  브랜드 테마
                </CardTitle>
                <CardDescription>
                  쇼핑몰의 색상과 분위기를 설정하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {themeOptions.map((theme) => (
                    <Button
                      key={theme.id}
                      variant={selectedTheme === theme.id ? "default" : "outline"}
                      className="h-auto p-4 flex flex-col items-center gap-3"
                      onClick={() => {
                        setSelectedTheme(theme.id);
                        setSelectedColor(theme.id);
                      }}
                    >
                      <div 
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: theme.color }}
                      />
                      <span className="text-sm">{theme.name}</span>
                      {selectedTheme === theme.id && (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 기본 정보 설정 */}
            <Card className="card-soft">
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
                <CardDescription>
                  쇼핑몰의 기본 정보를 설정하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
          </div>

          {/* 미리보기 섹션 */}
          <div className="space-y-6">
            <Card className="card-soft">
              <CardHeader>
                <CardTitle>미리보기</CardTitle>
                <CardDescription>
                  변경사항이 어떻게 보일지 확인하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="border-2 rounded-lg p-6 text-center"
                  style={{ 
                    borderColor: themeOptions.find(t => t.id === selectedTheme)?.color,
                    backgroundColor: `${themeOptions.find(t => t.id === selectedTheme)?.color}10`
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-4"
                    style={{ backgroundColor: themeOptions.find(t => t.id === selectedTheme)?.color }}
                  />
                  <h3 className="font-bold text-lg mb-2">
                    {storeName || "상호명"}
                  </h3>
                  {tagline && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {tagline}
                    </p>
                  )}
                  <div className="text-xs text-muted-foreground">
                    선택된 테마: {themeOptions.find(t => t.id === selectedTheme)?.name}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-soft">
              <CardHeader>
                <CardTitle>적용 안내</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    변경사항은 즉시 쇼핑몰에 반영됩니다
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    기존 고객들에게도 새로운 디자인이 보입니다
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    언제든지 다시 변경할 수 있어요
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="flex justify-center mt-12">
          <Button 
            size="lg" 
            onClick={handleSave}
            disabled={isSaving}
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