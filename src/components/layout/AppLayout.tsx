import { Outlet } from "react-router-dom";
import TopNavBar from "@/components/common/TopNavBar";
import Footer from "@/components/common/Footer";

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavBar />
      <main className="container mx-auto px-4 py-6 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;