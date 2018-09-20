/**
 * Componentes HTML para la portada de MiPortal
 * - PerfilesMiPortal: desplegable con los perfiles del usuario
 * - GrupoMiPortal: Cada grupo con accesos directos
 * - GruposMiPortal: Elemento que carga los grupos.
 * - AccesosMiPortal: Botones o cajas dentro de Mi portal
 * 
 * FUNCIONAMIENTO:
 * Carga un JSON al seleccionar un perfil con la función changePerfil que cambia
 *  el contenidoObject (objeto GruposMiPortal) global al perfil seleccionado
 * 
 */


// Variables globales
var perfilesObject = undefined;
var contenidoObject = undefined;
var perfilesPrioridad = ["pas","pdi","alumno"];
var clasificacionesPrioridad = ["espacio_personal","mas_uva"];

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
      //Seleccionamos el perfil de los que tenemos de mayor prioridad según el array
      var perfilSeleccionado = perfilesPrioridad.filter((e, i, a) => {
        var ele = e; 
        var index_ele = data.findIndex(function(item, i){
          return item.Name === e;
        });
        if (index_ele>-1) return true;
        return false;
      });
      if (perfilSeleccionado.length > 0) {
        let perfil = {"Name": perfilSeleccionado[0]};
        // Llamamos a la funcion que filtra los datos segun el perfil
        let ele_perfil = data.findPerfil(perfil);
        if (ele_perfil.length > 0) {
          select.value = ele_perfil[0].Path;
          changePerfil(ele_perfil[0].Path);
        }
      } else {
        //Sin prioridad de perfiles
        //Cogemos el primero que tenga el usuario
        select.value = data[0].Path;
        changePerfil(data[0].Path);
      }
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

  get clasificacion() {
  	// Por si lo queremos obtener
    return this._clasificacion ;
  }

  set clasificacion(val) {
    this._clasificacion = val;
  }

  get grupo() {
  	// Por si lo queremos obtener
    return this._grupo ;
  }

  set grupo(val) {
    this._grupo = val;
  	// Crea el grupo a traves de los valores que le pasamos
    if (val) {
      // Vamos a crearlo a traves de un template
      //let elementTemplate = document.getElementById('grupos-tiles').content;
      //Al ser n template importado:
      let doc = document.querySelector('link[rel="import"]#template_grupos').import;
      let elementTemplate = doc.querySelector('#grupos-tiles');
      //document.body.appendChild(elementTemplate.cloneNode(true));
      // Lo clonamos y trabajamos con el clonado
      //let clonedTemplate = elementTemplate.cloneNode(true);
      let clonedTemplate = document.importNode(elementTemplate.content, true);
      //let contenido = clonedTemplate.getElementById('miportalcontenido');
      let contenido = clonedTemplate.querySelector('#miportalcontenido');

      // Rellenamos el template
      if (this._clasificacion) {
        //elementTemplate.querySelector('h1').innerHTML = '<a href="'+ val.Path +'" role="link">'+ val.NavText +'</a>';
        clonedTemplate.querySelector('h1').innerHTML = this._clasificacion.Title;
      } else {
        clonedTemplate.querySelector('h1').innerHTML = 'Grupo';
      }
      
      // Hacemos el separador
      let bigElement = document.createElement('div');
      bigElement.setAttribute('class', 'row no-margins');

      val.sortAccesos().forEach(element => {
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
    let clasificaciones = elementos_perfil.getClasificaciones().sortClasificaciones();
    clasificaciones.forEach(clasificacion => {
      // Creamos los grupos recorriendo el array filtrado
      // Para ello llamamos al objeto GrupoMiPortal que contiene los "accesos"
      var objElement = new GrupoMiPortal();
      objElement.clasificacion = clasificacion;
      // Rellenamos el objeto
      objElement.grupo = elementos_perfil.getClasificacion(clasificacion);
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
      //let elementTemplate = document.getElementById('elemento-tile').content;
      let doc = document.querySelector('link[rel="import"]#template_elemento').import;
      let elementTemplate = doc.querySelector('#elemento-tile');
      // Lo clonamos y trabajamos con el clonado
      //let clonedTemplate = elementTemplate.cloneNode(true);
      let clonedTemplate = document.importNode(elementTemplate.content, true);
      //let contenido = clonedTemplate.getElementById('miportalcontenido');
      //let contenido = clonedTemplate.querySelector('#miportalcontenido');
      // Rellenamos el template
      if (val.Path) {
        //elementTemplate.querySelector('h1').innerHTML = '<a href="'+ val.Path +'" role="link">'+ val.NavText +'</a>';
        clonedTemplate.querySelector('h1').innerHTML = '<a href="'+ val.Path +'" role="link">'+ val.NavText +'</a>';
      } else {
        //elementTemplate.querySelector('h1').innerHTML = val.NavText;
        clonedTemplate.querySelector('h1').innerHTML = val.NavText;
      }
      if (val.Icon) {
        let imgurl="http://miportal-des.uva.es/resources/miportal/img/"+val.Icon;
        clonedTemplate.querySelector('div.azul').style = "background-image: url('"+imgurl+"'); background-repeat: no-repeat; background-position: right bottom; background-size: contain;";
      }
      if (val.Iconclass) {
        let divclass=val.Iconclass+' tile';
        clonedTemplate.querySelector('div.azul').className = divclass;
      }

      // Montamos el template
      //this.shadowRoot.appendChild(elementTemplate.cloneNode(true));
      this.shadowRoot.appendChild(clonedTemplate);
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
  let data = loadJSONMiPortal('./ws/info.jsp');

  // Con los datos, montamos el tinglado
  data.then((elemento) => {
  	
		// Creamos el contenedor de los Grupos que a su vez llamara al del Grupo y que a su vez llamara a las Acciones
		contenidoObject = new GruposMiPortal();
		contenidoObject.datos = elemento;
		// Y una vez acabado el cuento, lo metemos en el DOM, DURUMDUMDUMDUDM
		document.getElementById('contenido').appendChild(contenidoObject);

    // Miramos los perfiles
		let perfiles = elemento.getPerfiles();
		// Creamos el objeto perfiles
		perfilesObject = new PerfilesMiPortal();
		perfilesObject.contenido(perfiles);
		// Metemos el objeto en el DOM
    document.getElementById('perfiles').appendChild(perfilesObject);
	});

});

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

function changePerfil(perfil) {
  // Funcion que rellena los permiles con los datos
  if (!contenidoObject) {
    console.warn("--- changePerfil contenidoObject Vacío");
  }
  if (perfil) {
    contenidoObject.perfil = perfil;
  } else {
    console.warn("--- changePerfil Perfil Vacío");
  }
}

// Filtrado de datos
// Añadido a los metodos del array las funciones...

// Devuelve los perfiles unicos
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

// Devuelve los contenidos del perfil
Array.prototype.getPerfil = function (perfil) {
  //Obtenemos los elementos con ese perfil
  let resultado= this.filter((e, i, a) => {
    var ele = e; 
    var index_ele = e.Perfiles.findIndex(function(item, i){
      if (perfil.Path) {
        return (item.Path === perfil.Path);
      } else if (perfil.Title) {
        return (item.Title === perfil.Title);
      } else if (perfil.Name) {
        return (item.Name === perfil.Name);
      }
    });
    if (index_ele > -1) return true;
    return false;
  });
  return resultado;
}

// Devuelve los contenidos del perfil
Array.prototype.findPerfil = function (perfil) {
  //Obtenemos los elementos con ese perfil
  let resultado= this.filter((e, i, a) => {
    if (perfil.Path) {
      return (e.Path === perfil.Path);
    } else if (perfil.Title) {
      return (e.Title === perfil.Title);
    } else if (perfil.Name) {
      return (e.Name === perfil.Name);
    }
    if (index_ele > -1) return true;
    return false;
  });
  return resultado;
}

// Devuelve las categorias, UNICAS
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
  console.log("<-- getCategorias");
  console.log(array_unique);
  return array_unique;
}

// Devuelve las clasificaciones, UNICAS
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
  console.log("<-- getClasificaciones");
  console.log(array_unique);
  return array_unique;
}

// Devuelve las clasificaciones, UNICAS
Array.prototype.sortClasificaciones = function () {
  let array_aux = Array();
  let props = arguments;
  return res= this.sort((a,b) => {
    let a_pos = clasificacionesPrioridad.findIndex(ele => ele === a.Name);
    let b_pos = clasificacionesPrioridad.findIndex(ele => ele === b.Name);
    if (a_pos == -1 ) return 1;
    if (b_pos == -1 ) return -1;
    if(a_pos < b_pos) return -1;
    if(a_pos > b_pos) return 1;
    return 0;
  });
}


// Devuelve el contenido de 1 clasificacion determinada
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

// Devuelve las clasificaciones, UNICAS
Array.prototype.sortAccesos = function () {
  let array_aux = Array();
  let props = arguments;
  return res= this.sort((a,b) => {
    let a_pos = a.NavPos;
    let b_pos = b.NavPos;
    if(a_pos < b_pos) return 1;
    if(a_pos > b_pos) return -1;
    return 0;
  });
}