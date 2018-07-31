function jsonp(url) {
  return new Promise(function(resolve, reject) {
      let script = document.createElement('script')
      const name = "_jsonp_" + Math.round(100000 * Math.random());
      //url formatting
      if (url.match(/\?/)) url += "&json.wrf="+name
      else url += "?json.wrf="+name
      script.src = url;
      window[name] = function(data) {
          resolve(data);
          document.body.removeChild(script);
          delete window[name];
      }
      document.body.appendChild(script);
  });
}

class Noticia extends HTMLElement {
  static get is() {
    return 'noticia-basic';
  }
  constructor(self) {
    self = super(self);
    self._doc=undefined;
    let shadowRoot = self.attachShadow({ mode: 'open' });
    self.setAttribute('class','col-12 col-xs-12 col-sm-12 col-md-4');
    return self;
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

  /*onclick(event)  {
    if (event.target === this) {
      event.stopImmediatePropagation();
      event.preventDefault();
      //http://eventos.uva.es/ID/detail.html
      console.log(this._doc);
      let url="http://comunicacion.uva.es/"+this._doc.link;
      window.open(url, "_blank");
    }
  }*/
}
customElements.define(Noticia.is, Noticia);

class NoticiaTexto extends Noticia {
  static get is() {
    return 'noticia-texto';
  }
  constructor(self) {
    self = super(self);
    this.setAttribute('class','col-12 col-xs-12 col-sm-12 col-md-4 noticia_texto');
    return self;
  }

  set doc(val) {
    if (val) {
      let html='';
	  html+=`<style>
        h1 {font-size: 1.5em;font-weight: bold; color: rgba(12 ,12 ,12, 0.9); line-height: 1.2; transition: all 0.3s; font-family: "Lato", sans-serif;}
        h1 a { color: rgba( 12, 12, 12, 0.8); text-decoration: none; }
		h1 a:hover { text-decoration: none; color: rgba(12, 12, 12, 0.7); }
		p {font-size: 1em; color: rgba(0, 0, 0, 0.8); transition: all 0.3s;}
		h1:hover, h1 p:hover { color: rgba(0, 0, 0, 0.6);}
		h1:hover p, p:hover { color: rgba (0, 0, 0, 0.5);}
        </style>`;
      if (val.Title_prop) {
        html+=' <h1><a href="http://comunicacion.uva.es'+val.link+'" target="_blank" role="link">'+val.Title_prop+'</a></h1>';
      }
      if (val.Subtitle_prop) {
        html+=' <p>'+val.Subtitle_prop+'</p>';
      }
      this.shadowRoot.innerHTML = html;
    } else {
      this.removeAttribute('open');
    }
    this._doc=val;
  }
  
}
customElements.define(NoticiaTexto.is, NoticiaTexto);

class NoticiaImagen extends Noticia {
  static get is() {
    return 'noticia-imagen';
  }
  constructor(self) {
    self = super(self);
    this.setAttribute('class','col-12 col-xs-12 col-sm-12 col-md-4 noticia_imagen');
    return self;
  }
  set doc(val) {
    // Reflect the value of the open property as an HTML attribute.
    if (val) {
      //this.setAttribute('open', '');
      //let html= '<div class="col-4 col-md-4 noticia_imagen">';
      let html='  <div class="card">';
      if (val.Imagen_prop) {
        let url=val.Imagen_prop;
        html+='    <img src="'+ url.replace("/sites/comunicacion","http://comunicacion.uva.es")+'" class="card-img-top" width="100%">';
      }
      html+='    <div class="card-body">';
      if (val.Title_prop) {
        html+=' <h1>'+val.Title_prop+'</h1>';
      }
      if (val.Subtitle_prop) {
        html+=' <p>'+val.Subtitle_prop+'</p>';
      }
      html+='    </div>';
      html+='</div>';
      //html+='</div>';
      this.shadowRoot.innerHTML = html;
    } else {
      this.removeAttribute('open');
    }
    this._doc=val;
  }
}
customElements.define(NoticiaImagen.is, NoticiaImagen);

class NoticiaBloque extends HTMLElement {
  static get is() {
    return 'noticia-bloque';
  }
  constructor(self) {
    self = super(self);
    this.setAttribute('class','col-12 col-xs-12 col-sm-12 col-md-4 noticia_imagen');
    return self;
  }
}
customElements.define(NoticiaBloque.is, NoticiaBloque);


document.addEventListener("DOMContentLoaded",function(){
  //index=Solr%20Offline
  //var data = jsonp("http://127.0.0.1:8080/opencms/handleSolrSelect?index=Solr Offline&fq=type:noticias&fq=parent-folders:/sites/default&wt=json");
  var data = jsonp("http://comunicacion.uva.es/opencms/handleSolrSelect?rows=3&fq=campo.tipo_prop:(*1*)&fq=type:noticias&sort=released%20desc&wt=json");
  data.then((res) => {

    if (res.response && res.response.numFound>0) {
        res.response.docs.forEach(doc => {
          let noticia = new NoticiaTexto();
          if (doc.Imagen_prop !== undefined) {
            noticia = new NoticiaImagen();
          } 
          noticia.doc=doc;

          //document.querySelector('.noticias').appendChild(noticia);
          document.getElementById('noticias').appendChild(noticia);
          
        });
      } else {
      }
    });
});