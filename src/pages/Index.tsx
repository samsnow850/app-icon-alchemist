import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Upload, Download, Image as ImageIcon, Check, X, Loader2, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { PLATFORMS, TOTAL_ICONS } from "@/lib/iconSizes";
import { buildPlatformPreviews, generateZip, loadImage, type PlatformPreviewRow } from "@/lib/iconGenerator";
import IconPlayground from "@/components/IconPlayground";

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
  const [gridPreview, setGridPreview] = useState<PlatformPreviewRow[]>([]);
  const [gridLoading, setGridLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlsRef = useRef<string[]>([]);

  const revokePreviewBatch = useCallback((urls: string[]) => {
    urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

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

  useEffect(() => {
    if (!img) {
      revokePreviewBatch(previewUrlsRef.current);
      previewUrlsRef.current = [];
      setGridPreview([]);
      setGridLoading(false);
      return;
    }

    const platforms = PLATFORMS.filter((p) => selected.has(p.id));
    if (platforms.length === 0) {
      revokePreviewBatch(previewUrlsRef.current);
      previewUrlsRef.current = [];
      setGridPreview([]);
      setGridLoading(false);
      return;
    }

    let cancelled = false;
    const staleUrls = previewUrlsRef.current.slice();

    setGridLoading(true);

    (async () => {
      try {
        const batches = await buildPlatformPreviews(img, selected);
        if (cancelled) {
          batches.forEach((b) => b.previews.forEach((x) => URL.revokeObjectURL(x.url)));
          return;
        }
        revokePreviewBatch(staleUrls);
        previewUrlsRef.current = batches.flatMap((b) => b.previews.map((x) => x.url));
        setGridPreview(batches);
      } finally {
        if (!cancelled) setGridLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [img, selected, revokePreviewBatch]);

  useEffect(
    () => () => {
      revokePreviewBatch(previewUrlsRef.current);
      previewUrlsRef.current = [];
    },
    [revokePreviewBatch],
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
    revokePreviewBatch(previewUrlsRef.current);
    previewUrlsRef.current = [];
    setGridPreview([]);
    setGridLoading(false);
  };

  return (
    <div className="container max-w-6xl py-16 md:py-28">
        {/* Editorial hero */}
        <header className="mb-20 text-center">
          <div className="mb-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/70">
            <span className="h-px w-8 bg-foreground/40" />
            {t("hero.kicker")}
            <span className="h-px w-8 bg-foreground/40" />
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
              className="group h-14 rounded-full bg-primary px-8 text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-elegant transition-all hover:bg-primary/90"
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
                className={`relative flex aspect-square max-h-[460px] cursor-pointer flex-col items-center justify-center rounded-[2rem] border bg-card p-10 text-center transition-all hover:border-foreground/40 ${
                  dragOver ? "border-foreground bg-accent" : "border-border"
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
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                  <Upload className="h-5 w-5 text-primary-foreground" />
                </div>
                <p className="font-display text-2xl font-semibold tracking-tight">{t("dropzone.title")}</p>
                <p className="mt-2 text-sm text-foreground/60">{t("dropzone.sub")}</p>
                <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/40">{t("dropzone.browse")}</p>
              </label>
            ) : (
              <div className="rounded-[2rem] border border-border bg-card p-6">
                <div className="flex items-start gap-5">
                  <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-secondary">
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
                  <div className="mt-4 flex items-start gap-2 rounded-2xl bg-accent p-3 text-xs text-accent-foreground">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{warning}</span>
                  </div>
                )}
              </div>
            )}

            {/* Name */}
            <div className="rounded-[2rem] border border-border bg-card p-6">
              <Label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/60">
                {t("name.label")}
              </Label>
              <p className="mt-1 text-xs text-foreground/60">{t("name.hint")}</p>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("name.placeholder")}
                className="mt-3 h-12 rounded-full border-border bg-background px-5"
              />
            </div>

            {/* Generate button */}
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!img || busy || selected.size === 0}
              className="group h-14 w-full rounded-full bg-primary text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40"
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
                  className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                    on
                      ? "border-foreground/20 bg-card"
                      : "border-border bg-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Checkbox checked={on} className="pointer-events-none h-5 w-5 rounded-md" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-display text-base font-semibold tracking-tight">{t(`platforms.items.${p.id}.label`, { defaultValue: p.label })}</p>
                      <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-semibold tabular-nums text-foreground/70">
                        {p.count}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-foreground/60">{t(`platforms.items.${p.id}.description`, { defaultValue: p.description })}</p>
                  </div>
                </button>
              );
            })}

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-primary p-5 text-primary-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">{t("platforms.total")}</span>
              </div>
              <span className="font-display text-3xl font-semibold tabular-nums">{totalSelected}</span>
            </div>
          </div>
        </div>

        {img && (
          <section className="mt-20 scroll-mt-24" aria-labelledby="preview-heading">
            <div className="mb-8 flex flex-col gap-2 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 id="preview-heading" className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {t("preview.title")}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-foreground/60">{t("preview.hint")}</p>
              </div>
            </div>

            {selected.size === 0 ? (
              <p className="rounded-2xl border border-dashed border-border bg-card/50 px-6 py-10 text-center text-sm text-foreground/60">
                {t("preview.selectPlatforms")}
              </p>
            ) : gridLoading ? (
              <div className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-card/50 py-16 text-sm text-foreground/70">
                <Loader2 className="h-5 w-5 animate-spin shrink-0" aria-hidden />
                {t("preview.loading")}
              </div>
            ) : (
              <div className="space-y-14">
                {gridPreview.map((block) => (
                  <div key={block.platformId}>
                    <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
                      {t(`platforms.items.${block.platformId}.label`, {
                        defaultValue: PLATFORMS.find((p) => p.id === block.platformId)?.label ?? block.platformId,
                      })}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                      {block.previews.map(({ spec, url }) => (
                        <figure
                          key={`${block.platformId}-${spec.name}`}
                          className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                        >
                          <div className="flex aspect-square items-center justify-center bg-secondary/40 p-2">
                            <img
                              src={url}
                              alt=""
                              className="max-h-full max-w-full object-contain"
                              width={Math.min(spec.size, 256)}
                              height={Math.min(spec.size, 256)}
                            />
                          </div>
                          <figcaption className="space-y-0.5 border-t border-border px-2 py-2">
                            <p className="truncate font-mono text-[10px] leading-tight text-foreground/80" title={spec.name}>
                              {spec.name}
                            </p>
                            <p className="text-[10px] font-medium tabular-nums text-foreground/50">
                              {t("preview.outputLabel", { size: spec.size })}
                            </p>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
    </div>
  );
};

export default Index;
