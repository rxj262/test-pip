/* eslint-disable require-jsdoc */
!((document, Drupal, $) => {
  'use strict';

  /**
   * Use this to describe what your behavior does.
   */
  Drupal.behaviors.gallery = {

    attach: function (context) {
      function masonry() {
        var grid = $('.grid').masonry({
          horizontalOrder: true,
          gutter: 20,
        });
        grid.imagesLoaded().progress(function () {
          grid.once().masonry('layout');
        });
      }
      window.setInterval(masonry, 300);
    }
  };
})(document, Drupal, jQuery);
