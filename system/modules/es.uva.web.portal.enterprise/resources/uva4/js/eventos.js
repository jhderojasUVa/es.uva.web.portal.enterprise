'use strict';

import { UVaSlideshow, UVaSlideshowDot } from './slideshow.js';

class UVAEventos extends HTMLElement {
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
      //Variables
      this._data=undefined;
      this._uridata=undefined;
      this._datanum=4;
      //Funciones
      this._onclick = this._onclick.bind(this);

      // Creamos el shadow del elemento
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
      
      </style>
      <div style="width: 100%">
        <div class="header">
          <h1 data-i18n-es="Agenda" data-i18n-en="Calendar">Agenda</h1>
        </div>
        <div class="col bloque_raya d-none d-md-block">
          <span class="masinformacion">
            <a href="http://eventos.uva.es" target="_blank" role="link" rel="noopener noreferrer">
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
    this.addEventListener('click', this._onclick);
    
    this._uridata = this.getAttribute('data');
    this._datanum = this.getAttribute('num');
    this._loadDatos();
  }

  disconnectedCallback() {
  	this.removeEventListener('click', this._onclick);
  }

  adoptedCallback() {  }
  attributeChangedCallback(name, oldValue, newValue) {  }

  set data(val) {
    console.log("--> UVAEventos set Data");
    //Modificamos los datos de la navegación
    this._data=val;
    this._render();
  }

  _loadDatos() {
    console.log("--> UVAEventos loadDatos");
    if (!this._uridata) return;
    loadJSON(this._uridata)
    .then(response => {
      console.log(response);
      this.data=response.events;
    })
    .catch(function(error) {
      console.warn('Error al consultar los datos de eventos');
      console.warn(error);
    });
  }

  _render() {
    console.log("--> Render");
    let count=1;
    this._data.forEach(element => {
      if (count > parseInt(this._datanum)) return;
      count++;
      let el = new EventoTexto();
      el.data = element;
      this.shadowRoot.appendChild(el);
    });
  }

  _onclick(event)  {
    console.log("--> UVAEventos _onclick");
    let el=event.composedPath()[0];
    if (el.className==="historico-element") {
      console.log(el)
      console.log(el.getAttribute("param"));
      let param=el.getAttribute("param");
      if (param) {
        this._get_results(param)
        .then(data=>{
          console.log("RESULTADOS CONSULTA");
          console.log(data);
          this._data=data.response.docs;
          console.log(data.response.docs);

          this._render_results();
        });
      }
    }
  }

 
}
customElements.define(UVAEventos.is, UVAEventos);

class UVAEventosSlideshow extends UVaSlideshow {
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
      //Variables
      this._data=undefined;
      this._uridata=undefined;
      this._datanum=4;
      
    }
  }

  connectedCallback() {
    super.connectedCallback(); 
    
    this._uridata = this.getAttribute('data');
    this._loadDatos();
  }

  disconnectedCallback() {
    super.disconnectedCallback(); 
  	this.removeEventListener('click', this._onclick);
  }

  adoptedCallback() {  }
  attributeChangedCallback(name, oldValue, newValue) {  }

  set data(val) {
    console.log("--> UVAEventos set Data");
    //Modificamos los datos de la navegación
    this._data=val;

    let count=1;
    this._data.forEach(element => {
      if (count > parseInt(this._datanum)) return;
      count++;
      let el = new EventoTexto();
      el.data = element;
      //this.shadowRoot.appendChild(el);
      this._objects.push(el);
      this.shadowRoot.appendChild(Object.assign(el));
      this._childs++;
    });


    this._show(0);
  }

  _loadDatos() {
    console.log("--> UVAEventos loadDatos");
    if (!this._uridata) return;
    loadJSON(this._uridata)
    .then(response => {
      console.log(response);
      this.data=response.events;
    })
    .catch(function(error) {
      console.warn('Error al consultar los datos de eventos');
      console.warn(error);
    });
  }

  _render() {
    console.log("--> UVAEventos Render");
    super._render();
    /*
    let count=1;
    this._data.forEach(element => {
      if (count > parseInt(this._datanum)) return;
      count++;
      let el = new EventoTexto();
      el.data = element;
      this.shadowRoot.appendChild(el);
    });
    */
  }

  _onclick(event)  {
    console.log("--> UVAEventos _onclick");
    let el=event.composedPath()[0];
    if (el.className==="historico-element") {
      console.log(el)
      console.log(el.getAttribute("param"));
      let param=el.getAttribute("param");
      if (param) {
        this._get_results(param)
        .then(data=>{
          console.log("RESULTADOS CONSULTA");
          console.log(data);
          this._data=data.response.docs;
          console.log(data.response.docs);

          this._render_results();
        });
      }
    }
  }

 
}
customElements.define(UVAEventosSlideshow.is, UVAEventosSlideshow);



class EventoTexto extends HTMLElement {

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
      //Variables
      this._data=undefined;
      this._uridata=undefined;
      //Funciones
      this._onclick = this._onclick.bind(this);

      // Creamos el shadow del elemento
      let shadowRoot = this.attachShadow({ mode: 'open' });
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
      <a target="_blank" id="link" href="">
        <div class="headline">
          <h2 id="title">NAME</h2>
        </div>
      </a>
      `;
    }
  }

  connectedCallback() {
  	this.addEventListener('click', this._onclick);
  }

  disconnectedCallback() {
  	this.removeEventListener('click', this._onclick);
  }


  adoptedCallback() {
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
  }

  set data(val) {
    console.log("--> UVAEventos set Data");
    //Modificamos los datos de la navegación
    this._data=val;
    this._render();
  }

  _render() {
    if (this._data.title) {
      this.shadowRoot.getElementById("title").innerHTML=this._data.title;
    }
    this.shadowRoot.getElementById("link").href="https://eventos.uva.es/"+this._data.id;
  
  }


  _onclick(event)  {
  	// Metodo cuando haces click
    console.log("--> UVAEventoTexto _onclick");
    let el=event.composedPath()[0];
  }
  
}
customElements.define(EventoTexto.is, EventoTexto);