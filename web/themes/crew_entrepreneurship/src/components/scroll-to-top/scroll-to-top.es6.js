!((document, Drupal, $) => {
  'use strict';

  /**
   * Use this to describe what your behavior does.
   */
  Drupal.behaviors.scrollToTop = {

    attach: function() {
      //Check to see if the window is top if not then display button
      $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
          $('.scroll-to-top').fadeIn();
        } else {
          $('.scroll-to-top').fadeOut();
        }
      });

      //Click event to scroll to top
      $('.scroll-to-top').click(function() {
        $('html, body').animate({
          scrollTop: 0
        }, 800);
        return false;
      });
    }
  };
})(document, Drupal, jQuery);
