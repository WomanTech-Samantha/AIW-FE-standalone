import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft,
  Shield,
  Trash2,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  FileText,
  Mail
} from "lucide-react";

const DataDeletionPage = () => {
  const navigate = useNavigate();
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);

  return (
    <div className="page-container-narrow">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate("/settings")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          설정으로 돌아가기
        </Button>
        
        <div className="text-left">
          <h1 className="text-3xl md:text-4xl font-bold">데이터 삭제 안내</h1>
          <p className="text-lg text-muted-foreground mt-2">
            개인정보 삭제 요청 및 처리 방법을 안내합니다
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Facebook 정책에 따라 사용자는 언제든지 개인정보 삭제를 요청할 수 있습니다.
            저희는 사용자의 프라이버시를 존중하며, 관련 법규를 준수합니다.
          </AlertDescription>
        </Alert>

        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              삭제 가능한 데이터
            </CardTitle>
            <CardDescription>
              다음 데이터들이 삭제 요청 시 처리됩니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">계정 정보</h4>
                  <p className="text-sm text-muted-foreground">
                    이메일, 이름, 프로필 정보 등 기본 계정 정보
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Instagram 연동 데이터</h4>
                  <p className="text-sm text-muted-foreground">
                    Instagram 계정 연동 정보, 액세스 토큰, 미디어 데이터
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">스토어 정보</h4>
                  <p className="text-sm text-muted-foreground">
                    스토어 설정, 상품 정보, 커스터마이징 데이터
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">생성된 콘텐츠</h4>
                  <p className="text-sm text-muted-foreground">
                    업로드한 이미지, 작성한 텍스트, 생성한 디자인
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              삭제 처리 절차
            </CardTitle>
            <CardDescription>
              데이터 삭제는 다음 절차를 통해 진행됩니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">삭제 요청</h4>
                  <p className="text-sm text-muted-foreground">
                    아래 방법 중 하나를 통해 데이터 삭제를 요청하세요
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">요청 확인</h4>
                  <p className="text-sm text-muted-foreground">
                    24시간 이내 요청 접수 확인 이메일을 발송합니다
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">데이터 처리</h4>
                  <p className="text-sm text-muted-foreground">
                    30일 이내 모든 개인정보를 안전하게 삭제합니다
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">삭제 완료 통보</h4>
                  <p className="text-sm text-muted-foreground">
                    데이터 삭제 완료 후 이메일로 결과를 알려드립니다
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-6 w-6" />
              데이터 삭제 요청 방법
            </CardTitle>
            <CardDescription>
              다음 방법 중 하나를 선택하여 삭제를 요청하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showDeleteOptions ? (
              <Button 
                className="w-full"
                onClick={() => setShowDeleteOptions(true)}
              >
                삭제 요청 방법 보기
              </Button>
            ) : (
              <>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">온라인 요청</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        설정 페이지에서 직접 계정 삭제를 요청할 수 있습니다
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate("/settings")}
                      >
                        설정에서 삭제 요청
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">이메일 요청</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        고객 지원팀에 이메일로 삭제를 요청할 수 있습니다
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">이메일:</span>{" "}
                          <a 
                            href="mailto:privacy@womantech.com" 
                            className="text-primary hover:underline"
                          >
                            privacy@womantech.com
                          </a>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          제목: [데이터 삭제 요청] + 가입 이메일 주소
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 rounded">
                      <Download className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">데이터 다운로드</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        삭제 전 개인 데이터를 다운로드할 수 있습니다
                      </p>
                      <Button variant="outline" size="sm">
                        데이터 다운로드 요청
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="card-soft border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-900">
              <AlertCircle className="h-6 w-6" />
              중요 안내사항
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-yellow-900">
              <li className="flex items-start gap-2">
                <span className="font-medium">•</span>
                <span>
                  데이터 삭제 후에는 복구가 불가능합니다
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium">•</span>
                <span>
                  법적 의무 이행을 위해 일부 정보는 보관될 수 있습니다
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium">•</span>
                <span>
                  진행 중인 거래가 있는 경우 완료 후 삭제가 진행됩니다
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium">•</span>
                <span>
                  Facebook/Instagram 연동 데이터는 각 플랫폼의 정책에 따라 처리됩니다
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            추가 문의사항이 있으시면{" "}
            <a 
              href="mailto:support@womantech.com" 
              className="text-primary hover:underline"
            >
              support@womantech.com
            </a>
            {" "}으로 연락 주세요
          </p>
          <p className="mt-2">
            <a 
              href="https://developers.facebook.com/docs/development/create-an-app/app-dashboard/data-deletion-callback"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-xs"
            >
              Facebook 데이터 삭제 정책 자세히 보기
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataDeletionPage;