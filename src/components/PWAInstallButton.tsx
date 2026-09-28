import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'header' | 'button' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'button' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    if (variant === 'banner') {
      return (
        <div className="mx-4 my-2 p-3.5 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900 text-white flex items-center justify-between shadow-xs border border-amber-600/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
              <Smartphone className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-wide">Install KAYASHUNYA App</div>
              <div className="text-[10px] text-amber-200/90">Add to home screen for full-screen standalone app</div>
            </div>
          </div>
          <button
            onClick={install}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            Install
          </button>
        </div>
      );
    }

    if (variant === 'header') {
      return (
        <button
          onClick={install}
          title="Install on your Android Phone"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Install App</span>
        </button>
      );
    }

    return (
      <button
        onClick={install}
        className="flex items-center gap-2 rounded-xl bg-amber-700 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-amber-800 transition"
      >
        <Download className="w-4 h-4" />
        <span>Install on Phone</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 px-2.5 py-1 text-xs font-medium text-amber-300 hover:bg-amber-500/10"
        >
          <Download className="w-3 h-3" />
          <span>Install on iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-2xl bg-stone-900 border border-stone-700 p-5 shadow-2xl text-stone-100">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="text-sm font-bold text-white">Install on iPhone / iPad</h3>
                <button onClick={() => setShowIOSGuide(false)} className="text-stone-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-3 text-xs text-stone-300 leading-relaxed">
                1. Tap the <strong>Share</strong> icon in the Safari toolbar.<br />
                2. Scroll down and tap <strong>Add to Home Screen</strong>.<br />
                3. The Kayashunya icon will appear on your phone home screen!
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full rounded-xl bg-amber-600 py-2 text-xs font-semibold text-white hover:bg-amber-500"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  const [showAndroidGuide, setShowAndroidGuide] = useState(false);

  // Fallback info button when browser prompt hasn't fired yet
  return (
    <>
      <button
        onClick={() => setShowAndroidGuide(true)}
        className={
          variant === 'header'
            ? 'flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer'
            : variant === 'banner'
            ? 'mx-4 my-2 p-3.5 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900 text-white flex items-center justify-between shadow-xs border border-amber-600/30'
            : 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 hover:border-amber-600 text-xs font-medium text-stone-700 hover:text-amber-800 transition-colors cursor-pointer'
        }
        title="How to install on Android"
      >
        <Smartphone className="w-3.5 h-3.5 text-amber-300" />
        <span>Install App</span>
      </button>

      {showAndroidGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-stone-900 border border-stone-700 p-5 shadow-2xl text-stone-100">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>Install on Android Phone</span>
              </h3>
              <button onClick={() => setShowAndroidGuide(false)} className="text-stone-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3 text-xs text-stone-300 space-y-2 leading-relaxed">
              <p>1. Open this website URL in <strong>Google Chrome</strong> on your phone.</p>
              <p>2. Tap the <strong>3 dots (⋮)</strong> menu in Chrome's top-right corner.</p>
              <p>3. Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</p>
              <p className="text-amber-300 pt-1 font-medium">✨ The app installs directly onto your phone launcher with offline support!</p>
            </div>
            <button
              onClick={() => setShowAndroidGuide(false)}
              className="mt-4 w-full rounded-xl bg-amber-600 py-2 text-xs font-semibold text-white hover:bg-amber-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
