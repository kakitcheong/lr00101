/*** header nav mobile ***/
$('.toggle__btn').on('click', function(){
	$('.header-nav--mobile__toggle').toggleClass('menu--mobile__is-open');
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
