// may god have mercy on your soul
(function ($) {
  $(document).ready(function () {
    // Toggle page title when opening mobile menu
    var pageTitle = $("h1.page-header").text().trim() || "Home";
    var titleDisplaying = true;
    var navtoggle = $("button.navbar-toggle.navbar-menu-toggle");
    var topLevel = $('.menu-top-level');
    var navicon = $("button.navbar-toggle.navbar-menu-toggle i");
    var navCollapse = $('#navbar-collapse');
    var searchIcon = $("button.navbar-search-toggle i");
    var searchCollapse = $('#search-collapse');
    var lockTime = null;
    var cache = navtoggle.children();

    function changeButtonText(text) {
      navtoggle.text(text).prepend(cache);
    }

    function toggleButtonIcon() {
      if (navicon.hasClass('fa-bars')) {
        navicon.removeClass('fa-bars');
        navicon.addClass('fa-times');
        if (searchIcon.hasClass('fa-times')) {
          toggleSearchButtonIcon();
        }
      } else {
        navicon.removeClass('fa-times');
        navicon.addClass('fa-bars');
      }
    }

    function toggleSearchButtonIcon() {
      
      if (searchIcon.hasClass('fa-search')) {
        searchIcon.parent().addClass('search-opened');
        searchIcon.removeClass('fa-search');
        searchIcon.addClass('fa-times');
        if (navicon.hasClass('fa-times')) {
          toggleButtonIcon();
          titleDisplaying ? changeButtonText("Close") : changeButtonText(pageTitle);
          titleDisplaying = !titleDisplaying;
        }
      } else {
        searchIcon.parent().removeClass('search-opened');
        searchIcon.removeClass('fa-times');
        searchIcon.addClass('fa-search');
      }
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    changeButtonText(pageTitle);
    $("button.navbar-toggle.navbar-menu-toggle").click(function () {
      toggleButtonIcon();
      titleDisplaying ? changeButtonText("Close") : changeButtonText(pageTitle);
      titleDisplaying = !titleDisplaying;
    });

    $("button.navbar-search-toggle").click(function () {
      toggleSearchButtonIcon();
    });

    // click event for menu-items with submenus
    $(".menu-item:has(.below-class)").click(async function (e) {
      var sender = e.target;
      // check that sender is menu item (prevent bubbling) and it has been 300ms since previous click, prevent double taps
      if ($(sender).hasClass('menu-item') && (!lockTime || (+new Date() - lockTime > 300))) {
        var parent = $(this).parent();
        var menuItemHeight = $(this).outerHeight();
        var hasCTASibling = $(this).siblings('.cta').length > 0;
        if (hasCTASibling) {
          var ctaObject = $($(this).siblings('.cta')[0]);
        }
        var childDropdown = $(this).find('> .menu-dropdown');
        // set display and left postion for soon-to-be displayed submenu
        childDropdown.css({'display': 'block', 'height': 'auto', 'left': (topLevel.width()+'px')/*, 'top': (topOffset+'px')*/});

        // set initial vertical postion for about-to-slide menu
        childDropdown.css({'top': parent.offset().top - childDropdown.offset().top})
        var childDropdownHeight = childDropdown.height();

        // scroll to top of menu so we don't get lost
        $('html, body').animate({scrollTop: $('.page-head').offset().top});

        // slide old+new menu to the left, bringing new menu in to display
        parent.children().animate({ left: (-1*(topLevel.width()))}, 500);

        // set top level menu height to fit new menu items
        topLevel.css('height', childDropdownHeight);

        // calculate offset for new submenu after animations have fired and clicked item's siblings are set to 0 height
        finalTopOffset = (-1) * (menuItemHeight + $(this).prevAll().length - 1);

        // if parent menu had a CTA, increase offset by CTA's vertical margins
        if (parent.hasClass('menu-dropdown') && hasCTASibling) {
          finalTopOffset -= (ctaObject.outerHeight() - ctaObject.height());
        }

        // stop event from propagating to parent .menu-item and firing multiple times
        e.stopPropagation();

        lockTime = +new Date();
        // wait for animations to finish, then collapse clicked item's siblings and set vertical position of newly displayed submenu
        await sleep(500);
        childDropdown.css({'top': (finalTopOffset+'px')});
        $(this).siblings().css({ height: 0});

      }
    });

    // click event for back button
    $(".mobile-back").click(async function (e) {
      var sender = e.target;
      // check that sender is menu item (prevent bubbling) and it has been 300ms since previous click, prevent double taps
      if (($(sender).hasClass('mobile-back') || $(sender).hasClass('menu-link')) && (!lockTime || (+new Date() - lockTime > 300))) {
        var menuItemHeight = $(this).outerHeight();
        var parentLi = $(this).parent();
        var parentMenuDropdown = parentLi.parent();
        var parentMenuHasCTA = parentMenuDropdown.parent().children('.cta').length > 0;

        if (parentMenuHasCTA) {
          var ctaObject = $(parentMenuDropdown.parent().children('.cta')[0]);
        }
        var topOffset = -1;
        parentMenuDropdown.siblings().css('height', 'auto');

        topOffset = parentMenuDropdown.parent().offset().top - parentLi.offset().top - menuItemHeight - parentMenuDropdown.prevAll().length + 1;
        if (parentMenuHasCTA) {
          topOffset -= ctaObject.outerHeight() - ctaObject.height();
        }
        parentLi.css({'top': topOffset})
        parentLi.children().css('left', '0');

        parentLi.parent().parent().children().animate({ left: '0' }, 500);
        parentLi.css({height: '0'});
        if (parentLi.parent().parent().hasClass('menu-dropdown')) {
          topLevel.css('height', parentLi.parent().parent().height());
        } else {
          topLevel.css('height', 'auto');
        }
        lockTime = +new Date();
        await sleep(500);
        parentLi.css({'display':'none', 'top': 0});
      }
    });
  });
})(jQuery);
