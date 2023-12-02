(function ($) {
  // When form loads - add this class to enable error messages
  $(document).ready(function () {
    if ($('.region-highlighted .alert-danger').length > 0) {
      $('.region-highlighted .alert-danger')[0].innerText.trim().endsWith('site administrator.') ? '' : $('.region-highlighted').addClass('webform-error-message');
    }
  });

})(jQuery);
