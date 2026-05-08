import { useEffect, useState } from "react";

const STORAGE_KEY = "icon-forge:loaded";

export const LoadingScreen = () => {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(STORAGE_KEY);
  });
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    const leaveT = setTimeout(() => setLeaving(true), 1800);
    const removeT = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(STORAGE_KEY, "1");
      document.body.style.overflow = "";
    }, 2700);
    return () => {
      clearTimeout(leaveT);
      clearTimeout(removeT);
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-transform duration-[900ms] ease-[cubic-bezier(0.7,0,0.2,1)] ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <div className="grid grid-cols-2 gap-1.5">
          <span className="h-5 w-5 rounded-md bg-foreground animate-[pulse_1.4s_ease-in-out_infinite]" style={{ animationDelay: "0ms" }} />
          <span className="h-5 w-5 rounded-md bg-foreground/30 animate-[pulse_1.4s_ease-in-out_infinite]" style={{ animationDelay: "150ms" }} />
          <span className="h-5 w-5 rounded-md bg-foreground/30 animate-[pulse_1.4s_ease-in-out_infinite]" style={{ animationDelay: "300ms" }} />
          <span className="h-5 w-5 rounded-md bg-foreground animate-[pulse_1.4s_ease-in-out_infinite]" style={{ animationDelay: "450ms" }} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight">Icon Forge</span>
          <div className="h-[2px] w-32 overflow-hidden rounded-full bg-foreground/10">
            <div className="h-full w-1/3 rounded-full bg-foreground animate-[loading-bar_1.6s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
