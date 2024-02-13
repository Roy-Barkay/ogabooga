define(["jquery", "framework"], function ($) {
    try {
        var current_type;
        var types = {};
        $(document).ready(function () {
            if ($('#archive_category').length > 0 && AreaAndProducts) {

                activateSelect(AreaAndProducts);
            }
            $("#filter_info_form .right-block span").click(function () {
                $("#filter_info_form").toggleClass("advanced_open")
                $("#filter_info_form .advanced").toggle();
                $(this).attr('aria-expanded',                
                    $(this).attr('aria-expanded') == 'false' ? 'true' : 'false'
                );
            })

            if (window.current_device == "tablet_protrait" || window.current_device == "mobile") {
                if ("" !== window.location.search && ($("#forms").length > 0 || $("#policies").length > 0)) {
                    var height = $("#filter_info_form").height() + $("#filter_info_form").offset().top;
                    $('html, body').animate({
                        scrollTop: height
                    }, 500);
                }
                else if ($("#agents_search_noresults").length > 0)
                    $("body").scrollTo("#agents_search_noresults");
            }
        });

        function activateSelect(data) {

            $('#archive_category').empty();
            $.each(data.AreaAndProducts, function (i, el) {
                var selected = '';
                if (data.GeneralAxisDefaultVal == el.Value) {
                    selected = "selected";
                    current_type = el.Value;
                }
                types[el.Value] = el.Terms || [];
                $('#archive_category').append('<option value="' + el.Value + '" ' + selected + ' >' + el.Text + '</option>');
            });
            populateType(true);
            function populateType(initial) {
                $('#archive_type').empty();
                $.each(types[current_type], function (i, el) {
                    var selected = '';
                    if (initial && data.SpecificXAxisDefaultVal == el.Value) {
                        selected = "selected";
                        type = el.Terms;
                    }
                    $('#archive_type').append('<option value="' + el.Value + '" ' + selected + ' >' + el.Text + '</option>');
                });
            }

            $('#archive_category').change(function (e) {
                current_type = this.value;
                populateType();
            });

        }
        return {activateSelect:activateSelect}

    } catch (err) {
        console.log("JS ERROR - accessibility");
        console.log(err);
    }
});
