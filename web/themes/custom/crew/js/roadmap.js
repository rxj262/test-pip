(function ($) {
  var allLists = $('.paragraph--type--todo-list');
  allLists.each(function () {
    var listItems = $(this).find('.field--name-field-list-items');
    var notAvailableText = $(this).find('.field--name-field-not-available-text');
    var linkDiv = $(this).find('.field--name-field-view-list-link');
    var linkText = linkDiv.text();
    var startDate = $(this).find('.field--name-field-start-date');
    var endDate = $(this).find('.field--name-field-end-date');
    var parsedDate = startDate.text() + ' ' + new Date().getFullYear();
    var hidden = true;

    if (Date.parse(parsedDate) <= Date.now()) {
      notAvailableText.hide();
      linkDiv.hide();
      startDate.text(function () {
        return "To-Dos " + startDate.text();
      });
    } else {
      listItems.hide();
      linkDiv.prepend('view ').wrapInner('<a></a>');
      endDate.hide();
      startDate.text(function () {
        return "Not available to complete until " + startDate.text();
      }).css("color", "#D90000");

      linkDiv.find('a').click(function () {
        if (hidden) {
          listItems.slideDown();
          notAvailableText.slideUp();
          $(this).text('collapse');
          hidden = false;
        } else {
          listItems.slideUp();
          notAvailableText.slideDown();
          $(this).text(function () {
            return "view " + linkText;
          });
          hidden = true;
        }
      });
    }
  });

  var allCounters = $('.field--name-field-todo-list .counter');

  allCounters.each(function (i) {
    var counter = i + 1 < 10 ? '0' + (i + 1) : (i + 1);
    $(this).text(counter);
  });
})(jQuery);