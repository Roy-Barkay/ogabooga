define(["jquery", "main_menu_new", "resize"], function ($, main_menu_new) {
    try {
        var is_tabbing = false,
            $popover = null,
            $next = null;
        $(".acc_link").focus(function () {
            $(".accessibility_nav").css("z-index", "77");
            $(this).addClass("visible-link").removeClass("hidden-link");
            //$('.all_wrapper').css("margin-top", "26px");
        });
        $(".acc_link").blur(function () {
            $(".accessibility_nav").css("z-index", "-10");
            $(this).removeClass("visible-link").addClass("hidden-link");
            $('.all_wrapper').css("margin-top", "0");
        });
        $("#acc_login.acc_link").click(function () {
            main_menu_new.openUserBox();
            return false;
        })
        $("#acc_search.acc_link").click(function () {
            if ($('.home_carousel').length > 0) {
                $("#big_search").focus();
            } else {
                main_menu_new.showSearch();
            }
            return false;
        })
        $('body').keydown(function (e) {
            // console.log('keyup called');
            var code = e.keyCode || e.which;
            if (code == '9') { //tab
                is_tabbing = true;
            } else if (code == 27) { //escape
                if ($popover) {
                    returnToPopoverLink();
                }
            } else if (code == 13) { //enter
                if ($popover && $(e.target).hasClass('close-btn')) {
                    returnToPopoverLink();
                }
            }
        });
        var returnToPopoverLink = function () {
            var $btn = $('.popover').closest('.popover_container').find('.popover_btn');
            $popover = null;
            $btn.popover('hide');
            $btn.focus();
        };
        $('.popover_btn').on('shown.bs.popover', function (e) {
            if (is_tabbing) {
                $popover = $(e.target).parent().find('.popover');
                $popover.find('.close-btn').focus();
            }
        });
        //$('.autocomplete_input').on('blur', function(e){
        //    if (is_tabbing && $(e.target).parent().find('.auto-complete-wrapper').css('display') == 'block') {
        //        $next = $($(e.target).parent().find('.auto-complete-wrapper tbody tr td a')[0]);
        //        $next.focus();
        //        if($(e.target).parent().find('.auto-complete-wrapper tbody tr td a')[1]) {
        //            $next = $($(e.target).parent().find('.auto-complete-wrapper tbody tbody tr td a')[1]);
        //        } else {
        //            $next = null;
        //            debugger;
        //        }
        //    }
        //});
        //$('.auto-complete-wrapper tbody tr td a').on('blur', function(e){
        //    if (is_tabbing) {
        //        if($(e.target).next('tbody tr td a')) {
        //            debugger;
        //            $('body').click();
        //        }
        //    }
        //});
        $('body').mouseup(mouse);

        function mouse(e)
        {
            is_tabbing = false;
            $popover = null;
        }
        $(document).on('focus', "a, input,li,div, span, div.button", null, function (event) {
            if (is_tabbing) {
                if ($popover && !$.contains($popover[0], event.target)) {
                    var $btn = $popover.find('.close-btn');
                    $btn.focus();
                    $btn.addClass("focused");
                } else {
                    $(event.target).addClass("focused");
                }
            }
        }).on('blur', "*", null, function (event) {
            $(event.target).removeClass("focused");
        });
        $(document).on('blur', '.more_filters ul li:last a', function () {
            $(".more_filters ul").slideUp(300);
            $('.more_filters').toggleClass('slidenavArrow');
        });
        $(document).on('blur', '.auto-complete-wrapper tr:last td a', function () {
            $('body').click();
        });
        $(document).on('blur', '.megamenu_wrapper li:last', function () {
            $('.megamenu').css({
                visibility: 'hidden'
            });
        });
        window.accessability = mouse;
        return {
            mouseup:mouse

        };
    } catch (err) {
        console.log("JS ERROR - accessibility");
        console.log(err);
    }
});
