import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const location = useLocation() as any;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    // 로그인 후: 최초 1회 온보딩
    const to = location.state?.from?.pathname;
    const hasOnboarded = (user?.hasOnboarded) ?? JSON.parse(localStorage.getItem("auth_user") || "{}")?.hasOnboarded;
    if (hasOnboarded) nav(to || "/studio", { replace: true });
    else nav("/onboarding", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>계정으로 로그인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input id="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button className="w-full" type="submit">로그인</Button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">
            회원이 아니신가요? <Link to="/signup" className="text-primary underline">회원가입</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
