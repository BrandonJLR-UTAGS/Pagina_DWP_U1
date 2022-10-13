//service worker
if('serviceWorker'in navigator){
    console.log('Puedes usar los servicios en el navegador');
    navigator.serviceWorker.register('./sw.js')
    .then(res=>console.log('serviceWorker cargado correctamente',res))
    .catch(err=>console.log('serviceWorker no se pudo registrar',err))
}else{
    console.log('no se puede iniciar el serviceworker');
}
