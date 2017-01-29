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