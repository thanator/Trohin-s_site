
$(document).ready(function () {
    //MOBILE NAV


    $('.js__nav_icon').click(function () {
        var nav = $('.tree_nav ul');
        var icon = $('.js__nav_icon i');

        nav.slideToggle(200);
        if (icon.hasClass('ion-navicon-round')) {
            icon.addClass('ion-close-round');
            icon.removeClass('ion-navicon-round');
        } else {
            icon.addClass('ion-navicon-round');
            icon.removeClass('ion-close-round');
        }
    });
});