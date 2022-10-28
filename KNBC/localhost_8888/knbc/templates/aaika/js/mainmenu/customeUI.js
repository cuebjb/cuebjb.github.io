(function($) {
 "use strict";

$(document).ready(function() {
    $('.iceMenuLiLevel_2').hover(function () {
        if ($(window).width() >= 479) {
            var p = $(this);
            var offset = p.offset();

            var multiLeft = offset.left;
            var multilevelWidth = $(".multilevel").width();
            var sublevelWidth = $(this).find(".dropdown-menu").width();

            var allWidth = multiLeft + multilevelWidth + sublevelWidth;

            if ($(window).width() <= allWidth) {
                $(this).find(".dropdown-menu").css("marginLeft", "-" + (multilevelWidth + sublevelWidth) + "px");
            } else {
                $(".iceMenuLiLevel_2 .dropdown-menu").css("marginLeft", " ");
            }
        } else {
            $(".iceMenuLiLevel_2 .dropdown-menu").css("marginLeft", " ");
        }
    });    
    
    
});

})(jQuery);
