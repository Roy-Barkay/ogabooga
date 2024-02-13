define(["jquery", "utils"], function ($, utils) {
    try {
        var $body = $('body');
        $body.on('click', '.info_icon, .info_link', function () {
            var $icon = $(this);
            var id = $icon.data("id");
            var $box = $icon.parents(".box");
            var info_panel;
            if ($box.length === 0) {
                $box = $icon.parents(".frame-content");
            }
            info_panel = $box.find(".info_panel[data-id=" + id + "]");
            if (window.ie9 || window.ie8) {
                var body_height = info_panel.height() - 59;
                info_panel.find(".info_panel_body").css({
                    height: body_height
                });
            }
            
            info_panel.slideDown(function () {

                info_panel.addClass("open");
                info_panel.find('.info_close').focus();
            });
            $box.find('#loginFormId').hide();
            utils.PostMsg_Post("<PostData><Action>HideAnotherOrgLink</Action></PostData>");
            return false;
        });
        $body.on('click', '.info_close', function () {
            $(this).closest('.info_panel').siblings('#loginFormId').show();
            $(this).parents(".info_panel").removeClass("open").slideUp();
            utils.PostMsg_Post("<PostData><Action>ShowAnotherOrgLink</Action></PostData>");
        });
        $("body").on('keypress', '.info_close', function (e) {
            if (e.which === 13) {
                $(this).closest('.info_panel').siblings('#loginFormId').show();
                $(this).parents(".info_panel").removeClass("open").slideUp();
                utils.PostMsg_Post("<PostData><Action>ShowAnotherOrgLink</Action></PostData>");
            }
        });
        $(document).keyup(function (e) {
            if (e.keyCode == 27) {
                $('.info_close').click();
            } // esc
        });
    } catch (err) {
        console.log("JS ERROR - info_panel");
        console.log(err);
    }
});
