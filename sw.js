
const CACHE_NAME = 'dashlib-ai-v3.3';

// Core assets required for the app shell and offline splash
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/index.tsx',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  // Pre-cache critical icons for offline splash screen integrity
  'https://cdn.jsdelivr.net/gh/google/material-design-icons/png/action/dashboard/black/192dp.png',
  'https://cdn.jsdelivr.net/gh/google/material-design-icons/png/action/dashboard/black/512dp.png'
];

// Regex to match approved CDNs for dynamic caching (Stale-While-Revalidate)
const CDN_MATCH = /^https:\/\/(esm\.sh|cdn\.jsdelivr\.net|fonts\.gstatic\.com|fonts\.googleapis\.com|i\.pravatar\.cc|cdn\.tailwindcss\.com)/;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching App Shell & Static Assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Activate immediately to take control of the page
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => {
          console.log('[SW] Pruning old cache:', key);
          return caches.delete(key);
        })
      );
    })
  );
  // Claim clients immediately so the first load is controlled
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Navigation Fallback (SPA Routing Support)
  // Intercepts navigation requests to serve the App Shell (index.html)
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html').then((response) => {
        return response || fetch(request).catch(() => {
           // If network fails and cache is missing, return the pre-cached shell
           return caches.match('/index.html');
        });
      })
    );
    return;
  }

  // 2. Bypass Strategy
  // Do not cache non-GET requests or calls to the Gemini API (security/freshness)
  if (
    request.method !== 'GET' || 
    url.hostname === 'generativelanguage.googleapis.com' || 
    url.protocol === 'chrome-extension:'
  ) {
    return;
  }

  // 3. Stale-While-Revalidate Strategy
  // Serve from cache immediately, then update cache in background
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        // Validation: Ensure response is valid before caching
        if (
          !networkResponse || 
          networkResponse.status !== 200 || 
          (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')
        ) {
          return networkResponse;
        }

        // Cache Strategy: Only cache approved origins or own origin
        if (url.origin === self.location.origin || CDN_MATCH.test(url.href)) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch((err) => {
        // Network failure: return cached response if available, else re-throw
        if (cachedResponse) return cachedResponse;
        console.warn('[SW] Fetch failed (Offline):', request.url);
        throw err;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
