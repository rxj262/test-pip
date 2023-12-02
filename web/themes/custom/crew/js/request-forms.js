(function($){

  //Get querystring
  function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function initialize() {
     $(".dtpick").datetimepicker({
        sideBySide: true,
        stepping: 5
      //stepHour: 1, stepMinute: 5, hour: 12, timeFormat: "h:mm tt" 
      });
  
    var serviceResponse = getParameterByName("success");
    if(serviceResponse)
    {
      if(serviceResponse === "true")
      {
        $("#myCaseModal").modal('show');
      }
      else 
      {
        $("#myCaseModal").find(".modal-title").html('<h4>An error occured</h4>');
        $("#myCaseModal").find(".modal-body").html('<p>There was an error. Please contact the FPB helpdesk by emailing <a href="mailto:fpbhelpdesk@case.edu?subject=Support Form Error" >fpbhelpdesk@case.edu</a></p>');
        $("#myCaseModal").modal('show');
      }
    }
  }

  $(document).ready(function() {
    initialize();
  });

})(jQuery);