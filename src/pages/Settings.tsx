import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { 
  ArrowLeft, 
  Save,
  User,
  Building,
  Bell,
  Shield,
  Trash2,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // 브랜드 기본 정보 (사용자 정보와 직결)
  const [storeName, setStoreName] = useState(user?.storeName || "");
  const [business, setBusiness] = useState(user?.business || "");
  const [email, setEmail] = useState(user?.email || "");
  
  // 알림 설정
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const businessOptions = [
    "🛏️ 침구·이불", "🪟 커튼·블라인드", "👗 의류·패션", 
    "🍽️ 음식·요리", "💄 뷰티·화장품", "🧵 수공예"
  ];

  const handleSave = async () => {
    setIsSaving(true);
    
    // 모의 저장 프로세스
    setTimeout(() => {
      setIsSaving(false);
      alert("설정이 저장되었습니다!");
    }, 1500);
  };

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      // 실제 계정 삭제 로직
      alert("계정이 삭제되었습니다.");
      logout();
      navigate("/");
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 10000); // 10초 후 자동 취소
    }
  };

  return (
    <div className="page-container-narrow">
        {/* Header */}
        <div className="mb-8">
          <div className="text-left mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">설정</h1>
            <p className="text-lg text-muted-foreground">
              계정 정보와 앱 설정을 관리하세요
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* 브랜드 기본 정보 */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-6 w-6" />
                브랜드 기본 정보
              </CardTitle>
              <CardDescription>
                사업장의 기본 정보입니다. 이 정보는 모든 서비스에서 공통으로 사용됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Label className="text-base mb-2 block">업종</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {businessOptions.map((option) => (
                      <Button
                        key={option}
                        variant={business === option ? "default" : "outline"}
                        size="sm"
                        onClick={() => setBusiness(option)}
                        className="justify-start text-sm"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 계정 정보 */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6" />
                계정 정보
              </CardTitle>
              <CardDescription>
                로그인 정보를 관리합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-base mb-2 block">
                  이메일 주소
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-lg"
                  placeholder="example@email.com"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  로그인 ID로 사용됩니다.
                </p>
              </div>
              
              <div>
                <Button variant="outline">
                  비밀번호 변경
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 알림 설정 */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-6 w-6" />
                알림 설정
              </CardTitle>
              <CardDescription>
                받고 싶은 알림을 설정하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">이메일 알림</h4>
                  <p className="text-sm text-muted-foreground">
                    중요한 업데이트와 알림을 이메일로 받습니다
                  </p>
                </div>
                <Button
                  variant={emailNotifications ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                >
                  {emailNotifications ? "켜짐" : "꺼짐"}
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">마케팅 정보 수신</h4>
                  <p className="text-sm text-muted-foreground">
                    새로운 기능, 팁, 프로모션 정보를 받습니다
                  </p>
                </div>
                <Button
                  variant={marketingEmails ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMarketingEmails(!marketingEmails)}
                >
                  {marketingEmails ? "켜짐" : "꺼짐"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 개인정보 및 보안 */}
          <Card className="card-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                개인정보 및 보안
              </CardTitle>
              <CardDescription>
                데이터 보호 및 계정 보안을 관리합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  내 데이터 다운로드
                </Button>
                <Button variant="outline" className="justify-start">
                  연동된 서비스 관리
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 저장 버튼 */}
          <div className="flex justify-center">
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

export default SettingsPage;