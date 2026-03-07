
const CACHE_NAME = 'dashlib-ai-v3.9';

// Core assets to pre-cache on install
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

// Icons and heavy assets
const DYNAMIC_ASSETS = [
  'https://cdn.jsdelivr.net/gh/google/material-design-icons/png/action/dashboard/black/192dp.png',
  'https://cdn.jsdelivr.net/gh/google/material-design-icons/png/action/dashboard/black/512dp.png',
  'https://cdn.jsdelivr.net/gh/google/material-design-icons/png/action/view_quilt/black/192dp.png',
  'https://cdn.jsdelivr.net/gh/google/material-design-icons/png/action/code/black/192dp.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA] Pre-caching Core App Shell v3.9');
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

  // 1. Bypass Strategy for APIs and non-GET
  if (url.hostname.includes('googleapis.com') || request.method !== 'GET') {
    return;
  }

  // 2. Navigation Fallback Strategy
  // For navigation requests, try network first, then cache, then fallback to index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Update cache with latest index.html
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => {
          // If network fails, try cache, then fallback to index.html
          return caches.match(request).then((response) => {
            return response || caches.match('./index.html');
          });
        })
    );
    return;
  }

  // 3. Stale-While-Revalidate Strategy for all other assets
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(request);
      
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && 
           (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      }).catch(() => {
        // Network failure is expected offline
      });

      // Return cached response immediately if available, otherwise wait for fetch
      return cachedResponse || fetchPromise;
    })
  );
});
