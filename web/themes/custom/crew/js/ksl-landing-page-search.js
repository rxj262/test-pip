(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.searchTabs = {
    attach: function (context, settings) {

      $('.ksl-landing-page__nav-link').on('click', function(e) {
        e.preventDefault();

        if ($('.ksl-landing-page__nav-item').hasClass('active')) {
          $('.ksl-landing-page__nav-item').removeClass('active');
        }

        $(this).closest('.ksl-landing-page__nav-item').addClass('active');
        $('.ksl-landing-page__result').removeClass('active');

        if ($('.ksl-landing-page__nav-item--tab1').hasClass('active')) {
          $('.ksl-landing-page__result--custom').addClass('active');
        };

        if ($('.ksl-landing-page__nav-item--tab2').hasClass('active')) {
          $('.ksl-landing-page__result--journals').addClass('active');
        };

        if ($('.ksl-landing-page__nav-item--tab3').hasClass('active')) {
          $('.ksl-landing-page__result--catalog').addClass('active');
        };

        if ($('.ksl-landing-page__nav-item--tab4').hasClass('active')) {
          $('.ksl-landing-page__result--database').addClass('active');
        };

        if ($('.ksl-landing-page__nav-item--tab5').hasClass('active')) {
          $('.ksl-landing-page__result--ohiolink').addClass('active');
        };
      });
    }
  };

})(jQuery, Drupal);
