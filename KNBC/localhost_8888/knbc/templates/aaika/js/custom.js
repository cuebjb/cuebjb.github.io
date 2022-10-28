// JavaScript Document
jQuery(document).ready(function() {
		jQuery('.loader').ClassyLoader({
			percentage: 90,
			speed: 30,
			fontSize: '50px',
			diameter: 90,
			lineColor: 'rgba(51,51,51,1)',
			remainingLineColor: 'rgba(220,220,220,0.7)',
			lineWidth: 9
		});
	});

	jQuery(document).ready(function() {
		jQuery('.loader2').ClassyLoader({
			percentage: 100,
			speed: 30,
			fontSize: '50px',
			diameter: 90,
			lineColor: 'rgba(51,51,51,1)',
			remainingLineColor: 'rgba(220,220,220,0.7)',
			lineWidth: 9
		});
	});
	
	jQuery(document).ready(function() {
		jQuery('.loader3').ClassyLoader({
			percentage: 85,
			speed: 30,
			fontSize: '50px',
			diameter: 90,
			lineColor: 'rgba(51,51,51,1)',
			remainingLineColor: 'rgba(220,220,220,0.7)',
			lineWidth: 9
		});
	});
	
	jQuery(document).ready(function() {
		jQuery('.loader4').ClassyLoader({
			percentage: 65,
			speed: 30,
			fontSize: '50px',
			diameter: 90,
			lineColor: 'rgba(51,51,51,1)',
			remainingLineColor: 'rgba(220,220,220,0.7)',
			lineWidth: 9
		});
	});

	jQuery(document).ready(function() {
		jQuery('.loader5').ClassyLoader({
			percentage: 95,
			speed: 30,
			fontSize: '50px',
			diameter: 90,
			lineColor: 'rgba(51,51,51,1)',
			remainingLineColor: 'rgba(220,220,220,0.7)',
			lineWidth: 9
		});
	});
	
	jQuery(document).ready(function() {
		jQuery('.loader001').ClassyLoader3({
			percentage: 85,
			speed: 30,
			fontSize: '50px',
			diameter: 100,
			lineColor: 'rgba(255,255,255,1)',
			remainingLineColor: 'rgba(255,255,255,0.3)',
			lineWidth: 10
		});
	});

	jQuery(document).ready(function() {
		jQuery('.loader002').ClassyLoader3({
			percentage: 90,
			speed: 30,
			fontSize: '50px',
			diameter: 100,
			lineColor: 'rgba(255,255,255,1)',
			remainingLineColor: 'rgba(255,255,255,0.3)',
			lineWidth: 10
		});
	});
	
	jQuery(document).ready(function() {
		jQuery('.loader003').ClassyLoader3({
			percentage: 100,
			speed: 30,
			fontSize: '50px',
			diameter: 100,
			lineColor: 'rgba(255,255,255,1)',
			remainingLineColor: 'rgba(255,255,255,0.3)',
			lineWidth: 10
		});
	});
	
	jQuery(document).ready(function() {
		jQuery('.loader004').ClassyLoader3({
			percentage: 75,
			speed: 30,
			fontSize: '50px',
			diameter: 100,
			lineColor: 'rgba(255,255,255,1)',
			remainingLineColor: 'rgba(255,255,255,0.3)',
			lineWidth: 10
		});
	});
	
	jQuery(document).ready(function() {
		jQuery('.loader01').ClassyLoader2({
			percentage: 90,
			speed: 30,
			fontSize: '16px',
			diameter: 30,
			lineColor: 'rgba(39,39,39,1)',
			remainingLineColor: 'rgba(200,200,200,0.4)',
			lineWidth: 3
		});
	});

	jQuery(document).ready(function() {
		jQuery('.loader02').ClassyLoader2({
			percentage: 100,
			speed: 30,
			fontSize: '18px',
			diameter: 40,
			lineColor: 'rgba(63,195,95,1)',
			remainingLineColor: 'rgba(200,200,200,0.4)',
			lineWidth: 4
		});
	});
	
	jQuery(document).ready(function() {
		jQuery('.loader03').ClassyLoader2({
			percentage: 85,
			speed: 30,
			fontSize: '22px',
			diameter: 50,
			lineColor: 'rgba(252,66,66,1)',
			remainingLineColor: 'rgba(200,200,200,0.4)',
			lineWidth: 5
		});
	});
	
	jQuery(document).ready(function() {
		jQuery('.loader04').ClassyLoader2({
			percentage: 65,
			speed: 30,
			fontSize: '27px',
			diameter: 60,
			lineColor: 'rgba(47,146,238,1)',
			remainingLineColor: 'rgba(200,200,200,0.4)',
			lineWidth: 6
		});
	});

	jQuery(document).ready(function() {
		jQuery('.loader05').ClassyLoader2({
			percentage: 79,
			speed: 30,
			fontSize: '30px',
			diameter: 70,
			lineColor: 'rgba(199,98,203,1)',
			remainingLineColor: 'rgba(200,200,200,0.4)',
			lineWidth: 7
		});
	});
	
	jQuery(document).ready(function() {
		jQuery('.loader06').ClassyLoader2({
			percentage: 93,
			speed: 30,
			fontSize: '35px',
			diameter: 80,
			lineColor: 'rgba(254,188,29,1)',
			remainingLineColor: 'rgba(200,200,200,0.4)',
			lineWidth: 8
		});
	});
	
	jQuery(document).ready(function() {
		jQuery('.loader07').ClassyLoader2({
			percentage: 100,
			speed: 30,
			fontSize: '40px',
			diameter: 90,
			lineColor: 'rgba(53,211,183,1)',
			remainingLineColor: 'rgba(200,200,200,0.4)',
			lineWidth: 9
		});
	});

	

(function(jQuery) {
 "use strict";

jQuery(document).ready(function(jQuery){
	var $timeline_block = jQuery('.cd-timeline-block');

	//hide timeline blocks which are outside the viewport
	$timeline_block.each(function(){
		if(jQuery(this).offset().top > jQuery(window).scrollTop()+jQuery(window).height()*0.75) {
			jQuery(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		}
	});

	//on scolling, show/animate timeline blocks when enter the viewport
	jQuery(window).on('scroll', function(){
		$timeline_block.each(function(){
			if( jQuery(this).offset().top <= jQuery(window).scrollTop()+jQuery(window).height()*0.75 && jQuery(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
				jQuery(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
			}
		});
	});
});

})(jQuery);


