'use strict';

class UVANoticias extends HTMLElement {
	// Objeto/Clase de las noticias
	// Este objeto es el padre de todas las noticias, el agujero donde se hacen las noticias
	static get is() {
		return 'uva-noticias';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVANoticias: " + e;
		} finally {
			// Propiedades del objeto
			this._urldata = undefined;
			this._data = undefined;
			this._datanum = 4;
			this._localedata = "es";
			// Metodos del objeto
			this._onclick = this._onclick.bind(this);
			// Creamos el shadow del elemento
			let shadowRoot = this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
<style>
/* Bootstrap */
@import url(https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css);
:host {
display: -ms-inline-flexbox;
display: -webkit-inline-flex;
display: inline-flex;

-webkit-flex-direction: row;
-ms-flex-direction: row;
flex-direction: row;
flex-flow: row wrap;

webkit-flex-wrap: wrap;
-ms-flex-wrap: wrap;
flex-wrap: wrap;

-webkit-justify-content: flex-start;
-ms-flex-pack: start;
justify-content: flex-start;
-webkit-align-content: stretch;
-ms-flex-line-pack: stretch;
align-content: stretch;
-webkit-align-items: flex-start;
-ms-flex-align: start;
align-items: flex-start;
}

@media all and (min-width: 1200px) {
:host {
-webkit-flex-direction: row;
-ms-flex-direction: row;
flex-direction: row;
}
}

@media all and (max-width: 1199px) {
:host {
-webkit-flex-direction: row;
-ms-flex-direction: row;
flex-direction: row;
}
}

@media all and (max-width: 999px) {
:host {
-webkit-flex-direction: row;
-ms-flex-direction: row;
flex-direction: row;
}
}

@media all and (max-width: 769px) {
:host {
-webkit-flex-direction: column;
-ms-flex-direction: column;
flex-direction: column;
}
}

@media all and (max-width: 400px) {
:host {
-webkit-flex-direction: column;
-ms-flex-direction: column;
flex-direction: column;
}

}

@import url("https://fonts.googleapis.com/css?family=Alegreya:300, 400, 500|Arvo:300, 400, 500|IM+Fell+English+SC:300, 400, 500|Lato:300, 400, 500|Libre+Franklin:300, 400, 500|Montserrat:300, 400, 500|Open+Sans:300, 400, 500|Raleway:300, 400, 500");
h1, h2, h3 {
/*font-family: "Libre Franklin", sans-serif;*/
font-family: "Montserrat", sans-serif
}

h4, h5, h5 .opensans, p .pie_foto, li .pie_foto {
font-family: "Open Sans", sans-serif; 
}

h5 .arvo {
font-family: "Arvo", serif; 
}

p, li {
font-family: "Lato", sans-serif; 
}

h1 .titulos_cortos {
font-family: "Montserrat", sans-serif; 
}

blockquote {
font-family: "Raleway", sans-serif; }

.script {
font-family: "IM Fell English", serif; }

h1 {
color: rgba(55, 55, 55, 0.9);
font-weight: 300;
font-size: 2.8em;
line-height: 1.0em;
margin-bottom: .1em;
margin-top: .1em; }
h1 .titulos_cortos {
font-weight: 400; }

h2 {
color: rgba(55, 55, 55, 0.8);
font-weight: 300;
font-size: 2.5em;
line-height: 1.0em;
margin-top: .2em;
margin-bottom: .0em; }

h3 {
color: rgba(55, 55, 55, 0.8);
font-weight: 300;
font-size: 1.3em;
line-height: 1.4em;
margin-top: .5em;
margin-bottom: .5em; }

h4 {
color: rgba(55, 55, 55, 0.8);
font-weight: 400;
font-size: .8em;
line-height: 1.4em;
margin-top: .5em;
margin-bottom: .5em; }

h5 {
font-weight: 400;
color: rgba(55, 55, 55, 0.8);
font-size: .65em;
line-height: 1.4em;
margin-top: .5em;
margin-bottom: .5em; }

p, li {
font-weight: 300;
font-size: 1.15em;
line-height: 1.4em;
margin-top: .5em;
margin-bottom: .5em;
color: rgba(55, 55, 55, 0.8); }
p .pie_foto, li .pie_foto {
font-size: .65em;
font-weight: 400;
color: #373737;
line-height: 1.4em;
margin-top: .5em;
margin-bottom: .5em; 
}

blockquote {
font-size: 2em;
line-height: 1.0;
color: rgba(227, 5, 74, 0.75); 
}

</style>
<div style="width: 100%">
	<div class="header">
		<h1>Noticias</h1>
	</div>
	<div class="col bloque_raya d-none d-md-block">
		<span class="masinformacion">
		<a href="http://comunicacion.uva.es" target="_blank" role="link" rel="noopener noreferrer">
			<span data-i18n-es="más información" data-i18n-en="read more">más información</span> 
			<span class="flecha"><i class="fas fa-angle-right"></i></span>
		</a>
		</span>
	</div>
</div>
`;

		}
	}

	connectedCallback() {
		// Cuando el elemento aparece en el DOM
		// Añadimos el listener del click del elemento
		this.addEventListener('click', this._onclick);
		// Los datos
		if (this.getAttribute("data"))
			this._urldata = this.getAttribute('data');
		// Los numeros a mostrar
		if (this.getAttribute("num"))
			this._datanum = parseInt(this.getAttribute('num'));
		// El idioma
		if (this.getAttribute("locale"))
			this._localedata = parseInt(this.getAttribute('locale'));
		// Cargamos los datos
		this._loadDatos();
	}

	disconnectedCallback() {
		// Desconectamos el listener del elemento
		this.removeEventListener('click', this._onclick);
	}

	adoptedCallback() {  }
  
	static get observedAttributes() {
		// Metemos un observable en el idioma por si cambia
		return ['locale'];
	}

	attributeChangedCallback(name, oldValue, newValue) { 
		// Si cambia alguna propiedad del elemento
		
		// Si cambia el idioma, lo re-renderizamos
		if (name === "locale") {
			this._localedata = newValue;
			this._render();
		}
	}

	set data(val) {
		//Modificamos los datos de la navegación
		this._data = val;
	}

	_loadDatos() {
		// Metodo de carga de datos
		loadJSON(this._urldata)
			.then((elemento) => {
			this._data = elemento;
			this._render();
		})
			.catch(function(error) {
			// Si hay un error
			console.warn('Error al consultar los datos: ', error);
		});
	}

	_render() {
		// Metodo de renderizado del padre de todas las noticias
		let count = 1;
		// Si no hay datos, pa'ke hacer nada...
		if (!this._data) {
			return;
		}
		// Si hay datos, los recorremos y pintamos las noticias dependiendo del tipo de noticia
		this._data.forEach(doc => {
			if (count > parseInt(this._datanum)) return;
			count++;
			let noticia ;
			// Si es de imagen
			// Esto se puede poner un case mas adelante, en la siguient refactorizacion
			if (doc.image) {
				noticia = new UVANoticiaImagen();
			} else {
				// Si no es de texto
				noticia = new UVANoticiaTexto()
			}
			// Pasamos el locale a la noticia
			noticia.locale = this._localedata;
			// Pasamos los datos
			noticia.doc = doc;
			// Lo añadimos al durumdumdumdum
			this.shadowRoot.appendChild(noticia);
		});
	}

	_onclick(event)  {
		// Evento de click al grupo gordo de noticias
	}
}
customElements.define(UVANoticias.is, UVANoticias);

class UVANoticia extends HTMLElement {
    static get is() {
      return 'uva-noticia';
    }
    constructor(...args) {
      // Constructor
      try {
        const self = super(...args);
      } catch(e) {
        // Si no somos capaces de cargar al padre, error
        throw "Error al crear el elemento UVANoticia " + e;
      } finally {
        //Variables
        this._doc=undefined;
        this._locale=undefined;
        // Creamos el shadow del elemento
        let shadowRoot = this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
          /* Importamos bootstrap */
          <style>
          </style>
          
          `;
      }
    }
  
    connectedCallback() {
        this.addEventListener('click', this.onclick);
    }
  
    disconnectedCallback() {
        this.removeEventListener('click', this.onclick);
    }
  
    adoptedCallback() {  }
    attributeChangedCallback(name, oldValue, newValue) {  }
  
    set doc(val) {
      this._doc=val;
    }

    set locale(val) {
      this._locale=val;
    }

  
  }
  customElements.define(UVANoticia.is, UVANoticia);
  
class UVANoticiaTexto extends UVANoticia {
	// Objeto/Clase de la noticia de texto
	
	static get is() {
		return 'uvanoticia-texto';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVANoticiaTexto: " + e;
		} finally {
			// Variables
			this._doc = undefined;
			// Creamos el shadow del elemento
			this.shadowRoot.innerHTML = `
<style>
:host {
-webkit-order: 0;
-ms-flex-order: 0;
order: 0;
-webkit-flex: 1 1 20%;
-ms-flex: 1 1 20%;
flex: 1 1 20%;

-webkit-align-self: auto;
-ms-flex-item-align: auto;
align-self: auto;

padding-top: 10px;
padding-right: 10px;
padding-bottom: 10px;
padding-left: 10px;
}

a, a:link, a:visited, a:hover, a:active  {
color: black;
text-decoration: none;
}

</style>
<a id="link" href="">
<div class="headline">
<div class="category">Categoria</div>
<h2 id="title"Titulo</h2>
</div>
</a>
`;
		}
	}

	set doc(val) {
		// Setter para pillar los datos
		
		// Si hay datos lo pintamos
		if (val) {
			// Buscamos en el shadow el titulo para ponerlo segun el idioma del locale
			var element = this.shadowRoot.getElementById('title');
			element.innerHTML = val.title;
			// Ponemos el texto correspondiente buscando en los locales de los datos
			if (this._locale && val.locales) {
				let locale = this._locale;
				let res = val.locales.find(function(element) {
					return element.id === locale;
				});
				// Si en los datos hay resultado, le ponemos el titulo del resultado
				if (res) {
					element.innerHTML = res.title;
				}
			}
			// Metemos el link buscandolo en el shadowDOM
			var element = this.shadowRoot.getElementById('link');
			element.href = val.link;
			//let html='';
		} else {
			// Sino, trincamos el elemento para que no se pueda seleccionar ni modificar ni nada
			this.removeAttribute('open');
		}
		// Metemos en el objeto los datos para que los tenga
		this._doc = val;
	}

}

customElements.define(UVANoticiaTexto.is, UVANoticiaTexto);

class UVANoticiaImagen extends UVANoticia {
	// Objeto/Clase de noticia con imagen
	static get is() {
		return 'uvanoticia-imagen';
	}
	
	constructor(...args) {
		// Constructor
		try {
			const self = super(...args);
		} catch(e) {
			// Si no somos capaces de cargar al padre, error
			throw "Error al crear el elemento UVANoticiaImagen: " + e;
		} finally {
			// Propiedades del objeto
			this._doc = undefined;
			// Creamos el shadow del elemento
			this.shadowRoot.innerHTML = `
<style>
:host {
-webkit-order: 0;
-ms-flex-order: 0;
order: 0;
-webkit-flex: 1 1 20%;
-ms-flex: 1 1 20%;
flex: 1 1 20%;

-webkit-align-self: auto;
-ms-flex-item-align: auto;
align-self: auto;

padding-top: 10px;
padding-right: 10px;
padding-bottom: 10px;
padding-left: 10px;
}

a, a:link, a:visited, a:hover, a:active  {
color: black;
text-decoration: none;
}
img {
max-width:100%;
}

</style>
<a id="link" href="">
<div class="headline">
	<div class="category">Categoria I</div>
	<div class="text-center">
		<h2 id="title"Titulo</h2>
	</div>
		<div class="text-center">
			<img id="photo" class="img-thumbnail rounded" src="/image.jpeg">
		</div>
	</div>
</a>
`;
		}
	}

	set doc(val) {
		// Setter que mete los valores en el objeto
		
		// Si hay datos los metemos
		if (val) {
			// Buscamos el title en el shadow del objeto para ponerlo
			var element = this.shadowRoot.getElementById('title');
			element.innerHTML = val.title;
			// Vemos a ver los idiomas para sacar la enjundia (el texto)
			if (this._locale && val.locales) {
				let locale = this._locale;
				let res = val.locales.find(function(element) {
					return element.id === locale;
				});
				// Si hay, lo ponemos, que narices
				if (res) {
					element.innerHTML = res.title;
				}
			}

			// El link de Legend of Zelda
			element = this.shadowRoot.getElementById('link');
			element.href = val.link;

			// Buscamos la foto
			element = this.shadowRoot.getElementById('photo');

			if (val.image) {
				// Si hay imagen
				let url = val.image;
				// Ponemos la URL bien que es un desastre
				url = url.replace("/sites/comunicacion","http://comunicacion.uva.es");
				// Y ponemos la imagen en la imagen (en el src del elemento imagen)
				element.src = url;
			}
		} else {
			// Trincamos el shadow
			this.removeAttribute('open');
		}
		
		// Metemos los datos del objeto en el objeto
		this._doc = val;
	}

}

customElements.define(UVANoticiaImagen.is, UVANoticiaImagen);