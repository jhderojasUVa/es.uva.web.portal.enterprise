<%@page buffer="none" session="false" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<cms:formatter var="content" val="value" rdfa="rdfa">

<div class="container imagen">
	<div class="row">
		<div class="col-12 ">
			<c:if test="${value.Image.exists}">
				<c:if test="${value.Image ==''}">
					<img class="img-fluid" src="<cms:link>/system/modules/es.uva.web.portal.uva/resources/uva/img/300x300.png</cms:link>" alt="Edita el texto alternativo de la imagen" title="Edita la imagen" border="0"/>
				</c:if>
				<c:if test="${value.Image !=''}">
					<c:if test="${(value.Link.exists) && (value.Link.value.Target == '1' || value.Link.value.Target == 'Nueva ventana')}">
						<a href="<cms:link>${fn:trim(value.Link.value.Link)}</cms:link>" target="_blank">
							<cms:img  src="${value.Image}">
								<cms:param name="border">0</cms:param>
								<cms:param name="alt">${value.Alt}</cms:param>
								<cms:param name="title">${value.Alt}</cms:param>
								<cms:param name="class">img-fluid</cms:param>
								<cms:param name="role">img</cms:param>
								<cms:param name="border">0</cms:param>
								<cms:param name="aria-label">${value.Alt}</cms:param>
							</cms:img>
						</a>
					</c:if>
					<c:if test="${(value.Link.exists) && (value.Link.value.Target == '2' || value.Link.value.Target == 'Misma ventana')}">
						<a href="<cms:link>${fn:trim(value.Link.value.Link)}</cms:link>" target="_self">
							<cms:img  src="${value.Image}">
								<cms:param name="border">0</cms:param>
								<cms:param name="alt">${value.Alt}</cms:param>
								<cms:param name="title">${value.Alt}</cms:param>
								<cms:param name="class">img-fluid</cms:param>
								<cms:param name="role">img</cms:param>
								<cms:param name="border">0</cms:param>
								<cms:param name="aria-label">${value.Alt}</cms:param>
							</cms:img>
						</a>
					</c:if>
					<c:if test="${!value.Link.exists}">
						<cms:img  src="${value.Image}">
							<cms:param name="border">0</cms:param>
							<cms:param name="alt">${value.Alt}</cms:param>
							<cms:param name="title">${value.Alt}</cms:param>
							<cms:param name="class">img-fluid</cms:param>
							<cms:param name="role">img</cms:param>
							<cms:param name="border">0</cms:param>
							<cms:param name="aria-label">${value.Alt}</cms:param>
						</cms:img>
					</c:if>
				</c:if>
			</c:if>
		</div>
	</div>
</div>
</cms:formatter>