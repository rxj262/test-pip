!((document, Drupal, $) => {
  'use strict';

  /**
   * Use this to describe what your behavior does.
   */
  Drupal.behaviors.menu = {

    attach: function(context) {
      $('.menu-toggle').click( function() {
        $('.menu-top-level').slideToggle();
      });
      $('.robust-hero').after($('.secondarynav'))
    }
  };
})(document, Drupal, jQuery);
