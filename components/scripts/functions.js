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