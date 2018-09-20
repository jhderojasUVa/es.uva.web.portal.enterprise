<%@page taglibs="c,cms,fn" %> 
<c:set var="navStartLevel">0</c:set>
<c:set var="navStartFolder" value="/" />
<div class="container menu">
	<div class="row align-items-end">
		<div class="col-md-3 d-none d-md-block d-lg-block">
			<!--
			<img src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/img/logo_uva.png</cms:link>" alt="Universidad de Valladolid" />
			-->
			<img src="<cms:link>/system/modules/es.uva.web.portal.enterprise/resources/uva4/img/logoUVa.png</cms:link>" alt="Universidad de Valladolid" />
		</div>
		<div class="col-md-9 text-right d-none d-md-block d-lg-block">
			<cms:navigation type="forSite" locale="${cms.locale}" resource="${navStartFolder}" startLevel="${navStartLevel}" endLevel="${navStartLevel}" var="nav"/>
			<ul>		
				<c:forEach items="${nav.items}" var="elem">
					<li <c:choose><c:when test="${fn:startsWith(cms.requestContext.uri, elem.resourceName)}">class="active"</c:when><c:otherwise>class=""</c:otherwise></c:choose> >
						<a href="<cms:link>${elem.resourceName}</cms:link>" data-i18n-es="${elem.navText}">${elem.navText}</a>
					</li>
				</c:forEach>
			</ul>
		</div>
		<div class="col-sm-12 text-right d-block d-sm-none d-sm-block d-md-none">
			<a href="#" onclick="showHideElement('menumobile')"><i class="fas fa-bars" style="font-size: 3em;"></i></a>
			<div class="menumobile" style="display:none;">
				<cms:navigation type="forSite" locale="${cms.locale}" resource="${navStartFolder}" startLevel="${navStartLevel}" endLevel="${navStartLevel}" var="nav"/>
				<ul class="menumobileelements">		
					<c:forEach items="${nav.items}" var="elem">
						<li <c:choose><c:when test="${fn:startsWith(cms.requestContext.uri, elem.resourceName)}">class="active"</c:when><c:otherwise>class=""</c:otherwise></c:choose> >
							<a href="<cms:link>${elem.resourceName}</cms:link>" data-i18n-es="${elem.navText}">${elem.navText}</a>
						</li>
					</c:forEach>
				</ul>
			</div>
		</div>
	</div>
</div>
<!--
<div class="col-md-12 hidden-sm hidden-xs" >
	
	<cms:navigation type="forSite" locale="${cms.locale}" resource="${navStartFolder}" startLevel="${navStartLevel}" endLevel="${navStartLevel}" var="nav"/>
	<ul>		
		<c:forEach items="${nav.items}" var="elem">
			<li <c:choose><c:when test="${fn:startsWith(cms.requestContext.uri, elem.resourceName)}">class="active"</c:when><c:otherwise>class=""</c:otherwise></c:choose> >
			<a href="<cms:link>${elem.resourceName}</cms:link>">${elem.navText}</a>
			</li>
		</c:forEach>
	</ul>
</div>

<div class="col-sm-12 hidden-md hidden-lg hidden-xs" style="margin-top: 3px;">
	<cms:navigation type="forSite" resource="${navStartFolder}" startLevel="${navStartLevel}" endLevel="${navStartLevel}" var="nav"/>
	<span class="text-center">
		<label for="select_menu" style="visibility: hidden; display: none;">Selecciona un elemento: </label>
		<select id="select_menu" class="nav_horizontal_movil">
			<option value="">Selecciona un elemento</option>
			<c:forEach items="${nav.items}" var="elem">
			<option value="<cms:link>${elem.resourceName}</cms:link>" style="width: 100%;" <c:if test="${fn:startsWith(cms.requestContext.uri, elem.resourceName)}">select="selected"</c:if>>${elem.navText}</option>
			</c:forEach>
		</select>
	</span>	
</div>
<div class="col-xs-12 hidden-md hidden-lg hidden-sm" style="margin-top: 3px;">
	<cms:navigation type="forSite" resource="${navStartFolder}" startLevel="${navStartLevel}" endLevel="${navStartLevel}" var="nav"/>
	<span class="text-center">
		<label for="select_menu2" style="visibility: hidden; display: none;">Selecciona un elemento: </label>
		<select id="select_menu2" class="nav_horizontal_movil">
			<option value="">Selecciona un elemento</option>
			<c:forEach items="${nav.items}" var="elem">
			<option value="<cms:link>${elem.resourceName}</cms:link>" style="width: 100%;" <c:if test="${fn:startsWith(cms.requestContext.uri, elem.resourceName)}">select="selected"</c:if>>${elem.navText}</option>
			</c:forEach>
		</select>
	</span>	
-->
<script>
	/*$(".nav_horizontal_movil").on("change", function() {
		var url = $(this).val();
		if (url) {
			window.location = $(this).val();
		}
	});*/
</script>