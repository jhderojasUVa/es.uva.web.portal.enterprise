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
%><%@ page import="java.io.*" %><% 
%><%@ page import="javax.net.ssl.*" %><% 
%><%@ page import="javax.json.*" %><% 
%><%@ page import="javax.servlet.jsp.*" %><% 
%><%@ page import="org.opencms.search.solr.*" %><% 
%><%@ page import="org.opencms.search.*" %><% 
%><%@ page import="org.opencms.search.fields.*" %><% 
%><%
// Variables
String url = "http://eventos.uva.es/api/eventsearch";
String api_key = "39b0c6894ca6f7475dffa14df16f3f12";
String USER_AGENT = "Mozilla/5.0";
CmsJspActionElement jsp = new CmsJspActionElement(pageContext, request, response);
CmsObject cms = jsp.getCmsObject();
	  
try {
/*
	CmsSolrIndex index = OpenCms.getSearchManager().getIndexSolr("Solr Offline");
	//rows=3&fq=campo.tipo_prop:(*1*)&fq=type:noticias&sort=released%20desc&fq=parent-folders:/sites/comunicacion&wt=json
	Map parameters = new HashMap<String,String>();
	//parameters.put("parent-folders","/sites/comunicacion/");
	//parameters.put("rows","3");
	CmsSolrQuery squery = new CmsSolrQuery(cms, parameters);
	//List<CmsResource> results = index.search(cms, squery);
	CmsSolrResultList results = index.search(cms, squery);
*/	
	out.print("<h1>CONSULTA 2</h1>");
	String query="index=Solr Offline&fq=campo.tipo_prop:(*1*)&sort=released desc&fq=parent-folders:/sites/comunicacion";
	out.print("<h2>");
	out.print(query);
	out.print("</h2>");
	CmsSolrResultList results = OpenCms.getSearchManager().getIndexSolr("Solr Offline").search(cms, query);
	for (CmsSearchResource sResource : results) {
		String id = sResource.getField(CmsSearchField.FIELD_ID);
	   String path = sResource.getField(CmsSearchField.FIELD_PATH);
	   String link = sResource.getField(CmsSearchField.FIELD_LINK);
	   //Date date =sResource.getMultivaluedField(CmsSearchField.FIELD_DATE_LASTMODIFIED);
	   List<String> cats =  sResource.getMultivaluedField(CmsSearchField.FIELD_CATEGORY);
	   out.print("<p>RECURSO</p>");
	   out.print(id);
	   out.print(path);
	   List<String> campos =  sResource.getDocument().getFieldNames();
	   for (String txt : campos) {
	   	 out.print(txt);
		 out.print("<br>");
		}
		
		CmsResource resourceViaPath = cms.readResource(path);
		CmsUUID sid = CmsUUID.valueOf(id);
		CmsResource resourceViaId = cms.readResource(sid);
		/** Get the resource type */
			I_CmsResourceType resType = OpenCms.getResourceManager().getResourceType(r.getTypeId());

			/** If the resource is of type structured content (a.k.a. xmlcontent) */
			if (resType instanceof CmsResourceTypeXmlContent) {
				out.println("<h3>This file is of type " + resType.getTypeName() + " - an XML file, instance of CmsResourceTypeXmlContent</h3>");
				out.println("<h4>Available paths in the XML file</h4>");

				/** Read the structured content (a.k.a. xmlcontent) file programmatically */
				CmsXmlContent resourceDocument = CmsXmlContentFactory.unmarshal(cmso, cmso.readFile(r));

				/** Get all element names for the given locale */
				List elementNames = resourceDocument.getNames(locale);
				Iterator elementNamesItr = elementNames.iterator();
				String elementName = null;

				out.println("<ul>");
				/** Print all the retrieved element names and their values */
				while (elementNamesItr.hasNext()) {
					out.print("<li>");
					elementName = (String)elementNamesItr.next();
					out.print(elementName);
					try {
						I_CmsXmlContentValue elementValue = resourceDocument.getValue(elementName, locale);
						out.println("\t- Value:\t" + CmsStringUtil.escapeHtml(elementValue.getStringValue(cmso)));
					} catch (Exception e) {
						out.print("\t- No value:\t" + e.getMessage().substring(0, 40));
					}
					out.print("</li>");
				}
				out.println("</ul>");
			}
	}
	
} catch(Exception e) {
	// Ha ocurrido un error
	out.println("<strong>Atencion</strong>: Ha ocurrido un error al crear el JSON. Por favor, pruebe mas tarde<br/>");
	out.println(e.toString());
	e.printStackTrace();
}

%>