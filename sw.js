/* Versioned app shell; never deletes another app's caches or project storage. */
'use strict';
const PREFIX = 'fieldsketch:' + self.registration.scope;
const CACHE = PREFIX + ':v8';
const TILES = PREFIX + ':tiles';
const LOCAL = ['./', './index.html', './app.js?v=8', './geometry.js?v=8', './styles.css?v=8'];
const LIBS = [
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdn.jsdelivr.net/npm/proj4@2.11.0/dist/proj4.js'
];
self.addEventListener('install', event => {
  // Installation succeeds only when all required app files can work offline.
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll([...LOCAL, ...LIBS])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX + ':') && k !== CACHE && k !== TILES).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(async response => {
      if (response.ok) { const cache = await caches.open(CACHE); await cache.put('./index.html', response.clone()).catch(() => {}); }
      return response;
    }).catch(async () => (await caches.open(CACHE)).match('./index.html')));
    return;
  }
  // Unofficial Google XYZ is online-only here; no service-worker tile caching.
  if (url.hostname.endsWith('.google.com') || url.hostname.endsWith('.googleapis.com')) return;
  const isTile = url.hostname === 'server.arcgisonline.com' && url.pathname.includes('/tile/');
  const isAsset = LOCAL.some(p => new URL(p, self.registration.scope).href === url.href) || LIBS.includes(url.href);
  if (!isTile && !isAsset) return;
  event.respondWith((async () => {
    const cache = await caches.open(isTile ? TILES : CACHE), hit = await cache.match(event.request);
    if (hit) return hit;
    const response = await fetch(event.request);
    if (response.ok || (isTile && response.type === 'opaque')) {
      try {
        await cache.put(event.request, response.clone());
        if (isTile) { const keys = await cache.keys(); for (const key of keys.slice(0, Math.max(0, keys.length - 250))) await cache.delete(key); }
      } catch (_) { /* Imagery cache quota must not prevent map use. */ }
    }
    return response;
  })());
});
