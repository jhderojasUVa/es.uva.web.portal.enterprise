const pageLanguage = document.documentElement.lang;

function changeLangText(lang) {
	// Javascript que busca el data-i18n-{lang} y re-escribe los tags con el
	document.documentElement.lang = lang;

	// Sacamos todos los elementos
	let elements = document.documentElement.getElementsByTagName('*');

	for (var i = 0; i<elements.length; i++) {
	// Recorremos
		if (elements[i].getAttribute('data-i18n-'+lang)) {
			// Si hay, se cambia, nothing more, nothing less
			elements[i].innerHTML = elements[i].getAttribute('data-i18n-'+lang);
		}
	}

}