!((document, Drupal, $) => {
  'use strict';

  /**
   * adds animate on scroll properties to columns
   */
  Drupal.behaviors.subfeatureColumnAOS = {

    attach: function() {
      const columns = $('.field-column-content-holder');
      columns.first().find('.field__item').attr('data-aos', 'fade-right');
      columns.last().find('.field__item').attr('data-aos', 'fade-left');
      AOS.init();
    }
  };

  /**
   * adds animate on scroll properties to columns
   */
  Drupal.behaviors.subfeatureColumnMobile = {

    attach: function() {
      $('.field-column-content-holder').last().addClass('hide-sm-down');
      const firstColumnItems = $('.field-column-content-holder').first().children();
      const secondColumnItems = $('.field-column-content-holder').last().children();

      firstColumnItems.each((index, item) => {
        let toInsert = secondColumnItems.eq(index).clone().addClass('hide-sm-up');
        firstColumnItems.eq(index).after(toInsert);
      });
    }
  };

})(document, Drupal, jQuery);
