<%@page buffer="none" session="false" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<fmt:setLocale value="${cms.locale}" />
<!doctype html>
<html lang="${cms.locale}">
	<head>
    <!-- Required meta tags -->
    	<meta charset="utf-8">
		<meta name="description" content="<cms:property name='Description' file='search' default='' />">
		<meta name="keywords" content="<cms:property name='Keywords' file='search' default='' />">
		<meta http-equiv="Content-Type" content="text/html; charset=${cms.requestContext.encoding}">
		<meta name="robots" content="index, follow">
		<meta name="revisit-after" content="7 days">
		<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
		<meta http-equiv="Pragma" content="no-cache, no-store" />
		<meta http-equiv="Expires" content="0" />
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<cms:enable-ade/>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="<cms:link>/system/modules/es.uva.web.portal.defiant/resources/deportes/css/deportes.css</cms:link>" />
	  <!-- Font awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
   
	<title>Universidad de Valladolid - Servicio de Deportes - <cms:info property="opencms.title" /></title>
  
	<!-- Favicon -->
	<link rel="shortcut icon" href="/resources/img/favicon.ico" />
	
	<cms:headincludes type="css" closetags="false" />
	<!-- JS Extras -->
	<script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false&key=AIzaSyD9b4PjzXc32agb85sr-iWtLdat1csSB9M"></script>
	<cms:headincludes type="javascript" />
	
	</head>
<body>
	<c:if test="${cms.isEditMode}">
	<!--=== Placeholder for OpenCms toolbar in edit mode ===-->
		<div style="background: lightgray; height: 52px">&nbsp;</div>
	</c:if>
 <div class="container-full cabecera_uva">
      <div class="container">
            <div class="row align-items-center">
			  	<div class="col-md-1 text-left ">
				<a href="http://deportes.uva.es" alt="home deportes"><i class="fas fa-home"></i></a>
                </div>
			    <div class="col-md-6 text-center">
                    <h1>  <strong>Universidad</strong> de <strong>Valladolid</strong></h1>
                </div>
                <div class="col-md-5 d-flex flex-row-reverse">
                    <span class="separador_left  p-3"><span class=""><i class="fas fa-search"></i></span></span>
					<span class="separador_left  p-3"><a href="http://miportal.uva.es" target="_blank"><span class="text-menu" alt="Comunidad" >Comunidad</span> <i class="fas fa-lock"></i></a></span>
					<span class="separador_left  p-3"><a href="http://directorio.uva.es" target="_blank" alt="directorio uva" ><span class="text-menu">Directorio</span> <i class="far fa-address-card"></i></a></span>
                    <span class="separador_left  p-3"><span class="text-menu">Es</span> <i class="fas fa-globe-americas"></i></span>
                </div>
            </div>
        </div>
</div>
	

<div class="container menu">
    <div class="row">
        <div class="col-md-4">
                <a href="http://www.uva.es" target="_blank" alt="web de la universidad de valladolid" ><img src="<cms:link>/system/modules/es.uva.web.portal.defiant/resources/deportes/imgs/logo_uva.png</cms:link>" alt="Universidad de Valladolid" /></a>
        </div>
        <div class="col-md-8  align-items-end align-top text-right">
			<h1 class="servicio_deportes">
			    Servicio de deportes
			</h1>
        </div>
    </div>
	
	<div class="container header_nav">
		<div class="row">
        	<div class="col-md-12">
				<cms:include file="/system/modules/es.uva.web.portal.defiant/elements/menu/nav_main.jsp" />	
			</div>	
		</div>
	</div>	
</div>


<div class="container" role="main">	
	<article role="article">
			<cms:container name="contenedor" type="contenedor" detailview="true" maxElements="2000"/>
	</article>
</div>
	
	<!-- Footer -->
	<br/>
    <footer>

      <!-- mapa -->
      <div class="container-full mapa">
        <div class="container">
          <div class="row">
            <div class="cell-12 col-md-12 gmap">
			  <iframe src="https://www.google.com/maps/d/embed?mid=14QoGKsLUc2RynFL2PmaCqyqyUBw&hl=es"  width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>
              </div>
          </div>
        </div>
      </div>

      <!-- enlaces -->
      <div class="container-full enlaces">
        <div class="container">
          <div class="row">
            <div class="cell-3 col-md-3">
              <h1 class="text-center">Palencia</h1>
              <ul>
                 <li><a href="#" role="link">Becas</a></li>
                <li><a href="#" role="link">Creditos</a></li>
                <li><a href="#" role="link">Accidentes deportivos</a></li>
              </ul>
            </div>
            <div class="cell-3 col-md-3">
              <h1 class="text-center">Segovia</h1>
              <ul>
                 <li><a href="#" role="link">Becas</a></li>
                <li><a href="#" role="link">Creditos</a></li>
                <li><a href="#" role="link">Accidentes deportivos</a></li>
              </ul>
            </div>
            <div class="cell-3 col-md-3">
              <h1 class="text-center">Soria</h1>
              <ul>
                 <li><a href="#" role="link">Becas</a></li>
                <li><a href="#" role="link">Creditos</a></li>
                <li><a href="#" role="link">Accidentes deportivos</a></li>
              </ul>
            </div>
            <div class="cell-3 col-md-3">
              <h1 class="text-center">Valladolid</h1>
              <ul>
                <li><a href="#" role="link">Becas</a></li>
                <li><a href="#" role="link">Creditos</a></li>
                <li><a href="#" role="link">Accidentes deportivos</a></li>
               
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
                  <div class="col-md-4">
                    <button type="submit" class="btn bton-primary">suscripci&oacute;n</button>
                  </div>
                </div>
              </form>
              <span style="text-align: left;">
                <a href="#" role="link"><i class="fab fa-facebook-square" style="font-size: 28px; color: black;"></i></a>&nbsp;&nbsp;
                <a href="#" role="link"><i class="fab fa-twitter-square" style="font-size: 28px; color: black;"></i></a>&nbsp;&nbsp;
                <a href="#" role="link"><i class="fas fa-rss-square" style="font-size: 28px; color: black;"></i></a>
              </span>
            </div>
            <div class="cell-6 col-md-6">
              <div class="lema">
              <strong>800 a&ntilde;os de innovaci&oacute;n</strong><br/>
              Sapientia Aedificavit<br/>
              Sibi Domvm
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- politica -->
      <div class="container-full politica">
        <div class="container">
          <div class="row">
            <div class="cell-12 cell-md-12 text-center">
              <h1>Los contenidos suministrados por la web están sujetos a los derechos de propiedad intelectual e industrial y son titularidad exclusiva de Universidad de Valladolid. La adquisición de algún producto o servicio no confiere al adquiriente ningún derecho de alteración, explotación, 
			  reproducción o distribución del mismo fuera de lo estrictamente contratado reservándose Universidad de Valladolid todos los derechos. <a href="http://http://www.uva.es/export/sites/uva/1.lauva/1.04.secretariageneral/1.04.08.proteccion_datos/index.html">Más información</a></h1>
              
            </div>
          </div>
        </div>
      </div>

    </footer>

  
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  
  </body>
</html>