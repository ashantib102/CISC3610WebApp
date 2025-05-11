/// <reference lib="webworker" />

// This file contains the service worker for offline functionality
// It would be registered in the _app.tsx file

// Define a version for your cache
const CACHE_NAME = "llm-explorer-v1";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Resources to cache
const RESOURCES_TO_CACHE = [
  `${basePath}/`,
  `${basePath}/learn`,
  `${basePath}/about`,
  `${basePath}/promo`,
  `${basePath}/icon-192x192.png`,
  `${basePath}/icon-512x512.png`,
  `${basePath}/manifest.webmanifest`,
  `${basePath}/data/llm-data.json`,
  `${basePath}/llm-explorer-logo.jpeg`,
  `${basePath}/chatgpt-logo.png`,
  `${basePath}/claude-logo.webp`,
  `${basePath}/gemini-logo.webp`,
  `${basePath}/v0-logo.svg`,
  `${basePath}/copilot-logo.jpeg`,
  `${basePath}/deepseek-logo.webp`,
  `${basePath}/cursor-logo.png`,
  `${basePath}/llm-explorer-home.png`,
  `${basePath}/llm-explorer-mobile-app.png`,
  `${basePath}/llm-explorer-details.png`
];

// Define custom types for service worker events
type InstallEvent = Event & {
  waitUntil: (promise: Promise<any>) => void;
};

type CustomFetchEvent = Event & {
  request: Request;
  respondWith: (response: Response | Promise<Response>) => void;
};

// Install event - cache resources
self.addEventListener("install", (event) => {
  const swEvent = event as InstallEvent;
  swEvent.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(RESOURCES_TO_CACHE);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const swEvent = event as InstallEvent;
  swEvent.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - respond with cached resources or fetch from network
self.addEventListener("fetch", (event) => {
  const swEvent = event as CustomFetchEvent;
  swEvent.respondWith(
    caches.match(swEvent.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(swEvent.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(swEvent.request, responseToCache);
        });

        return response;
      });
    })
  );
});
