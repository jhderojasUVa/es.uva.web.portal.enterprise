package es.uva.web.portal.intranet.ws;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;
import java.util.Locale;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;

import org.apache.commons.logging.Log;
import org.apache.solr.client.solrj.SolrQuery;
import org.opencms.file.CmsFile;
import org.opencms.file.CmsObject;
import org.opencms.file.CmsProperty;
import org.opencms.file.CmsRequestContext;
import org.opencms.file.CmsResource;
import org.opencms.file.CmsResourceFilter;
import org.opencms.file.CmsUser;
import org.opencms.json.JSONArray;
import org.opencms.json.JSONException;
import org.opencms.json.JSONObject;
import org.opencms.main.CmsException;
import org.opencms.main.CmsLog;
import org.opencms.main.OpenCms;
import org.opencms.relations.CmsCategory;
import org.opencms.relations.CmsCategoryService;
import org.opencms.search.*;
import org.opencms.search.fields.CmsSearchField;
import org.opencms.search.solr.CmsSolrIndex;
import org.opencms.search.solr.CmsSolrQuery;
import org.opencms.search.solr.CmsSolrResultList;
import org.opencms.util.CmsUUID;
import org.opencms.xml.content.CmsXmlContent;
import org.opencms.xml.content.CmsXmlContentFactory;
import org.opencms.xml.types.I_CmsXmlContentValue;

public class IntranetWS {
    private CmsObject m_cms;
    private static final Log LOG = CmsLog.getLog(IntranetWS.class);
    private CmsCategoryService m_cs = CmsCategoryService.getInstance();
    
    private final String ldapAdServer = "ldap://192.168.21.24:389";
    private final String ldapSearchBase = "ou=personal,dc=uva,dc=es";
    
    private final String ldapUsername = "uid=web_perfil,ou=personal,dc=uva,dc=es";
    private final String ldapPassword = "Ny0h0T36";
    
    protected Hashtable<String, Object> env;
    protected LdapContext ctx ;
    
    JSONArray m_res = new JSONArray();

    public IntranetWS(CmsObject cms) {
        this.m_cms = cms;
    }
    
    public IntranetWS() {
    }

    public String getPerfiles() throws CmsException, JSONException {
    	JSONArray res=this.getPerfilesJson();
    	return res.toString();
    }
    
    public JSONArray getPerfilesJson() throws CmsException, JSONException {
        JSONArray res = new JSONArray();
        LOG.debug((Object)"--> getPerfiles");
        CmsUser user = this.m_cms.getRequestContext().getCurrentUser();
        if (this.m_cms.getRequestContext().getCurrentUser().isGuestUser()) {
            LOG.debug((Object)"--- getPerfiles GEST USER");
            return res;
        }
        String usuario = user.getName();
        LOG.debug((Object)("--- getPerfiles USER " + usuario));
        CmsResourceFilter filter = CmsResourceFilter.DEFAULT_FOLDERS.addRequireVisible().addRequireFolder();
        List<CmsResource> lr = this.m_cms.getResourcesInFolder("/", filter);
        for (CmsResource r : lr) {
            r.getRootPath();
            String title = this.m_cms.readPropertyObject(r, "Title", false).getValue();
            String navtext = this.m_cms.readPropertyObject(r, "NavText", false).getValue();
            if (title == null || navtext == null || title.length() <= 0 || navtext.length() <= 0) continue;
            JSONObject ele = new JSONObject();
            ele.put("title", (Object)this.m_cms.readPropertyObject(r, "Title", false).getValue());
            ele.put("NavText", (Object)this.m_cms.readPropertyObject(r, "NavText", false).getValue());
            ele.put("Path", (Object)r.getRootPath());
            LOG.debug((Object)("--- getPerfiles ele " + r.getRootPath()));
            res.put((Object)ele);
        }
        return res;
    }

    public String getContenidos() throws CmsException, JSONException {
        JSONArray res = new JSONArray();
        CmsSolrIndex index = OpenCms.getSearchManager().getIndexSolr("Solr Online");
        CmsSolrQuery squery = new CmsSolrQuery();
        if (this.m_cms.getRequestContext().getCurrentUser().isGuestUser()) {
            LOG.debug((Object)"--- getContenidos GEST USER");
            return res.toString();
        }
        squery.setResourceTypes(new String[]{"containerpage"});
        squery.setSearchRoots(new String[]{"/sites/miportal/"});
        squery.setRows(Integer.valueOf(2000));
        ArrayList entries = new ArrayList();
        try {
            CmsSolrResultList results = index.search(this.m_cms, squery);
            for (CmsSearchResource sr : results) {
                JSONObject ele = new JSONObject();
                ele.put("titulo", (Object)sr.getField("Title_prop"));
                ele.put("link", (Object)OpenCms.getLinkManager().getServerLink(this.m_cms, sr.getRootPath()));
                JSONArray cat = new JSONArray();
                List<CmsCategory> lc = this.m_cs.readResourceCategories(this.m_cms, (CmsResource)sr);
                for (CmsCategory c : lc) {
                    JSONObject elec = new JSONObject();
                    elec.put("titulo", (Object)c.getName());
                    elec.put("path", (Object)c.getPath());
                    LOG.debug((Object)("--- getContenidos ele " + c.getRootPath()));
                    cat.put((Object)elec);
                }
                ele.put("contenidos", (Object)cat);
                res.put((Object)ele);
            }
        }
        catch (CmsSearchException e) {
            e.printStackTrace();
        }
        catch (JSONException e) {
            e.printStackTrace();
        }
        return res.toString();
    }

    public String getCategorias() throws CmsException, JSONException {
    	LOG.debug("--> getCategorias PUBLIC");
        return this.getCategorias("/sites/miportal/").toString();
    }
    
    private JSONArray getCategorias(String path) throws CmsException, JSONException {
    	LOG.debug("--> getCategorias PRIVATE PATH "+path);
        JSONArray res = new JSONArray();
        //Todas las categorias de OPencms
        //List<CmsCategory> lc = this.m_cs.readCategories(this.m_cms, "/", false, path);
        List<String> repositories=new ArrayList<String>();
    	repositories.add(path);
    	//Solo las categorias de la carpeta
    	List<CmsCategory> lc = m_cs.readCategoriesForRepositories(this.m_cms, "/", false,repositories);
        LOG.debug("--- getCategorias size "+lc.size());
        for (CmsCategory c : lc) {
            JSONObject ele = getCategoria(c);
            res.put(ele);
        }
        return res;
    }
    
    /**
     * Obtiene las categorias de un recurso de OpenCms
     * @param r
     * @return JSONArray con las categorias
     * @throws CmsException
     * @throws JSONException
     */
    private JSONArray getCategorias(CmsResource r) throws CmsException, JSONException {
    	LOG.debug("--> getCategorias Resource PATH "+r.getRootPath());
        JSONArray res = new JSONArray();
        //Todas las categorias de OPencms
        //List<CmsCategory> lc = this.m_cs.readCategories(this.m_cms, "/", false, path);
        //List<String> repositories=new ArrayList<String>();
    	//repositories.add(r.getRootPath().replace("/sites/miportal", ""));
    	//Para coger las generales
    	//repositories.add("/system/categories/");
    	//Solo las categorias de la carpeta
        m_cs.repairRelations(this.m_cms, r);
    	List<CmsCategory> lc = m_cs.readResourceCategories(this.m_cms, r);
        LOG.debug("--- getCategorias size "+lc.size());
        for (CmsCategory c : lc) {
            JSONObject ele = getCategoria(c);
            res.put(ele);
        }
        LOG.debug("--- getCategorias Resource "+r.getRootPath()+" "+res.toString());
        return res;
    }
    
    private JSONObject getCategoria(CmsCategory category) throws CmsException, JSONException  {
    	JSONObject ele = new JSONObject();
        ele.put("Title", category.getTitle());
        ele.put("Path", category.getPath());
        ele.put("Name", category.getName());
        return ele;
    }
    
    public String getRecursos() {
    	JSONArray perfiles= new JSONArray();
    	JSONArray clasificacion= new JSONArray();
    	JSONArray categorias= new JSONArray();
    	JSONArray recursos = new JSONArray();
    	JSONArray carpetas = new JSONArray();
    	try {
	        LOG.debug((Object)"--> getRecursos");
	        CmsUser user = this.m_cms.getRequestContext().getCurrentUser();
	        if (this.m_cms.getRequestContext().getCurrentUser().isGuestUser()) {
	            LOG.debug((Object)"--- getRecursos GEST USER");
	            return "{}";
	        }
	        String usuario = user.getName();
	        LOG.debug((Object)("--- getRecursos USER " + usuario));
	        carpetas=this.getCarpetas("/", true);
	        for(int i = 0; i < carpetas.length(); i++)
	    	{
	    		LOG.debug("--- carpeta  " +carpetas.getJSONObject(i).toString());
	    		String path=carpetas.getJSONObject(i).getString("Path");
	    		//Contruimos el path relativo
	        	String subpath=path.replace("/sites/miportal", "");
	    		//Filtro para los recursos
	        	CmsResourceFilter filter = CmsResourceFilter.DEFAULT_FILES.addRequireVisible().addRequireFile();
	        	//Buscamos os recursos dentro de la carpeta
	    	    for (CmsResource cr : this.m_cms.getResourcesInFolder(subpath, filter)) {
	    	    	String cr_path=cr.getRootPath().replace("/sites/miportal", "");
	    	    	LOG.debug("--- contenido " + cr_path);
	    	    	//Comprobamos que no sea una carpeta oculta
	    	    	if (cr_path.contains(".content")||cr_path.contains("_imagenes")||cr_path.contains("_documentos")) {
	    	       	 	LOG.debug("--- contenido OCULTO " + cr_path);
	    	       	 	continue;
	    	        }
	    	    	//Obtenemos el recurso de la carpeta y sus propiedades
	    	    	CmsResource r=this.m_cms.readResource(cr_path,filter);
	    	    	String title = this.m_cms.readPropertyObject(r, "Title", false).getValue();
	    		    String navtext = this.m_cms.readPropertyObject(r, "NavText", false).getValue();
	    		    String navpos = this.m_cms.readPropertyObject(r, "NavPos", false).getValue();
	    		    String navpath = r.getRootPath();
	    		    if (title == null || navtext == null || navpos == null || title.length() <= 0 || navtext.length() <= 0 || navpos.length() <= 0 ) {
	    	        	LOG.debug("--- CONTENIDO SIN Title, NavText o NavPos " + cr_path);
	    	        	continue;
	    	        }
	    		    String icon = this.m_cms.readPropertyObject(r, "icon", false).getValue();
	    		    String iconclass = this.m_cms.readPropertyObject(r, "icon_class", false).getValue();
	    		    JSONObject ele = new JSONObject();
	    	        ele.put("Title", title);
	    	        ele.put("NavText", navtext);
	    	        ele.put("NavPos",navpos);
	    	        ele.put("Path", navpath);
	    	        if (icon != null && !icon.isEmpty()) ele.put("Icon",icon);
	    	        if (iconclass != null && !iconclass.isEmpty()) ele.put("Iconclass",iconclass);
	    	        //Sus categorias
	    	        categorias=this.getCategorias(r);
	    	        ele.put("Categories", categorias);
	    	        perfiles=new JSONArray();
	    	        clasificacion=new JSONArray();
	    	        for(int j = 0; j < categorias.length(); j++)
	    	    	{
	    	        	JSONObject c = categorias.getJSONObject(j);
	    	        	String cat_path=c.getString("Path");
	    	        	
	    	        	if (cat_path.startsWith("box_clasificacion/")) {
	    	        		cat_path=cat_path.replace("box_clasificacion/", "");
	    	        		if (cat_path.length()>0) clasificacion.put(c);
	    	        	} else if (cat_path.startsWith("perfiles/")) {
	    	        		cat_path=cat_path.replace("perfiles/", "");
	    	        		if (cat_path.length()>0) perfiles.put(c);
	    	        	}
	    	    	}
	    	        ele.put("Clasificacion",clasificacion);
	    	        ele.put("Perfiles",perfiles);
	    	        //Link
	    	        ele.put("Link", OpenCms.getLinkManager().getServerLink(m_cms, navpath));
	    	        //Su carpeta padre (Que define el perfil)
	    	        String parent=cr.getRootPath().replace("/sites/miportal", "");
	    	        if (parent.startsWith("/")) parent=parent.substring(1);
	    	        if (parent.indexOf("/")>0) {
	    	        	parent=parent.substring(0, parent.indexOf("/"));
	    	        }
	    	        String codePerfil=parent.substring(0,parent.indexOf("."));
	    	        String namePerfil=parent.substring(parent.indexOf(".")+1);
	    	        ele.put("PerfilCode",codePerfil);
	    	        ele.put("PerfilName",namePerfil);
	    	        recursos.put(ele);
	    	    }
	    	}
	        return recursos.toString();
        } catch (CmsException e) {
        	LOG.error("--- getRecursos CmsException " +e.getMessage());
        	e.printStackTrace();
        } catch (JSONException e) {
        	LOG.error("--- getRecursos JSONException " +e.getMessage());
        	e.printStackTrace();
        }
    	return "{}";
    }
    
    public JSONArray getCarpetas(String path, boolean checkProperties) throws CmsException, JSONException {
    	LOG.debug("--- getCarpetas path " +path);
    	JSONArray carpetas = new JSONArray();
    	JSONObject recurso = new JSONObject();
    	//Filtro para las carpetas
    	CmsResourceFilter filter = CmsResourceFilter.DEFAULT_FOLDERS.addRequireVisible().addRequireFolder();
    	//Contruimos el path relativo
    	String subpath=path.replace("/sites/miportal", "");
    	//Comprobamos que no sea una carpeta oculta
    	if (subpath.contains(".content")||subpath.contains("_imagenes")||subpath.contains("_documentos")) {
       	 	LOG.debug("--- getRecursosCarpeta CARPETA OCULTA " + path);
       	 	return carpetas;
        }
    	//Obtenemos el recurso de la carpeta y sus propiedades
    	CmsResource r=this.m_cms.readResource(subpath,filter);
    	String title = this.m_cms.readPropertyObject(r, "Title", false).getValue();
	    String navtext = this.m_cms.readPropertyObject(r, "NavText", false).getValue();
	    String navpos = this.m_cms.readPropertyObject(r, "NavPos", false).getValue();
	    String navpath = r.getRootPath();
	    if (checkProperties) {
        	if (title == null || navtext == null || navpos == null || title.length() <= 0 || navtext.length() <= 0 || navpos.length() <= 0 ) {
        		LOG.debug("--- getRecursosCarpeta CARPETA SIN Title, NavText o NavPos " + path);
        		return carpetas;
        	}
        }
	    //Establecemos el recurso
	    JSONObject ele = new JSONObject();
        ele.put("title", title);
        ele.put("NavText", navtext);
        ele.put("NavPos",navpos);
        ele.put("Path", navpath);
        carpetas.put(ele);
	    //Buscamos las carpetas de dentro
	    for (CmsResource cr : this.m_cms.getResourcesInFolder(subpath, filter)) {
	    	subpath=cr.getRootPath().replace("/sites/miportal", "");
	    	JSONArray subcarpetas=getCarpetas(subpath,checkProperties);
	    	for(int i = 0; i < subcarpetas.length(); i++)
	    	{
	    		LOG.debug("--- getCarpetas subcarpetas  " +subcarpetas.toString());
	    	      JSONObject objects = subcarpetas.getJSONObject(i);
	    	      carpetas.put(objects);
	    	}
	    }
    	return carpetas;
    }
    
    public JSONObject getRecursosCarpeta(CmsResourceFilter filter,String path, boolean checkProperties) throws CmsException, JSONException {
    	//LOG.debug("--- getRecursosCarpeta path " +path);
    	String subpath=path.replace("/sites/miportal", "");
    	//LOG.debug("--- getRecursosCarpeta subpath " +subpath);
    	JSONObject recurso = new JSONObject();
    	JSONArray recursos = new JSONArray();
    	if (subpath.contains(".content")||subpath.contains("_imagenes")||subpath.contains("_documentos")) {
       	 	//LOG.debug("--- getRecursosCarpeta CARPETA OCULTA " + path);
       	 	return recurso;
        }
    	CmsResource rec=this.m_cms.readResource(subpath,filter);
    	String title = this.m_cms.readPropertyObject(rec, "Title", false).getValue();
	    String navtext = this.m_cms.readPropertyObject(rec, "NavText", false).getValue();
	    String navpos = this.m_cms.readPropertyObject(rec, "NavPos", false).getValue();
	    if (checkProperties) {
        	if (title == null || navtext == null || navpos == null || title.length() <= 0 || navtext.length() <= 0 || navpos.length() <= 0 ) return recurso;
        }
	    recurso.put("title", title);
	    recurso.put("NavText", navtext);
	    recurso.put("NavPos", navpos);
	    recurso.put("Path", rec.getRootPath());
    	
	    for (CmsResource r : this.m_cms.getResourcesInFolder(subpath, filter)) {
	    	subpath=r.getRootPath().replace("/sites/miportal", "");
	    	//Comprobamos que no es una carpeta oculta
	    	if (subpath.contains(".content")||subpath.contains("_imagenes")||subpath.contains("_documentos")) {
	       	 	continue;
	        }
	        title = this.m_cms.readPropertyObject(r, "Title", false).getValue();
	        navtext = this.m_cms.readPropertyObject(r, "NavText", false).getValue();
	        navpos = this.m_cms.readPropertyObject(r, "NavPos", false).getValue();
	        //LOG.debug("--- getRecursosCarpeta  title " +title+" path " +r.getRootPath()+" navtext " +navtext+" navpos "+navpos);
	        //if (title == null || navtext == null || title.length() <= 0 || navtext.length() <= 0) continue;
	        if (checkProperties) {
	        	if (title == null || navtext == null || navpos == null || title.length() <= 0 || navtext.length() <= 0 || navpos.length() <= 0 ) continue;
	        }
	        JSONObject ele = new JSONObject();
	        ele.put("title", this.m_cms.readPropertyObject(r, "Title", false).getValue());
	        ele.put("NavText", this.m_cms.readPropertyObject(r, "NavText", false).getValue());
	        ele.put("NavPos", this.m_cms.readPropertyObject(r, "NavPos", false).getValue());
	        ele.put("Path", r.getRootPath());
	        subpath=r.getRootPath().replace("/sites/miportal", "");
	        //LOG.debug("--- getRecursosCarpeta ele " + r.getRootPath());
	        JSONArray folders=new JSONArray();;
		    for (CmsResource rf: this.m_cms.getSubFolders(subpath, filter)) {
		    	 //LOG.debug("--- getRecursosCarpeta subfolder " + rf.getRootPath());
		    	JSONObject elemento=this.getRecursosCarpeta(filter,rf.getRootPath(),true);
		    	if (elemento.toString().equals("{}")) {
		    	} else {
		    		folders.put(elemento);
		    	}
		    	//LOG.debug("--- getRecursosCarpeta elements " + folders.toString());
		    	//ele.put("folders",folders);
		    }
		    if (folders.length()>0) ele.put("folders",folders);
		    LOG.debug("--- getRecursosCarpeta  title " +title+" path " +r.getRootPath()+" navtext " +navtext+" navpos "+navpos);
		    LOG.debug("--- elements "+ele.toString());
		    LOG.debug("--- recursos "+recursos.toString());
	        recursos.put(ele);
        }
	    if (recursos.length()>0) recurso.put("folders",recursos);
	    return recurso;
    }
    
    public String getAvisos() throws CmsException, JSONException {
        JSONArray res = new JSONArray();
        Locale locale=new Locale("es");
        CmsSolrIndex index = OpenCms.getSearchManager().getIndexSolr("Solr Online");
        CmsSolrQuery squery = new CmsSolrQuery();
        if (this.m_cms.getRequestContext().getCurrentUser().isGuestUser()) {
            LOG.debug((Object)"--- getAvisos GUEST USER");
            return res.toString();
        }
        LOG.debug((Object)"--- getAvisos USER AUTENTICADO");
        squery.setResourceTypes(new String[]{"en-aviso"});
        squery.setSearchRoots(new String[]{"/sites/miportal/"});
        squery.setRows(Integer.valueOf(2000));
        try {
            CmsSolrResultList results = index.search(this.m_cms, squery);
            for (CmsSearchResource sr : results) {
                JSONObject ele = new JSONObject();
                I_CmsSearchDocument doc=(I_CmsSearchDocument)sr.getDocument();
        		//out.println("<br>"+doc.getType());
        		//out.println("<br>"+doc.getPath());
        		/*
        		java.util.List<java.lang.String> nombres=doc.getFieldNames();
        		for (int i = 0; i < nombres.size(); i++)
        		{
        			out.print("<br>el: " +nombres.get(i));
        		}
        		*/
        		java.lang.Object midoc=doc.getDocument();
        		//out.println("<br>LOCALE: " +locale);
        		//out.println("<br>"+midoc);
        		//out.println("<br>"+cms.readPropertyObject(sr, "Title", false).getValue());
        		//out.println("<br>"+doc.getFieldValueAsString("Title"));
        		
        		//Obtengo el recurso
        		String id=doc.getFieldValueAsString(CmsSearchField.FIELD_ID);
        		CmsUUID cid=new CmsUUID(id);
        		//out.println("<br>"+id);
        		CmsResource resource = this.m_cms.readResource(cid);
        		//result.add(resource);
        		CmsFile file = this.m_cms.readFile(resource);
        		CmsXmlContent xmlContent = CmsXmlContentFactory.unmarshal(this.m_cms, file);
        		List elementNames = xmlContent.getNames(locale);
        		/*
        		for (int i = 0; i < elementNames.size(); i++)
        		{
        			out.println("<br>el: " +elementNames.get(i));
        		}
        		*/
        		I_CmsXmlContentValue  value=xmlContent.getValue("Title", locale);
        		/*
        		out.println("<br>TITULO: "+value);
        		if (value!=null) {
        			out.println("<br>TITULO: "+value.getPath());
        			out.println("<br>TITULO: "+value.getStringValue(cms));
        		}
        		*/
                
                ele.put("titulo", doc.getFieldValueAsString("Title"));
                ele.put("texto", doc.getFieldValueAsString("Text"));
                ele.put("link",  doc.getFieldValueAsString("Link"));

                res.put((Object)ele);
            }
        }
        catch (CmsSearchException e) {
            e.printStackTrace();
        }
        catch (JSONException e) {
            e.printStackTrace();
        }
        return res.toString();
    }
    
    /**
     * LDAP
     * @throws NamingException
     */
    
    public void connect() throws NamingException  {
    	env = new Hashtable<String, Object>();
        env.put(Context.SECURITY_AUTHENTICATION, "simple");
        if(ldapUsername != null) {
            env.put(Context.SECURITY_PRINCIPAL, ldapUsername);
        }
        if(ldapPassword != null) {
            env.put(Context.SECURITY_CREDENTIALS, ldapPassword);
        }
        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
        env.put(Context.PROVIDER_URL, ldapAdServer);
        env.put("java.naming.ldap.attributes.binary", "objectSID");
        
        try {
        	ctx = new InitialLdapContext(env, null);
        } catch (javax.naming.AuthenticationException e) {
			System.err.println("ERROR DE AUTENTICACION");
			System.err.println(e.getMessage());
			return;
		}
    }
    
    public void disconnect() throws NamingException {
    	this.ctx.close();
    }
    
    public NamingEnumeration<SearchResult> search(String base,String searchFilter) throws NamingException  {
    	SearchControls searchControls = new SearchControls();
        searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);
        return  this.ctx.search(base, searchFilter, searchControls);
    }
    
    protected Object getAttribute(Attributes atributos, String name) throws JSONException, NamingException {
    	if (atributos.get(name)!=null) {
    		int num=atributos.get(name).size();
    		if (num==1) {
    			return atributos.get(name).get();
    		} else if (num>1) {
	    		NamingEnumeration campos=atributos.get(name).getAll();
	    		JSONArray jsoncampos=new JSONArray();
	    		while (campos.hasMoreElements())
	    		{
        		   Object element=campos.nextElement();
                   jsoncampos.put(element);
	    		}
	    		return jsoncampos;
    		}
    	} else {
    	}
    	return null;
    }
    
    protected Object getColectivos(Attributes atributos) throws NamingException, JSONException {
    	Object objetos=this.getAttribute(atributos, "uvacolectivos");
    	if (objetos==null) return objetos;
    	if (objetos.getClass()==JSONArray.class) {
    		JSONArray objetosarray=(JSONArray)objetos;
     	   	for (int i=0; i<objetosarray.length();i++) {
     		   Object objeto=objetosarray.get(i);
     		   objetosarray.put(i, searchColectivo(objeto));
     	   	}
     	   	return objetosarray;
    	} else if (objetos.getClass()==String.class) {
    	   JSONArray objetosarray=new JSONArray();
		   JSONObject objetores=(JSONObject)searchColectivo(objetos);
		   objetosarray.put(objetores);
		   return objetosarray;
    	}
 	   	return objetos;
    }
    
    protected Object getColectivosCaducidad(Attributes atributos) throws NamingException, JSONException {
    	Object objetos=this.getAttribute(atributos, "uvafechacaducidadcol");
    	if (objetos==null) return objetos;
    	if (objetos.getClass()==JSONArray.class) {
    		JSONArray objetosarray=(JSONArray)objetos;
     	   	for (int i=0; i<objetosarray.length();i++) {
     		   Object objeto=objetosarray.get(i);
     		   String str=objeto.toString();
     		   String[] parts=str.split(":");
	   		   String stridobj=parts[0];
	   		   String strfecha=parts[1];
	   		   JSONObject objetores=(JSONObject)searchColectivo(stridobj);
     		   objetores.put("fecha", strfecha);
     		   objetores.put("col", stridobj);
     		   objetosarray.put(i, objetores);
     	   	}
     	   	return objetosarray;
    	} else if (objetos.getClass()==String.class) {
    		JSONArray objetosarray=new JSONArray();
    		String str=objetos.toString();
  		   String[] parts=str.split(":");
   		   String stridobj=parts[0];
   		   String strfecha=parts[1];
   		   JSONObject objetores=(JSONObject)searchColectivo(stridobj);
   		   objetores.put("fecha", strfecha);
   		   objetores.put("col", stridobj);
   		   objetosarray.put(objetores);
		   return objetosarray;
    	}
 	   	return objetos;
    }
    
    protected Object getCentro(Attributes atributos,String campo) throws NamingException, JSONException {
    	Object objetos=this.getAttribute(atributos, campo);
    	if (objetos==null) return objetos;
    	if (objetos.getClass()==JSONArray.class) {
    		JSONArray objetosarray=(JSONArray)objetos;
     	   	for (int i=0; i<objetosarray.length();i++) {
     		   Object objeto=objetosarray.get(i);
     		   objetosarray.put(i, searchCentro(objeto));
     	   	}
     	   	return objetosarray;
    	} else if (objetos.getClass()==String.class) {
    		JSONObject objetores=(JSONObject)searchCentro(objetos);
    		return objetores;
    	}
 	   	return objetos;
    }
    
    protected Object getEdificio(Attributes atributos,String campo) throws NamingException, JSONException {
    	Object objetos=this.getAttribute(atributos, campo);
    	if (objetos==null) return objetos;
    	if (objetos.getClass()==JSONArray.class) {
    		JSONArray objetosarray=(JSONArray)objetos;
     	   	for (int i=0; i<objetosarray.length();i++) {
     		   Object objeto=objetosarray.get(i);
     		   objetosarray.put(i, searchEdificio(objeto));
     	   	}
     	   	return objetosarray;
    	} else if (objetos.getClass()==String.class) {
    		JSONObject objetores=(JSONObject)searchEdificio(objetos);
    		return objetores;
    	}
 	   	return objetos;
    }
    
    protected Object getCentroPlanCurso(Attributes atributos, String campo) throws NamingException, JSONException {
    	Object objetos=this.getAttribute(atributos, campo);
    	if (objetos==null) return objetos;
    	if (objetos.getClass()==JSONArray.class) {
    		JSONArray objetosarray=(JSONArray)objetos;
     	   	for (int i=0; i<objetosarray.length();i++) {
     		   Object objeto=objetosarray.get(i);
     		   String str=objetos.toString();
     		   String[] parts=str.split(":");
     		   	String stridcentro=parts[0];
     		   	String stridplan=parts[1];
     		   	String stridcurso=parts[2];
     		   	//objetores.put("fecha", strfecha);
     		   	Object centro=searchCentro(stridcentro);
     		   	Object plan=searchPlan(stridplan);
     		   	JSONObject objetores=new JSONObject();
     		   	objetores.put("centro", centro);
     			objetores.put("plan", plan);
     			objetores.put("curso", stridcurso);
     		    objetosarray.put(i, objetores);
     	   	}
     	   	return objetosarray;
    	} else if (objetos.getClass()==String.class) {
    		String str=objetos.toString();
    		String[] parts=str.split(":");
   		   	String stridcentro=parts[0];
   		   	String stridplan=parts[1];
   		   	String stridcurso=parts[2];
   		   	//objetores.put("fecha", strfecha);
   		   	Object centro=searchCentro(stridcentro);
   		   	Object plan=searchPlan(stridplan);
   		   	JSONObject objetores=new JSONObject();
   		   	objetores.put("centro", centro);
   			objetores.put("plan", plan);
   			objetores.put("curso", stridcurso);
   		   	return objetores;
    	}
 	   	return objetos;
    }
    
    protected Object getDepartamento(Attributes atributos,String campo) throws NamingException, JSONException {
    	Object objetos=this.getAttribute(atributos, campo);
    	if (objetos==null) return objetos;
    	if (objetos.getClass()==JSONArray.class) {
    		JSONArray objetosarray=(JSONArray)objetos;
     	   	for (int i=0; i<objetosarray.length();i++) {
     		   Object objeto=objetosarray.get(i);
     		   objetosarray.put(i, searchDepartamento(objeto));
     	   	}
     	   	return objetosarray;
    	} else if (objetos.getClass()==String.class) {
    		JSONObject objetores=(JSONObject)searchDepartamento(objetos);
    		return objetores;
    	}
 	   	return objetos;
    }
    
    protected Object getCuerpoDocente(Attributes atributos,String campo) throws NamingException, JSONException {
    	Object objetos=this.getAttribute(atributos, campo);
    	if (objetos==null) return objetos;
    	if (objetos.getClass()==JSONArray.class) {
    		JSONArray objetosarray=(JSONArray)objetos;
     	   	for (int i=0; i<objetosarray.length();i++) {
     		   Object objeto=objetosarray.get(i);
     		   objetosarray.put(i, searchCuerpoDocente(objeto));
     	   	}
     	   	return objetosarray;
    	} else if (objetos.getClass()==String.class) {
    		JSONObject objetores=(JSONObject)searchCuerpoDocente(objetos);
    		return objetores;
    	}
 	   	return objetos;
    }
    
    protected Object getProgramaDoctorado(Attributes atributos,String campo) throws NamingException, JSONException {
    	Object objetos=this.getAttribute(atributos, campo);
    	if (objetos==null) return objetos;
    	if (objetos.getClass()==JSONArray.class) {
    		JSONArray objetosarray=(JSONArray)objetos;
     	   	for (int i=0; i<objetosarray.length();i++) {
     		   Object objeto=objetosarray.get(i);
     		   objetosarray.put(i, searchProgramaDoctorado(objeto));
     	   	}
     	   	return objetosarray;
    	} else if (objetos.getClass()==String.class) {
    		JSONObject objetores=(JSONObject)searchProgramaDoctorado(objetos);
    		return objetores;
    	}
 	   	return objetos;
    }

    protected Object getTPedCur(Attributes atributos, String campo) throws NamingException, JSONException {
    	Object objetos=this.getAttribute(atributos, campo);
    	if (objetos==null) return objetos;
    	if (objetos.getClass()==JSONArray.class) {
    		JSONArray objetosarray=(JSONArray)objetos;
     	   	for (int i=0; i<objetosarray.length();i++) {
     		   Object objeto=objetosarray.get(i);
     		   String str=objetos.toString();
     		  String[] parts=str.split(":");
  		   		String stridtitulo=parts[0];
  		   		String stridedicion=parts[1];
  		   		String stridcurso=parts[2];
     		   	//objetores.put("fecha", strfecha);
     		   Object titulo=searchTituloPropio(stridtitulo);
	   		   	JSONObject objetores=new JSONObject();
	   		   	objetores.put("titulopropio", titulo);
	   			objetores.put("edicion", stridedicion);
	   			objetores.put("curso", stridcurso);
     		    objetosarray.put(i, objetores);
     	   	}
     	   	return objetosarray;
    	} else if (objetos.getClass()==String.class) {  	
   		 	String str=objetos.toString();
   		 	String[] parts=str.split(":");
		   	String stridtitulo=parts[0];
		   	String stridedicion=parts[1];
		   	String stridcurso=parts[2];
		   	//objetores.put("fecha", strfecha);
		   	Object titulo=searchTituloPropio(stridtitulo);
		   	JSONObject objetores=new JSONObject();
		   	objetores.put("titulopropio", titulo);
			objetores.put("edicion", stridedicion);
			objetores.put("curso", stridcurso);
		   	return objetores;
    	}
 	   	return objetos;
    }
    
    protected Object getDatosTarjeta(Attributes atributos, String campo) throws NamingException, JSONException {
    	Object objetos=this.getAttribute(atributos, campo);
    	if (objetos==null) return objetos;
    	if (objetos.getClass()==JSONArray.class) {
    		JSONArray objetosarray=(JSONArray)objetos;
     	   	for (int i=0; i<objetosarray.length();i++) {
     		   Object objeto=objetosarray.get(i);
     		   String str=objetos.toString();
     		 	String[] parts=str.split(":");
     		 	String stridcod=parts[0];
	  		   	String stridcentro=parts[1];
	  		   	String striddpto=parts[2];
	  		   	String stridplan=parts[3];
	  		   	String stridcurso=parts[4];
	  		   	//objetores.put("fecha", strfecha);
	  		   	Object centro=searchCentro(stridcentro);
	  		   	Object departamento=searchDepartamento(striddpto);
	  		   	Object plan=searchPlan(stridplan);
	  		   	
	  		   	JSONObject objetores=new JSONObject();
	  		   	objetores.put("centro", centro);
	  			objetores.put("departamento", departamento);
	  			objetores.put("plan", plan);
	  			objetores.put("curso", stridcurso);
     		    objetosarray.put(i, objetores);
     	   	}
     	   	return objetosarray;
    	} else if (objetos.getClass()==String.class) {  	
   		 	String str=objetos.toString();
   		 	String[] parts=str.split(":");
   		 	String stridcod=parts[0];
		   	String stridcentro=parts[1];
		   	String striddpto=parts[2];
		   	String stridplan=parts[3];
		   	String stridcurso=parts[4];
		   	//objetores.put("fecha", strfecha);
		   	Object centro=searchCentro(stridcentro);
		   	Object departamento=searchDepartamento(striddpto);
		   	Object plan=searchPlan(stridplan);
		   	
		   	JSONObject objetores=new JSONObject();
		   	objetores.put("centro", centro);
			objetores.put("departamento", departamento);
			objetores.put("plan", plan);
			objetores.put("curso", stridcurso);
		   	return objetores;
    	}
 	   	return objetos;
    }
    
    protected Object getInstituto(Attributes atributos,String campo) throws NamingException, JSONException {
    	Object objetos=this.getAttribute(atributos, campo);
    	if (objetos==null) return objetos;
    	if (objetos.getClass()==JSONArray.class) {
    		JSONArray objetosarray=(JSONArray)objetos;
     	   	for (int i=0; i<objetosarray.length();i++) {
     		   Object objeto=objetosarray.get(i);
     		   objetosarray.put(i, searchInstituto(objeto));
     	   	}
     	   	return objetosarray;
    	} else if (objetos.getClass()==String.class) {
    		JSONObject objetores=(JSONObject)searchInstituto(objetos);
    		return objetores;
    	}
 	   	return objetos;
    }
    
    protected Object getAreaBachillerato(Attributes atributos,String campo) throws NamingException, JSONException {
    	Object objetos=this.getAttribute(atributos, campo);
    	if (objetos==null) return objetos;
    	if (objetos.getClass()==JSONArray.class) {
    		JSONArray objetosarray=(JSONArray)objetos;
     	   	for (int i=0; i<objetosarray.length();i++) {
     		   Object objeto=objetosarray.get(i);
     		   objetosarray.put(i, searchAreaBachillerato(objeto));
     	   	}
     	   	return objetosarray;
    	} else if (objetos.getClass()==String.class) {
    		JSONObject objetores=(JSONObject)searchAreaBachillerato(objetos);
    		return objetores;
    	}
 	   	return objetos;
    }
    
    protected Object getCampus(Attributes atributos,String campo) throws NamingException, JSONException {
    	Object objetos=this.getAttribute(atributos, campo);
    	if (objetos==null) return objetos;
    	if (objetos.getClass()==JSONArray.class) {
    		JSONArray objetosarray=(JSONArray)objetos;
     	   	for (int i=0; i<objetosarray.length();i++) {
     		   Object objeto=objetosarray.get(i);
     		   objetosarray.put(i, searchCampus(objeto));
     	   	}
     	   	return objetosarray;
    	} else if (objetos.getClass()==String.class) {
    		JSONObject objetores=(JSONObject)searchCampus(objetos);
    		return objetores;
    	}
 	   	return objetos;
    }
    
    protected Object getCorreoOficial(String uid, Attributes atributos,String campo) throws NamingException, JSONException {
    	Object objetos=this.getAttribute(atributos, campo);
    	JSONArray objetosarray=new JSONArray();
    	JSONObject objetores=new JSONObject();
    	if (objetos==null) return objetos;
    	if (objetos.getClass()==JSONArray.class) {
    		objetosarray=(JSONArray)objetos;
     	   	for (int i=0; i<objetosarray.length();i++) {
     		  objetores=new JSONObject();
     		  objetores.put("dominio", objetos);
     		  objetosarray.put(i, objetores);
     	   	}
    	} else if (objetos.getClass()==String.class) {
		   objetores=new JSONObject();
		   objetores.put("dominio", objetos);
		   objetosarray.put(objetores);
    	}
    	//Tenemos el array de dominios
    	for (int i=0; i< objetosarray.length(); i++) {
    		objetores=objetosarray.getJSONObject(i);
    		String dominio=(String)objetores.get("dominio");
    		String base="uid="+dominio+",ou=correo,dc=uva,dc=es";
    		Object datos=searchInTree( uid, base, false);
    		objetores.put("correo", datos);
    		objetosarray.put(i, objetores);
    	}
    	
 	   	return objetosarray;
    }
    
    protected Object searchColectivo( Object col) throws JSONException, NamingException {
    	return searchInTree(col,"ou=colectivos,dc=uva,dc=es",true);
    }
    
    protected Object searchCentro( Object centro) throws JSONException, NamingException {
    	return searchInTree(centro,"ou=centros,dc=uva,dc=es",false);
    }
    
    protected Object searchEdificio( Object edificio) throws JSONException, NamingException {
    	return searchInTree(edificio,"ou=edificios,dc=uva,dc=es",false);
    }
    
    protected Object searchPlan( Object plan) throws JSONException, NamingException {
    	return searchInTree(plan,"ou=planes,dc=uva,dc=es",false);
    }
    
    protected Object searchDepartamento( Object departamento) throws JSONException, NamingException {
    	return searchInTree(departamento,"ou=departamentos,dc=uva,dc=es",true);
    }
    
    protected Object searchCuerpoDocente( Object cuerpodocente) throws JSONException, NamingException {
    	return searchInTree(cuerpodocente,"ou=cuerposdocentes,dc=uva,dc=es",false);
    }
    
    protected Object searchProgramaDoctorado( Object cuerpodocente) throws JSONException, NamingException {
    	return searchInTree(cuerpodocente,"ou=programasdoctorado,dc=uva,dc=es",false);
    }
    
    protected Object searchTituloPropio( Object titulopropio) throws JSONException, NamingException {
    	return searchInTree(titulopropio,"ou=titulospropios,dc=uva,dc=es",false);
    }
    
    protected Object searchInstituto( Object instituto) throws JSONException, NamingException {
    	return searchInTree(instituto,"ou=institutos,dc=uva,dc=es",false);
    }
    
    protected Object searchAreaBachillerato( Object area) throws JSONException, NamingException {
    	return searchInTree(area,"ou=areasbachillerato,dc=uva,dc=es",false);
    }
    
    protected Object searchCampus( Object campus) throws JSONException, NamingException {
    	return searchInTree(campus,"ou=campus,dc=uva,dc=es",false);
    }
    
    protected Object searchInTree( Object obj, String tree, boolean entero) throws JSONException, NamingException {
    	Object campoid,uid;
    	campoid=obj;
    	uid=obj;
    	try {
    		if (entero) {
	    		uid=Integer.parseInt(obj.toString());
	    		int val=(int)uid;
	    		campoid=uid;
	        	if (val<0) campoid=val*(-1);
    		}
    	} catch (java.lang.NumberFormatException e) {
    		//NO es integer
    	}
    	
    	
    	String searchFilter = "(&(uid="+campoid+"))";
    	JSONObject ele=new JSONObject();
    	NamingEnumeration<SearchResult> results=this.search(tree,searchFilter);
    	SearchResult resultado = null;
        if(results.hasMoreElements()) {
        	resultado = (SearchResult) results.nextElement();
           if(results.hasMoreElements()) {
               System.err.println("Matched multiple users for the accountName: " +campoid);
               return ele;
           }
           // TODOS LOS ATRIBUOS
           Attributes atributos=resultado.getAttributes();
           try {
        	   NamingEnumeration res=atributos.getAll();
               while (res.hasMoreElements())
               {
        		   Attribute attr = (Attribute) res.nextElement();
        		   ele.put(attr.getID(),this.getAttribute(atributos, attr.getID()));
               }
           } catch (JSONException e) {
        	   System.err.println(e);
           } catch (Exception e) {
        	   System.err.println(e);
           } finally {
        	   
           }
        }
        return ele;
    }
    
    protected JSONObject searchPerson(String uid) throws NamingException  {
    	String searchFilter = "(&(uid="+uid+"))";
        JSONObject ele=new JSONObject();
    	NamingEnumeration<SearchResult> results=this.search("ou=personal,dc=uva,dc=es",searchFilter);
    	SearchResult resultado = null;
        if(results.hasMoreElements()) {
        	resultado = (SearchResult) results.nextElement();
           if(results.hasMoreElements()) {
               System.err.println("Matched multiple users for the accountName: " +uid);
               return ele;
           }
           
           // TODOS LOS ATRIBUOS
           Attributes atributos=resultado.getAttributes();
           /*
           NamingEnumeration res=searchResult.getAttributes().getAll();
           while (res.hasMoreElements())
           {
    		   Attribute attr = (Attribute) res.nextElement();
    		   System.out.println("ATRIBUTO "+attr.getID()+" "+attr.size());
    		   for (int i=0; i < attr.size(); i++)
               {
                   if (i > 0) System.out.print(", ");
                   System.out.println(attr.get(i));
               }
           }
           */
           
           try {
        
        	   //Datos personales
        	   ele.put("uid",this.getAttribute(atributos, "uid"));
        	   ele.put("nif",this.getAttribute(atributos, "uvanif"));
        	   ele.put("pais",this.getAttribute(atributos, "uvapais"));
        	   ele.put("name",this.getAttribute(atributos, "givenname"));
        	   ele.put("sn1",this.getAttribute(atributos, "sn1"));
        	   ele.put("sn2",this.getAttribute(atributos, "sn2"));
        	   ele.put("genero",this.getAttribute(atributos, "uvagenero"));
        	   ele.put("fechanacimiento",this.getAttribute(atributos, "uvafechanacimiento"));
        	   //ele.put("jpegphoto",this.getAttribute(atributos, "jpegphoto"));
        	   if (atributos.get("jpegphoto")!=null && atributos.get("jpegphoto").size()>0) {
        		   byte[] jpegphoto64=(byte[]) atributos.get("jpegphoto").get(0);
        		   ele.put("jpegphoto",org.apache.commons.codec.binary.Base64.encodeBase64String(jpegphoto64));
        	   }
        	   //DATOS CONTACTO
        	   ele.put("telephonenumber",this.getAttribute(atributos, "telephonenumber"));
        	   ele.put("mail",this.getAttribute(atributos, "mail"));
        	   ele.put("correonooficial",this.getAttribute(atributos, "uvacorreonooficial"));
        	   
        	   //DATOS CORREO OFICIAL
        	   ele.put("uvaaliascorreo",this.getAttribute(atributos, "uvaaliascorreo"));
        	   ele.put("mailforwardingaddress",this.getAttribute(atributos, "mailforwardingaddress"));
        	   ele.put("uvafechacaducidad",this.getAttribute(atributos, "uvafechacaducidad"));
        	   
        	   ele.put("correooficial",getCorreoOficial(uid,atributos, "uvadominiocorreo"));
        	   
        	   //DATOS SERVICIO
        	   ele.put("deportes",this.getAttribute(atributos, "uvadeportes"));
        	   ele.put("piscina",this.getAttribute(atributos, "uvapiscina"));
        	   ele.put("aparcamientos",this.getAttribute(atributos, "uvaaparcamientos"));
        	   ele.put("wifi",this.getAttribute(atributos, "uvawifi"));
        	   //COLECTIVOS
        	   ele.put("colectivos",getColectivos(atributos));
        	   //COLECTIVOS CON FECHA DE CADUCIDAD
        	   //this.getAttribute(atributos, "uvafechacaducidadcol");
        	   ele.put("fechacaducidadcol",getColectivosCaducidad(atributos));
        	   
        	   
        	   //SEGUN EL COLECTIVO
        	   JSONObject jsoncolectivos=new JSONObject();
        	   
        	   for (int i=0; i < ele.getJSONArray("colectivos").length(); i++)
               {
        		   JSONObject col=  ele.getJSONArray("colectivos").getJSONObject(i);
        		   String scol=col.getString("uid");
        		   int icol=col.getInt("uid");
                   JSONObject jsondatoscolectivo=new JSONObject();
                   switch (icol) {
                   case 1: //Alumno
                	   jsondatoscolectivo.put("nia",this.getAttribute(atributos, "uvania"));
                	   jsondatoscolectivo.put("nip",this.getAttribute(atributos, "uvanip"));
                	   //jsondatoscolectivo.put("uvacenplacur",this.getAttribute(atributos, "uvacenplacur"));
                	   jsondatoscolectivo.put("cenplacur",getCentroPlanCurso(atributos,"uvacenplacur"));
                	   break;
                   case 2: //PDI
                	   jsondatoscolectivo.put("nia",this.getAttribute(atributos, "uvania"));
                	   jsondatoscolectivo.put("centro",getCentro(atributos, "uvapdicentro"));
                	   jsondatoscolectivo.put("departamento",getDepartamento(atributos, "uvapdidepartamento"));
                	   jsondatoscolectivo.put("cuerpodocente",getCuerpoDocente(atributos, "uvapdicuerpodocente"));
                	   jsondatoscolectivo.put("edificio",getEdificio(atributos, "uvapdiedificio"));
                	   break;
                   case 3: //PAS
                	   jsondatoscolectivo.put("nia",this.getAttribute(atributos, "uvania"));
                	   //jsondatoscolectivo.put("uvapascentro",this.getAttribute(atributos, "uvapascentro"));
                	   jsondatoscolectivo.put("centro",getCentro(atributos,"uvapascentro"));
                	   //jsondatoscolectivo.put("uvapasedificio",this.getAttribute(atributos, "uvapasedificio"));
                	   jsondatoscolectivo.put("edificio",getEdificio(atributos,"uvapasedificio"));
                	   break;
                   case 9: // Investigadores con labores de PDI
                	   jsondatoscolectivo.put("nia",this.getAttribute(atributos, "uvania"));
                	   jsondatoscolectivo.put("centro",getCentro(atributos, "uvapdicentro"));
                	   jsondatoscolectivo.put("departamento",getDepartamento(atributos, "uvapdidepartamento"));
                	   jsondatoscolectivo.put("cuerpodocente",getCuerpoDocente(atributos, "uvapdicuerpodocente"));
                	   jsondatoscolectivo.put("edificio",getEdificio(atributos, "uvapdiedificio"));
                	   break;
                   case 13://ALumno Adscrito
                	   jsondatoscolectivo.put("nia",this.getAttribute(atributos, "uvania"));
                	   jsondatoscolectivo.put("nip",this.getAttribute(atributos, "uvanip"));
                	   //jsondatoscolectivo.put("uvacenplacur",this.getAttribute(atributos, "uvacenplacur"));
                	   jsondatoscolectivo.put("cenplacur",getCentroPlanCurso(atributos,"uvacenplacur"));
                	   break;
                   case 14: //Doctorado
                	   jsondatoscolectivo.put("nia",this.getAttribute(atributos, "uvania"));
                	   jsondatoscolectivo.put("nip",this.getAttribute(atributos, "uvanip"));
                	   //jsondatoscolectivo.put("uvaprogramadoctorado",this.getAttribute(atributos, "uvaprogramadoctorado"));
                	   jsondatoscolectivo.put("programadoctorado",getProgramaDoctorado(atributos,"uvaprogramadoctorado"));
                	   break;
                   case 15: // ALumnos de Titulos Propios
                	   jsondatoscolectivo.put("nia",this.getAttribute(atributos, "uvania"));
                	   jsondatoscolectivo.put("nip",this.getAttribute(atributos, "uvanip"));
                	   //jsondatoscolectivo.put("uvatpedcur",this.getAttribute(atributos, "uvatpedcur"));
                	   jsondatoscolectivo.put("titulopropio",getTPedCur(atributos,"uvatpedcur"));
                	   break;
                   case 20: //Universidad Permanente
                	   jsondatoscolectivo.put("nia",this.getAttribute(atributos, "uvania"));
                	   jsondatoscolectivo.put("nip",this.getAttribute(atributos, "uvanip"));
                	   //jsondatoscolectivo.put("uvacentroestudios",this.getAttribute(atributos, "uvacentroestudios"));
                	   jsondatoscolectivo.put("centro",getCentro(atributos, "uvacentroestudios"));
                	   break;
                   case 27: // Profesores externos Sigma
                	   jsondatoscolectivo.put("nia",this.getAttribute(atributos, "uvania"));
                	   //jsondatoscolectivo.put("uvapescentro",this.getAttribute(atributos, "uvapescentro"));
                	   jsondatoscolectivo.put("centro",getCentro(atributos, "uvapescentro"));
                	   break;
                   case 34: //Alumnos interuniversitarios
                	   jsondatoscolectivo.put("nia",this.getAttribute(atributos, "uvania"));
                	   jsondatoscolectivo.put("nip",this.getAttribute(atributos, "uvanip"));
                	   //jsondatoscolectivo.put("uvadatostarjeta",this.getAttribute(atributos, "uvadatostarjeta"));
                	   jsondatoscolectivo.put("datostarjeta",getDatosTarjeta(atributos, "uvadatostarjeta"));
                	   break;
                   case 46: // Profesores Colaboradores Honoríficos
                	   jsondatoscolectivo.put("centro",getCentro(atributos, "uvapchcentro"));
                	   jsondatoscolectivo.put("departamento",getDepartamento(atributos, "uvapchdepartamento"));
                	   jsondatoscolectivo.put("edificio",getEdificio(atributos, "uvapchedificio"));
                	   break;
                   case 51: //Investigadores externos a la UVa
                	   jsondatoscolectivo.put("centro",getCentro(atributos, "uvainvestigadoredificio"));
                	   jsondatoscolectivo.put("edificio",getEdificio(atributos, "uvainvestigadoredificio"));
                	   jsondatoscolectivo.put("departamento",getDepartamento(atributos, "uvainvestigadordepartamento"));
                	   jsondatoscolectivo.put("instituto",getInstituto(atributos, "uvainvestigadorinstituto"));
                	   jsondatoscolectivo.put("tipoinvestigador",this.getAttribute(atributos, "uvatipoinvestigador"));
                	   break;
                   case 52: //Invitados UVa
                	   jsondatoscolectivo.put("centro",getCentro(atributos, "uvapicentro"));
                	   jsondatoscolectivo.put("edificio",getEdificio(atributos, "uvapiedificio"));
                	   jsondatoscolectivo.put("departamento",getDepartamento(atributos, "uvapidepartamento"));
                	   break;
                   case 57: //Profesores emeritos 
                	   jsondatoscolectivo.put("centro",getCentro(atributos, "uvapecentro"));
                	   jsondatoscolectivo.put("edificio",getEdificio(atributos, "uvapeedificio"));
                	   jsondatoscolectivo.put("departamento",getDepartamento(atributos, "uvapedepartamento"));
                	   break;
                   case 59: //Alumnos BIE 
                   case 60: //Profesores BIE
                	   jsondatoscolectivo.put("areabachillerato",getAreaBachillerato(atributos, "uvaareabachillerato"));
                	   jsondatoscolectivo.put("campus",getCampus(atributos, "uvacampus"));
                	   break;
                   case 42:
                   case 45:
                   case 55:
                   case 56:
                   case 61:
                   case 62:
                	case 63:
                	case 64:
                	case 65:
                	case 66:
                	case 67:
                	case 68: //Instituos LOU
                	   jsondatoscolectivo.put("instituto",getInstituto(atributos, "uvamiinstituto"));
                	   break;
                   }
                   if (jsondatoscolectivo!=null && jsondatoscolectivo.length()>0) {
                	   jsoncolectivos.put(scol,jsondatoscolectivo);
                   }
               }
        	   ele.put("colectivosdatos",jsoncolectivos);
        	  
        	   
           }  catch (JSONException e) {
        	   System.err.println(e);
           } catch (Exception e) {
        	   System.err.println(e);
           } finally {
        	   
           }
        }
        return ele;
    }
    
    protected JSONObject searchFilter(String base,String id) throws NamingException, JSONException {
		String searchFilter = "(&(uid="+id+"))";
		JSONObject ele=new JSONObject();
    	NamingEnumeration<SearchResult> results=this.search(base,searchFilter);
    	SearchResult searchResult = null;
        if(results.hasMoreElements()) {
        	while (results.hasMoreElements()) {
        		
        		
        		searchResult = (SearchResult) results.nextElement();
        		Attributes atributos=searchResult.getAttributes();
        		
        		String uid=(String)atributos.get("uid").get();
        		System.out.println("UID "+uid);

        		JSONObject jsononj=new JSONObject();
        		
        		NamingEnumeration res=atributos.getAll();
        		while (res.hasMoreElements())
        		{
        			Attribute attr = (Attribute) res.nextElement();
				   	System.out.println("ATRIBUTO "+attr.getID()+" "+attr.size());
				   	jsononj.put(attr.getID(),this.getAttribute(atributos, attr.getID()));
			   }
        		ele.put(uid, jsononj);
        	}
        }
        return ele;
	}
    
    public JSONObject getUserDataJson() throws CmsException, JSONException, NamingException {
        LOG.debug((Object)"--> getUserDataJson");
        JSONObject res=new JSONObject();
        CmsUser user = this.m_cms.getRequestContext().getCurrentUser();
        if (this.m_cms.getRequestContext().getCurrentUser().isGuestUser()) {
            LOG.debug((Object)"--- getUserDataJson GUEST USER");
            return res;
        }
        String usuario_intranet = user.getName();
        String usuario = usuario_intranet.replace("intranet/", "");
        LOG.debug((Object)("--- getUserDataJson USER " + usuario));
        
        this.connect();
        res=this.searchPerson(usuario);
        this.disconnect();
        return res;
    }
    
    public static void main(String[] args) throws NamingException, JSONException {
		IntranetWS clase=new IntranetWS();
		clase.connect();
		//JSONObject persona=clase.searchPerson("e71124293j");
		//JSONObject persona=clase.searchPerson("e12400072j");
		//JSONObject persona=clase.searchPerson("e09341678k");
		//15 e71310011y
		//20 e09262946h
		//27 e05631229r
		//34 e35591324c
		//46 e12781544f
		//51 e12372121f
		//57 e13831164e
		//60 e71556237v
		JSONObject persona=clase.searchPerson("e71124293j");
		
  	    System.out.println(persona.toString());
		//JSONObject resultado=new JSONObject();
		//resultado.put("correo", clase.searchFilter("ou=correo,dc=uva,dc=es","*"));
		//resultado.put("colectivos", clase.searchFilter("ou=colectivos,dc=uva,dc=es","*"));
		//resultado.put("centros", clase.searchFilter("ou=centros,dc=uva,dc=es","*"));
		//resultado.put("departamentos", clase.searchFilter("ou=departamentos,dc=uva,dc=es","*"));
		//resultado.put("institutos", clase.searchFilter("ou=institutos,dc=uva,dc=es","*"));
		//resultado.put("cuerposdocentes", clase.searchFilter("ou=cuerposdocentes,dc=uva,dc=es","*"));
		//resultado.put("edificios", clase.searchFilter("ou=edificios,dc=uva,dc=es","*"));
		//resultado.put("campus", clase.searchFilter("ou=campus,dc=uva,dc=es","*"));
		//resultado.put("planes", clase.searchFilter("ou=planes,dc=uva,dc=es","*"));
		//resultado.put("programasdoctorado", clase.searchFilter("ou=programasdoctorado,dc=uva,dc=es","*"));
		//resultado.put("titulospropios", clase.searchFilter("ou=titulospropios,dc=uva,dc=es","*"));
		//resultado.put("areasbachillerato", clase.searchFilter("ou=areasbachillerato,dc=uva,dc=es","*"));
		//System.out.println(resultado.toString());
		clase.disconnect();
	}
}

