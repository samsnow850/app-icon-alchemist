// All sizes are in pixels (final output). For Apple, "size@scale" => pixels = size * scale.

export type IconSpec = {
  name: string; // file name without extension
  size: number; // pixel size (square)
  idiom?: string; // for reference
};

export type Platform = {
  id: string;
  label: string;
  description: string;
  count: number;
  folder: string;
  icons: IconSpec[];
};

export const PLATFORMS: Platform[] = [
  {
    id: "iphone",
    label: "iPhone",
    description: "iOS app icons for iPhone (notification, settings, spotlight, app, marketing)",
    count: 11,
    folder: "iPhone",
    icons: [
      { name: "Icon-20@2x", size: 40, idiom: "iphone-notification" },
      { name: "Icon-20@3x", size: 60, idiom: "iphone-notification" },
      { name: "Icon-29@2x", size: 58, idiom: "iphone-settings" },
      { name: "Icon-29@3x", size: 87, idiom: "iphone-settings" },
      { name: "Icon-40@2x", size: 80, idiom: "iphone-spotlight" },
      { name: "Icon-40@3x", size: 120, idiom: "iphone-spotlight" },
      { name: "Icon-60@2x", size: 120, idiom: "iphone-app" },
      { name: "Icon-60@3x", size: 180, idiom: "iphone-app" },
      { name: "Icon-1024", size: 1024, idiom: "ios-marketing" },
      { name: "Icon-76@2x", size: 152, idiom: "iphone-legacy" },
      { name: "Icon-83.5@2x", size: 167, idiom: "iphone-legacy" },
    ],
  },
  {
    id: "ipad",
    label: "iPad",
    description: "iPadOS app icons (notification, settings, spotlight, app, Pro, marketing)",
    count: 13,
    folder: "iPad",
    icons: [
      { name: "Icon-20", size: 20, idiom: "ipad-notification" },
      { name: "Icon-20@2x", size: 40, idiom: "ipad-notification" },
      { name: "Icon-29", size: 29, idiom: "ipad-settings" },
      { name: "Icon-29@2x", size: 58, idiom: "ipad-settings" },
      { name: "Icon-40", size: 40, idiom: "ipad-spotlight" },
      { name: "Icon-40@2x", size: 80, idiom: "ipad-spotlight" },
      { name: "Icon-50", size: 50, idiom: "ipad-legacy" },
      { name: "Icon-50@2x", size: 100, idiom: "ipad-legacy" },
      { name: "Icon-72", size: 72, idiom: "ipad-legacy" },
      { name: "Icon-72@2x", size: 144, idiom: "ipad-legacy" },
      { name: "Icon-76", size: 76, idiom: "ipad-app" },
      { name: "Icon-76@2x", size: 152, idiom: "ipad-app" },
      { name: "Icon-83.5@2x", size: 167, idiom: "ipad-pro" },
    ],
  },
  {
    id: "watchos",
    label: "watchOS",
    description: "Apple Watch icons (notification, settings, home screen, short look, marketing)",
    count: 8,
    folder: "WatchOS",
    icons: [
      { name: "Icon-24@2x", size: 48, idiom: "watch-notification-38mm" },
      { name: "Icon-27.5@2x", size: 55, idiom: "watch-notification-42mm" },
      { name: "Icon-29@2x", size: 58, idiom: "watch-companion-settings" },
      { name: "Icon-29@3x", size: 87, idiom: "watch-companion-settings" },
      { name: "Icon-40@2x", size: 80, idiom: "watch-home-38mm" },
      { name: "Icon-44@2x", size: 88, idiom: "watch-home-40mm" },
      { name: "Icon-50@2x", size: 100, idiom: "watch-home-44mm" },
      { name: "Icon-1024", size: 1024, idiom: "watch-marketing" },
    ],
  },
  {
    id: "macos",
    label: "macOS",
    description: "Mac app icons (16, 32, 128, 256, 512 @1x and @2x, plus 1024 marketing)",
    count: 11,
    folder: "macOS",
    icons: [
      { name: "icon_16x16", size: 16 },
      { name: "icon_16x16@2x", size: 32 },
      { name: "icon_32x32", size: 32 },
      { name: "icon_32x32@2x", size: 64 },
      { name: "icon_128x128", size: 128 },
      { name: "icon_128x128@2x", size: 256 },
      { name: "icon_256x256", size: 256 },
      { name: "icon_256x256@2x", size: 512 },
      { name: "icon_512x512", size: 512 },
      { name: "icon_512x512@2x", size: 1024 },
      { name: "icon_1024x1024", size: 1024 },
    ],
  },
  {
    id: "android",
    label: "Android",
    description: "Launcher icons for hdpi, xhdpi, xxhdpi, xxxhdpi densities",
    count: 4,
    folder: "Android",
    icons: [
      { name: "mipmap-hdpi/ic_launcher", size: 72 },
      { name: "mipmap-xhdpi/ic_launcher", size: 96 },
      { name: "mipmap-xxhdpi/ic_launcher", size: 144 },
      { name: "mipmap-xxxhdpi/ic_launcher", size: 192 },
    ],
  },
];

export const TOTAL_ICONS = PLATFORMS.reduce((sum, p) => sum + p.count, 0);
