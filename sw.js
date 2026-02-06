
const CACHE_NAME = 'dashlib-ai-v3.6';

// Assets required for the core app shell to function offline
const CORE_ASSETS = [
  './',
  './index.html',
  './index.tsx',
  './manifest.json',
  './types.ts',
  './data.ts',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
];

// Third-party assets to be cached using Stale-While-Revalidate
const DYNAMIC_ASSETS = [
  'https://cdn.jsdelivr.net/gh/google/material-design-icons/png/action/dashboard/black/192dp.png',
  'https://cdn.jsdelivr.net/gh/google/material-design-icons/png/action/dashboard/black/512dp.png',
  'https://cdn.jsdelivr.net/gh/google/material-design-icons/png/action/view_quilt/black/192dp.png',
  'https://cdn.jsdelivr.net/gh/google/material-design-icons/png/action/code/black/192dp.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA] Pre-caching Core App Shell');
      return cache.addAll([...CORE_ASSETS, ...DYNAMIC_ASSETS]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[PWA] Invaliding legacy cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Navigation Fallback for SPA routing
  // Ensures sub-routes or refreshes serve the main index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // 2. Bypass Strategy for Gemini API (Inference must be fresh and secure)
  if (url.hostname.includes('googleapis.com') || request.method !== 'GET') {
    return;
  }

  // 3. Stale-While-Revalidate Strategy
  // Serve from cache immediately, update cache in background
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch((err) => {
        console.warn('[PWA] Fetch failed, returning cached asset if available', err);
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
