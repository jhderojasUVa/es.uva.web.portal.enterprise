var lang = document.getElementsByTagName('html')[0].getAttribute('lang') || 'es';
var i18nextOptions = {
	lng: lang,
	fallbackLng: 'es',
	debug: false,
	//load:['es','en'],
	ns:['agenda','noticias','contacto'],
	defaultNS:'agenda',
	backend: {
		loadPath: 'http://www.uva.es/resources/uva4/i18n/{{lng}}/{{ns}}.json',
		addPath:   'http://www.uva.es/resources/uva4/i18n/{{{lng}}/{{ns}}',
		crossDomain: true
	},
	getAsync:false,
}
i18next
	.use(i18nextXHRBackend)
	//.use(i18nextBrowserLanguageDetector)
	.init(i18nextOptions, (err, t) => {
		if (err) return console.log('something went wrong loading', err);
		//TRADUCIMOS
		var traducir = document.querySelectorAll('[data-i18n]');
		
		traducir.forEach((element, index, array) => {
			let trad = i18next.t(element.getAttribute("data-i18n"));
			if (trad) element.innetHTML = trad;
		});
		
		/*
		for (i = 0; i < traducir.length; i++) { 
			let trad = i18next.t(traducir[i].getAttribute("data-i18n"));
			if (trad) traducir[i].innerHTML = trad; 
		}
		*/
	});