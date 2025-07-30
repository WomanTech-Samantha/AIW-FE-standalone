import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import OnboardingPage from "./pages/Onboarding";
import AssetStudioPage from "./pages/AssetStudio";
import CalendarPage from "./pages/Calendar";
import DashboardPage from "./pages/Dashboard";
import ComparisonPage from "./pages/Comparison";
import NotFound from "./pages/NotFound";
import InstagramPage from "./pages/Instagram";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/routes/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* 공개 페이지 */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/comparison" element={<ComparisonPage />} />

            {/* 보호 영역: 상단 내비게이션 포함 */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/studio" element={<AssetStudioPage />} />
                <Route path="/instagram" element={<InstagramPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
              </Route>
            </Route>

            {/* 온보딩: 로그인 필요, 내비게이션 없이 단독 화면 */}
            <Route element={<ProtectedRoute />}>
              <Route path="/onboarding" element={<OnboardingPage />} />
            </Route>

            {/* 최하단 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
