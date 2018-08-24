<%@page taglibs="c,cms,fn" %> 
<div class="col-xs-12 col-sm-12 col-md-12 " style="margin-top: 3px;">
	<c:set var="navStartLevel">0</c:set>
	<c:set var="navStartFolder" value="/" />
	<cms:navigation type="forSite" resource="${navStartFolder}" startLevel="${navStartLevel}" endLevel="${navStartLevel}" var="nav"/>
	<span class="text-center">
		<select id="nav_perfil" class="nav_horizontal_movil">
			<option value="">Selecciona tu perfil</option>
			<c:forEach items="${nav.items}" var="elem">
			<option value="<cms:link>${elem.resourceName}</cms:link>" style="width: 100%;" <c:if test="${fn:startsWith(cms.requestContext.uri, elem.resourceName)}">select="selected"</c:if>>${elem.navText}</option>
			</c:forEach>
		</select>
	</span>	
</div>

<script>
	//$(".nav_horizontal_movil").on("change", function() {
	document.getElementById("nav_perfil").addEventListener("change", function(event) {
		//console.log(event.target.value);
		//console.log(document.getElementById("nav_perfil").value);
		//var url = $(this).val();
		var url = event.target.value;
		if (url) {
			window.location = url;
		}
	});
</script>