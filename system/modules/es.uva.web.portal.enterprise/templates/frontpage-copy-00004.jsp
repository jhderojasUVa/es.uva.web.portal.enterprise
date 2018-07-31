<%@page buffer="none" session="false" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="util" tagdir="/WEB-INF/tags" %>
<fmt:setLocale value="${cms.locale}" />
<%-- CAMBIAMOS EL LOCALE <util:cambia-locale pagecontext="${pageContext}" locale="es"/>--%>
<!doctype html>
<html lang="${cms.locale}" dir="ltr">
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
    <!-- Bootstrap -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <!--<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.bundle.min.js" integrity="sha384-u/bQvRA/1bobcXlcEYpsEdFVK/vJs3+T+nXLsBYJthmdBuavHvAW6UsmqO2Gd/F9" crossorigin="anonymous"></script>-->
    <!-- Prueba -->
	<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js"></script>
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
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/footer.css</cms:link>" />
	
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
				<i class="fas fa-home"></i>
			</div>
			<div class="col-md-5 text-center">
				<img src="<cms:link>/resources/uva4/img/uva1.svg</cms:link>" srcset="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/img/uva1.svg</cms:link>" />
			</div>
			<!-- v2 -->
			<div class="col-md-6 text-right">
            <span class="separador_left">
				<span class="text-menu">
					<c:set var="langlinks" value="" />
					<c:set var="showlang" value="true" />
					<c:set var="showlinks" value="true" />
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
				</span> <i class="fas fa-globe-americas"></i>
			</span>
            <span class="separador_left"><span class="text-menu">Directorio</span> <i class="far fa-address-card"></i></span>
            <span class="separador_left"><span class="text-menu" style="display: inline-block; width: 60px; margin-top: 5px;">Comunidad</span> <i class="fas fa-lock"></i></span>
            <span class="separador_left separador_right"><i class="fas fa-search"></i></span>
          </div>
		 </div>
			
		
	  </div>
	</div>
    <hr>
	<!-- NAVIGATION -->
	<div class="container col-centered">
		<nav id="navegacion_principal">
			<div class="nav_principal">
				<cms:include file="%(link.strong:/system/modules/es.uva.web.portal.enterprise/elements/menu/nav_main.jsp:bf41b105-7ab6-11e8-9993-0242ac11002b)" />
			</div>
		</nav>
	</div>
	<hr>
	<!-- ELEMENTOS -->
	AQUI!!
	<cms:container name="contenedor" type="contenedor" detailview="true" maxElements="20"/>
	
	<!-- NOTICIAS -->

	<div class="container noticias" style="margin-top: 70px;">
      <div class="row">
        <div class="col-12 col-md-2 header">
          <!--<h1 data-i18n="noticias:noticias.title">¡noticias!</h1>-->
		  <h1 data-i18n-es="Noticias" data-i18n-en="News">Noticias</h1>
        </div>
        <div class="col bloque_raya d-none d-md-block">
          <span class="masinformacion">
		  	<a href="http://comunicacion.uva.es" target="_blank" role="link">
				<span data-i18n-es="más información" data-i18n-en="read more">más información</span> 
				<!--<span  data-i18n="noticias:noticias.more">¡más información!</span>-->
				<i class="fas fa-angle-right"></i>
			</a>
		  </span>
        </div>
      </div>
      <div class="row bloque_noticias" id="noticias">
      </div>
    </div>
	<script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/noticias.js</cms:link>"></script>

	<!-- AGENDA -->
	<div class="container" id="agenda" style="margin-top: 20px;">
      <div class="row">
        <div class="col-12 col-md-2 header">
          <!--<h1 data-i18n="agenda:agenda.title">¡agenda!</h1>-->
		  <h1 data-i18n-es="Agenda" data-i18n-en="Calendar">
		  Agenda
		  </h1>
        </div>
        <div class="col bloque_raya d-none d-md-block">
			<span class="masinformacion">
				<a href="http://eventos.uva.es" target="_blank" role="link">
					<!--<span  data-i18n="agenda:agenda.more">¡más información! </span>  -->
					<span data-i18n-es="más información" data-i18n-en="read more">más información</span>
					<i class="fas fa-angle-right"></i>
				</a>
			</span>
        </div>
      </div>
      <div class="row" id="eventos_agenda" class="bloque_agenda" style="margin-top:15px;">
      </div>
      <div class="row">
        <div class="col-md-12 text-center dots" id="eventos_dots">
        </div>
      </div>
    </div>
	<script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/agenda.js</cms:link>"></script>
    <script>
      // Slideshow options
      var agendaoptions = {
        slideIndex: 0,
        timming: 12000,
        automated: true,
        num_show: 3,
      }
    </script>
	
	<!-- OFERTA -->
	<div class="container oferta_educativa" style="margin-top: 70px;">
	  <div class="row" style="margin-bottom: 1em;">
        <div class="col-12 col-md-4 header">
          <h1 data-i18n-es="oferta educativa" data-i18n-en="educative offer">oferta educativa</h1>
        </div>
		<div class="col bloque_raya d-none d-md-block">
          <!--<span class="masinformacion"><a href="#" role="link">más información <i class="fas fa-angle-right"></i></a></span>-->
        </div>
      </div>
	  
      <div class="row" id="filtro" style="display: none; margin-top: -15px;">
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
        <div class="col-md-9 text-center" style="background-color: rgba(0, 0, 0, 0.05);">
          <h2 class="text-center" data-i18n-es="RAMAS" data-i18n-en="BRANCHES">RAMAS</h2>
		  <button class="btn azul_blanco" data-i18n-es="Todos" data-i18n-en="All" id="btnTodasRamas">Todos</button>
          <button class="btn azul_blanco" data-i18n-es="Artes y Humanidades" data-i18n-en="Arts and Humanities" id="btnAreaArtes">Artes y Humanidades</button>
          <button class="btn azul_blanco" data-i18n-es="Ciencias" data-i18n-en="Science" id="btnAreaCiencias">Ciencias</button>
          <button class="btn azul_blanco" data-i18n-es="Ciencias de la salud" data-i18n-en="Health sciences" id="btnAreaSalud">Ciencias de la salud</button>
          <button class="btn azul_blanco" data-i18n-es="Ciencias Sociales y Juridicas" data-i18n-en="Social and Legal sciences" id="btnAreaSociales">Ciencias Sociales y Juridicas</button>
          <button class="btn azul_blanco" data-i18n-es="Ingeniería y Arquitectura" data-i18n-en="Engineering and architecture" id="btnAreaIngenieria">Ingeniería y Arquitectura</button>
        </div>
        <!-- tipos de estudio -->
        <div class="col-md-3 text-center" style="background-color: rgba(0, 0, 0, 0.05);">
          <h2 class="text-center" data-i18n-es="TIPOS DE ESTUDIO" data-i18n-en="TYPES OF STUDY">TIPO DE ESTUDIO</h2>
          <button class="btn azul_blanco" data-i18n-es="Presencial" data-i18n-en="On-site" id="btnTipoPresencial">Presencial</button>
          <button class="btn azul_blanco" data-i18n-es="Semipresencial" data-i18n-en="Blended" id="btnTipoSemipresencial">Semipresencial</button>
          <button class="btn azul_blanco" data-i18n-es="Online" data-i18n-en="Online" id="btnTipoVirtual">Online</button>
        </div>
		
		
      </div>
      <div class="row" style="margin-top: 10px;">
        <div class="col-md-2">
          <nav class="nav flex-column">
            <a class="nav-link tab azul_blanco" data-i18n-es="GRADOS" data-i18n-en="UNDERGRADUATE" id="btnGrados">GRADOS</a>
            <a class="nav-link tab azul_blanco" data-i18n-es="MÁSTERES" data-i18n-en="GRADUATE" id="btnMasteres">MÁSTERES</a>
            <a class="nav-link tab azul_blanco" data-i18n-es="DOCTORADO" data-i18n-en="PhD" id="btnDoctorado" href="http://escueladoctorado.uva.es/opencms/oferta/index.html?lang=es" role="link" target="_blank">DOCTORADO</a>
            <a class="nav-link tab azul_blanco" data-i18n-es="TITULOS PROPIOS" data-i18n-en="OWN TITLES" id="btnTitulos" href="https://alumnos.sigma.uva.es/cowep/control/consultaEPTipo?entradaPublica=true&idioma=es.ES&centro=140&ano=2018" role="link" target="_blank">TITULOS PROPIOS</a>
            <a class="nav-link tab azul_blanco" data-i18n-es="FORMACIÓN CONTINUA" data-i18n-en="CONTINOUS FORMATION" id="btnContinua" href="http://www.uva.es/export/sites/uva/2.docencia/2.05.cursos/2.05.01.cursos/" role="link" target="_blank">FORMACIÓN CONTINUA</a>
            <a class="nav-link tab azul_blanco" data-i18n-es="CURSOS DE ESPAÑOL" data-i18n-en="SPANISH COURSES" id="btnCursos" href="https://spanishinvalladolid.com/" role="link" target="_blank">CURSOS DE ESPAÑOL</a>
          </nav>
        </div>
        <div class="col-md-10" id="estudios_contenido">
          <img src="/resources/uva4/img/oferta.png"/>
        </div>
      </div>
    </div>
	<script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/oferta.js</cms:link>"></script>
	
	<!-- CONTACTO -->
	  <div class="container contacto" style="margin-top: 70px;">
		  <div class="row">
			  <div class="cell-12 col-md-12">
				  <!--<h1 data-i18n="contacto:contacto.title">Con&eacute;ctate a la UVa</h1>-->
				  <h1 data-i18n-es="Conéctate a la UVa" data-i18n-en="Contact us">Conéctate a la UVa</h1>
				  <!--<p data-i18n="contacto:contacto.subtitle">¿Quieres estudiar en la UVa pero tienes alguna duda? D&eacute;janos tus datos y nos pondremos en contcto contigo</p>-->
				  <p data-i18n-es="¿Quieres estudiar en la UVa pero tienes alguna duda? D&eacute;janos tus datos y nos pondremos en contcto contigo" data-i18n-en="Do you want to study with us but you have dubs? Send us your question and we will be in touch with you">¿Quieres estudiar en la UVa pero tienes alguna duda? D&eacute;janos tus datos y nos pondremos en contcto contigo
				  </p>
				  <form method="post" id="formulario_contacto">
					  <div class="form-row align-items-center">

						  <div class="col-md-4">
							  <input type="text" class="form-control mb-2"  id="formulario_contacto_name" name="formulario_contacto_name" placeholder="Nombre" />
						  </div>
						  <div class="col-md-4">
							  <input type="text" class="form-control mb-2"  id="formulario_contacto_mail" name="formulario_contacto_mail" placeholder="Escriba su email aqui" />
						  </div>
						  <div class="col-md-3">
							  <input type="text" class="form-control mb-2"  id="formulario_contacto_phone" name="formulario_contacto_phone" placeholder="Telefono" />
						  </div>
						  <div class="col-auto">
							  <!--<button tyoe="submit" id="formulario_contacto_enviar" class="btn btn-primary mb-2" data-i18n="contacto:contacto.button">enviar</button>-->
							  <button tyoe="submit" id="formulario_contacto_enviar" class="btn btn-primary mb-2 contacto" data-i18n-es="enviar" data-i18n-en="send">enviar</button>
						  </div>

					  </div>
				  </form>
			  </div>
		  </div>
	  </div>
	<script src="https://smtpjs.com/v2/smtp.js"></script>
    <script src="/resources/uva4/js/contacto.js"></script>
	
	<!-- Footer -->
    <footer style="margin-top: 70px;">

      <!-- mapa -->
      <div class="container-full mapa">
        <div class="container">
          <div class="row">
            <div class="cell-12 col-md-12 gmap">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11924.299444357766!2d-4.726204847456391!3d41.654124535691764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4712b1b3f53785%3A0xe9ec32442c2575f5!2sPalacio+de+Santa+Cruz!5e0!3m2!1ses!2ses!4v1530607016352" width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>

      <!-- enlaces -->
      <div class="container-full enlaces">
        <div class="container">
          <div class="row">
            <div class="cell-3 col-md-3">
              <h1 class="text-center">Transparencia</h1>
              <ul>
                <li><a href="#" role="link">Portal de transparencia</a></li>
                <li><a href="#" role="link">Sede electrónica</a></li>
                <li><a href="#" role="link">Perfil del contratante</a></li>
              </ul>
            </div>
            <div class="cell-3 col-md-3">
              <h1 class="text-center">Divulgación</h1>
              <ul>
                <li><a href="#" role="link">UvaOrienta</a></li>
                <li><a href="#" role="link">UVaDivulga</a></li>
                <li><a href="#" role="link">UVaEmpleo</a></li>
                <li><a href="#" role="link">Investigación</a></li>
				<li><a href="#" role="link">Internacional</a></li>
              </ul>
            </div>
            <div class="cell-3 col-md-3">
              <h1 class="text-center">Te interesa</h1>
              <ul>
                <li><a href="#" role="link">Deportes</a></li>
                <li><a href="#" role="link">Biblioteca</a></li>
                <li><a href="#" role="link">Cursos de español</a></li>
                <li><a href="#" role="link">Prácticas de estudiantes</a></li>
				<li><a href="#" role="link">Defensor de la Comunidad</a></li>
              </ul>
            </div>
            <div class="cell-3 col-md-3">
              <h1 class="text-center" data-i18n-es="Descubre" data-i18n-en="Discover">Descubre</h1>
              <ul>
                <li><a href="#" role="link" data-i18n-es="Campus de Excelencia internacional" data-i18n-en="Campus of International Excellence">Campus de Excelencia internacional</a></li>
                <li><a href="#" role="link" data-i18n-es="Fundación de la Universidad" data-i18n-en="University of Valladolid Foundation">Fundación de la Universidad</a></li>
                <li><a href="#" role="link" data-i18n-es="Parque científico" data-i18n-en="Scientific Park">Parque científico</a></li>
                <li><a href="#" role="link" data-i18n-es="Centro de idiomas" data-i18n-en="Language Learning Center">Centro de idiomas</a></li>
				<li><a href="#" role="link" data-i18n-es="Fundación Jiménez Arellano" data-i18n-en="Jiménez Arellano Foundation">Fundación Jiménez Arellano</a></li>
				<li><a href="#" role="link" data-i18n-es="Palacio de congresos" data-i18n-en="Palace of Congress">Palacio de congresos</a></li>
              </ul>
            </div>
          </div>
          <div class="row pie_enlaces align-items-center">
            <div class="cell-6 col-md-6">
              <form method="post">
                <div class="form-group row text-center">
                  <div class="col-md-8">
                    <input type="text" name="email" placeholder="Su dirección de email">
                  </div>
                  <div class="col-md-4 text-left">
                    <button type="submit" class="btn bton-primary" data-i18n-es="suscripción" data-i18n-en="subscribe">suscripci&oacute;n</button>
                  </div>
                </div>
              </form>
              <span style="text-align: left;">
                <a href="#" class="socialicon" role="link"><i class="fab fa-facebook-square" style="font-size: 2em; color: black; margin-bottom: 0.5em;"></i></a>&nbsp;&nbsp;
                <a href="#" class="socialicon" role="link"><i class="fab fa-twitter-square" style="font-size: 2em;; color: black; margin-bottom: 0.5em;"></i></a>&nbsp;&nbsp;
                <a href="#" class="socialicon" role="link"><i class="fas fa-rss-square" style="font-size: 2em; color: black; margin-bottom: 0.5em;"></i></a>
              </span>
            </div>
            <div class="cell-6 col-md-6">
              <div class="lema">
              <strong data-i18n-es="800 años de innovación" data-i18n-en="800 years of innovation">800 a&ntilde;os de innovaci&oacute;n</strong><br/>
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
              <h1>Universidad de Valladolid // Palacio de Santa Cruz, codigop postal Sed consequoat, leo eget bibendum sodales, augue velit cusus nunc</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultrices rutrum auctor. Donec fermentum, lorem at semper ultrices, velit tellus efficitur massa, placerat tincidunt ante arcu non urna. Mauris vel tortor a magna porttitor finibus eu eget orci. Mauris gravida vel libero quis suscipit. Nam interdum quam at lectus tincidunt, blandit iaculis arcu blandit.</p>
            </div>
          </div>
        </div>
      </div>

    </footer>
	
	
	
	<!--<script src="/resources/uva4/js/i18n.js"></script>-->
  </body>
</html>