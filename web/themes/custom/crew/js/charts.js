(function ($, Drupal) {
  $(document).ready(function () {
    // Get all graph canvases on the page
    var canvases = document.querySelectorAll(".paragraph--type--chart canvas");
    // Call createGraph() on each canvas
    canvases.forEach(function (i) {
      createGraph(i);
    });

    // Graph creation function
    function createGraph(canvas) {
      // Grab all labels from hidden divs
      var getLabels = canvas.querySelectorAll(
        ".field--name-field-chart-label .field--item"
      );
      var allLabels = [].map.call(getLabels, (el) => el.innerHTML);

      // Grab all data from hidden divs
      var getData = canvas.querySelectorAll(
        ".field--name-field-chart-data .field--item"
      );
      var allData = [].map.call(getData, (el) => parseFloat(el.innerHTML));

      // Colors - REPLACE WITH CWRU BLUE TINTS
      const COLORS = [
        "#0A304E",
        "#a1acbd",
        "#375576",
        "#3d4756",
        "#617ca0",
        "#8ba7cc",
        "#b7d3fa",
        "#CCE4FF",
      ];

      // Build the chart
      var finalChart = new Chart($("#" + canvas.id), {
        type: "doughnut",
        overrides: {
          plugins: {
            legend: {
              maxWidth: 300,
            },
          },
        },
        data: {
          labels: allLabels,
          datasets: [
            {
              data: allData,
              backgroundColor: COLORS,
            },
          ],
        },
        options: {
          responsive: true,
          legend: {
            position: "bottom",
          },
        },
      });
    }
  });
})(jQuery, Drupal);
