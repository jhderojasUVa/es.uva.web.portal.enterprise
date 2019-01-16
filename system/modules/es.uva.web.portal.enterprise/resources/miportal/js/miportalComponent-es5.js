"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var perfilesPrioridad = ["pas", "pdi", "alumno"];
var clasificacionesPrioridad = ["espacio_personal", "mas_uva"];

var PerfilesMiPortal = function (_HTMLElement) {
  _inherits(PerfilesMiPortal, _HTMLElement);

  _createClass(PerfilesMiPortal, null, [{
    key: "is",

    // Creamos el componente que crea los perfiles

    get: function get() {
      // Llamada al nombre
      return 'perfiles-miportal';
    }
  }]);

  function PerfilesMiPortal(self) {
    _classCallCheck(this, PerfilesMiPortal);

    // Constructor
    try {
      var _this = _possibleConstructorReturn(this, (PerfilesMiPortal.__proto__ || Object.getPrototypeOf(PerfilesMiPortal)).call(this));

      _this.shadow = undefined;
    } catch (err) {
      throw 'Ha habido un error al crear los perfiles de Mi Portal';
    } finally {
      _this.shadow = _this.attachShadow({ mode: 'open' });
    }
    return _this;
  }

  _createClass(PerfilesMiPortal, [{
    key: "contenido",
    value: function contenido(data) {
      // Creamos el select para elegir el perfil
      if (data) {
        var select = document.createElement('select');
        // Llamamos al select "perfiles"
        // Creamos el vacio primero
        var opcionVacio = document.createElement('option');
        opcionVacio.value = '0';
        opcionVacio.textContent = 'Elige uno';
        opcionVacio.selected = true;
        select.appendChild(opcionVacio);

        select.name = 'perfiles';
        data.forEach(function (element) {
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
        select.addEventListener('change', function (e) {
          changePerfil(e.target.value);
        });
        //Seleccionamos el perfil de los que tenemos de mayor prioridad según el array
        var perfilSeleccionado = perfilesPrioridad.filter(function (e, i, a) {
          var ele = e;
          var index_ele = data.findIndex(function (item, i) {
            return item.Name === e;
          });
          if (index_ele > -1) return true;
          return false;
        });
        if (perfilSeleccionado.length > 0) {
          var perfil = { "Name": perfilSeleccionado[0] };
          // Llamamos a la funcion que filtra los datos segun el perfil
          var ele_perfil = data.findPerfil(perfil);
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
  }]);

  return PerfilesMiPortal;
}(HTMLElement);

customElements.define(PerfilesMiPortal.is, PerfilesMiPortal);

var GrupoMiPortal = function (_HTMLElement2) {
  _inherits(GrupoMiPortal, _HTMLElement2);

  _createClass(GrupoMiPortal, null, [{
    key: "is",

    // Creamos el componente del Grupo que contiene los Accesos

    get: function get() {
      // Llamada al nombre
      return 'grupo-miportal';
    }
  }]);

  function GrupoMiPortal(self) {
    _classCallCheck(this, GrupoMiPortal);

    // Constructor
    try {
      var _this2 = _possibleConstructorReturn(this, (GrupoMiPortal.__proto__ || Object.getPrototypeOf(GrupoMiPortal)).call(this));
    } catch (err) {
      throw 'Ha habido un error al crear los elementos de Mi Portal';
    } finally {
      var shadowRoot = _this2.attachShadow({ mode: 'open' });
    }
    return _this2;
  }

  _createClass(GrupoMiPortal, [{
    key: "datos",
    set: function set(val) {
      // Mete los datos en el objeto
      this._datos = val;
    }
  }, {
    key: "clasificacion",
    get: function get() {
      // Por si lo queremos obtener
      return this._clasificacion;
    },
    set: function set(val) {
      this._clasificacion = val;
    }
  }, {
    key: "grupo",
    get: function get() {
      // Por si lo queremos obtener
      return this._grupo;
    },
    set: function set(val) {
      this._grupo = val;
      // Crea el grupo a traves de los valores que le pasamos
      if (val) {
        // Vamos a crearlo a traves de un template
        //let elementTemplate = document.getElementById('grupos-tiles').content;
        //Al ser n template importado:
        var doc = document.querySelector('link[rel="import"]#template_grupos').import;
        var elementTemplate = doc.querySelector('#grupos-tiles');
        //document.body.appendChild(elementTemplate.cloneNode(true));
        // Lo clonamos y trabajamos con el clonado
        //let clonedTemplate = elementTemplate.cloneNode(true);
        var clonedTemplate = document.importNode(elementTemplate.content, true);
        //let contenido = clonedTemplate.getElementById('miportalcontenido');
        var contenido = clonedTemplate.querySelector('#miportalcontenido');

        // Rellenamos el template
        if (this._clasificacion) {
          //elementTemplate.querySelector('h1').innerHTML = '<a href="'+ val.Path +'" role="link">'+ val.NavText +'</a>';
          clonedTemplate.querySelector('h1').innerHTML = this._clasificacion.Title;
        } else {
          clonedTemplate.querySelector('h1').innerHTML = 'Grupo';
        }

        // Hacemos el separador
        var bigElement = document.createElement('div');
        bigElement.setAttribute('class', 'row no-margins');

        val.sortAccesos().forEach(function (element) {
          // Crea los elementos "Accesos" llamando al objeto Accesos con los valores adecuados
          var obj = new AccesosMiPortal();
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

  }]);

  return GrupoMiPortal;
}(HTMLElement);

customElements.define(GrupoMiPortal.is, GrupoMiPortal);

var GruposMiPortal = function (_HTMLElement3) {
  _inherits(GruposMiPortal, _HTMLElement3);

  _createClass(GruposMiPortal, null, [{
    key: "is",

    // Creamos el componente que contiene todos los elemento Grupo

    get: function get() {
      // Llamada al nombre
      return 'grupos-miportal';
    }
  }]);

  function GruposMiPortal(self) {
    _classCallCheck(this, GruposMiPortal);

    // Constructor
    try {
      var _this3 = _possibleConstructorReturn(this, (GruposMiPortal.__proto__ || Object.getPrototypeOf(GruposMiPortal)).call(this));
    } catch (err) {
      throw 'Ha habido un error al crear los elementos de Mi Portal';
    } finally {
      var shadowRoot = _this3.attachShadow({ mode: 'open' });
    }
    return _this3;
  }

  _createClass(GruposMiPortal, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attr, oldValue, newValue) {
      // Hacemos cochinadas cuando cambie

      // Buscamos el tag a borrar contenido
      var toDelete = document.getElementsByTagName('grupos-miportal');

      // Esto se puede refactorizar con un forEach... pero mas adelante
      for (var i = 0; i < toDelete.length; i++) {
        // Recorremos (por si hay mas de uno, que nunca se sabe) y limpiamos
        toDelete[i].shadowRoot.innerHTML = '';
      }
    }
  }, {
    key: "datos",
    set: function set(val) {
      // Metemos los valores en el objeto
      this._datos = val;
    }
  }, {
    key: "perfil",
    get: function get() {
      // Para recuperar el perfil
      this._perfil = this.getAttribute('data-perfil');
    },
    set: function set(val) {
      var _this4 = this;

      // Mete los valores en el perfil

      // Leemos el perfil
      var perfil = { "Path": val };
      // Añadimos el atributo para saber si cambia o no y tracearlo con el callback
      this.setAttribute('data-perfil', val);
      // Llamamos a la funcion que filtra los datos segun el perfil
      var elementos_perfil = this._datos.getPerfil(perfil);
      //Llamamos a la funcion que filtra los elementos por clasificacion de estos
      var clasificaciones = elementos_perfil.getClasificaciones().sortClasificaciones();
      clasificaciones.forEach(function (clasificacion) {
        // Creamos los grupos recorriendo el array filtrado
        // Para ello llamamos al objeto GrupoMiPortal que contiene los "accesos"
        var objElement = new GrupoMiPortal();
        objElement.clasificacion = clasificacion;
        // Rellenamos el objeto
        objElement.grupo = elementos_perfil.getClasificacion(clasificacion);
        // Le colocamos en el DOM
        _this4.shadowRoot.appendChild(objElement);
      });
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      // Ponemos un observable a los atributos que pueden cambiar
      return ['data-perfil'];
    }
  }]);

  return GruposMiPortal;
}(HTMLElement);

customElements.define(GruposMiPortal.is, GruposMiPortal);

var AccesosMiPortal = function (_HTMLElement4) {
  _inherits(AccesosMiPortal, _HTMLElement4);

  _createClass(AccesosMiPortal, null, [{
    key: "is",

    // Creamos el componente que crea cada uno de los elementos o accesos (donde pinchan y va al sitio)

    get: function get() {
      // Llamada al nombre
      return 'accesos-miportal';
    }
  }]);

  function AccesosMiPortal(self) {
    _classCallCheck(this, AccesosMiPortal);

    // Constructor
    try {
      var _this5 = _possibleConstructorReturn(this, (AccesosMiPortal.__proto__ || Object.getPrototypeOf(AccesosMiPortal)).call(this));
    } catch (err) {
      throw 'Ha habido un error al crear los elementos de Mi Portal';
    } finally {
      var shadowRoot = _this5.attachShadow({ mode: 'open' });
    }
    return _this5;
  }

  _createClass(AccesosMiPortal, [{
    key: "datos",
    set: function set(val) {
      // Metemos los datos en el objeto
      this._datos = val;

      if (val) {
        // Leemos el template
        //let elementTemplate = document.getElementById('elemento-tile').content;
        var doc = document.querySelector('link[rel="import"]#template_elemento').import;
        var elementTemplate = doc.querySelector('#elemento-tile');
        // Lo clonamos y trabajamos con el clonado
        //let clonedTemplate = elementTemplate.cloneNode(true);
        var clonedTemplate = document.importNode(elementTemplate.content, true);
        //let contenido = clonedTemplate.getElementById('miportalcontenido');
        //let contenido = clonedTemplate.querySelector('#miportalcontenido');
        // Rellenamos el template
        if (val.Path) {
          //elementTemplate.querySelector('h1').innerHTML = '<a href="'+ val.Path +'" role="link">'+ val.NavText +'</a>';
          var enlace = val.Path.replace("/sites/miportal/", "");
          clonedTemplate.querySelector('h1').innerHTML = '<a href="' + enlace + '" role="link">' + val.NavText + '</a>';
        } else {
          //elementTemplate.querySelector('h1').innerHTML = val.NavText;
          clonedTemplate.querySelector('h1').innerHTML = val.NavText;
        }
        if (val.Icon) {
          var imgurl = "http://miportal-des.uva.es/resources/miportal/img/" + val.Icon;
          clonedTemplate.querySelector('div.azul').style = "background-image: url('" + imgurl + "'); background-repeat: no-repeat; background-position: right bottom; background-size: contain;";
        }
        if (val.Iconclass) {
          var divclass = val.Iconclass + ' tile';
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
  }]);

  return AccesosMiPortal;
}(HTMLElement);

customElements.define(AccesosMiPortal.is, AccesosMiPortal);

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
  this.forEach(function (element) {
    if (element.Perfiles) {
      element.Perfiles.forEach(function (perfil) {
        // Añadimos el elemento
        perfiles_aux.push(perfil);
      });
    }
  });
  // Vemos si esta repetido
  var perfiles = perfiles_aux.filter(function (e, i, a) {
    var ele = e;
    var index_ele = a.findIndex(function (item, i) {
      return item.Path === ele.Path;
    });
    // Repetido si
    if (index_ele === i) return true;
    // Repetido no
    return false;
  });
  // Devolvemos el array
  return perfiles;
};

// Devuelve los contenidos del perfil
Array.prototype.getPerfil = function (perfil) {
  //Obtenemos los elementos con ese perfil
  var resultado = this.filter(function (e, i, a) {
    var ele = e;
    var index_ele = e.Perfiles.findIndex(function (item, i) {
      if (perfil.Path) {
        return item.Path === perfil.Path;
      } else if (perfil.Title) {
        return item.Title === perfil.Title;
      } else if (perfil.Name) {
        return item.Name === perfil.Name;
      }
    });
    if (index_ele > -1) return true;
    return false;
  });
  return resultado;
};

// Devuelve los contenidos del perfil
Array.prototype.findPerfil = function (perfil) {
  //Obtenemos los elementos con ese perfil
  var resultado = this.filter(function (e, i, a) {
    if (perfil.Path) {
      return e.Path === perfil.Path;
    } else if (perfil.Title) {
      return e.Title === perfil.Title;
    } else if (perfil.Name) {
      return e.Name === perfil.Name;
    }
    if (index_ele > -1) return true;
    return false;
  });
  return resultado;
};

// Devuelve las categorias, UNICAS
Array.prototype.getCategorias = function () {
  var array_aux = Array();
  this.forEach(function (element) {
    if (element.Categories) {
      element.Categories.forEach(function (cat) {
        // Añadimos el elemento
        array_aux.push(cat);
      });
    }
  });
  // Vemos si esta repetido
  var array_unique = array_aux.filter(function (e, i, a) {
    var ele = e;
    var index_ele = a.findIndex(function (item, i) {
      return item.Path === ele.Path;
    });
    // Repetido si
    if (index_ele === i) return true;
    // Repetido no
    return false;
  });
  console.log("<-- getCategorias");
  console.log(array_unique);
  return array_unique;
};

// Devuelve las clasificaciones, UNICAS
Array.prototype.getClasificaciones = function () {
  var array_aux = Array();
  this.forEach(function (element) {
    if (element.Clasificacion) {
      element.Clasificacion.forEach(function (cat) {
        // Añadimos el elemento
        array_aux.push(cat);
      });
    }
  });
  var array_unique = array_aux.filter(function (e, i, a) {
    var ele = e;
    // Vemos si esta repetido
    var index_ele = a.findIndex(function (item, i) {
      return item.Path === ele.Path;
    });
    // Repetido si
    if (index_ele === i) return true;
    // Repetido no
    return false;
  });
  // Devolvemos el array
  //console.log("<-- getClasificaciones");
  //console.log(array_unique);
  return array_unique;
};

// Devuelve las clasificaciones, UNICAS
Array.prototype.sortClasificaciones = function () {
  var array_aux = Array();
  var props = arguments;
  //return res= this.sort((a,b) => {
  return this.sort(function (a, b) {
    var a_pos = clasificacionesPrioridad.findIndex(function (ele) {
      return ele === a.Name;
    });
    var b_pos = clasificacionesPrioridad.findIndex(function (ele) {
      return ele === b.Name;
    });
    if (a_pos == -1) return 1;
    if (b_pos == -1) return -1;
    if (a_pos < b_pos) return -1;
    if (a_pos > b_pos) return 1;
    return 0;
  });
};

// Devuelve el contenido de 1 clasificacion determinada
Array.prototype.getClasificacion = function (clasificacion) {
  //Obtenemos los elementos con esa clasificacion
  return this.filter(function (e, i, a) {
    var ele = e;
    // Vemos si esta repetido
    var index_ele = e.Clasificacion.findIndex(function (item, i) {
      return item.Path === clasificacion.Path;
    });
    // Repetido si
    if (index_ele > -1) return true;
    // Repetido no
    return false;
  });
};

// Devuelve las clasificaciones, UNICAS
Array.prototype.sortAccesos = function () {
  var array_aux = Array();
  var props = arguments;
  return this.sort(function (a, b) {
    var a_pos = a.NavPos;
    var b_pos = b.NavPos;
    if (a_pos < b_pos) return 1;
    if (a_pos > b_pos) return -1;
    return 0;
  });
};

async function loadJSONMiPortal(url) {
  // Funcion que hace un fetch y aplica el filtro (que le hemos metido) a los datos

  // Pillamos los datos y lo devolvemos con un await, como tiene que ser
  return await fetch(url).then(function (respuesta) {
    // Si responde ok, hacemos pop
    if (respuesta.ok) return respuesta.json();
  }).then(function (respuestaJSON) {
    return respuestaJSON;
  });
}

/** FUNCION CARGA CONTENIDOS  */
async function loadContent(data) {
  contenidoObject = new GruposMiPortal();
  contenidoObject.datos = data;
  // Y una vez acabado el cuento, lo metemos en el DOM, DURUMDUMDUMDUDM
  document.getElementById('contenido').appendChild(contenidoObject);
  // Miramos los perfiles
  var perfiles = data.getPerfiles();
  // Creamos el objeto perfiles
  perfilesObject = new PerfilesMiPortal();
  perfilesObject.contenido(perfiles);
  // Metemos el objeto en el DOM
  document.getElementById('perfiles').appendChild(perfilesObject);
}

