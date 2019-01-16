'use strict';
/**
 * Comprobamos si el navefador soporta Workers y Push
 * Si lo soporta registramos el archivo sw.js
 */
if ('serviceWorker' in navigator && 'PushManager' in window) {
/*
    navigator.serviceWorker.register('sw.js')
    .then(function(swReg) {
      let swRegistration = swReg;
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
    });
	*/
} else {
   
}