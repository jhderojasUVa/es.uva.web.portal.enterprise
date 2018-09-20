<%@page buffer="none" session="false" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<fmt:setLocale value="${cms.locale}" />
<cms:bundle basename="es.uva.web.portal.enterprise.destacado">
<cms:formatter var="content" val="value" rdfa="rdfa">

	<div class="container destacado" style="margin-top: 70px; margin-bottom: 70px;">
		<div class="row">
			<div class="col-12 col-md-4 header">
			  <h1 data-i18n-es="${content.value.Title}" data-i18n-en="Links">${content.value.Title}</h1>
			</div>
			<div class="col bloque_raya d-none d-md-block">
			</div>
      	</div>
	  
		<div class="row destadocontent" style="margin-top: 1em;">
		<c:forEach var="item" items="${content.valueList.Item}">
			<div ${item.rdfa["Link|Image"]} class="${cms:lookup(cms:getListSize(content.valueList.Item), '1:col-xs-12|2:col-sm-6|3:col-sm-4|4:col-md-3 col-sm-6|5:col-md-2 col-sm-6|6:col-md-2 col-sm-4')}">
				<div class="text-center">
					<c:if test="${item.value.Link.isSet}"><a class="" href="<cms:link>${item.value.Link}</cms:link>" role="link" alt="${item.value.Headline}" aria-label="${item.value.Headline}"></c:if>
						${item.value.Headline}
					<c:if test="${item.value.Link.isSet}"></a></c:if>
				</div>
			</div>
		</c:forEach>
		</div>
	</div>
<%--
<div class="container margin-15-bottom">
	<c:if test="${not cms.element.settings.hidetitle}">
		<div class="headline"><h2 ${rdfa.Title}>${value.Title}--${cms.element.settings.destacado}</h2></div>
	</c:if>
	<c:if test="${cms.element.settings.hidetitle}">
		<div class="hide" ><h2 ${rdfa.Title}>${value.Title}</h2></div>
	</c:if>

	<div class="row">
		<c:forEach var="item" items="${content.valueList.Item}">
			<div ${item.rdfa["Link|Image"]} class="${cms:lookup(cms:getListSize(content.valueList.Item), '1:col-xs-12|2:col-sm-6|3:col-sm-4|4:col-md-3 col-sm-6|5:col-md-2 col-sm-6|6:col-md-2 col-sm-4')}">				
            	<div class="thumbnails thumbnail-style thumbnail-kenburn">
           	 		<c:if test="${item.value.Image.isSet}"><div class="thumbnail-img">
            			<div class="overflow-hidden">
							<c:if test="${item.value.Link.isSet}"><a class="btn-more hover-effect" href="<cms:link>${item.value.Link}</cms:link>" role="link"></c:if>
							<figure>
								<cms:img src="${item.value.Image}" scaleColor="transparent"  scaleType="0"  cssclass="img-fluid" alt="" title="" />
										
								
								<c:if test="${item.value.Headline.isSet}">
									<c:if test="${not cms.element.settings.hidefoot}">
										<figcaption >${item.value.Headline}</figcaption>
									</c:if>
									<c:if test="${cms.element.settings.hidefoot}">
										<figcaption class="hide">${item.value.Headline}</figcaption>
									</c:if>
								</c:if>
							</figure>
							<c:if test="${item.value.Link.isSet}"></a></c:if>
						</div>
               			<!-- <c:if test="${item.value.Link.isSet}"><a class="btn-more hover-effect" href="<cms:link>${item.value.Link}</cms:link>" role="link"><fmt:message key="imagen.readmore" /></a></c:if> -->
					</div></c:if>
					
					<c:if test="${!item.value.Image.isSet}">
						<div>
						<c:if test="${item.value.Link.isSet}"><a class="" href="<cms:link>${item.value.Link}</cms:link>" role="link"></c:if>
							${item.value.Headline}
						<c:if test="${item.value.Link.isSet}"></a></c:if>	
						</div>
					</c:if>
					
				</div>
			</div>
		</c:forEach>	
	</div>
</div>
--%>
</cms:formatter>
</cms:bundle>