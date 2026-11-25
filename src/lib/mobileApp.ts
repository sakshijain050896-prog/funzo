import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

// Global install prompt event reference
let deferredInstallPrompt: any = null;
let installPromptListeners: Array<(canInstall: boolean) => void> = [];

export function isNativeMobile(): boolean {
  return Capacitor.isNativePlatform();
}

export function isIOS(): boolean {
  return Capacitor.getPlatform() === 'ios';
}

export function isAndroid(): boolean {
  return Capacitor.getPlatform() === 'android';
}

// Trigger tactile haptic feedback (Works in Capacitor native + web navigator.vibrate)
export async function triggerHaptic(style: ImpactStyle = ImpactStyle.Light) {
  try {
    if (Capacitor.isPluginAvailable('Haptics')) {
      await Haptics.impact({ style });
    } else if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(12);
    }
  } catch {}
}

// Hardware Back Button Registry for Android
type BackHandler = () => boolean; // return true if handled, false to pass through
const backHandlers: BackHandler[] = [];

export function registerBackButtonHandler(handler: BackHandler): () => void {
  backHandlers.push(handler);
  return () => {
    const idx = backHandlers.indexOf(handler);
    if (idx !== -1) backHandlers.splice(idx, 1);
  };
}

// Initialize Mobile App Features (Capacitor + PWA)
export function initMobileApp(onCloseGameOrModal?: () => boolean) {
  if (typeof window === 'undefined') return;

  // 1. Native Capacitor initialization
  if (Capacitor.isNativePlatform()) {
    // Configure Status Bar
    try {
      StatusBar.setStyle({ style: Style.Dark });
      if (Capacitor.getPlatform() === 'android') {
        StatusBar.setBackgroundColor({ color: '#0a0b14' });
        StatusBar.setOverlaysWebView({ overlay: false });
      }
    } catch (e) {
      console.log('StatusBar not available', e);
    }

    // Configure Android Hardware Back Button
    try {
      CapApp.addListener('backButton', ({ canGoBack }) => {
        // Run registered handlers from newest to oldest
        for (let i = backHandlers.length - 1; i >= 0; i--) {
          const handled = backHandlers[i]();
          if (handled) return;
        }

        if (onCloseGameOrModal && onCloseGameOrModal()) {
          return;
        }

        if (canGoBack) {
          window.history.back();
        } else {
          CapApp.minimizeApp();
        }
      });
    } catch (e) {
      console.log('CapApp back button error', e);
    }
  }

  // 2. Progressive Web App (PWA) Service Worker Registration
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('Funzo PWA Service Worker registered:', reg.scope);
        })
        .catch((err) => {
          console.log('PWA Service Worker registration error:', err);
        });
    });
  }

  // 3. Capture PWA Install Prompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    installPromptListeners.forEach((listener) => listener(true));
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    installPromptListeners.forEach((listener) => listener(false));
    console.log('Funzo Mobile App successfully installed on device!');
  });
}

// Subscribe to PWA install availability
export function subscribeToInstallPrompt(callback: (canInstall: boolean) => void): () => void {
  installPromptListeners.push(callback);
  callback(deferredInstallPrompt !== null);
  return () => {
    installPromptListeners = installPromptListeners.filter((l) => l !== callback);
  };
}

// Trigger PWA Install Dialog
export async function promptInstallApp(): Promise<boolean> {
  if (!deferredInstallPrompt) {
    return false;
  }
  try {
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installPromptListeners.forEach((listener) => listener(false));
    return outcome === 'accepted';
  } catch {
    return false;
  }
}
