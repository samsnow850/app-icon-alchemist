import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Mask = "squircle" | "circle" | "rounded" | "square";

const TILES: { id: "ios" | "android" | "macos" | "web"; mask: Mask; size: number }[] = [
  { id: "ios", mask: "squircle", size: 132 },
  { id: "android", mask: "circle", size: 132 },
  { id: "macos", mask: "squircle", size: 132 },
  { id: "web", mask: "square", size: 132 },
];

const SWATCHES = [
  { id: "transparent", value: "transparent" },
  { id: "white", value: "#ffffff" },
  { id: "black", value: "#0b0b0f" },
  { id: "blue", value: "#3b82f6" },
  { id: "violet", value: "#7c3aed" },
  { id: "rose", value: "#f43f5e" },
  { id: "amber", value: "#f59e0b" },
];

// Inline sample icon: bold gradient tile with a stylized "★"
const SAMPLE_SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="60%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#g)"/>
  <g fill="#ffffff" opacity="0.96">
    <path d="M512 220 l86 196 212 22 -160 144 46 210 -184 -110 -184 110 46 -210 -160 -144 212 -22z"/>
  </g>
</svg>`;

const SAMPLE_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(SAMPLE_SVG)}`;

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.onload = () => res(im);
    im.onerror = rej;
    im.src = src;
  });
}

function maskBorderRadius(mask: Mask): string {
  switch (mask) {
    case "circle": return "50%";
    case "squircle": return "22.5%";
    case "rounded": return "18%";
    case "square": return "8%";
  }
}

interface Props {
  sourceImg?: HTMLImageElement | null;
}

const IconPlayground = ({ sourceImg }: Props) => {
  const { t } = useTranslation();
  const [sample, setSample] = useState<HTMLImageElement | null>(null);
  const [useUser, setUseUser] = useState(false);
  const [bg, setBg] = useState<string>("#0b0b0f");
  const [padding, setPadding] = useState<number>(8); // 0-25 (%)
  const [radius, setRadius] = useState<number>(22); // 0-50 (% of icon)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    loadImg(SAMPLE_SRC).then((im) => {
      if (!cancelled) setSample(im);
    });
    return () => { cancelled = true; };
  }, []);

  // Auto-switch to user icon when one becomes available
  useEffect(() => {
    if (sourceImg) setUseUser(true);
  }, [sourceImg]);

  const activeImg = useUser && sourceImg ? sourceImg : sample;

  // Render base composite (background + padded, rounded icon) at 512px once per change
  useEffect(() => {
    const cnv = canvasRef.current;
    if (!cnv || !activeImg) return;
    const SIZE = 512;
    cnv.width = SIZE;
    cnv.height = SIZE;
    const ctx = cnv.getContext("2d");
    if (!ctx) return;

    let raf = requestAnimationFrame(() => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      if (bg !== "transparent") {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, SIZE, SIZE);
      }
      const pad = (padding / 100) * SIZE;
      const inner = SIZE - pad * 2;
      const r = (radius / 100) * inner;

      ctx.save();
      const path = new Path2D();
      // rounded rect path
      const x = pad, y = pad, w = inner, h = inner;
      path.moveTo(x + r, y);
      path.lineTo(x + w - r, y);
      path.quadraticCurveTo(x + w, y, x + w, y + r);
      path.lineTo(x + w, y + h - r);
      path.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      path.lineTo(x + r, y + h);
      path.quadraticCurveTo(x, y + h, x, y + h - r);
      path.lineTo(x, y + r);
      path.quadraticCurveTo(x, y, x + r, y);
      path.closePath();
      ctx.clip(path);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(activeImg, pad, pad, inner, inner);
      ctx.restore();

      setDataUrl(cnv.toDataURL("image/png"));
    });
    return () => cancelAnimationFrame(raf);
  }, [activeImg, bg, padding, radius]);

  const checker = useMemo(
    () =>
      "linear-gradient(45deg,#e5e7eb 25%,transparent 25%),linear-gradient(-45deg,#e5e7eb 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e5e7eb 75%),linear-gradient(-45deg,transparent 75%,#e5e7eb 75%)",
    [],
  );

  const scrollToGenerator = () => {
    const el = document.getElementById("generator");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="container max-w-6xl pb-8 pt-2" aria-labelledby="demo-heading">
      <div className="rounded-[2rem] border border-border bg-card p-6 md:p-10">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/60">
            <span className="h-px w-6 bg-foreground/30" />
            {t("demo.kicker")}
            <span className="h-px w-6 bg-foreground/30" />
          </div>
          <h2 id="demo-heading" className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {t("demo.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-foreground/60 md:text-base">{t("demo.subtitle")}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Controls */}
          <div className="space-y-6 lg:col-span-2">
            <div>
              <Label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/60">
                {t("demo.background")}
              </Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {SWATCHES.map((s) => {
                  const active = bg === s.value;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setBg(s.value)}
                      aria-label={s.id}
                      aria-pressed={active}
                      className={cn(
                        "h-9 w-9 rounded-full border transition-all",
                        active ? "border-foreground ring-2 ring-foreground/20 scale-110" : "border-border hover:scale-105",
                      )}
                      style={
                        s.value === "transparent"
                          ? { background: checker, backgroundSize: "10px 10px", backgroundPosition: "0 0,0 5px,5px -5px,-5px 0" }
                          : { background: s.value }
                      }
                    />
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/60">
                  {t("demo.padding")}
                </Label>
                <span className="font-mono text-xs tabular-nums text-foreground/60">{padding}%</span>
              </div>
              <Slider value={[padding]} min={0} max={25} step={1} onValueChange={(v) => setPadding(v[0])} />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/60">
                  {t("demo.radius")}
                </Label>
                <span className="font-mono text-xs tabular-nums text-foreground/60">{radius}%</span>
              </div>
              <Slider value={[radius]} min={0} max={50} step={1} onValueChange={(v) => setRadius(v[0])} />
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {sourceImg && (
                <Button
                  type="button"
                  variant={useUser ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseUser((v) => !v)}
                  className="rounded-full"
                >
                  {useUser ? t("demo.useSample") : t("demo.useMine")}
                </Button>
              )}
              <Button
                type="button"
                size="sm"
                onClick={scrollToGenerator}
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {t("demo.sendToGenerator")} ›
              </Button>
            </div>
          </div>

          {/* Tiles */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {TILES.map((tile) => (
                <figure key={tile.id} className="flex flex-col items-center gap-3">
                  <div
                    className="relative overflow-hidden shadow-elegant transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
                    style={{
                      width: tile.size,
                      height: tile.size,
                      borderRadius: maskBorderRadius(tile.mask),
                      background:
                        bg === "transparent"
                          ? `${checker}, hsl(var(--muted))`
                          : undefined,
                      backgroundSize: bg === "transparent" ? "12px 12px" : undefined,
                      backgroundPosition:
                        bg === "transparent" ? "0 0,0 6px,6px -6px,-6px 0" : undefined,
                    }}
                  >
                    {dataUrl && (
                      <img
                        src={dataUrl}
                        alt=""
                        className="h-full w-full select-none object-cover"
                        draggable={false}
                      />
                    )}
                  </div>
                  <figcaption className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/60">
                    {t(`demo.tiles.${tile.id}`)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>

        {/* Hidden working canvas */}
        <canvas ref={canvasRef} className="hidden" aria-hidden />
      </div>
    </section>
  );
};

export default IconPlayground;
