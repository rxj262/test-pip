!((document, Drupal, $) => {
  'use strict';

  Drupal.behaviors.news = {

    attach: function () {
      let counter = 1;
      let maxStoryCount = 4;

      $.ajax({
        url: 'https://thedaily.case.edu/feed/?tag=entrepreneurship,innovation',
        type: 'GET',
        dataType: 'xml'
      }).done(function (xml) {
        const data = getDataObject(xml);
        // addNextImages(data);
        addStory(data);
        displayStories(0);
      });

      function getDataObject(data) {
        let feed = {};
        const titles = data.querySelectorAll("channel item title");
        const links = data.querySelectorAll("channel item link");
        const descriptions = data.querySelectorAll("channel item description");

        for (let i = 0; i < maxStoryCount + 1; i++) {
          let info = {};

          // title
          info.title = titles[i].textContent;

          // image - needs to be parsed since img and desc are encoded together as CDATA
          const grabImage = $.parseHTML(descriptions[i].textContent)[0].childNodes[0];
          info.image = grabImage.src;

          // link
          info.link = links[i].textContent;

          // description - needs to be parsed since img and desc are encoded together as CDATA
          const grabDesc = $.parseHTML(descriptions[i].textContent)[0].innerText;
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
        for (let i = 0; i < maxStoryCount + 1; i++) {
          const container = $('<div/>', {
            class: 'news-feed-item',
            style: 'display: none',
            'data-story-id': i
          });
          const imgContainer = $('<div/>', {
            class: 'news-feed-image-container',
          });
          const img = $('<img />', {
            src: data[i].image,
            class: 'news-feed-image',
            alt: data[i].title
          });

          $(imgContainer).append(img);
          $(container).append(imgContainer);
          $(container).append(`
            <div class="news-feed-details">
              <div class="section-title">In the news</div>
              <p class="news-feed-title">${data[i].title}</p>
              <div class="news-feed-description">
                ${data[i].description}
              </div>
              <a href="${data[i].link}" class="news-feed-link">
                Read the full story.
              </a>
            </div>
          `);
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
        $('[data-story-next-id=' + (
          current + 1) + ']').show();
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
})(document, Drupal, jQuery);
