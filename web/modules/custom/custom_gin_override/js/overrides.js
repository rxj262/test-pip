(function ($) {
  $(document).ready(function () {

    // force file replacement to use override.
    if (window.location.pathname.indexOf("/media/") !== -1) {
      if ($('input[name=keep_original_filename]').length > 0) {
        $('input#edit-keep-original-filename').click(function() {
          return false;
        });
        $('input#edit-keep-original-filename').css({'cursor': 'not-allowed'});
        $('.form-item--keep-original-filename  label.form-item__label').css({'cursor':'not-allowed'});
        $('input#edit-keep-original-filename + span.checkbox-toggle .checkbox-toggle__inner').css('background-color', '#ccc');
      }
    }

    // only allow to add 'document' and 'image' on /media/add page for non-admin roles
    if (
      window.location.pathname.indexOf("/media/add") !== -1 &&
      drupalSettings.user.uid !== "1"
    ) {
      $("div.admin-list div.admin-item").hide();
      $('div.admin-list div.admin-item a[href*="/media/add/document"]').parent().show();
      $('div.admin-list div.admin-item a[href*="/media/add/image"]').parent().show();
      if ($('div.admin-list div.admin-item a[href*="/media/add/private_file"]').length) {
        $('div.admin-list div.admin-item a[href*="/media/add/private_file"]')
          .parent()
          .show();
      }
      if ($('div.admin-list div.admin-item a[href*="/media/add/hr_document"]').length) {
        $('div.admin-list div.admin-item a[href*="/media/add/hr_document"]').parent().show();
      }
    }

    if ($(".toolbar-menu").length > 0) {
      function asc_sort(a, b) {
        return $(b).get(0).innerText < $(a).get(0).innerText ? 1 : -1;
      }
      function asc_sort_dropdown(a, b) {
        return $(b).text().trim() < $(a).text().trim() ? 1 : -1;
      }

      // add menu link for content hub biographies
      bio_link_node_add = '<div class="admin-item"><a class="admin-item__link" title="Biographies - Content Hub" href="https://live-cwru-biographies.pantheonsite.io/caslogin"></a><div class="admin-item__title"> Biographies- Content Hub</div></div>';

      if (window.location.pathname.indexOf("/node/add") !== -1) {
        $("div.admin-list").append(bio_link_node_add);
        $("div.admin-list div.admin-item").sort(asc_sort).appendTo("div.admin-list");
      }

      bio_link_dropdown = '<li class="menu-item"><a href="https://live-cwru-biographies.pantheonsite.io/caslogin" class="toolbar-icon toolbar-icon-admin-toolbar-tools-extra-linksnode-add-basic-page">Biographies - Content Hub</a></li>';

      $("a.toolbar-icon-admin-toolbar-tools-extra-linksnode-add+ul").append(bio_link_dropdown);

      // sort them in add content dropdown
      $("a.toolbar-icon-admin-toolbar-tools-extra-linksnode-add+ul li.menu-item").sort(asc_sort_dropdown).appendTo("a.toolbar-icon-admin-toolbar-tools-extra-linksnode-add+ul");

      // hide extra menu links for media
      linkholder = $(
        'a[data-drupal-link-system-path="admin/content/media"]'
      )[0].href.replace("admin/content/media", "media/add");
      /*
      $(
        '.toolbar-menu-administration a[data-drupal-link-system-path="admin/content/media"]'
      )
        .parent()
        .addClass("menu-item--expanded")
        .append(
          '<ul class="toolbar-menu"><li class="menu-item"><a href="' +
          linkholder +
          '" class="toolbar-icon" data-drupal-link-system-path="media/add">Add Media</a></li></ul>'
        );
      */
      $('a[data-drupal-link-system-path="media/add"]+ul li').hide();
      $(
        'a[data-drupal-link-system-path="media/add"]+ul a[data-drupal-link-system-path="media/add/document"]'
      )
        .parent()
        .show();
      $(
        'a[data-drupal-link-system-path="media/add"]+ul a[data-drupal-link-system-path="media/add/image"]'
      )
        .parent()
        .show();
      if (
        $(
          'a[data-drupal-link-system-path="media/add"]+ul a[data-drupal-link-system-path*="media/add/private_file"]'
        ).length
      ) {
        $(
          'a[data-drupal-link-system-path="media/add"]+ul a[data-drupal-link-system-path*="media/add/private_file"]'
        )
          .parent()
          .show();
      }
      // add menu link for content hub personalprofiles
      /*        pp_link = '<li class="menu-item"><a href="http://cwru.prod.acquia-sites.com/personalprofiles/caslogin" class="toolbar-icon">Personal Profiles - Content Hub</a></li>';
              $('a.toolbar-icon-admin-toolbar-tools-add-content+ul').append(pp_link);
              if (window.location.pathname.indexOf('/node/add') !== -1) {
                $('ul.admin-list').append('<li class="clearfix"><a href="http://cwru.prod.acquia-sites.com/personalprofiles/caslogin" target="_blank"><span class="label">Personal Profiles - Content Hub</span></a></li>');
                  $('ul.admin-list li').sort(asc_sort).appendTo('ul.admin-list');
              }
      */


      if (
        drupalSettings.user.uid !== "1" &&
        window.location.pathname.indexOf("admin/content/media") !== -1
      ) {
        $("select#edit-bundle option").each(function () {
          if (
            this.value != "image" &&
            this.value != "document" &&
            this.value != "hr_documents" &&
            this.value != "private_files" &&
            this.value != "private_file"
          ) {
            this.remove();
          }
        });
      }

      $(
        '.toolbar-menu a[href="https://live-cwru-biographies.pantheonsite.io/caslogin"], ' +
        '.toolbar-menu a[href="https://live-cwru-personalprofiles.pantheonsite.io/caslogin"]'
      ).attr("target", "_blank"); //dev ENV
      $(
        '.toolbar-menu a[href="https://case.edu/biographies/caslogin"], ' +
        '.toolbar-menu a[href="https://case.edu/personalprofiles/caslogin"]'
      ).attr("target", "_blank"); //potential prod ENV
    }

    $("a.toolbar-icon").removeAttr("title");
    // $('input.field-add-more-submit').each(function() {
    //   $(this).val($(this).val().replace("Add", ($(this).val().endsWith("s") ? "Add More" : "Add Another")));
    // });

    function setLinkButtons() {
      // changes normal link icon to linkit icon with the plus sign
      $(".cke_button__link_icon").css(
        "background-image",
        'url("https://dudbm6bcnmy8e.cloudfront.net/cwru-drupal-assets/images/linkit.png")'
      );
      // changes tooltip for linkit to Internal Link
      $(".cke_button__drupallink").attr("title", "Internal Link (⌘+K)");
    }

    // Limit Image Styles from Embedded Image List
    var imageOptions = [
      "Media Image - 1 (Original)",
      "Media Image - 2 (Small)",
      "Media Image - 3 (Medium)",
      "Media Image - 4 (Large)",
      "Article Image with Caption",
      "Media Image with Caption - 1 (Original)",
      "Media Image with Caption - 2 (Small)",
      "Media Image with Caption - 3 (Medium)",
      "Media Image with Caption - 4 (Large)",
    ];
    $(document).ajaxSuccess(function () {
      var formholder = $("#entity-embed-dialog-form").find(
        ".entity-embed-dialog-step--embed"
      );
      if (formholder.length > 0) {
        formholder.find("select>option").each(function () {
          imageOptions.includes($(this).text())
            ? $(this).show()
            : $(this).hide();
        });
      }
      setLinkButtons();

      // hide 'center' align option for media embed
      // var centeroption = $(
      //   '#entity-embed-dialog-form [data-drupal-selector="edit-attributes-data-align"] .form-item-attributes-data-align:nth-child(3)'
      // );
      // if (centeroption) {
      //   centeroption.css("display", "none");
      // }

      if ($(".field--name-field-youtube-embed").length > 0) {
        $(
          ".field--name-field-youtube-embed .js-form-item:nth-of-type(1) label"
        ).text("Youtube embed URL");
        $(
          ".field--name-field-youtube-embed .js-form-item:nth-of-type(2) label"
        ).text("Youtube embed Title");
      }
    });

    // Function for the link dialog - remove the following options
    var linkDialogOptions = [
      "ftp://",
      "news://",
      "_parent",
      "_top",
      "popup",
      "frame",
    ];
    function linkDialogEdits() {
      var linkButtonHolder = $("a.cke_button__link");
      linkButtonHolder.click(function () {
        function waitForDialog() {
          var linkformholder = $(".cke_dialog_ui_select");
          if (linkformholder.length > 0) {
            linkformholder.each(function () {
              $(this)
                .find("select>option")
                .each(function () {
                  linkDialogOptions.includes($(this)[0].value)
                    ? $(this).hide()
                    : $(this).show();
                });
            });
          }
        }
        setTimeout(waitForDialog, 500);
      });
    }

    if (typeof CKEDITOR != "undefined") {
      CKEDITOR.on("instanceReady", function (evt) {
        setLinkButtons();
        linkDialogEdits();
      });
      CKEDITOR.tools.extend(CKEDITOR.config, {
        linkShowAdvancedTab: false,
      });

      CKEDITOR.on("dialogDefinition", function (evt) {
        var definition = evt.data.definition;
        if (definition.title == "Table Properties") {
          definition.contents[0].elements[0].children[1].children[0].children[0].default =
            "100%";
        }
      });
    }

    // hide unwanted icons from ck-editor
    var toHide = $(
      ".fa-angellist, .fa-git, .fa-git-square, .fa-github, .fa-github-alt, .fa-google-wallet, .fa-hand-spock-o, .fa-rebel, .fa-ra, .fa-resistance"
    );
    toHide.each(function () {
      $(this).parent().hide();
    });

    // function enableSaveButton() {
    //   var saveButton = $('#edit-submit');
    //   saveButton.removeAttr('disabled').removeClass('is-disabled');
    // }

    // // on interaction with the menu link section, enable save button and remove disabled class
    // $('#edit-menu-enabled').click(function () {
    //   enableSaveButton();
    // });

    // $('#edit-menu-menu-parent').click(function () {
    //   enableSaveButton();
    // });

    // $('#edit-menu').click(function () {
    //   enableSaveButton();
    // });


    // set CKeditor default table width to 100%
  });
})(jQuery);

// // FUNCTIONN FOR MEDIA SELECTION
// (function ($, Drupal) {
//   "use strict";

//   /**
//    * Registers behaviours related to view widget.
//    */

//   Drupal.behaviors.MediaLibraryView = {
//     attach: function (context, settings) {
//       $(".item-container").css("display", "inline-block");

//       $(once('bind-click-event', '.grid-item', context)).each(function () {
//         $(this).on('click', function () {
//           var input = $(this).find(".views-field-entity-browser-select input");
//           input.prop("checked", !input.prop("checked"));
//           if (input.prop("checked")) {
//             $(this).addClass("checked");
//             var render = $(this).find(
//               ".views-field-thumbnail__target-id, .views-field-name"
//             );
//             $(render).css("opacity", 0.3);
//           } else {
//             $(this).removeClass("checked");
//             var render = $(this).find(
//               ".views-field-thumbnail__target-id, .views-field-name"
//             );
//             $(render).css("opacity", 1);
//           }
//         });
//       });


//       /*
//             $(".grid-item")
//               .once("bind-click-event")
//               .click(function () {
//                 var input = $(this).find(".views-field-entity-browser-select input");
//                 input.prop("checked", !input.prop("checked"));
//                 if (input.prop("checked")) {
//                   $(this).addClass("checked");
//                   var render = $(this).find(
//                     ".views-field-thumbnail__target-id, .views-field-name"
//                   );
//                   $(render).css("opacity", 0.3);
//                 } else {
//                   $(this).removeClass("checked");
//                   var render = $(this).find(
//                     ".views-field-thumbnail__target-id, .views-field-name"
//                   );
//                   $(render).css("opacity", 1);
//                 }
//               });
//       */
//     },
//   };

//   $(document).ready(function () {
//     if (window.location.pathname.indexOf("/node/add/") !== -1) {
//       alert('add');
//       $("#edit-actions").addClass("action-margin-changer");
//       if (typeof $("#edit-moderation-state-0-state > option:first")[0] !== 'undefined') {
//         $("#edit-moderation-state-0-state > option:first")[0].innerText =
//           "Save Draft";
//         $("#edit-moderation-state-0-state > option:last")[0].innerText =
//           "Publish";
//       }
//     } else if (window.location.pathname.indexOf("/delete") !== -1) {
//       alert('delete');
//       // DONT ADD CLASSES ON DELETE PAGE
//     } else if (window.location.pathname.indexOf("/node") !== -1) {

//       $("#edit-actions--3").addClass("action-big-margin-changer");
//       $("#edit-moderation-state-0-state > option").each(function () {

//         if (typeof $(this)[0] !== 'undefined') {

//           if ($(this)[0].innerText == "Draft") {

//             $(this)[0].innerText = "Save Draft";

//             $(this)[0].innerText = $(this)[0].innerText.replace("ed", "");
//           }
//         }
//       });
//       // if ($('#edit-moderation-state-0-current')[0].innerText == "Current state Draft") {
//       //   $('#edit-actions').css('margin-left', '-24px');
//       // } else if ($('#edit-moderation-state-0-current')[0].innerText == "Current state Published") {
//       //   $('#edit-actions').css('margin-left', '-52px');
//       // } else if ($('#edit-moderation-state-0-current')[0].innerText == "Current state Unpublished") {
//       //   $('#edit-actions').css('margin-left', '-70px');
//       // }
//     }
//     if (window.location.pathname.indexOf("/media/add") !== -1) {
//       $("[data-drupal-selector=edit-advanced]").parent().hide();
//     }
//   });
// })(jQuery, Drupal);
