(function ($, Drupal, once, drupalSettings) {
  'use strict';

  Drupal.behaviors.labs_custom_blocks = {

    attach(context, drupalSettings) {
      // modify drop icon default link
      var icon = $(once('labs_custom_blocks', '.toolbar-icon.toolbar-icon-admin-toolbar-tools-help'));
      if (icon.length > 0) {
        icon.attr('href', drupalSettings.labs_custom_blocks.dropicon);
      }

      // hide the add menu button from toolbar and menu admin page
      var add_menu_link = $(once('labs_custom_blocks', '.toolbar-icon-admin-toolbar-tools-extra-linksentity-menu-add-form'));
      if (add_menu_link.length > 0) {
        add_menu_link.remove();
      }

      if (drupalSettings.user.uid > 1 && drupalSettings.path.currentPath == 'admin/structure/menu') {
        var add_menu_button = $(once('labs_custom_blocks', '#block-gin-local-actions'));
        if (add_menu_button.length > 0) {
          add_menu_button.remove();
        }
      }

      // hide menu edit section for regular editors, on homepage nodes.
      var edit_menu = $(once('labs_custom_blocks', '[data-drupal-selector="edit-menu"]'));
      if (edit_menu.length > 0 && drupalSettings.labs_custom_blocks.is_homepage && drupalSettings.user.uid > 1) {
        edit_menu.hide();
      }

      // hide "add link" from toolbar dropdown, for non-admin users
      var add_a_menu_link = $(once('labs_custom_blocks', '[data-drupal-link-system-path^="admin/structure/menu/manage"][data-drupal-link-system-path$="/add"]'));
      if (add_a_menu_link.length > 0 && drupalSettings.user.uid > 1) {
        add_a_menu_link.closest('li.menu-item--expanded').removeClass('menu-item--expanded');
        add_a_menu_link.hide();
      }

    }
  }
})(jQuery, Drupal, once, drupalSettings);
