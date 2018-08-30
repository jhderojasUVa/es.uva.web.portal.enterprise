class AccesosMiPortal extends HTMLElement {
  // Creamos el componente

  static get is() {
    // Llamada al nombre
    return 'acessos-miportal';
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

  contenido(data) {
    // Creamos el elemento con su contenido

    if (data) {
      // Leemos el template
      let elementTemplate = document.getElementById('elemento-tile').content;
      // Rellenamos el template
      if (data.Path) {
        elementTemplate.querySelector('h1').innerHTML = '<a href="'+ data.Path +'" role="link">'+ data.NavText +'</a>';
      } else {
        elementTemplate.querySelector('h1').innerHTML = data.NavText;
      }

      // Montamos el template
      this.shadowRoot.appendChild(elementTemplate.cloneNode(true));
    } else {
      // Algo ha ido mal, break! break! break! eliminar el open del shadowRoot
      this.removeAttribute('open');
    }
  }

}

customElements.define(AccesosMiPortal.is, AccesosMiPortal);

document.addEventListener('DOMContentLoaded', function() {
  // Añadimos el listener para crear el elemento en el DOM

  // Metemos un filtro falso
  var filtro = {
    perfiles: ['pas', 'alumno'],
    clasificacion: ['mas_uva']
  }

  // Cargamos todos los datos y los filtramos
  let data = loadJSONMiPortalFiltered(filtro);

  // Creamos el row
  let theRow = document.createElement('div');
  theRow.setAttribute('class', 'row no-margins');

  // Recorremos y creamos el elemento
  data.then((elemento) => {
    elemento.forEach((elem, index) => {
      // Creamos el contenedor para el bootstrap y lo definimos correctamente
      let bigElement = document.createElement('div');
      bigElement.setAttribute('class', 'col-md-3');
      // Creamos el objeto y lo rellenamos con los datos
      let objElemento = new AccesosMiPortal();
      objElemento.contenido(elem);
      // Añadimos el objeto al elemento del bootstrap
      bigElement.appendChild(objElemento);
      // Añadimos el elemento compuesto al elemento total
      theRow.appendChild(bigElement);
    });
    // Pintamos el elemento total compuesto de todos los subelementos
    document.getElementById('miportalcontenido').appendChild(theRow);
  });

});

async function loadJSONMiPortalFiltered(filtro) {
  // Funcion que hace un fetch y aplica el filtro (que le hemos metido) a los datos

  // Pillamos los datos
  let datos = await fetch('/miportal/cajas.json')
  .then((respuesta) => {
    if (respuesta.ok) return respuesta.json()
  })
  .then((respuestaJSON) => respuestaJSON);

  // Atencion: Esto se puede refactorizar en una cosa mejor que esta mierda
  // Aplicamos el filtro tantas veces como filtros haya
  // Para ello creamos un nuevo array
  let resultArray = [];
  for (let vecesQueFiltro = 0; vecesQueFiltro <= filtro.perfiles.length; vecesQueFiltro++) {
    for (let i = 0; i <= (datos.length - 1); i++) {
      for (let j = 0; j <= (datos[i].Categories.length - 1); j++) {
        // Filtramos segun los perfiles
        if (datos[i].Categories[j].Name == filtro.perfiles[vecesQueFiltro]) {
          resultArray.push(datos[i]);
        }
      }
    }
  }
  // Devolvemos lo filtrado
  return resultArray;
}
