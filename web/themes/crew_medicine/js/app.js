(function($) {
  // hide alumni, students, and faculty-staff from medicine main navigation & mobile
  // console.log(drupalSettings.path.baseUrl);
  if (drupalSettings.path.baseUrl == '/medicine/') {
    $('ul[block="block-crew-medicine-main-menu"] a[href$="/alumni"]').parent().css("display", "none");
    $('ul[block="block-crew-medicine-main-menu"] a[href$="/students"]').parent().css("display", "none");
    $('ul[block="block-crew-medicine-main-menu"] a[href$="/faculty-staff"]').parent().css("display", "none");
  }

  // hide secondary nav from weatherhead main navigation & mobile
  // console.log(drupalSettings.path.baseUrl);
  if (drupalSettings.path.baseUrl == '/medicine/') {
    $('ul[block="block-crew-medicine-main-menu"] a[href$="/students"]').parent().css("display", "none");
    $('ul[block="block-crew-medicine-main-menu"] a[href$="/alumni"]').parent().css("display", "none");
    $('ul[block="block-crew-medicine-main-menu"] a[href$="/faculty-staff"]').parent().css("display", "none");
  }
})(jQuery);
