import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import OnboardingPage from "./pages/OnboardingNew";
import AssetStudioPage from "./pages/AssetStudio";
import CalendarPage from "./pages/Calendar";
import DashboardPage from "./pages/Dashboard";
import ComparisonPage from "./pages/Comparison";
import NotFound from "./pages/NotFound";
import InstagramPage from "./pages/Instagram";
import StorePage from "./pages/Store";
import StoreCreatePage from "./pages/StoreCreate";
import StoreSettingsPage from "./pages/StoreSettings";
import InstagramGuidePage from "./pages/InstagramGuide";
import InstagramConnectPage from "./pages/InstagramConnect";  
import InstagramManagePage from "./pages/InstagramManage";
import SettingsPage from "./pages/Settings";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OAuthCallback from "./pages/OAuthCallback";

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
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <Routes>
            {/* 공개 페이지 */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/oauth/callback" element={<OAuthCallback />} />

            {/* 보호 영역: 상단 내비게이션 포함 */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/store" element={<StorePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/studio" element={<AssetStudioPage />} />
                <Route path="/instagram" element={<InstagramPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/store/create" element={<StoreCreatePage />} />
                <Route path="/store/settings" element={<StoreSettingsPage />} />
                <Route path="/store/instagram-guide" element={<InstagramGuidePage />} />
                <Route path="/instagram/connect" element={<InstagramConnectPage />} />
                <Route path="/instagram/manage" element={<InstagramManagePage />} />
                <Route path="/settings" element={<SettingsPage />} />
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
