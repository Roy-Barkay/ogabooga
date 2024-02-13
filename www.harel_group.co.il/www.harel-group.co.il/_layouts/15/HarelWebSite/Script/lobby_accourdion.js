define(["jquery", "utils", "resize"], function ($, utils) {
    try {
        $(window).bind('resizeEnd', function () {
            if ($(window).width() <= 519) {
                $('#faq_lobby .faq_list').css('display', 'none');
                $('#faq_lobby').removeClass('active_heading');
            } else {
                $('#faq_lobby').removeClass('active_heading');
                $('#faq_lobby .faq_list').css('display', 'block');
            }
        });
        $('#faq_lobby').click(function () {
            if ($(window).width() <= 519) {
                if ($(this).hasClass('active_heading')) {
                    $('#faq_lobby .faq_list').slideUp();
                    $('#faq_lobby').removeClass('active_heading');
                } else {
                    $('#faq_lobby .faq_list').slideDown();
                    $('#faq_lobby').addClass('active_heading');
                }
            }
        });
    } catch (err) {
        console.log("JS ERROR - lobby_accourdion");
        console.log(err);
    }
});
