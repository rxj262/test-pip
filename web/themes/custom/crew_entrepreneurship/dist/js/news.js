!function (document, Drupal, $) {
  'use strict';

  Drupal.behaviors.news = {

    attach: function attach() {
      var counter = 1;
      var maxStoryCount = 4;

      $.ajax({
        url: 'https://thedaily.case.edu/feed/?tag=entrepreneurship,innovation',
        type: 'GET',
        dataType: 'xml'
      }).done(function (xml) {
        var data = getDataObject(xml);
        // addNextImages(data);
        addStory(data);
        displayStories(0);
      });

      function getDataObject(data) {
        var feed = {};
        var titles = data.querySelectorAll("channel item title");
        var links = data.querySelectorAll("channel item link");
        var descriptions = data.querySelectorAll("channel item description");

        for (var i = 0; i < maxStoryCount + 1; i++) {
          var info = {};

          // title
          info.title = titles[i].textContent;

          // image - needs to be parsed since img and desc are encoded together as CDATA
          var grabImage = $.parseHTML(descriptions[i].textContent)[0].childNodes[0];
          info.image = grabImage.src;

          // link
          info.link = links[i].textContent;

          // description - needs to be parsed since img and desc are encoded together as CDATA
          var grabDesc = $.parseHTML(descriptions[i].textContent)[0].innerText;
          info.description = grabDesc;

          feed[i] = info;
        }
        return feed;
      }

      // function addNextImages(data) {
      //   for (let i = 0; i < maxStoryCount; i++) {
      //     const img = $('<img />', {
      //       src: data[i].image,
      //       class: 'news-feed-next-image',
      //       'data-story-next-id': i,
      //     });
      //     $('.news-feed-next-image-container').append(img);
      //   }
      // }

      function addStory(data) {
        for (var i = 0; i < maxStoryCount + 1; i++) {
          var container = $('<div/>', {
            class: 'news-feed-item',
            style: 'display: none',
            'data-story-id': i
          });
          var imgContainer = $('<div/>', {
            class: 'news-feed-image-container'
          });
          var img = $('<img />', {
            src: data[i].image,
            class: 'news-feed-image',
            alt: data[i].title
          });

          $(imgContainer).append(img);
          $(container).append(imgContainer);
          $(container).append('\n            <div class="news-feed-details">\n              <div class="section-title">In the news</div>\n              <p class="news-feed-title">' + data[i].title + '</p>\n              <div class="news-feed-description">\n                ' + data[i].description + '\n              </div>\n              <a href="' + data[i].link + '" class="news-feed-link">\n                Read the full story.\n              </a>\n            </div>\n          ');
          $('.news-feed').prepend(container);
        }
      }

      function hideStories() {
        $('[data-story-id]').hide();
        $('[data-story-next-id]').hide();
      }

      function displayStories(current) {
        hideStories();
        $('[data-story-id=' + current + ']').show();
        $('[data-story-next-id=' + (current + 1) + ']').show();
      }

      // add onclick handler for button
      $('#news-feed-next').click(function () {
        displayStories(counter);
        // logic to restart slider after the last story
        if (counter < maxStoryCount - 1) {
          counter++;
          $(this).text('next story');
        } else {
          counter = 0;
          $(this).text('first story');
        }
      });
    }
  };
}(document, Drupal, jQuery);
//# sourceMappingURL=news.js.map
