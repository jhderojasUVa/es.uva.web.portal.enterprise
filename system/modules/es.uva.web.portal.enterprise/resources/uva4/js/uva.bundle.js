/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';var _createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var UVaHeader=function(a){function b(){_classCallCheck(this,b);// Constructor
	try{for(var a,c,d=arguments.length,e=Array(d),f=0;f<d;f++)e[f]=arguments[f];// Si lo puedes crear
	a=_possibleConstructorReturn(this,(c=b.__proto__||Object.getPrototypeOf(b)).call.apply(c,[this].concat(e))),a}catch(a){// El error de turno
	throw'Error al crear el elemento header: '+a}finally{a._localedata='es';// Creamos el elemento, el shadow
	a.attachShadow({mode:'open'});a.shadowRoot.innerHTML='\n      <style>\n        @charset "UTF-8";\n        @import url("https://fonts.googleapis.com/css?family=Alegreya:300, 400, 500|Arvo:300, 400, 500|IM+Fell+English+SC:300, 400, 500|Lato:300, 400, 500|Libre+Franklin:300, 400, 500|Montserrat:300, 400, 500|Open+Sans:300, 400, 500|Raleway:300, 400, 500");\n        @import url(\'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css\');\n        @import url(\'https://use.fontawesome.com/releases/v5.6.3/css/all.css\');\n        .cabecera_uva {\n          background-color: #0b1f4a;\n          color: white;\n          font-size: 1.1em;\n        }\n        .cabecera_uva .row {\n        \theight: 52px;\n        }\n        @media only screen and (max-width: 769px) {\n        \t.cabecera_uva .row {\n      \t\t    height: 88px;\n      \t }\n        }\n        .cabecera_uva h1 {\n          color: white;\n          font-size: 26px;\n        }\n        .cabecera_uva a {\n          color: white;\n        }\n        .cabecera_uva a:hover {\n          color: white;\n          text-decoration: none;\n        }\n        .cabecera_uva .separador_left {\n          border-left: 1px solid #d2d2d2;\n          padding-left: 0.5em;\n        }\n        .cabecera_uva .separador_right {\n          border-right: 1px solid #d2d2d2;\n          padding-right: 0.5em;\n        }\n        .cabecera_uva .text-menu {\n          font-size: 10px;\n          width: 80px;\n        }\n      </style>\n      <div class="container-full cabecera_uva">\n        <div class="container">\n          <div class="row align-items-center">\n            <div class="col-md-1 text-left d-none d-md-block d-lg-block">\n              <a href="http://www.uva.es" role="link" alt="Inicio" aria-label="Inicio"><i class="fas fa-home"></i></a>\n            </div>\n            <div class="col-md-4 text-center">\n      \t\t\t\t<img alt="Universidad de Valladolid" src="./img/uva_logo.svg" srcset="./img/uva_logo.svg" />\n      \t\t\t</div>\n            <div class="col-md-7 text-right">\n              <span class="separador_left"><a href="http://directorio.uva.es/inicio"><span class="text-menu">Directorio</span><img alt="Seleccionar idioma" src="./img/address-book.svg" srcset="./img/address-book.svg" width="20" style="margin-left: 0.3em;"/></a></span>\n      \t\t\t  <span class="separador_left"><a href="http://miportal.uva.es"><span class="text-menu" style="display: inline-block; width: 60px; margin-top: 5px;">Comunidad</span> <i class="fas fa-lock"></i></a></span>\n              <span class="separador_left"><a alt="Buscador" aria-label="Buscador" href="#" role="link"><i class="fas fa-search"></i></a></span>\n            </div>\n          </div>\n        </div>\n      </div>\n      '}return a}return _inherits(b,a),_createClass(b,null,[{key:'is',get:function a(){return'uva-header'}}]),b}(HTMLElement);customElements.define(UVaHeader.is,UVaHeader);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';var _get=function a(b,c,d){null===b&&(b=Function.prototype);var e=Object.getOwnPropertyDescriptor(b,c);if(e===void 0){var f=Object.getPrototypeOf(b);return null===f?void 0:a(f,c,d)}if('value'in e)return e.value;var g=e.get;return void 0===g?void 0:g.call(d)},_createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var UVaNavegacion=function(a){function b(){_classCallCheck(this,b);// Constructor
	try{for(var a,c,d=arguments.length,e=Array(d),f=0;f<d;f++)e[f]=arguments[f];a=_possibleConstructorReturn(this,(c=b.__proto__||Object.getPrototypeOf(b)).call.apply(c,[this].concat(e))),a}catch(a){// Si no somos capaces de cargar al padre, error
	throw'Error al crear el elemento navegacion '+a}finally{a._uridata=void 0,a._data=void 0,a._localedata='es',a._data_locale=void 0,a._onlyone=!1,a._startLevel=0,a._levels=99,a._lastmenu=void 0,a._onclick=a._onclick.bind(a),a._onenter=a._onenter.bind(a),a._onover=a._onover.bind(a),a._onleave=a._onleave.bind(a),a._find_element=a._find_element.bind(a),a._find_element_byid=a._find_element_byid.bind(a);// Creamos el shadow del elemento
	a.attachShadow({mode:'open'});a.shadowRoot.innerHTML='\n      <style>\n        /* Contenedor generico total */\n        :host {\n          padding: 0;\n          margin: 0;\n        }\n      </style>\n      '}return a}return _inherits(b,a),_createClass(b,null,[{key:'is',get:function a(){return'uva-navegacion'}}]),_createClass(b,[{key:'connectedCallback',value:function b(){var a=this;this.getAttribute('onlyone')&&(this._onlyone=!0),this._uridata=this.getAttribute('data')?this.getAttribute('data'):'/ws/menu.json',this.getAttribute('uri')&&(this._uri=this.getAttribute('uri')),this.getAttribute('startLevel')&&(this._startLevel=parseInt(this.getAttribute('startLevel'))),this.getAttribute('levels')&&(this._levels=this.getAttribute('levels')),this.getAttribute('locale')&&(this._localedata=this.getAttribute('locale')),this.addEventListener('nav_click',this._onclick),this.addEventListener('nav_enter',this._onenter),this.addEventListener('nav_leave',this._onleave),loadJSON(this._uridata).then(function(b){a.data=b})}},{key:'disconnectedCallback',value:function a(){this.removeEventListener('nav_click',this._onclick),this.removeEventListener('nav_enter',this._onenter),this.removeEventListener('nav_leave',this._onleave)}},{key:'adoptedCallback',value:function a(){}},{key:'attributeChangedCallback',value:function d(a,b,c){'locale'===a&&(this._localedata=c),this._render_tree()}},{key:'_render_tree',value:function f(){// Pintamos el arbol
	// Empezamos desde cero
	var a=void 0,b=void 0,c=this._localedata;// Buscamos la URI y definimos variables a "nada"
	// Cargamos el locale en una variable
	// Si no hay datos o no hay URI, unos apaños
	if(void 0!==this._data){// Si hay URI y no es el raiz... hay que empezar por ahi
	if(void 0===this._uri&&(this._uri='/'),void 0!==this._data&&void 0!==this._localedata&&(b=this._data.find(function(a){return a.locale===c}),this._data_locale=b.elements),0===this._startLevel&&(b=this._data,void 0!==this._data&&(b=this._data.find(function(a){// Devolvemos el locale para que los carge al cambiar este
	return a.locale===c}),this._data_locale=b.elements,b=this._data_locale)),void 0!==this._uri&&'/'!==this._uri&&0<this._startLevel){//Si es vacio hay un error
	if(b=this._data_locale.find(this._find_element),void 0===b)return void console.warn('--- Elemento de la URI '+this._uri+' no encontrado');// Vemos el nivel y los elementos
	// Los recorremos
	for(parseInt(b.navTree)===parseInt(this._startLevel)-1&&(a=b.elements);b&&b.elements&&0<b.elements.length;){var g=b.elements.find(this._find_element);if(void 0!==g)b=g,parseInt(b.navTree)===parseInt(this._startLevel)-1&&(a=b.elements);else break}//Tenemos el elemento de nivel 1
	}// Si no empezamos de cero
	if(!(0<this._startLevel))a=this._data_locale;else// Estamos en un subarbol. Lo construimos a partir del actual
	if(void 0===b)return;var d={id:'navbarNav',elements:a,navTree:0// Definidos los datos, definimos el donde lo metemos
	},e=this.shadowRoot.getElementById('navbarNav');this._render_tree_element(d,e,'pc',!0)}// Y creamos el arbol segun para que
	}},{key:'_render_tree_element',value:function f(a){var b=!!(3<arguments.length&&void 0!==arguments[3])&&arguments[3],c=!(4<arguments.length&&void 0!==arguments[4])||arguments[4],d=!!(5<arguments.length&&void 0!==arguments[5])&&arguments[5],e=void 0;// Dibuja un nivel determinado
	// element = elemento de los datos
	// eldiv = div donde lo pinta
	// type =
	// first = si es el primer elemento (false)
	// last = si es el ultimo elemento (true)
	// child = si es un hijo
	// Si no es el ultimo... ponemos el last a false
	// Devolvemos el elemento
	return a.navTree<this._startLevel+this._levels-1&&(c=!1),a.elements&&0<a.elements.length&&!c?(e=new UVaNavegacionMenu,e.last=c,e.child=d,e.data=a,b?e.expanded=!0:e.style.display='none'):!d&&(e=new UVaNavegacionElemento,e.last=c,e.child=d,e.data=a,!b&&(e.style.display='none')),e}},{key:'_onclick',value:function c(a){// Evento de si hace click devolvemos a que hace click
	var b=a.composedPath()[0];return b}},{key:'_onenter',value:function c(a){// Evento de si entra (pulsa enter) a que lo hace
	var b=a.composedPath()[0];return b}},{key:'_onover',value:function c(a){// Evento del mouse over de si pone el raton encima a que
	var b=a.composedPath()[0];return b}},{key:'_onleave',value:function b(a){a.composedPath()[0];//console.log("--> _onleave ",el," Detail ",el.detail);
	}},{key:'_find_element',value:function g(a){//console.log("--> _find_element ","element ",element," index ",index," array ", array);
	//console.log("--- _find_element URI ELEMENTO ",element.href, " BUSCADA ", this._uri);
	if(void 0!==this._uri&&'/'!==this._uri){var b=this._uri.split('/'),c=a.href.split('/');c=this._cleanArray(c),b=this._cleanArray(b);//Subelemento
	for(var d=/[-.\w]+.html/g,e=/[-.\w]+/g,f=0;f<=c.length;f++)//console.log("--- _find_element for ",i,elements[i],uris[i],elements.length,uris.length);
	if(!e.test(b[f])&&b[f]===c[f])//console.log("--- _find_element continue ",uris[i],elements[i]);
	continue;else{if(''!==c[f]&&b[f]!==c[f])//console.log("--- _find_element false ",uris[i],elements[i]);
	return!1;if(d.test(c[f]))//console.log("--- _find_element ELEMENT HTML ",uris[i],elements[i]);
	//console.log(uris[i]);
	return!0;if(e.test(b[f]))//console.log("--- _find_element URI HTML ",uris[i],elements[i]);
	//console.log(uris[i]);
	return!0;/*
	        } else if (uris[i].startsWith("index.html") ) {
	          console.log("--- _find_element TRUE");
	          return true;
	        */if(b[f]===c[f]&&f===c.length-1&&f===b.length-1)//console.log("--- _find_element FOUND ",uris[i],elements[i]);
	return!0;if(b[f]===c[f]&&f===c.length-1&&f<b.length)//console.log("--- _find_element --- elements.length ",uris[i],elements[i]);
	//Buscamos en el subelemento
	return a.elements.find(this._find_element);if(f===b.length)//console.log("--- _find_element --- uris.length ",uris[i],elements[i]);
	//Buscamos en el subelemento
	return a.elements.find(this._find_element);if(b[f]===c[f]);else console.log('--- _find_element OTRO ',b[f],c[f]),console.log('--- _find_element OTRO requri test ',e.test(c[f])),console.log('--- _find_element OTRO requri test ',e.test(b[f])),console.log('--- _find_element OTRO IGUAL ',b[f]===c[f])}}}},{key:'_find_element_byid',value:function e(a,b){var c=this,d=void 0;//Buscamos el elemento por identificador
	//Para todos los elementos del array miramos si coincide el identificador. 
	// También buscamos en los subelementos
	return b.forEach(function(b){if(b.id==a)return d=b,b;if(b.elements){var e=c._find_element_byid(a,b.elements);if(e)return d=e,e}}),d}},{key:'_cleanArray',value:function e(a){for(var b=[],c=0,d=a.length;c<d;c++)a[c]&&'index.html'!=a[c]&&b.push(a[c]);return b}},{key:'data',set:function b(a){this._data=a}}],[{key:'observedAttributes',get:function a(){return['locale']}}]),b}(HTMLElement);customElements.define(UVaNavegacion.is,UVaNavegacion);var UVaNavegacionHorizontal=function(a){function b(){_classCallCheck(this,b);// Constructor
	try{for(var a,c,d=arguments.length,e=Array(d),f=0;f<d;f++)e[f]=arguments[f];a=_possibleConstructorReturn(this,(c=b.__proto__||Object.getPrototypeOf(b)).call.apply(c,[this].concat(e))),a}catch(a){// Si no somos capaces de cargar al padre, error
	throw'Error al crear el elemento de la oferta '+a}finally{a.setAttribute('navegacion','horizontal'),a.shadowRoot.innerHTML='\n      <style>\n      /* Menu horizontal */\n      @import url(\'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css\');\n      :host {\n        all: initial;\n        padding-top: 0.5em;\n\n        display: flex;\n        flex-wrap: wrap;\n        justify-content: space-around;\n        align-items: top;\n      }\n      </style>\n      '}return a}return _inherits(b,a),_createClass(b,null,[{key:'is',get:function a(){return'uva-navegacion-horizontal'}}]),_createClass(b,[{key:'_render_tree_element',value:function i(a,c,d){var e=this,f=!!(3<arguments.length&&void 0!==arguments[3])&&arguments[3],g=!(4<arguments.length&&void 0!==arguments[4])||arguments[4],h=_get(b.prototype.__proto__||Object.getPrototypeOf(b.prototype),'_render_tree_element',this).call(this,a,c,d,f,g,!1);h&&1>=a.navTree&&(this.shadowRoot.appendChild(h),a.elements&&0<a.elements.length&&a.elements.forEach(function(a){var b=e.shadowRoot,c=e._render_tree_element(a,b,d,!1,g,!1)}))}},{key:'_onclick',value:function g(a){_get(b.prototype.__proto__||Object.getPrototypeOf(b.prototype),'_onclick',this).call(this,a);// Quien o donde se ha hecho el click
	var c=a.composedPath()[0],d=a.detail.data,e=this.shadowRoot.getElementById(d.id);// Datos del contenido
	// Buscamos el submenu
	if(this._onlyone){// Si el objeto es un _onlyone
	// Lo seleccionamos
	var h=this.shadowRoot.querySelectorAll(':scope uva-navegacion-menu:not([style*="display: none"])');// Lo recorremos
	h.forEach(function(a){'navbarNav'!=a.id&&(a.style.display='none')})}if(!(d&&d.elements&&0<d.elements.length))d.href&&0<d.href.length&&(window.location.href=d.href);else if(d.navTree<=this._startLevel+this._levels-1){//mostramos el elemento
	var i=this.shadowRoot.querySelector('uva-navegacion-menu[id=\''+d.id+'\']');//console.log("submenu ",submenu);
	i?'none'===i.style.display?i.style.display='inherit':i.style.display='none':d.href&&0<d.href.length&&(window.location.href=d.href)}// Ponemos el elemento en negro (estamos jugando)
	// Para ello quitamos el active de todos, recorriendo todos todos todos los cacharros
	var f=document.querySelectorAll('uva-navegacion-horizontal')[0].shadowRoot.querySelectorAll('uva-navegacion-menu');f.forEach(function(a){// Sacamos su interior (que mal suena esto)
	var b=a.shadowRoot.querySelectorAll('uva-navegacion-elemento');b.forEach(function(a){a.classList.remove('active')})}),c.classList.add('active')}},{key:'data',set:function b(a){this._data=a,this._render_tree()}}]),b}(UVaNavegacion);customElements.define(UVaNavegacionHorizontal.is,UVaNavegacionHorizontal);var UVaNavegacionVertical=function(a){function b(){_classCallCheck(this,b);// Constructor
	try{for(var a,c,d=arguments.length,e=Array(d),f=0;f<d;f++)e[f]=arguments[f];a=_possibleConstructorReturn(this,(c=b.__proto__||Object.getPrototypeOf(b)).call.apply(c,[this].concat(e))),a}catch(a){// Si no somos capaces de cargar al padre, error
	throw'Error al crear el elemento de la navegacion vertical '+a}finally{a.setAttribute('navegacion','vertical'),a.shadowRoot.innerHTML='\n      <style>\n      /* Menu vertical */\n      :host {\n        all: initial;\n        padding: 0;\n        margin: 0;\n\n        display: flex-column;\n        border: none;\n\n        text-transform: uppercase;\n      }\n      </style>\n      '}return a}return _inherits(b,a),_createClass(b,null,[{key:'is',// Elemento de navegacion vertical
	get:function a(){return'uva-navegacion-vertical'}}]),_createClass(b,[{key:'_render_tree_element',value:function i(a,c,d){var e=this,f=!!(3<arguments.length&&void 0!==arguments[3])&&arguments[3],g=!(4<arguments.length&&void 0!==arguments[4])||arguments[4],h=_get(b.prototype.__proto__||Object.getPrototypeOf(b.prototype),'_render_tree_element',this).call(this,a,c,d,f,g,!0);// Metodo de renderizado de un elemento
	// elemento = elemento en concreto del menu
	// eldiv = a donde pertenece o el padre o como se quiere llamar
	// type = tipo de elemento
	// first = si es el primero (false)
	// last = si es el ultimo (true)
	// Sacamos el padre
	//Comprobamos si tenemos que marcarlo como activo
	if(h&&null!=h&&this._uri&&0<this._uri.length){//Miramos si estamos dentro de la URI
	var j=a.elements.find(this._find_element);//SI tenemos URI mostramos el elemento
	j&&(h.style.display='block')}// Si tiene padre y tiene hijos
	h&&a.navTree<=this._startLevel+this._levels-1&&(f?this.shadowRoot.appendChild(h):c&&c.shadowRoot.appendChild(h),a.elements&&0<a.elements.length&&a.elements.forEach(function(a){// Lo recorremos
	// Leemos el id del subelemento
	var b=h.shadowRoot.getElementById(a.id),c=e._render_tree_element(a,b,d,!1,g,!0);// Lo pintamos
	}))}},{key:'_onclick',value:function f(a){// Metodo del evento de click
	// Heredamos los del padre
	var c=_get(b.prototype.__proto__||Object.getPrototypeOf(b.prototype),'_onclick',this).call(this,a),d=a.composedPath()[0],e=a.detail.data;// Sacamos el elemento al que hacemos click
	// Sacamos los datos de a donde hace click (el destino del click)
	!0==d.classList.contains('active')?d.classList.remove('active'):d.classList.add('active'),e&&e.elements&&0<e.elements.length?e.navTree<=this._startLevel+this._levels-1:e.href&&0<e.href.length&&(window.location.href=e.href)}},{key:'_hideAll',value:function a(){// Metodo que esconde todos los elementos de uno determinado
	}},{key:'data',set:function b(a){this._data=a,this._render_tree()}}]),b}(UVaNavegacion);customElements.define(UVaNavegacionVertical.is,UVaNavegacionVertical);var UVaNavegacionMenu=function(a){function b(){_classCallCheck(this,b);// Constructor
	try{for(var a,c,d=arguments.length,e=Array(d),f=0;f<d;f++)e[f]=arguments[f];a=_possibleConstructorReturn(this,(c=b.__proto__||Object.getPrototypeOf(b)).call.apply(c,[this].concat(e))),a}catch(a){// Si no somos capaces de cargar al padre, error
	throw'Error al crear el elemento contenedor de la navegacion '+a}finally{a._last=void 0,a._show=!1,a._child=!1,a._data=void 0,a._expanded=!1,a._onclick=a._onclick.bind(a);//Shadow
	a.attachShadow({mode:'open'});a.shadowRoot.innerHTML='\n      <style>\n      /* Contenedor de menu */\n      :host {\n        /* Heredamos del padre */\n        display: inherit;\n        flex-wrap: wrap;\n      }\n      </style>\n      '}return a}return _inherits(b,a),_createClass(b,null,[{key:'is',get:function a(){return'uva-navegacion-menu'}}]),_createClass(b,[{key:'connectedCallback',value:function a(){this.addEventListener('nav_click',this._onclick)}},{key:'disconnectedCallback',value:function a(){this.removeEventListener('nav_click',this._onclick)}},{key:'adoptedCallback',value:function a(){// Cuando lo movemos en el durumdumdumdum
	}},{key:'attributeChangedCallback',value:function a(){// Si cambia algo
	}},{key:'_render',value:function b(){var a=this;this.id=this._data.id,this.className='navigation-menu',this._data.elements.forEach(function(b){// Creamos el objeto elemento de navegacion
	var c=new UVaNavegacionElemento;// Le damos de comer
	c.actions=a._last,c.data=b,a.shadowRoot.appendChild(c)})}},{key:'_onclick',value:function b(a){// Metodo del evento del click
	// Primero sacamos el elemento sobre el que hace click
	a.composedPath()[0];// Si es el elemento en concreto (osea si es si mismo)
	this._data.id===a.detail.data.id&&(this._expanded=!this._expanded)}},{key:'data',set:function b(a){this._data=a,this._render()}},{key:'last',set:function b(a){this._last=a}},{key:'child',set:function b(a){this._child=a}},{key:'expanded',set:function b(a){this._expanded=a}}],[{key:'observedAttributes',get:function a(){// Observable! del locale
	return['locale']}}]),b}(HTMLElement);customElements.define(UVaNavegacionMenu.is,UVaNavegacionMenu);var UVaNavegacionElemento=function(a){function b(){_classCallCheck(this,b);// Constructor
	try{for(var a,c,d=arguments.length,e=Array(d),f=0;f<d;f++)e[f]=arguments[f];a=_possibleConstructorReturn(this,(c=b.__proto__||Object.getPrototypeOf(b)).call.apply(c,[this].concat(e))),a}catch(a){// Si no somos capaces de cargar al padre, error
	throw'Error al crear el elemento de navegacion-elemento '+a}finally{a._data=void 0,a._actions=void 0,a._expanded=!1,a._onclick=a._onclick.bind(a);// El elemento en si, la base
	a.attachShadow({mode:'open'});a.shadowRoot.innerHTML='\n      <style>\n      :host {\n        font-family: \'Montserrat\', sans-serif;\n        margin: 0;\n        padding: 0;\n      }\n\n      p {\n        margin: 0;\n        padding: 0;\n      }\n\n      .green {\n        border-top: 5px solid green;\n      }\n\n      .blue {\n        border-top: 5px solid blue;\n      }\n\n      .yellow {\n        border-top: 5px solid yellow;\n      }\n\n      .pink {\n        border-top: 5px solid pink;\n      }\n\n      .red {\n        border-top: 5px solid red;\n      }\n\n      .level0 {\n        min-width: 100px;\n\n        margin-left: 0.5em;\n        margin-right: 0.5em;\n        margin-bottom: 1em;\n\n        padding-top: 0.5em;\n\n        font-family: \'Montserrat\', sans-serif;\n      }\n\n      p.level0 {\n        padding: 0.5em 1em;\n      }\n\n      p.level0:hover, :host(.active) p.level0 {\n        background-color: black;\n        color: white;\n        cursor: pointer;\n      }\n\n      p.level1 {\n        min-width: 100px;\n        background-color: #e5e5e5;\n        padding: 1em 0.5em;\n        text-align: center;\n      }\n\n      p.level1:hover {\n        cursor: pointer;\n        text-decoration: underline;\n      }\n\n      </style>\n      <p id="content"></p>\n      '}return a}return _inherits(b,a),_createClass(b,null,[{key:'is',get:function a(){return'uva-navegacion-elemento'}}]),_createClass(b,[{key:'connectedCallback',value:function a(){this.addEventListener('click',this._onclick),this.addEventListener('mouseenter',this._onenter),this.addEventListener('mouseover',this._onover),this.addEventListener('mouseout',this._onleave)}},{key:'disconnectedCallback',value:function a(){this.removeEventListener('click',this._onclick),this.removeEventListener('mouseenter',this._onenter),this.removeEventListener('mouseover',this._onover),this.removeEventListener('mouseout',this._onleave)}},{key:'adoptedCallback',value:function a(){}},{key:'attributeChangedCallback',value:function a(){// Si algo cambia
	}},{key:'_render',value:function b(){var a=Math.floor;// Metodo de "pintado"
	// Esto habra que definirlo algun dia, es una chapuza
	// Identificador del elemento
	this.id=this._data.id,this.className='navigation-element',this.setAttribute('position',this._data.navPos),this.setAttribute('level',this._data.navTree),1===this._data.navTree?(this.shadowRoot.getElementById('content').classList.add('level0'),this.shadowRoot.getElementById('content').classList.add(['green','blue','yellow','pink','red'][a(5*Math.random())])):this.shadowRoot.getElementById('content').classList.add('level1'),this.shadowRoot.getElementById('content').innerText=this._data.navText,this.shadowRoot.getElementById('content').id=this._data.id}},{key:'_onclick',value:function g(a){var b=this,c=a.composedPath()[0],d=a.detail.data;// Metodo del click
	// Primero, en donde hacemos click
	//console.log(htmlel.id);
	// Luego, a donde hacemos click
	// Si estamos haciendo click en uno "de los nuestros"
	if('P'===c.nodeName){// Sacamos el id
	var h=c.id;// Y si soy yo (que hay muchis)
	h===this._data.id&&(this._expanded=!this._expanded)}// Buscamos el padre, el contenedor de navegacion padre, esto funciona para el vertical por como lo estamos pintando, obviamente
	var e=this.shadowRoot.querySelectorAll(':scope uva-navegacion-menu');e.forEach(function(a){b._expanded?(a.style.display='grid',a.style.visibility='visible'):(a.style.display='none',a.style.visibility='hidden')});// Disparamos el evento de click en la navegacion
	var f=new CustomEvent('nav_click',{bubbles:!0,cancelable:!1,composed:!0,detail:{data:this._data}});this.dispatchEvent(f)}},{key:'_onenter',value:function a(){// Metodo de cuando se hace enter con el teclado
	if(this._actions){var b=new CustomEvent('nav_enter',{bubbles:!0,cancelable:!1,composed:!0,detail:{data:this._data}});this.dispatchEvent(b)}}},{key:'_onover',value:function a(){}},{key:'_onleave',value:function a(){// Metodo para el evento de sacar el raton fuera
	if(this._actions){var b=new CustomEvent('nav_leave',{bubbles:!0,cancelable:!1,composed:!0,detail:{data:this._data}});this.dispatchEvent(b)}}},{key:'data',set:function b(a){this._data=a,this._render()}},{key:'actions',set:function b(a){this._actions=a}}],[{key:'observedAttributes',get:function a(){return['locale']}}]),b}(HTMLElement);customElements.define(UVaNavegacionElemento.is,UVaNavegacionElemento);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';var _createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var UVaNavegacionBreadcrumb=function(a){function b(){_classCallCheck(this,b);// Constructor
	try{for(var a,c,d=arguments.length,e=Array(d),f=0;f<d;f++)e[f]=arguments[f];a=_possibleConstructorReturn(this,(c=b.__proto__||Object.getPrototypeOf(b)).call.apply(c,[this].concat(e))),a}catch(a){// Si no somos capaces de cargar al padre, error
	throw'Error al crear el elemento de la navegacion vertical '+a}finally{a._uridata=void 0,a._data=void 0,a._localedata='es',a._data_locale=void 0,a._startLevel=0,a._levels=99,a._onclick=a._onclick.bind(a),a._find_element=a._find_element.bind(a),a._cleanArray=a._cleanArray.bind(a);// Creamos el shadow del elemento
	a.attachShadow({mode:'open'});a.shadowRoot.innerHTML='\n      <style>\n        /* Contenedor generico total */\n        :host {\n          padding: 0;\n          margin: 0;\n        }\n      </style>\n      <ul id="content" class="pull-left breadcrumb">\n        <li itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/">Inicio</a></li>\n      </ul>\n      '}return a}return _inherits(b,a),_createClass(b,null,[{key:'is',// Elemento de navegacion vertical
	get:function a(){return'uva-navegacion-breadcrumb'}}]),_createClass(b,[{key:'connectedCallback',value:function b(){var a=this;this.getAttribute('onlyone')&&(this._onlyone=!0),this._uridata=this.getAttribute('data')?this.getAttribute('data'):'/ws/menu.json',this.getAttribute('uri')&&(this._uri=this.getAttribute('uri')),this.getAttribute('startLevel')&&(this._startLevel=parseInt(this.getAttribute('startLevel'))),this.getAttribute('levels')&&(this._levels=this.getAttribute('levels')),this.getAttribute('locale')&&(this._localedata=this.getAttribute('locale')),this.addEventListener('nav_click',this._onclick),this.addEventListener('nav_enter',this._onenter),this.addEventListener('nav_leave',this._onleave),loadJSON(this._uridata).then(function(b){a.data=b})}},{key:'disconnectedCallback',value:function a(){this.removeEventListener('nav_click',this._onclick),this.removeEventListener('nav_enter',this._onenter),this.removeEventListener('nav_leave',this._onleave)}},{key:'adoptedCallback',value:function a(){}},{key:'attributeChangedCallback',value:function d(a,b,c){'locale'===a&&(this._localedata=c),this._render()}},{key:'_render',value:function g(){// Cargamos el locale en una variable
	var a=this._localedata;// Si no hay datos o no hay URI, unos apaños
	if(void 0!==this._data){//Establecemos el locale
	if(void 0===this._uri&&(this._uri='/'),void 0!==this._data&&void 0!==this._localedata){var h=this._data.find(function(b){return b.locale===a});this._data_locale=h.elements}if(void 0!==this._uri&&'/'!==this._uri){for(var b,c=this._uri,d=void 0,e=this._uri.split('/'),f=0;f<e.length;f++){b='';for(var k=0;k<=f;k++)e[k]&&0<e[k].length&&(b=b+'/'+e[k]);b+='/',this._uri=b;var j=void 0;if(d?(j=d.elements.find(this._find_element),d=j):(j=this._data_locale.find(this._find_element),d=j),j){var l=new UVaNavegacionBreadcrumbElement;j.navTree+1<this._startLevel&&(j.href='undefined'),l.data=j,this.shadowRoot.getElementById('content').appendChild(l)}}this._uri=c}}}},{key:'_onclick',value:function a(){}},{key:'_onenter',value:function a(){}},{key:'_onleave',value:function a(){}},{key:'_find_element',value:function g(a){//console.log("--> _find_element ","element ",element," index ",index," array ", array);
	if(void 0!==this._uri&&'/'!==this._uri){var b=this._uri.split('/'),c=a.href.split('/');c=this._cleanArray(c),b=this._cleanArray(b);//Subelemento
	for(var d=/[-.\w]+.html/g,e=/[-.\w]+/g,f=0;f<=c.length;f++)//console.log("--- _find_element for ",i,elements[i],uris[i],elements.length,uris.length);
	if(!e.test(b[f])&&b[f]===c[f])//console.log("--- _find_element continue ",uris[i],elements[i]);
	continue;else{if(''!==c[f]&&b[f]!==c[f])//console.log("--- _find_element false ",uris[i],elements[i]);
	return!1;if(d.test(c[f]))//console.log("--- _find_element ELEMENT HTML ",uris[i],elements[i]);
	//console.log(uris[i]);
	return!0;if(e.test(b[f]))//console.log("--- _find_element URI HTML ",uris[i],elements[i]);
	//console.log(uris[i]);
	return!0;/*
	        } else if (uris[i].startsWith("index.html") ) {
	          console.log("--- _find_element TRUE");
	          return true;
	        */if(b[f]===c[f]&&f===c.length-1&&f===b.length-1)//console.log("--- _find_element FOUND ",uris[i],elements[i]);
	return!0;if(b[f]===c[f]&&f===c.length-1&&f<b.length)//console.log("--- _find_element --- elements.length ",uris[i],elements[i]);
	//Buscamos en el subelemento
	return a.elements.find(this._find_element);if(f===b.length)//console.log("--- _find_element --- uris.length ",uris[i],elements[i]);
	//Buscamos en el subelemento
	return a.elements.find(this._find_element);if(b[f]===c[f]);else console.log('--- _find_element OTRO ',b[f],c[f]),console.log('--- _find_element OTRO requri test ',e.test(c[f])),console.log('--- _find_element OTRO requri test ',e.test(b[f])),console.log('--- _find_element OTRO IGUAL ',b[f]===c[f])}}}},{key:'_cleanArray',value:function e(a){for(var b=[],c=0,d=a.length;c<d;c++)a[c]&&'index.html'!=a[c]&&b.push(a[c]);return b}},{key:'data',set:function b(a){this._data=a,this._render()}}],[{key:'observedAttributes',get:function a(){return['locale']}}]),b}(HTMLElement);customElements.define(UVaNavegacionBreadcrumb.is,UVaNavegacionBreadcrumb);var UVaNavegacionBreadcrumbElement=function(a){function b(){_classCallCheck(this,b);// Constructor
	try{for(var a,c,d=arguments.length,e=Array(d),f=0;f<d;f++)e[f]=arguments[f];a=_possibleConstructorReturn(this,(c=b.__proto__||Object.getPrototypeOf(b)).call.apply(c,[this].concat(e))),a}catch(a){// Si no somos capaces de cargar al padre, error
	throw'Error al crear el elemento de la navegacion vertical '+a}finally{a._data=void 0,a._onclick=a._onclick.bind(a);//this._onenter = this._onenter.bind(this);
	//this._onover = this._onover.bind(this);
	//this._onleave = this._onleave.bind(this);
	// Creamos el shadow del elemento
	a.attachShadow({mode:'open'});a.shadowRoot.innerHTML='\n      <style>\n        /* Contenedor generico total */\n        :host {\n        }\n      </style>\n      <li id="elemento" itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a id="elemento_enlace" href="/">ELEMENTO</a></li>\n      '}return a}return _inherits(b,a),_createClass(b,null,[{key:'is',// Elemento de un breadcrumb
	get:function a(){return'uva-navegacion-breadcrumb-element'}}]),_createClass(b,[{key:'connectedCallback',value:function a(){}},{key:'disconnectedCallback',value:function a(){}},{key:'adoptedCallback',value:function a(){}},{key:'attributeChangedCallback',value:function a(){}},{key:'_render',value:function a(){this._data.navText&&null!=this._data.navText&&(this.shadowRoot.getElementById('elemento_enlace').innerHTML=this._data.navText),this._data.href&&'undefined'!=this._data.href?this.shadowRoot.getElementById('elemento_enlace').href=this._data.href:this.shadowRoot.getElementById('elemento_enlace').removeAttribute('href')}},{key:'_onclick',value:function a(){}},{key:'_onenter',value:function a(){}},{key:'_onleave',value:function a(){}},{key:'data',set:function b(a){this._data=a,this._render()}}],[{key:'observedAttributes',get:function a(){}}]),b}(HTMLElement);customElements.define(UVaNavegacionBreadcrumbElement.is,UVaNavegacionBreadcrumbElement);

/***/ })
/******/ ]);
//# sourceMappingURL=uva.bundle.js.map