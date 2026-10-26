const CACHE='id4-lld-cache-v21';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await cache.addAll(FILES);
  await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  const isHtml=request.mode==='navigate'||url.pathname.endsWith('/index.html');
  if(isHtml){
    event.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      try{
        const response=await fetch(request,{cache:'no-cache'});
        if(response&&response.ok){
          try{await cache.put(request,response.clone());}catch(_){ }
        }
        return response;
      }catch(_){
        return (await cache.match(request))||(await cache.match('./index.html'))||(await cache.match('./'));
      }
    })());
    return;
  }
  event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{
    if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{});}
    return response;
  }).catch(()=>caches.match('./index.html'))));
});
