!function (document, Drupal, $) {
  'use strict';

  /**
   * Use this to describe what your behavior does.
   */

  Drupal.behaviors.search = {

    attach: function attach() {
      $('#q').focus(function () {
        return $('.fa-search').hide();
      }).blur(function () {
        return $('.fa-search').show();
      });
    }
  };
}(document, Drupal, jQuery);
//# sourceMappingURL=search.js.map
