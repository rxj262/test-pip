// (function ($) {

//   var BREAKPOINTS = [
//     { name: "small", size: 768 },
//     { name: "medium", size: 992 },
//     { name: "large", size: 1200 },
//   ]
//   function isBreakpoint (size) {
//     var thisSize = BREAKPOINTS.filter(function(breakpoint) {
//       return breakpoint.name === size;
//     });
//     return $(window).width() > thisSize[0].size ? false : true;
//   }

//   // Academics page dropdowns
//   var academicsPage = $('.view-grad-program-listing');
//   function academicDropdowns () {
//     if (academicsPage.length > 0) {
//       $('fieldset>legend').click(function() {
//         if (isBreakpoint('medium')) {
//           $(this).next().slideToggle();
//         }
//       });
//       $(':checked').each(function() {
//         $(this).parentsUntil('fieldset').css('display', 'block');
//       });
//     }
//   }
//   $(document).ajaxSuccess(function () {
//     academicDropdowns();
//   });

// })(jQuery);