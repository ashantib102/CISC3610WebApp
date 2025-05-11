export function registerSW() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}

export function isPWAInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check if the app is in standalone mode
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  
  // Check if it's iOS and in standalone mode
  const isIOSStandalone = window.navigator.userAgent.includes('iPhone') || 
                         window.navigator.userAgent.includes('iPad') ? 
                         (window as any).navigator.standalone : false;
  
  // Check if launched from Android home screen
  const isAndroidInstalled = document.referrer.includes('android-app://');
  
  return isStandalone || isIOSStandalone || isAndroidInstalled;
}
