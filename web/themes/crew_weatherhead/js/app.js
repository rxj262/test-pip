(function($) {

  // hide secondary nav from weatherhead main navigation & mobile
  // console.log(drupalSettings.path.baseUrl);
  if (drupalSettings.path.baseUrl == '/weatherhead/') {
    $('ul[block="block-crew-weatherhead-main-menu"] a[href$="/students"]').parent().css("display", "none");
    $('ul[block="block-crew-weatherhead-main-menu"] a[href$="/alumni"]').parent().css("display", "none");
    $('ul[block="block-crew-weatherhead-main-menu"] a[href$="/faculty-and-staff"]').parent().css("display", "none");
    $('ul[block="block-crew-weatherhead-main-menu"] a[href$="/corporate-partners"]').parent().css("display", "none");
    $('ul[block="block-crew-weatherhead-main-menu"] a[href$="/employers"]').parent().css("display", "none");
  }

  //Rearranging page-header and hero image
  if ($(".field--name-field-hero-image-with-links-phot")[0]) {
    if ($(".robust-content-small").length) {
      $(".page-header").prependTo(".robust-content-small");
    } else {
      $(".page-header").insertAfter(".paragraph--type--hero_with_links");
    }
  }

 // Stats Superscripts
  // $('.field--name-field-stat-value:contains(#)').html(function(_, html) {
  //   return html.replace(/(#)/g, '<sup>$1</sup>');
  // });
  // $('.field--name-field-stat-value:contains(+)').html(function(_, html) {
  //   return html.replace(/(\+)/g, '<sup>$1</sup>');
  // });

})(jQuery);
