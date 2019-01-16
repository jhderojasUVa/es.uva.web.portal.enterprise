<%@page buffer="none" session="false" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<cms:formatter var="content" val="value" rdfa="rdfa">
<div class="container youtube">
	<div class="row">
		<div class="col">
			<c:choose>
				<c:when test="${fn:contains(value.Video,'youtube')}">
					<c:if test="${value.Video.exists && value.Video.isSet}">
						<c:set var="cachos_url" value="${fn:substringAfter(value.Video,'v=')}" />
						<c:if test="${fn:contains(cachos_url,'list=')}">
							<c:set var="cachos_url" value="${fn:replace(cachos_url,'&list=','?list=')}" />
						</c:if>
						<iframe width="100%" height="415" src="http://www.youtube.com/embed/<c:out value='${cachos_url}'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
					</c:if>
					<c:if test="${value.Video.exists && not value.Video.isSet}">
						<iframe width="100%" height="320" src="http://www.youtube.com/embed/Bmrx8MFJl6s" frameborder="0" allowfullscreen></iframe>
					</c:if>
				</c:when>
				<c:when test="${fn:contains(value.Video,'vimeo')}">
					<c:if test="${value.Video.exists && value.Video.isSet}">
						<c:set var="cachos_url" value="${fn:substringAfter(value.Video,'vimeo.com/')}" />
						<iframe width="100%" height="415"  src="http://player.vimeo.com/video/${cachos_url}?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
					</c:if>
				</c:when>
				<c:otherwise>
					<c:if test="${value.Video.exists && not value.Video.isSet}">
						<iframe width="100%" height="320" src="http://www.youtube.com/embed/Bmrx8MFJl6s" frameborder="0" allowfullscreen></iframe>
					</c:if>
				</c:otherwise>
			</c:choose>
			
			<p class="description text-center">Duis tincidunt pretium nisl, eu facilisis ligula pretium vitae. Vivamus euismod purus id bibendum viverra.</p>
		</div>
	</div>
</div>
</cms:formatter>