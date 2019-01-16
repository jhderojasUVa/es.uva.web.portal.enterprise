"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var estudios_jsonp = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new Promise(function (resolve, reject) {
              var script = document.createElement('script');
              var name = "_jsonp_" + Math.round(100000 * Math.random());
              //url formatting
              if (url.match(/\?/)) url += "&callback=" + name;else url += "?callback=" + name;
              script.src = url;
              window[name] = function (data) {
                resolve(data);
                document.body.removeChild(script);
                delete window[name];
              };
              document.body.appendChild(script);
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function estudios_jsonp(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Creamos el setting basico de arranque con todo a 0
var filtroEstudios = {
  clase: 0,
  campus: 0,
  rama: 0,
  tipolearning: 0,
  tipo: 0
};

var loadEstudios = 0;

var listadoCampus = [{ "id": "0", "desc": "Todos los campus" }, { "id": "47", "desc": 'Valladolid' }, { "id": "34", "desc": "Palencia" }, { "id": "40", "desc": "Segovia" }, { "id": "42", "desc": "Soria" }];

// Creamos el contenedor de los estudios
var estudios = Array();

function estudios_respuesta(data) {
  // Funcion para insertar los estudios en el array de estudios
  if (data.response && data.response.numFound > 0 && data.response.docs) {
    // Si hay estudios
    var theResponse = data.response.docs;
    // Ordenamos
    theResponse.sort(function (elemA, elemB) {
      // por campus de menor a mayor numero de campus
      return parseInt(elemA["ficha.campus_prop"]) - parseInt(elemB["ficha.campus_prop"]);
    });
    // Recorremos
    theResponse.forEach(function (doc) {
      //Miramos el tipo, especialmente para los Solr. La idea es transformar un texto a un número
      if (doc.type) {
        switch (doc.type) {
          case "estudios":
            switch (doc["campo.tipo_prop"]) {
              case "1":
                doc.tipo = 1;
                break;
              case "2":
                doc.tipo = 2;
                break;
            }
            //console.log(doc);
            break;
          case "doctorado":
            doc.tipo = 3;
            break;
          case "titulos":
            doc.tipo = 4;
            break;
          case "cursos":
            doc.tipo = 5;
            break;
          default:
            break;
        }
      }
      // Y los metemos
      estudios.push(doc);
    });
  } else {
    // Si no hay estudios mostramos un error
    throw "Error en la lectura de los estudios";
  }

  loadEstudios = loadEstudios + 1;
  if (loadEstudios > 3) {
    //Ocultamos el loadin
    showhide("estudios_loader");
    //Mostramos la caja
    showhide("estudios_content");
  }
}

var Estudio = function (_HTMLElement) {
  _inherits(Estudio, _HTMLElement);

  _createClass(Estudio, null, [{
    key: "is",
    get: function get() {
      return 'el-estudio';
    }
  }]);

  function Estudio() {
    _classCallCheck(this, Estudio);

    try {
      var _this = _possibleConstructorReturn(this, (Estudio.__proto__ || Object.getPrototypeOf(Estudio)).call(this));
    } catch (e) {
      // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento del estudio " + e;
    } finally {
      // Creamos el shadow del elemento
      var shadowRoot = _this.attachShadow({ mode: 'open' });
    }
    return _this;
  }

  _createClass(Estudio, [{
    key: "connectedCallback",
    value: function connectedCallback() {}
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {}
  }, {
    key: "adoptedCallback",
    value: function adoptedCallback() {}
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {}
  }, {
    key: "doc",
    set: function set(val) {
      // Seteamos el valor del elemento
      if (val) {
        // Si hay valor en el .doc del elemento...
        var html = '';
        if (val["campo.tipo_prop"] == 1 || val["campo.tipo_prop"] == 2) {
          // El campus, el campus
          // Bueno ya no porque esta ordenado
          var campus = dimeCampus(val["ficha.campus_prop"]);
          // Creamos el elemento en si por dentro con toda su maraña
          // Con campus
          console.log(val.Title_prop);
          html += '<p id="' + val.id + '"><a href="http://www.uva.es' + val.link + '" target="_blank" role="link">' + val.Title_prop.replace('(PA)', '').replace('(SG)', '').replace('(SO)', '') + '</a></p>';
        } else if (val["campo.tipo_prop"] == 3) {
          html += '<p id="' + val.COD_PROGRAMA + '"><a href="#" target="_blank" role="link">' + val.DENOMINACION + '</a></p>';
        } else if (val["campo.tipo_prop"] == 4) {
          html += '<p id="' + val.IdCurso + '"><a href="#" target="_blank" role="link">' + val.DesCur + '</a></p>';
        }
        // Esto es una chapuza para los CSS, lo ideal es hacer un @import pero eso al final
        var thecss = '<style>:host { }:host p { font-size: 0.9rem; line-height: 1; margin-left: 0.5em; }:host p a { text-decoration: none; color: rgba(55, 55, 55, 0.8);}:host p a:hover { text-decoration: underline; }</style>';
        // Fin de la chapuza que ahora la hago mas gorda metiendo a mala leche
        this.shadowRoot.innerHTML = thecss + html;
      }
    }
  }]);

  return Estudio;
}(HTMLElement);

customElements.define(Estudio.is, Estudio);

function estudios_clear() {
  // Limpiamos el elemento que contiene los estudios
  // Primero buscamos el contenido que esta en el id "estudios_contenido"
  var div = document.getElementById('estudios_contenido');
  while (div.firstChild) {
    // Del todo, lo quitamos del todo
    div.removeChild(div.firstChild);
  }
}

function estudios_show(name) {
  // Mostramos el elemento "name" cambiandole los CSS de escondido a no
  var el = document.getElementById(name);
  if (el.style.display === "none") {
    el.style.display = "";
  }
}

function estudios_hide(name) {
  // Escondemos el elemento "name" cambiando los CSS de no a escondido
  var el = document.getElementById(name);
  if (el.style.display !== "none") {
    el.style.display = "none";
  }
}

function showhide(name) {
  // Funcion para mostrar y esconder una capa
  var div = document.getElementById(name);
  if (div.style.display !== "none") {
    div.style.display = "none";
  } else {
    div.style.display = "";
  }
}

function estudios_filtro_element(elemento) {

  // Funcion que hace el filtrado
  // Devuelve true si filta por esa "cosa"
  // Devuelve false si no ha de filtrar por esa cosa

  // Esto huele a que se tipo y clase son lo mismo salvo que en algun lado no se cambia y peta
  // asi que eliminamos 1 y listo calisto
  /*if (filtroEstudios.clase != 0) {
    if (elemento["campo.tipo_prop"] != filtroEstudios.clase) return false;
  }*/
  if (filtroEstudios.campus != 0) {
    if (elemento["ficha.campus_prop"] != filtroEstudios.campus) return false;
  }
  if (filtroEstudios.rama != 0) {
    if (elemento["ficha.rama_prop"] != filtroEstudios.rama) return false;
  }
  if (filtroEstudios.tipolearning != 0) {
    if (elemento["ficha.tipolearning_prop"] != filtroEstudios.tipolearning) return false;
  }
  if (filtroEstudios.tipo != 0) {
    if (elemento["tipo"] != filtroEstudios.tipo) return false;
  }
  return true;
}

function estudios_filtro() {
  // Crea los estudios (los elementos) y les asigna el contenido filtrado (o no)
  var elementos = estudios.filter(estudios_filtro_element);

  // Ordenamos
  elementos.sort(function (a, b) {
    if (a.DesCur < b.DesCur || a.DENOMINACION < b.DENOMINACION) {
      return -1;
    }
    if (a.DesCur > b.DesCur || a.DENOMINACION > b.DENOMINACION) {
      return 1;
    }
    return 0;
  });
  // Primero limpiamos
  estudios_clear();

  var divElementCampus;
  var numCampus = []; //Almacena los campus con más de un elemento

  listadoCampus.forEach(function (campus) {

    var elementos_campus = elementos.filter(function (elemento) {
      return elemento["ficha.campus_prop"] === campus.id;
    });

    if (elementos_campus.length > 0) {
      numCampus.push(campus.id);
      var titleCampus = document.createElement('h2');

      /*if (campus.id == 0) {
        titleCampus.innerHTML = campus.desc +' <i class="fas fa-angle-down" style="float: right"></i>';
      } else {
        titleCampus.innerHTML = '<a onclick="showHide(\''+"oferta_campus_"+ campus.id +'\')">' +campus.desc +'</a> <i class="fas fa-angle-down" style="float: right"></i>';
      }*/

      titleCampus.innerHTML = '<a onclick="showHide(\'' + "oferta_campus_" + campus.id + '\')">' + campus.desc + '</a> <i class="fas fa-angle-down" style="float: right"></i>';

      titleCampus.setAttribute('class', 'campus');
      document.getElementById('estudios_contenido').appendChild(titleCampus);

      divElementCampus = document.createElement('div');
      divElementCampus.setAttribute('id', 'oferta_campus_' + campus.id);
      divElementCampus.setAttribute('class', 'hideElement');
      document.getElementById('estudios_contenido').appendChild(divElementCampus);

      var _elementos_campus = elementos.filter(function (elemento) {
        return elemento["ficha.campus_prop"] === campus.id;
      });

      _elementos_campus.forEach(function (doc) {
        // Creamos los elementos
        var element = new Estudio();
        element.doc = doc;

        // Metemos el contenido en el div que tiene como id el campus!
        document.getElementById('oferta_campus_' + campus.id).appendChild(element);
      });
    }
  });

  if (numCampus.length == 1) {
    showHide("oferta_campus_" + numCampus[0], false);
  }

  if (filtroEstudios.tipo == 1 || filtroEstudios.tipo == 2) {
    //Mostramos los filtros
    estudios_show("filtro");
  } else {
    estudios_hide("filtro");
  }
}

function estudios_estilos() {
  // Modificamos los estilos de los botones
  // Primero se limpian de active los filtros
  // Cambiamos a un queryselectorall para que seleccione todo
  var elements = document.querySelectorAll('.btn.azul_blanco.active');

  for (var i = 0; i < elements.length; i++) {
    // Hacer un remove tarda menos que hacer un classname entero
    elements[i].classList.remove('active');
  }

  // Y los botones principales
  var other_elements = document.getElementsByClassName('nav-link tab azul_blanco active');
  for (var _i = 0; _i < other_elements.length; _i++) {
    other_elements[_i].classList.remove('active');
  }

  // Cambio segun el tipo de estudios (Grados, Masteres, Doctorado...)
  switch (filtroEstudios.tipo) {
    case 1:
      document.getElementById("btnGrados").className = "nav-link tab azul_blanco active";
      break;
    case 2:
      document.getElementById("btnMasteres").className = "nav-link tab azul_blanco active";
      break;
    case 3:
      document.getElementById("btnDoctorado").className = "nav-link tab azul_blanco active";
      break;
    case 4:
      document.getElementById("btnTitulos").className = "nav-link tab azul_blanco active";
      break;
    case 5:
      document.getElementById("btnFormacion").className = "nav-link tab azul_blanco active";
      break;
  }

  /*
  switch(filtroEstudios.campus) {
    case 0:
      document.getElementById("btnCampusTodos").className = "btn azul_blanco active";
      break
    case 47:
      document.getElementById("btnCampusVa").className = "btn azul_blanco active";
      break;
    case 34:
      document.getElementById("btnCampusPa").className = "btn azul_blanco active";
      break;
    case 40:
      document.getElementById("btnCampusSe").className = "btn azul_blanco active";
      break;
    case 42:
      document.getElementById("btnCampusSo").className = "btn azul_blanco active";
      break;
  }
  */

  // Cambio segun el tipo de estudios (Todos, Ciencias, Arte, Salud...)
  switch (filtroEstudios.rama) {
    case 0:
      document.getElementById("btnTodasRamas").className = "btn azul_blanco active";
      break;
    case 1:
      document.getElementById("btnAreaArtes").className = "btn azul_blanco active";
      break;
    case 2:
      document.getElementById("btnAreaCiencias").className = "btn azul_blanco active";
      break;
    case 3:
      document.getElementById("btnAreaSalud").className = "btn azul_blanco active";
      break;
    case 4:
      document.getElementById("btnAreaSociales").className = "btn azul_blanco active";
      break;
    case 5:
      document.getElementById("btnAreaIngenieria").className = "btn azul_blanco active";
      break;
  }

  // Cambio segun la forma de estudio (Todos, Presencial, Semi...)
  switch (filtroEstudios.tipolearning) {
    case 0:
      document.getElementById("btnTipoTodos").classList.add('active');
      break;
    case 1:
      document.getElementById("btnTipoPresencial").classList.add('active');
      break;
    case 2:
      document.getElementById("btnTipoSemipresencial").classList.add('active');
      break;
    case 3:
      document.getElementById("btnTipoVirtual").classList.add('active');
      break;
  }
}

function dimeCampus(idcampus) {
  // Funcion que devuelve el nombre del campus
  var campus = '';
  switch (parseInt(idcampus)) {
    case 47:
      campus = 'Valladolid';
      break;
    case 34:
      campus = 'Palencia';
      break;
    case 40:
      campus = 'Segovia';
      break;
    case 42:
      campus = 'Soria';
      break;
    default:
      campus = 'Todos los campus';
      break;
  }
  return campus;
}

function showHide(elementId) {
  var changearrow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  // Funcion que muestra oculta un div y modifica el selector

  var element = document.getElementById(elementId);

  if (element.classList.contains('showElement')) {
    // Ocultamos
    // Mostramos la flecha gorda
    if (changearrow) {
      this.event.target.nextElementSibling.className = 'fas fa-angle-down';
      this.event.target.nextElementSibling.style = 'color: rgba(55, 55, 55, 0.8); float: right';
    }
    // Ocultamos la capa
    element.classList.remove('showElement');
    element.classList.add('hideElement');
  } else {
    // Mostramos
    // Cambiamos la flecha
    if (changearrow) {
      this.event.target.nextElementSibling.className = 'fas fa-angle-up';
      this.event.target.nextElementSibling.style = 'color: rgba(0, 0, 0, 0.3); float: right';
    }
    // Mostamos la capa
    element.classList.remove('hideElement');
    element.classList.add('showElement');
  }
}

document.addEventListener("DOMContentLoaded", function () {
  //index=Solr%20Offline
  // Peticion de Grados
  var data = estudios_jsonp("http://www-des.uva.es/opencms/handleSolrSelect?rows=2000&fq=type:estudios&wt=json&json.wrf=estudios_respuesta");
  data.then(function (res) {
    estudios_respuesta(res);
  });

  // Peticion de Doctorado
  data = estudios_jsonp("http://www-des.uva.es/system/modules/es.uva.web.portal.enterprise/elements/doctorado/doctorado.jsp");
  data.then(function (res) {
    estudios_respuesta(res);
  });

  // Peticion de Titulos Propios
  data = estudios_jsonp("http://www-des.uva.es/system/modules/es.uva.web.portal.enterprise/elements/titulos/titulos.jsp");
  data.then(function (res) {
    estudios_respuesta(res);
  });

  // Peticion de Cursos
  var data = estudios_jsonp("http://www-des.uva.es/opencms/handleSolrSelect?rows=2000&fq=type:cursos&wt=json&json.wrf=estudios_respuesta");
  data.then(function (res) {
    estudios_respuesta(res);
  });

  /*************
   * BOTONES PRINCIPALES
   *************/
  // Seccion de Grados, Master
  document.getElementById('btnGrados').onclick = function () {
    filtroEstudios.tipo = 1;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnMasteres').onclick = function () {
    filtroEstudios.tipo = 2;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnDoctorado').onclick = function () {
    filtroEstudios.clase = 3;
    filtroEstudios.campus = 0;
    filtroEstudios.rama = 0;
    filtroEstudios.tipolearning = 0;
    filtroEstudios.tipo = 3;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnTitulos').onclick = function () {
    filtroEstudios.clase = 4;
    filtroEstudios.campus = 0;
    filtroEstudios.rama = 0;
    filtroEstudios.tipolearning = 0;
    filtroEstudios.tipo = 4;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnFormacion').onclick = function () {
    filtroEstudios.clase = 0;
    filtroEstudios.campus = 0;
    filtroEstudios.rama = 0;
    filtroEstudios.tipolearning = 0;
    filtroEstudios.tipo = 5;
    console.log(filtroEstudios);
    estudios_filtro();
    estudios_estilos();
  };

  /*************
   * BOTONES FILTRO
   *************/
  // Filtro para campus
  /*
  document.getElementById('btnCampusTodos').onclick = function(){
    filtroEstudios.campus = 0;
    estudios_filtro();
    estudios_estilos();
  };
   document.getElementById('btnCampusVa').onclick = function(){
    filtroEstudios.campus = 47;
    estudios_filtro();
    estudios_estilos();
  };
   document.getElementById('btnCampusPa').onclick = function(){
    filtroEstudios.campus = 34;
    estudios_filtro();
    estudios_estilos();
  };
   document.getElementById('btnCampusSe').onclick = function(){
    filtroEstudios.campus = 40;
    estudios_filtro();
    estudios_estilos();
  };
   document.getElementById('btnCampusSo').onclick = function(){
    filtroEstudios.campus = 42;
    estudios_filtro();
    estudios_estilos();
  };
  */

  // Filtro para Ramas de Estudio
  document.getElementById('btnTodasRamas').onclick = function () {
    filtroEstudios.rama = 0;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnAreaArtes').onclick = function () {
    filtroEstudios.rama = 1;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnAreaCiencias').onclick = function () {
    filtroEstudios.rama = 2;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnAreaSalud').onclick = function () {
    filtroEstudios.rama = 3;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnAreaSociales').onclick = function () {
    filtroEstudios.rama = 4;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnAreaIngenieria').onclick = function () {
    filtroEstudios.rama = 5;
    estudios_filtro();
    estudios_estilos();
  };

  // Filtro para tipos de estudio (presencial y tal)
  document.getElementById('btnTipoTodos').onclick = function () {
    filtroEstudios.tipolearning = 0;
    estudios_filtro();
    estudios_estilos();
  };

  if (document.getElementById('btnTipoPresencial')) {
    document.getElementById('btnTipoPresencial').onclick = function () {
      filtroEstudios.tipolearning = 1;
      estudios_filtro();
      estudios_estilos();
    };
  }

  if (document.getElementById('btnTipoSemipresencial')) {
    document.getElementById('btnTipoSemipresencial').onclick = function () {
      filtroEstudios.tipolearning = 2;
      estudios_filtro();
      estudios_estilos();
    };
  }

  if (document.getElementById('btnTipoVirtual')) {
    document.getElementById('btnTipoVirtual').onclick = function () {
      filtroEstudios.tipolearning = 3;
      estudios_filtro();
      estudios_estilos();
    };
  }
});