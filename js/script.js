$(function () {
  "use strict";

  /*---------------------------------------------------
      Countdown JS
    ---------------------------------------------------*/

  var config = {
    endDate: "2021-06-07 18:00",
    timeZone: "Europe/Dublin",
    hours: $("#hours"),
    minutes: $("#minutes"),
    seconds: $("#seconds"),
  };

  function endEvent($el, newText, hideEl) {
    $el.text(newText);
    hideEl.hide();
  }

  function prependZero(number) {
    return number < 10 ? "0" + number : number;
  }

  $.extend(true, config || {});
  var currentTime = moment();
  var endDate = moment.tz(config.endDate, config.timeZone);
  var diffTime = endDate.valueOf() - currentTime.valueOf();
  var duration = moment.duration(diffTime, "milliseconds");
  var days = duration.days();
  var interval = 1000;
  var subMessage = $(".sub-message");
  var clock = $(".clock");

  if (diffTime < 0) {
    endEvent(subMessage, config.newSubMessage, clock);
    return;
  }

  if (days > 0) {
    $("#days").text(prependZero(days));
    $(".days").css("display", "inline-block");
  }

  var intervalID = setInterval(function () {
    duration = moment.duration(duration - interval, "milliseconds");
    var hours = duration.hours(),
      minutes = duration.minutes(),
      seconds = duration.seconds();
    days = duration.days();
    if (hours <= 0 && minutes <= 0 && seconds <= 0 && days <= 0) {
      clearInterval(intervalID);
      endEvent(subMessage, config.newSubMessage, clock);
      window.location.reload();
    }
    if (days === 0) {
      $(".days").hide();
    }
    $("#days").text(prependZero(days));
    config.hours.text(prependZero(hours));
    config.minutes.text(prependZero(minutes));
    config.seconds.text(prependZero(seconds));
  }, interval);
});
/*
 * // End $ Strict Function
 * ------------------------ */

////////////////////////////////////////////////
////////// Pure Javascript
///////////////////////////////////////////////

//generate particles
for (var i = 1; i <= 35; i++) {
  var circle = document.createElement("div");
  circle.className = "circle";
  var circleContainer = document.createElement("div");
  circleContainer.className = "circle-container";
  circleContainer.appendChild(circle);
  document.querySelector(".particles").appendChild(circleContainer);
}

// <block:plugin:0>
const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    //listContainer.style.display = "flex";
    listContainer.style.flexDirection = "row";
    listContainer.style.margin = 0;
    listContainer.style.padding = 0;

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

const htmlLegendPlugin = {
  id: "htmlLegend",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach((item) => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      li.style.cursor = "pointer";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.marginLeft = "10px";

      li.onclick = () => {
        const { type } = chart.config;
        if (type === "pie" || type === "doughnut") {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex)
          );
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement("span");
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + "px";
      boxSpan.style.display = "inline-block";
      boxSpan.style.height = "20px";
      boxSpan.style.marginRight = "10px";
      boxSpan.style.width = "20px";

      // Text
      const textContainer = document.createElement("p");
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  },
};
// </block:plugin>

/*---------------------------------------------------
      Pie Chart 01
    ---------------------------------------------------*/

var ctx = document.getElementById("dist-chart");
var myChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Pre-Sale (50,000 NOVA)", "Initial Liquidity (20,000 NOVA)"],
    datasets: [
      {
        label: "Token Distribution",
        data: [71.4, 28.6],
        backgroundColor: ["#159bd2", "#8cd0e5"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      htmlLegend: {
        containerID: "dist-legend",
      },
      legend: {
        display: false,
      },
    },
  },
  plugins: [htmlLegendPlugin],
});

/*---------------------------------------------------
      Pie Chart 02
    ---------------------------------------------------*/

var ctx = document.getElementById("allo-chart");
var myChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Audits ($30,000)", "Liquidity ($20,000)"],
    datasets: [
      {
        label: "Allocation of pre-sale funds",
        data: [60, 40],
        backgroundColor: ["#9430b5", "#ba5ae2"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      htmlLegend: {
        containerID: "allo-legend",
      },
      legend: {
        display: false,
      },
    },
  },
  plugins: [htmlLegendPlugin],
});
