<%@page trimDirectiveWhitespaces="true" buffer="none" session="false" taglibs="c,cms,fn,fmt,json" %>
<%@ taglib prefix="json" uri="http://www.atg.com/taglibs/json" %>
<%@page import="java.util.Locale, org.opencms.i18n.CmsLocaleManager, org.opencms.jsp.*, org.opencms.relations.*,org.opencms.json.*,es.uva.web.portal.esduva.*, es.uva.web.portal.intranet.ws.*, org.opencms.xml.containerpage.*,org.opencms.xml.content.*, javax.xml.transform.*,org.dom4j.*,org.dom4j.io.*, org.opencms.xml.*,java.util.*,org.opencms.xml.content.*, org.opencms.xml.types.*,org.opencms.util.*,org.opencms.search.fields.*, org.opencms.search.solr.*, org.opencms.main.*, org.opencms.file.*, org.opencms.search.*" %>
<%@page contentType="application/json" %>
<%
   	response.setContentType("application/json");
   	response.setHeader("Content-Disposition", "inline");
	final CmsLocaleManager clm;
	
	CmsJspActionElement bean = new CmsJspActionElement(pageContext, request, response);
	CmsObject cms = bean.getCmsObject();
	CmsCategoryService m_cs = CmsCategoryService.getInstance();
	Locale locale = request.getLocale();
	clm=OpenCms.getLocaleManager();
	java.util.List<java.util.Locale> locales=clm.getAvailableLocales();
	pageContext.setAttribute("locales", locales);
%>

	<c:set var="currentpage"><cms:info property="opencms.request.uri"/></c:set>
	<c:set var="navStartLevel" ><cms:property name="NavStartLevel" file="search" default="1" /></c:set>
	<c:set var="carpetaPadre" value="" />
	<json:array name="locales" var="local" items="${locales}">
		<json:object>
			<json:property name="locale" value="${local}"/>
			<cms:navigation type="forFolder" startLevel="1" endLevel="2" var="nav1" resource="/" locale="${local}"/>
			<json:array name="elements" var="elem" items="${nav1.items}">
				<json:object>
					<json:property name="id" value="${elem.resource.getResourceId()}"/>
					<json:property name="title" value="${elem.title}"/>
					<json:property name="description" value="${elem.description}"/>
					<json:property name="info" value="${elem.info}"/>
					<json:property name="navText" value="${fn:replace(elem.navText,'\"','\\\"')}"/>

					<json:property name="navLevel" value="${elem.navigationLevel}"/>
					<json:property name="navPos" value="${elem.navPosition}"/>
					<json:property name="navTree" value="${elem.navTreeLevel}"/>
					<json:property name="innavigation" value="${elem.inNavigation}"/>
					<c:set var="link"><cms:link>${elem.resourceName}</cms:link></c:set>
					<json:property name="href" value="${link}"/>
					<%-- SEGUNDO NIVEL --%>
					<cms:navigation type="forFolder" resource="${elem.resourceName}" var="nav2" />
					<json:array name="elements" var="elem" items="${nav2.items}">
						<json:object>
							<json:property name="id" value="${elem.resource.getResourceId()}"/>
							<json:property name="title" value="${elem.title}"/>
							<json:property name="navText" value="${fn:replace(elem.navText,'\"','\\\"')}"/>
							<json:property name="navLevel" value="${elem.navigationLevel}"/>
							<json:property name="navTree" value="${elem.navTreeLevel}"/>
							<c:set var="link"><cms:link>${elem.resourceName}</cms:link></c:set>
							<json:property name="href" value="${link}"/>
							<%-- TERCER NIVEL --%>
							<cms:navigation type="forFolder" resource="${elem.resourceName}" var="nav3" />
							<json:array name="elements" var="elem" items="${nav3.items}">
								<json:object>
									<json:property name="id" value="${elem.resource.getResourceId()}"/>
									<json:property name="title" value="${elem.title}"/>
									<json:property name="navText" value="${fn:replace(elem.navText,'\"','\\\"')}"/>
									<json:property name="navLevel" value="${elem.navigationLevel}"/>
									<json:property name="navTree" value="${elem.navTreeLevel}"/>
									<c:set var="link"><cms:link>${elem.resourceName}</cms:link></c:set>
									<json:property name="href" value="${link}"/>
									<%-- CUARTO NIVEL --%>
									<cms:navigation type="forFolder" resource="${elem.resourceName}" var="nav4" />
									<json:array name="elements" var="elem" items="${nav4.items}">
										<json:object>
											<json:property name="id" value="${elem.resource.getResourceId()}"/>
											<json:property name="title" value="${elem.title}"/>
											<json:property name="navText" value="${fn:replace(elem.navText,'\"','\\\"')}"/>
											<json:property name="navLevel" value="${elem.navigationLevel}"/>
											<json:property name="navTree" value="${elem.navTreeLevel}"/>
											<c:set var="link"><cms:link>${elem.resourceName}</cms:link></c:set>
											<json:property name="href" value="${link}"/>
											<%-- QUINTO NIVEL --%>
											<cms:navigation type="forFolder" resource="${elem.resourceName}" var="nav5" />
											<json:array name="elements" var="elem" items="${nav5.items}">
												<json:object>
													<json:property name="id" value="${elem.resource.getResourceId()}"/>
													<json:property name="title" value="${elem.title}"/>
													<json:property name="navText" value="${fn:replace(elem.navText,'\"','\\\"')}"/>
													<json:property name="navLevel" value="${elem.navigationLevel}"/>
													<json:property name="navTree" value="${elem.navTreeLevel}"/>
													<c:set var="link"><cms:link>${elem.resourceName}</cms:link></c:set>
													<json:property name="href" value="${link}"/>
													<%-- SEXTO NIVEL --%>
													<cms:navigation type="forFolder" resource="${elem.resourceName}" var="nav6" />
													<json:array name="elements" var="elem" items="${nav6.items}">
														<json:object>
															<json:property name="id" value="${elem.resource.getResourceId()}"/>
															<json:property name="title" value="${elem.title}"/>
															<json:property name="navText" value="${fn:replace(elem.navText,'\"','\\\"')}"/>
															<json:property name="navLevel" value="${elem.navigationLevel}"/>
															<json:property name="navTree" value="${elem.navTreeLevel}"/>
															<c:set var="link"><cms:link>${elem.resourceName}</cms:link></c:set>
															<json:property name="href" value="${link}"/>
															<%-- SEPTIMO NIVEL --%>
															<cms:navigation type="forFolder" resource="${elem.resourceName}" var="nav7" />
															<json:array name="elements" var="elem" items="${nav7.items}">
																<json:object>
																	<json:property name="id" value="${elem.resource.getResourceId()}"/>
																	<json:property name="title" value="${elem.title}"/>
																	<json:property name="navText" value="${fn:replace(elem.navText,'\"','\\\"')}"/>
																	<json:property name="navLevel" value="${elem.navigationLevel}"/>
																	<json:property name="navTree" value="${elem.navTreeLevel}"/>
																	<c:set var="link"><cms:link>${elem.resourceName}</cms:link></c:set>
																	<json:property name="href" value="${link}"/>
																	<%-- OCTAVO NIVEL --%>
																	<cms:navigation type="forFolder" resource="${elem.resourceName}" var="nav8" />
																	<json:array name="elements" var="elem" items="${nav8.items}">
																		<json:object>
																			<json:property name="id" value="${elem.resource.getResourceId()}"/>
																			<json:property name="title" value="${elem.title}"/>
																			<json:property name="navText" value="${fn:replace(elem.navText,'\"','\\\"')}"/>
																			<json:property name="navLevel" value="${elem.navigationLevel}"/>
																			<json:property name="navTree" value="${elem.navTreeLevel}"/>
																			<c:set var="link"><cms:link>${elem.resourceName}</cms:link></c:set>
																			<json:property name="href" value="${link}"/>
																			<%-- NOVENO NIVEL --%>
																		</json:object>
																	</json:array>
																</json:object>
															</json:array>
														</json:object>
													</json:array>
												</json:object>
											</json:array>
										</json:object>
									</json:array>
								</json:object>
							</json:array>
						</json:object>
					</json:array>
				</json:object>
			</json:array>
		</json:object>
	</json:array>


