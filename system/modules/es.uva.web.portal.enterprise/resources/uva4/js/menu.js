// JS for the menu element

/*window.addEventListener('resize', showallMenuElements);

function createMenuNavigation() {
  // Funcion que crea la funcionalidad de movil del menu
  var elementsMenu = document.querySelectorAll('.menu .menu_group');
  for (let i = 0; i<elementsMenu.length; i++) {
    elementsMenu[i].querySelector('h2').addEventListener('click', function(event){
      for (let i = 0; i<elementsMenu.length; i++) {
        elementsMenu[i].querySelector('ul').classList.remove('show_element');
        elementsMenu[i].querySelector('ul').classList.add('hide_element');
      }
      elementsMenu[i].querySelector('ul').classList.remove('hide_element');
      elementsMenu[i].querySelector('ul').classList.add('show_element');
    });
  }
}

function showallMenuElements() {
  // Funcion que elimina los CSS de createMenuNavigation si se cambia de tamaño
  var elements = document.querySelectorAll('.menu .menu_group ul');
  for (var i = 0; i<elements.length; i++) {
    elements[i].classList.remove('hide_element');
    elements[i].classList.remove('show_element');
  }
}

function showHideElement(element) {
  // Funcion que oculta o muestra un elemento
  // element: elemento (class)
  var theElement = document.querySelectorAll('.'+element);
  for (let i = 0; i<theElement.length; i++) {
    if (theElement[i].style.display === 'none') {
      theElement[i].style.display = 'block';
    } else {
      theElement[i].style.display = 'none';
    }
  }
}

createMenuNavigation();*/

function showHideElement(element) {
  // Funcion que oculta o muestra un elemento
  // element: elemento (class)
  var theElement = document.querySelectorAll('.'+element);
  for (let i = 0; i<theElement.length; i++) {
    if (theElement[i].style.display === 'none') {
      theElement[i].style.display = 'block';
    } else {
      theElement[i].style.display = 'none';
    }
  }
}

