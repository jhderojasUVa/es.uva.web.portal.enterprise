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
	<link rel="manifest" href="/manifest.json">
    <!-- Bootstrap -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
	<%--
	<!-- Traduccion -->
	<!--
	<script src="https://unpkg.com/i18next/i18next.js"></script>
    <script src="https://unpkg.com/i18next-xhr-backend/i18nextXHRBackend.js"></script>
    <script src="https://unpkg.com/i18next-browser-languagedetector/i18nextBrowserLanguageDetector.js"></script>
	-->
	--%>
	<%--
	<script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/languagechanger.js</cms:link>"></script>
	--%>
	<%--
	<!-- Estilos UVa -->
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/header.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/menuv2.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/news.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/agenda.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/contact.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/patrocinadores.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/footer.css</cms:link>" />
	--%>
	<%--
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/movilpatch.css</cms:link>" />
	--%>
	<%--
	<!-- Tuti -->
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/oferta_educativa.css</cms:link>" />
	--%>
	<!-- Font awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    
	<cms:headincludes type="css" />
  	<cms:headincludes type="javascript" /> 
	<link rel="shortcut icon" href="/resources/uva/img/favicon.ico" />
	
	<%--
	<!-- Funciones -->
	<script src="<cms:link>/resources/uva/js/menu_lateral.js</cms:link>"></script>
	<script src="<cms:link>/resources/uva/js/parchemovil.js</cms:link>"></script>
	<script src="<cms:link>/resources/uva/js/pagination.js</cms:link>"></script>
	<script src="<cms:link>/resources/uva/js/jquery.pagination.js</cms:link>"></script>
	<script src="<cms:link>/resources/uva/js/bootstrap.min.js</cms:link>"></script>
	--%>
	<!-- CSS extras -->
	<!--
	<link rel="stylesheet" href="<cms:link>/resources/uva/css/pagination.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/resources/uva/css/parchemovil.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/resources/uva/css/app.css</cms:link>" />
	-->
	
	<!-- CSS NEW -->
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/header.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/menuv2.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/footer.css</cms:link>" />
	<link rel="stylesheet" href="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/css/link_patch_internal.css</cms:link>" />
	
	<%--
	<!-- Parches JS -->
	<script src="<cms:link>/resources/uva/js/back-to-top.js</cms:link>"></script>
	<script src="<cms:link>/resources/uva/js/locale.js</cms:link>"></script>
 	--%>
	
	<!-- Storage -->
	<script src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/storage.js</cms:link>"></script>
   	<!-- Service Worker -->
	<script src="<cms:link>/sites/uva/worker.js</cms:link>" defer></script>
	<!-- Web components bundle -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.1.3/webcomponents-bundle.js" integrity="sha256-4jOg/7MBayBO2wu7hBlS/rMaGUrVPNRzx2ADOR8kv9M=" crossorigin="anonymous"></script>
    <!-- Polyfill -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-polyfills/0.1.42/polyfill.js"  crossorigin="anonymous"></script>
	<!-- Custom elements -->
	<!-- 
	<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.0.3/custom-elements-es5-adapter.js"></script>
	-->
	<!-- Web components -->

	<script type="module" src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/header.js</cms:link>" defer></script>
	<script type="module" src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/navegacion.js</cms:link>" defer></script>
   	<script type="module" src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/breadcrumb.js</cms:link>" defer></script>
	
	<!--
	<script type="module" src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/js/uva.bundle.js</cms:link>" defer></script>
  	-->
  </head>
  <body>
	<c:if test="${cms.isEditMode}">
		<!--=== Placeholder for OpenCms toolbar in edit mode ===-->
		<div style="background: lightgray; height: 52px">&nbsp;</div>
	</c:if>
	<!-- HEADER -->
    <header>
      <uva-header id="header" locale="es">Lo sentimos, su navegador <strong>es muy antiguo</strong>.</uva-header>
    </header>

    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <img alt="Universidad de Valladolid" src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/img/logo_uva.png</cms:link>" />
        </div>
        <div class="col-md-9">
          <h1 style="position: absolute; bottom: 0; right: 0; color: #0b1f4a;"><strong>Universidad</strong>de<strong>Valladolid</strong></h1>
        </div>
      </div>
    </div>
	<!-- Navegacion -->
    <div class="container">
		<div class="row">
            <div class="col-md-12 d-none d-sm-block ">
              <!-- Tablet/PC -->
              <nav>
                <uva-navegacion-horizontal id="navegacion" data="<cms:link>/sites/uva/ws/menu.json</cms:link>" uri="/" startLevel="0" levels=2 onlyone="true" locale="es" >
					<p>Cargando... espere por favor</p>
				</uva-navegacion-horizontal>
              </nav>
            </div>
            <div class="col-md-12 d-block d-sm-none">
              <!-- Mobile -->
              <!--
              <nav>
                <uva-navegacion-vertical id="navegacion" data="<cms:link>/sites/uva/ws/menu.json</cms:link>" uri="/" startLevel="0" levels=2 onlyone="true" locale="es" />
              </nav>
            -->
            </div>

        </div>
    </div>
	<!-- Bradcrumb -->
	<div class="container" style="margin-top: 1em;">
		<div class="row">
			<div class="col-md-12">
				<uva-navegacion-breadcrumb id="breadcrumb" data="<cms:link>/sites/uva/ws/menu.json</cms:link>" uri="${cms.requestContext.uri}" startLevel="2" locale="es" >
					<p>Cargando... espere por favor</p>
				</uva-navegacion-breadcrumb>
			</div>
		</div>
	</div>
	<!-- cuerpo -->
	<div class="container" style="margin-bottom: 20px;">
		<div class="row" class="parche_tuti">
			<aside id="navegacion_lateral" class="col-md-3 hidden-xs hidden-sm">
				<uva-navegacion-vertical id="navegacion" data="<cms:link>/sites/uva/ws/menu.json</cms:link>" uri="${cms.requestContext.uri}" startLevel="2" onlyone="true" locale="es" >
					<p>Cargando... espere por favor</p>
				</uva-navegacion-vertical>
				<cms:container name="leftcontainer" type="left" detailview="true" maxElements="2000"/>
			</aside>
			<div class="col-md-9" style="border-left: 1px solid #eee;">
				<article>
					<!-- Titulo -->
					<div class="row" role="main">
						<!-- columnas derecha interiores -->
						<div class="col-md-9">
							<!-- Titulo de la pagina, no usar header -->	
							<div class="titulo_pag_generico"><h1 role="heading"><util:dame-navtextCarpeta pagecontext="${pageContext}"/></h1></div>
							<cms:container name="centercontainer" type="center" detailview="true" maxElements="2000"/>
						</div>
						<div class="col-md-3">
							<cms:container name="rightcontainer" type="right" detailview="true" maxElements="2000"/>
						</div> 
						<style>
							#rightcontainer {
								margin-top: 5px;
							}
						</style>
					</div>
				</article>
			</div>

	<%-- var informacion cargada --%>
	<c:set var="co" value="${cms:getCmsObject(pageContext)}" />
	<c:set var="filename" value="${cms.getRequestContext().getUri()}" />
	<c:set var="fecha" value="${org.opencms.util.CmsDateUtil.getDateShort(cms.getCmsObject().readFile(filename).getDateLastModified())}" />
	<!-- informacion cargada por -->
	<util:informacion-cargada-por pagecontext="${pageContext }" var="informacion_cargada_por"/>
	<c:if test="${informacion_cargada_por!='' }">
	<%--<div class="row">--%>
		<div class="col-md-12">
			<div id='cargada_por'>${informacion_cargada_por}</div>
		</div>
	<%--</div>--%>
	</c:if>
	
	
	
	
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
			  <div class="col-md-8 text-left">
			  	<a href="<cms:link>/sites/uva/suscripciones.html</cms:link>" role="link" class="btn btn-primary">
				suscripci&oacute;n <i class="fas fa-angle-right"></i>
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
	<%--<script src="/resources/uva4/js/i18n.js"></script>--%>
  </body>
</html>

	