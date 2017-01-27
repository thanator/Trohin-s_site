$(document).ready(function () {



    $(".js__klick_1_to_2").click(function () {
        $("#page01").hide();
        $("#page02").show();
    });

    $(".js__klick_1_to_3").click(function () {
        $("#page01").hide();
        $("#page03").show();
    });
    $(".js__klick_2_to_1").click(function () {
        $("#page02").hide();
        $("#page01").show();
    });
    $(".js__klick_2_to_3").click(function () {
        $("#page02").hide();
        $("#page03").show();
    });
    $(".js__klick_3_to_1").click(function () {
        $("#page03").hide();
        $("#page01").show();
    });
    $(".js__klick_3_to_2").click(function () {
        $("#page03").hide();
        $("#page02").show();
    });

});