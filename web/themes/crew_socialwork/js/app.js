(function($, Drupal, window, document, undefined) {
  'use strict';

  Drupal.behaviors.exampleJS = {
    attach: function(context, settings) {
      if (typeof context['location'] !== 'undefined') { // Only fire on document load.

        $('.field--name-field-value:contains(#)').html(function(_, html) {
          return html.replace(/(#)/g, '<sup>$1</sup>');
        });

        // wrap all photo sections in an anchor
        $('.paragraph--type--photo-section').each(function() {
          $(this).wrap(function() {
            return "<a href='" + $(this).find('a').attr('href') + "'></a>";
          });
        });

        $('.view-featured-news .views-row').each(function() {
          $(this).wrapInner(function() {
            return "<a class='news-link-wrapper' href='" + $(this).find('a').attr('href') + "'></a>";
          });
        });

      }
    }
  };

  // hide alumni, students, and faculty-staff from socialwork main navigation & mobile
  // console.log(drupalSettings.path.baseUrl);
  if (drupalSettings.path.baseUrl == '/socialwork/') {
    $('#block-crew-socialwork-main-menu a[href$="/resources-for-alumni"]').parent().css("display", "none");
    $('#block-crew-socialwork-main-menu a[href$="/resources-for-faculty-staff"]').parent().css("display", "none");
    $('#block-crew-socialwork-main-menu a[href$="/resources-for-students"]').parent().css("display", "none");
  }

  // clock for fullscreen
  function showTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var d = date.toDateString();

    if (h == 0) h = 12;
    if (h > 12) h = h - 12;

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;

    $('#clock-fullscreen-h').text(h);
    $('#clock-fullscreen-m').text(m);
    $('#date-fullscreen').text(d);
    setTimeout(showTime, 1000);
  }

  showTime();

})(jQuery, Drupal, this, this.document);
