<%@ page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%><% 
%><%@ page import="java.util.*" %><% 
%><%@ page import="java.text.SimpleDateFormat,java.time.LocalDateTime,java.time.LocalDate,java.time.format.DateTimeFormatter" %><%
%><%@ page import="org.opencms.file.CmsResource" %><% 
%><%@ page import="org.opencms.file.CmsObject" %><% 
%><%@ page import="org.opencms.util.CmsUUID" %><% 
%><%@ page import="org.opencms.util.CmsStringUtil" %><% 
%><%@ page import="org.opencms.main.*" %><% 
%><%@ page import="org.opencms.jsp.*" %><% 
%><%@ page import="org.opencms.file.*" %><% 
%><%@ page import="org.opencms.file.types.*" %><% 
%><%@ page import="org.opencms.xml.*" %><% 
%><%@ page import="org.opencms.xml.content.*" %><% 
%><%@ page import="org.opencms.xml.types.*" %><% 
%><%@ page import="org.opencms.lock.*" %><% 
%><%@ page import="org.opencms.db.CmsResourceState" %><% 
%><%@ page import="org.opencms.xml.content.CmsXmlContent" %><% 
%><%@ page import="org.opencms.mail.CmsSimpleMail" %><% 
%><%@ page import="java.net.*" %><% 
%><%@ page import="java.text.DateFormat" %><% 
%><%@ page import="java.text.SimpleDateFormat" %><% 
%><%@ page import="java.util.Date" %><% 
%><%@ page import="java.io.*" %><% 
%><%@ page import="javax.net.ssl.*" %><% 
%><%@ page import="javax.json.*" %><% 
%><%@ page import="javax.servlet.jsp.*" %><%
%><%@ taglib uri = "http://java.sun.com/jsp/jstl/sql" prefix = "sql"%><%
%><%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %><%
%><%@ taglib prefix="json" uri="http://www.atg.com/taglibs/json" %><%
%><%@page import="org.json.simple.JSONObject"%><%
%><%
// Variables
String url = "http://eventos.uva.es/api/eventsearch";
String api_key = "39b0c6894ca6f7475dffa14df16f3f12";
String USER_AGENT = "Mozilla/5.0";
CmsJspActionElement jsp = new CmsJspActionElement(pageContext, request, response);
CmsObject cms = jsp.getCmsObject();

String clientOrigin = request.getHeader("origin");
//response.setHeader("Access-Control-Allow-Origin", clientOrigin);
//response.setHeader("Access-Control-Allow-Origin", "*");
//response.setHeader("Access-Control-Allow-Methods", "GET,POST");
//response.setHeader("Access-Control-Allow-Headers", "Content-Type");
//response.setHeader("Access-Control-Max-Age", "86400");

try {
	
} catch(Exception e) {
	// Ha ocurrido un error
	out.println("<strong>Atencion</strong>: Ha ocurrido un error al crear el JSON. Por favor, pruebe mas tarde<br/>");
	out.println(e.toString());
	e.printStackTrace();
}

%>
<c:catch var ="catchException">
	<sql:query var="programas" dataSource="jdbc:apache:commons:dbcp:opencms:web_uva_ATP" scope="request">
		SELECT * FROM CursosWeb
	</sql:query>
</c:catch>
<c:if test = "${catchException != null}">
	<p>The exception is : ${catchException} <br />
	There is an exception: ${catchException.message}</p>
</c:if>
<c:catch var ="catchException">
${param["callback"]}(
	<json:object>
		<json:object name="response">
		  <json:property name="numFound" value="${programas.rowCount}"/>
		  <json:array name="docs" var="item" items="${programas.rows}">
			<json:object>
				<c:forEach var='entry' items="${item}">
					<json:property name="${entry.key}" value="${entry.value}"/>
				</c:forEach>
				<json:property name="campo.tipo_prop" value="4"/>
				<json:property name="ficha.campus_prop" value="0"/>
				<json:property name="type" value="titulos"/>
			</json:object>
		  </json:array>
		</json:object>
	</json:object>
)
</c:catch>
<c:if test = "${catchException != null}">
	<p>The exception is : ${catchException} <br />
		There is an exception: ${catchException.message}</p>
</c:if>
	