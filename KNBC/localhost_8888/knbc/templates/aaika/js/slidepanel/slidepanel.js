(function($) {
 "use strict";

$(document).ready(function() {
	$(".topMenuAction").click( function() {
		if ($("#openCloseIdentifier").is(":hidden")) {
			$("#slider").animate({ 
				marginTop: "-1000px"
				}, 900 );
			$("#topMenuImage").html('<img src="templates/aaika/js/slidepanel/open.png" alt="open" title="open" />');
			$("#openCloseIdentifier").show();
		} else {
			$("#slider").animate({ 
				marginTop: "0px"
				}, 300 );
			$("#topMenuImage").html('<img src="templates/aaika/js/slidepanel/close.png" alt="close" title="close" />');
			$("#openCloseIdentifier").hide();
		}
		return false;
	});  
});

})(jQuery);
