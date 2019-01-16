'use strict';
/**
 * Componentes HTML para la portada de MiPortal
 *  Photo
 * - PerfilesMiPortal: desplegable con los perfiles del usuario
 * - GrupoMiPortal: Cada grupo con accesos directos
 * - GruposMiPortal: Elemento que carga los grupos.
 * - AccesosMiPortal: Botones o cajas dentro de Mi portal
 * 
 * FUNCIONAMIENTO:
 * Carga un JSON al seleccionar un perfil con la función changePerfil que cambia
 *  el contenidoObject (objeto GruposMiPortal) global al perfil seleccionado
 * 
 */


// Variables globales
var  clasificacionesPrioridad = ["espacio_personal","mas_uva"];

//Funciones globales

// Devuelve los perfiles unicos
Array.prototype.getPerfiles = function () {
  var perfiles_aux = Array();
  this.forEach(element => {
    if (element.Perfiles) {
      element.Perfiles.forEach(perfil => {
	  	// Añadimos el elemento
        perfiles_aux.push(perfil);
      });
    }
  });
  // Vemos si esta repetido
  var perfiles = perfiles_aux.filter((e, i, a) => {
    var ele = e; 
    var index_ele = a.findIndex(function(item, i){
      return item.Path === ele.Path;
    });
	// Repetido si
    if (index_ele === i) return true;
	// Repetido no
    return false;
  });
  // Devolvemos el array
  return perfiles;
}

// Devuelve el perfil del array de perfiles
Array.prototype.getPerfil = function (perfil) {
  return this.filter((e, i, a) => {
    var ele = e; 
    if (perfil.Path) {
      return (e.Path === perfil.Path);
    } else if (perfil.Title) {
      return (e.Title === perfil.Title);
    } else if (perfil.Name) {
      return (e.Name === perfil.Name);
    }
  });
}

// Devuelve los contenidos del perfil
Array.prototype.getPerfilContents = function (perfil) {
  //Obtenemos los elementos con ese perfil
  let resultado= this.filter((e, i, a) => {
    var ele = e; 
    var index_ele = e.Perfiles.findIndex(function(item, i){
      if (perfil.Path) {
        return (item.Path === perfil.Path);
      } else if (perfil.Title) {
        return (item.Title === perfil.Title);
      } else if (perfil.Name) {
        return (item.Name === perfil.Name);
      }
    });
    if (index_ele > -1) return true;
    return false;
  });
  return resultado;
}

// Devuelve las clasificaciones, UNICAS
Array.prototype.getClasificaciones = function () {
  var array_aux = Array();
  this.forEach(element => {
    if (element.Clasificacion) {
      element.Clasificacion.forEach(cat => {
	  	// Añadimos el elemento
        array_aux.push(cat);
      });
    }
  });
  var array_unique = array_aux.filter((e, i, a) => {
    var ele = e; 
	// Vemos si esta repetido
    var index_ele = a.findIndex(function(item, i){
      return item.Path === ele.Path
    });
	// Repetido si
    if (index_ele===i) return true;
	// Repetido no
    return false;
  });
  // Devolvemos el array
  //console.log("<-- getClasificaciones");
  //console.log(array_unique);
  return array_unique;
}

// Devuelve las clasificaciones, UNICAS
Array.prototype.sortClasificaciones = function () {
  let array_aux = Array();
  let clasificacionesPrioridad = ["espacio_personal","mas_uva"];
  let props = arguments;
  //return res= this.sort((a,b) => {
  return this.sort((a,b) => {
    let a_pos = clasificacionesPrioridad.findIndex(ele => ele === a.Name);
    let b_pos = clasificacionesPrioridad.findIndex(ele => ele === b.Name);
    if (a_pos == -1 ) return 1;
    if (b_pos == -1 ) return -1;
    if(a_pos < b_pos) return -1;
    if(a_pos > b_pos) return 1;
    return 0;
  });
}

// Devuelve el contenido de 1 clasificacion determinada
Array.prototype.getClasificacion = function (clasificacion) {
  //Obtenemos los elementos con esa clasificacion
  return this.filter((e, i, a) => {
    var ele = e; 
	// Vemos si esta repetido
    var index_ele = e.Clasificacion.findIndex(function(item, i){
      return (item.Path === clasificacion.Path);
    });
	// Repetido si
    if (index_ele>-1) return true;
	// Repetido no
    return false;
  });
}

Date.prototype.parse = function (value) {
  let dl=new Date();
  let yyyy = value.substring(0, 4);
  let mm = value.substring(4, 6);
  let dd = value.substring(6, 8);
  dl.setFullYear(yyyy);
  dl.setMonth(mm-1);
  dl.setDate(dd);
  return dl;
};

//class MiPortalListaGrupos extends HTMLElement { 
class MiPortalContenido extends HTMLElement {
  static get is() {
    return 'miportal-contenido';
  }
  
  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(e) {
    // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento de la oferta " + e;
    } finally {
      //Variables
      this._urldata=undefined;
      this._urlinfo=undefined;
      this._data=undefined;
      this._info=undefined;
      this._elements=undefined;
      //Contiene el perfil
      this._perfildata=undefined;
      this._perfilesdata=[];
      //Funciones
      this._onclick = this._onclick.bind(this);
      this._onchange = this._onchange.bind(this);
      // Creamos el shadow del elemento
      let shadowRoot = this.attachShadow({ mode: 'open' });
      /*
        <!--
          <miportal-photo data="./ws/datos.jsp"></miportal-photo>
          <div class="user_data">
            <h5 class="d-none d-lg-block d-xl-block">DAVID&nbsp;RODRIGUEZ MERINO</h5>
            <!-- Selector de perfiles -->
            <miportal-perfiles data="./ws/info.jsp"></miportal-perfiles>
          </div>
        -->
        */
      this.shadowRoot.innerHTML = `
      <style>
      @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css');
      :host {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: left;

        border-bottom: 3px solid #0b1f4a;
        margin-top: 2em;
        padding-bottom: 1em;
      }
      h1 {
        font-weight: 300;
        font-size: 4em;
        line-height: 1.0em;
        margin-bottom: .1em;
        margin-top: .1em;
      }
      .user_name  {
        color: #0b1f4a;
        font-size: 0.9em;
      }
      .user_icons {
        /* float: right; */
      }
      .user_icons .icons_up {
        position: absolute;
        right: 0;
        top: 0;
      }
      .user_icons .icons_down {
        position: absolute;
        bottom: 0;
        right: 0;
      }
      .user_icons i {
        font-size: 1.7em;
      }
      .user_icons .icon_group {
        color: #0b1f4a;
        font-size: 0.8em;
        line-height: 0.5;
        margin: 0 0.5em;
      }
      .user_icons .icon_group a {
        color: #0b1f4a;
      }
      </style>
      <!-- Mi portal -->
      <div class="container miportal_letras d-none d-lg-block d-xl-block">
        <div class="row justify-content-center" >
          <div class="col text-center ">
            <h1>Mi Portal</h1>
          </div>
        </div>
      </div>
      <!-- HEader -->
      <div class="container">
        <div class="row row-eq-height" >
          <div class="col-2 d-none d-sm-none d-md-block d-lg-block d-xl-block">
            <a href="http://www.uva.es" role="link">
              <img class="img-fluid mx-auto d-block" src="./resources/miportal/img/logo_uva_cuadrado.png" alt="Universidad de Valladolid">
            </a>
          </div>
          <div id="user_photo" class="col-1 d-none d-sm-none d-md-block d-lg-block d-xl-block"></div>
          <div id="user_profile" class="user_profile col-3 align-self-end">
            <div id="user_data" class="user_data">
              <h5 id="user_name" class="d-none d-lg-block d-xl-block">NOMBRE Y APELLIDOS</h5>
            </div>
          </div>
          <div class="col justify-content-md-end">
            <div class="h-50 row align-items-start justify-content-end" >
              <div class="col-12 align-self-start d-flex justify-content-md-end" >
                <span class="icon_group"><a href="/misdatos.html" role="link"><span class="icon_description">Mis datos</span></a> <i class="fas fa-user-circle"></i></span>
                <span class="icon_group"><a href="tel://983423000" role="link" target="_blank" alt="Servicio de Atención"><span class="icon_description">Servicio de Atención</span></a> <i class="far fa-comments"></i></span>
                <span class="icon_group"><a href="http://miportal-des.uva.es/system/login/intranet.html?logout=true" role="link" alt="Salir"><span class="icon_description">Salir</span></a> <i class="fas fa-sign-out-alt"></i></span>
              </div>
            </div>
            <div class="h-50 row align-items-end justify-content-end " >
              <div class="col-12  d-flex justify-content-md-end" >
                <span class="icon_group"><a href="http://webmail.uva.es" role="link" target="_blank" alt="Buzón"><span class="icon_description">Buzon</span></a> <i class="far fa-envelope"></i></span>
                <span class="icon_group"><a href="http://www.uva.es/export/sites/uva/7.comunidaduniversitaria/7.06.calendarioacademico/index.html" role="link" target="_blank" alt="Calendario"><span class="icon_description">Calendarios</span></a> <i class="far fa-calendar-alt"></i></span>
                <span class="icon_group"><a href="http://directorio.uva.es" role="link" target="_blank" alt="Directorio"><span class="icon_description">Directorio</span></a> <i class="fas fa-users"></i></span>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div id="content"></div>
      `;
      }
    }
  
    connectedCallback() {
      console.log("--> MiPortalContenido connectedCallback");
      this._urldata = this.getAttribute('data');
      this._urlinfo = this.getAttribute('info');
      this._perfildata = this.getAttribute('data-perfil');
      this.addEventListener('change', this._onchange);
      this.addEventListener('click', this._onclick);
      this.addEventListener('perfil-changed', this._onPerfil);
      this._loadDatos();
    }
  
    disconnectedCallback() {
      console.log("--> MiPortalContenido disconnectedCallback");
      this.removeEventListener('change', this._onchange);
      this.removeEventListener('click', this._onclick);
      this.removeEventListener('perfil-changed', this._onPerfil);
    }

    static get observedAttributes() {
      // Ponemos un observable a los atributos que pueden cambiar
      //return ['data-perfil'];
    }
    adoptedCallback() {  }
    attributeChangedCallback(attr, oldValue, newValue) {
      /*
      // Hacemos cochinadas cuando cambie
      console.log("--> MiPortalContenido attributeChangedCallback");
      // Buscamos el tag a borrar contenido
      let toDelete = document.getElementsByTagName('grupos-miportal');
      
      // Esto se puede refactorizar con un forEach... pero mas adelante
      for (let i = 0; i< toDelete.length; i++) {
        // Recorremos (por si hay mas de uno, que nunca se sabe) y limpiamos
        toDelete[i].shadowRoot.innerHTML = '';
      }
      */
    }

    _get_data() {
      console.log("--> _get_data");
      return fetch(this._urldata)
      .then((elemento) => {
        console.log(elemento);
        return elemento.json();
      })
      .then((elemento) => {
        this._data=elemento;
        console.log("--- MiPortalContenido _get_data DATA");
        console.log(this._data);
      })
      .catch(function(error) {
        console.warn('Error al consultar los datos de eventos', error);
      });
    }

    _get_info() {
      console.log("--> _get_info");
      return fetch(this._urlinfo)
      .then((elemento) => {
        console.log(elemento);
        return elemento.json();
      })
      .then((elemento) => {
        this._info=elemento;
        console.log("--- MiPortalContenido _get_info DATA");
        console.log(this._info);
        //this._render();
        //console.log("--- MiPortalContenido _get_info PERFILES");
        //console.log(elemento.getPerfiles());
        this._perfilesdata=elemento.getPerfiles();
      })
      .catch(function(error) {
        console.warn('Error al consultar los datos de eventos', error);
      });
    }
  
    _loadDatos() {
      console.log("--> MiPortalContenido _loadDatos");
      let data = Promise.all([
        this._get_info(),
        this._get_data()
      ])
      .then(respuestas => {
        this._selPerfil();
        this._render();
        this._render_perfil();
      })
      .catch(reason => {
        console.warn(reason);
      });

/*
      fetch(this._urldata)
      .then((elemento) => {
        console.log(elemento);
        return elemento.json();
      })
      .then((elemento) => {
        this._data=elemento;
        console.log("--- MiPortalContenido _loadDatos DATA");
        console.log(this._data);
        //this._render();
        console.log("--- MiPortalContenido _loadDatos PERFILES");
        console.log(elemento.getPerfiles());
        this._perfilesdata=elemento.getPerfiles();
        this._selPerfil();
        this._render();
        this._render_perfil();
      })
      .catch(function(error) {
        console.warn('Error al consultar los datos de eventos', error);
      });
      */
    }
  
    _render() {
      console.log("--> MiPortalContenido _render");
      //Cada elemento tiene

      //Nombre y apellidos
      let nombre=this._data.name+" "+this._data.sn1+" "+this._data.sn2;
      this.shadowRoot.getElementById("user_name").innerHTML=nombre

      //Foto
      let foto=new MiPortalPhoto();
      foto.data=this._data;
      this.shadowRoot.getElementById("user_photo").appendChild(foto);

      // - perfiles con un array del perfil al que pertenece
      let perfiles=new MiPortalPerfiles();
      perfiles.element=this._perfildata;
      perfiles.data=this._perfilesdata;
      this.shadowRoot.getElementById("user_data").appendChild(perfiles);

    }

    _render_perfil() {
      //POr perfil
      console.log("--> MiPortalContenido _render_perfil");
      console.log(this._perfildata);
      if (this._perfildata && this._perfildata.Path && this._perfildata.Path!=="0") {
        //Eliminamos el contendo
        while(this.shadowRoot.getElementById("content").hasChildNodes()) {
          this.shadowRoot.getElementById("content").removeChild(this.shadowRoot.getElementById("content").firstChild);
        }
        let elementos_perfil=this._info.getPerfilContents(this._perfildata);
        let clasificaciones=elementos_perfil.getClasificaciones().sortClasificaciones();
        clasificaciones.forEach(element => {
          let elcla= new MiPortalGrupoClasificacion();
          elcla.data=element;
          let elementos = this._info.getClasificacion(element);
          elcla.elements=elementos;
          this.shadowRoot.getElementById("content").appendChild(elcla);
        });
      }
    }

    _onclick(event) {
      console.log("--> MiPortalContenido ON CLICK");
    }

    _onchange(event) {
      console.log("--> MiPortalContenido ON CHANGE");
    }

    _onPerfil(event) {
      console.log("--> MiPortalContenido _onPerfil");
      console.log(event.detail);
      if (event.detail) {
        if (event.detail==="0" || event.detail===0) {
          //No ha seleccionado ningún perfil. Nos quedamos como estamos
        } else {
          //Buscamos dentro de nuestros perfiles
          this._perfildata=event.detail; //this._data.getPerfilContents(event.detail);
          console.log(this._perfildata);
          this._render_perfil();
        }
      }
    }

    _selPerfil() {
      //Seleccionamos el perfil de los que tenemos de mayor prioridad según el array
      let perfilesPrioridad = ["pas","pdi","alumno"];
      console.log(this._data);
      let perfilSeleccionado = perfilesPrioridad.filter((e, i, a) => {
        let ele = e; 
        let index_ele = this._perfilesdata.findIndex(function(item, i){
          return item.Name === e;
        });
        if (index_ele>-1) return true;
        return false;
      });
      if (perfilSeleccionado.length > 0) {
        let perfil = {"Name": perfilSeleccionado[0]};
        console.log(this._data);
        console.log(this._perfilesdata);
        let perfilencontrado=this._perfilesdata.getPerfil(perfil);
        if (perfilencontrado && perfilencontrado.length>0) {
          this._perfildata=perfilencontrado[0];
        }
        console.log(this._perfildata);
      }
    }
    
  }
  customElements.define(MiPortalContenido.is, MiPortalContenido);

class MiPortalGrupoClasificacion extends HTMLElement { 
  // Creamos el componente que contiene todos los elemento Grupo

  static get is() {
    // Llamada al nombre
    return 'miportal-grupo-clasificacion';
  }

  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(err) {
      throw 'Ha habido un error al crear los elementos de Mi Portal';
    } finally {
      this._data = undefined;
      let shadowRoot = this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
      <style>
      /* Importamos bootstrap */
      @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css');
      .separacion_bloques {
         /*margin-bottom: 3em;*/
        margin-top: 3em;
        }
      .cabecera_bloque {
        border-top: 3px solid #0b1f4a; 
      }
      .cabecera_bloque h1 {
        color: #0b1f4a;
        margin-left: -15px;
        margin-right: -15px;
        font-size: 2em; 
      }
      .no-margins {
        margin-left: -30px;
        margin-right: -30px;
        margin-top: 15px;
        margin-bottom: 15px;
      }
      </style>
      <div class="container separacion_bloques">
        <div class="row">
          <div class="col-12 cabecera_bloque">
            <h1 id="title">Grupo Clasificación</h1>
          </div>
        </div>
        <div id="content" class="row no-margins"></div>
      </div>
      `;
    }
  }

  connectedCallback() {  }
  disconnectedCallback() {  }
  adoptedCallback() {  }
  attributeChangedCallback(name, oldValue, newValue) { }

  set data(val) {
    // Metemos los valores en el objeto
    console.log("--> MiPortalGrupos SET Datos");
    this._data = val;
    //this._render();
  }

  set elements(val) {
    // Metemos los elementos en el objeto
    console.log("--> MiPortalGrupos SET elements");
    this._elements= val;
    this._render();
  }

  _render() {
    if (this._data.Title) {
      this.shadowRoot.getElementById("title").innerHTML=this._data.Title;
    }
    this._elements.forEach(element => {
      let el=new MiPortalAcceso();
      el.data=element;
      this.shadowRoot.getElementById("content").appendChild(el);
    });
  }

}
customElements.define(MiPortalGrupoClasificacion.is, MiPortalGrupoClasificacion);

class MiPortalAcceso extends HTMLElement { 
  // Creamos el componente que crea cada uno de los elementos o accesos (donde pinchan y va al sitio)
  static get is() {
    // Llamada al nombre
    return 'miportal-acceso';
  }

  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(err) {
      throw 'Ha habido un error al crear los elementos de Mi Portal';
    } finally {
      //Variables
      this._data = undefined;
      this.className="col-md-3";
      //Funciones
      this._onclick = this._onclick.bind(this);
      //Shadow
      let shadowRoot = this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
      <style>
      @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css');
      .tile {
        min-width: 100%;
        height: 140px;
        margin-top: 1em; 
      }
      .tile.azul {
        background-color: #0b1f4a; 
      }
      .tile.azul h1 {
        color: white;
        position: relative;
        left: 0.7em;
        top: 0.7em;
        font-size: 1em;
        width: 95%; 
      }
      .tile.azul h1 a {
        color: white;
        text-decoration: underline; 
      }
      .tile.azul h5 {
        color: white;
        max-width: inherit;
        position: absolute;
        bottom: 0.7em;
        right: 2em;
        font-size: 0.7em;
        text-transform: lowercase; 
      }
      .tile.azul_claro {
        background-color: #5af0ff; 
      }
      .tile.azul_claro h1 {
        color: #0b1f4a;
        position: relative;
        left: 0.7em;
        top: 0.7em;
        font-size: 1em;
        width: 95%; 
      }
      .tile.azul_claro h1 a {
        color: #0b1f4a;
        text-decoration: underline; 
      }
      .tile.azul_claro h5 {
        color: #0b1f4a;
        max-width: inherit;
        position: absolute;
        bottom: 0.7em;
        right: 2em;
        font-size: 0.7em;
        text-transform: lowercase; 
      }
      .tile.gris {
        background-color: #f0f0f0; 
      }
      .tile.gris h1 {
        color: #575757;
        position: relative;
        left: 0.7em;
        top: 0.7em;
        font-size: 1em;
        width: 95%; 
      }
      .tile.gris h1 a {
        color: #575757;
        text-decoration: underline; 
      }
      .tile.gris h5 {
        color: #575757;
        max-width: inherit;
        position: absolute;
        bottom: 0.7em;
        right: 2em;
        font-size: 0.7em;
        text-transform: lowercase; 
      }
      </style>
      <div > <!-- must be col col-md-3 -->
        <div class="azul tile">
          <h1><slot id="title" name="title">Title</slot></h1>
        </div>
      </div>
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
  attributeChangedCallback(name, oldValue, newValue) { }

  set data(val) {
  	// Metemos los datos en el objeto
    if (val) {
      this._data = val;
      this._render();
    } else {
      // Algo ha ido mal, break! break! break! eliminar el open del shadowRoot
      this.removeAttribute('open');
    }
  }

  _render() {
    if (this._data.Path) {
      //elementTemplate.querySelector('h1').innerHTML = '<a href="'+ val.Path +'" role="link">'+ val.NavText +'</a>';
      let enlace=this._data.Path.replace("/sites/miportal/","");
      //this.shadowRoot.querySelector('h1').innerHTML = '<a href="'+ enlace +'" role="link">'+ val.NavText +'</a>';
      this.shadowRoot.getElementById("title").innerHTML = this._data.NavText;
    } else {
      //elementTemplate.querySelector('h1').innerHTML = val.NavText;
      //this.shadowRoot.querySelector('h1').innerHTML = val.NavText;
      this.shadowRoot.getElementById("title").innerHTML = this._data.NavText;
    }
    if (this._data.Icon) {
      let imgurl="http://miportal-des.uva.es/resources/miportal/img/"+this._data.Icon;
      this.shadowRoot.querySelector('div.azul').style = "background-image: url('"+imgurl+"'); background-repeat: no-repeat; background-position: right bottom; background-size: contain;";
    }
    if (this._data.Iconclass) {
      let divclass=this._data.Iconclass+' tile';
      this.shadowRoot.querySelector('div.azul').className = divclass;
    }
  }

  _onclick(evento) {
    console.log("--> MiPortalAcceso _onclick");
    if (this._data.Link) {
      window.location.href=this._data.Link;
    }
  }

}
customElements.define(MiPortalAcceso.is, MiPortalAcceso);

class MiPortalPerfiles extends HTMLElement { 
  // Creamos el componente que crea los perfiles
  
  static get is() {
    // Llamada al nombre
    return 'miportal-perfiles';
  }

  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
      this.shadow=undefined;
    } catch(err) {
      throw 'Ha habido un error al crear los elementos de Mi Portal';
    } finally {
      //Variables
      this._data=undefined;
      this._element=undefined;
      //Funciones
      this._onchange = this._onchange.bind(this);
      //Shadow
      let shadowRoot = this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
      <style>
      </style>
      <select id="miportal-select-perfiles" name="miportal-select-perfiles">
      </select>
      `;
    }
  }
  connectedCallback() { 
    this.shadowRoot.getElementById("miportal-select-perfiles").addEventListener('change', this._onchange);
    this.addEventListener('change', this._onchange);

  }
  disconnectedCallback() {
    this.shadowRoot.getElementById("miportal-select-perfiles").removeEventListener('change', this._onchange);
    this.removeEventListener('change', this._onchange);
  }
  adoptedCallback() {  }
  attributeChangedCallback(name, oldValue, newValue) { }

  set data(val) {
  	// Metemos los datos en el objeto
    if (val) {
      this._data = val;
      this._render();
    } else {
      // Algo ha ido mal, break! break! break! eliminar el open del shadowRoot
      this.removeAttribute('open');
    }
  }

  set element(val) {
  	// Metemos los datos en el objeto
    if (val) {
      this._element = val;
    } else {
      // Algo ha ido mal, break! break! break! eliminar el open del shadowRoot
      this.removeAttribute('open');
    }
  }


  _render() {
    console.log("--> MiPortalPerfiles _render");
    console.log(this._element);
    let el=document.createElement('option');
    el.setAttribute("value",0)
    el.innerHTML="Elige tu perfil";
    this.shadowRoot.getElementById("miportal-select-perfiles").appendChild(el);
    this._data.forEach(element => {
      el=document.createElement('option');
      el.setAttribute("value",element.Path)
      if (this._element && this._element.Path===element.Path) {
        el.setAttribute("selected",true);
      }
      el.innerHTML=element.Title;
      this.shadowRoot.getElementById("miportal-select-perfiles").appendChild(el);
    });
  }

  _onchange(event) {
    console.log("--> MiPortalPerfiles change");
    console.log(event);
    console.log(event.composedPath())
    let valor=undefined;
    if (event.composedPath().length > 0) {
      console.log(event.composedPath()[0].value);
      valor=event.composedPath()[0].value;
      let evento=new CustomEvent("perfil-changed", {
        composed:true, bubbles: true, cancelable: true, detail: {"Path":valor}
      });
      this.dispatchEvent(evento);
    }
    
    
  }
  

  selPerfil() {
    console.log("--> MiPortalPerfiles selPerfil");
    if (!this._data) {
      console.warn("--- MiPortalPerfiles selPerfil sin datos")
      return;
    }
    //Seleccionamos el perfil de los que tenemos de mayor prioridad según el array
    var perfilSeleccionado = perfilesPrioridad.filter((e, i, a) => {
      var ele = e; 
      var index_ele = this._data.findIndex(function(item, i){
        return item.Name === e;
      });
      if (index_ele>-1) return true;
      return false;
    });
    if (perfilSeleccionado.length > 0) {
      let perfil = {"Name": perfilSeleccionado[0]};
      console.log(perfil);
      // Llamamos a la funcion que filtra los datos segun el perfil
      let ele_perfil = this._data.findPerfil(perfil);
      console.log(ele_perfil);
      if (ele_perfil.length > 0) {
        this._select.value = ele_perfil[0].Path;
        console.log(ele_perfil[0].Path);
        changePerfil(ele_perfil[0].Path);
      }
    } else {
      //Sin prioridad de perfiles
      //Cogemos el primero que tenga el usuario
      this._select.value = data[0].Path;
      changePerfil(data[0].Path);
    }
  }

  get datos() {
  	// Para recuperar el perfil
	  return this._data;
  }

  set datos(data) {
    console.log("--> MiPortalPerfiles SET datos");
    console.log(data);
    this._data=data;
    // Creamos el select para elegir el perfil
    if (data) {
      this._select = document.createElement('select');
      // Llamamos al select "perfiles"
      // Creamos el vacio primero
      let opcionVacio = document.createElement('option');
      opcionVacio.value = '0';
      opcionVacio.textContent = 'Elige uno';
      opcionVacio.selected = true;
      this._select.appendChild(opcionVacio);
	  
      this._select.name = 'miportal-select-perfiles';
      data.forEach(element => {
	      // Para cada perfil creamos la opcion y la rellenamos
        var opcion = document.createElement('option');
        opcion.value = element.Path;
        opcion.textContent = element.Title;
	    	// La insertamos en el DOM
        this._select.appendChild(opcion);
      });
	    // Metemos el DOM entero construido
      this.shadowRoot.appendChild(this._select);

	    // Añadimos el listener para cuando cambie
      this._select.addEventListener('change', e => {
        console.log(e);
        changePerfil(e.target.value);
      });

    } else {
      // Algo ha ido mal, break! break! break! eliminar el open del shadowRoot
      this.removeAttribute('open');
    }
  }
}
customElements.define(MiPortalPerfiles.is, MiPortalPerfiles);


class MiPortalPhoto extends HTMLElement { 
  // Creamos el componente que crea cada uno de los elementos o accesos (donde pinchan y va al sitio)

  static get is() {
    // Llamada al nombre
    return 'miportal-photo';
  }

  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
      this.shadow=undefined;
    } catch(err) {
      throw 'Ha habido un error al crear los elementos de Mi Portal';
    } finally {
      //Variables
      this._data=undefined;
      //Funciones
      //Shadow
      let shadowRoot = this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
      <style>
      .photo {
        margin-left: 15px;
        margin-top: 5px;
      }
      </style>
      <img id="photo" class="img-fluid mx-auto d-block" >
      `;
    }
  }

  set data(val) {
  	// Metemos los datos en el objeto
    this._data = val;

    if (this._data && this._data.jpegphoto) {
      let img=this.shadowRoot.getElementById("photo");
      let photo=this._data.jpegphoto;
      img.setAttribute("src","data:image/jpeg;base64, " + photo);
      img.setAttribute("name",'perfilfoto');
      img.id = 'perfilfoto';
      img.setAttribute("alt","Foto del perfil");
      img.setAttribute("width", 80);
      img.setAttribute("height",  103);
    }
  }

}
customElements.define(MiPortalPhoto.is, MiPortalPhoto);

class MiPortalDatos extends HTMLElement { 
  // Creamos el componente que crea cada uno de los elementos o accesos (donde pinchan y va al sitio)

  static get is() {
    // Llamada al nombre
    return 'miportal-datos';
  }

  constructor(...args) {
    // Constructor
    console.log("--> MiPortalDatos constructor");
    console.log(args);
    try {
      const self = super(...args);
    } catch(err) {
      throw 'Ha habido un error al crear los elementos de Mi Portal';
    } finally {
      //Variables
      this._urldata=undefined;
      this._data=undefined;
      //Funciones
      //ShadowRoot
      let shadowRoot = this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
      <style>
      
		/* Importamos bootstrap */
		@import url('https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css');
		@import url('https://miportal-des.uva.es/system/modules/es.uva.web.portal.enterprise/resources/miportal/css/miportal.css');
		/* Esto podiamos dejarlo solo para las fuentes */
		@import url('https://miportal-des.uva.es/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/footer.css');
		
		/* Font awesome */
		@import url('https://use.fontawesome.com/releases/v5.4.1/css/all.css');
		
		/* Parche del bootstrap para ajustar las cajas */
		/*:host {
			width: calc(100% - 75%);
		}*/
		
		.misdatos h1{
			color: #121212;
			font-size: 3em;
			font-weight: 700;
			font-family: Montserrat, "Open Sans", Helvetica, Arial, sans-serif;
			text-transform: uppercase;
			margin-left: 1.3em;
		}

		.misdatos h2 {
			color: #121212;
			font-size: 1.5em;
			font-weight: 300;
			font-family: Lato, "Open Sans", Helvetica, Arial, sans-serif;
			border-bottom: 1px solid #121212;
			margin-top: 40px; 
			margin-bottom: 10px; 
		}
		
		.misdatos h2 span {
			background-color: white;
			padding-bottom: 0.5em;
			padding-right: 0.25em;
		}
		
		a.btn {
			border-radius: 0.0rem; 
			border: 1px solid black; 
			background-color: white;
			padding: .5rem 1rem; 
			color: #121212; 
			font-size: 1.17em;
			font-weight: 700;
			font-family: Lato, "Open Sans", Helvetica, Arial, sans-serif;
			text-transform: uppercase;
			cursor: pointer;
		}
		a.btn:hover { border-radius: .25rem; }
    
      </style>
      <div class="container separacion_bloques">
        <div class="row">
          <div class="col-12 misdatos">
            <h1>MIS DATOS</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-11 offset-1 misdatos">
            <h2><span>Datos Personales</span></h2>
          </div>
        </div>
        <div class="row">
          <div class="col-4 offset-1">
            <p>Nombre: <span id="nombre">Nombre</span></p>
            <p>Apellido: <span id="apellido1">Nombre</span></p>
            <p>Apellido: <span id="apellido2">Nombre</span></p>
            <p>Fecha nacimiento: <span id="fnacimiento">Nombre</span></p>
          </div>
          <div class="col-4">
            <p>Identificador: <span id="uid">Nombre</span></p>
            <p>NIF: <span id="nif">Nombre</span></p>
            <p>Nacionalidad: <span id="pais">Nombre</span></p>
          </div>
          <div class="col-2">
            <a class="btn" target="_blank" href="https://www5.uva.es/ldap">Cambiar clave <i class="fas fa-external-link-alt" style="margin-left: 0.5em;"></i></a>
          </div>
        </div>
        <div class="row">
          <div class="col-11 offset-1 misdatos">
            <h2><span>Datos Contacto</span></h2>
          </div>
        </div>
        <div id="perfilcontacto" class="row">
        </div>
        <div class="row">
          <div class="col-11 offset-1 misdatos">
            <h2><span>Datos Correo oficial</span></h2>
          </div>
        </div>
        <div id="perfilcorreooficial" class="row">
        </div>
        
        <div class="row">
          <div class="col-11 offset-1 misdatos">
            <h2><span>Datos Servicios</span></h2>
          </div>
        </div>
        <div class="row">
          <div class="col-3 offset-1">
            <p>Red Wifi: <span id="wifi"></span></p>
            <p>Deportes: <span id="deportes"></span></p>
          </div>
          <div class="col-3">
            <p>Aparcamiento: <span id="aparcamientos"></span></p>
            <p>Piscina: <span id="piscina"></span></p>
          </div>
        </div>
        <div class="row">
            <div class="col-11 offset-1 misdatos">
              <h2><span>Colectivos</span></h2>
            </div>
          </div>
          <div id="perfilcolectivos" class="row">
          </div>
        <div class="row">
          <div class="col-11 offset-1 misdatos">
            <h2><span>Datos Colectivos</span></h2>
          </div>
        </div>
        <div id="perfildatoscolectivos" class="row">
        </div>
      </div>
      `;
    }
  }

  connectedCallback() {
    console.log("--> MiPortalDatos connectedCallback");
    this._urldata = this.getAttribute('data');
    this._urlinfo = this.getAttribute('info');
    this._loadDatos();
  }

  disconnectedCallback() {
    console.log("--> MiPortalDatos disconnectedCallback");
    
  }

  static get observedAttributes() { }
  adoptedCallback() {  }
  attributeChangedCallback(attr, oldValue, newValue) {
  }

  _loadDatos() {
    console.log("--> MiPortalDatos loadDatos");
    return fetch(this._urldata)
    .then((elemento) => {
      console.log(elemento);
      return elemento.json();
    })
    .then((elemento) => {
      this._data=elemento;
      console.log("--- MiPortalContenido _get_data DATA");
      console.log(this._data);
      this._render();
    })
    .catch(function(error) {
      console.warn('Error al consultar los datos de eventos', error);
    });
  }

  _render() {
    if (this._data) {
      if (this._data.uid && this.shadowRoot.querySelector('span#uid')) {
        this.shadowRoot.querySelector('span#uid').innerHTML = this._data.uid;
      } else {
        this.shadowRoot.querySelector('span#uid').innerHTML = '';
      }
      if (this._data.nif && this.shadowRoot.querySelector('span#nif')) {
        this.shadowRoot.querySelector('span#nif').innerHTML = this._data.nif;
      } else {
        this.shadowRoot.querySelector('span#nif').innerHTML = '';
      }
      if (this._data.pais && this.shadowRoot.querySelector('span#pais')) {
        this.shadowRoot.querySelector('span#pais').innerHTML = this._data.pais;
      } else {
        this.shadowRoot.querySelector('span#pais').innerHTML = '';
      }
      if (this._data.name && this.shadowRoot.querySelector('span#nombre')) {
        this.shadowRoot.querySelector('span#nombre').innerHTML = this._data.name;
      } else {
        this.shadowRoot.querySelector('span#nombre').innerHTML = '';
      }
      if (this._data.sn1 && this.shadowRoot.querySelector('span#apellido1')) {
        this.shadowRoot.querySelector('span#apellido1').innerHTML = this._data.sn1;
      } else {
        this.shadowRoot.querySelector('span#apellido1').innerHTML = '';
      }
      if (this._data.sn2 && this.shadowRoot.querySelector('span#apellido2')) {
        this.shadowRoot.querySelector('span#apellido2').innerHTML = this._data.sn2;
      } else {
        this.shadowRoot.querySelector('span#apellido2').innerHTML = '';
      }
      if (this._data.fechanacimiento && this.shadowRoot.querySelector('span#fnacimiento')) {
        this.shadowRoot.querySelector('span#fnacimiento').innerHTML = this._getDate(this._data.fechanacimiento);
      } else {
        this.shadowRoot.querySelector('span#fnacimiento').innerHTML = '';
      }
      if (this._data.deportes && this.shadowRoot.querySelector('span#deportes')) {
        this.shadowRoot.querySelector('#deportes').innerHTML = this._data.deportes === "TRUE"?"Si":"No";
      } else {
        this.shadowRoot.querySelector('#deportes').innerHTML = "No";
      }
      if (this._data.piscina && this.shadowRoot.querySelector('span#piscina')) {
        this.shadowRoot.querySelector('#piscina').innerHTML = this._data.piscina  === "TRUE"?"Si":"No";
      } else {
        this.shadowRoot.querySelector('#piscina').innerHTML = "No";
      }
      if (this._data.aparcamientos && this.shadowRoot.querySelector('span#aparcamientos')) {
        this.shadowRoot.querySelector('#aparcamientos').innerHTML = this._data.aparcamientos  === "TRUE"?"Si":"No";
      } else {
        this.shadowRoot.querySelector('#aparcamientos').innerHTML = "No";
      }
      if (this._data.wifi && this.shadowRoot.querySelector('span#wifi')) {
        this.shadowRoot.querySelector('#wifi').innerHTML = this._data.wifi  === "TRUE"?"Si":"No";
      } else {
        this.shadowRoot.querySelector('#wifi').innerHTML = "No";
      }

      //DATOS DE CONTACTO
      if (this._data.mail || this._data.telephonenumber) {
        let contenido='<div class="col-md-3 offset-1">';
        if (this._data.telephonenumber) {
          contenido+='<p> Teléfono: '+this._data.telephonenumber+'</p>';
        }
        contenido+='</div>';
        contenido+='<div class="col-md-8">';
        if (this._data.mail) {
          contenido+='<p>Mail UVa: '+this._data.mail+'</p>';
        }
        if (this._data.correonooficial) {
          contenido+='<p>Mail noUVa: '+this._data.correonooficial+'</p>';
        }
        contenido+='</div>';
        if (this.shadowRoot.querySelector('#perfilcontacto')) {
          this.shadowRoot.querySelector('#perfilcontacto').innerHTML = contenido;
        }
      }
      //CORREO OFICIA
      if (this._data.correooficial) {
        let contenido='<div class="col-7 offset-1">';
        this._data.correooficial.forEach(element => {
          contenido+='<p>';
          if (element.correo && element.correo.uvaAliasCorreo) {
            contenido+='Mail: '+element.correo.uvaAliasCorreo+' ';
          }
          if (element.correo && element.correo.mailForwardingAddress) {
            contenido+='redirigido a '+element.correo.mailForwardingAddress+' ';
          }
          if (element.correo && element.correo.uvaFechaCaducidad) {
            contenido+='y caduca '+this._getDate(element.correo.uvaFechaCaducidad)+' ';
          }
          if (element.correo && element.correo.uvaFechaCaducidadCol) {
            //contenido+='<p>CADUCA EL '+element.correo.uvaFechaCaducidadCol+'</p>';
          }
          contenido+='</p>';
        });
        contenido+='</div>';
        contenido+='<div class="col-3">';
        contenido+='<a class="btn" target="_blank" href="https://www5.uva.es/ldap">Redireccionar correo <i class="fas fa-external-link-alt" style="margin-left: 0.3em;"></i></a>';
        contenido+='</div>';
        if (this.shadowRoot.querySelector('#perfilcorreooficial')) {
          this.shadowRoot.querySelector('#perfilcorreooficial').innerHTML = contenido;
        }
      }
      //FECHA DE CADUCIDAD GENERAL
      if (this._data.fechacaducidadcol) {
        let contenido='<div class="col-11 offset-1">';
        this._data.fechacaducidadcol.forEach(element => {
          if (element.col < 0) {
            contenido+='<p>'+element.description+' que caducó '+this._getDate(element.fecha)+'</p>';
          } else {
            contenido+='<p>'+element.description+' que caduca '+this._getDate(element.fecha)+'</p>';
          }
        });
        contenido+='</div>';
        if (this.shadowRoot.querySelector('#perfilcolectivos')) {
          this.shadowRoot.querySelector('#perfilcolectivos').innerHTML = contenido;
        }
      }
      //PARA CADA COLECTIVO
      if (this._data.colectivos) {
        let contenido='<div class="col-11 offset-1">';
        console.log(this._data.colectivosdatos);
        for (let key in this._data.colectivosdatos) {
          let element=this._data.colectivosdatos[key];
          if (element.nip) {
            contenido+='<p>NIP: '+element.nip+'</p>';
          }
          if (element.nia) {
            contenido+='<p>NIA: '+element.nia+'</p>';
          }
          if (element.edificio) {
            contenido+='<p>Edificio: '+element.edificio.description+'</p>';
          }
          if (element.centro) {
            contenido+='<p>Centro: '+element.centro.description+'</p>';
          }
          if (element.departamento) {
            contenido+='<p>Departamento: '+element.departamento.description+'</p>';
          }
          if (element.cuerpodocente) {
            contenido+='<p>Cuerpo docente: '+element.cuerpodocente.description+'</p>';
          }
          if (element.plan) {
            contenido+='<p>Plan: '+element.plan.description+'</p>';
          }
          if (element.programadoctorado) {
            contenido+='<p>Programa doctorado: '+element.programadoctorado.description+'</p>';
          }
          if (element.instituto) {
            contenido+='<p>Instituto: '+element.instituto.description+'</p>';
          }
          if (element.areabachillerato) {
            contenido+='<p>Area bachillerato: '+element.areabachillerato.description+'</p>';
          }
          if (element.campus) {
            contenido+='<p>Campus: '+element.campus.description+'</p>';
          }
          if (element.cenplacur) {
            if (element.cenplacur.centro) {
              contenido+='<p>Centro: '+element.cenplacur.centro.description+'</p>';
            }
            if (element.cenplacur.plan) {
              contenido+='<p>Plan: '+element.cenplacur.plan.description+'</p>';
            }
            if (element.cenplacur.curso) {
              contenido+='<p>Curso: '+element.cenplacur.curso+'</p>';
            }
          }
          if (element.titulopropio) {
            if (element.titulopropio.centro) {
              contenido+='<p>Título propio: '+element.titulopropio.titulopropio.description+'</p>';
            }
            if (element.titulopropio.plan) {
              contenido+='<p>Edición: '+element.titulopropio.edicion.description+'</p>';
            }
            if (element.titulopropio.curso) {
              contenido+='<p>Curso: '+element.titulopropio.curso+'</p>';
            }
          }
          if (element.datostarjeta) {
            if (element.datostarjeta.centro) {
              contenido+='<p>Centro: '+element.datostarjeta.centro.description+'</p>';
            }
            if (element.datostarjeta.departamento) {
              contenido+='<p>Departamento: '+element.datostarjeta.departamento.description+'</p>';
            }
            if (element.datostarjeta.plan) {
              contenido+='<p>Plan: '+element.datostarjeta.plan.description+'</p>';
            }
            if (element.datostarjeta.curso) {
              contenido+='<p>Curso: '+element.datostarjeta.curso+'</p>';
            }
          }
          
        }
        contenido+='<div>';
        console.log(contenido);
        if (this.shadowRoot.querySelector('#perfildatoscolectivos')) {
          this.shadowRoot.querySelector('#perfildatoscolectivos').innerHTML = contenido;
        }
      }
    }
  }

  _getDate(valor) {
    var d = new Date()
    d=d.parse(valor);
    return d.toLocaleDateString("es-ES");
  }

}
customElements.define(MiPortalDatos.is, MiPortalDatos);