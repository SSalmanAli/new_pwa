"use client"
import { useEffect, useState } from "react";

const PwaToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault(); // Prevent default install banner
      setDeferredPrompt(event);
      setShowToast(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("PWA installed");
      }
      setShowToast(false);
      setDeferredPrompt(null);
    }
  };

  return showToast ? (
    <div className="pwa-toast">
      <p>Install our app for a better experience!</p>
      <button onClick={handleInstall}>Install</button>
      <button onClick={() => setShowToast(false)}>Dismiss</button>
    </div>
  ) : null;
};

export default PwaToast;
