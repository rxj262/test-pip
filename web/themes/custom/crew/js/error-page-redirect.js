(function ($, Drupal, once, drupalSettings) {
  'use strict';
  Drupal.behaviors.error_page_redirect = {
    attach(context, drupalSettings) {
      if (typeof drupalSettings.labs_custom_blocks !== 'undefined') {
        if (drupalSettings.labs_custom_blocks.homepage_redirect_url != null) {
          setTimeout(
            function () {
              window.location.href = drupalSettings.labs_custom_blocks.homepage_redirect_url;
            }, 5000,
          );
        }
      }
      else {
        setTimeout(
          function () {
            window.location = drupalSettings.crew.error_page.base_url;
          }, 5000,
        );
      }     // modify drop icon default link
    },
  };
})(jQuery, Drupal, once, drupalSettings);
