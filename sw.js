const nombreCache = 'apv-v4';

const archivos = [
    '/',
    'index.html',
    './css/bootstrap.css',
    './css/styles.css',
    'error.html',
    './js/app.js',
    './js/apv.js'
];


// Cuando se instala el service Worker
self.addEventListener('install', e => {
    console.log('Instalado el Service Worker');

    e.waitUntil(
        caches.open(nombreCache)
        .then( cache =>{
            console.log('Cacheando');
            cache.addAll(archivos)
        })
    )
});

// Activar el Service Worker 
self.addEventListener('activate', e => {
    console.log('Service Worker Activado');

    e.waitUntil(
        caches.keys()
            .then( keys =>{
                // console.log('Cacheando');
                return Promise.all(
                    keys.filter( key => key !== nombreCache)
                    .map( key => caches.delete(key))
                )
            })
    )
})

// Evento fetch para descargar archivos estaticos
self.addEventListener('fetch', e => {
    console.log('Fetch...', e);

    e.respondWith(
        caches.match(e.request)
        .then( respuestaCache => (respuestaCache ? respuestaCache : 
                caches.match('error.html')))
    )
});