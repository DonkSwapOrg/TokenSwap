$(function () {
  "use strict";

  /*---------------------------------------------------
      Countdown JS
    ---------------------------------------------------*/

  var config = {
    endDate: "2021-05-30 18:00",
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

  /*---------------------------------------------------
      Pie Chart 01
    ---------------------------------------------------*/

  const tooltipLabelFormatter = (tooltipItem, data) =>
    data.labels[tooltipItem.index] +
    ": " +
    data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] +
    "%";

  var ctx = $("#distChart");
  // And for a pie chart
  var distChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: [
        "Initial Liquidity (20,000)",
        "Public Sale (22,000)",
        "Private Sale (28,000)",
      ],
      datasets: [
        {
          label: "Token Distribution",
          data: [28.6, 31.4, 40.0],
          backgroundColor: ["#5aa5f8", "#d7a7ff", "#ffffff"],
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      aspectRatio: 1,
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: tooltipLabelFormatter,
        },
      },
    },
  });
  $("#dist_legend").html(distChart.generateLegend());

  /*---------------------------------------------------
      Pie Chart 02
    ---------------------------------------------------*/

  var cty = $("#alloChart");
  // And for a pie chart
  var alloChart = new Chart(cty, {
    type: "pie",
    data: {
      labels: ["Liquidity ($20,000)", "More Audits ($30,000)"],
      datasets: [
        {
          label: "Allocation of pre-sale funds",
          data: [40, 60],
          backgroundColor: ["#51ffd0", "#ffe56a"],
          borderWidth: 0,
          hoverOffset: 4,
          cutout: "50%",
        },
      ],
    },
    options: {
      responsive: true,
      aspectRatio: 1,
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: tooltipLabelFormatter,
        },
      },
    },
  });
  $("#allo_legend").html(alloChart.generateLegend());

  function newLocation(page) {
    window.location.href = `${page}.html`;
  }
});

/*
 * // End $ Strict Function
 * ------------------------ */
