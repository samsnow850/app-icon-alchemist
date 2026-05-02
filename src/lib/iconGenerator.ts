import JSZip from "jszip";
import { PLATFORMS, type Platform } from "./iconSizes";

export async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

function resizeToBlob(img: HTMLImageElement, size: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject(new Error("Canvas not supported"));
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, size, size);
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error("Blob failed"));
      resolve(blob);
    }, "image/png");
  });
}

export type ProgressCb = (current: number, total: number) => void;

export async function generateZip(
  img: HTMLImageElement,
  baseName: string,
  selected: Set<string>,
  onProgress?: ProgressCb,
): Promise<Blob> {
  const zip = new JSZip();
  const platforms = PLATFORMS.filter((p) => selected.has(p.id));
  const total = platforms.reduce((s, p) => s + p.icons.length, 0);
  let done = 0;

  const safe = baseName.trim().replace(/[^a-zA-Z0-9-_]/g, "_") || "AppIcon";
  const root = zip.folder(safe)!;

  for (const p of platforms) {
    const folder = root.folder(p.folder)!;
    for (const spec of p.icons) {
      const blob = await resizeToBlob(img, spec.size);
      const fileName = `${spec.name}.png`;
      folder.file(fileName, blob);
      done += 1;
      onProgress?.(done, total);
    }
  }

  return zip.generateAsync({ type: "blob", compression: "DEFLATE" });
}

export async function generatePreview(img: HTMLImageElement, platform: Platform) {
  const previews = await Promise.all(
    platform.icons.map(async (spec) => {
      const blob = await resizeToBlob(img, Math.min(spec.size, 256));
      return { spec, url: URL.createObjectURL(blob) };
    }),
  );
  return previews;
}
