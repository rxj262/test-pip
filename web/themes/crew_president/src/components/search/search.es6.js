!((document, Drupal, $) => {
  'use strict';

  /**
   * Use this to describe what your behavior does.
   */
  Drupal.behaviors.search = {

    attach: function() {
      $('#q')
        .focus(() => $('.fa-search').hide())
        .blur(() => $('.fa-search').show());
    }
  };
})(document, Drupal, jQuery);
