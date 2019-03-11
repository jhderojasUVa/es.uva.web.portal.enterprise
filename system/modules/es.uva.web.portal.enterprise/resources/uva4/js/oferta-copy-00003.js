'use strict';

class UVaOferta extends HTMLElement {
	// Objeto elemento principal de las ofertas
	
	static get is() {
		return 'uva-oferta';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw 'Error al crear el elemento UVaOferta ' + e;
		} finally {
			//Variables
			this._data = [];
			this._filtroEstudios = {
				activo: 0, //Indica si se ha modificado el filtro
				clase: 0, //Indica la clase del estudio a filtrar
				campus: 0, //Indica el campus del estudio a filtrar
				rama: 0, //Indica la rama del estudio a filtrar
				tipolearning: 0,  //Indica el tipo de estudio a filtrar
				menu: 0, //Indicael elemento del menu a filtrar
				tipo: 0 //A partir del menu
			};
			this._listadoCampus = [
				{'id':'0', 'desc': 'Todos los campus'},
				{'id':'47','desc': 'Valladolid'},
				{'id':'34','desc': 'Palencia'},
				{'id':'40','desc': 'Segovia'},
				{'id':'42','desc': 'Soria'},
			];

			//Funciones
			this._processAnswer = this._processAnswer.bind(this);
			this._onmenuclick = this._onmenuclick.bind(this);
			this._onfiltroramasclick = this._onfiltroramasclick.bind(this);
			this._onfiltrotipoestudiosclick = this._onfiltrotipoestudiosclick.bind(this);

			this._loadDatos();

			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
<style>
@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=Alegreya:300, 400, 500|Arvo:300, 400, 500|IM+Fell+English+SC:300, 400, 500|Lato:300, 400, 500|Libre+Franklin:300, 400, 500|Montserrat:300, 400, 500|Open+Sans:300, 400, 500|Raleway:300, 400, 500");
@import url('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
@import url('https://use.fontawesome.com/releases/v5.6.3/css/all.css');
</style>
<div style="width: 100%">
<div class="col-12 col-md-4 header">
<h1 data-i18n-es="oferta educativa" data-i18n-en="educative offer">oferta educativa</h1>
</div>
<div class="col bloque_raya d-none d-md-block">
</div>
<uva-oferta-header id="filtro"></uva-oferta-header>
<div id="estudios_content" class="row no-gutters" style="border: 1px solid #dfe3e9;">
<div class="col-md-3" style="background-color: #dfe3e9;">
<uva-oferta-menu></uva-oferta-menu>
</div>
<div class="col-md-9" id="estudios_contenido">
<img alt="Oferta Educativa" src="./resources/uva4/img/oferta.png" class="img-fluid" style=""/>
</div>
</div>
</div>
`;

		}
	}

	connectedCallback() {
		// Cuando se monta en el DOM
		this.addEventListener('menu_click', this._onmenuclick);
		this.addEventListener('filtro_ramas_click', this._onfiltroramasclick);
		this.addEventListener('filtro_tipoestudio_click', this._onfiltrotipoestudiosclick);
	}

	disconnectedCallback() {
		// Cuando se desconecta del DOM
		this.removeEventListener('menu_click', this._onmenuclick);
		this.removeEventListener('filtro_ramas_click', this._onfiltroramasclick);
		this.removeEventListener('filtro_tipoestudio_click', this._onfiltrotipoestudiosclick);
	}

	adoptedCallback() {
		// Cuando se cambia de sitio en el DOM
	}
	attributeChangedCallback(name, oldValue, newValue) {
		// Cuando cambia algun atributo
	}

	set data(val) {
		// Settado de los valores
		// Modificamos los datos de la navegación
		this._data = val;
	}

	_loadDatos() {
		// Carga de los datos
		
		// URLs de donde estan los sitios
		let urls = [
			'https://www-des.uva.es/ws/estudios.jsp',
			'https://www-des.uva.es/ws/doctorado.jsp',
			'https://www-des.uva.es/ws/titulos.jsp',
			'https://www-des.uva.es/ws/cursos.jsp',
		];
		
		//Hacemos el fetch de todas las URLs
		let data = Promise.all(
			urls.map((url) => loadJSON(url))
		).then(respuestas => {
			// Todas
			respuestas.forEach((element) => {
				this._processAnswer(element);
			});
		}).then(respuesta => {
			// Renderizamos para cada una de ellas
			this._render();
		}).catch(function(error) {
			// Si algo ha ido mal
			console.warn('Error al cargar los datos de la Oferta Educativa: ');
			console.warn(error);
		});
	}

  _render() {
    // Comprobamos que elemento del menu está seleccionado
    switch (this._filtroEstudios.menu) {
      case 1:
      case 2:
        this.shadowRoot.getElementById('filtro').style.display = 'block';
        break;
      case 3:
      case 4:
      case 5:
        this.shadowRoot.getElementById('filtro').style.display = 'none';
        break;
      default:
        this.shadowRoot.getElementById('filtro').style.display = 'none';
        break;
    }

    // Comprobamos que se ha modificado el filtro
    if (this._filtroEstudios.activo === 0) {
      return;
    }
    
    let elementos = this._filtro();
    // Limpiamos los elementos
    let capa = this.shadowRoot.getElementById('estudios_contenido'); // Vamos a donde han de salir las cosas
	
    while (capa.firstChild) {
      // Del todo, lo quitamos del todo
      capa.removeChild(capa.firstChild);
    }
	
    if (elementos && elementos.length > 0) {
      // Recorremos para cada campus
      this._listadoCampus.forEach(campus => {
	  	// Filtramos el contenido segun el campus
        let elementos_campus = elementos.filter(elemento => (elemento['ficha.campus_prop'] === campus.id));
		// Si hay yogurt dentro
        if (elementos_campus.length > 0) {
		  // Creamos un elemento del campus
          let element_campus = new UVaOfertaCampus();
		  // Le damos de comer
          element_campus.data = campus;
          element_campus.elementos = elementos_campus;
		  // Lo añadimos al shadow y por lo tanto a la vista
          this.shadowRoot.getElementById("estudios_contenido").appendChild(element_campus);
        }
      });
    } else {
      // No tenemos estudios que cumplan el filtro
	  // Creamos un elemento P
      let texto = document.createElement('p');
	  // Le metemos un contenido al P
      texto.innerHTML = 'No hay estudios que cumplan el criterio de búsqueda';
	  // Lo añadimos
      this.shadowRoot.getElementById('estudios_contenido').appendChild(texto);
    }
  }


	_filtro() {
		// "Crea" los estudios (los elementos) y les asigna el contenido filtrado (o no)
		// Obtenemos los elementos a partir de los datos, famos filtramos los datos segun el filtro que hemos obtenido en el objeto
		let elementos = this._data.filter(this._filtro_element,this);
		// Ordenamos por la denominación o la descripción del curso
		elementos.sort((a,b) => {
			if (a.DesCur < b.DesCur || a.DENOMINACION < b.DENOMINACION) {
				return -1;
			}
			if (a.DesCur > b.DesCur || a.DENOMINACION > b.DENOMINACION) {
				return 1;
			}
			return 0;
		});
		// Devolvemos el resultado tras ordenar
		return elementos;
	}

	_filtro_element(elemento) {
		// Funcion que hace el filtrado
		// Devuelve true si filtra por esa "cosa"
		// Devuelve false si no ha de filtrar por esa cosa

		switch (this._filtroEstudios.menu) {
			case 1:
			case 2:
				if (this._filtroEstudios.campus != 0) {
					if (elemento['ficha.campus_prop'] != this._filtroEstudios.campus) return false;
				}
				if (this._filtroEstudios.rama != 0) {
					if (elemento['ficha.rama_prop'] != this._filtroEstudios.rama) return false;
				}
				if (this._filtroEstudios.tipolearning != 0) {
					if (elemento['ficha.tipolearning_prop'] != this._filtroEstudios.tipolearning) return false;
				}
				break;
			case 3:
			case 4:
			case 5:
				break;
										 }

		if (this._filtroEstudios.menu != 0) {
			if (elemento['tipo'] != this._filtroEstudios.menu) return false;
		}

		return true;
	}


	_onmenuclick(event) {
		// Evento del click a un elemento del menu

		if (event && event.detail) {
			// Sacamos el id
			let dataid = event.detail.data;
			// Decimos que el filtro esta activo
			this._filtroEstudios.activo = 1;
			// Metemos a donde apunta el filtro
			this._filtroEstudios.menu = dataid;

			/*
			switch (this._filtroEstudios.menu) {
				case 3:
				case 4:
				case 5:
					//this._filtroEstudios.clase=0;
					//this._filtroEstudios.rama=0;
					//this._filtroEstudios.tipolearning=0;
					break;
				default:
					break;
			}
			*/
			// Renderizamos
			this._render();
		}
	}

	_onfiltroramasclick(event) {
		// Evento de filtro a las ramas cuando haces click
		
		if (event && event.detail ) {
			// Sacamos el id
			let dataid = event.detail.data;
			// Decimos que el filtro esta activo
			this._filtroEstudios.activo = 1;
			// Metemos donde apunta el filtro
			this._filtroEstudios.rama = dataid;
			// Renderizamos
			this._render();
		}
	}

	_onfiltrotipoestudiosclick(event) {
		// Evento del filtro por tipo de estudios cuando haces click
		if (event && event.detail) {
			// Sacamos el id
			let dataid = event.detail.data;
			// Decimos que el filtro esta activo
			this._filtroEstudios.activo = 1;
			// Metemos donde apunta el filtro
			this._filtroEstudios.tipolearning = dataid;
			// Renderizamos
			this._render();
		}
	}

	_processAnswer(data) {
		// Funcion para insertar los estudios en el array de estudios
		if (data.response && data.response.numFound > 0 && data.response.docs) {
			// Si hay estudios
			let theResponse = data.response.docs; // Para usarlo mas facilmente
			// Ordenamos
			theResponse.sort((elemA, elemB) => {
				// por campus de menor a mayor numero de campus
				return parseInt(elemA['ficha.campus_prop']) - parseInt(elemB['ficha.campus_prop']);
			});
			// Recorremos
			theResponse.forEach((doc) => {
				// Miramos el tipo, especialmente para los Solr. La idea es transformar un texto a un número
				if (doc.type) {
					switch(doc.type) {
						case "estudios":
							switch (doc['campo.tipo_prop']) {
								case "1":
									doc.tipo = 1;
									break;
								case "2":
									doc.tipo = 2;
									break;
														  }
							break;
						case 'doctorado':
							doc.tipo = 3;
							break;
						case 'titulos':
							doc.tipo = 4;
							break;
						case 'cursos':
							doc.tipo = 5;
							break;
						default:
							break;
								   }
				}
				// Y los añaadimos
				this._data.push(doc);
			});
		} else {
			// Si no hay estudios mostramos un error
			throw "Error en la lectura de los estudios";
		}
	}
}
customElements.define(UVaOferta.is, UVaOferta);


class UVaOfertaHeader extends HTMLElement {
	// Objeto de cabecera la oferta

	static get is() {
		return 'uva-oferta-header';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw 'Error al crear el elemento UVaOfertaHeader ' + e;
		} finally {
			//Variables
			this._data = undefined;

			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
<style>
@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=Alegreya:300, 400, 500|Arvo:300, 400, 500|IM+Fell+English+SC:300, 400, 500|Lato:300, 400, 500|Libre+Franklin:300, 400, 500|Montserrat:300, 400, 500|Open+Sans:300, 400, 500|Raleway:300, 400, 500");
@import url('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
@import url('https://use.fontawesome.com/releases/v5.6.3/css/all.css');
</style>
<div class="row" id="filtro" style=" margin-top: -5px; margin-left: 0; margin-right: 0;border-left: 1px solid #dfe3e9; border-top: 1px solid #dfe3e9; border-right: 1px solid #dfe3e9; transition: all 0.25s;">
<!-- campus -->
<div class="col-md-3" style="background-color: #dfe3e9; padding: 0.5em 0;">
<!-- Life is empty -->
&nbsp;
</div>
<!-- ramas -->
<div class="col-md-6 text-center" style="background-color: white; padding: 0.5em 0;">
<uva-oferta-filtro-ramas>
</uva-oferta-filtro-ramas>
</div>
<div class="col-md-3 text-center" style="background-color: white; padding-top: 0.5em;">
<uva-oferta-filtro-tipoestudios>
</uva-oferta-filtro-tipoestudios>
</div>
</div>
`;
		}
	}
}
customElements.define(UVaOfertaHeader.is, UVaOfertaHeader);

class UVaOfertaFiltro extends HTMLElement {
	// Objeto del estudio en concreto tras haber recibido el filtro de los estudios

	static get is() {
		return 'uva-oferta-filtro';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw 'Error al crear el elemento UVaOfertaFiltro ' + e;
		} finally {
			// Variables
			this._data = undefined;
			this._selected = undefined;
			this._event_name = 'filtro_click';
			// Funciones
			this._onclick = this._onclick.bind(this);

			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
<style>
@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=Alegreya:300, 400, 500|Arvo:300, 400, 500|IM+Fell+English+SC:300, 400, 500|Lato:300, 400, 500|Libre+Franklin:300, 400, 500|Montserrat:300, 400, 500|Open+Sans:300, 400, 500|Raleway:300, 400, 500");
@import url('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
@import url('https://use.fontawesome.com/releases/v5.6.3/css/all.css');

.active {
background-color: #ff0;
}
</style>
`;
		}
	}

	connectedCallback() {
		// Cuando aparece en el DOM
		this.addEventListener('click', this._onclick);
	}

	disconnectedCallback() {
		// Cuando se quita del DOM
		this.removeEventListener('click', this._onclick);
	}

	adoptedCallback() {
		// Cuando se mueve en el DOM
	}
  
	attributeChangedCallback(name, oldValue, newValue) {
		// Cuando cambia alguna propiedad
	}

	_render() {
		// Quitamos el activo de todos
		let elements = this.shadowRoot.querySelectorAll('.active');
		
		for (let i = 0; i < elements.length; i++) {
			// Hacer un remove tarda menos que hacer un classname entero
			elements[i].classList.remove('active');
		}
		// Se lo ponemos al seleccionado
		if (this._selected !== undefined && this.shadowRoot.getElementById(this._selected)) {
			this.shadowRoot.getElementById(this._selected).classList.add('active');
		}
	}

	_onclick(event)  {
		// Evento de click!
		
		// Definimos como no definido para hacer el hueco la variable id
		//let elId = undefined;
		// Sacamos el objeto al que apunta del path
		let el = event.composedPath()[0];
		
		// Si donde apunta hay yogurt
		if (el) {
			// Sacamos el id del atributo y lo metemos
			this._selected = parseInt(el.getAttribute('dataid'));

			// Disparamos el evento de click en la navegacion
			let ev = new CustomEvent(this._event_name, {
				bubbles: true,
				cancelable: false,
				composed: true,
				detail: { data: parseInt(el.getAttribute('dataid')) }
			});
			this.dispatchEvent(ev);

			this._render();
		}
	}
}
customElements.define(UVaOfertaFiltro.is, UVaOfertaFiltro);

class UVaOfertaMenu extends UVaOfertaFiltro 
	// Objeto hijo de filtro que es el menu y por eso su padre es filtro
	static get is() {
		return 'uva-oferta-menu';
	}

	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw 'Error al crear el elemento UVaOferta ' + e;
		} finally {
			this._event_name = 'menu_click';
			this.shadowRoot.innerHTML = `
<style>
.active {
background-color: #ff0;
}
</style>
<nav class="nav flex-column" style="/*margin: 1em 0;*/">
	<a class="nav-link tab azul_blanco" data-i18n-es="GRADOS" data-i18n-en="UNDERGRADUATE" id="1" dataid="1">GRADOS</a>
	<a class="nav-link tab azul_blanco" data-i18n-es="MÁSTERES" data-i18n-en="GRADUATE" id="2" dataid="2">MÁSTERES</a>
	<a class="nav-link tab azul_blanco" data-i18n-es="DOCTORADO" data-i18n-en="PhD" id="3" dataid="3">DOCTORADO</a>
	<a class="nav-link tab azul_blanco" data-i18n-es="TITULOS PROPIOS" data-i18n-en="OWN TITLES" id="4" dataid="4" role="link">TITULOS PROPIOS</a>
	<a class="nav-link tab azul_blanco" data-i18n-es="FORMACIÓN CONTINUA" data-i18n-en="CONTINOUS FORMATION" id="5" dataid="5" role="link" rel="noopener noreferrer">FORMACIÓN CONTINUA</a>
</nav>
	`;
		}
	}

}
customElements.define(UVaOfertaMenu.is, UVaOfertaMenu);

class UVaOfertaFiltroRamas extends UVaOfertaFiltro {
	// Objeto que amplia filtro para saber las ramas
	
	static get is() {
		return 'uva-oferta-filtro-ramas';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw 'Error al crear el elemento UVaOferta ' + e;
		} finally {
			//Variables
			this._event_name = 'filtro_ramas_click';

			this.shadowRoot.innerHTML = `
<style>
.active {
background-color: #ff0;
}
</style>
<h2 class="text-center" data-i18n-es="RAMAS" data-i18n-en="BRANCHES" style="font-size: 1em; font-weight: 500;">RAMAS</h2>
<div class="text-left" style="margin-left: 15%">
<button class="btn azul_blanco active" data-i18n-es="Todos" data-i18n-en="All" id="0" dataid="0">Todos</button>
<button class="btn azul_blanco" data-i18n-es="Artes y Humanidades" data-i18n-en="Arts and Humanities" id="1" dataid="1">Artes y Humanidades</button>
<br />
<button class="btn azul_blanco" data-i18n-es="Ciencias" data-i18n-en="Science" id="2" dataid="2">Ciencias</button>
<button class="btn azul_blanco" data-i18n-es="Ciencias de la salud" data-i18n-en="Health sciences" id="3" dataid="3">Ciencias de la salud</button>
<br />
<button class="btn azul_blanco" data-i18n-es="Ciencias Sociales y Juridicas" data-i18n-en="Social and Legal sciences" id="4" dataid="4">Ciencias Sociales y Juridicas</button>
<button class="btn azul_blanco" data-i18n-es="Ingeniería y Arquitectura" data-i18n-en="Engineering and architecture" id="5" dataid="5">Ingeniería y Arquitectura</button>
</div>
`;
		}
	}
}
customElements.define(UVaOfertaFiltroRamas.is, UVaOfertaFiltroRamas);

class UVaOfertaFiltroTipoEstudio extends UVaOfertaFiltro {
	// Objeto que amplia filtro para saber los tipos de estudios
	
	static get is() {
		return 'uva-oferta-filtro-tipoestudios';
	}
  
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw 'Error al crear el elemento UVaOferta ' + e;
		} finally {
			this._event_name = 'filtro_tipoestudio_click';

			this.shadowRoot.innerHTML = `
<style>
.active {
background-color: #ff0;
}
</style>
<h2 class="text-center" data-i18n-es="TIPOS DE ESTUDIO" data-i18n-en="TYPES OF STUDY" style="font-size: 1em; font-weight: 500;">TIPO DE ESTUDIO</h2>
<div class="text-left" style="margin-left: 15%">
<button class="btn azul_blanco active" data-i18n-es="Todos" style="width: 90%" data-i18n-en="All" id="0" dataid="0">Todos</button>
<br />
<button class="btn azul_blanco" data-i18n-es="Presencial" style="width: 90%" data-i18n-en="On-site" id="1" dataid="1">Presencial</button>
<br />
<button class="btn azul_blanco" data-i18n-es="Semipresencial" style="width: 90%" data-i18n-en="Blended" id="2" dataid="2">Semipresencial</button>
<!--
<button class="btn azul_blanco" data-i18n-es="Online" data-i18n-en="Online" id="3" dataid="3">Online</button>
-->
</div>
`;
		}
	}

}
customElements.define(UVaOfertaFiltroTipoEstudio.is, UVaOfertaFiltroTipoEstudio);

class UVaOfertaCampus extends HTMLElement {
	// Objeto que pinta la oferta segun los campus
	
	static get is() {
		return 'uva-oferta-campus';
	}
  
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw 'Error al crear el elemento UVaOferta ' + e;
		} finally {
			// Variables
			this._data = undefined;
			this._elements = undefined;
			// Funciones
			this._onclick = this._onclick.bind(this);

			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
<h2 id="title" class="campus">
<a id="bntCampus" class="btnCampus" campus=""></a> <i class="fas fa-angle-down" style="float: right"></i>
</h2>
`;
		}
	}

	connectedCallback() {
		// Cuando aparece en el DOM
		this.addEventListener('click', this._onclick);
	}

	disconnectedCallback() {
		// Cuando se quita del DOM
		this.removeEventListener('click', this._onclick);
	}

	adoptedCallback() {
		// Cuando se mueve en el DOM
	}
  
	attributeChangedCallback(name, oldValue, newValue) {
		// Cuando se cambia un atributo
	}

	set data(val) {
		// Settamos, modificamos los datos de la navegación
		this._data = val;
		this._render();
	}

	set elementos(val) {
		//Setta,ps, modificamos los datos de la navegación
		this._elements = val;
		this._render();
	}

	_render() {
		// Metodo de renderizado
		
		// Si hay datos, si tiene yogurt
		if (this._data) {
			this.shadowRoot.getElementById('bntCampus').innerText = this._data.desc;
		}
		
		// Si hay elementos
		if (this._elements) {
			// Los recordamos
			this._elements.forEach((element) => {
				// Creamos elementos de los estudios
				let element_estudio = new UVaOfertaEstudio();
				// Le metemos el contenido
				element_estudio.data = element;
				// Le añadimos al DOM
				this.shadowRoot.appendChild(element_estudio);
			});
		}
	}

	_onclick(event) {
		// Metodo del evento del click
		
		// Definimos el identificador, hacemos el hueco
		let elId = undefined;
		// Sacamos el elemento donde ha hecho click del evento
		let el = event.composedPath()[0];
		// Si hay elemento
		if (el) {
			// 
			elId = parseInt(el.getAttribute("dataid"));
		}
	}
}
customElements.define(UVaOfertaCampus.is, UVaOfertaCampus);

class UVaOfertaEstudio extends HTMLElement {
	// Objeto de oferta de estudio
	
	static get is() {
		return 'uva-oferta-estudio';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw 'Error al crear el elemento UVaOferta ' + e;
		} finally {
			// Variables
			this._data = undefined;
			// Funciones
			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
<style>
:host { }
:host p { font-size: 0.9rem; line-height: 1; margin-left: 0.5em; }
:host p a { text-decoration: none; color: rgba(55, 55, 55, 0.8);}
:host p a:hover { text-decoration: underline; }
</style>
<p ><a id="enlace" target="_blank" role="link"></a></p>
`;
		}
	}

	connectedCallback() {
		// Cuando se monta en el DOM
	}
	
	disconnectedCallback() {
		// Cuando se saca del DOM
	}
	
	adoptedCallback() {
		// Cuando se mueve dentro del DOM
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
		// Cuando cambia un atributo
	}

	set data(val) {
		// Settado de los datos
		// Modificamos los datos de la navegación
		this._data = val;
		this._render();
	}

	_render() {
		// Motodo de renderizado
		// Si hay datos...
		if (this._data) {
			// Buscamos dentro el elemento
			let element_link = this.shadowRoot.getElementById('enlace');
			// Se podria "switchcasear"?
			if ((this._data['campo.tipo_prop'] == 1) || (this._data['campo.tipo_prop'] == 2) || (this._data['campo.tipo_prop'] == 5) {
				// Si son cosas de la web de la UVa
				element_link.setAttribute('href', 'http://www.uva.es' + this._data.link);
				let title = this._data.title;
				if (title) title.replace('(PA)', '').replace('(SG)', '').replace('(SO)', '');
				element_link.innerText = title;
			} else if (this._data['campo.tipo_prop'] == 3) {
				// Si son cosas de fuera de la web de la UVa
				element_link.setAttribute('href',this._data.URL);
				element_link.innerText = this._data.DENOMINACION;
			}  else if (this._data['campo.tipo_prop'] == 4) {
				// Si es sigma, atento que esta hardcodeada la URL por... en fin...
				element_link.setAttribute('href', 'https://alumnos.sigma.uva.es/cowep/control/consultaEPTipo?entradaPublica=true&idioma=es.ES&centro=140&ano=2018');
				element_link.innerText = this._data.DesCur;
			} /*else if (this._data['campo.tipo_prop'] == 5) {
			
				element_link.setAttribute('href', 'http://www.uva.es'+this._data.link);       
				element_link.innerText=this._data.title;
			} */
		}
	}

}
customElements.define(UVaOfertaEstudio.is, UVaOfertaEstudio);