"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function jsonp(url) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    var name = "_jsonp_" + Math.round(100000 * Math.random());
    //url formatting
    if (url.match(/\?/)) url += "&json.wrf=" + name;else url += "?json.wrf=" + name;
    script.src = url;
    window[name] = function (data) {
      resolve(data);
      document.body.removeChild(script);
      delete window[name];
    };
    document.body.appendChild(script);
  });
}

var Noticia = function (_HTMLElement) {
  _inherits(Noticia, _HTMLElement);

  _createClass(Noticia, null, [{
    key: "is",
    get: function get() {
      return 'noticia-basic';
    }
  }]);

  function Noticia(self) {
    var _this, _ret;

    _classCallCheck(this, Noticia);

    self = (_this = _possibleConstructorReturn(this, (Noticia.__proto__ || Object.getPrototypeOf(Noticia)).call(this, self)), _this);
    self._doc = undefined;
    var shadowRoot = self.attachShadow({ mode: 'open' });
    self.setAttribute('class', 'col-12 col-xs-12 col-sm-12 col-md-4');
    return _ret = self, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Noticia, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.addEventListener('click', this.onclick);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.removeEventListener('click', this.onclick);
    }
  }, {
    key: "adoptedCallback",
    value: function adoptedCallback() {}
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {}
  }, {
    key: "doc",
    set: function set(val) {
      this._doc = val;
    }

    /*onclick(event)  {
      if (event.target === this) {
        event.stopImmediatePropagation();
        event.preventDefault();
        //http://eventos.uva.es/ID/detail.html
        console.log(this._doc);
        let url="http://comunicacion.uva.es/"+this._doc.link;
        window.open(url, "_blank");
      }
    }*/

  }]);

  return Noticia;
}(HTMLElement);

customElements.define(Noticia.is, Noticia);

var NoticiaTexto = function (_Noticia) {
  _inherits(NoticiaTexto, _Noticia);

  _createClass(NoticiaTexto, null, [{
    key: "is",
    get: function get() {
      return 'noticia-texto';
    }
  }]);

  function NoticiaTexto(self) {
    var _this2, _ret2;

    _classCallCheck(this, NoticiaTexto);

    self = (_this2 = _possibleConstructorReturn(this, (NoticiaTexto.__proto__ || Object.getPrototypeOf(NoticiaTexto)).call(this, self)), _this2);
    _this2.setAttribute('class', 'col-12 col-xs-12 col-sm-12 col-md-4 noticia_texto');
    return _ret2 = self, _possibleConstructorReturn(_this2, _ret2);
  }

  _createClass(NoticiaTexto, [{
    key: "doc",
    set: function set(val) {
      if (val) {
        var html = '';
        html += "<style>\n        h1 {font-size: 1.5em;font-weight: bold; color: rgba(12 ,12 ,12, 0.9); line-height: 1.2; transition: all 0.3s; font-family: \"Lato\", sans-serif;}\n        h1 a { color: rgba( 12, 12, 12, 0.8); text-decoration: none; }\n\t\th1 a:hover { text-decoration: none; color: rgba(12, 12, 12, 0.7); }\n\t\tp {font-size: 1em; color: rgba(0, 0, 0, 0.8); transition: all 0.3s;}\n\t\th1:hover, h1 p:hover { color: rgba(0, 0, 0, 0.6);}\n\t\th1:hover p, p:hover { color: rgba (0, 0, 0, 0.5);}\n        </style>";
        if (val.Title_prop) {
          html += ' <h1><a href="http://comunicacion.uva.es' + val.link + '" target="_blank" role="link" rel="noopener noreferrer">' + val.Title_prop + '</a></h1>';
        }
        if (val.Subtitle_prop) {
          html += ' <p>' + val.Subtitle_prop + '</p>';
        }
        this.shadowRoot.innerHTML = html;
      } else {
        this.removeAttribute('open');
      }
      this._doc = val;
    }
  }]);

  return NoticiaTexto;
}(Noticia);

customElements.define(NoticiaTexto.is, NoticiaTexto);

var NoticiaImagen = function (_Noticia2) {
  _inherits(NoticiaImagen, _Noticia2);

  _createClass(NoticiaImagen, null, [{
    key: "is",
    get: function get() {
      return 'noticia-imagen';
    }
  }]);

  function NoticiaImagen(self) {
    var _this3, _ret3;

    _classCallCheck(this, NoticiaImagen);

    self = (_this3 = _possibleConstructorReturn(this, (NoticiaImagen.__proto__ || Object.getPrototypeOf(NoticiaImagen)).call(this, self)), _this3);
    _this3.setAttribute('class', 'col-12 col-xs-12 col-sm-12 col-md-4 noticia_imagen');
    return _ret3 = self, _possibleConstructorReturn(_this3, _ret3);
  }

  _createClass(NoticiaImagen, [{
    key: "doc",
    set: function set(val) {
      // Reflect the value of the open property as an HTML attribute.
      if (val) {
        //this.setAttribute('open', '');
        //let html= '<div class="col-4 col-md-4 noticia_imagen">';
        var html = '  <div class="card">';
        if (val.Imagen_prop) {
          var url = val.Imagen_prop;
          html += '    <img src="' + url.replace("/sites/comunicacion", "http://comunicacion.uva.es") + '" class="card-img-top" width="100%">';
        }
        html += '    <div class="card-body">';
        if (val.Title_prop) {
          html += ' <h1>' + val.Title_prop + '</h1>';
        }
        if (val.Subtitle_prop) {
          html += ' <p>' + val.Subtitle_prop + '</p>';
        }
        html += '    </div>';
        html += '</div>';
        //html+='</div>';
        this.shadowRoot.innerHTML = html;
      } else {
        this.removeAttribute('open');
      }
      this._doc = val;
    }
  }]);

  return NoticiaImagen;
}(Noticia);

customElements.define(NoticiaImagen.is, NoticiaImagen);

var NoticiaBloque = function (_HTMLElement2) {
  _inherits(NoticiaBloque, _HTMLElement2);

  _createClass(NoticiaBloque, null, [{
    key: "is",
    get: function get() {
      return 'noticia-bloque';
    }
  }]);

  function NoticiaBloque(self) {
    var _this4, _ret4;

    _classCallCheck(this, NoticiaBloque);

    self = (_this4 = _possibleConstructorReturn(this, (NoticiaBloque.__proto__ || Object.getPrototypeOf(NoticiaBloque)).call(this, self)), _this4);
    _this4.setAttribute('class', 'col-12 col-xs-12 col-sm-12 col-md-4 noticia_imagen');
    return _ret4 = self, _possibleConstructorReturn(_this4, _ret4);
  }

  return NoticiaBloque;
}(HTMLElement);

customElements.define(NoticiaBloque.is, NoticiaBloque);

document.addEventListener("DOMContentLoaded", function () {
  //index=Solr%20Offline
  //var data = jsonp("http://127.0.0.1:8080/opencms/handleSolrSelect?index=Solr Offline&fq=type:noticias&fq=parent-folders:/sites/default&wt=json");
  var data = jsonp("http://comunicacion.uva.es/opencms/handleSolrSelect?rows=3&fq=campo.tipo_prop:(*1*)&fq=type:noticias&sort=released%20desc&wt=json");
  data.then(function (res) {

    if (res.response && res.response.numFound > 0) {
      res.response.docs.forEach(function (doc) {
        var noticia = new NoticiaTexto();
        if (doc.Imagen_prop !== undefined) {
          noticia = new NoticiaImagen();
        }
        noticia.doc = doc;

        //document.querySelector('.noticias').appendChild(noticia);
        document.getElementById('noticias').appendChild(noticia);
      });
    } else {}
  });
});