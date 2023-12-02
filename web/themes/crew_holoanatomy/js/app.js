(function ($, Drupal, window, document, undefined) {
  "use strict";

  Drupal.behaviors.exampleJS = {
    attach: function (context, settings) {
      if (typeof context["location"] !== "undefined") {
        // Only fire on document load.
        $("#myModal").modal("show");

        $("#myModal").on("hidden.bs.modal", function (e) {
          $("#myModal iframe").attr("src", "");
        });

        // wrap imgs in As Seen In section with <a>
        var asSeenInLink = $(
          ".field--name-field-as-seen-in .field--name-field-link a"
        );
        var asSeenInImg = $(
          ".field--name-field-as-seen-in .field--name-field-image img"
        );
        asSeenInImg.each(function (i) {
          $(this).wrap(function () {
            return "<a href='" + asSeenInLink[i].href + "'></a>";
          });
        });

        // parallax for homepage
        var imageHero = document.querySelector(
          ".field--name-field-hero-one-image-ref .img-responsive"
        );
        var imageCTA2 = document.querySelector(
          ".field--name-field-cta2-image .img-responsive"
        );
        new simpleParallax(imageHero);
        new simpleParallax(imageCTA2);
      }
    },
  };
})(jQuery, Drupal, this, this.document);
