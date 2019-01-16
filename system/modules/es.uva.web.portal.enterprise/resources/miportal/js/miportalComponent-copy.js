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
var perfilesObject = undefined;
var contenidoObject = undefined;
var perfilesPrioridad = ["pas","pdi","alumno"];
var clasificacionesPrioridad = ["espacio_personal","mas_uva"];

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
      //this.shadow = this.attachShadow({mode: 'open'});
      let shadowRoot = this.attachShadow({mode: 'open'});
      let data = loadJSONMiPortal(this.getAttribute('data'));
      data.then((elemento) => {
        console.log(elemento);
        this.datos=elemento;
      });
      
    }
  }

  set datos(val) {
  	// Metemos los datos en el objeto
    this._datos = val;

    if (this._datos && this._datos.jpegphoto) {
      console.log("MiPortalPhoto set Datos");
      console.log(this._datos);
      var img = document.createElement('img');
      let photo=this._datos.jpegphoto;
      img.src = "data:image/jpeg;base64, " + photo;
      img.name = 'perfilfoto';
      img.id = 'perfilfoto';
      img.alt= "Foto del perfil";
      img.width = 80;
      img.height = 103;
	  img.style.marginLeft = '15px';
	  img.style.marginTop = '5px';
      this.shadowRoot.appendChild(img);
    }
  }

}
customElements.define(MiPortalPhoto.is, MiPortalPhoto);

class MiPortalAvisos extends HTMLElement { 
  // Creamos el componente que crea cada uno de los elementos o accesos (donde pinchan y va al sitio)

  static get is() {
    // Llamada al nombre
    return 'miportal-avisos';
  }

  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
      this.shadow=undefined;
    } catch(err) {
      throw 'Ha habido un error al crear los elementos de Mi Portal';
    } finally {
      //this.shadow = this.attachShadow({mode: 'open'});
      let shadowRoot = this.attachShadow({mode: 'open'});
      this.loadDatos();
      
    }
  }

  loadDatos() {
    console.log("--> MiPortalAvisos loadDatos");
    let data = loadJSONMiPortal(this.getAttribute('data'));
    data.then((elemento) => {
      this.datos=elemento;
    });
  }

  set datos(val) {
  	// Metemos los datos en el objeto
    this._datos = val;
    console.log("--> MiPortalAvisos set DATOS");
    console.log(val);
    let doc = document.querySelector('link[rel="import"]#template_avisos').import;
    let elementTemplate = doc.querySelector('#elementos-avisos');
    //document.body.appendChild(elementTemplate.cloneNode(true));
    // Lo clonamos y trabajamos con el clonado
    //let clonedTemplate = elementTemplate.cloneNode(true);
    let clonedTemplate = document.importNode(elementTemplate.content, true);
    //let contenido = clonedTemplate.getElementById('miportalcontenido');
    let contenido = clonedTemplate.querySelector('#miportalcontenido');

    if (this._datos) {
      console.log("MiPortalAvisos set Datos");
      console.log(this._datos);
      this._datos.forEach(element => {
	      let contenedor = document.createElement('div');
        contenedor.className="container alertas";
        let contenedor_row=document.createElement('div');
        contenedor_row.className="row";
        let contenedor_col=document.createElement('div');
        contenedor_col.className="col-12 urgente text-center";
        let contenedor_contenido= '<i class="fas fa-exclamation-circle"></i> ';
        if (element.link) {
          contenedor_contenido+='<a href="'+element.link+'" target="_blank" >';
        }
        if (element.titulo) {
          contenedor_contenido+=element.titulo;
        }
        if (element.link) {
          contenedor_contenido+='</a>';
        }
      
        contenedor_col.innerHTML=contenedor_contenido;
        contenedor_row.appendChild(contenedor_col);
        contenedor.appendChild(contenedor_row);

        this.shadowRoot.appendChild(contenedor);
      });
      /*
      <div class="container alertas">
				<div class="row">
					<div class="col-12 urgente text-center">
						<i class="fas fa-exclamation-circle"></i> AVISO
					</div>
				</div>
      </div>
      */
      /*
      var img = document.createElement('img');
      let photo=this._datos.jpegphoto;
      img.src = "data:image/jpeg;base64, " + photo;
      img.name = 'perfilfoto';
      img.id = 'perfilfoto';
      img.alt= "Foto del perfil";
      img.width = 80;
      img.height = 103;
	  img.style.marginLeft = '15px';
	  img.style.marginTop = '5px';
      this.shadowRoot.appendChild(img);
      */
    }
    this.shadowRoot.appendChild(clonedTemplate);
  }

}
customElements.define(MiPortalAvisos.is, MiPortalAvisos);


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
      perfilesObject=this;
      //this.shadow = this.attachShadow({mode: 'open'});
      let shadowRoot = this.attachShadow({mode: 'open'});
    }
  }

  loadDatos() {
    console.log("--> MiPortalPerfiles loadDatos");
    let data = loadJSONMiPortal(this.getAttribute('data'));
    data.then((elemento) => {
      let perfiles = elemento.getPerfiles();
      this.datos=perfiles;
    });
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

class MiPortalGrupo extends HTMLElement { 
  // Creamos el componente del Grupo que contiene los Accesos

  static get is() {
    // Llamada al nombre
    return 'miportal-grupo';
  }

  constructor(self) {
    // Constructor
    try {
      super();
    } catch(err) {
      throw 'Ha habido un error al crear los elementos de Mi Portal';
    } finally {
      let shadowRoot = this.attachShadow({mode: 'open'});
    }
  }

  set datos(val) {
  	// Mete los datos en el objeto
    this._datos = val;
  }

  get clasificacion() {
  	// Por si lo queremos obtener
    return this._clasificacion ;
  }

  set clasificacion(val) {
    this._clasificacion = val;
  }

  get grupo() {
  	// Por si lo queremos obtener
    return this._grupo ;
  }

  set grupo(val) {
    this._grupo = val;
  	// Crea el grupo a traves de los valores que le pasamos
    if (val) {
      // Vamos a crearlo a traves de un template
      //let elementTemplate = document.getElementById('grupos-tiles').content;
      //Al ser n template importado:
      let doc = document.querySelector('link[rel="import"]#template_grupos').import;
      let elementTemplate = doc.querySelector('#grupos-tiles');
      //document.body.appendChild(elementTemplate.cloneNode(true));
      // Lo clonamos y trabajamos con el clonado
      //let clonedTemplate = elementTemplate.cloneNode(true);
      let clonedTemplate = document.importNode(elementTemplate.content, true);
      //let contenido = clonedTemplate.getElementById('miportalcontenido');
      let contenido = clonedTemplate.querySelector('#miportalcontenido');

      // Rellenamos el template
      if (this._clasificacion) {
        //elementTemplate.querySelector('h1').innerHTML = '<a href="'+ val.Path +'" role="link">'+ val.NavText +'</a>';
        clonedTemplate.querySelector('h1').innerHTML = this._clasificacion.Title;
      } else {
        clonedTemplate.querySelector('h1').innerHTML = 'Grupo';
      }
      
      // Hacemos el separador
      let bigElement = document.createElement('div');
      bigElement.setAttribute('class', 'row no-margins');

      val.sortAccesos().forEach(element => {
        // Crea los elementos "Accesos" llamando al objeto Accesos con los valores adecuados
        var obj = new MiPortalAccesos();
        obj.datos = element;
        // Lo inserta en el DOM debajo del row
        //contenido.appendChild(obj);
        bigElement.appendChild(obj);
      });
      contenido.appendChild(bigElement);
      // Añadimos los elementos al template clonado
      clonedTemplate.appendChild(contenido);
      // Lo metemos en el shadowRoot
      this.shadowRoot.appendChild(clonedTemplate);
    } else {
      this.removeAttribute('open');
    }
  }
// Fin del class
}
customElements.define(MiPortalGrupo.is, MiPortalGrupo);


class MiPortalGrupos extends HTMLElement { 
  // Creamos el componente que contiene todos los elemento Grupo

  static get is() {
    // Llamada al nombre
    return 'miportal-grupos';
  }

  constructor(...args) {
    // Constructor
    try {
      const self = super(...args);
    } catch(err) {
      throw 'Ha habido un error al crear los elementos de Mi Portal';
    } finally {
      contenidoObject=this;
      let shadowRoot = this.attachShadow({mode: 'open'});
      this.loadDatos();
    }
  }

  loadDatos() {
    console.log("--> MiPortalGrupos loadDatos");
    let data = loadJSONMiPortal(this.getAttribute('data'));
    data.then((elemento) => {
      console.log("--- MiPortalGrupos loadDatos");
      console.log(elemento);
      this.datos=elemento;

      console.log("--- MiPortalGrupos loadPerfiles");
      console.log(elemento.getPerfiles());
      perfilesObject.datos=elemento.getPerfiles();
      console.log(perfilesObject.datos);
      perfilesObject.selPerfil();
    });
  }

  set datos(val) {
    // Metemos los valores en el objeto
    console.log("--> MiPortalGrupos SET Datos");
    console.log(val);
    this._datos = val;
  }

  get perfil() {
  	// Para recuperar el perfil
	  this._perfil = this.getAttribute('data-perfil');
  }

  set perfil(val) {
  	// Mete los valores en el perfil
    console.log("--> MiPortalGrupos SET Perfil");
    console.log(val);
    // Leemos el perfil
    let perfil = {"Path": val};
    console.log(perfil);
    // Añadimos el atributo para saber si cambia o no y tracearlo con el callback
    this.setAttribute('data-perfil', val);
    console.log(this.getAttribute('data-perfil'));
    // Llamamos a la funcion que filtra los datos segun el perfil
    console.log(this._datos);
    let elementos_perfil = this._datos.getPerfil(perfil);
    console.log("--- elementos_perfil");
    console.log(elementos_perfil);
    //Llamamos a la funcion que filtra los elementos por clasificacion de estos
    let clasificaciones = elementos_perfil.getClasificaciones().sortClasificaciones();
    console.log("--- clasificaciones");
    console.log(clasificaciones);
    //Limpiamos lo anterior
    console.log(this.shadowRoot);
    console.log(this.shadowRoot.childNodes);
    if (this.shadowRoot.childNodes) {
      let childNodes = Array.from(this.shadowRoot.childNodes);
      console.log(childNodes);
      childNodes.forEach(childNode => {
        this.shadowRoot.removeChild(childNode);
      });
    }
    


    clasificaciones.forEach(clasificacion => {
      // Creamos los grupos recorriendo el array filtrado
      // Para ello llamamos al objeto GrupoMiPortal que contiene los "accesos"
      var objElement = new MiPortalGrupo();
      objElement.clasificacion = clasificacion;
      // Rellenamos el objeto
      objElement.grupo = elementos_perfil.getClasificacion(clasificacion);
      console.log("--- appendChild");
      console.log(objElement);
      // Le colocamos en el DOM
      this.shadowRoot.appendChild(objElement);
    });
  }
  
	static get observedAttributes() {
		// Ponemos un observable a los atributos que pueden cambiar
		return ['data-perfil']; 
	}
  
	attributeChangedCallback(attr, oldValue, newValue) {
		// Hacemos cochinadas cuando cambie
		
		// Buscamos el tag a borrar contenido
		let toDelete = document.getElementsByTagName('grupos-miportal');
		
		// Esto se puede refactorizar con un forEach... pero mas adelante
		for (let i = 0; i< toDelete.length; i++) {
			// Recorremos (por si hay mas de uno, que nunca se sabe) y limpiamos
			toDelete[i].shadowRoot.innerHTML = '';
		}
	}
}
customElements.define(MiPortalGrupos.is, MiPortalGrupos);

class MiPortalAccesos extends HTMLElement { 
  // Creamos el componente que crea cada uno de los elementos o accesos (donde pinchan y va al sitio)

  static get is() {
    // Llamada al nombre
    return 'miportal-accesos';
  }

  constructor(self) {
    // Constructor
    try {
      super();
    } catch(err) {
      throw 'Ha habido un error al crear los elementos de Mi Portal';
    } finally {
      let shadowRoot = this.attachShadow({mode: 'open'});
    }
  }

  set datos(val) {
  	// Metemos los datos en el objeto
    this._datos = val;

    if (val) {
      // Leemos el template
      //let elementTemplate = document.getElementById('elemento-tile').content;
      let doc = document.querySelector('link[rel="import"]#template_elemento').import;
      let elementTemplate = doc.querySelector('#elemento-tile');
      // Lo clonamos y trabajamos con el clonado
      //let clonedTemplate = elementTemplate.cloneNode(true);
      let clonedTemplate = document.importNode(elementTemplate.content, true);
      //let contenido = clonedTemplate.getElementById('miportalcontenido');
      //let contenido = clonedTemplate.querySelector('#miportalcontenido');
      // Rellenamos el template
      if (val.Path) {
        //elementTemplate.querySelector('h1').innerHTML = '<a href="'+ val.Path +'" role="link">'+ val.NavText +'</a>';
        let enlace=val.Path.replace("/sites/miportal/","");
        clonedTemplate.querySelector('h1').innerHTML = '<a href="'+ enlace +'" role="link">'+ val.NavText +'</a>';
      } else {
        //elementTemplate.querySelector('h1').innerHTML = val.NavText;
        clonedTemplate.querySelector('h1').innerHTML = val.NavText;
      }
      if (val.Icon) {
        let imgurl="http://miportal-des.uva.es/resources/miportal/img/"+val.Icon;
        clonedTemplate.querySelector('div.azul').style = "background-image: url('"+imgurl+"'); background-repeat: no-repeat; background-position: right bottom; background-size: contain;";
      }
      if (val.Iconclass) {
        let divclass=val.Iconclass+' tile';
        clonedTemplate.querySelector('div.azul').className = divclass;
      }

      // Montamos el template
      //this.shadowRoot.appendChild(elementTemplate.cloneNode(true));
      this.shadowRoot.appendChild(clonedTemplate);
    } else {
      // Algo ha ido mal, break! break! break! eliminar el open del shadowRoot
      this.removeAttribute('open');
    }
  }

}
customElements.define(MiPortalAccesos.is, MiPortalAccesos);

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
      let shadowRoot = this.attachShadow({mode: 'open'});
      this.loadDatos();
      
    }
  }

  loadDatos() {
    console.log("--> MiPortalDatos loadDatos");
    let data = loadJSONMiPortal(this.getAttribute('data'));
    data.then((elemento) => {
      console.log("--- MiPortalDatos loadDatos");
      console.log(elemento);
      this.datos=elemento;

    });
  }

  set data(val) {
    console.log(val);
  }

  set datos(val) {
  	// Metemos los datos en el objeto
    this._datos = val;
    console.log(val);
    if (val) {


      let doc = document.querySelector('link[rel="import"]#template_miportal').import;

      let elementTemplate = doc.querySelector('#elementos-miportal');
      console.log(elementTemplate);
      let clonedTemplate = document.importNode(elementTemplate.content, true);
      
      // Rellenamos el template
      if (this._datos) {
        if (this._datos.uid && clonedTemplate.querySelector('span#uid')) {
          clonedTemplate.querySelector('span#uid').innerHTML = this._datos.uid;
        } else {
          clonedTemplate.querySelector('span#uid').innerHTML = '';
        }
        if (this._datos.nif && clonedTemplate.querySelector('span#uid')) {
          clonedTemplate.querySelector('span#nif').innerHTML = this._datos.nif;
        } else {
          clonedTemplate.querySelector('span#nif').innerHTML = '';
        }
        if (this._datos.pais) {
          clonedTemplate.querySelector('span#pais').innerHTML = this._datos.pais;
        } else {
          clonedTemplate.querySelector('span#pais').innerHTML = '';
        }
        if (this._datos.name) {
          clonedTemplate.querySelector('span#nombre').innerHTML = this._datos.name;
        } else {
          clonedTemplate.querySelector('span#nombre').innerHTML = '';
        }
        if (this._datos.sn1) {
          clonedTemplate.querySelector('span#apellido1').innerHTML = this._datos.sn1;
        } else {
          clonedTemplate.querySelector('span#apellido1').innerHTML = '';
        }
        if (this._datos.sn2) {
          clonedTemplate.querySelector('span#apellido2').innerHTML = this._datos.sn2;
        } else {
          clonedTemplate.querySelector('span#apellido2').innerHTML = '';
        }
        if (this._datos.fechanacimiento) {
          clonedTemplate.querySelector('span#fnacimiento').innerHTML = getDate(this._datos.fechanacimiento);
        } else {
          clonedTemplate.querySelector('span#fnacimiento').innerHTML = '';
        }

        if (this._datos.deportes && clonedTemplate.querySelector('span#deportes')) {
          clonedTemplate.querySelector('#deportes').innerHTML = this._datos.deportes === "TRUE"?"Si":"No";
        } else {
          clonedTemplate.querySelector('#deportes').innerHTML = "No";
        }
        if (this._datos.piscina && clonedTemplate.querySelector('span#piscina')) {
          clonedTemplate.querySelector('#piscina').innerHTML = this._datos.piscina  === "TRUE"?"Si":"No";
        } else {
          clonedTemplate.querySelector('#piscina').innerHTML = "No";
        }
        if (this._datos.aparcamientos && clonedTemplate.querySelector('span#aparcamientos')) {
          clonedTemplate.querySelector('#aparcamientos').innerHTML = this._datos.aparcamientos  === "TRUE"?"Si":"No";
        } else {
          clonedTemplate.querySelector('#aparcamientos').innerHTML = "No";
        }
        if (this._datos.wifi && clonedTemplate.querySelector('span#wifi')) {
          clonedTemplate.querySelector('#wifi').innerHTML = this._datos.wifi  === "TRUE"?"Si":"No";
        } else {
          clonedTemplate.querySelector('#wifi').innerHTML = "No";
        }
        //DATOS DE CONTACTO
        if (this._datos.mail || this.datos.telephonenumber) {
          let contenido='<div class="col-md-3 offset-1">';
          if (this._datos.telephonenumber) {
            contenido+='<p> Teléfono: '+this._datos.telephonenumber+'</p>';
          }
          contenido+='</div>';
          contenido+='<div class="col-md-8">';
          if (this._datos.mail) {
            contenido+='<p>Mail UVa: '+this._datos.mail+'</p>';
          }
          if (this._datos.correonooficial) {
            contenido+='<p>Mail noUVa: '+this._datos.correonooficial+'</p>';
          }
          contenido+='</div>';
          if (clonedTemplate.querySelector('#perfilcontacto')) {
            clonedTemplate.querySelector('#perfilcontacto').innerHTML = contenido;
          }
        }

        if (this._datos.correooficial) {
          let contenido='<div class="col-7 offset-1">';
          this._datos.correooficial.forEach(element => {
            contenido+='<p>';
            if (element.correo && element.correo.uvaAliasCorreo) {
              contenido+='Mail: '+element.correo.uvaAliasCorreo+' ';
            }
            if (element.correo && element.correo.mailForwardingAddress) {
              contenido+='redirigido a '+element.correo.mailForwardingAddress+' ';
            }
            if (element.correo && element.correo.uvaFechaCaducidad) {
              contenido+='y caduca '+getDate(element.correo.uvaFechaCaducidad)+' ';
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
          if (clonedTemplate.querySelector('#perfilcorreooficial')) {
            clonedTemplate.querySelector('#perfilcorreooficial').innerHTML = contenido;
          }
        }

        if (this._datos.fechacaducidadcol) {
          let contenido='<div class="col-11 offset-1">';
          this._datos.fechacaducidadcol.forEach(element => {
            if (element.col < 0) {
              contenido+='<p>'+element.description+' que caducó '+getDate(element.fecha)+'</p>';
            } else {
              contenido+='<p>'+element.description+' que caduca '+getDate(element.fecha)+'</p>';
            }
          });
          contenido+='</div>';
          if (clonedTemplate.querySelector('#perfilcolectivos')) {
            clonedTemplate.querySelector('#perfilcolectivos').innerHTML = contenido;
          }
        }

        if (this._datos.colectivos) {
          let contenido='<div class="col-11 offset-1">';
          console.log(this._datos.colectivosdatos);
          for (let key in this._datos.colectivosdatos) {
            let element=this._datos.colectivosdatos[key];
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
          if (clonedTemplate.querySelector('#perfildatoscolectivos')) {
            clonedTemplate.querySelector('#perfildatoscolectivos').innerHTML = contenido;
          }
        }


      }
      this.shadowRoot.appendChild(clonedTemplate);
    }
  }

}
customElements.define(MiPortalDatos.is, MiPortalDatos);



function changePerfil(perfil) {
  console.log("--> changePerfil");
  console.log(perfil);
  // Funcion que rellena los permiles con los datos
  if (!contenidoObject) {
    console.warn("--- changePerfil contenidoObject Vacío");
  }
  if (perfil) {
    console.log(contenidoObject);

    contenidoObject.perfil = perfil;
  } else {
    console.warn("--- changePerfil Perfil Vacío");
  }
}

// Filtrado de datos
// Añadido a los metodos del array las funciones...

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
      return item.Path === ele.Path
    });
	// Repetido si
    if (index_ele === i) return true;
	// Repetido no
    return false;
  });
  // Devolvemos el array
  return perfiles;
}

// Devuelve los contenidos del perfil
Array.prototype.getPerfil = function (perfil) {
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

// Devuelve los contenidos del perfil
Array.prototype.findPerfil = function (perfil) {
  //Obtenemos los elementos con ese perfil
  let resultado= this.filter((e, i, a) => {
    if (perfil.Path) {
      return (e.Path === perfil.Path);
    } else if (perfil.Title) {
      return (e.Title === perfil.Title);
    } else if (perfil.Name) {
      return (e.Name === perfil.Name);
    }
    if (index_ele > -1) return true;
    return false;
  });
  return resultado;
}

// Devuelve las categorias, UNICAS
Array.prototype.getCategorias = function () {
  var array_aux = Array();
  this.forEach(element => {
    if (element.Categories) {
      element.Categories.forEach(cat => {
	  	// Añadimos el elemento
        array_aux.push(cat);
      });
    }
  });
  // Vemos si esta repetido
  var array_unique = array_aux.filter((e, i, a) => {
    var ele = e; 
    var index_ele = a.findIndex(function(item, i){
      return item.Path === ele.Path
    });
	// Repetido si
    if (index_ele === i) return true;
	// Repetido no
    return false;
  });
  console.log("<-- getCategorias");
  console.log(array_unique);
  return array_unique;
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

// Devuelve las clasificaciones, UNICAS
Array.prototype.sortAccesos = function () {
  let array_aux = Array();
  let props = arguments;
  return this.sort((a,b) => {
    let a_pos = a.NavPos;
    let b_pos = b.NavPos;
    if(a_pos < b_pos) return 1;
    if(a_pos > b_pos) return -1;
    return 0;
  });
}


Date.prototype.parse = function (value) {
  console.log("--> setLDAP");
  console.log(value);
  let dl=new Date();
  let yyyy = value.substring(0, 4);
  let mm = value.substring(4, 6);
  let dd = value.substring(6, 8);
  console.log(yyyy);
  console.log(mm);
  console.log(dd);

  dl.setFullYear(yyyy);
  dl.setMonth(mm-1);
  dl.setDate(dd);
  console.log(dl);
  return dl;
};

getDate = function(valor) {
  console.log("-->getDAte");
  console.log(valor);
  var d = new Date()
  d=d.parse(valor);
  console.log(d);
  return d.toLocaleDateString("es-ES");
}

