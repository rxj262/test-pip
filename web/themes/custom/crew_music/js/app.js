(function($) {
  var BREAKPOINTS = [
    { name: "small", size: 768 },
    { name: "medium", size: 992 },
    { name: "large", size: 1200 },
  ]
  function isBreakpoint (size) {
    var thisSize = BREAKPOINTS.filter(function(breakpoint) {
      return breakpoint.name === size;
    });
    return $(window).width() > thisSize[0].size ? false : true;
  }

  function pageTitleFix() {
    $('.ensemble-course-info-container').prepend($('.important-updates').css('display', 'block'));
    $('.ensemble-course-info-container').prepend($('.page-header').css('display', 'block'));
    // $('.hero-title-container .page-header span').append($('.hero-page-title-info'));
    // $('.page-header span').addClass("page-title-name").append('<div class="glass-blur"></div>');
    // $('.page-header, .hero-page-title-info').css('display', 'block');
    //$('.paragraph--type--centered-intro-text').prepend($('.region-breadcrumbs').css('display', 'block'));
    
	}
  $(window).on('load', function () {
    pageTitleFix();
  });


  // hide alumni and employers on music site, modify title field to manually break before word 'and'
  if (drupalSettings.path.baseUrl == '/music/' || drupalSettings.path.baseUrl == '/artsci/music/') {
    $('ul[block="block-crew-music-main-menu"] a[href$="/resources-students"]').parent().css("display", "none");
  }

})(jQuery);
