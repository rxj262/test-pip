(function ($) {
  $( document ).ready(function() {
    // move aside below content at small breakpoints
    console.log('running on president search');
    if ($('.paragraph--type--aside').length) {
      $('.paragraph--type--aside').each(function(){
        var aside = $(this);
        var asideContainer = aside.parent();
        var bottomDiv = $('<div/>').addClass('aside-container-mobile');
        $('.field--name-field-robust-3-page-ref').append(bottomDiv);
        function moveAside(){($(window).width() <= 992) ? bottomDiv.append(aside) : asideContainer.append(aside)}
        moveAside();
        $(window).resize(function() {moveAside()});
      });
    }

  });
})(jQuery);
