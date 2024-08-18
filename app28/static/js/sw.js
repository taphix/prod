//sw.js

self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
  });
  self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
  });
  self.addEventListener('fetch', function(event) {
    console.log('[Service Worker] Fetching something ...', event);
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('js/sw.js').then(function(registration) {
            console.log('Service Worker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('Service Worker registration failed: ', err);
        });
    });
}
