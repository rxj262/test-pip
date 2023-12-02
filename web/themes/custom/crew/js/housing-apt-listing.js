(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.housing = {
    attach: function (context, settings) {

      var newHeader = $('<tr align="center"></tr>');
      $('.form--inline.form-inline.clearfix').append($('table'));
      newHeader.append($('[data-drupal-selector="edit-field-building-value"]').wrap("<th></th>").parent()); // col1
      newHeader.append("<th></th>"); // col2
      newHeader.append($('[data-drupal-selector="edit-field-beds-value"]').wrap("<th></th>").parent()); // col3
      newHeader.append($('[data-drupal-selector="edit-field-baths-value"]').wrap("<th></th>").parent()); // col4
      newHeader.append($('[data-drupal-selector="edit-field-floors-value"]').wrap("<th></th>").parent()); // col5
      newHeader.append("<th></th>"); // col6
      $('.views-exposed-form thead').append(newHeader);
      $('.form-inline label').css('display', 'none');
      $('table thead tr th:first-child:empty').parent().hide();




      $('.views-exposed-widget select').each(function() {
        if (
            $(this).find(':selected').val() !==
            $(this).find('option[selected="selected"]').val()
        )
          $(this).trigger('change');
      });


    }
  };

})(jQuery, Drupal);