import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Index from "./pages/Index.tsx";
import Privacy from "./pages/Privacy.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useLanguageSync } from "./lib/routing";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const LanguageSync = ({ children }: { children: React.ReactNode }) => {
  useLanguageSync();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageSync>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              {/* English (default, no prefix) */}
              <Route path="/" element={<Index />} />
              <Route path="/privacy" element={<Privacy />} />

              {/* Localized routes */}
              <Route path="/:lang" element={<Index />} />
              <Route path="/:lang/privacy" element={<Privacy />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </LanguageSync>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
