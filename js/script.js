$(function () {

    "use strict";

    /*---------------------------------------------------
      Countdown JS
    ---------------------------------------------------*/

    var $countdownClass = $('.countdown-clock');

    if ($countdownClass.length > 0) {
        var datetime = $countdownClass.data('datetime'); //Month Days, Year HH:MM:SS
        var date = new Date(datetime);
        var now = new Date();
        var diff;
        if (datetime == "" || datetime == null || date < now) {
            diff = 3600 * 24 * 3.1; // default fallback date 
        } else {
            diff = (date.getTime() / 1000) - (now.getTime() / 1000);
        }

        var clock = $countdownClass.FlipClock(diff, {
            // ... your options here
            clockFace: 'DailyCounter',
            countdown: true,
        });
    }

    /*---------------------------------------------------
      Donut Chart 01
    ---------------------------------------------------*/

    var ctx = $("#distChart");
    // And for a pie chart
    var distChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Initial Liquidity (20,000)", "Pre-sale (50,000)"],
            datasets: [{
                label: "Token Distribution",
                data: [28.6, 71.4],
                backgroundColor: [ "#5aa5f8", "#d7a7ff"],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            aspectRatio: 1,
            legend: {
                display: false,
            },
        }
    });
    $("#dist_legend").html(distChart.generateLegend());

    /*---------------------------------------------------
      Donut Chart 02
    ---------------------------------------------------*/

    var cty = $("#alloChart");
    // And for a pie chart
    var alloChart = new Chart(cty, {
        type: 'pie',
        data: {
            labels: ["Initial Liquidity", "Audits"],
            datasets: [{
                label: "Allocation of pre-sale funds",
                data: [40, 60],
                backgroundColor: ["#51ffd0", "#ffe56a"],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            aspectRatio: 1,
            legend: {
                display: false,
            },
        }
    });
    $("#allo_legend").html(alloChart.generateLegend());


});

/*---------------------------------------------------
     Owl Carousel
   ---------------------------------------------------*/

var $testimonalSlider = $('.testimonial-slider');

if ($testimonalSlider.length && $.fn.owlCarousel) {
    $testimonalSlider.owlCarousel({
        loop: false,
        autoplay: false,
        autoHeight: true,
        items: 1,
        navText: [
            "<img src=\"images/arrow-left.svg\" class=\"dark\"><img src=\"images/arrow-left-black.svg\" class=\"light\">",
            "<img src=\"images/arrow-right.svg\" class=\"dark\"><img src=\"images/arrow-right-black.svg\" class=\"light\">"
        ],
        responsive: {
            0: {
                dots: true,
                nav: false,
            },
            768: {
                dots: false,
                nav: true,
            }
        }
    });
}

/*
 * // End $ Strict Function
 * ------------------------ */