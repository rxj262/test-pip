(function ($) {
  $(document).on('ready', function(){
    var gcalid = $('.gCalFlow').data('gcalid'),
      amount = $('.gCalFlow').data('amount');
      $('.gCalFlow').gCalFlow({
        calid: gcalid,
        maxitem: amount,
        no_items_html: '<p class="no-events">no events found...</p>',
        apikey: 'AIzaSyCd-P9Id38F0PXecOoAw59iUYRkzcA5MNY', //From Cheng's Google API account, the Google Calendar API has a courtesy limit of 1,000,000 queries per day.
      });
    });
})(jQuery_2_2_4);
