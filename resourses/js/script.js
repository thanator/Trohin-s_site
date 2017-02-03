$(document).ready(function () {


//Sticky nav
    $('.js__main_info').waypoint(function (direction) {
        if (direction == "down") {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }
    }, {
            offset: '60px;'
        });

//Button to top
    $('.js__main_info').waypoint(function (direction) {
        if (direction == "down") {
            $('.move_up').removeClass('hidd');
        } else {
            $('.move_up').addClass('hidd');
        }
    }, {
            offset: '60px;'
        });


    var lastScrollTop = 0;
    $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
    //        $('.move_up').removeClass('fixed');
        } else {
            $('.move_up').addClass('fixed');
        }
        lastScrollTop = st;
    });

//doesn't matter

    $(".js__klick_3_to_2").click(function () {
        $("#page03").hide();
        $("#page02").show();
    });

    //GMAPS

    var map = new GMaps({
        div: '.map',
        lat: 55.7656845,
        lng: 37.6846058,
        zoom: 15
    });

    map.addMarker({
        lat: 55.7656845,
        lng: 37.6846058,
        title: 'Moscow',
        infoWindow: {
            content: '<p>Our MSC</p>'
        }
    });

});

