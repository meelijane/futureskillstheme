$(document).ready(function() {
    var url = "/static/confetti-rain.gif" + "?cb=" + Math.random();
    $("img#restart-me").attr("src", url);
  });