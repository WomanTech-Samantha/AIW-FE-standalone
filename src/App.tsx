import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/context/MockAuthContext";
import Index from "./pages/Index";
import OnboardingPage from "./pages/OnboardingNew";
import AssetStudioPage from "./pages/AssetStudio";
import CalendarPage from "./pages/Calendar";
import DashboardPage from "./pages/Dashboard";
import ComparisonPage from "./pages/Comparison";
import NotFound from "./pages/NotFound";
import StorePage from "./pages/Store";
import StoreSettingsPage from "./pages/StoreSettings";
import InstagramConnectPage from "./pages/InstagramConnect";  
import InstagramCallbackPage from "./pages/InstagramCallback";
import InstagramManagePage from "./pages/InstagramManage";
import InstagramInsightsPage from "./pages/InstagramInsights";
import InstagramPostPage from "./pages/InstagramPost";
import InstagramCommentsPage from "./pages/InstagramComments";
import InstagramMediaPage from "./pages/InstagramMedia";
import SettingsPage from "./pages/Settings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import PublicStore from "./pages/PublicStore";
import DataDeletionPage from "./pages/DataDeletion";

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
            {/* 메인 랜딩 페이지 */}
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/instagram/callback" element={<InstagramCallbackPage />} />

            {/* 모든 페이지를 공개로 변경 */}
            <Route element={<AppLayout />}>
              <Route path="/store" element={<StorePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/studio" element={<AssetStudioPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/store/settings" element={<StoreSettingsPage />} />
              <Route path="/instagram/connect" element={<InstagramConnectPage />} />
              <Route path="/instagram/manage" element={<InstagramManagePage />} />
              <Route path="/instagram/insights" element={<InstagramInsightsPage />} />
              <Route path="/instagram/post" element={<InstagramPostPage />} />
              <Route path="/instagram/comments" element={<InstagramCommentsPage />} />
              <Route path="/instagram/media" element={<InstagramMediaPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/data-deletion" element={<DataDeletionPage />} />
            </Route>


            {/* PublicStore 라우팅 - store 쿼리 파라미터가 있을 때만 */}
            <Route path="/category/*" element={<PublicStore />} />
            <Route path="/product/*" element={<PublicStore />} />

            {/* 최하단 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
