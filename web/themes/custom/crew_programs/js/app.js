(function($) {
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

  var partTime = false;
  var fullTime = false;
  var hybrid = false;
  var online = false;

  function programCheck(program) {
    if (partTime && fullTime && hybrid && online) {
      return true;
    } else if (!(partTime || fullTime || hybrid || online)) {
      return true;
    } else {
      if (partTime) {
        if (program.text().match('Part-Time')) {
          return true;
        }
      } else if (fullTime) {
        if (program.text().match('Full-Time')) {
          return true;
        }
      } else if (hybrid ) {
        if (program.text().match('Blended')) {
          return true;
        }
      } else if (online) {
        if (program.text().match('Online')) {
          return true;
        }
      } else {
        return false;
      }
    }
  }

  // Academics page dropdowns
  var academicsPage = $('.view-grad-program-listing');
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
  function programsFormats () {
    if (academicsPage.length > 0) {
      // $('.js-form-item-field-programs-format-target-id-426').click(function () {
      //   partTime = !partTime;
      //   console.log(partTime);
      // });
      partTime = $('.js-form-item-field-programs-format-target-id-426 input')[0].checked;
      fullTime = $('.js-form-item-field-programs-format-target-id-421 input')[0].checked;
      hybrid = $('.js-form-item-field-programs-format-target-id-441 input')[0].checked;
      online = $('.js-form-item-field-programs-format-target-id-436 input')[0].checked;

      programEls = $('li .paragraph--view-mode--program-card-url');
      for (var el of programEls) {
        if (programCheck($(el))) {
          $(el).parent().show();
        } else {
          $(el).parent().hide();
        }
      }
    }
  }
  programsFormats();
	academicDropdowns();
  $(document).ajaxSuccess(function () {
    programsFormats();
   	if (typeof(academicDropdowns) == "function") {
  	    //console.log("in the if");
  	}
  	else {
  		academicDropdowns();
  		//console.log("in the else");
  	}
	//console.log("outside");
  });
  
  

  //Page Title Placements within Hero Image
  function pageTitleFix() {
    $('.hero-title-container').prepend($('.page-header'));
    $('.hero-title-container .page-header span').append($('.hero-page-title-info'));
    $('.page-header span').addClass("page-title-name").append('<div class="glass-blur"></div>');
    $('.page-header, .hero-page-title-info').css('display', 'block');
    $('.paragraph--type--centered-intro-text').prepend($('.region-breadcrumbs').css('display', 'block'));
  }
  $(window).on('load', function () {
    pageTitleFix();
  });

  //If Photo Box Row exists, add padding to the columns above it
  var photoBoxElem = $('.paragraph--type--photo-boxes-row');
  var photoBoxParent = $(photoBoxElem).closest('.field--item');
  var prevPhotoBoxSibling = $(photoBoxParent).prev();
  //console.log(prevPhotoBoxSibling);
  function photoBoxPadding() {
    if (photoBoxElem) {
      $(prevPhotoBoxSibling).find('.field-column .col-12.col-sm-6').css('padding-bottom', '120px');
    }
  }
  $(window).on('load', function () {
    photoBoxPadding();
  });

  // Mobile nav toggle
  $(document).ready(function() {	
  	$(".open").click(function() {
  		$("#mobile-nav").slideToggle("fast");
  		return false;	
  	});
  });

  // Quicklinks nav toggle
  $(document).ready(function() {	
  	$("#qlinks").click(function() {
  		$(".quicklinks").slideToggle("fast");
  		return false;		
  	});
  });

  $(".quicklinks #close").click(function() {
  	$(".quicklinks").hide();
  });

  //Move Top form above the What to expect section on Mobile
   $(window).on('load', function () {
    //$('.field--name-field-two-col-two-color-column-o').first().find('.field--item.field-column').last().addClass('rfi-column-first');
    var firstRFIForm = $('.paragraph--type--request-information').first();
    var firstRFIRow = $(firstRFIForm).closest('.field--name-field-two-col-two-color-column-o').addClass('first-content-row-with-form');
    $(firstRFIRow).find('.field--item.field-column').last().addClass('rfi-column-first');
    if (window.matchMedia("(max-width: 481px)").matches) {
     // console.log("Width is now: " + window.innerWidth);
      $('.first-content-row-with-form').prepend($('.rfi-column-first'));
    }
  });

  // $(document.ready)(function{
  //   if (window.matchMedia("(max-width: 481px)").matches) {
  //    // console.log("Width is now: " + window.innerWidth);
  //     $('.first-content-row-with-form').prepend($('.rfi-column-first'));
  //   }
  // });

  window.onresize = resize;

  function resize()
  {
    if (window.innerWidth <= 481) {
     // console.log("Width is now: " + window.innerWidth);
      $('.first-content-row-with-form').prepend($('.rfi-column-first'));
    }
    if (window.innerWidth > 481) {
      //console.log("Width is now: " + window.innerWidth);
      $('.first-content-row-with-form').append($('.rfi-column-first'));
    }
  }


})(jQuery);
