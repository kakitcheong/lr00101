$(document).foundation();


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
var opacityScroll = function(){
	var scrollTop = $(window).scrollTop();
	$('.opening__site-hero-text--reversed').toggleClass('animate__fade', scrollTop > 90);
}

$(window).on('scroll', function(){
	opacityScroll();
});

var countUp = function(){
	$('.count').each(function() {
      var $this = $(this);
      var countTo = $this.attr('data-count');
      $({ countNum: $this.text() }).animate({
          countNum: countTo
        },{
          	duration: 2000,
          	easing: 'swing',
          	step: function() {
        		$this.text(Math.floor(this.countNum));
          },
          complete: function() {
            	$this.text(this.countNum);
          }
        });
    });
}

/*** in viewport check ***/
var viewportCheck = function(){
	$('.big-number').viewportChecker({
		classToAdd: 'count',
		classToAddForFullView: 'full-visible',
		callbackFunction: function(elem, action){ countUp(); },
	});
}

$(document).ready(function(){
	viewportCheck();
});
/*** header nav mobile ***/
$('.header-nav--mobile__toggle').on('click', function(){
	$(this).toggleClass('menu--mobile__is-open');
});

$.fn.animateEach = function(className, callback){
	function assignClass(i, elements, className, callback){
		if(i <= elements.length){
			elements.eq(i).addClass(className);
			setTimeout(function(){assignClass(i+1, elements, className, callback)}, 100);
		}
		else{
			typeof callback == 'function' && callback();
		}   
	}
	assignClass(0, this, className, callback);
	return this;
}

$('#mobile-nav').on( 'opened.zf.offcanvas', function(){
	setTimeout(function(){
		$('.mobile-nav__menu').find('li').animateEach('show', function(){console.log("animation finished!");
	})}, 500);	
});

$('#mobile-nav').on( 'closed.zf.offcanvas', function(){
	$('.mobile-nav__menu').find('li').removeClass('show');
});

var $window = $(window);

/*** in-body nav ***/
var safeZone = 20;

$window.on('scroll', function(){
	var scrollTop = $window.scrollTop();
	$('#mobile-nav__content, #mobile-nav__toggle').toggleClass('in-body', scrollTop > safeZone);
});
