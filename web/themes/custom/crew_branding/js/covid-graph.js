(function ($, Drupal) {
  $(document).ready(function () {
    // Get all graph canvases on the page
    var canvases = document.querySelectorAll(
      ".paragraph--type--covid-graph canvas"
    );
    // Call createGraph() on each canvas
    canvases.forEach(function (i) {
      createGraph(i);
    });

    // Graph creation function
    function createGraph(canvas) {
      // Date data
      var getDateLabels = canvas.querySelectorAll(
        ".field--name-field-date-labels .field--item"
      );
      var dateLabels = [].map.call(getDateLabels, function (el) {
        return el.innerHTML;
      });

      // Line 1 data
      var getLine1 = canvas.querySelectorAll(
        ".field--name-field-line-1-data .field--item"
      );
      var line1Data = [].map.call(getLine1, function (el) {
        return el.innerHTML;
      });

      // Line 2 data
      var getLine2 = canvas.querySelectorAll(
        ".field--name-field-line-2-data .field--item"
      );
      var line2Data = [].map.call(getLine2, function (el) {
        return el.innerHTML;
      });

      // Bar 1 data
      var getBar1 = canvas.querySelectorAll(
        ".field--name-field-bar-1-data .field--item"
      );
      var bar1Data = [].map.call(getBar1, function (el) {
        return el.innerHTML.split(".")[0];
      });

      // Bar 2 data
      var getBar2 = canvas.querySelectorAll(
        ".field--name-field-bar-2-data .field--item"
      );
      var bar2Data = [].map.call(getBar2, function (el) {
        return el.innerHTML.split(".")[0];
      });

      // Get all labels
      if (canvas.querySelector(".field--name-field-line-1-label")) {
        var getLabel1 = canvas.querySelector(".field--name-field-line-1-label")
          .innerHTML;
      }
      if (canvas.querySelector(".field--name-field-line-2-label")) {
        var getLabel2 = canvas.querySelector(".field--name-field-line-2-label")
          .innerHTML;
      }
      if (canvas.querySelector(".field--name-field-bar-1-label")) {
        var getLabel3 = canvas.querySelector(".field--name-field-bar-1-label")
          .innerHTML;
      }
      if (canvas.querySelector(".field--name-field-bar-2-label")) {
        var getLabel4 = canvas.querySelector(".field--name-field-bar-2-label")
          .innerHTML;
      }

      // Settings for all data
      var line1 = {
        label: getLabel1,
        data: line1Data,
        backgroundColor: "rgba(49, 104, 166, 0.05)",
        borderColor: "rgba(49, 104, 166, 1)",
        borderWidth: 3,
        type: "line",
      };

      var line2 = {
        label: getLabel2,
        data: line2Data,
        backgroundColor: "rgba(97, 97, 97, 0.05)",
        borderColor: "rgba(97, 97, 97, 1)",
        borderWidth: 3,
        type: "line",
      };

      var bar1 = {
        label: getLabel3,
        data: bar1Data,
        backgroundColor: "rgba(97, 97, 97, 0.05)",
        borderColor: "rgba(97, 97, 97, 1)",
        borderWidth: 3,
        type: "bar",
      };

      var bar2 = {
        label: getLabel4,
        data: bar2Data,
        backgroundColor: "rgba(	10, 48, 78, 0.05)",
        borderColor: "rgba(	10, 48, 78, 1)",
        borderWidth: 3,
        type: "bar",
      };

      // Create final data array and push all data to it
      var datasetArray = [];

      if (line1Data.length) {
        datasetArray.push(line1);
      }
      if (line2Data.length) {
        datasetArray.push(line2);
      }
      if (bar1Data.length) {
        datasetArray.push(bar1);
      }
      if (bar2Data.length) {
        datasetArray.push(bar2);
      }

      console.log(datasetArray);

      // Chart options
      Chart.defaults.global.responsive = true;

      var chartOptions = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: 1,
              },
            },
          ],
        },
        legend: {
          position: "bottom",
        },
      };

      var graphType = bar1Data.length ? "bar" : "line";

      // Build the chart
      var casesChart = new Chart($("#" + canvas.id), {
        type: graphType,
        data: {
          labels: dateLabels,
          datasets: datasetArray,
        },
        options: chartOptions,
      });
    }
  });
})(jQuery, Drupal);
