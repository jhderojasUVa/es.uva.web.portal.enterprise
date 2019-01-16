
function handleStorage(event) {
  event = event || window.event; // support IE8
  if (event.newValue === null) { // it was removed
      // Do somthing
  } else {
      // Do somthing else
  }
}

window.addEventListener('storage', handleStorage, false);

async function loadJSONMiPortal(url) {
  // Funcion que hace un fetch y aplica el filtro (que le hemos metido) a los datos

  // Pillamos los datos y lo devolvemos con un await, como tiene que ser
  return await fetch(url)
  .then((respuesta) => {
  	// Si responde ok, hacemos pop
    if (respuesta.ok) return respuesta.json()
  })
  .then((respuestaJSON) => respuestaJSON);
}

document.addEventListener('DOMContentLoaded', function() {
  // Añadimos el listener para crear el elemento en el DOM
  /*
  //CArgamos los datos del perfil
  let data = loadJSONMiPortal('./ws/datos.jsp');
  data.then((elemento) => {
  	//let photo=elemento.jpegphoto;
   // document.getElementById("perfilfoto").src = "data:image/jpeg;base64, " + photo;

    contenidoObject = new PhotoMiPortal();
    contenidoObject.datos = elemento;
   	// Y una vez acabado el cuento, lo metemos en el DOM, DURUMDUMDUMDUDM
   	document.getElementById('contenidoperfilfoto').appendChild(contenidoObject);
  });

  //Miramos si tenemos datos en el storage
  var datosDetails = JSON.parse(sessionStorage.getItem('uvaintranet'));
  if (datosDetails!=null) {
    //CArgmos los objetos del local
    // Creamos el contenedor de los Grupos que a su vez llamara al del Grupo y que a su vez llamara a las Acciones
	  loadContent(datosDetails);
  }
  //CArgamos los datos en background
  // Cargamos todos los datos 
  data = loadJSONMiPortal('./ws/info.jsp');
  data.then((elemento) => {
    sessionStorage.setItem('uvaintranet', JSON.stringify(elemento) );  
    if (datosDetails==null) {
      loadContent(elemento);
    }
  });
  */
});