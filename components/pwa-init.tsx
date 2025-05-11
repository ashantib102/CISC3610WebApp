"use client";

import { useEffect } from "react";

// Define the BeforeInstallPromptEvent interface
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Extend the Window interface
declare global {
  interface Window {
    deferredPrompt: BeforeInstallPromptEvent | null;
  }
}

export default function PWAInit() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('Service Worker registration successful:', registration.scope);
          
          // Listen for the beforeinstallprompt event
          window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 76+ from automatically showing the prompt
            e.preventDefault();
            // Store the event for later use
            window.deferredPrompt = e;
            console.log('Install prompt available');
          });

          // Listen for successful installation
          window.addEventListener('appinstalled', () => {
            // Clear the deferredPrompt
            window.deferredPrompt = null;
            console.log('PWA installed successfully');
          });
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return null;
}
