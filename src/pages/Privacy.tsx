import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, UserX, Cpu } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background bg-gradient-mesh">
      <div className="container max-w-3xl py-12 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to generator
        </Link>

        <header className="mt-8 mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Shield className="h-3.5 w-3.5 text-primary" />
            Privacy Policy
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Your icons stay <span className="text-gradient">on your device</span>.
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Last updated: May 2, 2026
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-4">
            <UserX className="h-5 w-5 text-primary" />
            <p className="mt-2 text-sm font-semibold">No signup</p>
            <p className="mt-0.5 text-xs text-muted-foreground">No accounts, ever.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <Cpu className="h-5 w-5 text-primary" />
            <p className="mt-2 text-sm font-semibold">100% on-device</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Images never leave your browser.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <Lock className="h-5 w-5 text-primary" />
            <p className="mt-2 text-sm font-semibold">No tracking</p>
            <p className="mt-0.5 text-xs text-muted-foreground">No ads, no analytics on your files.</p>
          </div>
        </div>

        <article className="prose prose-sm mt-10 max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-xl font-semibold">No signup required</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The App Icon Generator is a free, public tool. You don't need to create an
              account, provide an email address, or share any personal information to use it.
              There are no logins, no profiles, and no paywalls — just open the page and start
              generating.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">How your uploaded images are handled</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Every image you drop or select is processed entirely inside your web browser
              using the HTML Canvas API. Your file is never uploaded to a server, never sent
              to a third party, and never stored anywhere outside the current browser tab.
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>Resizing happens locally on your device's CPU/GPU.</li>
              <li>The generated ZIP is built in-memory and downloaded directly to you.</li>
              <li>Closing or refreshing the tab erases everything from memory.</li>
              <li>We don't keep copies, thumbnails, or logs of your icons.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">What we don't collect</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We don't run advertising trackers, behavioral analytics on your uploads, or
              fingerprinting scripts. We don't sell data because we don't collect it in the
              first place.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Cookies and local storage</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The generator itself does not set tracking cookies. Your browser may keep small
              technical entries needed to render the page, but none of them contain your
              uploaded images or identify you personally.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Hosting</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The site is served as static files. Standard server access logs (such as IP
              address and request time) may be recorded by the hosting provider for
              reliability and abuse prevention. These logs do not include the contents of any
              image you process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Changes to this policy</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              If this policy ever changes, the "Last updated" date above will change too. The
              core promise — no signup, no uploads, no tracking — won't.
            </p>
          </section>
        </article>

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          <Link to="/" className="underline-offset-4 hover:text-foreground hover:underline">
            ← Back to the generator
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Privacy;
