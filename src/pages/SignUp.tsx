import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup({ email, password, name });
    // 회원가입 직후 → 온보딩 시작
    nav("/onboarding", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-soft">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">
            회원가입
          </CardTitle>
          <CardDescription className="text-gray-600">
            계정을 만들고 시작하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">이름</Label>
              <Input 
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="홍길동"
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">이메일</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="example@email.com"
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">비밀번호</Label>
              <Input 
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="비밀번호 입력"
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                className="h-11"
              />
            </div>
            <Button 
              className="w-full h-11 gradient-primary text-white hover:opacity-90" 
              type="submit"
            >
              계정 만들기
            </Button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              이미 계정이 있으신가요?{" "}
              <Link 
                to="/login" 
                className="font-medium text-primary hover:text-primary/80 underline underline-offset-4"
              >
                로그인
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
