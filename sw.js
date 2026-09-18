/* Field Sketch — offline service worker
   Caches the app shell + Leaflet + map tiles so the tool keeps working with
   a weak or no signal in the field. Bump CACHE to force an update. */
const CACHE = 'fieldsketch-v2';
const SHELL = [
  './',
  './index.html',
  './app.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdn.jsdelivr.net/npm/proj4@2.11.0/dist/proj4.js'
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(SHELL.map(u=>c.add(u)))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(
    keys.filter(k=>k!==CACHE&&k!==CACHE+'-tiles').map(k=>caches.delete(k))
  )).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e=>{
  const url = e.request.url;
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(res=>{
      if(res.ok)caches.open(CACHE).then(c=>c.put('./index.html',res.clone()));
      return res;
    }).catch(()=>caches.match('./index.html')));
    return;
  }
  // map tiles (google / esri / wayback): cache-first, keep last-seen tiles offline
  const isTile = /google\.com\/vt|arcgisonline|wayback\.maptiles/.test(url);
  if(isTile){
    e.respondWith(
      caches.open(CACHE+'-tiles').then(async c=>{
        const hit=await c.match(e.request);
        if(hit) return hit;
        try{ const res=await fetch(e.request); if(res.ok) c.put(e.request,res.clone()); return res; }
        catch(err){ return hit || Response.error(); }
      })
    );
    return;
  }
  // app shell + libs: cache-first, fall back to network
  e.respondWith(
    caches.match(e.request).then(hit=> hit || fetch(e.request).then(res=>{
      if(res.ok && e.request.method==='GET'){
        const cp=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp));
      }
      return res;
    }).catch(()=>hit))
  );
});
