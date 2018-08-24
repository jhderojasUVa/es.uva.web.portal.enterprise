<%@page buffer="none" session="false" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<cms:formatter var="content">
	<div class="container alertas">
		<div class="row">
			<div class="col-12 urgente text-center">
				<i class="fas fa-exclamation-circle"></i> ${content.value.Title}
			</div>
		</div>
	</div>
</cms:formatter>