import React, { useState, useEffect } from 'react';
import { 
  Download, 
  X, 
  Share, 
  PlusSquare, 
  Smartphone, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone) {
      return;
    }

    // Check if user dismissed prompt recently
    const dismissedUntil = localStorage.getItem('godirect_pwa_dismissed');
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
      return;
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    if (isAppleDevice && !isStandalone) {
      setIsIOS(true);
      const timer = setTimeout(() => setShowPrompt(true), 3500);
      return () => clearTimeout(timer);
    }

    // Android / Chrome beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShowPrompt(true), 2500);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSInstructions(false);
    // Dismiss for 7 days
    localStorage.setItem('godirect_pwa_dismissed', (Date.now() + 7 * 86400000).toString());
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-bounce-in font-['Host_Grotesk']">
      <div className="bg-[#0B2545] text-white border border-[#CC9955]/30 rounded-3xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#018F8B]/30 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        {!showIOSInstructions ? (
          <div className="flex items-start gap-3.5 pr-6">
            <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-md flex-shrink-0 flex items-center justify-center">
              <img src="/images/logo.png" alt="GoDirect App" className="w-full h-full object-contain" />
            </div>

            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xs text-white">Install GoDirect App</span>
                <span className="bg-[#CC9955] text-slate-950 font-black text-[9px] px-1.5 py-0.2 rounded-full uppercase">
                  Mobile App
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Access luxury direct properties, 24h escrow, and live host messaging right from your home screen.
              </p>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={handleInstallClick}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#018F8B] to-[#0B2545] hover:opacity-90 text-white font-bold text-xs shadow-sm transition-all active:scale-95 border border-teal-400/30"
                >
                  <Download className="w-3.5 h-3.5 text-[#CC9955]" />
                  <span>{isIOS ? 'How to Install' : 'Add to Home Screen'}</span>
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-2.5 py-2 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-semibold"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* iOS Step-by-Step Instructions */
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2 text-xs font-black text-[#CC9955]">
              <Smartphone className="w-4 h-4" />
              <span>Install on iPhone / iPad</span>
            </div>

            <div className="space-y-2 text-[11px] text-slate-200 bg-white/5 p-3 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#018F8B] text-white flex items-center justify-center font-bold text-[10px]">1</span>
                <span>Tap the <strong className="text-white inline-flex items-center gap-1"><Share className="w-3.5 h-3.5 text-[#018F8B]" /> Share</strong> button in Safari toolbar.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#018F8B] text-white flex items-center justify-center font-bold text-[10px]">2</span>
                <span>Scroll down and select <strong className="text-white inline-flex items-center gap-1"><PlusSquare className="w-3.5 h-3.5 text-[#CC9955]" /> Add to Home Screen</strong>.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#018F8B] text-white flex items-center justify-center font-bold text-[10px]">3</span>
                <span>Tap <strong className="text-white">Add</strong> in the top-right corner to launch GoDirect!</span>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors"
            >
              Got it!
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
