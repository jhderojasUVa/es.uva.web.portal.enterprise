<%@ page contentType="application/json" pageEncoding="UTF-8"%><% 
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

	//METER NOW CON FORMATO DE HORAS MINUTSO SEGUNDOS
	LocalDateTime actual=LocalDateTime.now();
	DateTimeFormatter nowFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");
	String actualFormatted=actual.format(nowFormatter);
	
	// Creamos el proxy y la conexion
	InetSocketAddress proxyInet = new InetSocketAddress("proxy.uva.es",80);
	Proxy proxy = new Proxy(Proxy.Type.HTTP, proxyInet);
	URL obj = new URL(url);
	HttpURLConnection con = (HttpURLConnection) obj.openConnection(proxy);
	
	// Añadimos el header
	con.setRequestMethod("POST");
	con.setRequestProperty("User-Agent", USER_AGENT);
	con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
	
	//si se quiere quitar la restriccion del since...basta con borrar aquí abajo ese parametro
	String postParams = "api_key=" + api_key+"&since="+actualFormatted;
	
	// Enviamos el post
	con.setDoOutput(true);
	DataOutputStream wr = new DataOutputStream(con.getOutputStream());
	wr.writeBytes(postParams);
	wr.flush();
	wr.close();
	
	// Respuesta
	int responseCode = con.getResponseCode();
	
	BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
	String inputLine;
	StringBuffer respuesta = new StringBuffer();
	
	while ((inputLine = in.readLine()) != null) {
		respuesta.append(inputLine);
	}
	in.close();
	
	JsonReader jsonReader = Json.createReader(new StringReader(respuesta.toString()));
	JsonObject jsonObject = jsonReader.readObject();
	jsonReader.close();
	
	if (request.getParameter("callback")!=null) {
		out.print(request.getParameter("callback")+"(");
	}
	// Pintamos la respuesta
	out.print(jsonObject);
	if (request.getParameter("callback")!=null) {
		out.print(")");
	}
	out.flush();
	
} catch(Exception e) {
	// Ha ocurrido un error
	out.println("<strong>Atencion</strong>: Ha ocurrido un error al crear el JSON. Por favor, pruebe mas tarde<br/>");
	out.println(e.toString());
	e.printStackTrace();
}

%>