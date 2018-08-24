<%@page buffer="none" session="false" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<fmt:setLocale value="${cms.locale}" />
<cms:bundle basename="es.uva.web.portal.enterprise.directlink">
<cms:formatter var="content" val="value" rdfa="rdfa">

<div class="container separacion_bloques">
	<div class="row">
      <div class="col-12 cabecera_bloque">
        <h1>${content.value.Title}</h1>
      </div>
    </div>
	<div class="row no-margins">
	<c:forEach var="item" items="${content.valueList.Item}">
		<div class="${cms:lookup(cms:getListSize(content.valueList.Item), '1:col-xs-12|2:col-sm-6|3:col-sm-4|4:col-md-3 col-sm-6|5:col-md-2 col-sm-6|6:col-md-2 col-sm-4')}">
			<div class="${item.value.Style} tile">
				<h1>
					<c:if test="${item.value.Link.isSet}">
						<a href="<cms:link>${item.value.Link}</cms:link>" role="link">
					</c:if>
					${item.value.Headline}
					<c:if test="${item.value.Link.isSet}">
						</a>
					</c:if>
				</h1>
				
				<c:if test="${item.value.Text.isSet}">
					<h5>${item.value.Text}</h5>
				</c:if>
			</div>
		</div>
	</c:forEach>
	</div>
</div>


<%--
	<div class="row">
        <div class="col-12 col-md-3 header">
		  <h1 data-i18n-es="Vive la UVa" data-i18n-en="Uva's life">${content.value.Title}</h1>
        </div>
        <div class="col bloque_raya d-none d-md-block">
		  <c:if test='${value.Link.isSet and (cms.element.settings["showMoreinformation"] eq "true")}'>
			  <span class="masinformacion">
				<a href="<cms:link>${content.value.Link}</cms:link>" target="_self" role="link" alt="${content.value.Title}" aria-label="${content.value.Title}">
					<span data-i18n-es="más información" data-i18n-en="read more">más información</span> 
					<span class="flecha"><i class="fas fa-angle-right"></i></span>
				</a>
			  </span>
		  </c:if>
        </div>
      </div>
	
	<div class="row"  style="margin-top: 1.5em;">
	<c:forEach var="item" items="${content.valueList.Item}">
		<div ${item.rdfa["Link|Image"]} class="${cms:lookup(cms:getListSize(content.valueList.Item), '1:col-xs-12|2:col-sm-6|3:col-sm-4|4:col-md-3 col-sm-6|5:col-md-2 col-sm-6|6:col-md-2 col-sm-4')}">
			<div class="card">
				<c:if test="${item.value.Image.isSet}">
				<c:if test="${item.value.Link.isSet}"><a href="<cms:link>${item.value.Link}</cms:link>" role="link" alt="${item.value.Text}" aria-label="${item.value.Text}"></c:if>
					<cms:img src="${item.value.Image}" scaleColor="transparent"  scaleType="0"  cssclass="card-img-top" alt="${item.value.Text}" title="${item.value.Text}" />
					<c:if test="${item.value.Link.isSet}"></a></c:if>
				</c:if>
				<div class="card-body" style="${item.value.Style}">
					<c:if test="${item.value.Link.isSet}"><a href="<cms:link>${item.value.Link}</cms:link>" role="link"></c:if><span style="text-transform: uppercase; font-size: 1.3em;">${item.value.Text}</span><c:if test="${item.value.Link.isSet}"></a></c:if>
				</div>
			</div>
		</div>
	</c:forEach>
	</div>
--%>

</cms:formatter>
</cms:bundle>