"use strict";

console.log("--> SW ");
if (window.sessionStorage) {
  console.log("--- window.sessionStorage");
}
if (sessionStorage) {
  console.log("--- sessionStorage");
}

function handleStorage(event) {
  console.log("--> handleStorage ");
  console.log(event);
  event = event || window.event; // support IE8
  if (event.newValue === null) {// it was removed
    // Do somthing
  } else {
      // Do somthing else
    }
}

window.addEventListener('storage', handleStorage, false);

document.addEventListener('DOMContentLoaded', function () {
  // Añadimos el listener para crear el elemento en el DOM

  //Miramos si tenemos datos en el storage
  var datosDetails = JSON.parse(sessionStorage.getItem('uvaintranet'));
  if (datosDetails != null) {
    //CArgmos los objetos del local
    // Creamos el contenedor de los Grupos que a su vez llamara al del Grupo y que a su vez llamara a las Acciones
    console.log("cargando datos del local");
    loadContent(datosDetails);
  }
  //CArgamos los datos en backgrond
  // Cargamos todos los datos 
  var data = loadJSONMiPortal('./ws/info.jsp');
  data.then(function (elemento) {
    sessionStorage.setItem('uvaintranet', JSON.stringify(elemento));
    if (datosDetails == null) {
      console.log("Cargando datos en directo");
      loadContent(elemento);
    }
  });
});

