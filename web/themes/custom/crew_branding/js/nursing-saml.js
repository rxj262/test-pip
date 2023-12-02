(function($) {
  var isProduction = true; // set to false when working locally
  var level1 = 2;
  var level2 = 3;
  if (isProduction) {
    level1++;
    level2++;
  }

  var menuPath = [
    {
      name: 'faculty-resources',
      submenu: [
        {
          name: 'fpb-faculty-committees'
        }
      ]
    }, {
      name: 'fpb-room-av-reservations',
      submenu: [
        {
          name: 'fpb-av-reservations'
        }, {
          name: 'fpb-room-reservations'
        }, {
          name: 'support-requests'
        }
      ]
    }, {
      name: 'center-for-research-and-scholarship',
      submenu: [
        {
          name: 'funding-opportunities'
        }
      ]
    }, {
      name: 'strategic-planning-committee'
    }
  ];

  var path = window.location.pathname.split("/");
  var pathLevel1 = path[level1];
  var pathLevel2 = path[level2];

  $('.saml-menu .nav-item.active.open').removeClass('active').removeClass('open');

  function addMenuClasses(menu, level) {
    menu.forEach(function(index) {
      if (level == 0 && pathLevel1 == index.name) {
        $('.nav-link[href$="' + index.name + '"]').parent().addClass('active').addClass('open').find('> a.nav-link');
        if (!pathLevel2) {
          $('.nav-link[href$="' + index.name + '"]').addClass('is-active');
        }
      }
      if (level == 1 && pathLevel2 == index.name) {
        $('.nav-link[href$="' + index.name + '"]').parent().addClass('open').find('> a.nav-link').addClass('is-active');
      }
      if (index.submenu) {
        addMenuClasses(index.submenu, 1);
      }
    });
  }

  addMenuClasses(menuPath, 0);
})(jQuery);
