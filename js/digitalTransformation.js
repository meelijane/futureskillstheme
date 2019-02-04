$(document).ready(function() {

  $(".problems-wrapper").each(function() {
    $(this).wrap('<div class="bordered-box" style="margin-bottom: 26px" />');
    $(this).before('<div class="bg-blue header-bar"></div>');
    $(this).wrap('<div class="padded-container-quiz" />');
  });



  var unpackingLoop;
  $(document).on('mouseup', 'button.submit', function(e) {
    // after submit button pressed spam page with unpacker script to pick up the replaced SVG icon
    unpackingLoop = setInterval(function() {unpackSVG()}, 100);
    setTimeout(function() {
      clearInterval(unpackingLoop);
    }, 2000);
  });

  function unpackSVG() {
    $('img.svg-icon').each(function() {
      var $img = $(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');
      $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');
        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');
        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }
        // Replace image with new SVG
        $img.replaceWith($svg);
      }, 'xml');
    });
  }

});
