'use strict';


class UVaNavegacionBreadcrumb extends HTMLElement {
  // Elemento de breadcrumb o migas de pan, el gordo el que luego llama a los elementos
  // de cada navegacion y el que contiene todos los datos
  
	static get is() {
		return 'uva-navegacion-breadcrumb';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw 'Error al crear el elemento de la ruta de migas ' + e;
		} finally {
			// Variables por defecto del objeto
			this._uridata = undefined;
			this._data = undefined;
			this._localedata = "es";
			this._data_locale = undefined;
			this._startLevel = 0;
			this._levels = 99;
			
			// Bindeamos al objeto las funciones/metodos para crearlos facilmente
			this._onclick = this._onclick.bind(this);
			this._find_element= this._find_element.bind(this);
			this._cleanArray= this._cleanArray.bind(this);
			
			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML  = `
<style>
/* Contenedor generico total */
@import url('https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css');
:host {
	padding: 0;
	margin: 0;
}
</style>
<nav aria-label="breadcrumb">
	<ol class="breadcrumb" id="content">
	</ol>
</nav>
`;
		}
	}

	connectedCallback() {
		// Cuando aparezca, hacemos el yogurt del objeto
		// Cargamos los parmametros
		if (this.getAttribute('onlyone'))
			this._onlyone = true;

		// Si no tiene de donde coger el JSON, lo "provocamos"
		if (this.getAttribute('data')) {
			this._uridata = this.getAttribute('data');
		} else {
			this._uridata = '/ws/menu.json';
		}
		// La uri
		if (this.getAttribute('uri'))
			this._uri = this.getAttribute('uri');
		// El nivel inicial
		if (this.getAttribute('startLevel'))
			this._startLevel = parseInt(this.getAttribute('startLevel'));
		// Hasta donde bajamos en los niveles
		if (this.getAttribute('levels'))
			this._levels = this.getAttribute('levels');
		// El idioma, el locale
		if (this.getAttribute('locale'))
			this._localedata = this.getAttribute('locale');
		// Añadimos los eventos
		this.addEventListener('nav_click', this._onclick);
		this.addEventListener('nav_enter', this._onenter);
		this.addEventListener('nav_leave', this._onleave);

		// Carga del JSON
		loadJSON(this._uridata).then(response => {
			this.data = response;
		});
	}

	disconnectedCallback() {
		// Quitamos los listener de los eventos si eliminamos del DOM
		this.removeEventListener('nav_click', this._onclick);
		this.removeEventListener('nav_enter', this._onenter);
		this.removeEventListener('nav_leave', this._onleave);
	}

	adoptedCallback() {
		// Cuando lo movemos en el durumdumdumdum
	}

	static get observedAttributes() {
		// Observer del locale
		return ['locale'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		// Si cambia el idioma, re-renderizamos todo, obviamente
		
		// Cuando cambia el locale, lo ponemos en la propiedad interna
		if (name === "locale") {
			this._localedata = newValue;
		}

		// Ejecutamos el render
		this._render();
	}

	set data(val) {
		// Modificamos los datos de la navegación
		this._data = val;
		//Iniciaamos la renderizacion
		this._render();

	}

	_render() {
		// Cargamos el locale en una variable
		let locale = this._localedata;

		// Si no hay datos o no hay URI, unos apaños
		if (this._data === undefined) return;
		if (this._uri === undefined) this._uri="/";

		// Establecemos el locale
		if (this._data !== undefined && this._localedata !== undefined) {
			// Buscamos el locale en el que estamos
			let actual = this._data.find(function(element) {
				return element.locale === locale;
			});
			// Y lo metemos en la propiedad privada del ojeto
			this._data_locale = actual.elements;
		}

		// Si tenemos URL y no es una que va a ningun lau
		if (this._uri !== undefined && this._uri !== "/") {
			let aux = this._uri;
			let aux_element = undefined;
			let uris = this._uri.split("/");
			// Esto seguro que se puede refactorizar con un .forEach o un .reduce y un arrow
			for (let i = 0;i < uris.length; i++) {
				let uri_buscada = '';
				for (let j = 0; j <= i; j++) {
					if (uris[j] && uris[j].length > 0) {
						uri_buscada = uri_buscada+"/"+uris[j];
					}
				}
				uri_buscada = uri_buscada +"/";
				this._uri = uri_buscada;
				let element = undefined;
				if (!aux_element) {
					element = this._data_locale.find(this._find_element);
					aux_element = element;
				} else {
					element = aux_element.elements.find(this._find_element);
					aux_element = element;
				}
				// Si hay elemento, creamos el objeto necesario y lo añadimos al shadow
				if (element) {
					let el = new UVaNavegacionBreadcrumbElement();
					if (element.navTree + 1 < this._startLevel) {
						element.href = 'undefined';
					}
					el.data = element;
					this.shadowRoot.getElementById('content').appendChild(el);
				}
			}
			this._uri=aux;
		}
	}

	_onclick(event)  {
	}

	_onenter() {

	}

	_onleave() {

	}

	_find_element(element, index, array) {
		// Metodo para buscar un elemento en un array
		if (this._uri !== undefined && this._uri !== '/') {
			let uris = this._uri.split('/');
			let elements = element.href.split('/');
			// Eliminamos los elementos vacios
			elements = this._cleanArray(elements);
			uris = this._cleanArray(uris);
			
			let reqhtml = /[-.\w]+.html/g;
			let requri = /[-.\w]+/g;
			// Subelemento, recorremos
			for (let i = 0; i <= elements.length;i++) {
				if (!requri.test(uris[i]) && uris[i] === elements[i]) {
					// Si no, saltamos al siguiente
					continue;
				} else if (elements[i] !== '' && uris[i] !== elements[i]) {
					// Si no hay nada devolvemos un false
					return false;
				} else if (reqhtml.test(elements[i]) ) {
					// Si hay elementos, devolvemos un true
					return true;
				} else if (requri.test(uris[i]) ) {
					// Si hay urls devolvemos un true
					return true;
				} else if (uris[i] === elements[i] && i === elements.length-1 && i === uris.length-1) {
					// Si hay elementos y urls, true
					return true;
				} else if (uris[i] === elements[i] && i === elements.length-1 && i < uris.length) {
					// Si hay yogurt, buscamos en el subelemento
					return element.elements.find(this._find_element);
				} else if (i === uris.length) {
					// Buscamos en el subelemento
					return element.elements.find(this._find_element);
				} else if (uris[i] === elements[i]) {
					// Esto no deberia ocurrir, pero por si acaso... 
				} else {
					/* El resto de cosas...
					console.log("--- _find_element OTRO ",uris[i],elements[i]);
					console.log("--- _find_element OTRO requri test ",requri.test(elements[i]));
					console.log("--- _find_element OTRO requri test ",requri.test(uris[i]));
					console.log("--- _find_element OTRO IGUAL ",uris[i]===elements[i]);
					*/
				}
			} 
		}
	}

	_cleanArray (actual) {
		// Metodo que deja el array como un arial, es decir, lo deja como una patena quitando
		// lo que sobra para poder ser tratado y deja solo las paginas
		// actual = array a tratar
		// newArray = array de retorno limpio
		
		var newArray = new Array();
		// Recorremos la base
		for( var i = 0, j = actual.length; i < j; i++ ) {
			if (actual[i] && actual[i]!="index.html" && actual[i]!="export" && actual[i]!="sites" && actual[i]!="uva") {
				// Si tiene contenido lo añadimos al array de vuelta
				newArray.push(actual[i]);
			}
		}
		// Devolvemos el nuevo array limpio
		return newArray;
	}

}
customElements.define(UVaNavegacionBreadcrumb.is, UVaNavegacionBreadcrumb);


class UVaNavegacionBreadcrumbElement extends HTMLElement {
  // Elemento de un breadcrumb, elemento final
	static get is() {
		return 'uva-navegacion-breadcrumb-element';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw 'Error al crear el elemento hijo de la ruta de migas ' + e;
		} finally {
			// Variables por defecto del objeto
			this._data = undefined;
			// Bindeamos al objeto las funciones/metodos para crearlos facilmente
			this._onclick = this._onclick.bind(this);

			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML  = `
<style>
/* Contenedor generico total */
@import url('https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css');
@import url('https://use.fontawesome.com/releases/v5.6.3/css/all.css');
:host {
}
li {
	margin-left: 0.5em;
	margin-right: 0.2em;
	text-transform: uppercase;
}
li::after {
	content: ' /';
	/*margin-left: 0.3em;*/
}

li a:hover {
	text-decoration: none;
}
</style>
<li class="breadcrumb-item" id="elemento" itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a id="elemento_enlace" href="/">ELEMENTO</a></li>
`;
		}
	}

	connectedCallback() {
		// Cuando se monta en el DOM
	}

	disconnectedCallback() {
		// Cuando se desconecta del DOM
	}

	adoptedCallback() {
		// Cuando se mueve en el DOM
	}

	static get observedAttributes() {
		// Observables
	}

	attributeChangedCallback(name, oldValue, newValue) {
		// Cuando alguna propiedad cambia
	}

	set data(val) {
		// Modificamos los datos 
		this._data = val;
		//Iniciaamos la renderizacion
		this._render();	
	}

	_render() {
		// Metodo interno que pinta el elemento
		// Texto de navegacion
		if (this._data.navText && this._data.navText != undefined) {
			this.shadowRoot.getElementById("elemento_enlace").innerHTML = this._data.navText;
		}
		// La URL a donde apunta
		if (this._data.href && this._data.href != 'undefined') {
			// Si no tiene undefined, vamos si no es final
			this.shadowRoot.getElementById("elemento_enlace").href = this._data.href;
		} else {
			// Si es final
			this.shadowRoot.getElementById("elemento_enlace").removeAttribute("href");
		}
	}

	_onclick(event)  {
		// Metodo para evento del click (no usado)
	}

	_onenter() {
		// Metodo para el evento de pulsar enter (teclado, no usado)
	}

	_onleave() {
		// Metodo para el evento de cuando el mouse pierde foco (no usado)
	}

}
customElements.define(UVaNavegacionBreadcrumbElement.is, UVaNavegacionBreadcrumbElement);