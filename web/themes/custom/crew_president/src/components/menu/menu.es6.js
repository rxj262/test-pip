!((document, Drupal, $) => {
  'use strict';

  /**
   * Use this to describe what your behavior does.
   */
  Drupal.behaviors.menu = {

    attach: function (context) {
      $('.menu-toggle').click(function () {
        $('.menu-top-level').slideToggle('fast');
      });

      // check for mobile
      $('.menu-top-level .arrow').click(function (e) {
        e.preventDefault();
        $(this).parent().next().slideToggle('fast');
      });
    }
  };
})(document, Drupal, jQuery);
