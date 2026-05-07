import { Outlet } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const Layout = () => (
  <div className="min-h-screen bg-background bg-gradient-mesh bg-fixed">
    <SiteHeader />
    <Outlet />
    <div className="px-3 pb-10 sm:px-4">
      <SiteFooter />
    </div>
  </div>
);

export default Layout;
