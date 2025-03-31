
(function ($) {
  var BREAKPOINTS = [
    { name: "small", size: 768 },
    { name: "medium", size: 992 },
    { name: "large", size: 1200 },
  ]
  function isBreakpoint(size) {
    var thisSize = BREAKPOINTS.filter(function (breakpoint) {
      return breakpoint.name === size;
    });
    return $(window).width() > thisSize[0].size ? false : true;
  }

  // helper function to check for a horizontal scrollbar
  $.fn.hasScrollBarX = function () {
    return this.get(0).scrollWidth - this.parent().width() > 5;
  }

  function checkBreakpoint(pixels) {
    return $(window).width() < pixels
      ? true
      : false
  }

  // Check if you are using a mobile browser
  var isMobile = false; //initiate as false
  // device detection
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

  // ACCORDIONS
  // adds attributes to make them collapsible
  var accordion_call = function () {
    var accordions = [...document.querySelectorAll('.paragraph--type--accordion, .sub-accordion')];
    accordions.map(function (accordion, index) {
      accordion.setAttribute('id', 'accordion_' + index);
      var links = [...accordion.querySelectorAll('a.accordion-toggle')];
      links.map(function (link, linkIndex) {
        link.setAttribute('data-parent', 'accordion_' + index);
        link.setAttribute('href', '#collapse_' + index + '_' + linkIndex);
      });
      var contents = [...accordion.querySelectorAll('.field--name-field-accordion-section-content, .sub-accordion-section-content')];
      contents.map(function (content, contentIndex) {
        content.setAttribute('id', 'collapse_' + index + '_' + contentIndex);
        content.classList.add("collapse");
      });
    });
    $('[data-toggle="collapse"]').click(function () {
      $('.collapse.in').collapse('hide');
    });
  }
  // wrap the accordion call in a function so HR form sorter views filter can use it
  accordion_call();

  // opens all accordion bodies on press - ctrl+f, cmd+f, or F3
  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 114 || ((e.ctrlKey || e.metaKey) && e.keyCode === 70)) {
      [...document.querySelectorAll('a.accordion-toggle')].map(function (title) {
        title.classList.remove('collapsed')
      });
      [...document.querySelectorAll('.field--name-field-accordion-section-content, .sub-accordion-section-content')].map(function (content) {
        content.classList.add('in');
        content.style.height = ""; // when collapsing content, height=15px is added. remove or else text will overlap.
      });
      // open all tabs too...
      $('div.tab-content > .tab-pane').addClass('active');
    }
  });


  $(window).resize(function () {
    if (window.location.href.indexOf("law") > -1) {
      if ($(window).width() >= 992) {
        $('.page-head .container > div').css("width", "auto");
      }
    }
  });

  $(document).ready(function () {
    if (isMobile) {
      $('.field--name-field-accordion-section-title > .h3').click((event) => {
        setTimeout(function () {
          $([document.documentElement, document.body]).animate({
            scrollTop: $(event.target).offset().top
          }, 100);
        }, 350);
      });
    }

    //Fix aria-atomic accessibility issue on div tags
    $('div[role=alert]').each(function () {
      if (!$(this).attr("aria-atomic")) {
        $(this).attr("aria-atomic", "true");
      }
    });
    $('div[aria-live=assertive]').each(function () {
      if (!$(this).attr("aria-atomic")) {
        $(this).attr("aria-atomic", "true");
      }
    });

    // fix slick_slide aria-describedby issue
    if ($('.slick').length > 0) {
      $('.slick').each(function () {
        $(this).find(".slick__slide[aria-describedby^='slick']").each(function () {
          var idHolder = $(this).attr('aria-describedby');
          $(this).find('img').attr('id', idHolder);
        });

        // move gallery arrows to center of img instead of img+caption
        var galleryHeight = $(this).find('.slick__slider').first().height();
        var imgHeight = $(this).find('.slick__slide img').first().height() / 2;
        var newHeight = Math.round((imgHeight * 100) / galleryHeight) + '%';
        $(this).find('.slick__arrow').css('top', newHeight);

        if ($('.youtube-icon').length > 0 && $('.slick__arrow').length > 0) {
          $(this).find('.object').css({ 'top': newHeight, "margin-top": "32px" });
        }
      });
    }

    // if sidebar is taller than content, show gray border on sidebar instead
    var sidebarHolder = $('.sidebar-desktop');
    var contentHolder = $('.has-sidebar');
    if (sidebarHolder.height() > contentHolder.height()) {
      contentHolder.css('border-left', 'none');
      sidebarHolder.css({ 'margin-bottom': '0px', 'padding-bottom': '36px', 'border-right': '1px solid $lighter-gray' });
    };

    if ($('.content-col').length && $('.sidebar-col').length) {
      window.setTimeout(rightSidebarBorder, 200);
      var tryThreeTimes = 0;
      function rightSidebarBorder() {
        var contentCol = $('.content-col');
        var rightSidebarCol = $('.sidebar-col');
        if (rightSidebarCol.height() > contentCol.height() && tryThreeTimes <= 3) {
          contentCol.removeClass('border-right');
          rightSidebarCol.addClass('border-left');
        } else {
          tryThreeTimes++;
          window.setTimeout(rightSidebarBorder, 200);
        }
      }
    }

    // hide asides if they are empty (no content)
    if ($('.paragraph--type--aside').length > 0) {
      $('.paragraph--type--aside').each(function () {
        if ($(this.clientHeight)[0] <= 2) {
          $(this).css('display', 'none');
        }
      });
    }

    // move asides down on basic page
    var movedDown = false;
    function moveAside() {
      if ($('.basic-page .field--name-field-aside-ref').length > 0) {
        aside = $('.basic-page .field--name-field-aside-ref');

        if (checkBreakpoint(991) && !movedDown) {
          $('.basic-page > .content').append(aside);
          movedDown = true;
        } else if (!checkBreakpoint(991) && movedDown) {
          $('.basic-page > .content').prepend(aside);
          movedDown = false;
        }
      }
    }
    moveAside();

    $(window).resize(function () {
      moveAside();
    });

    // re-group accordions when HR form exposed filter is in use, maybe this should go to HR's js dir...
    if ($('.sub-accordion').length > 0) {
      $(document).ajaxSuccess(function () {
        accordion_call();
      });
    }

    // external link goes to new tab
    $('.content a').filter(function () {
      return this.hostname && this.hostname !== location.hostname && this.hostname.indexOf('case.edu') == -1;
    }).attr('target', '_blank');

    // lock icon for private files TODO: this is not working now probably because linkit generates the media file link after this script is run, thus unable to match the actual href...
    // $('.content a').append("<span class='fa fa-lock'> </span>");

    //tabs
    if ($('.field--item .tab-group').length) {
      $('.field--item .tab-group').each(function () {
        $(this).find('.nav-tabs li a').first().tab('show');
        // TABDROP IS OFF: CURRENTLY ONLY WORK IF TABS ARE FIRST PARAGRAPH ON PAGE
        // $(this).find($('.nav-tabs')).tabdrop({
        //   text: '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>&nbsp;<i class="fa fa-angle-down" aria-hidden="true"></i>'
        // });
      });
    }

    // responsive tables
    if ($('.content table').length) {
      $('.content table').each(function () {
        if (!$(this).attr('class')) {
          $(this).wrap("<div class='table-responsive'></div>").css('margin-bottom', '0');
        }
        if ($(this).hasScrollBarX()) $(this).parent().addClass('has-scrollbar-x');
      });
    }
    $(".has-scrollbar-x").on("scroll", function () {
      $(this).removeClass('has-scrollbar-x');
    });

    //make acquia content hub page links (bio/personal_profile) open in a new tabs
    if ($('.toolbar-menu').length > 0) {
      // hide extra menu links for media
      linkholder = $('a[data-drupal-link-system-path="admin/content/media"]')[0].href.replace("admin/content/media", "media/add");
//      $('a[data-drupal-link-system-path="admin/content/media"]').parent().addClass("menu-item--expanded").append('<ul class="toolbar-menu"><li class="menu-item"><a href="' + linkholder + '" class="toolbar-icon" data-drupal-link-system-path="media/add">Add Media</a></li></ul>');
      $('a[data-drupal-link-system-path="media/add"]+ul li').hide();
      $('a[data-drupal-link-system-path="media/add"]+ul a[data-drupal-link-system-path="media/add/document"]').parent().show();
      $('a[data-drupal-link-system-path="media/add"]+ul a[data-drupal-link-system-path="media/add/image"]').parent().show();
      if ($('a[data-drupal-link-system-path="media/add"]+ul a[data-drupal-link-system-path*="media/add/private_file"]').length > 0) {
        $('a[data-drupal-link-system-path="media/add"]+ul a[data-drupal-link-system-path*="media/add/private_file"]').parent().show();
      }

      // add content hub links to all sites, and sort them alphabetically
      //bio_link = '<li class="menu-item"><a href="http://cwru.prod.acquia-sites.com/biographies/caslogin" class="toolbar-icon">Biographies - Content Hub</a></li>';
      //$('a.toolbar-icon-admin-toolbar-tools-extra-linksnode-add+ul').append(bio_link);
      //      pp_link = '<li class="menu-item"><a href="http://cwru.prod.acquia-sites.com/personalprofiles/caslogin" class="toolbar-icon">Personal Profiles - Content Hub</a></li>';
      //      $('a.toolbar-icon-admin-toolbar-tools-add-content+ul').append(pp_link);

      // function asc_sort(a, b) {
      //   return ($(b).text()) < ($(a).text())
      //       ? 1
      //       : -1;
      // }
      //$('a.toolbar-icon-admin-toolbar-tools-extra-linksnode-add+ul li').sort(asc_sort).appendTo('a.toolbar-icon-admin-toolbar-tools-extra-linksnode-add+ul');
      // make sure they open in new tabs
      //$('.toolbar-menu a[href="http://cwru.prod.acquia-sites.com/biographies/caslogin"], ' + '.toolbar-menu a[href="http://cwru.prod.acquia-sites.com/personalprofiles/caslogin"]').attr("target", "_blank"); //dev ENV
    }

    // break up article date into spans so they can be styled
    if ($('.views-field-field-article-date').length > 0) {
      $('.views-field-field-article-date .field-content').each(function () {
        var split = $(this).text().trim().split(' ');
        var monthwrap = "<span class='month'>" + split[0] + "</span>";
        var daywrap = "<span class='day'>" + split[1] + "</span>";
        $(this).html(monthwrap + daywrap);
      });
    }
    if ($('#edit-current').length > 0) {
      $('#edit-current > label')[0].innerText = "Current State";
      $('#edit-submit')[0].innerText = "Apply";
    };

    var departmentsPage = $('.view-student-life-departments');
    function departmentDropdowns() {
      if (departmentsPage.length > 0) {
        $('fieldset>legend').click(function () {
          if (checkBreakpoint(991)) {
            $(this).next().slideToggle();
          }
        });
        $(':checked').each(function () {
          $(this).parentsUntil('fieldset').css('display', 'block');
        });
      }
    }
    var successcounter = 0;
    function scrollIntoView() {
      if (departmentsPage.length > 0 && isMobile) {
        $('html,body').animate({ scrollTop: ($('.view-content>.sl-view-block').first().offset().top - 20) });
      }
    }

    function scrollView(scrollBelow) {
      $('html,body').animate({ scrollTop: (scrollBelow.offset().top - 20) });
    }

    var cancerView = $('.cancer-list-view');

    departmentDropdowns();
    $(document).ajaxSuccess(function () {
      departmentDropdowns();
      scrollIntoView();
      if (successcounter > 1 && cancerView.length > 0 && isMobile) {
        scrollView($('.view-content'));
      }
      successcounter++;
    });
  });

  // Mobile Menu Fixes
  $('.arrow').click(function (e) {
    e.preventDefault();
    var menu = $(this).parent().next('ul');
    (menu.is(":visible"))
      ? menu.slideUp(300)
      : menu.slideDown(300);
  });

  // if dropdown menu is off-page, move left
  if ($('#block-crew-main-menu .expanded.dropdown').length > 0) {
    var navWidth = $('.navbar-header').width();
    var lastDropdown = $('#block-crew-main-menu .expanded.dropdown').last();
    var lastDropdownLeft = lastDropdown[0].offsetLeft;
    var lastDropdownMenu = lastDropdown.find('ul.dropdown-menu');
    var lastDropdownWidth = lastDropdownMenu.width();
    var dropdownExcess = navWidth - (lastDropdownLeft + lastDropdownWidth);
    if (dropdownExcess < 0) {
      lastDropdownMenu.addClass('pull-right');
    }
  }

  // Required for go to top button at the footer
  var handleContentHeight = function () {
    return;
    var height;

    if ($('body').height() < App.getViewPort().height) {
      height = App.getViewPort().height - $('.page-header').outerHeight() - ($('.page-container').outerHeight() - $('.page-content').outerHeight()) - $('.page-prefooter').outerHeight() - $('.page-footer').outerHeight();

      $('.page-content').css('min-height', height);
    }
  };

  // Handles the go to top button at the footer
  var handleGoTop = function () {
    var offset = 100;
    var duration = 500;

    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) { // ios supported
      $(window).bind("touchend touchcancel touchleave", function (e) {
        if ($(this).scrollTop() > offset) {
          $('.scroll-to-top').fadeIn(duration);
        } else {
          $('.scroll-to-top').fadeOut(duration);
        }
      });
    } else { // general
      $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
          $('.scroll-to-top').fadeIn(duration);
        } else {
          $('.scroll-to-top').fadeOut(duration);
        }
      });
    }

    $('.scroll-to-top').click(function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, duration);
      return false;
    });
  };
  handleContentHeight(); // handles content height
  handleGoTop(); //handles scroll to top functionality in the footer

  //Rearranging page-header and hero image
  if ($(".field--name-field-hero-landing-image-ref")[0]) {
    if ($(".robust-content-small").length) {
      $(".page-header").prependTo(".robust-content-small");
    } else if ($('.section-nav').length) {
      // stop this from affecting sites with section-nav (law)
      // return false;
    } else {
      $(".page-header").insertAfter(".paragraph--type--hero-landing-page");
    }
  }
  //Rearranging page-header and hero image
  if ($(".field--name-field-hero-one-image-ref")[0]) {
    if ($(".robust-content-small").length) {
      $(".page-header").prependTo(".robust-content-small");
    } else {
      $(".page-header").insertAfter(".paragraph--type--hero-one-column");
    }
  }

  //removes gray background from subfeature field item if there is no text in it
  $('.field--name-field-subfeature-section-ref > .field--item').each(function () {
    if (!$(this).text().trim().length) {
      $('.field--name-field-subfeature-section-ref > .field--item').css('background-color', 'white');
    }
  });

  // mcintyre-lab homepage video width adjustment
  if ($(".paragraph--view-mode--mcintyre-vid").length) {
    $(".paragraph--view-mode--mcintyre-vid .field--name-field-video-embed .field--item").removeClass("col-md-6").addClass("col-xs-12");
  }

  // law school secondary nav styling
  if (window.location.href.indexOf("law") > -1) {
    if ($(window).width() >= 992) {
      $('.page-head .container > div').css("width", "auto");
    }
  }

  // remove a 1px border on give website
  if (window.location.href.indexOf("give") > -1) {
    $('.page-head').css("border-bottom", "none");
  }

  // hide alumni, students, and faculty-staff from dental main navigation & mobile
  // console.log(drupalSettings.path.baseUrl);
  if (window.location.href.indexOf("dental") > -1) {
    $('ul[block="block-crew-main-menu"] a[href$="/student"]').parent().css("display", "none");
    $('ul[block="block-crew-main-menu"] a[href$="/alumni-friends"]').parent().css("display", "none");
    $('ul[block="block-crew-main-menu"] a[href$="/faculty-staff"]').parent().css("display", "none");
  }

  // hide alumni, students, and faculty-staff from socialwork main navigation & mobile
  // console.log(drupalSettings.path.baseUrl);
  if (window.location.href.indexOf("socialwork") > -1) {
    $('ul[block="block-crew-socialwork-main-menu"] a[href$="/resources-alumni"]').parent().css("display", "none");
    $('ul[block="block-crew-socialwork-main-menu"] a[href$="/resources-students"]').parent().css("display", "none");
    $('ul[block="block-crew-socialwork-main-menu"] a[href$="/resources-faculty-staff"]').parent().css("display", "none");
  }

  // hide secondary nav from weatherhead main navigation & mobile
  // console.log(drupalSettings.path.baseUrl);
  if (window.location.href.indexOf("weatherhead") > -1) {
    $('ul[block="block-crew-weatherhead-main-menu"] a[href$="/students"]').parent().css("display", "none");
    $('ul[block="block-crew-weatherhead-main-menu"] a[href$="/alumni"]').parent().css("display", "none");
    $('ul[block="block-crew-weatherhead-main-menu"] a[href$="/faculty-and-staff"]').parent().css("display", "none");
    $('ul[block="block-crew-weatherhead-main-menu"] a[href$="/corporate-partners"]').parent().css("display", "none");
    $('ul[block="block-crew-weatherhead-main-menu"] a[href$="/employers"]').parent().css("display", "none");
  }

  // hide alumni, students, and faculty-staff from medicine mstp main navigation & mobile
  // console.log(drupalSettings.path.baseUrl);
  if (window.location.href.indexOf("mstp") > -1) {
    // $('ul[block="block-crew-main-menu"] a[href$="/alumni"]').parent().css("display", "none");
    $('ul[block="block-crew-main-menu"] a[href$="/current-students"]').parent().css("display", "none");
    // $('ul[block="block-crew-main-menu"] a[href$="/faculty-staff"]').parent().css("display", "none");
  }

  // hide faculty-staff from pqhs main navigation & mobile
  if (window.location.href.indexOf("pqhs") > -1) {
    $('ul[block="block-crew-main-menu"] a[href$="/faculty-and-staff-resources"]').parent().css("display", "none");
  }

  // hide students and faculty-staff from neurosciences main navigation & mobile
  // console.log(drupalSettings.path.baseUrl);
  if (window.location.href.indexOf("medicine/neurosciences") > -1) {
    // $('ul[block="block-crew-main-menu"] a[href$="/alumni"]').parent().css("display", "none");
    $('ul[block="block-crew-main-menu"] a[href$="/students"]').parent().css("display", "none");
    $('ul[block="block-crew-main-menu"] a[href$="/faculty-staff"]').parent().css("display", "none");
  }

  // hide undergrad students and grad students from bme main navigation & mobile
  // console.log(drupalSettings.path.baseUrl);
  if (window.location.href.indexOf("bme") > -1) {
    $('ul[block="block-crew-main-menu"] a[href$="/undergraduate-students"]').parent().css("display", "none");
    $('ul[block="block-crew-main-menu"] a[href$="/graduate-students"]').parent().css("display", "none");
  }

  // add secondary nav to all DOSA sites
  if (window.location.href.indexOf("studentlife") > -1) {
    var secondaryNavHtml = `<div class="secondary-nav-container">
        <nav role="navigation" aria-labelledby="block-secondarynavigation-menu" id="block-secondarynavigation">
            <h2 class="visually-hidden" id="block-secondarynavigation-menu">Secondary navigation</h2>
            <ul block="block-secondarynavigation" class="menu menu--secondary-navigation nav">
              <li class="first">
                <a href="https://my.case.edu/My/">My CWRU</a>
              </li>
              <li class="last">
                <a href="https://journey.case.edu/s/">My Journey</a>
              </li>
            </ul>
        </nav>
      </div>`

    $(".page-head .container .col-md-6").first().next().prepend(secondaryNavHtml);
  }
  //Add with-department class to all DOSA subsites
  if ((window.location.href.indexOf("studentlife/academicresources") > -1) || (window.location.href.indexOf("studentlife/accommodatedtesting") > -1) || (window.location.href.indexOf("studentlife/activities") > -1) || (window.location.href.indexOf("studentlife/careercenter") > -1) || (window.location.href.indexOf("studentlife/civicengagement") > -1) || (window.location.href.indexOf("studentlife/conduct") > -1) || (window.location.href.indexOf("studentlife/dean") > -1) || (window.location.href.indexOf("studentlife/disability") > -1) || (window.location.href.indexOf("studentlife/graduate") > -1) || (window.location.href.indexOf("studentlife/greek") > -1) || (window.location.href.indexOf("studentlife/healthcounseling") > -1) || (window.location.href.indexOf("studentlife/multicultural") > -1) || (window.location.href.indexOf("studentlife/residence") > -1) || (window.location.href.indexOf("studentlife/studentcenters") > -1) || (window.location.href.indexOf("studentlife/ugadvisingsupport") > -1) || (window.location.href.indexOf("studentlife/ugresearch") > -1)) {
    $(".secondary-nav-container").addClass("with-department");
  }

  // hide members from cancer main navigation & mobile
  // console.log(drupalSettings.path.baseUrl);
  //if (drupalSettings.path.baseUrl == '/cancer/') {
  //  $('ul[block="block-crew-main-menu"] a[href$="/members"]').parent().css("display", "none");
  //}

  // unhide additional job description from bstp site
  if (window.location.href.indexOf("medicine/bstp") > -1) {
    $('.paragraph--type--additional-job-descriptions div.hidden').removeClass('hidden');
  }

  if (window.location.href.indexOf("bstp") > -1) {
    $('.paragraph--type--additional-job-descriptions div.hidden').removeClass('hidden');
  }

  // hide alumni and employers on postgrad site, modify title field to manually break before word 'and'
  if (window.location.href.indexOf("studentlife/careercenter") > -1) {
    $('ul[block="block-crew-main-menu"] a[href$="/alumni"]').parent().css("display", "none");
    $('ul[block="block-crew-main-menu"] a[href$="/employers"]').parent().css("display", "none");
  }

  // hide alumni employers student and faculty&staff items on law site
  if (window.location.href.indexOf("law") > -1) {
    $('ul[block="block-crew-law-main-menu"] a[href$="/alumni"]').parent().css("display", "none");
    $('ul[block="block-crew-law-main-menu"] a[href$="/employers"]').parent().css("display", "none");
    $('ul[block="block-crew-law-main-menu"] a[href$="/faculty-staff"]').parent().css("display", "none");
    $('ul[block="block-crew-law-main-menu"] a[href$="/students"]').parent().css("display", "none");
  }

  if ($('.paragraph--type--hero-one-column').length >= 2 && $('.region-breadcrumbs .paragraph--type--hero-one-column').length >= 1) {
    $('.homepage-w-sidebar .paragraph--type--hero-one-column').hide();
  }

  // lifelonglearning want a second phone number...
  if (window.location.href.indexOf("lifelonglearning") > -1) {
    $('.footer__department-info p:nth-of-type(3) strong').html(
      "Campus Office:"
    );
    $('.footer__department-info p:nth-of-type(3)').append(
      "<p><strong>Beachwood Office:</strong> <a href='tel:216.368.2091'>216.368.2091</a></p>"
    );
  }



  // fix comma issue for biographies
  if ($('.field--name-field-biography-title-ref').length) {
    $('.field--name-field-biography-title-ref .paragraph--type--job-title-affiliation').each(function () {
      var str = '';
      var fields = $(this).find('.field');
      var total = fields.length;

      fields.each(function (index) {
        str += $(this).text().trim();
        if (index != total - 1) str += ', ';
      });

      $(this).html('<strong>' + str + '</strong>');
    });
  }

  //Student Life Homepage Grid
  $('.field--name-field-student-life-grid-descript').css('display', 'none');
  $('.subfeature-grid-img-text').hover(
    function () {
      if (!checkBreakpoint(768)) {
        $(this).find('.field--name-field-student-life-grid-descript').slideDown()
      }
    },
    function () {
      if (!checkBreakpoint(768)) {
        $(this).find('.field--name-field-student-life-grid-descript').slideUp()
      }
    }
  );

  // studentlife department page set BEF default value via query parameter
  if (window.location.pathname == '/studentlife/departments') {
    var urlParams = new URLSearchParams(window.location.search);
    // Return early in cases default value is not needed, such as a click on the main nav
    if (!urlParams.has('key')) {
      return;
    } else {
      var key = urlParams.get('key');
      var tid1 = '';
      // Map query parameters to term id which is used for filtering
      switch (key) {
        case 'career':
          tid1 = 736;
          break;
        case 'academic':
          tid1 = 731;
          break;
        case 'campus':
          tid1 = 941;
          break;
        case 'community':
          tid1 = 741;
          break;
        case 'engagement':
          tid1 = 726;
          break;
        case 'health':
          tid1 = 746;
          break;
        case 'involvement':
          tid1 = 751;
          break;
        case 'pride':
          tid1 = '756';
          break;
        default:
          tid1 = 'empty';
      }
      if (tid1 !== 'empty') {
        setTimeout(function () {
          $("#edit-tid-1-" + tid1).trigger("click");
        }, 1000);
      }
    }
  }

  if (window.location.pathname == '/international/about/newsletters') {
    $.fn.Feed = function () {
      var id = $(this).attr("id");
      $("#" + id).empty();
      $.ajax({
        url: "https://community.case.edu/ISS/rss_emails?limit=5",
        type: 'GET',
        dataType: 'xml'
      }).done(function (xml) {
        getDataObject(xml);
      });
      function getDataObject(data) {
        const items = data.querySelectorAll("channel item");
        $.each(items, function (e, itm) {
          const title = itm.querySelector("title").textContent;
          const link = itm.querySelector("link").textContent;
          const div = $('<ul></ul>');
          div.append(`<li><a href="${link}">${title}</a></li>`);
          $("#" + id).append(div);
          if (e == 4) { return false; }
        });
      }
    };
    $("#ISS-CG-Feed").Feed();
  }


  if ($("form.webform-submission-transcript-and-mspe-request-form-add-form").length > 0) {

    var t_flag = true;
    var m_flag = true;

    function check_t() {
      $('div[data-drupal-selector="edit-transcript"]').click(function () {
        var transcript_other = $('input[name="transcript_other"]:checked').length;
        var transcript_delivery_fax = $('input[name="transcript_delivery_fax"]:checked').length;
        var transcript_delivery_pickup = $('input[name="transcript_delivery_pickup"]:checked').length;
        var transcript_delivery_mail = $('input[name="transcript_delivery_mail"]:checked').length;
        if (transcript_other > 0) {
          if (transcript_delivery_fax == 0 && transcript_delivery_pickup == 0 && transcript_delivery_mail == 0) {
            t_flag = false;
            if ($('[data-drupal-selector="edit-transcript-delivery"] .panel-title span').length == 0) {
              $('[data-drupal-selector="edit-transcript-delivery"] .panel-title').append("<span style='color:red; font-size:.5em; padding-left: 1em;'>Please select an option below: </span>");
            }
          } else {
            t_flag = true;
            $('[data-drupal-selector="edit-transcript-delivery"] .panel-title span').remove();
          }
        } else {
          t_flag = true;
        }
      });
    }


    function check_m() {
      $('div[data-drupal-selector="edit-mspe"]').click(function () {
        var mspe_other = $('input[name="mspe_other"]:checked').length;
        var mspe_delivery_fax = $('input[name="mspe_delivery_fax"]:checked').length;
        var mspe_delivery_pickup = $('input[name="mspe_delivery_pickup"]:checked').length;
        var mspe_delivery_mail = $('input[name="mspe_delivery_mail"]:checked').length;
        if (mspe_other > 0) {
          if (mspe_delivery_fax == 0 && mspe_delivery_pickup == 0 && mspe_delivery_mail == 0) {
            m_flag = false;
            if ($('[data-drupal-selector="edit-mspe-delivery"] .panel-title span').length == 0) {
              $('[data-drupal-selector="edit-mspe-delivery"] .panel-title').append("<span style='color:red; font-size:.5em; padding-left: 1em;'>Please select an option below: </span>");
            }
          } else {
            m_flag = true;
            $('[data-drupal-selector="edit-mspe-delivery"] .panel-title span').remove();
          }
        } else {
          m_flag = true;
        }
      });
    }

    $('[data-drupal-selector="edit-order-information"] input').click(function () {
      check_t();
      check_m();
      setTimeout(function () {
        flag();
      }, 200)
    });

    function flag() {
      // console.log("m is " + m_flag + " and t is " + t_flag);
      if (m_flag == false || t_flag == false) {
        $('button[name="op"]').prop("disabled", true);
      } else {
        $('button[name="op"]').prop("disabled", false);
      }
    }
  }

  $('.view-experiential-education-list fieldset>legend').click(function () {
    if (isBreakpoint('medium')) {
      $(this).next().slideToggle();
    }
  });

  $(document).ready(function () {

    if ($('.fa-twitter').length) {
      $('i.fa-twitter').each(function () {
        var color = $(this).parent().css("color");
        $(this).append('<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>');
        $(this).find($('svg')).css("fill", color);
        $(this).parent().hover(colorChange);
      });
      $('a.fa-twitter').each(function () {
        var color = $(this).css("color");
        $(this).append('<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>');
        $(this).find($('svg')).css("fill", color);
        $(this).hover(colorChange);
      });
    }

    //Adjusts <nav class="slick__arrow"> attributes for accessibility accommodation
    $(".slick__arrow").each(function () {
      if (!$(this).attr("aria-label")) {
        $(this).attr("aria-label", "image slider navigation arrows");
      }
    })
    //Checks that slick-track div attributes are properly aria-labelled
    $(".slick-track").each(function () {
      if (!$(this).attr("aria-label")) {
        !$(this).attr("aria-label", "Photo Slider");
      }
    });

    //Adds and adjusts proper attributes to use with role=option on slick__slide
    $(".slick__slide[role=option]").each(function () {
      $(this).parent().attr("role", "region");
      $(this).parent().attr("aria-roledescription", "carousel");
      $(this).parent().attr("aria-label", "Image carousel");
      $(this).attr("role", "group");
      $(this).attr("aria-roledescription", "slide");
    });

    //Checks that header attributes to <nav> bars are properly aria-labelled
    $("header[id=navbar]").removeAttr("aria-labelledby");
    $("header[id=navbar]").attr("aria-label", "Main Navigation Header");

    $("aside[role=complementary").attr("aria-label", "Supplemental Information");
    //Ensures select boxes have descriptions
    $("select").each(function () {
      if (!$(this).attr("aria-label") && !$(this).attr("aria-labelledby")) {
        $(this).attr("aria-label", "Select Box");
      }
    });


  });

  $(document).ready(function () {
    if ($('.bio-list-view').length > 0) {
      $('.scrolling-view .fieldset-wrapper label').each(function () {
        $(this)[0].innerHTML = $(this)[0].innerHTML.replace("Cancer - ", "");
      });
    }

    if ($('.bio-list-view').length > 0) {
      $('.scrolling-view .fieldset-wrapper label').each(function () {
        $(this)[0].innerHTML = $(this)[0].innerHTML.replace("BSTP - ", "");
      });
    }

    if ($('.bio-list-view').length > 0) {
      $('.scrolling-view .fieldset-wrapper label').each(function () {
        $(this)[0].innerHTML = $(this)[0].innerHTML.replace("Schubert Center - ", "");
      });
    }

    if ($('.bio-list-view').length > 0) {
      $('.scrolling-view .fieldset-wrapper label').each(function () {
        $(this)[0].innerHTML = $(this)[0].innerHTML.replace("Neurosciences - ", "");
      });
    }

    //// for removing non UMC - tags from the new media experts search page.
    if (window.location.href.indexOf("umc") > -1) {
      if ($('ul.ui-autocomplete').length > 0) {
        $.each($("ul.ui-autocomplete li a"), function (index, value) {
          if (value.text.match(" - ") != null && value.text.match("UMC - ") === null) {
            $(this).closest('li').remove();
          } else {
            $(this)[0].innerHTML = $(this)[0].innerHTML.replace("UMC - ", "");
          }
        })
      }
      $("form input#edit-combine").val(function (i, v) {
        return v.replace("UMC - ", "");
      })
    }
  });

  $(document).ajaxSuccess(function () {
    if ($('.bio-list-view').length > 0) {
      $('.scrolling-view .fieldset-wrapper label').each(function () {
        $(this)[0].innerHTML = $(this)[0].innerHTML.replace("Cancer - ", "");
      });
    }

    if ($('.bio-list-view').length > 0) {
      $('.scrolling-view .fieldset-wrapper label').each(function () {
        $(this)[0].innerHTML = $(this)[0].innerHTML.replace("BSTP - ", "");
      });
    }

    if ($('.bio-list-view').length > 0) {
      $('.scrolling-view .fieldset-wrapper label').each(function () {
        $(this)[0].innerHTML = $(this)[0].innerHTML.replace("Neurosciences - ", "");
      });
    }

    if ($('.bio-list-view').length > 0) {
      $('.scrolling-view .fieldset-wrapper label').each(function () {
        $(this)[0].innerHTML = $(this)[0].innerHTML.replace("Schubert Center - ", "");
      });
    }
    if (window.location.href.indexOf("medicine/bstp") > -1) {
      $('.paragraph--type--additional-job-descriptions div.hidden').removeClass('hidden');
    }

    if (window.location.href.indexOf("bstp") > -1) {
      $('.paragraph--type--additional-job-descriptions div.hidden').removeClass('hidden');
    }

    if (window.location.href.indexOf("umc") > -1) {
      if ($('ul.ui-autocomplete').length > 0) {
        $.each($("ul.ui-autocomplete li a"), function (index, value) {
          if (value.text.match(" - ") != null && value.text.match("UMC - ") === null) {
            $(this).closest('li').remove();
          } else {
            $(this)[0].innerHTML = $(this)[0].innerHTML.replace("UMC - ", "");
          }
        })

        $.each($("ul.ui-autocomplete li"), function (index, value) {
          var keyword = ''
          $(this).on('click', function () {
            keyword = $(this).children()[0].innerHTML;
            setTimeout(function () {
              $('form input#edit-combine').val(keyword)
            }, 100)
          });
          $("ul.ui-autocomplete").on('keypress', function (e) {
            if (e.which == 13) {
              setTimeout(function () {
                $('form input#edit-combine').val(keyword)
              }, 100)
            }
          });
        })
      }
    }
  });


  //CEBP Resources page dropdowns
  // var BREAKPOINTS = [
  //         { name: "small", size: 768 },
  //         { name: "medium", size: 992 },
  //         { name: "large", size: 1200 },
  //     ]

  //     function isBreakpoint (size) {
  //         var thisSize = BREAKPOINTS.filter(function(breakpoint) {
  //             return breakpoint.name === size;
  //         });
  //         return $(window).width() > thisSize[0].size ? false : true;
  //     }

  //     // replace "Apply" with magnifying glass icon for search button
  //     function addSearchIcon () {
  //         var submitButton = document.getElementsByClassName("button js-form-submit form-submit btn-info btn");
  //         if (submitButton.length > 0) {
  //             submitButton[0].innerHTML= '<span class="sr-only">Search</span><span class="fa fa-search" aria-hidden="true"></span>';
  //         }
  //     }

  //     $(window).on('load', function () {
  //         addSearchIcon();
  //     });

  // CEBP resource page dropdowns
  var resourcePage = $('.cebp-resources-tools');
  function resourcesDropdowns() {
    if (resourcePage.length > 0) {
      $('fieldset>legend').click(function () {
        if (isBreakpoint('small')) {
          $(this).next().slideToggle();
        }
      });
      $(':checked').each(function () {
        $(this).parentsUntil('fieldset').css('display', 'block');
      });
    }
  }

  var resourcePage = $('.research-projects-filters');
  function resourcesDropdowns() {
    if (resourcePage.length > 0) {
      $('fieldset>legend').click(function () {
        if (isBreakpoint('small')) {
          $(this).next().slideToggle();
        }
      });
      $(':checked').each(function () {
        $(this).parentsUntil('fieldset').css('display', 'block');
      });
    }
  }

  $(document).ready(function () {
    resourcesDropdowns();
  });

  // Check if you are using a mobile browser
  var isMobile = false; //initiate as false
  // device detection
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

  var resetAjax = 0;

  $(document).ajaxSuccess(function () {
    //addSearchIcon();
    if (window.location.href.indexOf("centerforebp") > -1) {
      resourcesDropdowns();
      resetAjax++;
      if (resetAjax > 1) {
        var filtersEl = $('.view-filters');
        var resultsEl = $('.cebp-resources-tools .view-content')
        if (resultsEl.length > 0 && isMobile) {
          $('html, body').animate({ scrollTop: resultsEl.offset().top - 20 });
        } else {
          $('html, body').animate({ scrollTop: filtersEl.offset().top - 20 });
        }
      }
    }
  });

  $(document).ajaxSuccess(function () {
    //addSearchIcon();
    if (window.location.href.indexOf("researchprojects") > -1) {
      resourcesDropdowns();
      resetAjax++;
      if (resetAjax > 1) {
        var filtersEl = $('.view-filters');
        var resultsEl = $('.research-projects-filters .view-content')
        if (resultsEl.length > 0 && isMobile) {
          $('html, body').animate({ scrollTop: resultsEl.offset().top - 20 });
        } else {
          $('html, body').animate({ scrollTop: filtersEl.offset().top - 20 });
        }
      }
    }
  });

  function coreFacilitiesFocus() {
    $('select').change(function (e) {
      if (isMobile) {
        $('html, body').animate({ scrollTop: $('.view-core-facilities-listing .view-filters').offset().top - 20 });
      }
    });
  }

  $(document).ready(function () {
    if (window.location.href.indexOf("research") > -1) {
      coreFacilitiesFocus();
    }
  });

  $(document).ajaxSuccess(function () {
    if (window.location.href.indexOf("research") > -1) {
      coreFacilitiesFocus();
    }
  })

  //Subfeature Grid Hover Effect
  $('.field--name-field-grid-description').css('display', 'none');
  $('.subfeature-grid-img-text').hover(
    function () {
      if (!checkBreakpoint(768)) {
        $(this).find('.field--name-field-grid-description').slideDown()
      }
    },
    function () {
      if (!checkBreakpoint(768)) {
        $(this).find('.field--name-field-grid-description').slideUp()
      }
    }
  );

  // temp twitter x fix 10032023 until FA6 is installed
  colorChange = function () {
    var color = $(this).css("color");
    $(this).find($('svg')).css("fill", color);
  };

})(jQuery);
