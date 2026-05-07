import { useTranslation } from "react-i18next";
import type { Platform, IconSpec } from "@/lib/iconSizes";

export type PlatformPreview = {
  platform: Platform;
  icons: { spec: IconSpec; url: string }[];
};

type Props = {
  previews: PlatformPreview[];
};

const IconPreviewGrid = ({ previews }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-foreground/10" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
          {t("preview.title", { defaultValue: "Preview" })}
        </p>
        <div className="h-px flex-1 bg-foreground/10" />
      </div>

      {previews.map(({ platform, icons }) => (
        <div key={platform.id} className="glass glass-highlight rounded-[2rem] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold tracking-tight">
              {t(`platforms.items.${platform.id}.label`, { defaultValue: platform.label })}
            </h3>
            <span className="rounded-full border border-white/30 bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold tabular-nums text-foreground/70">
              {icons.length} {icons.length === 1 ? "icon" : "icons"}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {icons.map(({ spec, url }) => {
              const displaySize = Math.max(Math.min(spec.size, 96), 32);
              return (
                <div
                  key={spec.name}
                  className="group flex flex-col items-center gap-2"
                >
                  <div
                    className="flex items-center justify-center rounded-xl bg-white/20 p-2 transition-colors group-hover:bg-white/30"
                    style={{ width: displaySize + 16, height: displaySize + 16 }}
                  >
                    <img
                      src={url}
                      alt={`${spec.name} (${spec.size}px)`}
                      className="rounded-lg"
                      style={{ width: displaySize, height: displaySize }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="max-w-[100px] truncate text-[10px] font-medium text-foreground/70">
                      {spec.name}
                    </p>
                    <p className="text-[10px] tabular-nums text-foreground/40">
                      {spec.size}×{spec.size}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IconPreviewGrid;
