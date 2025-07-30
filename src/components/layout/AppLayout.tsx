import { Outlet } from "react-router-dom";
import TopNavBar from "@/components/common/TopNavBar";

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <TopNavBar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;