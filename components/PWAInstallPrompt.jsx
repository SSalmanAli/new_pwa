"use client";
import { useEffect, useState } from "react";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    // Detect if PWA is already installed
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    // Handle Android PWA prompt
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted PWA install");
        }
        setDeferredPrompt(null);
        setShowPrompt(false);
      });
    }
  };

  return (
    <>
      {/* Android: Auto-popup install toast */}
      {!isStandalone && !isIOS && showPrompt && (
        <div
          className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex items-center justify-between transition-transform translate-y-0"
          style={{ transition: "transform 0.3s ease-in-out" }}
        >
          <p className="text-sm">Install our app for a better experience!</p>
          <div>
            <button onClick={handleInstall} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
              Install
            </button>
            <button onClick={() => setShowPrompt(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* iOS: Custom Install Guide */}
      {!isStandalone && isIOS && (
        <div
          className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex items-center justify-between transition-transform translate-y-0"
          style={{ transition: "transform 0.3s ease-in-out" }}
        >
          <p className="text-sm">
            Install this app: Tap <span className="text-blue-400">Share</span> and select <b>"Add to Home Screen"</b>
          </p>
          <button onClick={() => setShowPrompt(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
            Dismiss
          </button>
        </div>
      )}
    </>
  );
};

export default PWAInstallPrompt;
