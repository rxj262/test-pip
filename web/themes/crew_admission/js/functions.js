(function ($) {

  var BREAKPOINTS = [
    { name: "small", size: 768 },
    { name: "medium", size: 992 },
    { name: "large", size: 1200 },
  ]
  function isBreakpoint (size) {
    var thisSize = BREAKPOINTS.filter(function(breakpoint) {
      return breakpoint.name === size;
    });
    return $(window).width() > thisSize[0].size ? false : true;
  }

  // Home page hero rotating text
  var duration = 2500;
  var current = 1;
  var ticker = $('.hero__title--rotating');
  var height = ticker.height();
  var number = ticker.children().length;
  var first = ticker.children().first();

  setInterval(function () {
    var interv = current * -1 * height;
    first.css('margin-top', interv + 'px');
    if (current === number) {
      first.css('margin-top', '0px');
      current = 1;
    }
    else {
      current++;
    }
  }, duration);

  // Check if you are using a mobile browser
  var isMobile = false; //initiate as false
  // device detection
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

  function isChrome() {
    var isChromium = window.chrome,
      winNav = window.navigator,
      vendorName = winNav.vendor,
      isOpera = winNav.userAgent.indexOf("OPR") > -1,
      isIEedge = winNav.userAgent.indexOf("Edge") > -1,
      isIOSChrome = winNav.userAgent.match("CriOS");

    if (isIOSChrome) {
      return true;
    } else if (
      isChromium !== null &&
      typeof isChromium !== "undefined" &&
      vendorName === "Google Inc." &&
      isOpera === false &&
      isIEedge === false
    ) {
      return true;
    } else {
      return false;
    }
  }
  var isChrome = isChrome();

  // Main nav toggle
  $(document).ready(function () {
    $('#menu-button-dropdown').click(function() {
      $(this).toggleClass('menu-toggle-active');
      $('.navbar__main>nav').slideToggle();
      return false;
    });
    $(document).click(function (e) {
      if ($('.menu-toggle').hasClass('menu-toggle-active') && !$(e.target).closest('.navbar__main').length) {
        $('.menu-toggle').toggleClass('menu-toggle-active');
        $('.navbar__main>nav').slideToggle();
      }
    });
  });

  // Map overlay to stop scroll
  $(document).ready(function () {
    var mapIframe = $("iframe[src^='https://www.google.com/maps']");
    if (mapIframe.length > 0) {
      mapIframe.before('<div onclick="style.pointerEvents=' + "'none'" + '" style="background:transparent;position:absolute;width:' + mapIframe[0].width + ';height:' + mapIframe[0].height + 'px;"></div>');
    }
  });

  // Academics page dropdowns
  var academicsPage = $('.academics-container');
  function academicDropdowns () {
    if (academicsPage.length > 0) {
      $('fieldset>legend').click(function() {
        if (isBreakpoint('medium')) {
          $(this).next().slideToggle();
        }
      });
      $(':checked').each(function() {
        $(this).parentsUntil('fieldset').css('display', 'block');
      });
    }
  }
  $(document).ajaxSuccess(function () {
    academicDropdowns();
  });
  

  // Hero background images
  // grab url from img and picture source tags and store them in an array
  var srcsets = [$('.field--name-field-field-uga-landing-hero-ref picture img').attr('src')];
  $('.field--name-field-field-uga-landing-hero-ref picture source').each(function(){
    srcsets.push($(this).attr('srcset'));
  });
  // create 4 style tags in head for each media query and default value
  $('head').append('<style type="text/css">header.hero { background-image: url("' + srcsets[0] + '") }</style>');
  $('head').append('<style type="text/css">@media screen and (max-width: 767px){ header.hero { background-image: url("' + srcsets[1] + '") }}</style>');
  $('head').append('<style type="text/css">@media screen and (max-width: 991px){ header.hero { background-image: url("' + srcsets[2] + '") }}</style>');
  $('head').append('<style type="text/css">@media screen and (max-width: 1199px){ header.hero { background-image: url("' + srcsets[3] + '") }}</style>');

  // //Gallery Accessibility fixes
  // function addImageIds() {
  //   var checkForGalleries = $('.standard-gallery-holder');
  //   // Check for galleries on the page
  //   if (checkForGalleries.length > 0) {
  //     // For accessibility match image to descriptor
  //     checkForGalleries.each(function() {
  //       $(this).find(".slick__slide[aria-describedby^='slick']").each(function() {
  //         var idHolder = $(this).attr('aria-describedby');
  //         $(this).find('img').attr('id', idHolder);
  //       });
  //     });
  //   }
  // }

  // // Standard Gallery
  // function galleryLoader() {
  //   var checkForGalleries = $('.standard-gallery-holder');
  //   // Check for galleries on the page
  //   if (checkForGalleries.length > 0) {
  //     // For accessibility match image to descriptor
  //     checkForGalleries.each(function() {
  //       var altHolder = [];
  //       $(this).find(".slick--main .slick__slide[aria-describedby^='slick']").each(function() {
  //         var idHolder = $(this).attr('aria-describedby');
  //         $(this).find('img').attr('id', idHolder);
  //         altHolder.push($(this).find('img').attr('alt'));
  //       });
  //       $(this).find(".slick--thumbnail .slick__slide[aria-describedby^='slick']").each(function(i) {
  //         var idHolder = $(this).attr('aria-describedby');
  //         $(this).find('img').attr('id', idHolder);
  //         $(this).find('img').attr('alt', altHolder[i]);
  //       });
  //     });
  //     // If you have galleries iterate through and make adjustments
  //     checkForGalleries.each(function() {
  //       // Size main image and thumbnail section below
  //       var mainImageDisplay = $(this).find('.slick--main .slide--0 img');
  //       var mainContainerDisplay = $(this).find('.slick--thumbnail');
  //       if (mainImageDisplay.length > 0) {
  //         $(this).find('.slick--main').css({ 'max-width': mainImageDisplay[0].getAttribute("width") + 'px', 'max-height': mainImageDisplay[0].getAttribute("height") + 'px' });
  //         $(this).find('.slick--thumbnail').css({ 'max-width': mainImageDisplay[0].getAttribute("width") + 'px' });
  //       }
  //       function waitForElement(elementPath, finalWidth) {
  //         window.setTimeout(function() {
  //           ($(elementPath).length) ? endit(elementPath, finalWidth): waitForElement(elementPath, finalWidth);
  //         }, 250);
  //       }

  //       function endit(elementPath, finalWidth) {
  //         // Resize the slick thumbnail track
  //         $(elementPath).width(Number(finalWidth) + 12);
  //         $('.slick--thumbnail .slick-track').css({ "opacity": 1 });
  //         // Fix Thumbnails
  //         var thumbGroup = $('.slick--thumbnail .slick-slide');
  //         thumbGroup.each(function() {
  //           $(this).width((Number(finalWidth) + 12) / 5);
  //         });
  //         $('.slick-wrapper').on('click mouseup mouseleave touchend beforeChange afterChange', function() {
  //           $('.slick--thumbnail .slick-track').css({ "left": "0", "width": (Number(finalWidth) + 12) });
  //           var thumbGroup = $('.slick--thumbnail .slick-slide');
  //           thumbGroup.each(function() {
  //             $(this).width((Number(finalWidth) + 12) / 5);
  //           });
  //         });
  //         window.setTimeout(function() {
  //           $('.slick-wrapper').click();
  //         }, 200);
  //       }
  //       if (mainImageDisplay.length > 0) {
  //         var correctWidth = (mainContainerDisplay[0].clientWidth < mainImageDisplay[0].getAttribute("width")) ? mainContainerDisplay[0].clientWidth : mainImageDisplay[0].getAttribute("width");
  //         waitForElement('.slick--thumbnail .slick-track', (mainContainerDisplay[0].clientWidth < mainImageDisplay[0].getAttribute("width")) ? mainContainerDisplay[0].clientWidth : mainImageDisplay[0].getAttribute("width"));
  //       }
  //       // for responsiveness, if gallery above text section, move it below
  //       if (isBreakpoint("medium") && $(this).parent().next().children($('.paragraph--type--uga-general-content')).length > 0) {
  //         console.log($(this));
  //         var fieldItem = $(this).parent();
  //         fieldItem.next().insertBefore(fieldItem);
  //       }
  //     });
  //   }
  // }
  // $(document).on('ready load', function() {
  //   $('.slick--thumbnail .slick-track').css({ "opacity": 0 });
  //   galleryLoader();
  // });
  // $(window).on('resize', function() {
  //   galleryLoader();
  // });

  // Table responsive wrapper
  if ($('table').length) {
    $('table').wrap("<div class='table-responsive'></div>");
  }

  // Academics page title
  function academicsFixes() {
    $('.academics-container .view-content').prepend($('.academics-container .view-header'));
    $('.academics-container input[type="text"]').attr('aria-label', 'search').attr('role', 'search').attr('placeholder', 'SEARCH PROGRAMS').attr('onfocus', "this.placeholder = ''").attr('onblur', "this.placeholder = 'SEARCH PROGRAMS'");
  }
  $(window).on('load', function () {
    academicsFixes();
  });
  var resetAjax = 0;
  $(document).ajaxSuccess(function () {
    academicsFixes();
    resetAjax ++;
    if (resetAjax > 1 ) {
      // Slide to the top of the frame
      var shouldItScroll = $('.view-header');
      if (shouldItScroll.length > 0 && isMobile) {
        $('html,body').animate({scrollTop: ($('.view-header').offset().top - 20)});
      }
    }
  });

  if ($('.academics-container input[type="text"]').length > 0) {
    var textfield = $('.academics-container input[type="text"]');
    var button = $('<button/>', {
      text: 'X',
      type: 'button',
      class: 'clearSearch'
    });
    button.click(function() {
      clearSearch(textfield, button);
      return false;
    })
    textfield.after(button);
    button.hide();

    textfield.keyup(function() {
      if ($(this).val()) {
        button.fadeIn("fast").css('display','inline-block');
      }
      else {
        button.fadeOut("fast");
      }
    })
    function clearSearch(input, button) {
       input.val('');
       button.fadeOut("fast");
    }
  }

  // Gallery of faces interaction
  $('.face-gallery__container').on('click', function () {
    $(this).siblings().toggleClass('hidden');
    $(this).toggleClass('active');
  });

  // Apply page tabs
  var tabs = $('.field--name-field-apply-step-group-title').add('.field--name-field-uga-tab-title');
  var steps = $('.steps').add('.tab-content');

  tabs.wrapAll("<div class='tab-container' />");
  $('.tab-container').prepend('<div class="tab-contianer__line"></div>');

  steps.hide().first().show();
  steps.first().find('.step-wrapper').hide().first().show();
  steps.each(function (index) {
    $(this).attr('data-tab-group', index);
  });

  tabs.first().addClass('active');
  tabs.each(function (index) {
    $(this).attr('data-tab-button', index);
    if (index > 0) {
      $(this).insertAfter(tabs[index - 1]);
    }
  });
  tabs.click(function () {
    tabs.removeClass('active');
    $(this).addClass('active');

    // move green line behind tabs up and down for mobile
    if (isBreakpoint("small")) {
      var top = (($(this).index() - 1 ) * 95) + 45;
      $('.tab-contianer__line').css('top', top + 'px');
    }

    steps.hide();
    $('[data-tab-group="' + $(this).data('tabButton') + '"]').fadeIn('slow').find('.step-wrapper').hide().first().show();
    hideArrows();
  });

  hideArrows();

  $('.step__arrow.arrow--next').click(function () {
    $('.step-wrapper:visible').hide().next().show();
    hideArrows();
  });

  $('.step__arrow.arrow--prev').click(function () {
    $('.step-wrapper:visible').hide().prev().show();
    hideArrows();
  });

  function hideArrows() {
    $('.arrow--prev').show();
    $('.arrow--next').show();

    if ($('.step-wrapper:visible').prev('.step-wrapper').length === 0) {
      $('.arrow--prev').hide();
    }
    if ($('.step-wrapper:visible').next('.step-wrapper').length === 0) {
      $('.arrow--next').hide();
    }
  }
  $(window).on('load', function () {
    var maxTabWidth = 0;
    $('.tab-container .field').each(function () {
      if ($(this).width() > maxTabWidth) { maxTabWidth = $(this).width(); }
    });
    $('.tab-container .field').each(function () {
      $(this).width(maxTabWidth + 1);
    });
  });

  // Face Gallery
  if ($('.face-gallery__group').length) {
    var expanded = false;
    var ANIMATIONTIMER = 2000;
    var galleryCount = $('.face-gallery__group').length - 1;
    var random = -1;
    var lastRandom = -1;

    function playRandomAnimation() {
      lastRandom = random;
      random = Math.floor(Math.random() * galleryCount);
      while (random === lastRandom) {
        random = Math.floor(Math.random() * galleryCount);
      }
      var randomGalleryItem = $('.face-gallery__group').eq(random);

      var thisImage = randomGalleryItem.find('.field--name-field-portrait-grid-static-image img');
      var srcStatic = thisImage.attr("src");
      var srcAnimated = randomGalleryItem.find('.field--name-field-portrait-grid-img-animated img').attr("src");

      thisImage.attr("src", srcAnimated);

      window.setTimeout(function () {
        thisImage.attr("src", srcStatic);
      }, ANIMATIONTIMER);
    }

    if (!expanded) {
      window.setInterval(function () {
        playRandomAnimation();
      }, ANIMATIONTIMER);
    }

    $('.face-gallery__group').each(function () {
      $(this).find('.field--name-field-portait-static-lg-img-ref').hide();
      $(this).find('.field--name-field-portrait-grid-img-animated').hide().find('img').removeAttr("title");
      $(this).find('.face-gallery__text').hide();

      var thisImage = $(this).find('.field--name-field-portrait-grid-static-image img');
      var srcStatic = thisImage.attr("src");
      var srcAnimated = $(this).find('.field--name-field-portrait-grid-img-animated img').attr("src");

      $(this).mouseenter(function () {
        if (!expanded) {
          thisImage.attr("src", srcAnimated);
        }
      });
      $(this).mouseleave(function () {
        if (!expanded) {
          thisImage.attr("src", srcStatic);
        }
      });

      $(this).click(function () {
        var lgImage = $(this).find('.field--name-field-portait-static-lg-img-ref');
        var text = $(this).find('.face-gallery__text');

        if (expanded) {
          lgImage.fadeOut();
          text.fadeOut();
          $('.portrait-text-outside').remove();
          expanded = false;
        }
        else {
          lgImage.fadeIn();
          if (isBreakpoint("small")) {
            text.clone().insertAfter($('.face-gallery')).slideDown().addClass('portrait-text-outside');
          }
          else {
            text.fadeIn();
          }
          expanded = true;
        }
      });
    });

    // face gallery hide large image if clicking anywhere.
    $(document).click(function (e) {
      if (expanded && !$(e.target).closest('.face-gallery__group').length) {
        $(this).find('.field--name-field-portait-static-lg-img-ref').fadeOut();
        $(this).find('.face-gallery__text').fadeOut();
        $('.portrait-text-outside').remove();
        expanded = false;
      }
    });
  }

  // Contacts page, emails
  if ($('.counselor__block-left').length) {
    $('.counselor__block-left').each(function () {
      if ($(this).find('a').length) {
        var firstName = $(this).find('h2').text().split(" ");
        $(this).find('a').text("Email " + firstName[0]);
        if (firstName.length > 2) {
          $(this).find('a').text("Email " + firstName[0] + " " + firstName[1]);
        }
      }
    });
  }

  // Alternating subfeatures responsiveness
  if ($('.alternating-subfeatures--image-right').length && isBreakpoint("medium")) {
    $('.alternating-subfeatures--image-right').each(function () {
      $(this).find('.row').prepend($(this).find($('.alternating-subfeatures__image')));
    });
  }

  // If page title has long words, add class to shrink size
  if ($('.page-title').length) {
    $('.page-title .field--name-title').text().split(" ").map(function(word) {
      if (word.length > 12) {$('.page-title').addClass('long-title-fix')};
    });
  }

  // Accordion in apply page
  var accordionWrapper;

  if ($('.field--name-field-accordion-1-ref').length) {
    accordionWrapper = $('.field--name-field-accordion-1-ref');
  }
  else if ($('.field--name-field-uga-accordion-ref').length) {
    accordionWrapper = $('.field--name-field-uga-accordion-ref');
  }

  if (accordionWrapper) {
    var accordionSections = accordionWrapper.children('.field__item');
    var accordionTitle = accordionSections.find('.field--name-field-uga-accordion-title');
    var accordionDescr = accordionSections.find('.field--name-field-uga-accordion-content').hide();

    accordionTitle.each(function () {
      $(this).prepend('<span class="plusMinus">+</span>');
    });

    accordionTitle.click(function () {
      var target =  $(this).next();

      if(!target.hasClass('active')){
         accordionDescr.removeClass('active').slideUp();
         accordionTitle.children('.plusMinus').text('+');
         target.addClass('active').slideDown();
         $(this).children('.plusMinus').text('-');
      } else {
        target.removeClass('active').slideUp();
        $(this).children('.plusMinus').text('+');
      }

    return false;
    });
  }

;
  // redirect from 404 to homepage in 5 seconds
  $.post(window.location).fail(function(){
    window.setTimeout(function(){
      window.location = window.location.protocol + "//" + window.location.host + drupalSettings.path.baseUrl;
    }, 5000);
  });

  // temp twitter x fix 10032023 until FA6 is installed
  colorChange = function () {
    var color = $(this).css("color");
    $(this).find($('svg')).css("fill", color);
  };

  if ($('.fa-twitter').length) {
    $('i.fa-twitter').each(function() {
      var color = $(this).parent().css("color");
      $(this).append('<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>');
      $(this).find($('svg')).css("fill", color);
      $(this).parent().hover(colorChange);
    });
    $('a.fa-twitter').each(function() {
      var color = $(this).css("color");
      $(this).append('<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>');
      $(this).find($('svg')).css("fill", color);
      $(this).hover(colorChange);
    });
  }

})(jQuery);
