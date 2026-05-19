# 🎨 App Icon Alchemist

> Drop in a single 1024×1024 image and download every app icon size you need for **iPhone, iPad, Apple Watch, macOS, and Android** — in seconds, right in your browser.

<p align="center">
  <a href="https://github.com/samsnow850/app-icon-alchemist/stargazers">
    <img alt="Stars" src="https://img.shields.io/github/stars/samsnow850/app-icon-alchemist?style=flat-square">
  </a>
  <a href="https://github.com/samsnow850/app-icon-alchemist/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-blue?style=flat-square">
  </a>
  <img alt="Made with React" src="https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white">
</p>

---

## ✨ What is this?

**App Icon Alchemist** is a **100% free, public** web tool that turns a single high-resolution app icon into every size required by the major mobile and desktop platforms. No more manually exporting 47 PNGs from your design tool — upload once, get a clean ZIP back.

- 🆓 Free forever — **no signup, no ads, no payments**
- 🔒 **Runs entirely in your browser** — your image never leaves your device
- ⚡ Generates **47 icons** across 5 platforms in seconds
- 📦 Downloads as a tidy ZIP, organized per platform
- ✅ Pick only the platforms you need

---

## 🚀 Features

| Platform        | Icons | Notes                                              |
| --------------- | :---: | -------------------------------------------------- |
| 📱 iPhone       |  11   | All notification, settings, spotlight & app sizes  |
| 📱 iPad         |  13   | Including iPad Pro at 2x                           |
| ⌚ Apple Watch  |   8   | Across all watch face sizes                        |
| 💻 macOS        |  11   | 16pt → 512pt @ 1x and 2x                           |
| 🤖 Android      |   4   | mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi launcher sizes  |

Other niceties:

- Drag & drop or click to upload
- Custom file/folder naming
- Live preview of your uploaded icon
- Selectable platforms — only generate what you need
- Live progress indicator while building the ZIP

---

## 🖼️ How it works

1. **Upload** a 1024×1024 PNG (square images give the cleanest output).
2. **Choose** which platforms you want — iPhone, iPad, Watch, macOS, Android.
3. **Name** your file (used as the ZIP and root folder name).
4. **Generate** — all resizing happens locally via the HTML Canvas API.
5. **Download** your ZIP and drop the folders straight into Xcode or Android Studio.

---

## 🛠️ Tech Stack

- ⚛️ **React 18** + **TypeScript**
- ⚡ **Vite 5**
- 🎨 **Tailwind CSS** + **shadcn/ui**
- 🗂️ **JSZip** for in-browser archive creation
- 🖼️ **HTML Canvas API** for resizing

---

## 🔐 Privacy

Your uploaded image **never leaves your browser**. All resizing and ZIP creation happens locally on your device — there is no upload step, no analytics on your files, and no account required. See the in-app [Privacy Policy](./src/pages/Privacy.tsx) for details.

---

## 🤝 Contributing

Pull requests are welcome! If you spot a missing icon size, a platform spec change, or have an idea to make this nicer, please [open an issue](https://github.com/samsnow850/app-icon-alchemist/issues).

---

## 📄 License

Released under the **MIT License** — use it, fork it, ship it.

---

<p align="center">
  Made with ❤️ for designers and developers.<br/>
  <a href="https://github.com/samsnow850/app-icon-alchemist"><strong>⭐ Free and open source on GitHub</strong></a>
</p>
