$(document).ready(function () {

    var box = $('.exam_box');


    $('.js__work_0_to_1').click(function () {

        if (box.hasClass('disp')) {

            box.removeClass('disp');
            setTimeout(function () {
                box.removeClass('visuallyhidden');
            }, 20);

        } else {

            box.addClass('visuallyhidden');

            box.one('transitionend', function (e) {

                box.addClass('disp');

            });

        }

        
setTimeout(function() {
      $('.exam_box_1').removeClass('disp');
}, 200);
       
    });

    $('.js__work_1_to_0').click(function () {
        if (box.hasClass('disp')) {

            box.removeClass('disp');
            setTimeout(function () {
                box.removeClass('visuallyhidden');
            }, 20);

        } else {

            box.addClass('visuallyhidden');

            box.one('transitionend', function (e) {

                box.addClass('disp');

            });

        }
        $('.exam_box_1').addClass('disp');
    });

    $('.js__work_0_to_2').click(function () {
 
        if (box.hasClass('disp')) {

            box.removeClass('disp');
            setTimeout(function () {
                box.removeClass('visuallyhidden');
            }, 20);

        } else {

            box.addClass('visuallyhidden');

            box.one('transitionend', function (e) {

                box.addClass('disp');

            });

        }
setTimeout(function() {
        $('.exam_box_2').removeClass('disp');
}, 200);

    });

    $('.js__work_2_to_0').click(function () {
        if (box.hasClass('disp')) {

            box.removeClass('disp');
            setTimeout(function () {
                box.removeClass('visuallyhidden');
            }, 20);

        } else {

            box.addClass('visuallyhidden');

            box.one('transitionend', function (e) {

                box.addClass('disp');

            });

        }

       
        $('.exam_box_2').addClass('disp');
    });

    $('.js__work_0_to_3').click(function () {

        if (box.hasClass('disp')) {

            box.removeClass('disp');
            setTimeout(function () {
                box.removeClass('visuallyhidden');
            }, 20);

        } else {

            box.addClass('visuallyhidden');

            box.one('transitionend', function (e) {

                box.addClass('disp');

            });

        }
               setTimeout(function() {
        $('.exam_box_3').removeClass('disp');
}, 200);
    });

    $('.js__work_3_to_0').click(function () {
        if (box.hasClass('disp')) {

            box.removeClass('disp');
            setTimeout(function () {
                box.removeClass('visuallyhidden');
            }, 20);

        } else {

            box.addClass('visuallyhidden');

            box.one('transitionend', function (e) {

                box.addClass('disp');

            });

        }
        $('.exam_box_3').addClass('disp');
    });

    $('.js__work_0_to_4').click(function () {

        if (box.hasClass('disp')) {

            box.removeClass('disp');
            setTimeout(function () {
                box.removeClass('visuallyhidden');
            }, 20);

        } else {

            box.addClass('visuallyhidden');

            box.one('transitionend', function (e) {

                box.addClass('disp');

            });

        }
        setTimeout(function() {
        $('.exam_box_4').removeClass('disp');
}, 200);
       
    });

    $('.js__work_4_to_0').click(function () {
        if (box.hasClass('disp')) {

            box.removeClass('disp');
            setTimeout(function () {
                box.removeClass('visuallyhidden');
            }, 20);

        } else {

            box.addClass('visuallyhidden');

            box.one('transitionend', function (e) {

                box.addClass('disp');

            });

        }
        $('.exam_box_4').addClass('disp');
    });

    $('.js__work_0_to_5').click(function () {
        if (box.hasClass('disp')) {

            box.removeClass('disp');
            setTimeout(function () {
                box.removeClass('visuallyhidden');
            }, 20);

        } else {

            box.addClass('visuallyhidden');

            box.one('transitionend', function (e) {

                box.addClass('disp');

            });

        }

               setTimeout(function() {
        $('.exam_box_5').removeClass('disp');
}, 200);
    });

    $('.js__work_5_to_0').click(function () {
        if (box.hasClass('disp')) {

            box.removeClass('disp');
            setTimeout(function () {
                box.removeClass('visuallyhidden');
            }, 20);

        } else {

            box.addClass('visuallyhidden');

            box.one('transitionend', function (e) {

                box.addClass('disp');

            });

        }
        $('.exam_box_5').addClass('disp');
    });

    $('.js__work_0_to_6').click(function () {
        if (box.hasClass('disp')) {

            box.removeClass('disp');
            setTimeout(function () {
                box.removeClass('visuallyhidden');
            }, 20);

        } else {

            box.addClass('visuallyhidden');

            box.one('transitionend', function (e) {

                box.addClass('disp');

            });

        }

               setTimeout(function() {
        $('.exam_box_6').removeClass('disp');
}, 200);
    });

    $('.js__work_6_to_0').click(function () {
        if (box.hasClass('disp')) {

            box.removeClass('disp');
            setTimeout(function () {
                box.removeClass('visuallyhidden');
            }, 20);

        } else {

            box.addClass('visuallyhidden');

            box.one('transitionend', function (e) {

                box.addClass('disp');

            });

        }
        $('.exam_box_6').addClass('disp');
    });

});