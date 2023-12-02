(function($, Drupal, window, document, undefined) {
  'use strict';

  Drupal.behaviors.directoryFormUpdates = {
    attach: function(context, settings) {
      $('.msass-directory #views-exposed-form-directory-block-1 select option').each(function() {
        $(this)[0].innerHTML = $(this)[0].innerHTML.replace("MSASS ", "");
      });
      $('.msass-directory #views-exposed-form-directory-block-1 label').each(function() {
        $(this).css('font-weight', 600);
      });

      // directory view, wait on filter processing
      $(document).ajaxStart(function () {
        $('body').addClass('wait');
        }).ajaxComplete(function () {
            $('body').removeClass('wait');
        });

      function checkPosition() {
        if (window.matchMedia('(min-width: 767px)').matches) {
          var max_width;
          var selects = $('.msass-directory .views-exposed-form select');
            selects.each(function() {
            //width_list.push($(this).width());
            if(!max_width || max_width < $(this).width()) {
              max_width = $(this).width()
            }
        });
          selects.width(max_width);
        }
      }
      checkPosition();
    }
  };

})(jQuery, Drupal, this, this.document);
