(function($) {
    $.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
        return this; // for chaining
    }

"use strict";

var mapStyles = [{
    "elementType": "geometry",
    "stylers": [
        { "visibility": "off" }
    ]
}, {
    "elementType": "labels",
    "stylers": [
        { "visibility": "on" }
    ]
}, {
    "featureType": "poi",
    "stylers": [
        { "visibility": "on" }
    ]
}, {
    "featureType": 'poi.park',
    "elementType": 'geometry',
    "stylers": [
        { "color": '#d6e9ba' }
    ]
}, {
    "featureType": 'poi.park',
    "elementType": 'labels.text',
    "stylers": [
        { "visibility": 'off' }
    ]
}, {
    "featureType": "landscape",
    "stylers": [
        { "visibility": "off" }
    ]
}, {
    "featureType": "transit.line",
    "stylers": [
        { "visibility": "off" }
    ]
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
        { "visibility": "on" }
    ]
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
        { "visibility": "simplified" },
        { "color": "#aac2f1" }
    ]
}, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
        { "visibility": "on" }
    ]
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
        { "visibility": "on" }
    ]
}, {
    "featureType": "transit",
    "elementType": "labels",
    "stylers": [
        { "visibility": "on" }
    ]
}, {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [
        { "visibility": "off" },
        { "color": "#c9c9c9" }
    ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
        { "color": "#ffe2ad" }
    ]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
        { "color": "#cccccc" }
    ]
}, {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
        { "color": "#444444" }
    ]
}, {
    "featureType": "transit.station.bus",
    "stylers": [
        { "visibility": "off" }
    ]
}, {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
        { "color": "#dddddd" }
    ]
}];
var data = {};
$('.view-id-nord_map>div.view-content').each(function (i, a) {
  data.locations = new Array();
  $(a).find('.views-row').each(function(j,b) {
    var $b = $(b),
        id = Number($b.find('div.views-field-title>span>a').text().slice(0,2)),
        title = $b.find('div.views-field-title>span>a').text().slice(4),
        headline = id + '. ' + title,
        description = $b.find('div.views-field-field-ng-location-description>div>p').text(),
        lat = $b.find('div.views-field-field-ng-location-latitude>div').text().trim(),
        lng = $b.find('div.views-field-field-ng-location-longitude>div').text().trim(),
        gallery = $b.find('div.views-field-field-ng-photo-gallery').find('img');
    (gallery.length == 0) ? gallery = $b.find('div.views-field-field-uga-campus-location-ref').find('.slick--less>div>img') : '';
    data.locations[j] = {};
    data.locations[j].id = id;
    data.locations[j].title = title;
    data.locations[j].headline = headline;
    data.locations[j].description = description;
    data.locations[j].gallery = gallery;
    data.locations[j].lat = lat;
    data.locations[j].lng = lng;
    data.locations[j].zIndex = id;
    $(this).html('');
  });
});
function initialize(data) {
    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(41.5053651, -81.6048243),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        scrollwheel: false,
        loginControl: false,
        zoomControl: true,
        mapTypeControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM,
            style: google.maps.ZoomControlStyle.SMALL
        },
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP,
        },
        styles: mapStyles
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var btn = $('#btn-campus');
    var info = $('#info-canvas');
    var data = data;
    var center;

    function startitup(data) {
        setMarkers(map, data.locations);
    };
    startitup(data);

    google.maps.event.addDomListener(map, 'idle', function() {
        center = map.getCenter();
    });

    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(center);
    });

}

// markers setup
var image = {
    url: '../themes/custom/crew_admission/images/number-markers-01.png',
    size: new google.maps.Size(36, 36),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(18, 18)
};
var imageActive = {
    url: '../themes/custom/crew_admission/images/number-markers-02.png',
    size: new google.maps.Size(36, 36),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(18, 18)
};
var shape = {
    coords: [1, 12, 1, 24, 12, 35, 24, 35, 35, 24, 35, 12, 24, 1, 12, 1],
    type: 'poly'
};

var markers = [];

/**
 * place markers on the map
 * @param map
 * @param locations
 */
function setMarkers(map, locations) {

    // place icons on the map
    for (var i = 0; i < locations.length; i++) {
        var place = locations[i];

        var latLng = new google.maps.LatLng(place.lat, place.lng);
        var marker;
        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: image,
            shape: shape,
            title: place.title,
            zIndex: place.zIndex,
            mType: 'standard',
            label: {
                text: String(place.id),
                color: "white",
                fontFamily: "Arizona",
                fontWeight: "bold",
                fontSize: "20px"
            }
        });

        google.maps.event.addListener(marker, 'click', (function(marker, index) {
            return function() {
                // Bump the map center over a bit so the info can display
                var bumpedlatLng = new google.maps.LatLng(marker.position.lat() - (($(window).width() < 992) ? 0 : ((map.zoom > 15) ? (0.002 / ((map.zoom - 15) * 2)) : 0.002)), marker.position.lng() + (($(window).width() < 992) ? 0 : ((map.zoom > 15) ? (0.007 / ((map.zoom - 15) * 2)) : 0.01)));
                updateMarkers(marker);
                showDetail(locations, index);
                map.panTo(bumpedlatLng);
                try { ga('send', 'event', 'visit-map', 'click'); } catch (err) {}
            }
        })(marker, i));

        markers.push(marker);
    }
}

google.maps.event.addDomListener(window, 'load', initialize(data));

/**
 * reset markers and set the clicked one to active
 * @param marker
 */
function updateMarkers(marker, setActive) {

    function setActive(marker) {
        marker.setIcon(imageActive);
        marker.setZIndex(100);
        marker.setLabel({
                text: marker.label.text,
                color: "white",
                fontFamily: "Arizona",
                fontWeight: "bold",
                fontSize: "20px"
            });
        marker.setClickable(false);
    }

    // reset all icons to the normal state
    for (var i = 0; i < markers.length; i++) {
        markers[i].setIcon(image);
        markers[i].setLabel({
                text: markers[i].label.text,
                color: "white",
                fontFamily: "Arizona",
                fontWeight: "bold",
                fontSize: "20px"
            });
        markers[i].setZIndex(i);
        markers[i].setClickable(true);
    }
    setActive(marker); // callback
}

/**
 * next button to select the next point of interest
 */
window.triggerClick = function (i) {
    google.maps.event.trigger(markers[i], 'click');
}

/**
 * Populate the location detail
 * @param index
 */
// Hold on running the scroll first time through
var shouldItScroll = 0;
function showDetail(locations, index) {
    var _el = $('#map-feature');
    var _l = locations[index];
    var htmlMain = '<div class="map-gallery-holder"><div class="slickmain">';
    // var htmlThumbs = '<div class="slickslidernav">';
    _l.gallery.each(function(i) {
        htmlMain += '<div><img height="' + _l.gallery[i].height + '" width="' + _l.gallery[i].width + '" alt="' + _l.gallery[i].alt + '" src="' + _l.gallery[i].dataset.src + '"></div>';
        // htmlThumbs += '<div><img height="' + _l.gallery[i].height + '" width="' + _l.gallery[i].width + '" alt="' + _l.gallery[i].alt + '" src="' + _l.gallery[i].dataset.src + '"></div>';
    });
    htmlMain += '</div></div>';
    // htmlThumbs += '</div></div>';
    _el.html('<h2>' + _l.headline + '</h2>' + htmlMain +  
    '<p class="map-description">' + _l.description + '</p>' +
    '<p><a class="button--outline" href="javascript:triggerClick(' + (locations.length == _l.id ? 0 : _l.id) + ')">Next Location</a></p>');
    // Call Slick on the newly created gallery
    $('.slickmain').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        speed: 300,
        cssEase: 'linear'
        // asNavFor: '.slickslidernav'
    });
    // $('.slickslidernav').slick({
    //     slidesToShow: 0,
    //     asNavFor: '.slickmain',
    //     arrows: false,
    //     focusOnSelect: true,
    //     draggable: false
    // });
    (shouldItScroll == 0) ? '' : $('html,body').animate({scrollTop: ($('#map-feature').offset().top - (($(window).width() < 992) ? 440 : 50))});
    shouldItScroll = 1;
}
triggerClick(0);
})(jQuery);
