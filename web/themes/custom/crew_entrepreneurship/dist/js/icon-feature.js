!function (document, Drupal, $) {
  'use strict';

  /**
   * Use this to describe what your behavior does.
   */

  Drupal.behaviors.iconFeature = {

    attach: function attach() {
      // detect safari
      var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      // generic function to handle active class
      function showMe(n, selector) {
        selector.each(function () {
          $(this).removeClass('active animate');
        });
        if (!is_safari) {
          selector.eq(n).addClass('active animate');
        } else {
          selector.eq(n).addClass('active');
        }
      }
      // use showMe funtion on title and illustration
      function activate(n) {
        showMe(n, $('.icon-feature-illustration'));
        showMe(n, $('.field-icon-feature-title'));
        showMe(n, $('.group-feature-icon-details'));
      }
      // set up the gallery
      function setup() {
        // vertically align titles
        var newTop = 60;
        var spacing = 20;
        $('.field-icon-feature-title').each(function (i) {
          $(this).css('top', newTop);
          newTop += $(this).height() + spacing;
          // add on-click handler for titles
          $(this).click(function () {
            activate(i);
            $('.field-icon-feature--desktop').removeClass('color--0 color--1').addClass('color--' + i % 2);
          });
        });
        // show first
        activate(0);
      }
      setup();
    }
  };
}(document, Drupal, jQuery);
//# sourceMappingURL=icon-feature.js.map
