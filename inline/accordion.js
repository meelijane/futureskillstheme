$(document).ready(function() {
    $('.accordion-section .accordion-content').hide();

    $('.accordion-section h3').wrap('<a class="accordion-heading" href="#"></a>');

    $(".accordion-heading").click(function(event) {

      event.preventDefault();

      $(this).toggleClass('on');

      $(this).parent().toggleClass('on');

      $(".accordion-section").each(function() {
        if ($(this).hasClass('on')) {
          $('.accordion-content', this).show(250);
        } else {
          $('.accordion-content', this).hide(250);
        }

      });

    });

  });