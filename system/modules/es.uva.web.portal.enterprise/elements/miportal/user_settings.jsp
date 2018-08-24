<%@page trimDirectiveWhitespaces="true" buffer="none" session="false" taglibs="c,cms,sql,fn,fmt" contentType="application/json"  %><%
%><%@page import="java.io.*" %><%
%><%@page import = "java.util.logging.Logger" %><%
%><%@page import="org.opencms.main.*" %><%
%><%@page import="org.opencms.file.*" %><%
%><%@page import="org.opencms.jsp.*" %><%
%><%@page import="org.opencms.db.*" %><%
%><%@page import="org.json.simple.*" %><%
%><%@page import="org.json.simple.parser.*" %><%
%><%!
public String doGet(CmsObject cmso){
	CmsUserSettings settings = new CmsUserSettings(cmso);
	String preferences=settings.getAdditionalPreference("INTRANET_settings",true);
	JSONParser parser = new JSONParser();
	//JSONObject json = (JSONObject) parser.parse(preferences);
	return preferences;
}

public String doPost(CmsObject cmso,JSONObject json){
	String preferences="{}";
	try {
		CmsUserSettings settings = new CmsUserSettings(cmso);
		preferences=settings.getAdditionalPreference("INTRANET_settings",true);
		settings.setAdditionalPreference("INTRANET_settings",json.toString());
		settings.save(cmso);
	} catch (CmsException e) {
		e.printStackTrace();
	}
	return preferences;
}
%><%
Logger logger = Logger.getLogger(this.getClass().getName());
CmsJspActionElement cms = new CmsJspActionElement(pageContext, request, response);
response.setHeader("Access-Control-Allow-Origin","*");
response.setCharacterEncoding("UTF-8");
response.setContentType("application/json");
CmsObject cmso = cms.getCmsObject();
CmsUserSettings settings = new CmsUserSettings(cmso);
String method = request.getMethod();
String res="";
if (method.equals("GET")) {
    res=doGet(cmso);
	//JSONParser parser = new JSONParser();
	//JSONObject json = (JSONObject) parser.parse(res);
	JSONObject obj = new JSONObject();
    obj.put("msg", "Ok");
    obj.put("error", new Integer(0));
	obj.put("value",res);
	try {
		out.println(obj.toJSONString());
	} catch (IOException e) {
		e.printStackTrace();
	}
} else if (method.equals("POST")) {
	// NO FUNCIONA request.getParameter
	BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
	String line = null;
	String param="";
	while ((line = reader.readLine()) != null) {
		System.out.println(line);
		param=param+line;
	}
	JSONObject obj = new JSONObject();
    obj.put("msg", "Ok");
    obj.put("error", new Integer(0));
	obj.put("value",param);
	
	try {
		JSONParser parser = new JSONParser();
		JSONObject json = (JSONObject) parser.parse(param);
		obj.put("json",json);
		doPost(cmso,json);
		out.println(obj.toJSONString());
	} catch (IOException e) {
		e.printStackTrace();
	} 
} else if (method.equals("PUT")) {
	//doPut(req, resp);  
}
/*
	settings.setAdditionalPreference("kk","de la vaca");
	settings.setAdditionalPreference("INTRANET_settings",json.toString());
	//Guardo las preferencias
	settings.save(cmso);
	
	preference=settings.getAdditionalPreference("kk",true);
	out.println("<p>PREFERENCE NEW</p>");
	out.println(preference);
	preference=settings.getAdditionalPreference("INTRANET_settings",true);
	out.println("<p>PREFERENCE NEW</p>");
	out.println(preference);
*/
%>