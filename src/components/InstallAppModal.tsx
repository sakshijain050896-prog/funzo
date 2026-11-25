import React, { useState } from 'react';
import { X, Smartphone, Apple, CheckCircle2, Share2, PlusSquare, Download, ShieldCheck, Sparkles } from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  canInstallPwa?: boolean;
  onInstallPwa?: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  canInstallPwa = false,
  onInstallPwa,
}) => {
  const [activeTab, setActiveTab] = useState<'ios' | 'android' | 'store'>('ios');
  const [apkDownloading, setApkDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownloadApk = () => {
    setApkDownloading(true);
    // Trigger download if available or provide link
    const link = document.createElement('a');
    link.href = '/funzo.apk';
    link.download = 'Funzo.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setApkDownloading(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 animate-fade-in font-['Fredoka']">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#181d2f] border-4 border-black p-4 sm:p-6 shadow-[8px_8px_0_#000] max-h-[90vh] flex flex-col text-slate-900 dark:text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-xl shadow-md border-2 border-black">
              📲
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-wide leading-tight flex items-center gap-1.5">
                Install Funzo App
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-extrabold uppercase border border-emerald-300">
                  Ready
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                Run as a full-screen mobile app with home screen icon
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Tabs */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#22283a] border-2 border-slate-200 dark:border-slate-800 mb-4 shrink-0">
          <button
            onClick={() => setActiveTab('ios')}
            className={`flex items-center justify-center gap-1.5 py-2 px-1 sm:px-3 rounded-xl text-xs font-black transition-all ${
              activeTab === 'ios'
                ? 'bg-white dark:bg-[#181d2f] text-slate-900 dark:text-white shadow-sm border-2 border-black dark:border-slate-600'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Apple className="w-4 h-4 fill-current shrink-0" />
            <span className="truncate">iPhone / iPad</span>
          </button>

          <button
            onClick={() => setActiveTab('android')}
            className={`flex items-center justify-center gap-1.5 py-2 px-1 sm:px-3 rounded-xl text-xs font-black transition-all ${
              activeTab === 'android'
                ? 'bg-white dark:bg-[#181d2f] text-slate-900 dark:text-white shadow-sm border-2 border-black dark:border-slate-600'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4 shrink-0 text-emerald-500" />
            <span className="truncate">Android</span>
          </button>

          <button
            onClick={() => setActiveTab('store')}
            className={`flex items-center justify-center gap-1.5 py-2 px-1 sm:px-3 rounded-xl text-xs font-black transition-all ${
              activeTab === 'store'
                ? 'bg-white dark:bg-[#181d2f] text-slate-900 dark:text-white shadow-sm border-2 border-black dark:border-slate-600'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0 text-amber-500" />
            <span className="truncate">App Stores</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-3 text-left">
          {/* ---------------- TAB 1: iPHONE / iOS ---------------- */}
          {activeTab === 'ios' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800/50 text-xs">
                <span className="font-black text-amber-900 dark:text-amber-200 block mb-0.5">
                  💡 Why is there no "Download APK" for iPhone?
                </span>
                <span className="text-amber-800 dark:text-amber-300">
                  Apple strictly prohibits installing APK files on iPhones. Instead, Apple provides the <strong>"Add to Home Screen" (PWA)</strong> feature, which turns Funzo into a standalone full-screen app with its own icon on your iPhone home screen!
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#22283a] border border-slate-200 dark:border-slate-800">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 dark:text-white">
                      Open in Safari
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Open <strong className="text-pink-600 dark:text-pink-400">https://funzo-ten.vercel.app</strong> using the <strong>Safari</strong> browser on your iPhone.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#22283a] border border-slate-200 dark:border-slate-800">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      Tap the Share Button
                      <Share2 className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Tap the <strong>Share</strong> icon (the square with an arrow pointing up <span className="font-bold">⎋ / [↑]</span>) at the bottom center of Safari.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#22283a] border border-slate-200 dark:border-slate-800">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      Select "Add to Home Screen"
                      <PlusSquare className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Scroll down the menu list and tap <strong className="text-slate-900 dark:text-white">"Add to Home Screen"</strong> with the plus icon.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#22283a] border border-slate-200 dark:border-slate-800">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div>
                    <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                      Tap "Add" in Top-Right Corner
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Tap <strong>Add</strong> at the top right. Funzo will immediately appear on your iPhone home screen!
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>
                  Once opened from your iPhone home screen, it launches in <strong>fullscreen without any Safari address bar</strong>, exactly like an App Store app!
                </span>
              </div>
            </div>
          )}

          {/* ---------------- TAB 2: ANDROID ---------------- */}
          {activeTab === 'android' && (
            <div className="space-y-3">
              {/* Option A: 1-Tap PWA Install */}
              <div className="p-4 rounded-2xl bg-gradient-to-tr from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-2 border-amber-300 dark:border-amber-700/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    ⚡ Option 1: 1-Tap Quick Install (Chrome)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-800 text-amber-950 dark:text-white font-black">
                    Fastest
                  </span>
                </div>
                <p className="text-[11px] text-amber-800 dark:text-amber-300 mb-3">
                  Installs Funzo straight onto your phone screen with 0 MB download size and offline caching.
                </p>
                {canInstallPwa && onInstallPwa ? (
                  <button
                    onClick={() => {
                      onInstallPwa();
                      onClose();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black text-xs shadow-md border-b-4 border-orange-700 active:translate-y-0.5 transition flex items-center justify-center gap-2"
                  >
                    <span>📲</span>
                    <span>Tap to Install Funzo on Phone Now</span>
                  </button>
                ) : (
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 bg-white dark:bg-[#181d2f] p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    In Chrome on Android: Tap the <strong>3 dots (⋮)</strong> at top right &gt; tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                  </div>
                )}
              </div>

              {/* Option B: Direct Android APK */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#22283a] border-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    🤖 Option 2: Native Android APK (.apk)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-black">
                    Capacitor Native
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                  The standalone Android installation file. Sideload directly to test physical native capabilities.
                </p>
                <button
                  onClick={handleDownloadApk}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-black text-xs shadow-md border-b-4 border-slate-700 dark:border-slate-300 active:translate-y-0.5 transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{apkDownloading ? 'Starting Download...' : 'Download Funzo Android APK (.apk)'}</span>
                </button>
                <div className="mt-2 text-[10px] text-slate-400 dark:text-slate-500">
                  Tip: On Android, if prompted, allow "Install from this source" when opening the downloaded .apk.
                </div>
              </div>
            </div>
          )}

          {/* ---------------- TAB 3: APP STORE / PLAY STORE ROADMAP ---------------- */}
          {activeTab === 'store' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border-2 border-indigo-200 dark:border-indigo-800/50 text-xs">
                <span className="font-black text-indigo-900 dark:text-indigo-200 block mb-0.5">
                  🚀 Publishing to Official Stores
                </span>
                <span className="text-indigo-800 dark:text-indigo-300">
                  You do <strong>NOT</strong> need to pay or publish to the App Store just to test Funzo on your phone! Use Tabs 1 & 2 above to test immediately. When you are ready to publish publicly for everyone, here is what is needed:
                </span>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#22283a] border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                      Google Play Store
                    </span>
                    <span className="text-[10px] font-black text-slate-500">$25 One-Time</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    The native Android project is already configured in <code className="text-pink-600 bg-pink-50 dark:bg-pink-950/50 px-1 rounded">android/</code>. We generate the <code className="text-pink-600 bg-pink-50 dark:bg-pink-950/50 px-1 rounded">.aab</code> bundle file and submit it to your Google Play Developer Console.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#22283a] border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Apple className="w-3.5 h-3.5 fill-current" />
                      Apple App Store
                    </span>
                    <span className="text-[10px] font-black text-slate-500">$99/Year</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Apple requires an active Apple Developer Program membership. We generate the iOS Xcode project via Capacitor (`npx cap add ios`), compile it via Xcode (or cloud CI like Codemagic / GitHub Actions), and submit it to App Store Connect.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t-2 border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Safe & Verified Web App</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-black text-slate-800 dark:text-white transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
