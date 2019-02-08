$(document).ready(function() {
    $(".button-more").click(function() {
      event.preventDefault();
      $(this).parent().parent().find(".content-more").show(500);
      $(this).hide();
    });
    $(".button-less").click(function() {
      event.preventDefault();
      $(this).parent().parent().parent().find(".content-more").hide(500);
      $(this).parent().parent().parent().find(".button-more").show();
    });
  });