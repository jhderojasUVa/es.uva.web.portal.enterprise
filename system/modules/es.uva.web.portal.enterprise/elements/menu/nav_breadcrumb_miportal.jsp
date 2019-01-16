<%@page trimDirectiveWhitespaces="true" buffer="none" session="false" %>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:set var="navStartFolder" value="${(empty param.startfolder) ? '/' : param.startfolder}" />
<c:set var="navStartLevel" value="${(empty param.startlevel) ? 1 : param.startlevel}" /> 
<c:set var="navPos" value="${(empty param.position) ? 'top' : param.position}" />  
<c:set var="slevel">${navStartLevel +1}</c:set>
<c:if test="${slevel < 1}"><c:set var="slevel" value="1"/></c:if>
<cms:navigation type="breadCrumb" startLevel="${slevel -1}" endLevel="-1"  var="nav" param="true" />
<div class="row">
  <div class="col-12">
	<ul class="pull-left breadcrumb" >
		<li itemscope itemtype="http://data-vocabulary.org/Breadcrumb" ><a href="<cms:link>/</cms:link>">Inicio</a></li>
		<c:forEach items="${nav.items}" var="elem" varStatus="status">
			<c:if test="${status.last}">
				<c:set var="navText">${elem.navText}</c:set>
				<c:set var="elemento" value="${elem.resourceName}index.html"/>
				<c:if test="${cms:vfs(pageContext).exists[elemento]}" >
					<%-- 
					<li itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><a href="<cms:link>${elem.resourceName}</cms:link>" itemprop="url" role="link" aria-label="${navText}"><span itemprop="title">${navText}</span></a></li>
					--%>
					<li itemscope itemtype="http://data-vocabulary.org/Breadcrumb"><span itemprop="title">${navText}</span></li>
					
				</c:if>
				<c:if test="${not cms:vfs(pageContext).exists[elemento]}" >
					<c:if test="${empty navText or fn:contains(navText, '??? NavText')}">
					<li itemscope itemtype="http://data-vocabulary.org/Breadcrumb" aria-label="${elem.title}"><span itemprop="title">${elem.title}</span></li>
					</c:if>
					<c:if test="${!empty navText}">
					<li itemscope itemtype="http://data-vocabulary.org/Breadcrumb" aria-label="${elem.title}"><span itemprop="title">${navText}</span></li>
					</c:if>
				</c:if>
			</c:if>
		</c:forEach>
	</ul>
  </div>
</div>