    $(document).ready(function() {

        var slide_width;
        var slide_count = $('ul.EDX-slider>li').length;
        var maxHeight;
        var myTimer;


        clearTimeout(myTimer);
        myTimer = setTimeout(function() {
            doResize();
        }, 250);


        $(window).resize(function() {
            doResize();
        });

        function doResize() {
            console.log("resizing");


            $("ul.EDX-slider>li").css("height", "auto");

            slide_width = $("div.EDX-slider-container").width();


            $("ul.EDX-slider>li").css("width", slide_width);

            $("ul.EDX-slider").css("width", slide_width * slide_count);



            var newMarginLeft = (current_slide - 1) * -slide_width;
            var newMarginLeftString = "margin-left: " + newMarginLeft + "px !important";
            $('.EDX-slider').attr('style', newMarginLeftString);


            clearTimeout(myTimer);
            myTimer = setTimeout(function() {
                maxHeight = 0;
                $("ul.EDX-slider>li").each(function() {
                    if ($(this).innerHeight() > maxHeight) {
                        maxHeight = $(this).innerHeight();
                    }
                });
                console.log("maxHeight: " + maxHeight);
                $("ul.EDX-slider>li").css("height", maxHeight);
            }, 250);


        }



        var current_slide = 1;
        for (var i = 1; i <= slide_count; i++) {
            $('.nav-dots').append('<a href="#" data-slide-id="' + i + '">' + i + '</a>');
        }

        moveSlider();

        $(".nav-dots a").click(function() {
            event.preventDefault();
            var new_slide = $(this).attr('data-slide-id');
            current_slide = new_slide;
            moveSlider();
        });

        $("#previous-slide").click(function() {
            event.preventDefault();
            if (current_slide > 1) {
                current_slide--;
                moveSlider();
            }
        });
        $("#next-slide").click(function() {
            event.preventDefault();
            if (current_slide < slide_count) {
                current_slide++;
                moveSlider();
            }
        });

        function moveSlider() {

            var newMarginLeft = (current_slide - 1) * -slide_width;
            var newMarginLeftString = "margin-left: " + newMarginLeft + "px !important";
            $('.EDX-slider').attr('style', newMarginLeftString);


            $('.EDX-slider-nav a').removeClass('anchor-disabled');

            if (current_slide == 1) {
                $('#previous-slide').addClass('anchor-disabled');
            } else if (current_slide == slide_count) {
                $('#next-slide').addClass('anchor-disabled');
            }

            $('.EDX-slider-nav .nav-dots a').removeClass('slide-active anchor-disabled');
            $('.EDX-slider-nav .nav-dots a:nth-child(' + current_slide + ')').addClass('slide-active anchor-disabled');

        }



    });
