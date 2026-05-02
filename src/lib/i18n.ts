import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", short: "EN", flag: "🇺🇸" },
  { code: "ja", label: "日本語", short: "日本語", flag: "🇯🇵" },
  // Future: { code: "es", label: "Español", short: "ES", flag: "🇪🇸" },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

const resources = {
  en: {
    translation: {
      nav: {
        generator: "Generator",
        platforms: "Platforms",
        privacy: "Privacy",
        github: "GitHub",
      },
      hero: {
        kicker: "Free public tool",
        titleLine1: "One icon.",
        titleLine2: "Every platform.",
        subtitle:
          "Drop in a 1024×1024 image and download every size you need for iPhone, iPad, Apple Watch, macOS, and Android — {{count}} icons in seconds.",
        ctaUpload: "Upload & Generate",
        ctaGenerate: "Generate {{count}} icons",
        ctaGenerating: "Generating {{current}}/{{total}}…",
        finePrint: "No signup · No ads · Runs in your browser",
      },
      dropzone: {
        title: "Drop your icon here",
        sub: "PNG · 1024×1024 recommended",
        browse: "or click to browse",
        replace: "Replace",
        warning:
          "Your image is {{w}}×{{h}}. For best results, upload a square 1024×1024 image. We'll still generate, but quality may suffer.",
      },
      name: {
        label: "File name",
        hint: "Used as the zip name and root folder.",
        placeholder: "AppIcon",
      },
      platforms: {
        title: "Platforms",
        total: "Total icons",
      },
      footer: {
        heading: "Free, forever.",
        body: "A public tool for designers and developers. No ads, no signup, no payments — every pixel processed in your browser.",
        privacy: "Privacy Policy",
        github: "Free and open source on GitHub",
      },
      lang: {
        label: "Language",
      },
      toast: {
        chooseImage: "Please choose an image file (PNG recommended).",
        loadFail: "Could not load that image.",
        selectPlatform: "Select at least one platform.",
        generated: "Generated {{count}} icons!",
        genFail: "Something went wrong while generating.",
      },
      privacy: {
        back: "Back to generator",
        kicker: "Privacy Policy",
        title: "Your icons stay <1>on your device</1>.",
        updated: "Last updated: May 2, 2026",
        chips: {
          noSignup: "No signup",
          noSignupSub: "No accounts, ever.",
          onDevice: "100% on-device",
          onDeviceSub: "Images never leave your browser.",
          noTracking: "No tracking",
          noTrackingSub: "No ads, no analytics on your files.",
        },
        sections: {
          noSignupTitle: "No signup required",
          noSignupBody:
            "The App Icon Generator is a free, public tool. You don't need to create an account, provide an email address, or share any personal information to use it. There are no logins, no profiles, and no paywalls — just open the page and start generating.",
          handlingTitle: "How your uploaded images are handled",
          handlingBody:
            "Every image you drop or select is processed entirely inside your web browser using the HTML Canvas API. Your file is never uploaded to a server, never sent to a third party, and never stored anywhere outside the current browser tab.",
          bullets: [
            "Resizing happens locally on your device's CPU/GPU.",
            "The generated ZIP is built in-memory and downloaded directly to you.",
            "Closing or refreshing the tab erases everything from memory.",
            "We don't keep copies, thumbnails, or logs of your icons.",
          ],
          dontCollectTitle: "What we don't collect",
          dontCollectBody:
            "We don't run advertising trackers, behavioral analytics on your uploads, or fingerprinting scripts. We don't sell data because we don't collect it in the first place.",
          cookiesTitle: "Cookies and local storage",
          cookiesBody:
            "The generator itself does not set tracking cookies. Your browser may keep small technical entries needed to render the page, but none of them contain your uploaded images or identify you personally.",
          hostingTitle: "Hosting",
          hostingBody:
            "The site is served as static files. Standard server access logs (such as IP address and request time) may be recorded by the hosting provider for reliability and abuse prevention. These logs do not include the contents of any image you process.",
          changesTitle: "Changes to this policy",
          changesBody:
            "If this policy ever changes, the \"Last updated\" date above will change too. The core promise — no signup, no uploads, no tracking — won't.",
        },
        backShort: "← Back to the generator",
      },
    },
  },
  ja: {
    translation: {
      nav: {
        generator: "ジェネレーター",
        platforms: "プラットフォーム",
        privacy: "プライバシー",
        github: "GitHubで見る",
      },
      hero: {
        kicker: "無料の公開ツール",
        titleLine1: "ひとつのアイコンを、",
        titleLine2: "すべてのプラットフォームへ。",
        subtitle:
          "1024×1024 の画像をドロップするだけで、iPhone・iPad・Apple Watch・macOS・Android に必要なすべてのサイズ（{{count}} 個）を数秒でダウンロードできます。",
        ctaUpload: "アップロードして生成",
        ctaGenerate: "{{count}} 個のアイコンを生成",
        ctaGenerating: "生成中 {{current}}/{{total}}…",
        finePrint: "登録不要・広告なし・ブラウザ内で完結",
      },
      dropzone: {
        title: "ここにアイコンをドロップ",
        sub: "PNG・1024×1024 推奨",
        browse: "またはクリックして選択",
        replace: "差し替え",
        warning:
          "画像サイズは {{w}}×{{h}} です。最良の結果を得るには 1024×1024 の正方形画像を使用してください。生成は可能ですが、品質が低下する場合があります。",
      },
      name: {
        label: "ファイル名",
        hint: "ZIP 名とルートフォルダー名に使用されます。",
        placeholder: "AppIcon",
      },
      platforms: {
        title: "プラットフォーム",
        total: "アイコン合計",
      },
      footer: {
        heading: "ずっと無料。",
        body: "デザイナーと開発者のための公開ツールです。広告・登録・支払いは一切なし — すべてブラウザ内で処理されます。",
        privacy: "プライバシーポリシー",
        github: "GitHub でオープンソース公開中",
      },
      lang: {
        label: "言語",
      },
      toast: {
        chooseImage: "画像ファイル(PNG 推奨)を選択してください。",
        loadFail: "画像を読み込めませんでした。",
        selectPlatform: "少なくとも 1 つのプラットフォームを選択してください。",
        generated: "{{count}} 個のアイコンを生成しました！",
        genFail: "生成中にエラーが発生しました。",
      },
      privacy: {
        back: "ジェネレーターに戻る",
        kicker: "プライバシーポリシー",
        title: "あなたのアイコンは<1>端末内に</1>留まります。",
        updated: "最終更新日: 2026年5月2日",
        chips: {
          noSignup: "登録不要",
          noSignupSub: "アカウントは一切不要です。",
          onDevice: "100% 端末内処理",
          onDeviceSub: "画像はブラウザの外に出ません。",
          noTracking: "追跡なし",
          noTrackingSub: "広告・解析は一切ありません。",
        },
        sections: {
          noSignupTitle: "登録は不要です",
          noSignupBody:
            "App Icon Generator は無料の公開ツールです。アカウント作成やメールアドレスの登録、個人情報の提供は一切必要ありません。ログインもプロフィールも有料機能もなく、ページを開くだけで使い始められます。",
          handlingTitle: "アップロードされた画像の扱いについて",
          handlingBody:
            "ドロップまたは選択した画像はすべて、HTML Canvas API を使ってブラウザ内で完結して処理されます。ファイルがサーバーに送信されたり、第三者に共有されたり、現在のブラウザタブの外に保存されることは一切ありません。",
          bullets: [
            "リサイズは端末の CPU/GPU 上でローカルに実行されます。",
            "生成された ZIP はメモリ上で組み立てられ、直接ダウンロードされます。",
            "タブを閉じたり再読み込みすると、メモリ上のデータは消去されます。",
            "アイコンのコピー・サムネイル・ログを保持しません。",
          ],
          dontCollectTitle: "収集しない情報",
          dontCollectBody:
            "広告トラッカー、アップロードに対する行動分析、フィンガープリンティングは一切使用していません。データを売ることもありません — そもそも収集していないからです。",
          cookiesTitle: "Cookie とローカルストレージ",
          cookiesBody:
            "本ツール自体は追跡用 Cookie を設定しません。ブラウザがページ表示に必要な技術的データを保持する場合がありますが、その中にアップロードした画像や個人を特定する情報は含まれません。",
          hostingTitle: "ホスティングについて",
          hostingBody:
            "このサイトは静的ファイルとして配信されます。信頼性向上や不正利用防止のため、ホスティング提供元が標準的なアクセスログ(IP アドレス・リクエスト時刻など)を記録する場合があります。これらのログにあなたが処理した画像の内容は含まれません。",
          changesTitle: "本ポリシーの変更",
          changesBody:
            "本ポリシーが変更された場合は、上部の「最終更新日」も更新されます。ただし「登録不要・アップロードなし・追跡なし」という核心の約束は変わりません。",
        },
        backShort: "← ジェネレーターに戻る",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
