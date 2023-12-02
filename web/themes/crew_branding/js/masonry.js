(function ($) {
  $(document).ready(function () {
    function masonry() {
      $('.grid .grid-item').css({"float": "left", "width": 'calc(100%/3)', "padding": "1.5px"});
      var $grid = $('.grid').masonry({
        horizontalOrder: true,
      });
      $grid.imagesLoaded().progress( function() {
        $grid.once().masonry('layout');
      });
    }
    window.setInterval(masonry, 300);
  });
})(jQuery);
