(function ($) {
    $.fn.Feed = function () {
        var id = $(this).attr("id");
        $("#" + id).empty();

        $.ajax({
            url: "https://community.case.edu/rss_calendar?filter=future",
            type: 'GET',
            dataType: 'xml'
        }).done(function (xml) {
            getDataObject(xml);
        });

        function getDataObject(data) {
            const items = data.querySelectorAll("channel item");
            $.each(items, function (e, itm) {
                const title = itm.querySelector("title").textContent;
                const link = itm.querySelector("link").textContent;
                const location = itm.querySelector("eventLocation").textContent;
                const pubDate = new Date(itm.querySelector("pubDate").textContent).toLocaleDateString();
                const time = itm.querySelector("eventTime").textContent;
                const div = $('<div class="event-block"></div>');
                div.append(`<p class="event-title"><a href="${link}">${title}</a></p>`);
                div.append(`<p class="event-location"><i class="fa fa-building mr-5"></i>${location}</p>`);
                div.append(`<p class="event-date"><i class="fa fa-clock-o mr-5"></i>${pubDate}<br>${time}</p>`);

                $("#" + id).append(div);
                if (e == 3) { return false; }
            });
        }
    };

    $("#eventsFeed").Feed();
})(jQuery);