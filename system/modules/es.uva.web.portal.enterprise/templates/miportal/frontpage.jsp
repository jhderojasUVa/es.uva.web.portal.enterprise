<%@page buffer="none" session="false" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="util" tagdir="/WEB-INF/tags" %>
<fmt:setLocale value="${cms.locale}" />
<c:set var="username"><cms:user property="name"/></c:set><c:set var="firstname"><cms:user property="firstname"/></c:set><c:set var="lastname"><cms:user property="lastname"/></c:set>
<%-- CAMBIAMOS EL LOCALE <util:cambia-locale pagecontext="${pageContext}" locale="es"/>--%>
<!doctype html>
<html lang="${cms.locale}" dir="ltr">
  <head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, user-scalable=no">
	<title>MiPortal - <cms:info property="opencms.title" /> - Universidad de Valladolid</title>
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
    <title data-i18n-es="MiPortal Universidad de Valladolid" data-i18n-en="University of Valladolid Intranet">MiPortal Universidad de Valladolid</title>
	<link rel="manifest" href="/manifest.json">
    <!-- Bootstrap -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    
    <!-- ES2015 -->
	<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js"></script>
	<script type="text/javascript" src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/html-imports.min.js</cms:link>"></script>
	<!--
	<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.0.3/custom-elements-es5-adapter.js"></script>
	  <script type="text/javascript" src="./html-imports.min.js"></script>
	-->
	<script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/languagechanger.js</cms:link>"></script>
	
	<!-- JS elementos -->
	<script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/header.js</cms:link>"></script>
	<script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/menu.js</cms:link>"></script>
	
	<!-- Font awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
	
	<!-- CSS -->
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/footer.css</cms:link>" />
	<link href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/miportal/css/miportal.css</cms:link>" rel="stylesheet">
	
	<cms:headincludes type="css" />
  	<cms:headincludes type="javascript" /> 
	<link rel="shortcut icon" href="/resources/uva/img/favicon.ico" />
  </head>
  <body>
	<c:if test="${cms.isEditMode}">
		<!--=== Placeholder for OpenCms toolbar in edit mode ===-->
		<div style="background: lightgray; height: 52px">&nbsp;</div>
	</c:if>
	
	<!-- Header -->
	<div class="container-fluid header">
      <div class="row justify-content-md-center align-items-center">
        <div class="col-12 col-md-10 col-lg-5">
          <img alt="Universidad de Valladolid" src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/miportal/img/logo_uva.svg</cms:link>" style="margin-top: 0.7em;"/>
        </div>
      </div>
    </div>

  <!-- Generador de contenido para los bloques -->
  <script type="module" src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/miportal/js/miportalComponent.js</cms:link>" defer></script>
  <miportal-contenido info="<cms:link>/sites/miportal/ws/info.jsp</cms:link>" data="<cms:link>/sites/miportal/ws/datos.jsp</cms:link>" data-perfil=""></miportal-contenido>
	
	
	
	<!-- Footer -->
    <footer style="margin-top: 70px;">

      <!-- enlaces -->
      <div class="container-full enlaces">
        <div class="container">
          <div class="row">
            <div class="cell-4 col-md-4">
              <h1 class="text-center">Para todos</h1>
              <ul>
			  	<li><a href="http://ipa.uva.es/" role="link" rel="noopener noreferrer">IPA Información de Pisos en Alquiler</a></li>
				<li><a href="http://consigna.uva.es/" role="link" rel="noopener noreferrer">Servicio de Consigna</a></li>
				<li><a href="http://edicion2.uva.es/6.vidauniversitaria/6.13.alojamientos/6.13.08.alojamientos/index.html" role="link">Alojamientos UVa</a></li>
                <li><a href="http://spanishinvalladolid.com/" role="link" rel="noopener noreferrer">Español en Valladolid</a></li>
                <li><a href="http://www.uva.es/5.empresaeinstituciones/5.01.practicasenempresa/5.01.02.estudiantes/" role="link" rel="noopener noreferrer">Prácticas de Estudiantes</a></li>
                <li><a href="http://www.uva.es/1.lauva/1.09.defensordelacomunidad/1.09.01.presentacion/" role="link" rel="noopener noreferrer">Defensor de la Comunidad</a></li>
				<li><a href="http://www.uva.es/export/sites/uva/7.comunidaduniversitaria/7.13.patrocinadores/7.13.01.agenciaviajesbarcelo/index.html" role="link" rel="noopener noreferrer">B the travel brand</a></li>
              </ul>
			  <h1 class="text-center">Para personal UVa</h1>
			  <ul>
			  	<li><a href="http://intranet.uva.es/papeleria/index.html" role="link" rel="noopener noreferrer">Papelería</a></li>
			  </ul>
            </div>
            <div class="cell-4 col-md-4">
              <h1 class="text-center">Descubre</h1>
              <ul>
                <li><a href="http://iee.blogs.uva.es/" role="link" rel="noopener noreferrer">IEE</a></li>
                <li><a href="http://funge.uva.es/idiomas/" role="link" rel="noopener noreferrer">Centro de Idiomas</a></li>
                <li><a href="http://funge.uva.es/palacio/" role="link" rel="noopener noreferrer">Palacio de Congresos</a></li>
				<li><a href="http://www.fundacionjimenezarellano.com/" role="link" rel="noopener noreferrer">Fundación Jimenez Arellano</a></li>
				<li><a href="http://www.relint.uva.es/" role="link" rel="noopener noreferrer">Internacional</a></li>
              </ul>
            </div>
            <div class="cell-4 col-md-4">
              <h1 class="text-center" data-i18n-es="Descubre" data-i18n-en="Discover">UVa</h1>
              <ul>
			  	<li><a href="http://sede.uva.es" role="link">Sede Electrónica</a></li>
				<li><a href="https://contrataciondelestado.es/wps/poc?uri=deeplink%3AperfilContratante&idBp=7IJNVbZm%2FMkQK2TEfXGy%2BA%3D%3D" role="link">Perfil del Contratante</a></li>
				<li><a href="http://audiovisuales.uva.es" role="link">Audiovisuales</a></li>
				<li><a href="http://www.uva.es/6.vidauniversitaria/6.04.gabinetemedico/index.html" role="link">Gabinete Médico</a></li>
				<li><a href="<cms:link>/mapaweb.html</cms:link>" role="link">Mapa del sitio web</a></li>
              </ul>
            </div>
          </div>
          <div class="row pie_enlaces align-items-center">
            <div class="cell-6 col-md-6 offset-md-6">
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
              <h1>Universidad de Valladolid // Palacio de Santa Cruz, 47002 Valladolid (España)</h1>
              <p>Los contenidos suministrados por la web están sujetos a los derechos de propiedad intelectual e industrial y son titularidad exclusiva de Universidad de Valladolid. La adquisición de algún producto o servicio no confiere al adquiriente ningún derecho de alteración, explotación, reproducción o distribución del mismo fuera de lo estrictamente contratado reservándose Universidad de Valladolid todos los derechos. <a href="http://www.uva.es/export/sites/uva/1.lauva/1.04.secretariageneral/1.04.08.proteccion_datos/index.html" role="link">Más información</a></p>
            </div>
          </div>
        </div>
      </div>

    </footer>

  </body>
</html>