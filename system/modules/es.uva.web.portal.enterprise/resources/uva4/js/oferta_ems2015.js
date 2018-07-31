"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var filtroEstudios = {
  clase: 0,
  campus: 0,
  rama: 0,
  tipo: 0
};

var estudios = Array();

function estudios_jsonp(url) {
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
}

function estudios_respuesta(data) {
  if (data.response && data.response.numFound > 0 && data.response.docs) {
    data.response.docs.forEach(function (doc) {
      estudios.push(doc);
    });
  } else {}
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
    } catch (e) {} finally {
      //this.createShadowRoot();
      var shadowRoot = _this.attachShadow({ mode: 'open' });
      //this.setAttribute('class','col-4 col-md-4 slide');
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
      if (val) {
        var html = '';
        html += '<p id="' + val.id + '"><a href="http://www.uva.es' + val.link + '" target="_blank">' + val.Title_prop + '</a></p>';
        // Esto es una chapuza, lo ideal es hacer un @import pero eso al final
        var thecss = '<style>:host { text-transform: uppercase; }:host p { font-size: 0.9rem; line-height: 1;}:host p a { text-decoration: none; color: black;}:host p a:hover { text-decoration: underline; }</style>';
        // Fin de la chapuza que ahora la hago mas gorda metiendo a mala leche
        this.shadowRoot.innerHTML = thecss + html;
      }
    }
  }]);

  return Estudio;
}(HTMLElement);

customElements.define(Estudio.is, Estudio);

function estudios_clear() {
  //Limpuamos el elemento
  var div = document.getElementById('estudios_contenido');
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

function estudios_show(name) {
  var el = document.getElementById(name);
  if (el.style.display === "none") {
    el.style.display = "";
  }
}

function estudios_hide(name) {
  var el = document.getElementById(name);
  if (el.style.display !== "none") {
    el.style.display = "none";
  }
}

function estudios_filtro_element(elemento) {
  var res = true;
  if (filtroEstudios.clase != 0) {
    if (elemento["campo.tipo_prop"] != filtroEstudios.clase) return false;
  }
  if (filtroEstudios.campus != 0) {
    if (elemento["ficha.campus_prop"] != filtroEstudios.campus) return false;
  }
  if (filtroEstudios.rama != 0) {
    if (elemento["ficha.rama_prop"] != filtroEstudios.rama) return false;
  }
  if (filtroEstudios.tipo != 0) {
    if (elemento["ficha.tipolearning_prop"] != filtroEstudios.tipo) return false;
  }
  return true;
}

function estudios_filtro() {
  var elementos = estudios.filter(estudios_filtro_element);
  estudios_clear();
  //Añadimos los elementos
  elementos.forEach(function (doc) {
    var element = new Estudio();
    element.doc = doc;
    document.getElementById('estudios_contenido').appendChild(element);
  });

  if (filtroEstudios.clase == 1 || filtroEstudios.clase == 2) {
    //Mostramos los filtros
    estudios_show("filtro");
  }
}

function estudios_estilos() {
  //Modificamos los estilos de los botones
  var elements = document.getElementsByClassName('btn azul_blanco active');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('active');
  }
  elements = document.getElementsByClassName('nav-link tab azul_blanco active');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('active');
  }
  switch (filtroEstudios.clase) {
    case 1:
      document.getElementById("btnGrados").className = "nav-link tab azul_blanco active";
      break;
    case 2:
      document.getElementById("btnMasteres").className = "nav-link tab azul_blanco active";
      break;
  }
  switch (filtroEstudios.campus) {
    case 0:
      document.getElementById("btnCampusTodos").className = "btn azul_blanco active";
      break;
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
  switch (filtroEstudios.rama) {
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
  switch (filtroEstudios.tipo) {
    case 1:
      document.getElementById("btnTipoPresencial").className = "btn azul_blanco active";
      break;
    case 2:
      document.getElementById("btnTipoSemipresencial").className = "btn azul_blanco active";
      break;
    case 3:
      document.getElementById("btnTipoVirtual").className = "btn azul_blanco active";
      break;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  //index=Solr%20Offline
  var data = estudios_jsonp("http://www.uva.es/opencms/handleSolrSelect?rows=2000&fq=type:estudios&wt=json&json.wrf=estudios_respuesta");
  data.then(function (res) {
    estudios_respuesta(res);
  });

  /*************
   * BOTONES PRINCIPALES
   *************/
  document.getElementById('btnGrados').onclick = function () {
    filtroEstudios.clase = 1;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnMasteres').onclick = function () {
    filtroEstudios.clase = 2;
    estudios_filtro();
    estudios_estilos();
  };

  /*************
   * BOTONES FILTRO
   *************/
  document.getElementById('btnCampusTodos').onclick = function () {
    filtroEstudios.campus = 0;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnCampusVa').onclick = function () {
    filtroEstudios.campus = 47;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnCampusPa').onclick = function () {
    filtroEstudios.campus = 34;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnCampusSe').onclick = function () {
    filtroEstudios.campus = 40;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnCampusSo').onclick = function () {
    filtroEstudios.campus = 42;
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

  document.getElementById('btnTipoPresencial').onclick = function () {
    filtroEstudios.tipo = 1;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnTipoSemipresencial').onclick = function () {
    filtroEstudios.tipo = 2;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnTipoVirtual').onclick = function () {
    filtroEstudios.tipo = 3;
    estudios_filtro();
    estudios_estilos();
  };
});