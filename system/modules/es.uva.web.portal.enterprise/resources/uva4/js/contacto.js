
  class FormularioContacto extends HTMLElement {
    static get is() {
      return 'formulario-contacto';
    }
    constructor() {
      try{
        super();
      }catch(e){
      }finally{
        //this.createShadowRoot().innerHTML = '<div id="quotes"><p>NOTICIA XX</p><div>';
        
        //this.shadowRoot.lastElementChild.innerHTML =html;
        this.createShadowRoot();
      }
    }

    connectedCallback() {
      //console.log('Custom square element added to page.');
    }

    disconnectedCallback() {
      //console.log('Custom square element removed from page.');
    }

    adoptedCallback() {
      //console.log('Custom square element moved to new page.');
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      //console.log('Custom square element attributes changed.');
    }

  }
  customElements.define(FormularioContacto.is, FormularioContacto);

  document.addEventListener("DOMContentLoaded",function(){
    document.getElementById('formulario_contacto_enviar').addEventListener('click',function(e) {
      e.preventDefault();
      let name = document.getElementById('formulario_contacto_name').value;
      let email = document.getElementById('formulario_contacto_mail').value;
      let phone = document.getElementById('formulario_contacto_phone').value;
      console.log(name);
      if (name && email && phone) {
        let html="Nombre: "+name+"<br>";
        html+="Correo: "+email+"<br>";
        html+="Telefono: "+phone+"<br>";
        Email.send(
          "mensajes@uva.es",
          "soporte-web@uva.es",
          "Formulario de contacto Oferta educativa",
          html,
          {
            token: "022cd46e-d0d6-4f7a-9507-04e8ae3bcdf6",
            callback: function done(message) { 
            }   
          }
        );
      }
      return false;
    });
  });