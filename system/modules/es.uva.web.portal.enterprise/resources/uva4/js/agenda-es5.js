'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventoTexto = function (_HTMLElement) {
  _inherits(EventoTexto, _HTMLElement);

  _createClass(EventoTexto, null, [{
    key: 'is',
    get: function get() {
      return 'evento-texto';
    }
  }]);

  function EventoTexto(self) {
    var _this, _ret;

    _classCallCheck(this, EventoTexto);

    self = (_this = _possibleConstructorReturn(this, (EventoTexto.__proto__ || Object.getPrototypeOf(EventoTexto)).call(this, self)), _this);
    self._elem = undefined;
    var shadowRoot = self.attachShadow({ mode: 'open' });
    self.setAttribute('class', 'col-12 col-xs-12 col-sm-12 col-md-4  slide');
    return _ret = self, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EventoTexto, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.addEventListener('click', this.onclick);
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this.removeEventListener('click', this.onclick);
    }
  }, {
    key: 'adoptedCallback',
    value: function adoptedCallback() {}
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, oldValue, newValue) {}
  }, {
    key: 'onclick',
    value: function onclick(event) {
      // Metodo cuando haces click
      if (event.target === this) {
        event.stopImmediatePropagation();
        event.preventDefault();
        //URL destino: http://eventos.uva.es/ID/detail.html
        var url = "http://eventos.uva.es/" + this.elem.id + "/detail.html";
        window.open(url, "_blank");
      }
    }
  }, {
    key: 'elem',
    get: function get() {
      return this._elem;
    },
    set: function set(val) {
      if (val) {
        var date = new Date(val.date_ini.split(" ")[0]);
        var locale = "es-Es";
        var html = '';
        html += '\n      <style>/*\n      .agenda #agenda .bloque_agenda, #agenda #agenda .bloque_agenda {\n        height: 100px;\n        overflow: hidden; }\n\t\t*/\n      .va{\n        padding: 0.5em 1em;\n        border-radius: 4px;\n        background-color: #5534ae; \n      }\n      .va h1, .va p {\n        color: white !important; \n      }\n      .se {\n        padding: 0.5em 1em;\n        border-radius: 4px;\n        background-color: #ff9000; \n      }\n      .pa {\n        padding: 0.5em 1em;\n        border-radius: 4px;\n        background-color: #93198f; \n      }\n      .pa h1, .pa p {\n        color: white !important; \n      }\n      .so {\n        padding: 0.5em 1em;\n        border-radius: 4px;\n        background-color: #aad000; \n      }\n      .uva_azul {\n        padding: 0.5em;\n        border-radius: 4px;\n        background-color: #0e3675; \n      }\n      .uva_azul h1, .uva_azul p {\n        color: white !important; \n      }\n      .uva_rosa {\n        padding: 0.5em;\n        border-radius: 4px;\n        background-color: #ff8b92; \n      }\n\t  .va h1, .pa h1, .se h1, .so h1 {\n\t  \tfont-family: "Lato", Arial;\n\t\tfont-size: 4.5rem;\n\t\tfont-weight: 400;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\tpadding-right: 28px;\n\t\tmargin-right: 15px;\n\t\tmargin-top: -20px;\n\t\tmargin-bottom: -15px;\n\t  }\n\t  .va p, .pa p, .se p, .so p {\n\t  \tmargin: 0; \n\t\tfont-size: 0.8em; \n\t\theight: 90px; \n\t\toverflow: hidden; \n\t\ttext-overflow: ellipsis;\n\t  }\n\t  @media only screen and (max-width: 992px) {\n\t  \t.va h1, .pa h1, .se h1, .so h1 {\n\t\tfont-size: 2.5rem;\n\t\tmargin-top: 0.05rem;\n\t\tmargin-top: -15px;\n\t\tmargin-bottom: -10px;\n\t\t}\n\t\t\n\t\tva p, .pa p, .se p, .so p {\n\t  \t\tfont-size: 1em;\n\t\t\tline-height: 0.5;\n\t  \t}\n\t  }\n\t  \n\t  @media only screen and (max-width: 767px) {\n\t  \t.va h1, .pa h1, .se h1, .so h1 {\n\t\t\tfont-family: "Lato", Arial;\n\t\t\tfont-size: 4.5rem;\n\t\t\tfont-weight: 400;\n\t\t\tmargin: 0;\n\t\t\tpadding: 0;\n\t\t\tpadding-right: 28px;\n\t\t\tmargin-right: 15px;\n\t\t\tmargin-top: -20px;\n\t\t\tmargin-bottom: -15px;\n\t\t  }\n\t\t  .va p, .pa p, .se p, .so p {\n\t\t\tmargin: 0; \n\t\t\tfont-size: 0.8em; \n\t\t\theight: 90px; \n\t\t\toverflow: hidden; \n\t\t\ttext-overflow: ellipsis;\n\t\t  }\n\t  \n\t  }\n      </style>';
        // Seleccion del campus, esta en .campus_id en id o en .campus_name con el texto
        var clase = 'uva_rosa';

        if (val.campus_id != 0) {
          switch (val.campus_id) {
            case 188:
              // Valladolid
              clase = 'va';
              break;
            case 189:
              // Palencia
              clase = 'pa';
              break;
            case 190:
              // Segovia
              clase = 'se';
              break;
            case 191:
              // Soria
              clase = 'so';
              break;
          }
        } else {
          if (val.id % 2 == 0) {
            clase = "uva_azul";
          } else {
            clase = 'uva_rosa';
          }
        }
        // Comienzo del elemento
        html += '  <div class="' + clase + '" style="height: 135px; margin-bottom: 10px;">';
        // Completamos el elemento
        if (val.title) {
          html += '    <h1>' + date.getDate() + ' <small style="font-size: 0.3em; font-weight: 300; text-transform: capitalize;">' + date.toLocaleString(locale, { month: "long" }) + '</small></h1>';
        }
        if (val.title) {
          html += '    <p>' + val.title + ' ' + val.id + '</p>';
        }
        // Fin del elemento
        html += '  </div>';
        // Lo pintamos
        this.shadowRoot.innerHTML = html;
      } else {
        this.removeAttribute('open');
      }

      this._elem = val;
    }
  }]);

  return EventoTexto;
}(HTMLElement);

customElements.define(EventoTexto.is, EventoTexto);

var EventoSpan = function (_HTMLElement2) {
  _inherits(EventoSpan, _HTMLElement2);

  _createClass(EventoSpan, null, [{
    key: 'is',
    get: function get() {
      return 'evento-span';
    }
  }]);

  function EventoSpan() {
    _classCallCheck(this, EventoSpan);

    //var indice;
    //this.indice = indice;
    // El valor como lo carga al montar, no lo vamos a poner a 0 cuando contruimos el objeto que la cagamos
    // Vamos que teneoms que crear la propiedad del objeto tras crearle y asignarselo luego para que
    // en el primer montaje le meta el valor correcto
    //this.indice = 0;
    //this.createShadowRoot();
    var _this2 = _possibleConstructorReturn(this, (EventoSpan.__proto__ || Object.getPrototypeOf(EventoSpan)).call(this));

    var shadowRoot = _this2.attachShadow({ mode: 'open' });

    return _this2;
  }

  _createClass(EventoSpan, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.addEventListener('click', this.onclick);
      this.setAttribute('class', 'dot');
      this.setAttribute('indice', this.indice);
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this.removeEventListener('click', this.onclick);
    }
  }, {
    key: 'adoptedCallback',
    value: function adoptedCallback() {}
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, oldValue, newValue) {}

    // Como se lo cascamos desde fuera, el set y el get sooooooobran
    /*
     set indice(val) {
     	console.log('Val = '+ val);
    indice = val;
    console.log('indice = '+val);
    if (val) {
    	console.log('Hay val');
    	console.log('Indice indice : '+indice);
    	this.micaca = val;
    	//this.indice = val;
    } else {
    	console.log('NO Hay val');
    	//this.indice = 0;
    }
       //this.indice = val;
     }
      get indice() {
     	console.log('fffffff');
       //return this.indice;
     }
    */

  }, {
    key: 'onclick',
    value: function onclick(event) {
      // El click
      event.preventDefault();
      agendaoptions.slideIndex = this.indice;
      agendaoptions.automated = false;
      showSlide("agenda", agendaoptions);

      // Esto sobra pero te lo dejo porque asi yoquese y tal
      // Vamos que te quito esta morralla
      /*if (event.target === this) {
        event.stopImmediatePropagation();
        event.preventDefault();
        agendaoptions.slideIndex = this.indice;
      console.log(this.indice);
        agendaoptions.automated = false;
      agendaoptions.timing = 12000;
        showSlide("agenda", agendaoptions);
      }*/
    }
  }]);

  return EventoSpan;
}(HTMLElement);
//customElements.define(EventoSpan.is, EventoSpan,{ extends: 'span' });


customElements.define(EventoSpan.is, EventoSpan);

function eventos_jsonp(url) {
  // Funcion que inserta el JSON de una URL para el callback
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

document.addEventListener("DOMContentLoaded", function () {
  //index=Solr%20Offline
  var data = eventos_jsonp("http://www-des.uva.es/system/modules/es.uva.web.portal.enterprise/elements/eventos/eventos_proxy.jsp?dataType=jsonp");
  data.then(function (res) {
    var contador = 0;
    if (res.events && res.total_found > 0) {
      res.events.forEach(function (doc) {
        var evento = new EventoTexto();
        evento.elem = doc;
        document.getElementById('eventos_agenda').appendChild(evento);

        var eventodot = new EventoSpan();
        // Asi no, hay que crearla en el objeto a las malas
        //eventodot.indice = contador;
        // Asi si porque sino, no recibe bien la cantidad (el contador)
        // asi al crear la propiedad le insertamos ya el valor en ella
        Object.defineProperty(eventodot, 'indice', {
          enumerable: true,
          writable: true,
          value: contador
        });
        document.getElementById('eventos_dots').appendChild(eventodot);
        contador++;
      });
    } else {
      // Mostramos chicharra
      throw new Error('Error al crear la agenda');
    }

    // Llamamos al slide de la agenda con las opciones
    showSlide('agenda', agendaoptions);
  });
});