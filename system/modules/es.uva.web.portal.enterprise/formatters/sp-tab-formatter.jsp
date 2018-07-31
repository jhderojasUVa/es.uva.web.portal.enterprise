<%@page buffer="none" session="false" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	String idcabecera = (String) request.getParameter("idcabecera"); if (idcabecera == null) idcabecera = "";
%>
<cms:formatter var="content" val="value">
<div>
	<c:if test="${not cms.element.settings.hidetitle}">
		<div class="title">
			<h1 ${content.rdfa.Title}>${content.value.Title}</h1>
		</div>
	</c:if>
	<div id="tabs" class="tabs">
		<c:set var="tabsid">grupotabs-${cms.container.name}_${cms.container.type}_${cms:vfs(pageContext).resource[cms.element.sitePath].structureId}</c:set>
		<c:set var="fileid">${cms:vfs(pageContext).resource[cms.element.sitePath].structureId}</c:set>
		<c:set var="idcabecera">${idcabecera}</c:set>
		<div id="${tabsid}" class="clearfix" >
			<ul class="nav nav-tabs" role="tablist">
				<c:forEach items="${content.valueList.Label}" var="tab" varStatus="status">
					<li class="nav-item">
						<a class="nav-link ${status.first? 'active':''}" href="#${cms.element.instanceId}-tab-container${status.count}" data-toggle="tab" role="tab">${tab}</a>
					</li>
				</c:forEach>
			</ul>

			<div class="tab-content" id="${cms.element.instanceId}-tab-content">
				<c:forEach var="label" items="${content.valueList.Label}" varStatus="status">
					<div id="${cms.element.instanceId}-tab-container${status.count}" role="tabpanel" class="tab-pane fade ${status.first? 'show active':''}">
						<cms:container	name="tab-container${status.count}"	type="contenedor"
							tagClass="tab-pane ${status.first? 'active':''}"
							maxElements="1">	
						</cms:container>
					</div>
				</c:forEach>
			</div>

		</div>

	</div>
</div>
</cms:formatter>