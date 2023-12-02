!function (document, Drupal, $) {
  'use strict';

  /**
   * Use this to describe what your behavior does.
   */

  Drupal.behaviors.statGroup = {

    attach: function attach() {
      // find any "#" and wrap in span for styling
      $('.field-stat-number:contains(#)').html(function (_, html) {
        return html.replace(/(#)/g, '<span class="stat-pound">$1</span>');
      });
      // find second stat number and add outline class -- removed!
      // $('.field-stat-number').eq(1).addClass('outline');

      // animate on scroll for numbers
      $('.field-stat-number').attr('data-aos', 'fade-up');
      $('.field-stat-description').attr('data-aos', 'fade-up');
      AOS.init();
    }
  };
}(document, Drupal, jQuery);
//# sourceMappingURL=stat-group.js.map
