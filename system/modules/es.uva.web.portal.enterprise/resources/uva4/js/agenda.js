class EventoTexto extends HTMLElement {

  static get is() {
    return 'evento-texto';
  }
  
  constructor(self) {
    self = super(self);
    self._elem = undefined;
    let shadowRoot = self.attachShadow({ mode: 'open' });
    self.setAttribute('class','col-12 col-xs-12 col-sm-12 col-md-4  slide');
    return self;
  }

  connectedCallback() {
  	this.addEventListener('click', this.onclick);
  }

  disconnectedCallback() {
  	this.removeEventListener('click', this.onclick);
  }


  adoptedCallback() {
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
  }

  get elem() {
    return this._elem;
  }

  set elem(val) {
    if (val) {
      var date = new Date(val.date_ini.split(" ")[0]);
      var locale = "es-Es";
      let html='';
	  html+=`
      <style>/*
      .agenda #agenda .bloque_agenda, #agenda #agenda .bloque_agenda {
        height: 100px;
        overflow: hidden; }
		*/
      .va{
        padding: 0.5em 1em;
        border-radius: 4px;
        background-color: #5534ae; 
      }
      .va h1, .va p {
        color: white !important; 
      }
      .se {
        padding: 0.5em 1em;
        border-radius: 4px;
        background-color: #ff9000; 
      }
      .pa {
        padding: 0.5em 1em;
        border-radius: 4px;
        background-color: #93198f; 
      }
      .pa h1, .pa p {
        color: white !important; 
      }
      .so {
        padding: 0.5em 1em;
        border-radius: 4px;
        background-color: #aad000; 
      }
      .uva_azul {
        padding: 0.5em;
        border-radius: 4px;
        background-color: #0e3675; 
      }
      .uva_azul h1, .uva_azul p {
        color: white !important; 
      }
      .uva_rosa {
        padding: 0.5em;
        border-radius: 4px;
        background-color: #ff8b92; 
      }
	  .va h1, .pa h1, .se h1, .so h1 {
	  	font-family: "Lato", Arial;
		font-size: 4.5rem;
		font-weight: 400;
		margin: 0;
		padding: 0;
		padding-right: 28px;
		margin-right: 15px;
		margin-top: -20px;
		margin-bottom: -15px;
	  }
	  .va p, .pa p, .se p, .so p {
	  	margin: 0; 
		font-size: 0.8em; 
		height: 90px; 
		overflow: hidden; 
		text-overflow: ellipsis;
	  }
	  @media only screen and (max-width: 992px) {
	  	.va h1, .pa h1, .se h1, .so h1 {
		font-size: 2.5rem;
		margin-top: 0.05rem;
		margin-top: -15px;
		margin-bottom: -10px;
		}
		
		va p, .pa p, .se p, .so p {
	  		font-size: 1em;
			line-height: 0.5;
	  	}
	  }
	  
	  @media only screen and (max-width: 767px) {
	  	.va h1, .pa h1, .se h1, .so h1 {
			font-family: "Lato", Arial;
			font-size: 4.5rem;
			font-weight: 400;
			margin: 0;
			padding: 0;
			padding-right: 28px;
			margin-right: 15px;
			margin-top: -20px;
			margin-bottom: -15px;
		  }
		  .va p, .pa p, .se p, .so p {
			margin: 0; 
			font-size: 0.8em; 
			height: 90px; 
			overflow: hidden; 
			text-overflow: ellipsis;
		  }
	  
	  }
      </style>`;
	  // Seleccion del campus, esta en .campus_id en id o en .campus_name con el texto
      let clase='uva_rosa';
	  
      if (val.campus_id != 0) {
        switch (val.campus_id) {
          case 188:
		  	// Valladolid
            clase='va';
            break;
          case 189:
		  	// Palencia
            clase='pa';
            break;
          case 190:
		  	// Segovia
            clase='se';
            break;
          case 191:
		  	// Soria
            clase='so';
            break;
        }
      } else {
        if (val.id % 2 == 0) {
          clase="uva_azul"
        } else {
          clase='uva_rosa';
        }
      }
	  // Comienzo del elemento
      html+='  <div class="'+clase+'" style="height: 135px; margin-bottom: 10px;">';
	  // Completamos el elemento
      if (val.title) {
      	html+='    <h1>'+date.getDate()+' <small style="font-size: 0.3em; font-weight: 300; text-transform: capitalize;">'+date.toLocaleString(locale, { month: "long" })+'</small></h1>';
      }
      if (val.title) {
        html+='    <p>'+val.title+' '+val.id+'</p>';
      }
	  // Fin del elemento
      html+='  </div>';
	  // Lo pintamos
      this.shadowRoot.innerHTML = html;
    } else {
      this.removeAttribute('open');
    }
	
    this._elem = val;
  }

  onclick(event)  {
  	// Metodo cuando haces click
    if (event.target === this) {
      event.stopImmediatePropagation();
      event.preventDefault();
      //URL destino: http://eventos.uva.es/ID/detail.html
      let url="http://eventos.uva.es/"+this.elem.id+"/detail.html";
      window.open(url, "_blank");
    }
  }
  
}
customElements.define(EventoTexto.is, EventoTexto);

class EventoSpan extends HTMLElement {
  static get is() {
    return 'evento-span';
  }

  constructor() {
    super();
	//var indice;
	//this.indice = indice;
	// El valor como lo carga al montar, no lo vamos a poner a 0 cuando contruimos el objeto que la cagamos
	// Vamos que teneoms que crear la propiedad del objeto tras crearle y asignarselo luego para que
	// en el primer montaje le meta el valor correcto
    //this.indice = 0;
    //this.createShadowRoot();
    let shadowRoot = this.attachShadow({ mode: 'open' });
    
  }

  connectedCallback() {
    this.addEventListener('click', this.onclick);
	this.setAttribute('class','dot');
	this.setAttribute('indice', this.indice);
	
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.onclick);
  }

  adoptedCallback() {
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
  }

	// Como se lo cascamos desde fuera, el set y el get sooooooobran
	/*
  set indice(val) {
  	console.log('Val = '+ val);
	indice = val;
	console.log('indice = '+val);
	if (val) {
		console.log('Hay val');
		console.log('Indice indice : '+indice);
		this.micaca = val;
		//this.indice = val;
	} else {
		console.log('NO Hay val');
		//this.indice = 0;
	}
    //this.indice = val;
  }

  get indice() {
  	console.log('fffffff');
    //return this.indice;
  }
	*/
	
  onclick(event)  {
  	// El click
  	event.preventDefault();
	agendaoptions.slideIndex = this.indice;
	agendaoptions.automated = false;
	showSlide("agenda", agendaoptions);
	
	// Esto sobra pero te lo dejo porque asi yoquese y tal
	// Vamos que te quito esta morralla
    /*if (event.target === this) {
      event.stopImmediatePropagation();
      event.preventDefault();
      agendaoptions.slideIndex = this.indice;
	  console.log(this.indice);
      agendaoptions.automated = false;
	  agendaoptions.timing = 12000;
      showSlide("agenda", agendaoptions);
    }*/
  }
}
//customElements.define(EventoSpan.is, EventoSpan,{ extends: 'span' });
customElements.define(EventoSpan.is, EventoSpan);

function eventos_jsonp(url) {
  // Funcion que inserta el JSON de una URL para el callback
  return new Promise(function(resolve, reject) {
      let script = document.createElement('script')
      const name = "_jsonp_" + Math.round(100000 * Math.random());
      //url formatting
      if (url.match(/\?/)) url += "&callback="+name
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

document.addEventListener("DOMContentLoaded",function(){
  //index=Solr%20Offline
  var data = eventos_jsonp("http://www-des.uva.es/system/modules/es.uva.web.portal.enterprise/elements/eventos/eventos_proxy.jsp?dataType=jsonp");
  data.then((res) => {
    let contador=0;
    if (res.events && res.total_found>0) {
        res.events.forEach(doc => {
          let evento = new EventoTexto();
          evento.elem = doc;
          document.getElementById('eventos_agenda').appendChild(evento);

          let eventodot = new EventoSpan();
		  // Asi no, hay que crearla en el objeto a las malas
          //eventodot.indice = contador;
		  // Asi si porque sino, no recibe bien la cantidad (el contador)
		  // asi al crear la propiedad le insertamos ya el valor en ella
		  Object.defineProperty(eventodot, 'indice', {
		  	enumerable: true,
			writable: true,
			value: contador
		  });
          document.getElementById('eventos_dots').appendChild(eventodot);
          contador++;
        });
      } else {
	  	// Mostramos chicharra
	  	throw new Error('Error al crear la agenda');
      }
	  
	  // Llamamos al slide de la agenda con las opciones
      showSlide('agenda', agendaoptions);
    });
});