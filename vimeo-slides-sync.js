(function($) {
  $.fn.vimeoSlidesSync = function(config) {

    var slidesConfig = config.slides || config;

    if (slidesConfig == undefined || slidesConfig.length == 0) {
      return;
    }

    var containerSelector = config.slideContainer || "#" + this[0].id + "-slides";
    var container = $(containerSelector);

    var timings = $.map(slidesConfig, function(element) {
      var timeUnits = element.timing.split(":");
      var increment = 1;
      var seconds = 0;
      for ( var i = timeUnits.length - 1; i >= 0; i--) {
        seconds += increment * timeUnits[i];
        increment *= 60;
      }
      return {
        src : element.src,
        seconds : seconds
      };
    });

    timings.sort(function(a, b) {
      return a.seconds - b.seconds;
    });

    var currentSlide = timings[0];
    displayImg(timings[0], timings[1]);

    $f(this[0].id).addEvent('ready',
        function(player_id) {
          var froogaloop = $f(player_id);

          function updateSlides(data) {
            var i = 0;
            while (i < timings.length && data.seconds >= timings[i].seconds) {
              i++;
            }
            if (currentSlide != timings[i - 1].src) {
              currentSlide = timings[i - 1];
              displayImg(currentSlide, timings[i]);
            }
          }

          froogaloop.addEvent('playProgress', updateSlides);
          froogaloop.addEvent('seek', updateSlides);
        });

    function displayImg(timing, nextTiming) {
      container.html('<img src="' + timing.src + '" />');
      if (nextTiming != undefined) {
        container.append('<img src="' + nextTiming.src + '" style="display:none" />');
      }
    }

  }
})(jQuery);