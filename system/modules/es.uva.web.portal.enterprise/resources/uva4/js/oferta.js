'use strict';

class UVaOferta extends HTMLElement {
  static get is() {
    return 'uva-oferta';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento UVaOferta " + e;
    } finally {
      //Variables
      this._data=[];
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
        {"id":"0", "desc": "Todos los campus"},
        {"id":"47","desc": 'Valladolid'},
        {"id":"34","desc": "Palencia"},
        {"id":"40","desc": "Segovia"},
        {"id":"42","desc": "Soria"},
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
    this.addEventListener('menu_click', this._onmenuclick);
    this.addEventListener('filtro_ramas_click', this._onfiltroramasclick);
    this.addEventListener('filtro_tipoestudio_click', this._onfiltrotipoestudiosclick);
  }

  disconnectedCallback() {
    this.removeEventListener('menu_click', this._onmenuclick);
    this.removeEventListener('filtro_ramas_click', this._onfiltroramasclick);
    this.removeEventListener('filtro_tipoestudio_click', this._onfiltrotipoestudiosclick);
  }

  adoptedCallback() {  }
  attributeChangedCallback(name, oldValue, newValue) {  }

  set data(val) {
    //Modificamos los datos de la navegación
    this._data=val;
  }

  _loadDatos() {
    //LOAD ALL JSON
    let urls=[
      "https://www-des.uva.es/ws/estudios.jsp",
      "https://www-des.uva.es/ws/doctorado.jsp",
      "https://www-des.uva.es/ws/titulos.jsp",
      "https://www-des.uva.es/ws/cursos.jsp",
    ];
    //Hacemos el fetch de las URLs
    let data = Promise.all(
      urls.map(url =>loadJSON(url))
    ).then(respuestas => {
      respuestas.forEach(element => {
        this._processAnswer(element);
      });
    }).then(respuesta=>{
      this._render();
    }).catch(function(error) {
      console.warn('Error al consultar ');
      console.warn(error);
    });
  }

  _render() {
    //Comprobamos que elemento del menu está seleccionado
    switch (this._filtroEstudios.menu) {
      case 1:
      case 2:
        this.shadowRoot.getElementById("filtro").style.display="block";
        break;
      case 3:
      case 4:
      case 5:
        this.shadowRoot.getElementById("filtro").style.display="none";
        break;
      default:
        this.shadowRoot.getElementById("filtro").style.display="none";
        break;
    }

    //Comprobamos que se ha modificado el filtro
    if (this._filtroEstudios.activo===0) {
      return;
    }
    
    let elementos=this._filtro();
    //LImpiamos los elementos
    let capa=this.shadowRoot.getElementById("estudios_contenido");
    while(capa.firstChild) {
      // Del todo, lo quitamos del todo
      capa.removeChild(capa.firstChild);
    }
    if (elementos && elementos.length > 0) {
      //Recorremos para cada campus
      this._listadoCampus.forEach(campus => {
        let elementos_campus = elementos.filter(elemento => (elemento["ficha.campus_prop"] === campus.id));
        if (elementos_campus.length > 0) {
          let element_campus=new UVaOfertaCampus();
          element_campus.data=campus;
          element_campus.elementos=elementos_campus;
          this.shadowRoot.getElementById("estudios_contenido").appendChild(element_campus);
        }
      });
    } else {
      //No tenemos estudios que cumplan el filtro
      let texto= document.createElement("p");
      texto.innerHTML="No hay estudios que cumplan el criterio de búsqueda";
      this.shadowRoot.getElementById("estudios_contenido").appendChild(texto);
    }
  }


  _filtro() {
    // Crea los estudios (los elementos) y les asigna el contenido filtrado (o no)
    //Obtenemos los elementos a partir de los datos
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
          if (elemento["ficha.campus_prop"] != this._filtroEstudios.campus) return false;
        }
        if (this._filtroEstudios.rama != 0) {
          if (elemento["ficha.rama_prop"] != this._filtroEstudios.rama) return false;
        }
        if (this._filtroEstudios.tipolearning != 0) {
          if (elemento["ficha.tipolearning_prop"] != this._filtroEstudios.tipolearning) return false;
        }
        break;
      case 3:
      case 4:
      case 5:
        break;
    }
    if (this._filtroEstudios.menu != 0) {
      if (elemento["tipo"] != this._filtroEstudios.menu) return false;
    }
    return true;
  }


  _onmenuclick(event) {
    if (event && event.detail) {
      let dataid=event.detail.data;
      this._filtroEstudios.activo = 1;
      this._filtroEstudios.menu = dataid;

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

      this._render();
    }
  }

  _onfiltroramasclick(event) {
    if (event && event.detail ) {
      let dataid=event.detail.data;
      this._filtroEstudios.activo = 1;
      this._filtroEstudios.rama = dataid;
      this._render();
    }
  }

  _onfiltrotipoestudiosclick(event) {
    if (event && event.detail) {
      let dataid=event.detail.data;
      this._filtroEstudios.activo = 1;
      this._filtroEstudios.tipolearning = dataid;
      this._render();
    }
  }

  _processAnswer(data) {
    // Funcion para insertar los estudios en el array de estudios
    if (data.response && data.response.numFound>0 && data.response.docs) {
      // Si hay estudios
      let theResponse = data.response.docs;
      // Ordenamos
      theResponse.sort(function(elemA, elemB) {
        // por campus de menor a mayor numero de campus
        return parseInt(elemA["ficha.campus_prop"]) - parseInt(elemB["ficha.campus_prop"]);
      });
      // Recorremos
      theResponse.forEach(doc => {
        //Miramos el tipo, especialmente para los Solr. La idea es transformar un texto a un número
        if (doc.type) {
          switch(doc.type) {
            case "estudios":
              switch (doc["campo.tipo_prop"]) {
                case "1":
                  doc.tipo = 1;
                  break;
                case "2":
                  doc.tipo = 2;
                  break;
              }
              break;
            case "doctorado":
              doc.tipo = 3;
              break;
            case "titulos":
              doc.tipo = 4;
              break;
            case "cursos":
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
    /*
    loadEstudios = loadEstudios + 1;
    if (loadEstudios > 3) {
      //Ocultamos el loadin
      showhide("estudios_loader");
      //Mostramos la caja
      showhide("estudios_content");
    }
    */
  }
}
customElements.define(UVaOferta.is, UVaOferta);


class UVaOfertaHeader extends HTMLElement {
  static get is() {
    return 'uva-oferta-header';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento UVaOferta " + e;
    } finally {
      //Variables
      this._data=undefined;
    
      //Funciones
      //this._onclick = this._onclick.bind(this);

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
  static get is() {
    return 'uva-oferta-filtro';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento UVaOferta " + e;
    } finally {
      //Variables
      this._data=undefined;
      this._selected=undefined;
      this._event_name="filtro_click";
      //Funciones
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
    this.addEventListener('click', this._onclick);
  }

  disconnectedCallback() {
  	this.removeEventListener('click', this._onclick);
  }

  adoptedCallback() {  }
  attributeChangedCallback(name, oldValue, newValue) {  }

  _render() {
    //Quitamos el activo de todos
    let elements = this.shadowRoot.querySelectorAll('.active');
    for (let i = 0; i < elements.length; i++) {
      // Hacer un remove tarda menos que hacer un classname entero
      elements[i].classList.remove('active');
    }
    //Se lo ponemos al seleccionado
    if (this._selected !== undefined && this.shadowRoot.getElementById(this._selected)) {
      this.shadowRoot.getElementById(this._selected).classList.add('active');
    }
  }

  _onclick(event)  {
    let elid=undefined;
    let el=event.composedPath()[0];
    if (el) {
      elid=parseInt(el.getAttribute("dataid"));
      this._selected=elid;

      // Disparamos el evento de click en la navegacion
      let ev = new CustomEvent(this._event_name, {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: { data: elid}
      });
      this.dispatchEvent(ev);

      this._render();
    }
  }
}
customElements.define(UVaOfertaFiltro.is, UVaOfertaFiltro);

class UVaOfertaMenu extends UVaOfertaFiltro {
  static get is() {
    return 'uva-oferta-menu';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento UVaOferta " + e;
    } finally {
      this._event_name="menu_click";
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
          <!--
          <a class="nav-link tab azul_blanco" data-i18n-es="DOCTORADO" data-i18n-en="PhD" id="3" href="http://escueladoctorado.uva.es/opencms/oferta/index.html?lang=es" role="link" target="_blank">DOCTORADO</a>
          -->
          <a class="nav-link tab azul_blanco" data-i18n-es="TITULOS PROPIOS" data-i18n-en="OWN TITLES" id="4" dataid="4" role="link">TITULOS PROPIOS</a>
          <!--
          <a class="nav-link tab azul_blanco" data-i18n-es="TITULOS PROPIOS" data-i18n-en="OWN TITLES" id="4" href="https://alumnos.sigma.uva.es/cowep/control/consultaEPTipo?entradaPublica=true&idioma=es.ES&centro=140&ano=2018" role="link" target="_blank">TITULOS PROPIOS</a>
          -->
          <a class="nav-link tab azul_blanco" data-i18n-es="FORMACIÓN CONTINUA" data-i18n-en="CONTINOUS FORMATION" id="5" dataid="5" role="link" rel="noopener noreferrer">FORMACIÓN CONTINUA</a>
          <!--
          <a class="nav-link tab azul_blanco" data-i18n-es="FORMACIÓN CONTINUA" data-i18n-en="CONTINOUS FORMATION" id="5" href="http://www.uva.es/export/sites/uva/2.docencia/2.05.cursos/2.05.01.cursos/" role="link" target="_blank" rel="noopener noreferrer">FORMACIÓN CONTINUA</a>
          -->
      </nav>
      `;
    }
  }

}
customElements.define(UVaOfertaMenu.is, UVaOfertaMenu);

class UVaOfertaFiltroRamas extends UVaOfertaFiltro {
  static get is() {
    return 'uva-oferta-filtro-ramas';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento UVaOferta " + e;
    } finally {
      //Variables
      this._event_name="filtro_ramas_click";
   
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
  static get is() {
    return 'uva-oferta-filtro-tipoestudios';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento UVaOferta " + e;
    } finally {
      this._event_name="filtro_tipoestudio_click";

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
  static get is() {
    return 'uva-oferta-campus';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento UVaOferta " + e;
    } finally {
      //Variables
      this._data=undefined;
      this._elements=undefined;
      //Funciones
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
    this.addEventListener('click', this._onclick);
  }

  disconnectedCallback() {
  	this.removeEventListener('click', this._onclick);
  }

  adoptedCallback() {  }
  attributeChangedCallback(name, oldValue, newValue) {  }

  set data(val) {
    //Modificamos los datos de la navegación
    this._data=val;
    this._render();
  }

  set elementos(val) {
    //Modificamos los datos de la navegación
    this._elements=val;
    this._render();
  }

  _render() {
    if (this._data) {
      this.shadowRoot.getElementById("bntCampus").innerText=this._data.desc;
    }
    if (this._elements) {
      this._elements.forEach(element => {
        let element_estudio=new UVaOfertaEstudio();
        element_estudio.data=element;
        this.shadowRoot.appendChild(element_estudio);
      });
    }
  }

  _onclick(event)  {
    let elid=undefined;
    let el=event.composedPath()[0];
    if (el) {
      elid=parseInt(el.getAttribute("dataid"));
/*
      // Disparamos el evento de click en la navegacion
      let ev = new CustomEvent("menu_click", {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: { data: elid}
      });
      this.dispatchEvent(ev);
  */
    }
  }
}
customElements.define(UVaOfertaCampus.is, UVaOfertaCampus);

class UVaOfertaEstudio extends HTMLElement {
  static get is() {
    return 'uva-oferta-estudio';
  }
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento UVaOferta " + e;
    } finally {
      //Variables
      this._data=undefined;
      //Funciones
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


  connectedCallback() {  }
  disconnectedCallback() {  }
  adoptedCallback() {  }
  attributeChangedCallback(name, oldValue, newValue) {  }

  set data(val) {
    //Modificamos los datos de la navegación
    this._data=val;
    this._render();
  }

  _render() {
    if (this._data) {
      let element_link=this.shadowRoot.getElementById("enlace");
      if ((this._data["campo.tipo_prop"] == 1)||(this._data["campo.tipo_prop"] == 2)) {
        element_link.setAttribute("href","http://www.uva.es"+this._data.link);
        let title=this._data.title;
        if (title) title.replace('(PA)', '').replace('(SG)', '').replace('(SO)', '');
        element_link.innerText=title;
      } else if (this._data["campo.tipo_prop"] == 3) {
        element_link.setAttribute("href",this._data.URL);
        element_link.innerText=this._data.DENOMINACION;
      }  else if (this._data["campo.tipo_prop"] == 4) {
        element_link.setAttribute("href","https://alumnos.sigma.uva.es/cowep/control/consultaEPTipo?entradaPublica=true&idioma=es.ES&centro=140&ano=2018");
        element_link.innerText=this._data.DesCur;
      } else if (this._data["campo.tipo_prop"] == 5) {
        element_link.setAttribute("href","http://www.uva.es"+this._data.link);       
        element_link.innerText=this._data.title;
      } 
    }
  }

}
customElements.define(UVaOfertaEstudio.is, UVaOfertaEstudio);