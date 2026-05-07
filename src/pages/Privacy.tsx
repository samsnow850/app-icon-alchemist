import { Shield, Lock, UserX, Cpu } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import SiteHeader from "@/components/SiteHeader";

const Privacy = () => {
  const { t } = useTranslation();

  const bullets = t("privacy.sections.bullets", { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-background bg-gradient-mesh">
      <SiteHeader />
      <div className="container max-w-3xl py-12 md:py-20">

        <header className="mt-8 mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Shield className="h-3.5 w-3.5 text-primary" />
            {t("privacy.kicker")}
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            <Trans
              i18nKey="privacy.title"
              components={{ 1: <span className="text-gradient" /> }}
            />
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {t("privacy.updated")}
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-4">
            <UserX className="h-5 w-5 text-primary" />
            <p className="mt-2 text-sm font-semibold">{t("privacy.chips.noSignup")}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{t("privacy.chips.noSignupSub")}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <Cpu className="h-5 w-5 text-primary" />
            <p className="mt-2 text-sm font-semibold">{t("privacy.chips.onDevice")}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{t("privacy.chips.onDeviceSub")}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <Lock className="h-5 w-5 text-primary" />
            <p className="mt-2 text-sm font-semibold">{t("privacy.chips.noTracking")}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{t("privacy.chips.noTrackingSub")}</p>
          </div>
        </div>

        <article className="prose prose-sm mt-10 max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-semibold">{t("privacy.sections.noSignupTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("privacy.sections.noSignupBody")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">{t("privacy.sections.handlingTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("privacy.sections.handlingBody")}
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
              {bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">{t("privacy.sections.dontCollectTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("privacy.sections.dontCollectBody")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">{t("privacy.sections.cookiesTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("privacy.sections.cookiesBody")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">{t("privacy.sections.hostingTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("privacy.sections.hostingBody")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">{t("privacy.sections.changesTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("privacy.sections.changesBody")}
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Privacy;
