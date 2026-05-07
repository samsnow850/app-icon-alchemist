import { useCallback, useMemo, useRef, useState } from "react";
import { Upload, Download, Image as ImageIcon, Check, X, Loader2, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { PLATFORMS, TOTAL_ICONS } from "@/lib/iconSizes";
import { generateZip, loadImage } from "@/lib/iconGenerator";

const Index = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [name, setName] = useState("AppIcon");
  const [selected, setSelected] = useState<Set<string>>(new Set(PLATFORMS.map((p) => p.id)));
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [warning, setWarning] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (f: File) => {
    if (!f.type.startsWith("image/")) {
      toast.error(t("toast.chooseImage"));
      return;
    }
    try {
      const image = await loadImage(f);
      setFile(f);
      setImg(image);
      setPreviewUrl(URL.createObjectURL(f));
      const baseName = f.name.replace(/\.[^.]+$/, "");
      setName(baseName || "AppIcon");
      if (image.width !== 1024 || image.height !== 1024) {
        setWarning(t("dropzone.warning", { w: image.width, h: image.height }));
      } else {
        setWarning(null);
      }
    } catch {
      toast.error(t("toast.loadFail"));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile],
  );

  const togglePlatform = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalSelected = useMemo(
    () => PLATFORMS.filter((p) => selected.has(p.id)).reduce((s, p) => s + p.count, 0),
    [selected],
  );

  const handleGenerate = async () => {
    if (!img) return;
    if (selected.size === 0) {
      toast.error(t("toast.selectPlatform"));
      return;
    }
    setBusy(true);
    setProgress({ current: 0, total: totalSelected });
    try {
      const blob = await generateZip(img, name, selected, (c, t) => setProgress({ current: c, total: t }));
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name || "AppIcon"}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(t("toast.generated", { count: totalSelected }));
    } catch (e) {
      console.error(e);
      toast.error(t("toast.genFail"));
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setFile(null);
    setImg(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setWarning(null);
  };

  return (
    <>
      <div className="container max-w-6xl py-16 md:py-28">
        {/* Editorial hero */}
        <header className="mb-20 text-center">
          <div className="glass glass-highlight mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/70">
            <span className="h-px w-6 bg-foreground/30" />
            {t("hero.kicker")}
            <span className="h-px w-6 bg-foreground/30" />
          </div>
          <h1 className="mx-auto max-w-4xl text-balance font-display text-5xl font-semibold leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-[88px]">
            {t("hero.titleLine1")}
            <br />
            {t("hero.titleLine2")}
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-balance text-base text-foreground/70 md:text-lg">
            {t("hero.subtitle", { count: TOTAL_ICONS })}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button
              size="lg"
              onClick={() => (img ? handleGenerate() : inputRef.current?.click())}
              disabled={busy}
              className="group h-14 rounded-full bg-gradient-primary px-8 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110"
            >
              {busy ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("hero.ctaGenerating", { current: progress.current, total: progress.total })}
                </>
              ) : img ? (
                <>
                  {t("hero.ctaGenerate", { count: totalSelected })}
                  <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">›</span>
                </>
              ) : (
                <>
                  {t("hero.ctaUpload")}
                  <span aria-hidden className="ml-1 transition-transform group-hover:translate-x-0.5">›</span>
                </>
              )}
            </Button>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/50">
              {t("hero.finePrint")}
            </p>
          </div>
        </header>

        <div id="generator" className="grid gap-6 lg:grid-cols-5">
          {/* Left: Upload + Settings */}
          <div className="space-y-6 lg:col-span-3">
            {/* Dropzone */}
            {!img ? (
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                className={`glass glass-highlight relative flex aspect-square max-h-[460px] cursor-pointer flex-col items-center justify-center rounded-[2rem] p-10 text-center transition-all hover:bg-white/40 ${
                  dragOver ? "!bg-white/50 ring-2 ring-primary/30" : ""
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary shadow-lg">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <p className="font-display text-2xl font-semibold tracking-tight">{t("dropzone.title")}</p>
                <p className="mt-2 text-sm text-foreground/60">{t("dropzone.sub")}</p>
                <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/40">{t("dropzone.browse")}</p>
              </label>
            ) : (
              <div className="glass glass-highlight rounded-[2rem] p-6">
                <div className="flex items-start gap-5">
                  <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-white/20">
                    {previewUrl && <img src={previewUrl} alt="Uploaded icon preview" className="h-full w-full object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-foreground/50" />
                      <p className="truncate text-sm font-medium">{file?.name}</p>
                    </div>
                    <p className="mt-1 text-xs text-foreground/60">
                      {img.width} × {img.height} · {((file?.size ?? 0) / 1024).toFixed(1)} KB
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={reset}
                      className="mt-3 h-8 rounded-full px-3 text-[11px] font-semibold uppercase tracking-wider"
                    >
                      <X className="mr-1 h-3.5 w-3.5" /> {t("dropzone.replace")}
                    </Button>
                  </div>
                </div>
                {warning && (
                  <div className="mt-4 flex items-start gap-2 rounded-2xl bg-white/20 p-3 text-xs text-foreground/80">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{warning}</span>
                  </div>
                )}
              </div>
            )}

            {/* Name */}
            <div className="glass glass-highlight rounded-[2rem] p-6">
              <Label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/60">
                {t("name.label")}
              </Label>
              <p className="mt-1 text-xs text-foreground/60">{t("name.hint")}</p>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("name.placeholder")}
                className="mt-3 h-12 rounded-full border-white/30 bg-white/30 px-5 backdrop-blur-sm"
              />
            </div>

            {/* Generate button */}
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!img || busy || selected.size === 0}
              className="group h-14 w-full rounded-full bg-gradient-primary text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110 disabled:opacity-40"
            >
              {busy ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("hero.ctaGenerating", { current: progress.current, total: progress.total })}
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  {t("hero.ctaGenerate", { count: totalSelected })}
                </>
              )}
            </Button>
          </div>

          {/* Right: Platform cards */}
          <div id="platforms" className="space-y-2 lg:col-span-2">
            <p className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
              {t("platforms.title")}
            </p>
            {PLATFORMS.map((p) => {
              const on = selected.has(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => togglePlatform(p.id)}
                  className={`group flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all ${
                    on
                      ? "glass glass-highlight"
                      : "border border-white/20 bg-white/10 opacity-60 backdrop-blur-sm hover:opacity-100"
                  }`}
                >
                  <Checkbox checked={on} className="pointer-events-none h-5 w-5 rounded-md" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-display text-base font-semibold tracking-tight">{t(`platforms.items.${p.id}.label`, { defaultValue: p.label })}</p>
                      <span className="rounded-full border border-white/30 bg-white/20 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-foreground/70">
                        {p.count}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-foreground/60">{t(`platforms.items.${p.id}.description`, { defaultValue: p.description })}</p>
                  </div>
                </button>
              );
            })}

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-gradient-primary p-5 text-white shadow-lg">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">{t("platforms.total")}</span>
              </div>
              <span className="font-display text-3xl font-semibold tabular-nums">{totalSelected}</span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Index;
