(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.behaviors.calendar = {
    attach: function (context, settings) {
      if (drupalSettings.path.baseUrl == '/studentlife/') {
        $('#calendar').fullCalendar({
          header: {
            left: 'list,month',
            center: 'title',
            right: 'today prev,next'
          },
  
          themeSystem: 'bootstrap3',
  
          events: settings.crew.calendar,
          
          defaultView: 'list',
          
          eventLimit: 3,

          height: 'auto',
  
          editable: false,
  
          views: {
            month: {
              displayEventEnd: false,
            },
            basic: {
              displayEventEnd: true,
            },
            week: {
              displayEventEnd: true,
            },
            agenda: {
              displayEventEnd: true,
            },
          },
  
          eventRender: function (event, eventElement) {
            // below code adds a popup model to show more text about the event
            eventElement.popover({
              title: event.title,
              content: event.description,
              trigger: 'hover',
              placement: 'top',
              container: 'body'
            });
          },
  
          eventClick: function(event) {
            if (event.url) {
              window.open(event.url, "_blank");
              return false;
            }
          }
        });
      } else {
        $('#calendar').fullCalendar({
          header: {
            left: 'month,agendaWeek,list',
            center: 'title',
            right: 'today prev,next'
          },
  
          themeSystem: 'bootstrap3',
  
          events: settings.crew.calendar,
  
          eventLimit: true,
  
          editable: false,
  
          views: {
            month: {
              displayEventEnd: false,
            },
            basic: {
              displayEventEnd: true,
            },
            week: {
              displayEventEnd: true,
            },
            agenda: {
              displayEventEnd: true,
            },
          },
  
          eventRender: function (event, eventElement) {
            // below code adds thumbnail image, we choose not to at this point.
            // if (event.imageurl) {
            //   eventElement.find("div.fc-content").prepend("<img src='" + event.imageurl +"' width='20' height='20'>");
            // }
  
            // below code adds a popup model to show more text about the event
            eventElement.popover({
              title: event.title,
              content: event.description,
              trigger: 'hover',
              placement: 'top',
              container: 'body'
            });
          },
  
          eventClick: function(event) {
            if (event.url) {
              window.open(event.url, "_blank");
              return false;
            }
          }
  
          // eventAfterAllRender: function (event, element) {
          //   $('.fc-center h2').replaceWith(function () {
          //     return "<span class='fc-main-title'>" + $(this).text() + "</span>";
          //   });
          // }
        });
      }
      
    }
  };

})(jQuery, Drupal, drupalSettings);