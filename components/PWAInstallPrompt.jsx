
"use client";
import { useEffect, useState } from "react";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
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
        } else {
          console.log("User dismissed PWA install");
        }
        setDeferredPrompt(null);
        setShowPrompt(false);
      });
    }
  };

  return (
    <div className={`pwa-banner ${showPrompt ? "show" : ""}`}>
                <h2 className="mb-8 px-2 text-xl sm:text-xl tracking-tight font-bold text-gray-900 dark:text-white">
            Install our{" "}
            <span
              className={
                "bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-300 text-transparent"
              }
            >
              App {" "}
            </span>
             for a Better{" "}
            <span
              className={
                "bg-clip-text bg-gr-primary text-transparent"
              }
            >
               Experience
            </span>{" "}
          </h2>
      <div className="pwa-buttons">
        <button onClick={handleInstall} className="install-btn">Install</button>
        <button onClick={() => setShowPrompt(false)} className="dismiss-btn md:hidden">Dismiss</button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
