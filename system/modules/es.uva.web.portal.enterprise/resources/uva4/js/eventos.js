'use strict';

// Importamos el slideshow
import { UVaSlideshow, UVaSlideshowDot } from './slideshow.js';

class UVAEventos extends HTMLElement {
	// Creamos el objeto de los eventos, este es el padre
	
	static get is() {
		return 'uva-eventos';
	}
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVAEventos " + e;
		} finally {
			// Propiedades del objeto
			// Recordar que las _ es porque son privated!
			this._data = undefined; // Datos del objeto, el contenido
			this._uridata = undefined; // La URL de donde saca los datos
			this._datanum = 4; // Numero por defecto a mostrar
			// Metodos/Funciones
			this._onclick = this._onclick.bind(this); // El click

			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
<style>
/* Bootstrap */
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css");
@import url("https://fonts.googleapis.com/css?family=Alegreya:300, 400, 500|Arvo:300, 400, 500|IM+Fell+English+SC:300, 400, 500|Lato:300, 400, 500|Libre+Franklin:300, 400, 500|Montserrat:300, 400, 500|Open+Sans:300, 400, 500|Raleway:300, 400, 500");
@import url("https://use.fontawesome.com/releases/v5.6.3/css/all.css");

h1, h2, h3 {
	font-family: "Libre Franklin", sans-serif; 
}

.header {
	border-bottom: 1px solid #121212;
 	margin-right: 15px;
}

.header h1 {
	font-size: 26px;
	padding-right: 20px;
	text-transform: uppercase;
	margin-right: 15px;
	position: relative;
	bottom: -10px;
}

.bloque_raya {
	margin-left: 0;
	padding-left: 0;
	border-bottom: 1px solid #121212;
}

.bloque_raya .masinformacion {
	font-size: 12px;
	padding: 18px 20px;
	border: 1px solid #121212;
	text-transform: uppercase;
	display: inline-block;
	margin-bottom: -1px;
	transition: all 0.5s;
}

.bloque_raya a .masinformacion {
	color: #121212;
}

.bloque_raya a:hover .masinformacion {
	color: #121212;
	text-decoration: none;
	background-color: #5af9ff;
}

.bloque_raya .flecha {
	transition: all 0.5s;
}

.bloque_raya a:hover .flecha {
	display: inline-block;
	transform: translateX(10px);
}

</style>
<div class="row">
	<div class="col-12 col-md-2 header">
		<h1>Eventos</h1>
	</div>
	<div class="col bloque_raya d-none d-md-block">
		<a href="http://eventos.uva.es" target="_blank" role="link" rel="noopener noreferrer">
			<span class="masinformacion">
				<span data-i18n-es="más información" data-i18n-en="read more">más información</span> 
				<span class="flecha"><i class="fas fa-angle-right"></i></span>
			</span>
		</a>
	</div>
</div>
<div class="row" style="margin-top: 15px;" id="eventos-contenido"></div>
`;

		}
	}

	connectedCallback() {
		// Cuando se monta en el durumdumdumdum
		// Añadimos el listener del click
		this.addEventListener('click', this._onclick);

		// Pillamos los datos que haya puesto en el tag
		this._uridata = this.getAttribute('data');
		this._datanum = this.getAttribute('num');
		// Cargamos los datos
		this._loadDatos();
	}

	disconnectedCallback() {
		// Cuando lo sacamos del DOM
		// Eliminamos el evento del click
		this.removeEventListener('click', this._onclick);
	}

	adoptedCallback() { 
		// Si se mueve en el DOM
	}
	attributeChangedCallback(name, oldValue, newValue) { 
		// Si cambia algun atributo
	}

  set data(val) {
    // Seteado de los datos
    this._data = val;
	// Y lo renderizamos
    this._render();
  }

	_loadDatos() {
		// Carga de los datos
		
		// Si no hay URL de donde sacar, nos volvemos por donde hemos venido
		if (!this._uridata) return;
		
		// Si lo hay (URL)
		loadJSON(this._uridata)
			.then(response => {
			// Guardamos en el data del objeto
			this.data = response.events;
		})
			.catch(function(error) {
			console.warn('Error al consultar los datos de eventos');
			console.warn(error);
		});
	}

	_render() {
		// Renderizado del objeto
		let count = 1;
		// Para cada dato que tengo
		this._data.forEach((element) => {
			// Si te has pasado de largo al siguiente elemento
			if (count > parseInt(this._datanum)) return;
			// Subimos el contador
			count++;
			// Creamos un nuevo evento de texto
			let el = new EventoTexto();
			el.data = element;
			// Y al DOM que vas
			let eventElement = this.shadowRoot.getElementById('eventos-contenido');
			console.log(eventElement);
			eventElement.appendChild(el);
			//this.shadowRoot.appendChild(el);
		});
	}

	_onclick(event)  {
		// Cuando haces click, esto ejecutaras
		
		// Sacamos quien hace click
		let el = event.composedPath()[0];
		if (el.className === "historico-element") {
			console.log(el)
			console.log(el.getAttribute("param"));
			let param = el.getAttribute("param");
			if (param) {
				this._get_results(param)
					.then((data) => {
					console.log("RESULTADOS CONSULTA");
					console.log(data);
					this._data = data.response.docs;
					console.log(data.response.docs);

					this._render_results();
				});
			}
		}
	}

 
}
customElements.define(UVAEventos.is, UVAEventos);

class UVAEventosSlideshow extends UVaSlideshow {
	// Objeto de los eventos pero con slideshow incluidos
	static get is() {
		return 'uva-eventos-slideshow';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVAEventos " + e;
		} finally {
			// Propiedades que como lo heredamos del slideshow
			// pues pasando de definirlas ya que las propiedades estan
			// EN EL CONSTRUCTOR
			// Asi que esto... vacio
		}
	}

	connectedCallback() {
		// Cuando montamos en el DOM
		// Arrancamos el conected del padre
		super.connectedCallback(); 

		// Sacamos la URL de los datos
		this._uridata = this.getAttribute('data');
		// Cargamos los datos
		this._loadDatos();
	}

	disconnectedCallback() {
		// Cuando se desconecta del DOM
		super.disconnectedCallback(); 
		// Quitamos el listener del click
		this.removeEventListener('click', this._onclick);
	}

	adoptedCallback() {
		// Cuando se mueve en DOM
	}
	attributeChangedCallback(name, oldValue, newValue) {
		// Cuando cambia algun atributo del tag
	}

	set data(val) {
		// Settado de los datos

		this._data = val;

		let count = 1;
		// Creamos los elementos
		this._data.forEach((element) => {
			// Si hay mas de los que aparecen, volvemos de vacio
			if (count > parseInt(this._datanum)) return;
			
			count++;
			let el = new EventoTexto();
			el.data = element;
			// Añadimos el elemento al numero de objetos
			this._objects.push(el);
			// Buscamos el donde colocar los elementos
			let divElementSlideshow = this.shadowRoot.getElementById('slide-elements');
			// Y los metemos
			divElementSlideshow.appendChild(Object.assign(el));
			// Y un hijo mas que tiene
			this._childs++;
		});
		// Arrancamos el slide con el index 0
		this._show(0);
	}

	_loadDatos() {
		// Metodo privado de carga de los datos
		
		// Si no hay url de los datos, nos volvemos por donde hemos venido
		if (!this._uridata) return;
		
		// Cargamos los datos de la URL
		loadJSON(this._uridata)
			.then(response => {
			// Lo metemos en el data del objeto
			this.data = response.events;
		})
			.catch(function(error) {
			// Si ha hecho PUM sacamos un error en la consola
			console.warn('Error al consultar los datos de eventos');
			console.warn(error);
		});
	}

  _render() {
    // Metodo de renderizado
	// Llamamos al del padre que para eso esta
    super._render();
  }

	_onclick(event)  {
		// Metodo del click
		
		// Sacamos a donde hace click
		let el = event.composedPath()[0];
		
		if (el.className === 'historico-element') {
			// Si es un historico
			// Cogemos el parametro param
			let param = el.getAttribute("param");
			if (param) {
				// Si hay param para sacar sus datos, vamos ver el contenido en concreto de a donde hemos hecho click
				this._get_results(param)
					.then((data) => {
					// Lo metemos en el data del objeto
					this._data = data.response.docs;
					// Renderizamos
					this._render_results();
				});
			}
		}
	}

 
}
customElements.define(UVAEventosSlideshow.is, UVAEventosSlideshow);


class EventoTexto extends HTMLElement {
	// Objeto de un evento pero que solo tiene texto

	static get is() {
		return 'uva-evento-texto';
	}
  
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento EventoTexto " + e;
		} finally {
			// Propiedades privadas
			this._data = undefined; // Los datos
			this._uridata = undefined; // La URL de donde se sacan los datos
			// Metodos
			this._onclick = this._onclick.bind(this);

			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css");
@import url("https://fonts.googleapis.com/css?family=Alegreya:300, 400, 500|Arvo:300, 400, 500|IM+Fell+English+SC:300, 400, 500|Lato:300, 400, 500|Libre+Franklin:300, 400, 500|Montserrat:300, 400, 500|Open+Sans:300, 400, 500|Raleway:300, 400, 500");

:host {
	-ms-flex: 0 0 25%;
	flex: 0 0 25%;
	max-width: 25%;
	margin-bottom: 0.5em;
	text-align: left;
	
	align-self: flex-start;

	transition: all 0.3s;
}

#evento {
	margin: 0 0.5em;
	padding: 0.5em;
	height: 150px;
	border-radius: 4px;
}

.va {
	background-color: #5534ae;
}

.pa {
	background-color: #93198f;
}

.sg {
	background-color: #ff9000;
}

.so {
	background-color: #aadd000;
}

.uva_general {
	background-color: #0e3675;
}

a:hover {
	text-decoration: none;
}

h1 {
	font-family: "Lato", sans-serif;
	font-size: 3.2em;
	font-weight: 400;
	color: rgba(12, 12, 12, 0.9);
	margin: 0 0.5em;
}

h1 small {
	font-size: 0.4em;
}

p {
	color: rgba(12, 12, 12, 0.9);
	margin: 0 0.5em;
	font-size: 0.8em;
}

h1:hover, p:hover {
	color: rgba(12, 12, 12, 0.8);
	cursor: pointer;
}

.va h1, .pa h1, .va p, .pa p, .uva_general h1, .uva_general p {
	color: white;
}

</style>
<div id="evento">
	<a target="_blank" id="link" href="">
		<h1 id="fecha"></h1>
		<p id="title"></p>
	</a>
</div>
`;
		}
	}

	connectedCallback() {
		// Cuando se conecta al durumdumdumdum
		
		// Añadimos el evento del click
		this.addEventListener('click', this._onclick);
	}

	disconnectedCallback() {
		// Cuando se saca del DOM
		
		// Quitamos el evento del click
		this.removeEventListener('click', this._onclick);
	}


	adoptedCallback() {
		// Cuando se cambia en el DOM de sitio
	}
  
	attributeChangedCallback(name, oldValue, newValue) {
		// Cuando cambia un atributo
	}

	set data(val) {
		// Settado de los datos
		this._data = val;
		// Y luego renderizamos
		this._render();
	}

	_render() {
		// Pintado/renderizado del objeto
		// title = nombre
		// date_ini = fecha de inicio
		// campus_id = campus

		// Si hay campus cogemos los ID y le añadimos su clase
		if (this._data.campus_id) {
			switch (this._data.campus_id) {
				case 0:
					this.shadowRoot.getElementById('evento').classList.add('uva_general');
					break;
				case 188:
					this.shadowRoot.getElementById('evento').classList.add('va');
					break;
				case 191:
					this.shadowRoot.getElementById('evento').classList.add('so');
					break;
				default:
					break;
			}
		}
		
		// Si hay fecha de inicio (que tie que habé)
		if (this._data.date_ini) {
			// La tratamos para sacar el dia y el mes
			let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
			let fechaElemento = this._data.date_ini.split('-')

			// Lo pintamos
			this.shadowRoot.getElementById('fecha').innerHTML = fechaElemento[2].split(' ')[0] + ' <small>' + meses[parseInt(fechaElemento[1])-1] + '</smalll>';
		}
		
		// Si hay titulo en los datos
		if (this._data.title) {
			// Lo cambiamos, pero si es mu gordo, lo cortamos
			if (this._data.title.length > 90) {
				this.shadowRoot.getElementById('title').innerHTML = this._data.title.substr(0,90) + '...';
			} else {
				this.shadowRoot.getElementById('title').innerHTML = this._data.title;
			}
			
		}
		// Añadimos la URL del evento
		this.shadowRoot.getElementById('link').href = 'https://eventos.uva.es/' + this._data.id;

	}


	_onclick(event)  {
		// Metodo cuando haces click
		
		// A donde hace click!
		let el = event.composedPath()[0];
	}
  
}
customElements.define(EventoTexto.is, EventoTexto);