<%@page buffer="none" session="false" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<cms:formatter var="content"  val="value" rdfa="rdfa">
<div class="container parrafo">
    <div class="row">
      <div class="col-10 offset-md-1">
        <p ${rdfa.Texto}>${value.Texto}</p>
	  </div>
    </div>
</div>
</cms:formatter>