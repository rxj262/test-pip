(function ($) {
  $(document).ready(function () {
    // if dropdown menu is off-page, move left
    var dropdowns = $("#block-crew-thinkbox-main-menu .nav > li.dropdown");
    dropdowns.each(function (i) {
      if (i > 1) $(this).find("ul.dropdown-menu").addClass("pull-right");
    });
  });

  //Put page-header above hero image on equipment detail page
  if ($(".field--name-field-hero-one-image-ref")[0]) {
    if ($(".equipment-detail-page")[0]) {
      $(".page-header").prependTo(".region-content");
    }
  }
})(jQuery);
