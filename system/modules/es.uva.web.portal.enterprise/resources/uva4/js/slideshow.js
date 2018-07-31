// Slideshow on pure JS

var timer;
var indice = 0;

//class EventoSpan extends HTMLSpanElement {
class SlideshowSpan extends HTMLElement {

    static get is() {
      return 'slideshow-span';
    }
  
    constructor() {
      super();
      this._indice = indice;
	  this.timer = 0; 

      let shadowRoot = this.attachShadow({ mode: 'open' });
	  
	  // Esto hay que crearlo despues de montar el elemento!
      //this.setAttribute('class','dot');
	  //this.setAttribute('indice', this._indice);
	  
	  this.addEventListener('click', this.onclick)
	
    }
  
    connectedCallback() {
		this._indice = indice;
		indice++;
		this.setAttribute('class','dot');
		this.setAttribute('indice', this._indice);  
    }
  
    disconnectedCallback() {
      this.removeEventListener('click', this.onclick);
    }
  
    adoptedCallback() {
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
    }
  
    set indice(val) {
      this._indice = val + 1;
    }
  
    get indice() {
      return this._indice;
    }
  
    onclick(event)  {
		// Hay que pasar el timer al objeto para que lo pueda manejar la funcion
		// es decir, el timer es unico y se le pasa el del objeto a la funcion para
		// que la funcion lo controle y no cree tantos "timers" como espanes
		event.preventDefault();
		slideshowoptions.slideIndex = parseInt(this.indice);
		slideshowoptions.automated = false;
		showSlide('slideshow', slideshowoptions, this.timer);
		
		// Te quito toda esta morralla
      /*if (event.target === this) {
        event.stopImmediatePropagation();
        event.preventDefault();
		console.log(this.indice);
        slideshowoptions.slideIndex = parseInt(this.indice);
        slideshowoptions.automated = false;
        showSlide('slideshow', slideshowoptions);
      }*/
    }
  }
  //customElements.define(EventoSpan.is, EventoSpan,{ extends: 'span' });
customElements.define(SlideshowSpan.is, SlideshowSpan);

function showSlide(nameOfSlideshow, options) {
  // nameOfSlide = id or class (better a class) of the parent element of the slide

  // Read if the slideshow have "options", if not, use the defaults
  if (arguments.length >= 1) {
    let options = arguments[1];
    // Read them
    var slideIndex = options.slideIndex;
    var timming = options.timming;
    var automated = options.automated;
    var num_show = options.num_show;
  } else {
    // Defaults
    var slideIndex = 0;
    var timming = 2000;
    var automated = true;
    var num_show = 3;
  }

  // Finding the slides
  var slides = document.getElementById(nameOfSlideshow).getElementsByClassName('slide');
  var dots = document.getElementById(nameOfSlideshow).getElementsByClassName('dot');


  // Clearing all the elements
  for (let i = 0; i < slides.length; i++) {
    // Hidding all the slides
    slides[i].style.display = 'none';
    // No active dot
    dots[i].className = 'dot';
    if ((i%num_show) != 0) {
      dots[i].style.display = 'none';
    }
  }

  // Showing the slide(s) by groups
  for (let i = 0; i < num_show; i++) {
    // Testing if there's more "i" than slides we have
    if ((slideIndex + i) >= slides.length) {
      slideIndex = slides.length-i-1;
    }
    slides[slideIndex + i].style.display = 'inline-block';

    // Activating the dot
    if (i%num_show == 0) {
      dots[slideIndex + i].className += ' active';
    }
  }

  if (slideIndex +num_show>= slides.length) {
    slideIndex =0-num_show;
  }

  // New options!
  options = {
    slideIndex: slideIndex+num_show,
    timming: timming,
    automated: true,
    num_show: num_show
  }
  
  // If the object send the timer let's put on the function timer
  // so, in that way we change the correct timer not the root scoped one
  if (arguments[2]) {
  	timer = arguments[2];
  }

  // Next!
  if (automated == true) {
    // if it's go auto
    timer = setTimeout(showSlide, timming, nameOfSlideshow, options);
  } else {
    // if not, first stop the timer
    clearTimeout(timer);
    // then start it again
    timer = setTimeout(showSlide, timming, nameOfSlideshow, options);
  }
}

function gotoSlide(name, n) {
  showSlide(name, { slideIndex: n-1, timming: 2000, automated: false, num_show: 3 });
}
