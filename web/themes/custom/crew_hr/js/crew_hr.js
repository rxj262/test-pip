(function($) {
  $('.navbar-nav>[role="menuitem"]').each(function() {
    $(this).find('a[href$="/faqs"]').parent().hide();
    $(this).find('a[href$="/policy-manual"]').parent().hide();
  });

  $('.view-faq.view-display-id-block_8 .view-content').hide();

  // Unused, but working code for nested accordions

  // function handleClick() {
  //   $('div[data-faq-cat="level1"] h2').on("click", function() {
  //     $(this).toggleClass('active');
  //     $(this).parent().find('.level1-content').slideToggle('slow');
  //   });
  // }
  // $(document).ready(function() {
  //   handleClick();
  // });
  // $(document).ajaxSuccess(function(event, xhr, settings) {
  //   if (settings.url == "/views/ajax?_wrapper_format=drupal_ajax") handleClick();
  // });


  $(document).ready(function () {
    if (drupalSettings.user.uid != '0') {
      $('.sub-accordion-section-content').each(function() {
 		    var anchor = $(this).attr("id");
        if (anchor != '') {
          $(this).append("<b><em class='hr_anchor'>Anchor: " + anchor +  "</em></b>");
        }
      });
    }


      // runs only under faq subsection
    if (location.pathname.includes("/hr/faqs")) {
        $("input[id='edit-combine']").attr("label", "Search Box");
        var accordion_id = location.hash;
        var accordion_section = $(accordion_id).parent();
        if($(accordion_section).length > 0){
          accordion_section.find('.sub-accordion-section-title a').removeClass("collapsed");
          $(accordion_id).addClass("in").attr("aria-expanded", "true");
          $('html, body').animate({
            scrollTop: $(accordion_section).offset().top - 150
          }, 750);       
      }
    }
    if(location.pathname.includes("/hr/forms")){
      $("input[id='edit-combine']").attr("label", "Search Box");
    }
  })

})(jQuery);
