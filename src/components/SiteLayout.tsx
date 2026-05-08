import { Outlet } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const SiteLayout = () => (
  <div className="flex min-h-screen flex-col bg-background">
    <SiteHeader />
    <main className="flex min-h-0 flex-1 flex-col">
      <Outlet />
    </main>
    <SiteFooter />
  </div>
);

export default SiteLayout;
