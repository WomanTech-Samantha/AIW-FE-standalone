import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/MockAuthContext";
import { useToast } from "@/hooks/use-toast";
import { ChangePasswordDialog } from "@/components/ChangePasswordDialog";
import { 
  ArrowLeft, 
  Save,
  User,
  Building,
  Bell,
  Shield,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ExternalLink
} from "lucide-react";

const SettingsPage = () => {
  const navigate = useNavigate();
  
  // 변경사항 추적
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState<any>(null);
  const { user, logout, updateUserProfile } = useAuth();
  const { toast } = useToast();
  
  // 브랜드 기본 정보 (useEffect에서 로드됨)
  const [storeName, setStoreName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  
  // 알림 설정 (useEffect에서 로드됨)
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // user가 로드되면 모든 필드들을 업데이트
  useEffect(() => {
    if (user) {
      console.log('Settings - User data loaded:', user); // 디버깅용
      const userData = {
        storeName: user.storeName || "",
        business: user.business || "",
        email: user.email || ""
      };
      
      setStoreName(userData.storeName);
      setBusiness(userData.business);
      setEmail(userData.email);
      
      setOriginalData(userData);
    }
  }, [user]);
  
  // 변경사항 감지
  useEffect(() => {
    if (!originalData) return;
    
    const currentData = {
      storeName,
      business,
      email
    };
    
    const hasChanged = JSON.stringify(currentData) !== JSON.stringify(originalData);
    setHasChanges(hasChanged);
  }, [storeName, business, email, originalData]);

  const businessOptions = [
    "침구·이불", "수공예"
  ];

  const handleSave = async () => {
    setIsSaving(true);
    
    // user 정보 업데이트
    updateUserProfile({
      storeName,
      business,
      email
    });
    
    // 토스트 메시지로 알림
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "저장 완료",
        description: "설정이 성공적으로 저장되었습니다.",
      });
    }, 1200);
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

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      // 실제 계정 삭제 로직
      alert("계정이 삭제되었습니다");
      logout();
      navigate("/");
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 10000); // 10초 후 자동 취소
    }
  };

  const handleChangePasswordSuccess = () => {
    toast({
      title: "비밀번호 변경 완료",
      description: "비밀번호가 성공적으로 변경되었습니다.",
    });
  };

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
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
                사업체의 기본 정보입니다. 이 정보는 모든 서비스에서 공통으로 사용됩니다.
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
                    placeholder="예: 지수커튼침구"
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
                        {business === option && <CheckCircle2 className="ml-2 h-4 w-4" />}
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
                  로그인 ID로 사용됩니다
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Button 
                    variant="outline"
                    onClick={() => setShowChangePassword(true)}
                  >
                    비밀번호 변경
                  </Button>
                </div>
                
                {/* 계정 추가 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground border-t pt-4">
                  <div>
                    <span className="font-medium">가입일:</span>
                    <span className="ml-2">2024년 1월 15일</span>
                  </div>
                  <div>
                    <span className="font-medium">마지막 로그인:</span>
                    <span className="ml-2">오늘</span>
                  </div>
                  <div>
                    <span className="font-medium">로그인 방식:</span>
                    <span className="ml-2">이메일</span>
                  </div>
                  <div>
                    <span className="font-medium">계정 상태:</span>
                    <span className="ml-2">
                      <span className="text-green-600">활성</span>
                    </span>
                  </div>
                </div>
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
                받고 싶은 알림을 설정하세요
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
                  className="min-w-[80px]"
                >
                  {emailNotifications ? (
                    <>
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      켜짐
                    </>
                  ) : (
                    "꺼짐"
                  )}
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">마케팅 정보 수신</h4>
                  <p className="text-sm text-muted-foreground">
                    새로운 기능, 팁 및 프로모션 정보를 받습니다
                  </p>
                </div>
                <Button
                  variant={marketingEmails ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMarketingEmails(!marketingEmails)}
                  className="min-w-[80px]"
                >
                  {marketingEmails ? (
                    <>
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      켜짐
                    </>
                  ) : (
                    "꺼짐"
                  )}
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
                  자동화 서비스 관리
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => navigate('/data-deletion')}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  데이터 삭제 안내
                </Button>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">정책 및 약관</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto p-3"
                    onClick={() => window.open('/privacy', '_blank')}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <div className="text-left">
                        <div className="text-sm font-medium">개인정보처리방침</div>
                        <div className="text-xs text-muted-foreground">개인정보 수집 및 사용</div>
                      </div>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto p-3"
                    onClick={() => window.open('/terms', '_blank')}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <div className="text-left">
                        <div className="text-sm font-medium">서비스 이용약관</div>
                        <div className="text-xs text-muted-foreground">서비스 이용 규정</div>
                      </div>
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </div>
                  </Button>
                </div>
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

        {/* 비밀번호 변경 다이얼로그 */}
        <ChangePasswordDialog 
          open={showChangePassword} 
          onOpenChange={setShowChangePassword}
          onSuccess={handleChangePasswordSuccess}
        />
        </div>
    </div>
  );
};

export default SettingsPage;