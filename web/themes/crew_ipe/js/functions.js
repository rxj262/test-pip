(function ($) {
  $( document ).ready(function() {
    $('.hero__title').append($('.field--name-field-ipe-fw-hero-ref'));
    // move full width hero image up and make it 12-col
    if ($('.paragraph--type--hero-full-width').length > 0) {
      $('.paragraph--type--hero-full-width').prependTo($('.pre-sidebar')).addClass('col-xs-12');
    }
    // move aside below content at small breakpoints
    if ($('.paragraph--type--aside').length) {
      $('.paragraph--type--aside').each(function(){
        var aside = $(this);
        var asideContainer = aside.parent();
        var bottomDiv = $('<div/>').addClass('aside-container-mobile');
        $('.field--name-field-landing-all-options-ref').append(bottomDiv);
        function moveAside(){($(window).width() <= 992) ? bottomDiv.append(aside) : asideContainer.append(aside)}
        moveAside();
        $(window).resize(function() {moveAside()});
      });
    }



  });
})(jQuery);
