import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="glass glass-highlight rounded-[2rem] px-12 py-16 text-center">
        <h1 className="mb-4 text-6xl font-bold text-gradient">404</h1>
        <p className="mb-6 text-lg text-foreground/70">Oops! Page not found</p>
        <a href="/" className="inline-flex h-11 items-center rounded-full bg-gradient-primary px-6 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
