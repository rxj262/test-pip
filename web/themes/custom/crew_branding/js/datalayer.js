(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.datalayer = {
    attach: function(context, drupalSettings) {
      if (context != document) {
        return;
      }
      var dataLayer = window.dataLayer = window.dataLayer || [];
      dataLayer.push(drupalSettings.crew.datalayer);
      dataLayer.push(drupalSettings.crew.new_datalayer);
    }
  }

})(jQuery, Drupal, drupalSettings);
