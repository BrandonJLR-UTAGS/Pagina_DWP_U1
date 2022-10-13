//Asignar nombre y version cache
const CACHE_NAME='V1_CACHE_AWP';

var urlToCache=[
    './',
    './CSS/Style.css',
    './main.js',
    './Imagenes/anya.jpg',
    './Imagenes/Intel_logo_(2006-2020).jpg'
]


self.addEventListener('install',e=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache=>{
            return cache.addAll(urlToCache)
            .then(()=>{
                self.skipWaiting();
                console.log('cache cargado correctamente');

            })
        })
        .catch(err=>{
            console.log('no se ha registrado el cache',err);
        })
    )
})

//evento activate

self.addEventListener('activate',e=>{
    const cacheWhiteList=[CACHE_NAME];
    e.waitUntil(
        caches.keys()
        .then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cacheName=>{
                    if(cacheWhiteList.indexOf(cacheName)==-1){
                        //Borrar los elementos que ni se ocupan
                        return cache.delete(cacheName);
                    }
                })
            )
        })
        .then(()=>{
            //activar cache
            self.clients.claim();
        })
    )
})

//evento fetch

self.addEventListener('fetch',e=>{
    e.respondWith(
        caches.match(e.request)
        .then(res=>{
            if(res){
                //devuelvo los datos
                console.log('En funcionamiento',res);
                return res;
            }
            return fetch(e.request);
        })
    );
})