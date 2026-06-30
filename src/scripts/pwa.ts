interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferredInstall: BeforeInstallPromptEvent | null = null;

export function bindInstallButtons() {
  document.querySelectorAll<HTMLButtonElement>("[data-pwa-install-btn]").forEach((btn) => {
    if (btn.dataset.bound === "true") return;
    btn.dataset.bound = "true";
    btn.addEventListener("click", () => {
      void promptInstall();
    });
  });
}

export function initPwa() {
  if (!("serviceWorker" in navigator)) return;

  if (!window.__artPwaInit) {
    window.__artPwaInit = true;
    window.addEventListener("load", () => {
      void navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.warn("Service worker registration failed:", error);
      });
    });

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      deferredInstall = event as BeforeInstallPromptEvent;
      document.querySelectorAll<HTMLElement>("[data-pwa-install]").forEach((el) => {
        el.hidden = false;
      });
    });
  }

  bindInstallButtons();
}

declare global {
  interface Window {
    __artPwaInit?: boolean;
  }
}

export async function promptInstall(): Promise<boolean> {
  if (!deferredInstall) return false;
  await deferredInstall.prompt();
  const { outcome } = await deferredInstall.userChoice;
  if (outcome === "accepted") {
    deferredInstall = null;
    document.querySelectorAll<HTMLElement>("[data-pwa-install]").forEach((el) => {
      el.hidden = true;
    });
    return true;
  }
  return false;
}

export function canInstallPwa(): boolean {
  return deferredInstall !== null;
}
