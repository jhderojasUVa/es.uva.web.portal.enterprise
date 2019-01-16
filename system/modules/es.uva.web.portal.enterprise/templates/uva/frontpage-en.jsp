<%@page buffer="none" session="false" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="util" tagdir="/WEB-INF/tags" %>
<fmt:setLocale value="${cms.locale}" />
<%-- CAMBIAMOS EL LOCALE <util:cambia-locale pagecontext="${pageContext}" locale="es"/>--%>
<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
	<title><cms:info property="opencms.title" /></title>
	<meta name="description" content="<cms:property name="Description" file="search" default="Universidad de Valladolid" />">
	<meta name="keywords" content="<cms:property name="Keywords" file="search" default="universidad, valladolid, uva" />">
	<meta http-equiv="Content-Type" content="text/html; charset=${cms.requestContext.encoding}">
	<meta name="robots" content="index, follow">
	<meta name="revisit-after" content="7 days">
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache, no-store" />
	<meta http-equiv="Expires" content="0" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta property="og:title" content="Universidad de Valladolid">
	<meta property="og:type" content="website">
	<meta property="og:url" content="http://www.uva.es">
	<meta property="og:description" content="La Universidad de Valladolid (UVa) es una universidad publica fundada en 1241 con cuatro campus. Imparte estudios de Grado, Master y Doctorado. Miembro del Campus de Excelencia Internacional.">
	<meta property="twitter:card" content="sumary_large_image">
	<meta property="twitter:site" content="@UVa_es">
	<meta property="twitter:title" content="Universidad de Valladolid">
	<meta property="twitter:description" content="La Universidad de Valladolid (UVa) es una universidad publica fundada en 1241 con cuatro campus. Imparte estudios de Grado, Master y Doctorado. Miembro del Campus de Excelencia Internacional.">
	<meta property="twitter:creator" content="@UVa_es">
	
	<cms:enable-ade/>
    <title data-i18n-es="Universidad de Valladolid" data-i18n-en="University of Valladolid Website">Universidad de Valladolid</title>
	<link rel="manifest" href="/manifest.json">
    <!-- Bootstrap -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    
	<!-- Polyfill -->
	<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
	<!-- Web components bundle -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js"></script>
	<!-- Custom elements -->
	<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.0.3/custom-elements-es5-adapter.js"></script>

	<!-- Traduccion -->
	<!--
	<script src="https://unpkg.com/i18next/i18next.js"></script>
    <script src="https://unpkg.com/i18next-xhr-backend/i18nextXHRBackend.js"></script>
    <script src="https://unpkg.com/i18next-browser-languagedetector/i18nextBrowserLanguageDetector.js"></script>
	-->
	<script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/languagechanger.js</cms:link>"></script>
	<!-- JS elementos -->
	<script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/header.js</cms:link>"></script>
	<script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/menu.js</cms:link>"></script>
	<!-- Font awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
    <!-- Estilos UVa -->
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/header.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/menuv2.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/news.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/agenda.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/contact.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/patrocinadores.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/footer.css</cms:link>" />
	
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/movilpatch.css</cms:link>" />
	
	<!-- Tuti -->
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/oferta_educativa.css</cms:link>" />
	
	<cms:headincludes type="css" />
  	<cms:headincludes type="javascript" /> 
	<link rel="shortcut icon" href="/resources/uva/img/favicon.ico" />
  </head>
  <body>
	<c:if test="${cms.isEditMode}">
		<!--=== Placeholder for OpenCms toolbar in edit mode ===-->
		<div style="background: lightgray; height: 52px">&nbsp;</div>
	</c:if>
	<!-- HEADER -->
	<div class="container-full cabecera_uva">
	  <div class="container">
		<div class="row align-items-center">
			<div class="col-md-1 text-left d-none d-md-block d-lg-block">
				<a href="<cms:link>/sites/uva/index.html</cms:link>" role="link" alt="Inicio" aria-label="Inicio"><i class="fas fa-home"></i></a>
			</div>
			<div class="col-md-4 text-center">
				<img alt="Universidad de Valladolid" src="<cms:link>/resources/uva4/img/universityofvalladolid.svg</cms:link>" srcset="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/img/universityofvalladolid.svg</cms:link>" />
			</div>
			
			<!-- v2 -->
			<%--
			<div class="col-md-7 text-right">
				<!-- Google translator -->
				<!--<div class="col-md-2 text-right" id="google_translate_element"></div>-->
				<div id="google_translate_element" style="display: inline-block"></div>
				<script type="text/javascript">
				function googleTranslateElementInit() {
				  new google.translate.TranslateElement({pageLanguage: 'es', includedLanguages: 'ar,de,en,it,ja,zh-CN', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, gaTrack: true, gaId: 'UA-89405791-2'}, 'google_translate_element');
				}
				</script><script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
        	--%>
			<div class="col-md-7 text-right">
				<span class="">
					<a href="<cms:link>/sites/uva/index.html</cms:link>" target="_blank">
					<span class="text-menu">es
					</span>
					<img alt="Seleccionar idioma" class="iconosvg_blanco" src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/img/globe.svg</cms:link>" srcset="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/img/globe.svg</cms:link>" width="20" style="margin-left: 0.3em;"/>
				
					</a>
				</span>
			<!--
            <span class="">
				<span class="text-menu">
					<c:set var="langlinks" value="" />
					<c:set var="showlang" value="true" />
					<c:set var="showlinks" value="true" />
					<label for="selectLanguage" style="visibility: hidden;">Seleccionar idioma</label>
					<select class="langSelect" id="selectLanguage" onChange="ChangeLang()">
					<c:forEach var="locale" items="${cms.availableLocales}">
						<c:choose>
							<c:when test="${locale == cms.locale}">
							<option selected value="${locale}">${locale}</option>
							</c:when>
							<c:otherwise>
							<option value="${locale}">${locale}</option>
							</c:otherwise>
						</c:choose>
					</c:forEach>
					</select>
				</span><img alt="Seleccionar idioma" class="iconosvg_blanco" src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/img/globe.svg</cms:link>" srcset="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/img/globe.svg</cms:link>" width="20" style="margin-left: 0.3em;"/>
			</span>
			-->
            <span class="separador_left"><a href="http://directorio.uva.es/inicio"><span class="text-menu">Directory</span><img alt="Seleccionar idioma" src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/img/address-book.svg</cms:link>" srcset="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/img/address-book.svg</cms:link>" width="20" style="margin-left: 0.3em;"/></a></span>
			<span class="separador_left"><a href="http://miportal.uva.es"><span class="text-menu" style="display: inline-block; width: 60px; margin-top: 5px;">Intranet</span> <i class="fas fa-lock"></i></a></span>
            <span class="separador_left"><a alt="Search" aria-label="Buscador" href="<cms:link>/sites/uva/buscador.html</cms:link>" role="link"><i class="fas fa-search"></i></a></span>
          </div>
		 </div>
			
		
	  </div>
	</div>
    <hr>
	<!-- NAVIGATION -->
	<%--
	<div class="container col-centered">
		<nav id="navegacion_principal">
			<div class="nav_principal">
				<cms:include file="%(link.strong:/system/modules/es.uva.web.portal.enterprise/elements/menu/nav_main.jsp:bf41b105-7ab6-11e8-9993-0242ac11002b)" />
			</div>
		</nav>
	</div>
	<hr>
	--%>
	<!-- ELEMENTOS -->
	
	<cms:container name="contenedor" type="contenedor" detailview="true" maxElements="20"/>
	
	
	<!-- OFERTA -->
	<div class="container oferta_educativa" style="margin-top: 70px;">
	  <div class="row" style="margin-bottom: 1em;">
        <div class="col-12 col-md-4 header">
          <h1 data-i18n-es="oferta educativa" data-i18n-en="educative offer">educative offer</h1>
        </div>
		<div class="col bloque_raya d-none d-md-block">
        </div>
      </div>
	  
      <div class="row" id="filtro" style="display: none; margin-top: -5px; margin-left: 0; margin-right: 0;border-left: 1px solid #dfe3e9; border-top: 1px solid #dfe3e9; border-right: 1px solid #dfe3e9; transition: all 0.25s;">
        <!-- campus -->
		<%--
        <div class="col-md-4">
          <h2 class="text-center" data-i18n-es="CAMPUS" data-i18n-en="CAMPUS">CAMPUS</h2>
          <button class="btn azul_blanco active" id="btnCampusTodos" data-i18n-es="Todos" data-i18n-en="All">Todos</button>
          <button class="btn azul_blanco" id="btnCampusVa">Valladolid</button>
          <button class="btn azul_blanco" id="btnCampusPa">Palencia</button>
          <button class="btn azul_blanco" id="btnCampusSe">Segovia</button>
          <button class="btn azul_blanco" id="btnCampusSo">Soria</button>
        </div>
        <!-- ramas -->
        <div class="col-md-4">
          <h2 class="text-center" data-i18n-es="RAMAS" data-i18n-en="BRANCHES">RAMAS</h2>
          <button class="btn azul_blanco" data-i18n-es="Artes y Humanidades" data-i18n-en="Arts and Humanities" id="btnAreaArtes">Artes y Humanidades</button>
          <button class="btn azul_blanco" data-i18n-es="Ciencias" data-i18n-en="Science" id="btnAreaCiencias">Ciencias</button>
          <button class="btn azul_blanco" data-i18n-es="Ciencias de la salud" data-i18n-en="Health sciences" id="btnAreaSalud">Ciencias de la salud</button>
          <button class="btn azul_blanco" data-i18n-es="Ciencias Sociales y Juridicas" data-i18n-en="Social and Legal sciences" id="btnAreaSociales">Ciencias Sociales y Juridicas</button>
          <button class="btn azul_blanco" data-i18n-es="Ingeniería y Arquitectura" data-i18n-en="Engineering and architecture" id="btnAreaIngenieria">Ingeniería y Arquitectura</button>
        </div>
        <!-- tipos de estudio -->
        <div class="col-md-4">
          <h2 class="text-center" data-i18n-es="TIPOS DE ESTUDIO" data-i18n-en="TYPES OF STUDY">TIPO DE ESTUDIO</h2>
          <button class="btn azul_blanco" data-i18n-es="Presencial" data-i18n-en="On-site" id="btnTipoPresencial">Presencial</button>
          <button class="btn azul_blanco" data-i18n-es="Semipresencial" data-i18n-en="Blended" id="btnTipoSemipresencial">Semipresencial</button>
          <button class="btn azul_blanco" data-i18n-es="Online" data-i18n-en="Online" id="btnTipoVirtual">Online</button>
        </div>
		--%>
		
		<!-- ramas -->
		<div class="col-md-3" style="background-color: #dfe3e9; padding: 0.5em 0;">
			<!-- Life is empty -->
			&nbsp;
		</div>
        <div class="col-md-6 text-center" style="background-color: white; padding: 0.5em 0;">
          <h2 class="text-center" data-i18n-es="RAMAS" data-i18n-en="BRANCHES" style="font-size: 1em; font-weight: 500;">BRANCHES</h2>
		  <div class="text-left" style="margin-left: 15%">
			  <button class="btn azul_blanco" data-i18n-es="Todos" data-i18n-en="All" id="btnTodasRamas">All</button>
			  <button class="btn azul_blanco" data-i18n-es="Artes y Humanidades" data-i18n-en="Arts and Humanities" id="btnAreaArtes"Arts and Humanities</button>
			  <br />
			  <button class="btn azul_blanco" data-i18n-es="Ciencias" data-i18n-en="Science" id="btnAreaCiencias">Science</button>
			  <button class="btn azul_blanco" data-i18n-es="Ciencias de la salud" data-i18n-en="Health sciences" id="btnAreaSalud">Health sciences</button>
			  <br />
			  <button class="btn azul_blanco" data-i18n-es="Ciencias Sociales y Juridicas" data-i18n-en="Social and Legal sciences" id="btnAreaSociales">Social and Legal sciences</button>
			  <button class="btn azul_blanco" data-i18n-es="Ingeniería y Arquitectura" data-i18n-en="Engineering and architecture" id="btnAreaIngenieria">Engineering and architecture</button>
		  </div>
        </div>
        <!-- tipos de estudio -->
        <div class="col-md-3 text-center" style="background-color: white; padding-top: 0.5em;">
          <h2 class="text-center" data-i18n-es="TIPOS DE ESTUDIO" data-i18n-en="TYPES OF STUDY" style="font-size: 1em; font-weight: 500;">TYPES OF STUDY</h2>
		  <div class="text-left" style="margin-left: 15%">
		  	<button class="btn azul_blanco" data-i18n-es="Todos" style="width: 90%" data-i18n-en="All" id="btnTipoTodos">All</button>
			<br />
          	<button class="btn azul_blanco" data-i18n-es="Presencial" style="width: 90%" data-i18n-en="On-site" id="btnTipoPresencial">Presential</button>
			<br />
          	<button class="btn azul_blanco" data-i18n-es="Semipresencial" style="width: 90%" data-i18n-en="Blended" id="btnTipoSemipresencial">Semipresential</button>
		  </div>
          <!--
		  <button class="btn azul_blanco" data-i18n-es="Online" data-i18n-en="Online" id="btnTipoVirtual">Online</button>
		  -->
        </div>
		
      </div>
      <div id="estudios_loader" class="estudios_loader"></div>
      <div id="estudios_content" class="row no-gutters" style="display:none; border: 1px solid #dfe3e9;">
        <div class="col-md-3" style="background-color: #dfe3e9;">
          <nav class="nav flex-column" style="/*margin: 1em 0;*/">
            <a class="nav-link tab azul_blanco" data-i18n-es="GRADOS" data-i18n-en="UNDERGRADUATE" id="btnGrados">UNDERGRADUATE</a>
            <a class="nav-link tab azul_blanco" data-i18n-es="MÁSTERES" data-i18n-en="GRADUATE" id="btnMasteres">GRADUATE</a>
            <a class="nav-link tab azul_blanco" data-i18n-es="DOCTORADO" data-i18n-en="PhD" id="btnDoctorado">PhD</a>
            <!--
			<a class="nav-link tab azul_blanco" data-i18n-es="DOCTORADO" data-i18n-en="PhD" id="btnDoctorado" href="http://escueladoctorado.uva.es/opencms/oferta/index.html?lang=es" role="link" target="_blank">DOCTORADO</a>
            -->
			<a class="nav-link tab azul_blanco" data-i18n-es="TITULOS PROPIOS" data-i18n-en="OWN TITLES" id="btnTitulos" role="link">OWN TITLES</a>
            <!--
			<a class="nav-link tab azul_blanco" data-i18n-es="TITULOS PROPIOS" data-i18n-en="OWN TITLES" id="btnTitulos" href="https://alumnos.sigma.uva.es/cowep/control/consultaEPTipo?entradaPublica=true&idioma=es.ES&centro=140&ano=2018" role="link" target="_blank">TITULOS PROPIOS</a>
            -->
			<a class="nav-link tab azul_blanco" data-i18n-es="FORMACIÓN CONTINUA" data-i18n-en="CONTINOUS FORMATION" id="btnFormacion" role="link" rel="noopener noreferrer">CONTINOUS FORMATION</a>
			<!--
			<a class="nav-link tab azul_blanco" data-i18n-es="FORMACIÓN CONTINUA" data-i18n-en="CONTINOUS FORMATION" id="btnContinua" href="http://www.uva.es/export/sites/uva/2.docencia/2.05.cursos/2.05.01.cursos/" role="link" target="_blank" rel="noopener noreferrer">FORMACIÓN CONTINUA</a>
            -->
			<a class="nav-link tab azul_blanco" data-i18n-es="CURSOS DE ESPAÑOL" data-i18n-en="SPANISH COURSES" id="btnCursos" href="https://spanishinvalladolid.com/" role="link" target="_blank" rel="noopener noreferrer">SPANISH COURSES</a>
          </nav>
        </div>
        <div class="col-md-9" id="estudios_contenido">
          <img alt="Oferta Educativa" src="/resources/uva4/img/oferta.png" class="img-fluid" style=""/>
        </div>
      </div>
    </div>
	<style>
    .estudios_loader {
	  display: inline-block;
      border: 16px solid #f3f3f3; /* Light grey */
      border-top: 16px solid #3498db; /* Blue */
      border-radius: 50%;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    </style>
	<%-- <script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/oferta.js</cms:link>"></script> --%>
	<!-- ES 2015 -->
	<%-- <script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/oferta-es5.js</cms:link>"></script> --%>
	<script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/oferta.js</cms:link>"></script>

	<!-- CONTACTO -->
	  <div class="container contacto" style="margin-top: 70px;">
		  <div class="row">
			  <div class="cell-12 col-md-12">
				  <!--<h1 data-i18n="contacto:contacto.title">Con&eacute;ctate a la UVa</h1>-->
				  <h1 data-i18n-es="Conéctate a la UVa" data-i18n-en="Contact us">Contact us</h1>
				  <!--<p data-i18n="contacto:contacto.subtitle">¿Quieres estudiar en la UVa pero tienes alguna duda? D&eacute;janos tus datos y nos pondremos en contcto contigo</p>-->
				  <p data-i18n-es="Do you want to study with us but you have dubs? Send us your question and we will be in touch with you" data-i18n-en="Do you want to study with us but you have dubs? Send us your question and we will be in touch with you">Do you want to study with us but you have dubs? Send us your question and we will be in touch with you
				  </p>
				  <form method="post" id="formulario_contacto">
					  <div class="form-row align-items-center">

						  <div class="col-md-4">
						  	<label for="formulario_contacto_name" style="display: none;" data-i18n-en="Name">Name</label>
							<input type="text" class="form-control mb-2"  id="formulario_contacto_name" name="formulario_contacto_name" placeholder="Nombre" />
						  </div>
						  <div class="col-md-4">
						  	<label for="formulario_contacto_mail" style="display: none;" data-i18n-en="email">Email</label>
							<input type="text" class="form-control mb-2"  id="formulario_contacto_mail" name="formulario_contacto_mail" placeholder="Escriba su email aqui" />
						  </div>
						  <div class="col-md-3">
						  	<label for="formulario_contacto_phone" style="display: none;" data-i18n-en="Phone number">Phone number</label>
							<input type="text" class="form-control mb-2"  id="formulario_contacto_phone" name="formulario_contacto_phone" placeholder="Telefono" />
						  </div>
						  <div class="col-auto">
							  <button tyoe="submit" id="formulario_contacto_enviar" class="btn btn-primary mb-2 contacto" data-i18n-es="enviar" data-i18n-en="send">send</button>
						  </div>

					  </div>
				  </form>
			  </div>
		  </div>
	  </div>
	<script src="https://smtpjs.com/v2/smtp.js"></script>
    <script src="/resources/uva4/js/contacto.js"></script>
	
	<!-- ELEMENTOS -->
	
	<cms:container name="contenedor2" type="contenedor" detailview="true" maxElements="20"/>
	
	<div class="container patrocinadores" style="margin-top: 70px; margin-bottom: 50px;">
	
	  <div class="row" style="margin-bottom: 1em;">
        <div class="col-12 col-md-4 header">
          <h1 data-i18n-es="patrocinadores" data-i18n-en="sponsors">sponsors</h1>
        </div>
		<div class="col bloque_raya d-none d-md-block">
          
        </div>
      </div>
	
		<div class="row">
			<div class="col-md-3 text-center">
				<a aria-label="Ceitriangular" href="https://ceitriangular.org/" target="_blank" rel="noopener noreferrer"><img alt="CeiTriangular" src="<cms:link>/_imagenes/CieLogo.png</cms:link>" class="img-fluid" /></a>
			</div>
			<div class="col-md-9 text-center">
			<a href="<cms:link>/7.comunidaduniversitaria/7.13.patrocinadores/7.13.02.bancosantander/index.html</cms:link>" target="_blank" rel="noopener noreferrer"><img alt="Banco Santander" src="<cms:link>/_imagenes/santander.gif_1156717278.gif</cms:link>" class="img-fluid" /></a>
			<a href="<cms:link>/7.comunidaduniversitaria/7.13.patrocinadores/7.13.01.agenciaviajesbarcelo/index.html</cms:link>" target="_blank" rel="noopener noreferrer"><img alt="Barceló Viajes" src="<cms:link>/_imagenes/patrocinador01barcelo.png_818694141.png</cms:link>" class="img-fluid" /></a>
			<a href="<cms:link>/7.comunidaduniversitaria/7.13.patrocinadores/7.13.04.openbank/</cms:link>" target="_blank" rel="noopener noreferrer"><img alt="OpenBank" src="<cms:link>/_imagenes/patrocinador03openbank.png_1815782397.png</cms:link>" class="img-fluid" /></a>
			</div>
	
		</div>
	</div>
	<!-- Footer -->
    <footer style="margin-top: 70px;">

      <!-- mapa -->
      <div class="container-full mapa">
        <div class="container">
          <div class="row">
            <div class="cell-12 col-md-12 gmap">
              <iframe title="Mapa de localización" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11924.299444357766!2d-4.726204847456391!3d41.654124535691764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4712b1b3f53785%3A0xe9ec32442c2575f5!2sPalacio+de+Santa+Cruz!5e0!3m2!1ses!2ses!4v1530607016352" width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>

      <!-- enlaces -->
      <div class="container-full enlaces">
        <div class="container">
          <div class="row">
            <!--<div class="cell-3 col-md-3">
              
            </div>-->
            <div class="cell-4 col-md-4">
              <h1 class="text-center">You are interested</h1>
              <ul>
                <li><a href="http://spanishinvalladolid.com/" role="link" rel="noopener noreferrer">Spanish in Valladolid</a></li>
                <li><a href="http://www.uva.es/5.empresaeinstituciones/5.01.practicasenempresa/5.01.02.estudiantes/" role="link" rel="noopener noreferrer">Student internships</a></li>
                <li><a href="http://www.uva.es/1.lauva/1.09.defensordelacomunidad/1.09.01.presentacion/" role="link" rel="noopener noreferrer">Defender of the comunity</a></li>
              </ul>
			  <h1 class="text-center">Divulgation</h1>
              <ul>
                <li><a href="http://ucc.uva.es" role="link">UVaDivulga</a></li>
              </ul>
            </div>
            <div class="cell-4 col-md-4">
              <h1 class="text-center">Discover</h1>
              <ul>
                <li><a href="http://iee.blogs.uva.es/" role="link" rel="noopener noreferrer">IEE</a></li>
                <li><a href="http://funge.uva.es/idiomas/" role="link" rel="noopener noreferrer">Language center</a></li>
                <li><a href="http://funge.uva.es/palacio/" role="link" rel="noopener noreferrer">Palace of congreses</a></li>
				<li><a href="http://www.fundacionjimenezarellano.com/" role="link" rel="noopener noreferrer">Jimenez Arellano foundation</a></li>
				<li><a href="http://www.relint.uva.es/" role="link" rel="noopener noreferrer">International</a></li>
              </ul>
            </div>
            <div class="cell-4 col-md-4">
              <h1 class="text-center" data-i18n-es="Descubre" data-i18n-en="Discover">UVa</h1>
              <ul>
                <li><a href="http://stic.uva.es" role="link">STIC</a></li>
				<li><a href="http://audiovisuales.uva.es" role="link">Audiovisual</a></li>
				<li><a href="http://www.uva.es/6.vidauniversitaria/6.04.gabinetemedico/index.html" role="link">Medical Cabinet</a></li>
				<li><a href="http://edicion2.uva.es/6.vidauniversitaria/6.13.alojamientos/6.13.08.alojamientos/index.html" role="link">Accommodation UVa</a></li>
				<li><a href="https://contrataciondelestado.es/wps/poc?uri=deeplink%3AperfilContratante&idBp=7IJNVbZm%2FMkQK2TEfXGy%2BA%3D%3D" role="link">Contractor profile</a></li>
				<li><a href="http://ods.uva.es" role="link">Sustainable UVa</a></li>
				<li><a href="<cms:link>/mapaweb.html</cms:link>" role="link">Website map</a></li>
              </ul>
            </div>
          </div>
          <div class="row pie_enlaces align-items-center">
		  	
            <div class="cell-6 col-md-6">
			  <div class="col-md-8 text-left">
			  	<a href="<cms:link>/sites/uva/suscripciones.html</cms:link>" role="link" class="btn btn-primary">
				suscription <i class="fas fa-angle-right"></i>
				</a>
				  
			  </div>
              <span style="text-align: left;">
                <a target="_blank" href="https://es-es.facebook.com/Gabinete-de-Comunicaci%C3%B3n-de-la-Universidad-de-Valladolid-187763507920209/" class="socialicon" role="link" alt="Facebook" aria-label="Facebook"><i class="fab fa-facebook-square" style="font-size: 2em; color: #5af0ff; margin-bottom: 0.5em;"></i></a>&nbsp;&nbsp;
                <a target="_blank" href="https://twitter.com/uva_es?lang=es" class="socialicon" role="link" alt="Twitter" aria-label="Twitter"><i class="fab fa-twitter-square" style="font-size: 2em;; color: #5af0ff; margin-bottom: 0.5em;"></i></a>&nbsp;&nbsp;
                <a href="#" class="socialicon" role="link" alt="Rss" aria-label="Rss"><i class="fas fa-rss-square" style="font-size: 2em; color: #5af0ff; margin-bottom: 0.5em;"></i></a>
              </span>
            </div>
            <div class="cell-6 col-md-6">
              <div class="lema">
              <strong data-i18n-es="800 años de innovación" data-i18n-en="800 years of innovation">800 years of innovation</strong><br/>
              Sapientia Aedificavit<br/>
              Sibi Domvm
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- politica -->
      <div class="container-full politica">
        <div class="container">
          <div class="row">
            <div class="cell-12 cell-md-12 text-center">
              <h1>University of Valladolid // Palacio de Santa Cruz, 47002 Valladolid (Spain)</h1>
              <p>The contents provided by the website are subject to intellectual and industrial property rights and are the exclusive property of Universidad de Valladolid. The acquisition of any product or service does not confer any right of alteration, exploitation, reproduction or distribution of the same outside the strictly contracted, reserving all the rights of the University of Valladolid.<a href="http://www.uva.es/export/sites/uva/1.lauva/1.04.secretariageneral/1.04.08.proteccion_datos/index.html" role="link">More information</a></p>
            </div>
          </div>
        </div>
      </div>

    </footer>
	<%--<script src="/resources/uva4/js/i18n.js"></script>--%>
  </body>
</html>