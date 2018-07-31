<%@page buffer="none" session="false" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<fmt:setLocale value="${cms.locale}" />
<cms:bundle basename="es.uva.web.portal.enterprise.directlink">
<cms:formatter var="content" val="value" rdfa="rdfa">

<div class="container vivelauva" style="margin-top: 70px;">

	<div class="row">
        <div class="col-12 col-md-3 header">
		  <h1 data-i18n-es="Vive la UVa" data-i18n-en="Uva's life">Vive la UVa</h1>
        </div>
        <div class="col bloque_raya d-none d-md-block">
          <span class="masinformacion">
		  	<a href="http://www.uva.es/export/sites/uva/6.vidauniversitaria/" target="_blank" role="link">
				<span data-i18n-es="más información" data-i18n-en="read more">más información</span> 
				<span class="flecha"><i class="fas fa-angle-right"></i></span>
			</a>
		  </span>
        </div>
      </div>
	
	<div class="row"  style="margin-top: 1.5em;">
	<c:forEach var="item" items="${content.valueList.Item}">
		<div ${item.rdfa["Link|Image"]} class="${cms:lookup(cms:getListSize(content.valueList.Item), '1:col-xs-12|2:col-sm-6|3:col-sm-4|4:col-md-3 col-sm-6|5:col-md-2 col-sm-6|6:col-md-2 col-sm-4')}">
			<div class="card">
				<c:if test="${item.value.Image.isSet}">
				<c:if test="${item.value.Link.isSet}"><a href="<cms:link>${item.value.Link}</cms:link>" role="link"></c:if>
					<cms:img src="${item.value.Image}" scaleColor="transparent"  scaleType="0"  cssclass="card-img-top" alt="" title="" />
					<c:if test="${item.value.Link.isSet}"></a></c:if>
				</c:if>
				<div class="card-body" style="${item.value.Style}">
					<c:if test="${item.value.Link.isSet}"><a href="<cms:link>${item.value.Link}</cms:link>" role="link"></c:if><span style="text-transform: uppercase; font-size: 1.3em;">${item.value.Text}</span><c:if test="${item.value.Link.isSet}"></a></c:if>
				</div>
			</div>
		</div>
	</c:forEach>
	</div>

</div>

</cms:formatter>
</cms:bundle>