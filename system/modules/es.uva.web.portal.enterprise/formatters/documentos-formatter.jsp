<%@page buffer="none" session="false" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<cms:formatter var="content"  val="value" rdfa="rdfa">
	<!-- DOCUMENTO -->
	<div class="container enlaceDocumento">
		<div class="row">
			<div class="col-10 offset-md-1">
				<div class="documento">
					<c:if test="${value.Fichero.exists}">
						<c:if test="${value.Fichero.isSet}">
							<a title="${value.Texto}" alt="${value.Texto}" href="<cms:link>${fn:trim(value.Link)}</cms:link>" target="_blank" aria-label="${value.Texto}" role="link">${value.Texto}</a>
						</c:if>
						<c:if test="${! value.Fichero.isSet}">
							<a alt="Por favor, edite el enlace" title="Por favor, edite el enlace"><p>Por favor, edite el enlace</p></a>
						</c:if>
					</c:if>
				</div>
			</div>
		</div>
	</div>
</cms:formatter>