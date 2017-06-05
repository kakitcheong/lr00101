////////////////////////////////////////////////////////////////////////////////
//  carousel home                                                     	      //
////////////////////////////////////////////////////////////////////////////////
$('.carousel').on('init', function(){
	$('.carousel__display > .display').html($('.carousel__content.init').find('.content__wrap').html());
	$('#dynamic-title').html($('.data-list li[data-slide-position="0"]').html());
});

$('.carousel').slick({
	arrows: false,
	cssEase: 'ease-in',
	lazyLoad: 'progressive'
});
/*
$('.carousel').on('afterChange', function(event, slick, currentSlide, nextSlide){
	$('.carousel__display > .display').html('changed');
});
*/
$('.carousel').on('afterChange', function(event, slick, currentSlide, nextSlide){
	//console.log(currentSlide);
	var $slides = $('.carousel').slick("getSlick").$slides;
	var currentSlideData = $slides.eq( currentSlide );
	$('.carousel__display > .display').fadeOut(400, function(){
		$('.carousel__display > .display').html(currentSlideData.find('.content__wrap').html()).fadeIn(800);
	});
	$('#dynamic-title').fadeOut(600, function(){
		$(this).html($('li[data-slide-position="' + currentSlide + '"]').html()).fadeIn(1200);	
	})
});

$( document ).ready(function() {
   	$('.carousel__nav .prev').on( 'click', function(e){
   		e.preventDefault();
   		$('.carousel').slick("slickPrev");
   	});
   	$('.carousel__nav .next').on( 'click', function(e){
   		e.preventDefault();
   		$('.carousel').slick("slickNext");
   	});
});