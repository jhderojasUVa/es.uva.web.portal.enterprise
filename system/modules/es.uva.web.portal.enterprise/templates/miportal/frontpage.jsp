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
    <title data-i18n-es="MiPortal Universidad de Valladolid" data-i18n-en="University of Valladolid Intranet">MiPortal Universidad de Valladolid</title>
	<link rel="manifest" href="/manifest.json">
    <!-- Bootstrap -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    
    <!-- ES2015 -->
	<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js"></script>

	<script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/languagechanger.js</cms:link>"></script>
	<!-- JS elementos -->
	<script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/header.js</cms:link>"></script>
	<script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/menu.js</cms:link>"></script>
	
	<!-- Font awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
    
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
	<div class="container-fluid header fondo_azul" style="height: 58px;">
      <div class="row justify-content-md-center align-items-center">
        <div class="col-5">
          <img alt="Universidad de Valladolid" src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/miportal/img/logo_uva.svg</cms:link>" style="margin-top: 0.5em;"/>
        </div>
      </div>
    </div>
	
	<!-- User data -->
	<div class="miportal_letras">
      <h1>Mi Portal</h1>
    </div>

    <div class="container miportal">
      <div class="row align-items-center">
        <div class="col-1">
          <a href="http://www.uva.es" role="link"><img src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/miportal/img/logo_uva_cuadrado.png</cms:link>" alt="Universidad de Valladolid"></a>
        </div>
        <div class="col">
          <div class="user_profile">
            <img src="https://via.placeholder.com/80x103?text=foto" alt="imagen usuario">
            <div class="user_data">
              <h5>${firstname}&nbsp;${lastname}</h5>
              <select name="perfil">
                <option value="1" selected>PAS</option>
                <option value="2">PDI</option>
                <option value="3">Alumno</option>
              </select>
            </div>
          </div>
          <div class="user_icons">
            <div class="icons_up">
              <span class="icon_group">Servicio de Atención <a href="tel://983423000" role="link"><i class="far fa-comments"></i></a></span>
              <span class="icon_group">Salir <a href="#" role="link"><i class="fas fa-sign-out-alt"></i></a></span>
            </div>
            <div class="icons_down">
              <span class="icon_group">Avisos <a href="#" role="link"><i class="fas fa-exclamation"></i> <span class="badge badge-pill badge-warning">3</span></a></span>
              <span class="icon_group">Buzon <a href="http://webmail.uva.es" role="link"><i class="far fa-envelope"></i> <span class="badge badge-pill badge-warning">44</span></a></span>
              <span class="icon_group">Agenda <a href="http://webmail.uva.es" role="link"><i class="far fa-calendar-alt"></i></a></span>
              <span class="icon_group">Directorio <a href="http://directorio.uva.es" role="link"><i class="fas fa-users"></i></a></span>
              <span class="icon_group">Configuración <a href="http://directorio.uva.es" role="link"><i class="fas fa-cog"></i></a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
	
	<!-- ELEMENTOS -->
	
	<cms:container name="contenedor" type="contenedor" detailview="true" maxElements="20"/>
	
	
	<!-- Footer -->
    <footer style="margin-top: 70px;">

      <!-- enlaces -->
      <div class="container-full enlaces">
        <div class="container">
          <div class="row">
            <!--<div class="cell-3 col-md-3">
              
            </div>-->
            <div class="cell-4 col-md-4">
              <h1 class="text-center">Te interesa</h1>
              <ul>
                <li><a href="http://spanishinvalladolid.com/" role="link" rel="noopener noreferrer">Español en Valladolid</a></li>
                <li><a href="http://www.uva.es/5.empresaeinstituciones/5.01.practicasenempresa/5.01.02.estudiantes/" role="link" rel="noopener noreferrer">Prácticas de Estudiantes</a></li>
                <li><a href="http://www.uva.es/1.lauva/1.09.defensordelacomunidad/1.09.01.presentacion/" role="link" rel="noopener noreferrer">Defensor de la Comunidad</a></li>
              </ul>
			  <h1 class="text-center">Divulgación</h1>
              <ul>
                <li><a href="http://ucc.uva.es" role="link">UVaDivulga</a></li>
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
                <li><a href="http://stic.uva.es" role="link">Servicio de Tecnologías de la Información y las Comunicaciones</a></li>
				<li><a href="http://audiovisuales.uva.es" role="link">Audiovisuales</a></li>
				<li><a href="http://www.uva.es/6.vidauniversitaria/6.04.gabinetemedico/index.html" role="link">Gabinete Médico</a></li>
				<li><a href="http://edicion2.uva.es/6.vidauniversitaria/6.13.alojamientos/6.13.08.alojamientos/index.html" role="link">Alojamientos UVa</a></li>
				<li><a href="https://contrataciondelestado.es/wps/poc?uri=deeplink%3AperfilContratante&idBp=7IJNVbZm%2FMkQK2TEfXGy%2BA%3D%3D" role="link">Perfil del Contratante</a></li>
				<li><a href="http://ods.uva.es" role="link">Sostenible UVa</a></li>
				<li><a href="<cms:link>/mapaweb.html</cms:link>" role="link">Mapa del sitio web</a></li>
              </ul>
            </div>
          </div>
          <div class="row pie_enlaces align-items-center">
            <div class="cell-6 col-md-6">
              <form method="post" action="<cms:link>/sites/uva/suscripciones.html</cms:link>">
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
                <a href="#" class="socialicon" role="link" alt="Facebook" aria-label="Facebook"><i class="fab fa-facebook-square" style="font-size: 2em; color: black; margin-bottom: 0.5em;"></i></a>&nbsp;&nbsp;
                <a href="#" class="socialicon" role="link" alt="Twitter" aria-label="Twitter"><i class="fab fa-twitter-square" style="font-size: 2em;; color: black; margin-bottom: 0.5em;"></i></a>&nbsp;&nbsp;
                <a href="#" class="socialicon" role="link" alt="Rss" aria-label="Rss"><i class="fas fa-rss-square" style="font-size: 2em; color: black; margin-bottom: 0.5em;"></i></a>
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
              <h1>Universidad de Valladolid // Palacio de Santa Cruz, 47002 Valladolid (España)</h1>
              <p>Los contenidos suministrados por la web están sujetos a los derechos de propiedad intelectual e industrial y son titularidad exclusiva de Universidad de Valladolid. La adquisición de algún producto o servicio no confiere al adquiriente ningún derecho de alteración, explotación, reproducción o distribución del mismo fuera de lo estrictamente contratado reservándose Universidad de Valladolid todos los derechos. <a href="http://www.uva.es/export/sites/uva/1.lauva/1.04.secretariageneral/1.04.08.proteccion_datos/index.html" role="link">Más información</a></p>
            </div>
          </div>
        </div>
      </div>

    </footer>

  </body>
</html>