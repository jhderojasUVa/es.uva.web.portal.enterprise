'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Slideshow on pure JS

var timer;
var indice = 0;

//class EventoSpan extends HTMLSpanElement {

var SlideshowSpan = function (_HTMLElement) {
  _inherits(SlideshowSpan, _HTMLElement);

  _createClass(SlideshowSpan, null, [{
    key: 'is',
    get: function get() {
      return 'slideshow-span';
    }
  }]);

  function SlideshowSpan() {
    _classCallCheck(this, SlideshowSpan);

    var _this = _possibleConstructorReturn(this, (SlideshowSpan.__proto__ || Object.getPrototypeOf(SlideshowSpan)).call(this));

    _this._indice = indice;
    _this.timer = 0;

    var shadowRoot = _this.attachShadow({ mode: 'open' });

    // Esto hay que crearlo despues de montar el elemento!
    //this.setAttribute('class','dot');
    //this.setAttribute('indice', this._indice);

    _this.addEventListener('click', _this.onclick);

    return _this;
  }

  _createClass(SlideshowSpan, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      this._indice = indice;
      indice++;
      this.setAttribute('class', 'dot');
      this.setAttribute('indice', this._indice);
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this.removeEventListener('click', this.onclick);
    }
  }, {
    key: 'adoptedCallback',
    value: function adoptedCallback() {}
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(name, oldValue, newValue) {}
  }, {
    key: 'onclick',
    value: function onclick(event) {
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
  }, {
    key: 'indice',
    set: function set(val) {
      this._indice = val + 1;
    },
    get: function get() {
      return this._indice;
    }
  }]);

  return SlideshowSpan;
}(HTMLElement);
//customElements.define(EventoSpan.is, EventoSpan,{ extends: 'span' });


customElements.define(SlideshowSpan.is, SlideshowSpan);

function showSlide(nameOfSlideshow, options) {
  // nameOfSlide = id or class (better a class) of the parent element of the slide

  // Read if the slideshow have "options", if not, use the defaults
  if (arguments.length >= 1) {
    var _options = arguments[1];
    // Read them
    var slideIndex = _options.slideIndex;
    var timming = _options.timming;
    var automated = _options.automated;
    var num_show = _options.num_show;
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
  for (var i = 0; i < slides.length; i++) {
    // Hidding all the slides
    slides[i].style.display = 'none';
    // No active dot
    dots[i].className = 'dot';
    if (i % num_show != 0) {
      dots[i].style.display = 'none';
    }
  }

  // Showing the slide(s) by groups
  for (var _i = 0; _i < num_show; _i++) {
    // Testing if there's more "i" than slides we have
    if (slideIndex + _i >= slides.length) {
      slideIndex = slides.length - _i - 1;
    }
    slides[slideIndex + _i].style.display = 'inline-block';

    // Activating the dot
    if (_i % num_show == 0) {
      dots[slideIndex + _i].className += ' active';
    }
  }

  if (slideIndex + num_show >= slides.length) {
    slideIndex = 0 - num_show;
  }

  // New options!
  options = {
    slideIndex: slideIndex + num_show,
    timming: timming,
    automated: true,
    num_show: num_show

    // If the object send the timer let's put on the function timer
    // so, in that way we change the correct timer not the root scoped one
  };if (arguments[2]) {
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
  showSlide(name, { slideIndex: n - 1, timming: 2000, automated: false, num_show: 3 });
}