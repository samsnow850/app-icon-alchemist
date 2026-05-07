import { Outlet } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";

const Layout = () => (
  <div className="min-h-screen bg-background bg-gradient-mesh bg-fixed">
    <SiteHeader />
    <Outlet />
  </div>
);

export default Layout;
