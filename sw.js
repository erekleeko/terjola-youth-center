const CACHE_NAME = 'terjola-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.png'
];

// ქეშირება ინსტალაციის დროს
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// ქეშიდან ჩატვირთვა
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // თუ მოიძებნა ქეშში, დააბრუნებს იმას, თუ არა და წამოიღებს ინტერნეტიდან
        return response || fetch(event.request);
      })
  );
});