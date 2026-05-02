import { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Upload, Download, Image as ImageIcon, Sparkles, Check, X, Loader2, AlertTriangle, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { PLATFORMS, TOTAL_ICONS } from "@/lib/iconSizes";
import { generateZip, loadImage } from "@/lib/iconGenerator";

const Index = () => {
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
      toast.error("Please choose an image file (PNG recommended).");
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
        setWarning(`Your image is ${image.width}×${image.height}. For best results, upload a square 1024×1024 image. We'll still generate, but quality may suffer.`);
      } else {
        setWarning(null);
      }
    } catch {
      toast.error("Could not load that image.");
    }
  }, []);

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
      toast.error("Select at least one platform.");
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
      toast.success(`Generated ${totalSelected} icons!`);
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong while generating.");
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
    <div className="min-h-screen bg-background bg-gradient-mesh">
      {/* Free banner */}
      <div className="w-full bg-gradient-primary text-primary-foreground">
        <div className="container flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-xs font-medium md:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            100% free & open to everyone
          </span>
          <span className="opacity-60">·</span>
          <span>No ads</span>
          <span className="opacity-60">·</span>
          <span>No signup</span>
          <span className="opacity-60">·</span>
          <span>No payments — ever</span>
        </div>
      </div>

      <div className="container max-w-6xl py-12 md:py-20">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Free public tool · One icon → every platform
          </div>
          <h1 className="text-balance text-5xl font-bold tracking-tight md:text-6xl">
            <span className="text-gradient">App Icon</span> Generator
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
            Drop in a 1024×1024 image and download every size you need for iPhone, iPad, Apple Watch, macOS, and Android — {TOTAL_ICONS} icons in seconds.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Button
              size="lg"
              onClick={() => (img ? handleGenerate() : inputRef.current?.click())}
              disabled={busy}
              className="h-14 rounded-2xl bg-gradient-primary px-8 text-base font-semibold shadow-elegant transition-all hover:shadow-glow"
            >
              {busy ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating {progress.current}/{progress.total}…
                </>
              ) : img ? (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Generate {totalSelected} icons
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-5 w-5" />
                  Upload &amp; Generate
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground">Free forever · No signup · Runs in your browser</p>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-5">
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
                className={`relative flex aspect-square max-h-[420px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed bg-card/40 p-10 text-center backdrop-blur transition-all hover:border-primary hover:bg-card/80 ${
                  dragOver ? "scale-[1.01] border-primary bg-accent shadow-glow" : "border-border"
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
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-elegant">
                  <Upload className="h-7 w-7 text-primary-foreground" />
                </div>
                <p className="text-lg font-semibold">Drop your icon here</p>
                <p className="mt-1 text-sm text-muted-foreground">or click to browse · PNG · 1024×1024 recommended</p>
              </label>
            ) : (
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-5">
                  <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-secondary shadow-md">
                    {previewUrl && <img src={previewUrl} alt="Uploaded icon preview" className="h-full w-full object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      <p className="truncate text-sm font-medium">{file?.name}</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {img.width} × {img.height} · {((file?.size ?? 0) / 1024).toFixed(1)} KB
                    </p>
                    <Button variant="ghost" size="sm" onClick={reset} className="mt-3 h-8 px-2 text-xs">
                      <X className="mr-1 h-3.5 w-3.5" /> Replace
                    </Button>
                  </div>
                </div>
                {warning && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-accent/60 p-3 text-xs text-accent-foreground">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{warning}</span>
                  </div>
                )}
              </div>
            )}

            {/* Name */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <Label htmlFor="name" className="text-sm font-semibold">
                File name
              </Label>
              <p className="mt-1 text-xs text-muted-foreground">Used as the zip name and root folder.</p>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="AppIcon"
                className="mt-3 h-11 rounded-xl"
              />
            </div>

            {/* Generate button */}
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={!img || busy || selected.size === 0}
              className="h-14 w-full rounded-2xl bg-gradient-primary text-base font-semibold shadow-elegant transition-all hover:shadow-glow disabled:opacity-50"
            >
              {busy ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating {progress.current}/{progress.total}…
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Generate {totalSelected} icons
                </>
              )}
            </Button>
          </div>

          {/* Right: Platform cards */}
          <div className="space-y-3 lg:col-span-2">
            <p className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Platforms</p>
            {PLATFORMS.map((p) => {
              const on = selected.has(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => togglePlatform(p.id)}
                  className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                    on
                      ? "border-primary/40 bg-card shadow-sm"
                      : "border-border bg-card/40 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Checkbox checked={on} className="pointer-events-none h-5 w-5" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold">{p.label}</p>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                        {p.count}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
                  </div>
                </button>
              );
            })}

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-gradient-primary p-4 text-primary-foreground shadow-elegant">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">Total icons</span>
              </div>
              <span className="text-2xl font-bold tabular-nums">{totalSelected}</span>
            </div>
          </div>
        </div>

        <footer className="mt-20 space-y-3 text-center">
          <div className="mx-auto inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-border bg-card/60 px-4 py-2 text-xs font-medium text-foreground backdrop-blur">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              100% free
            </span>
            <span className="opacity-40">·</span>
            <span>No ads</span>
            <span className="opacity-40">·</span>
            <span>No signup</span>
            <span className="opacity-40">·</span>
            <span>No payments</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Built for designers and developers · All processing happens in your browser
          </p>
          <p className="text-xs text-muted-foreground">
            <Link to="/privacy" className="underline-offset-4 hover:text-foreground hover:underline">
              Privacy Policy
            </Link>
          </p>
          <p className="pt-2">
            <a
              href="https://github.com/samsnow850/app-icon-alchemist"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              <Github className="h-3.5 w-3.5" />
              Free and open source on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
