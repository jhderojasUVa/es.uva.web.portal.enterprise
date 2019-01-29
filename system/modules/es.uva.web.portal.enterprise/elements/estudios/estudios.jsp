<%@ page session="false" import="org.apache.solr.client.solrj.SolrQuery.*,org.apache.solr.common.util.*,java.util.Locale,org.opencms.jsp.*, org.opencms.relations.*,org.opencms.json.*,org.opencms.xml.containerpage.*,org.opencms.xml.content.*, javax.xml.transform.*,org.dom4j.*,org.dom4j.io.*, org.opencms.xml.*,java.util.*,org.opencms.xml.content.*, org.opencms.xml.types.*,org.opencms.util.*,org.opencms.search.fields.*, org.opencms.search.solr.*, org.opencms.main.*, org.opencms.file.*, org.opencms.search.*" %>
<%@page contentType="application/json" %>
<%
	String clientOrigin = request.getHeader("origin");
	//response.setHeader("Access-Control-Allow-Origin", clientOrigin);
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Methods", "GET,POST");
	response.setHeader("Access-Control-Allow-Headers", "Content-Type");
	response.setHeader("Access-Control-Max-Age", "86400");
	
   	response.setContentType("application/json");
   	response.setHeader("Content-Disposition", "inline");

	
// Create a JSP action element
CmsJspActionElement bean = new CmsJspActionElement(pageContext, request, response);
CmsObject cms = bean.getCmsObject();
CmsCategoryService m_cs = CmsCategoryService.getInstance();

//Locale locale = request.getLocale();
//Locale locale=new Locale("es");


//Almacenará los resultados de la búsqueda
Set<CmsResource> result = new HashSet<CmsResource>();
CmsSolrIndex index = OpenCms.getSearchManager().getIndexSolr("Solr Online");
CmsSolrQuery squery = new CmsSolrQuery();
/*
if (cms.getRequestContext().getCurrentUser().isGuestUser()) {
	JSONObject qele = new JSONObject();
	out.println(res);
	return;
}
*/
JSONObject res = new JSONObject();

squery.setResourceTypes(new String[]{"estudios"});
squery.setSearchRoots(new String[]{"/sites/uva/"});
squery.setRows(Integer.valueOf(2000));
Map<String, ORDER> orders = new LinkedHashMap<String, ORDER>();
//orders.put("lastmodified", ORDER.desc);
orders.put("Title_exact", ORDER.asc);
squery.addSortFieldOrders(orders);

//JSONObject qele = new JSONObject();
//qele.put("query", squery.toString());
//res.put((Object)qele);

try {
	//Recorro los container obtenidos
	CmsSolrResultList results = index.search(cms, squery);
	
	JSONObject root = new JSONObject();
	long num=results.getNumFound();
	root.put("numFound",(Object)num);
	//docs
	JSONArray docs = new JSONArray();
	for (CmsSearchResource sr : results) {
		JSONObject ele = new JSONObject();
		ele.put("id", (Object)sr.getField("id"));
		ele.put("title", (Object)sr.getField("Title_prop"));
		ele.put("link", (Object)sr.getField("link"));
		ele.put("path", (Object)sr.getField("path"));
		ele.put("type", "estudios");
			
		if (sr.getField("campo.tipo_prop")!= null && !sr.getField("campo.tipo_prop").isEmpty()) {
			ele.put("campo.tipo_prop", (Object)sr.getField("campo.tipo_prop"));
		}
		if (sr.getField("ficha.centro_prop")!= null && !sr.getField("ficha.centro_prop").isEmpty()) {
			ele.put("ficha.centro_prop", (Object)sr.getField("ficha.centro_prop"));
		}
		if (sr.getField("ficha.campus_prop")!= null && !sr.getField("ficha.campus_prop").isEmpty()) {
			ele.put("ficha.campus_prop", (Object)sr.getField("ficha.campus_prop"));
		}
		if (sr.getField("ficha.codigoplan_prop")!= null && !sr.getField("ficha.codigoplan_prop").isEmpty()) {
			ele.put("ficha.codigoplan_prop", (Object)sr.getField("ficha.codigoplan_prop"));
		}
		if (sr.getField("ficha.rama_prop")!= null && !sr.getField("ficha.rama_prop").isEmpty()) {
			ele.put("ficha.rama_prop", (Object)sr.getField("ficha.rama_prop"));
		}
		if (sr.getField("ficha.tipolearning_prop")!= null && !sr.getField("ficha.tipolearning_prop").isEmpty()) {
			ele.put("ficha.tipolearning_pro", (Object)sr.getField("ficha.tipolearning_prop"));
		}
		
		//LOCALES
		java.util.List<java.lang.String> elelocales= (java.util.List)sr.getMultivaluedField("res_locales");
		Iterator<String> iter = elelocales.iterator();
		JSONArray reslocales = new JSONArray();
		while (iter.hasNext()) {
			String texto = iter.next();
			JSONObject localeele = new JSONObject();
			localeele.put("id", (Object)texto);
			localeele.put("title", (Object)sr.getField("Titulo_"+texto));
			reslocales.put(localeele);
		}
		ele.put("locales", reslocales);
		
		docs.put((Object)ele);
	}
	root.put("docs",docs);
	res.put("response",root);
	out.println(res);
}
catch (CmsSearchException e) {
	e.printStackTrace();
}

%>