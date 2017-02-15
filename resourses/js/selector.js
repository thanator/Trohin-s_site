$( document ).ready(function() {



     $('.cs-options ul li:first-child').click(function() {
        $('#label-1').css('display', 'block');
        $('#label-2').css('display', 'none');
        $('#label-3').css('display', 'none');
        $('#label-4').css('display', 'none');
        $('#label-5').css('display', 'none');
     });
     $('.cs-options ul li:nth-child(2)').click(function() {
        $('#label-1').css('display', 'none');
        $('#label-2').css('display', 'block');
        $('#label-3').css('display', 'none');
        $('#label-4').css('display', 'none');
        $('#label-5').css('display', 'none');
     });
     $('.cs-options ul li:nth-child(3)').click(function() {
        $('#label-1').css('display', 'none');
        $('#label-2').css('display', 'none');
        $('#label-3').css('display', 'block');
        $('#label-4').css('display', 'none');
        $('#label-5').css('display', 'none');
     });
     $('.cs-options ul li:nth-child(4)').click(function() {
        $('#label-1').css('display', 'none');
        $('#label-2').css('display', 'none');
        $('#label-3').css('display', 'none');
        $('#label-4').css('display', 'block');
        $('#label-5').css('display', 'none');
     });
     $('.cs-options ul li:nth-child(5)').click(function() {
        $('#label-1').css('display', 'none');
        $('#label-2').css('display', 'none');
        $('#label-3').css('display', 'none');
        $('#label-4').css('display', 'none');
        $('#label-5').css('display', 'block');
     });

});
