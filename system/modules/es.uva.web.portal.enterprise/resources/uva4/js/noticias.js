'use strict';

class UVANoticias extends HTMLElement {
  static get is() {
    return 'uva-noticias';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento UVANoticias " + e;
    } finally {
      //Variables
      this._urldata=undefined;
      this._data=undefined;
      this._datanum=4;
      this._localedata="es";
      //Funciones
      this._onclick = this._onclick.bind(this);
      // Creamos el shadow del elemento
      //let shadowRoot = this.attachShadow({ mode: 'open' });
      let shadowRoot = this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
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
          <h1 data-i18n-es="Noticias" data-i18n-en="News">Noticias</h1>
        </div>
        <div class="col bloque_raya d-none d-md-block">
          <span class="masinformacion">
            <a href="http://comunicacion.uva.es" target="_blank" role="link" rel="noopener noreferrer">
              <span data-i18n-es="más información" data-i18n-en="read more">más información</span> 
              <!--<span  data-i18n="noticias:noticias.more">¡más información!</span>-->
              <span class="flecha"><i class="fas fa-angle-right"></i></span>
            </a>
          </span>
        </div>
      </div>
      `;

    }
  }

  connectedCallback() {
    this.addEventListener('click', this._onclick);
    if (this.getAttribute("data"))
      this._urldata = this.getAttribute('data');
    if (this.getAttribute("num"))
      this._datanum = parseInt(this.getAttribute('num'));
    if (this.getAttribute("locale"))
      this._localedata = parseInt(this.getAttribute('locale'));
    this._loadDatos();
  }

  disconnectedCallback() {
  	this.removeEventListener('click', this._onclick);
  }

  adoptedCallback() {  }
  
  static get observedAttributes() {
    return ['locale'];
  }

  attributeChangedCallback(name, oldValue, newValue) { 
    if (name==="locale") {
      this._localedata=newValue;
      this._render();
    }

  }

  set data(val) {
    //Modificamos los datos de la navegación
    this._data=val;
  }

  _loadDatos() {
    loadJSON(this._urldata)
    .then((elemento) => {
      this._data=elemento;
      this._render();
    })
    .catch(function(error) {
      console.warn('Error al consultar los datos de eventos', error);
    });
  }

  _render() {
    let count=1;
    if (!this._data) {
      return;
    }
    this._data.forEach(doc => {
      if (count > parseInt(this._datanum)) return;
      count++;
      let noticia ;
      if (doc.image) {
        noticia = new UVANoticiaImagen();
      } else {
        noticia = new UVANoticiaTexto()
      }
      noticia.locale=this._localedata;
      noticia.doc=doc;
      this.shadowRoot.appendChild(noticia);
    });
  }

  _onclick(event)  {
    console.log("UVANoticias ON CLICK");
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
    static get is() {
      return 'uvanoticia-texto';
    }
    constructor(...args) {
        // Constructor
        try {
          const self = super(...args);
        } catch(e) {
          // Si no somos capaces de cargar al padre, error
          throw "Error al crear el elemento UVANoticiaTexto " + e;
        } finally {
          //Variables
          this._doc=undefined;
          // Creamos el shadow del elemento
          //let shadowRoot = this.attachShadow({ mode: 'open' });
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
              <!--
              <div class="details">
                <div class="time-ago">734 days ago</div>
                <div class="author">Melissa Horwitz</div>
              </div>
              -->
            </div>
          </a>
            `;
        }
    }
  
    set doc(val) {
      if (val) {
        //var element = this.shadowRoot.querySelector('#title');
        var element = this.shadowRoot.getElementById('title');
        element.innerHTML=val.title;
        //element = this.shadowRoot.querySelector('#link');
        //element.href=val.link;

        if (this._locale && val.locales) {
          let locale=this._locale;
          let res=val.locales.find(function(element) {
            return element.id===locale;
          });
          if (res) {
            element.innerHTML=res.title;
          }
        }

        var element = this.shadowRoot.getElementById('link');
        element.href=val.link;

        let html='';
        //if (val.Title_prop) {
        //  html+=' <h1><a href="http://comunicacion.uva.es'+val.link+'" target="_blank" role="link" rel="noopener noreferrer">'+val.Title_prop+'</a></h1>';
        //}
        /*
        if (val.Subtitle_prop) {
          html+='<p>'+val.Subtitle_prop+'</p>';
        }
        */
      } else {
        this.removeAttribute('open');
      }
      this._doc=val;
    }
    
  }
  customElements.define(UVANoticiaTexto.is, UVANoticiaTexto);

  class UVANoticiaImagen extends UVANoticia {
    static get is() {
      return 'uvanoticia-imagen';
    }
    constructor(...args) {
        // Constructor
        try {
          const self = super(...args);
        } catch(e) {
          // Si no somos capaces de cargar al padre, error
          throw "Error al crear el elemento UVANoticiaImagen " + e;
        } finally {
          //Variables
          this._doc=undefined;
          // Creamos el shadow del elemento
          //let shadowRoot = this.attachShadow({ mode: 'open' });
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
              <!--
              <div class="details">
                <div class="time-ago">734 days ago</div>
                <div class="author">Melissa Horwitz</div>
              </div>
              -->
            </div>
          </a>
            `;
        }
    }
  
    set doc(val) {
      if (val) {
        //var element = this.shadowRoot.querySelector('#title');
        var element = this.shadowRoot.getElementById('title');
        element.innerHTML=val.title;
        //element = this.shadowRoot.querySelector('#link');
        //element.href=val.link;

        if (this._locale && val.locales) {
          let locale=this._locale;
          let res=val.locales.find(function(element) {
            return element.id===locale;
          });
          if (res) {
            element.innerHTML=res.title;
          }
        }

        element = this.shadowRoot.getElementById('link');
        element.href=val.link;

        element = this.shadowRoot.getElementById('photo');
        //element.src=val.image;

        if (val.image) {
          let url=val.image;
          url=url.replace("/sites/comunicacion","http://comunicacion.uva.es");
          element.src=url;
        }
      } else {
        this.removeAttribute('open');
      }
      this._doc=val;
    }
    
  }
  customElements.define(UVANoticiaImagen.is, UVANoticiaImagen);