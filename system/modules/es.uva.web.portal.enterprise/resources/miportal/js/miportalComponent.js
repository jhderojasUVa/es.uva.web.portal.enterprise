// Variables globales
var perfilesObject = undefined;
var contenidoObject = undefined;

class PerfilesMiPortal extends HTMLElement { 
  // Creamos el componente que crea los perfiles
  
  static get is() {
    // Llamada al nombre
    return 'perfiles-miportal';
  }

  constructor(self) {
    // Constructor
    try {
      super();
      this.shadow=undefined;
      
    } catch(err) {
      throw 'Ha habido un error al crear los perfiles de Mi Portal';
    } finally {
      this.shadow = this.attachShadow({mode: 'open'});
    }
  }

  contenido(data) {
    // Creamos el select para elegir el perfil
    if (data) {
      var select = document.createElement('select');
	  // Llamamos al select "perfiles"
	  // Creamos el vacio primero
	  let opcionVacio = document.createElement('option');
	  opcionVacio.value = '0';
	  opcionVacio.textContent = 'Elige uno';
	  opcionVacio.selected = true;
	  select.appendChild(opcionVacio);
	  
      select.name = 'perfiles';
      data.forEach(element => {
	    // Para cada perfil creamos la opcion y la rellenamos
        var opcion = document.createElement('option');
        opcion.value = element.Path;
        opcion.textContent = element.Title;
		// La insertamos en el DOM
        select.appendChild(opcion);
      });
	  // Metemos el DOM entero construido
      this.shadowRoot.appendChild(select);
	  // Añadimos el listener para cuando cambie
      select.addEventListener('change', e => {
        changePerfil(e.target.value);
      });
    } else {
      // Algo ha ido mal, break! break! break! eliminar el open del shadowRoot
      this.removeAttribute('open');
    }
  }
}
customElements.define(PerfilesMiPortal.is, PerfilesMiPortal);

class GrupoMiPortal extends HTMLElement { 
  // Creamos el componente del Grupo que contiene los Accesos

  static get is() {
    // Llamada al nombre
    return 'grupo-miportal';
  }

  constructor(self) {
    // Constructor
    try {
      super();
    } catch(err) {
      throw 'Ha habido un error al crear los elementos de Mi Portal';
    } finally {
      let shadowRoot = this.attachShadow({mode: 'open'});
    }
  }

  set datos(val) {
  	// Mete los datos en el objeto
    this._datos = val;
  }

  get grupo() {
  	// Por si lo queremos obtener
    console.log("GET GRUPO");
  }

  set grupo(val) {
  	// Crea el grupo a traves de los valores que le pasamos
	
	if (val) {
		// Vamos a crearlo a traves de un template
		let elementTemplate = document.getElementById('grupos-tiles').content;
		// Lo clonamos y trabajamos con el clonado
		let clonedTemplate = elementTemplate.cloneNode(true);
		let contenido = clonedTemplate.getElementById('miportalcontenido');
		
		// Hacemos el separador
		let bigElement = document.createElement('div');
		bigElement.setAttribute('class', 'row no-margins');

		val.forEach(element => {
		  // Crea los elementos "Accesos" llamando al objeto Accesos con los valores adecuados
		  var obj = new AccesosMiPortal()
		  obj.datos = element;
		  // Lo inserta en el DOM debajo del row
		  //contenido.appendChild(obj);
		  bigElement.appendChild(obj);
		});
		contenido.appendChild(bigElement);
		// Añadimos los elementos al template clonado
		clonedTemplate.appendChild(contenido);
		// Lo metemos en el shadowRoot
		this.shadowRoot.appendChild(clonedTemplate);
	} else {
		this.removeAttribute('open');
	}
  }
// Fin del class
}
customElements.define(GrupoMiPortal.is, GrupoMiPortal);


class GruposMiPortal extends HTMLElement { 
  // Creamos el componente que contiene todos los elemento Grupo

  static get is() {
    // Llamada al nombre
    return 'grupos-miportal';
  }

  constructor(self) {
    // Constructor
    try {
      super();
    } catch(err) {
      throw 'Ha habido un error al crear los elementos de Mi Portal';
    } finally {
      let shadowRoot = this.attachShadow({mode: 'open'});
    }
  }

  set datos(val) {
  	// Metemos los valores en el objeto
    this._datos = val;
  }

  get perfil() {
  	// Para recuperar el perfil
    console.log("GET PERFIL");
	this._perfil = this.getAttribute('data-perfil');
  }

  set perfil(val) {
  	// Mete los valores en el perfil
	
	// Leemos el perfil
    let perfil = {"Path": val};
	// Añadimos el atributo para saber si cambia o no y tracearlo con el callback
	this.setAttribute('data-perfil', val);
	// Llamamos a la funcion que filtra los datos segun el perfil
    let elementos_perfil = this._datos.getPerfil(perfil);

	//Llamamos a la funcion que filtra los elementos por clasificacion de estos
    let grupos = elementos_perfil.getClasificaciones();
    
    grupos.forEach(grupo => {
	  // Creamos los grupos recorriendo el array filtrado
	  // Para ello llamamos al objeto GrupoMiPortal que contiene los "accesos"
      var objElement = new GrupoMiPortal();
	  // Rellenamos el objeto
      objElement.grupo = elementos_perfil.getClasificacion(grupo);
	  // Le colocamos en el DOM
      this.shadowRoot.appendChild(objElement);
    });
  }
  
	static get observedAttributes() {
		// Ponemos un observable a los atributos que pueden cambiar
		return ['data-perfil']; 
	}
  
	attributeChangedCallback(attr, oldValue, newValue) {
		// Hacemos cochinadas cuando cambie
		
		// Buscamos el tag a borrar contenido
		let toDelete = document.getElementsByTagName('grupos-miportal');
		
		// Esto se puede refactorizar con un forEach... pero mas adelante
		for (let i = 0; i< toDelete.length; i++) {
			// Recorremos (por si hay mas de uno, que nunca se sabe) y limpiamos
			toDelete[i].shadowRoot.innerHTML = '';
		}
	}
}
customElements.define(GruposMiPortal.is, GruposMiPortal);

class AccesosMiPortal extends HTMLElement { 
  // Creamos el componente que crea cada uno de los elementos o accesos (donde pinchan y va al sitio)

  static get is() {
    // Llamada al nombre
    return 'accesos-miportal';
  }

  constructor(self) {
    // Constructor
    try {
      super();
    } catch(err) {
      throw 'Ha habido un error al crear los elementos de Mi Portal';
    } finally {
      let shadowRoot = this.attachShadow({mode: 'open'});
    }
  }

  set datos(val) {
  	// Metemos los datos en el objeto
    this._datos = val;

    if (val) {
      // Leemos el template
      let elementTemplate = document.getElementById('elemento-tile').content;
      // Rellenamos el template
      if (val.Path) {
        elementTemplate.querySelector('h1').innerHTML = '<a href="'+ val.Path +'" role="link">'+ val.NavText +'</a>';
      } else {
        elementTemplate.querySelector('h1').innerHTML = val.NavText;
      }

      // Montamos el template
      this.shadowRoot.appendChild(elementTemplate.cloneNode(true));
    } else {
      // Algo ha ido mal, break! break! break! eliminar el open del shadowRoot
      this.removeAttribute('open');
    }
  }

}
customElements.define(AccesosMiPortal.is, AccesosMiPortal);

document.addEventListener('DOMContentLoaded', function() {
  // Añadimos el listener para crear el elemento en el DOM

  // Cargamos todos los datos 
  let data = loadJSONMiPortal('/ws/info.jsp');

  // Con los datos, montamos el tinglado
  data.then((elemento) => {
  		// Miramos los perfiles
		let perfiles = elemento.getPerfiles();
		// Creamos el objeto perfiles
		perfilesObject = new PerfilesMiPortal();
		perfilesObject.contenido(perfiles);
		// Metemos el objeto en el DOM
    	document.getElementById('perfiles').appendChild(perfilesObject);
    
		// Creamos el contenedor de los Grupos que a su vez llamara al del Grupo y que a su vez llamara a las Acciones
		contenidoObject = new GruposMiPortal();
		contenidoObject.datos = elemento;
		// Y una vez acabado el cuento, lo metemos en el DOM, DURUMDUMDUMDUDM
		document.getElementById('contenido').appendChild(contenidoObject);

	});

});

async function loadJSONMiPortal(url) {
  // Funcion que hace un fetch y aplica el filtro (que le hemos metido) a los datos

  // Pillamos los datos
  let datos = await fetch(url)
  .then((respuesta) => {
  	// Si responde ok, hacemos pop
    if (respuesta.ok) return respuesta.json()
  })
  .then((respuestaJSON) => respuestaJSON);
  
  // Acabados los promises, lo devolvemos
  return datos;
}

function changePerfil(perfil) {
  // Funcion que rellena los permiles con los datos
  contenidoObject.perfil = perfil;
}

// Filtrado de datos

// Por perfiles
Array.prototype.getPerfiles = function () {
  var perfiles_aux = Array();
  this.forEach(element => {
    if (element.Perfiles) {
      element.Perfiles.forEach(perfil => {
	  	// Añadimos el elemento
        perfiles_aux.push(perfil);
      });
    }
  });
  // Vemos si esta repetido
  var perfiles = perfiles_aux.filter((e, i, a) => {
    var ele = e; 
    var index_ele = a.findIndex(function(item, i){
      return item.Path === ele.Path
    });
	// Repetido si
    if (index_ele === i) return true;
	// Repetido no
    return false;
  });
  // Devolvemos el array
  return perfiles;
}

// Contenidos del perfil
Array.prototype.getPerfil = function (perfil) {
  //Obtenemos los elementos con ese perfil
  return this.filter((e, i, a) => {
    var ele = e; 
    var index_ele = e.Perfiles.findIndex(function(item, i){
      return (item.Path === perfil.Path);
    });
    if (index_ele > -1) return true;
    return false;
  });
}

// Por categorias
Array.prototype.getCategorias = function () {
  var array_aux = Array();
  this.forEach(element => {
    if (element.Categories) {
      element.Categories.forEach(cat => {
	  	// Añadimos el elemento
        array_aux.push(cat);
      });
    }
  });
  // Vemos si esta repetido
  var array_unique = array_aux.filter((e, i, a) => {
    var ele = e; 
    var index_ele = a.findIndex(function(item, i){
      return item.Path === ele.Path
    });
	// Repetido si
    if (index_ele === i) return true;
	// Repetido no
    return false;
  });
  return array_unique;
}

// Por clasificaciones
Array.prototype.getClasificaciones = function () {
  var array_aux = Array();
  this.forEach(element => {
    if (element.Clasificacion) {
      element.Clasificacion.forEach(cat => {
	  	// Añadimos el elemento
        array_aux.push(cat);
      });
    }
  });
  var array_unique = array_aux.filter((e, i, a) => {
    var ele = e; 
	// Vemos si esta repetido
    var index_ele = a.findIndex(function(item, i){
      return item.Path === ele.Path
    });
	// Repetido si
    if (index_ele===i) return true;
	// Repetido no
    return false;
  });
  // Devolvemos el array
  return array_unique;
}

// Por clasificacion
Array.prototype.getClasificacion = function (clasificacion) {
  //Obtenemos los elementos con esa clasificacion
  return this.filter((e, i, a) => {
    var ele = e; 
	// Vemos si esta repetido
    var index_ele = e.Clasificacion.findIndex(function(item, i){
      return (item.Path === clasificacion.Path);
    });
	// Repetido si
    if (index_ele>-1) return true;
	// Repetido no
    return false;
  });
}