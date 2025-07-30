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
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>계정을 만들고 시작하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <Label htmlFor="name">이름</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input id="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button className="w-full" type="submit">계정 만들기</Button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">
            이미 계정이 있으신가요? <Link to="/login" className="text-primary underline">로그인</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
