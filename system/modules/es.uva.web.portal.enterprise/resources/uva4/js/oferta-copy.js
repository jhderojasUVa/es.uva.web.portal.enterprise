// Creamos el setting basico de arranque con todo a 0
var filtroEstudios = {
  clase: 0,
  campus: 0,
  rama: 0,
  tipo: 0,
};

// Creamos el contenedor de los estudios
var estudios = Array();

function estudios_jsonp(url) {
  // Funcion para traerse el json, crear la funcion y meterla
  return new Promise(function(resolve, reject) {
      let script = document.createElement('script')
      const name = "_jsonp_" + Math.round(100000 * Math.random());
      //url formatting
      if (url.match(/\?/)) url += "&callback=" + name
      else url += "?callback="+name
      script.src = url;
      window[name] = function(data) {
          resolve(data);
          document.body.removeChild(script);
          delete window[name];
      }
      document.body.appendChild(script);
  });
}

function estudios_respuesta(data) {
  // Funcion para insertar los estudios en el array de estudios
  if (data.response && data.response.numFound>0 && data.response.docs) {
    // Si hay estudios
    data.response.docs.forEach(doc => {
	  // Los metemos
      estudios.push(doc);
    });
  } else {
    // Si no hay estudios mostramos un error
  	throw "Error en la lectura de los estudios";
  }
}

class Estudio extends HTMLElement {

  static get is() {
    return 'el-estudio';
  }
  
  constructor() {
    try {
      super();
    } catch(e) {
	  // Si no somos capaces de cargar al padre, error
      throw "Error al crear el elemento del estudio " + e;
    } finally {
      // Creamos el shadow del elemento
	  let shadowRoot = this.attachShadow({ mode: 'open' });
    }
  }

  connectedCallback() {
  }

  disconnectedCallback() {
  }

  adoptedCallback() {
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
  }

  set doc(val) {
  	// Seteamos el valor del elemento
    if (val) {
	  // Si hay valor en el .doc del elemento...
      let html='';
	  // Creamos el elemento en si por dentro con toda su maraña
      html+='<p id="'+val.id+'"><a href="http://www.uva.es'+val.link+'" target="_blank">'+val.Title_prop+'</a></p>';
	  // Esto es una chapuza para los CSS, lo ideal es hacer un @import pero eso al final
	  let thecss = '<style>:host { text-transform: uppercase; }:host p { font-size: 0.9rem; line-height: 1;}:host p a { text-decoration: none; color: black;}:host p a:hover { text-decoration: underline; }</style>';
	  // Fin de la chapuza que ahora la hago mas gorda metiendo a mala leche
      this.shadowRoot.innerHTML = thecss + html;
    }
  }
}
customElements.define(Estudio.is, Estudio);

function estudios_clear() {
   //Limpuamos el elemento que contiene los estudios
   // Primero buscamos el contenido que esta en el id "estudios_contenido"
   var div = document.getElementById('estudios_contenido');
   while(div.firstChild) {
   	 // Del todo, lo quitamos del todo
     div.removeChild(div.firstChild);
   }
}

function estudios_show(name) {
  // Mostramos el elemento "name" cambiandole los CSS de escondido a no
  var el = document.getElementById(name);
  if (el.style.display === "none") {
    el.style.display = "";
  }
}

function estudios_hide(name) {
  // Escondemos el elemento "name" cambiando los CSS de no a escondido
  var el = document.getElementById(name);
  if (el.style.display !== "none") {
    el.style.display = "none";
  }
}

function estudios_filtro_element(elemento) {
  //let res = true; // ?
  if (filtroEstudios.clase != 0) {
    if (elemento["campo.tipo_prop"] != filtroEstudios.clase) return false;
  }
  if (filtroEstudios.campus != 0) {
    if (elemento["ficha.campus_prop"] != filtroEstudios.campus) return false;
  }
  if (filtroEstudios.rama != 0) {
    if (elemento["ficha.rama_prop"] != filtroEstudios.rama) return false;
  }
  if (filtroEstudios.tipo != 0) {
    if (elemento["ficha.tipolearning_prop"] != filtroEstudios.tipo) return false;
  }
  return true;
}

function estudios_filtro() {
  // Crea los estudios (los elementos) y les asigna el contenido filtrado (o no)
  let elementos = estudios.filter(estudios_filtro_element);
  estudios_clear();
  //Añadimos los elementos
  elementos.forEach(doc => {
    let element = new Estudio();
    element.doc = doc;
    document.getElementById('estudios_contenido').appendChild(element);
  });

  if (filtroEstudios.clase == 1 || filtroEstudios.clase == 2 ) {
    //Mostramos los filtros
    estudios_show("filtro");
  }
}

function estudios_estilos() {
  //Modificamos los estilos de los botones
  var elements = document.getElementsByClassName('btn azul_blanco active');
  
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('active');
	console.log(elements[i]);
  }
  
  elements = document.getElementsByClassName('nav-link tab azul_blanco active');
  
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('active');
  }
  
  switch(filtroEstudios.clase) {
    case 1:
      document.getElementById("btnGrados").className = "nav-link tab azul_blanco active";
      break;
    case 2:
      document.getElementById("btnMasteres").className = "nav-link tab azul_blanco active";
      break;
  }
  
  switch(filtroEstudios.campus) {
    case 0:
      document.getElementById("btnCampusTodos").className = "btn azul_blanco active";
      break
    case 47:
      document.getElementById("btnCampusVa").className = "btn azul_blanco active";
      break;
    case 34:
      document.getElementById("btnCampusPa").className = "btn azul_blanco active";
      break;
    case 40:
      document.getElementById("btnCampusSe").className = "btn azul_blanco active";
      break;
    case 42:
      document.getElementById("btnCampusSo").className = "btn azul_blanco active";
      break;
  }
  
  switch(filtroEstudios.rama) {
    case 1:
      document.getElementById("btnAreaArtes").className = "btn azul_blanco active";
	  console.log('Artes y munanidades');
      break
    case 2:
      document.getElementById("btnAreaCiencias").className = "btn azul_blanco active";
      break;
    case 3:
      document.getElementById("btnAreaSalud").className = "btn azul_blanco active";
      break;
    case 4:
      document.getElementById("btnAreaSociales").className = "btn azul_blanco active";
      break;
    case 5:
      document.getElementById("btnAreaIngenieria").className = "btn azul_blanco active";
      break;
  }
  
  switch(filtroEstudios.tipo) {
    case 1:
      document.getElementById("btnTipoPresencial").className = "btn azul_blanco active";
      break
    case 2:
      document.getElementById("btnTipoSemipresencial").className = "btn azul_blanco active";
      break;
    case 3:
      document.getElementById("btnTipoVirtual").className = "btn azul_blanco active";
      break;
  }
}

document.addEventListener("DOMContentLoaded",function(){
  //index=Solr%20Offline
  var data = estudios_jsonp("http://www.uva.es/opencms/handleSolrSelect?rows=2000&fq=type:estudios&wt=json&json.wrf=estudios_respuesta");
  data.then((res) => {
  	console.log(res);
    estudios_respuesta(res) 
  });

  /*************
   * BOTONES PRINCIPALES
   *************/
  // Seccion de Grados, Master
  document.getElementById('btnGrados').onclick = function(){
    filtroEstudios.clase = 1;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnMasteres').onclick = function(){
    filtroEstudios.clase = 2;
    estudios_filtro();
    estudios_estilos();
  };

  /*************
   * BOTONES FILTRO
   *************/
  // Filtro para campus
  document.getElementById('btnCampusTodos').onclick = function(){
    filtroEstudios.campus = 0;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnCampusVa').onclick = function(){
    filtroEstudios.campus = 47;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnCampusPa').onclick = function(){
    filtroEstudios.campus = 34;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnCampusSe').onclick = function(){
    filtroEstudios.campus = 40;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnCampusSo').onclick = function(){
    filtroEstudios.campus = 42;
    estudios_filtro();
    estudios_estilos();
  };

  // Filtro para Ramas
  document.getElementById('btnAreaArtes').onclick = function(){
    filtroEstudios.rama = 1;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnAreaCiencias').onclick = function(){
    filtroEstudios.rama = 2;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnAreaSalud').onclick = function(){
    filtroEstudios.rama = 3;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnAreaSociales').onclick = function(){
    filtroEstudios.rama = 4;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnAreaIngenieria').onclick = function(){
    filtroEstudios.rama = 5;
    estudios_filtro();
    estudios_estilos();
  };

  // Filtro para tipos de estudio (presencial y tal)
  document.getElementById('btnTipoPresencial').onclick = function(){
    filtroEstudios.tipo = 1;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnTipoSemipresencial').onclick = function(){
    filtroEstudios.tipo = 2;
    estudios_filtro();
    estudios_estilos();
  };

  document.getElementById('btnTipoVirtual').onclick = function(){
    filtroEstudios.tipo = 3;
    estudios_filtro();
    estudios_estilos();
  };

});