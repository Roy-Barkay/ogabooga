//1.0.4
var tagcloudUrl = "/style library/images/tagcloud/tc.gif";
var isHomepage = false;
function openend(id) {
  $("#" + id).attr("status", "open");
}

function closed(id) {
  $("#" + id).attr("status", "closed");
}

var jobscounter = 0;

$(window).ready(function () {
  //addPromoIframe();
  if (isEnglishSite()) {
    $("#menu-option-background_6").parent().addClass("addEngLastItemSeparator");
  } else {
    $("#menu-option-background_7").parent().addClass("addLastItemSeparator");
  }

  setJobsCount();
  var aa = window.location.href;
  if (
    aa.indexOf("students.aspx") > -1 ||
    aa.indexOf("operations.aspx") > -1 ||
    aa.indexOf("tech.aspx") > -1 ||
    aa.indexOf("intelligence.aspx") > -1 ||
    aa.indexOf("hq.aspx") > -1
  ) {
    $(".PositionsHeader").siblings("div").eq(0).addClass("block");
  }

  setStyleInArFa();

  SetClassOnApplicationLinks();

  CheckCaptchaFocus();

  SetNumberOfJobsSelected();

  AddIELocationOriginSupport();

  SetMenuItemsHoverEffect();

  SetLanguagesButtonsHoverEffects();

  DisplaySessionTimeoutForcedExitDialog();

  var t = window.location.href;
  t = t.indexOf("/eng/careers/Pages/application.aspx");
  if (t > -1) {
    $(".numberDdl");
  }

  preventTextAreaIllegalChars(
    "ctl00_SPWebPartManager1_g_23d57f04_b4dd_416c_a297_f52c5b9c2344_ctl00_txtBody",
    "danger"
  );

  var absID = $("textarea[id$='txtAbstract']").attr("id");
  if (typeof absID != "undefined") {
    preventTextAreaIllegalChars(absID, "danger");
  }

  var absID = $("textarea[id$='txtSubject']").attr("id");
  if (typeof absID != "undefined") {
    preventTextAreaIllegalChars(absID, "danger");
    $(".commentDetails").parent().addClass("largerfont");
    $("head").append(
      "<style>.largerfont em{ font-size:14px !important; font-weight:bold; color:red !important;  }</script>"
    );
  }

  var absID = $("textarea[id$='txtAddionalContactMethods']").attr("id");
  if (typeof absID != "undefined") {
    preventTextAreaIllegalChars(absID, "danger");
  }

  attachRemovalEvent("txtSubject");
  attachRemovalEvent("txtAddionalContactMethods");
  attachRemovalEvent("txtCV");
  attachRemovalEvent("txtPersonalText");
  attachRemovalEvent("txtStudentFuturePlans");
  attachRemovalEvent("txtMilitaryRemarks");
  attachRemovalEvent("txtMilitaryServedInIntelligenceRemarks");

  $(".menu-icon").each(function (i, o) {
    $(o)
      .parent()
      .on("click", function () {
        console.log("click ");
        location.href = $(this).find(".menuLinkText").attr("href");
      });
  });

  try {
    FixIPadVirtualKeyboardFixedPositionBug();
  } catch (e) {}
  try {
    DisplayIE8Warning();
  } catch (e) {}

  var jobsbasket = window.location.href;

  jobsbasket = jobsbasket.indexOf("jobsbasket.aspx");
  if (jobsbasket > -1) {
    var b = sessionStorage.getItem("selectedPages");
    if (b < 1) {
      $(".JobBassket > div").remove(".resBg");
    }
  }

  $(".addBox a").on("click", function () {
    console.log($(this));
    $("body, #s4-workspace").addClass("overflow");
  });

  $(".PositionsHeader").siblings("div").find("div:first").addClass("allTitle");

  var tt = sessionStorage.getItem("selectedPages");
  if (tt < 1) {
    if ($(".dfwp-list li div img").attr("isselected", "true")) {
      $(".dfwp-list li div img").click();
      if ((window, location.href.indexOf("all.aspx") > -1)) {
        $(".resToggle img").click();
      }
    }
  }
  if ($(".globalButtonDom").length > 1) {
    $(".globalButtonDom").eq(1).remove();
  }
  var a = window.location.href.toLowerCase();

  var selectYear = "";
  var selectMonth = "";
  var selectDay = "";

  if (a.indexOf("encontactus") > -1) {
    selectYear = "Select Year";
    selectMonth = "Select Month";
    selectDay = "Select day";
  }

  if (a.indexOf("contactusfr") > -1) {
    selectYear = "Sélectionnez l'année";
    selectMonth = "Sélectionnez le mois";
    selectDay = "Sélectionnez le jour";
    $("label.label:contains('Country of Origin')").text("Nationalité");
  }

  if (a.indexOf("contactuses") > -1) {
    selectYear = "Seleccione el Año";
    selectMonth = "Seleccione el Mes";
    selectDay = "Seleccione el Día";
    $("label.label:contains('Country of Origin')").text("Ciudadanía");
  }

  if (a.indexOf("contactusar") > -1) {
    selectYear = "اختار";
    selectMonth = "اختار";
    selectDay = "اختار";
  }

  if (a.indexOf("contactusfa") > -1) {
    selectYear = "انتخاب";
    selectMonth = "انتخاب";
    selectDay = "انتخاب";
  }

  if (selectYear != "") {
    var $element = $(".subjects ul li .sky-form .row").eq(1);
    var x = $element.find(".col");
    $.each(x, function (i, v) {
      var ta = $(this).find("option:first-child");
      switch (i) {
        case 0:
          ta.text(selectYear);
          break;
        case 1:
          ta.text(selectMonth);
          break;
        case 2:
          ta.text(selectDay);
          break;
      }
    });
  }
});

function setStyleInArFa() {
  var a = window.location.href.indexOf("contactusar.aspx");
  var b = window.location.href.indexOf("contactusfa.aspx");
  if (a > -1 || b > -1) {
    $(".sky-form").find("select").css("padding-right", "34px");
  }
}

function attachRemovalEvent(inputid) {
  var absID = $("textarea[id$='" + inputid + "']").attr("id");
  if (typeof absID != "undefined") {
    preventTextAreaIllegalChars(absID, "danger");
  }
}

function preventTextAreaIllegalChars(objid) {
  //return;

  $("#" + objid).on("keyup", function () {
    setTimeout(function () {
      //get the value of the input text
      var data = $("#" + objid).val();
      var t = data;
      data = data.replace(/\-/g, "DDDDD");
      var dataFull = data.replace(
        /[^א-ת\u0430-\u044f\u0621-\u064A\u0020\u2000-\u200A\u2028-\u202F ژگکی،پچ a-zA-ZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ0-9٠-٩!?@();/:;/,/._n\s+]/gi,
        ""
      );
      dataFull = dataFull.replace(/DDDDD/g, "-");
      $("#" + objid).val(dataFull);
    }, 1000);
  });

  $("#" + objid).on("keydown", function (e) {
    //console.log(e.which);
    if (
      String.fromCharCode(e.which) != "-" &&
      e.which != 8 &&
      e.which != 13 &&
      e.which != 0 &&
      e.which != 37 &&
      e.which != 38 &&
      e.which != 39 &&
      e.which != 40 &&
      e.which != 188 &&
      e.which != 190 &&
      e.which != 186
    )
      if (
        String.fromCharCode(e.which).match(
          /[^א-ת\u0430-\u044f\u0621-\u064A\u0020\u2000-\u200A\u2028-\u202F ژگکی،پچ a-zA-ZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ0-9٠-٩!?@();/:;/,/._n\s+]/gi
        )
      ) {
        //if (String.fromCharCode(e.which).match(/[^A-Za-zא-ת0-9/_ ]/))
        e.preventDefault();
        //e.stopPropagation();

        displayalert(
          "התו אינו חוקי. יש להזין אותיות בעברית, אנגלית או מספרים",
          "danger"
        );
      }
  });

  $("#" + objid).bind("paste", function () {
    setTimeout(function () {
      //get the value of the input text
      var data = $("#" + objid).val();
      var t = data;
      data = data.replace(/\-/g, "DDDDD");
      var dataFull = data.replace(
        /[^א-ת\u0430-\u044f\u0621-\u064A\u0020\u2000-\u200F\u2028-\u202F ژگکی،پچ a-zA-ZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ0-9٠-٩!?@();/:;/,/._n\s+]/gi,
        ""
      );
      dataFull = dataFull.replace(/DDDDD/g, "-");
      $("#" + objid).val(dataFull);
      if (t != dataFull) {
        displayalert(
          "אחד או יותר מהתווים אינם חוקיים והוסרו מין המלל. יש להזין אותיות בעברית, אנגלית או מספרים",
          "danger"
        );
      }
    }, 50);
  });
}

function displayalert(text, level) {
  if ($("#temp").length == 0) {
    $("textarea[id$='txtBody']").after(
      "<em class='invalid' id='temp'>הוזן תו לא חוקי</em>"
    );
    $("textarea[id$='txtAbstract']").after(
      "<em class='invalid' id='temp'>Special characters disallowed</em>"
    );

    setTimeout(function () {
      $("#temp").remove();
    }, 5000);
  }
}

//this function attemps to fix the scenario in ipads where forms are submitted by pressing enter
function disableEnterOnTexts() {
  $('input:not(input[type="submit"])').keydown(function (e) {
    if (e.keyCode == 13) {
      return false;
    }
  });
}

function initForm() {
  if ($("span[id$='lblErrorTop']").text() == "") {
    $("textarea,input[type='text']").val("").text("");
  }

  /*$("form").keypress(
            function (e) {
                if (e.which == 13) {
                    return (AllowSubmit = validator.form());
                }
            }
        );*/
}

function DisplayIE8Warning() {
  $.reject({
    reject: {
      all: false,
      msie5: true,
      msie6: true,
      msie7: true,
      msie8: true,
      firefox1: true,
      firefox2: true,
      firefox3: true,
    },
    display: ["firefox", "chrome", "msie"],
    browserInfo: {
      msie: {
        text: "Internet Explorer 9+",
      },
    },
    imagePath: "/Style%20Library/Images/browsers/",
    closeCookie: true,
    header: GetLabel("ISIS_Reject_Header"),
    paragraph1: GetLabel("ISIS_Reject_Paragraph1"),
    paragraph2: GetLabel("ISIS_Reject_Paragraph2"),
    closeMessage: GetLabel("ISIS_Reject_CloseMessage"),
    closeLink: GetLabel("ISIS_Reject_CloseLink"),
  });
}

function FixIPadVirtualKeyboardFixedPositionBug() {
  return;
  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    $("input, textarea")
      .on("focus", function () {
        if (IsResponsive()) {
          $("#s4-workspace").css({ marginTop: "0px" });
          $("#template-wrapper").css({ position: "static" });
        } else {
          $("#template-wrapper").css({ position: "absolute" });
        }
        $(window).scrollTop(0);
      })
      .on("blur", function () {
        $(window).scrollTop(0);
        if (IsResponsive()) {
          $("#template-wrapper").css({ position: "fixed" });
          $("#s4-workspace").css({ marginTop: "80px" });
        } else {
          $("#template-wrapper").css({ position: "fixed" });
        }
      });
  }
}

function IsResponsive() {
  var height = $(window).height();
  var width = $(window).width();
  return width <= 768 || height <= 654;
}

function GetLabel(key) {
  if (TextLabels[key]) {
    return TextLabels[key];
  } else {
    return key;
  }
}

function SetMenuItemsHoverEffect() {
  // side menu (global navigation)
  $(".menu-option-holder:not(.selected)").hover(
    function () {
      $("a.menuLinkText, img.menu-icon", this)
        .not(".careers_icon")
        .css("opacity", "1");
      $(".careers_icon", this).addClass("selected").css("opacity", "1");
      $(".menu-option-background", this)
        .stop(false)
        .animate({ width: "100%", queue: false }, 400);
    },
    function () {
      $("a.menuLinkText, img.menu-icon", this)
        .not(".careers_icon")
        .stop(false)
        .animate({ opacity: "0.4" }, 400);
      $(".careers_icon", this).removeClass("selected").css("opacity", "1");
      $(".menu-option-background", this)
        .stop(false)
        .animate({ width: "0px", queue: false }, 400);
    }
  );

  // top menu (current navigation)
  $(".menu-item:not(.selected)").hover(
    function () {
      var inAboutSite = $("form").hasClass("about");
      if (inAboutSite) {
        $(this)
          .stop(false)
          .animate(
            {
              backgroundColor: "rgb(0, 132, 153)",
              color: "rgb(255,255,255)",
              queue: false,
            },
            150
          );
      } else {
        $(this)
          .stop(false)
          .animate({ backgroundColor: "rgb(0, 132, 153)", queue: false }, 150);
      }
    },
    function () {
      var inAboutSite = $("form").hasClass("about");
      if (inAboutSite) {
        $(this)
          .stop(false)
          .animate(
            {
              backgroundColor: "rgba(255, 255, 255,0)",
              color: "#555",
              queue: false,
            },
            200
          );
      } else {
        $(this)
          .stop(false)
          .animate(
            { backgroundColor: "rgba(255, 255, 255,0)", queue: false },
            200
          );
      }
    }
  );
}

function SetNumberOfJobsSelected() {
  var idsArr = 0;
  //jobscounter = sessionStorage.getItem("selectedPages");
  jobscounter = setJobsCount();
  if (
    sessionStorage.selectedPages === undefined ||
    sessionStorage.selectedPages < 0
  ) {
    sessionStorage.setItem("selectedPages", 0);
    jobscounter = sessionStorage.getItem("selectedPages");
    $("#jobcounter").text(jobscounter);
  } else {
    sessionStorage.setItem("selectedPages", jobscounter);
    $("#jobcounter").text(jobscounter);
    var a = window.location.href;
    a = a.indexOf("application.aspx");
    if (a > -1) {
      var b = $(".JobBassket > div").length;
      sessionStorage.setItem("selectedPages", b);
      if (b <= 0) {
        if ($(".dfwp-list li div img").attr("isselected", "true")) {
          $(".dfwp-list li div img").click();
        }
      }
    }
    var aa = window.location.href;
    if (aa.indexOf("all.aspx") > -1) {
      jobscounter = sessionStorage.getItem("selectedPages");
      if ($(".globalButtonDom").length > 1) {
        $(".globalButtonDom").eq(1).remove();
      }
    }
    if (
      aa.indexOf("students.aspx") > -1 ||
      aa.indexOf("operations.aspx") > -1 ||
      aa.indexOf("tech.aspx") > -1 ||
      aa.indexOf("intelligence.aspx") > -1 ||
      aa.indexOf("hq.aspx") > -1
    ) {
      var t = sessionStorage.getItem("selectedPages");
      if (t <= 0) {
        if ($(".dfwp-list li div img").attr("isselected", "true")) {
          $(".dfwp-list li div img").click();
        }
        jobscounter = 0;
        sessionStorage.setItem("selectedPages", 0);
      }
    }
  }
}

function SetClassOnApplicationLinks() {
  var loc = location.href.toLowerCase();
  if (loc.indexOf("eng/careers") != -1) {
    $("span.menu-item-text:contains('application')")
      .closest("li")
      .addClass("applicationlink");
  }
}

function CheckCaptchaFocus() {
  if ($("span[id$='txtCaptchaMessage']").text() != "") {
    try {
      setTimeout(function () {
        $('input[id$="btn_submit"]')[0].scrollIntoView();
        $("input[id$='txtCaptcha']").focus();
      }, 200);
    } catch (e) {}
  }
}

function SetLanguagesButtonsHoverEffects() {
  /*   
     $(".languagesText, .langButton").mouseover(
            function (e, obj) {
                $(e.target).animate({ background-color:  }, 500);
            }).mouseout(
            function (e, obj) {
                $(e.target).animate({ opacity: 0.4 }, 500);
            }
        );*/
}

$(window).resize(function () {
  fixSPResize();
  setBGHeight();
  var height = $(window).height();
  var width = $(window).width();

  if (height <= 768 && width <= 1280) {
    $(".fatcaption-bottom").css("font-size", "24px");
  } else {
    $(".fatcaption-bottom").css("font-size", "30px");
  }
  /*
                if (height <= 640) {
                    $("#menuFooter").css("display", "none");
                    $("#menu-footer-holder").css("display", "block");
                }
                else {
                    $("#menuFooter").css("display", "block");
                    $("#menu-footer-holder").css("display", "none");
                }*/
  var isMobile = width <= 768;
  UpdateTagCloudTarget(isMobile);
});

function AddIELocationOriginSupport() {
  try {
    if (!window.location.origin) {
      window.location.origin =
        window.location.protocol +
        "//" +
        window.location.hostname +
        (window.location.port ? ":" + window.location.port : "");
    }
  } catch (e) {}
}

function UpdateTagCloudTarget(isMobile) {
  var tagCloudTarget = "";
  if (isMobile) {
    tagCloudTarget = location.origin + "/" + getSiteLanguage() + "/careers/";
  } else {
    tagCloudTarget = location.origin + "/" + getSiteLanguage() + "/careers/";
  }
  $("#tcLink").attr("href", tagCloudTarget);
}

function setBGHeight() {
  var height = $(".containerContent").height();
}

var arr = new Array();
$(document).ready(function () {
  setTimeout(function () {
    setBGHeight();
  }, 1000);

  if ($("#zz12_RootAspMenu li").length == 0) {
    $("#sideNavBox").css("display", "none");
  }

  SetSearchControls();

  $(".smp_menu").click(function () {
    openSmpMenu();
  });
  $(".smp_search").click(function () {
    openSmpSearch();
  });
});

function SetSearchControls() {
  $("#searchInput1").keyup(function () {
    var val = $("#searchInput1").val();
    $("#searchInput2").val(val);
  });

  $("#searchInput2").keyup(function () {
    var val = $("#searchInput2").val();
    $("#searchInput1").val(val);
  });

  var k = getParameterByName("k");
  $("#searchInput1").val(k);
  $("#searchInput2").val(k);
  $("#smpSearchInput").val(k);

  $(document).keypress(function (e) {
    if (e.which == 13 && $(e.target).is("[class*='SearchInput']")) {
      search(e.target.id);
    }
  });
}

/**************************************************************************************************/
/*                           Responsive Menu + Search Open/Close                                  */
/**************************************************************************************************/

var openingMenu = false;
var openingSearch = false;

var SmpMenuOpen = false;
var SmpSearchOpen = false;
var MainMenuOpen = false;
function openMainSearch() {
  if (!MainMenuOpen) {
    $("#searchInput1").css("display", "block");
    $("#searchiconbg").css("background-color", "white");
    $("#opensearch").attr("src", "/Style%20Library/Images/searchIcon.png");
    MainMenuOpen = true;
  } else {
    $("#searchInput1").css("display", "none");
    $("#searchiconbg").css("background-color", "inherit");
    $("#opensearch").attr("src", "/Style%20Library/Images/resp_search.png");
    MainMenuOpen = false;
  }
}

function openSmpMenu() {
  if (SmpSearchOpen) {
    openingMenu = true;
    openSmpSearch();
  } else {
    if (!SmpMenuOpen) {
      $("#smp_menu_container").css("top", "-225px");
      $("#smp_menu_container").css("position", "fixed");
      $("#smp_menu_container").animate({ top: "80px" }, 500, qContainerOpen);
      $(".responsive_menu_container").css("width", "auto");
      SmpMenuOpen = true;
    } else {
      $("body").off("click", "", bodyClickWhenMenuOpen);

      $("#smp_menu_container").animate({ top: "-225px" }, 500, qContainerOpen);
      SmpMenuOpen = false;
    }
  }
}

function openSmpSearch() {
  if (SmpMenuOpen) {
    openingSearch = true;
    openSmpMenu();
  } else {
    if (!SmpSearchOpen) {
      $("#smp_search_container").css("top", "0px");
      $("#smp_search_container").animate(
        { top: "80px" },
        500,
        qSearchContainerOpen
      );
      SmpSearchOpen = true;
      $(".globalButtonDom").hide();
    } else {
      $("body").off("click", "", bodyClickWhenMenuOpen);
      $("#smp_search_container").animate(
        { top: "0px" },
        500,
        qSearchContainerOpen
      );
      SmpSearchOpen = false;
      $("#smp_search_container input").val("");
      $(".globalButtonDom").show();
    }
  }
}

function qContainerOpen() {
  if (openingSearch) {
    openingSearch = false;
    openSmpSearch();
  }
  if (SmpMenuOpen) {
    $("body").on("click", "", bodyClickWhenMenuOpen);
  }
}

function qSearchContainerOpen() {
  if (openingMenu) {
    openingMenu = false;
    openSmpMenu();
  }
  if (SmpSearchOpen) {
    $("body").on("click", "", bodyClickWhenMenuOpen);
    $("#smp_search_container input").focus();
  }
}

var bodyClickWhenMenuOpen = function (event) {
  var menuItemClicked =
    $(event.target).parents("#smp_menu_container").length > 0;
  if (SmpMenuOpen && !menuItemClicked) {
    openSmpMenu();
  }

  var searchItemClicked =
    $(event.target).parents("#smp_search_container").length > 0;
  if (SmpSearchOpen && !searchItemClicked) {
    openSmpSearch();
  }
};

/**************************************************************************************************/
/*                                          Utils                                                 */
/**************************************************************************************************/

function parseSearchString(txt) {
  try {
    txt = txt.trim();
    txt = txt.replace(/[`~!@#$%^&*()_|+\-=?;:'<>{\}\[\]\\\/]/gi, "");
  } catch (err) {}

  return txt;
}

function search(inputId) {
  var searchTxt = $("#" + inputId).val();
  searchTxt = parseSearchString(searchTxt);
  if (searchTxt != "") {
    if (isHebrewSite()) {
      location.href =
        "/heb/pages/results.aspx?k=" + encodeURIComponent(searchTxt);
    } else {
      location.href =
        "/eng/pages/results.aspx?k=" + encodeURIComponent(searchTxt);
    }
  }
}

//sets a default value on select inputs - used to set 1980 as selected once a users clicks on a DDL

function setYearAutoSelect() {
  if (window.navigator.userAgent.indexOf("MSIE") == -1) {
    $("select[from='2030']").click(function () {
      if ($(this).attr("selected1980") != "1") {
        $(this).attr("selected1980", "1");
        $(this).val("1980");
      }
    });
  }
}

function redirect(url) {
  try {
    window.location = url;
  } catch (err) {}
}

function redirectTo(target) {
  var url = "";
  if (target == "heb") {
    if (isHomepage) {
      url = location.protocol + "//" + location.host;
    } else {
      var subsiteurl = location.href.toLowerCase().split("/pages/");
      if (subsiteurl.length > 0) {
        url = subsiteurl[0];
      }
      url = url.replace("/eng/", "/heb/");
    }
  } else {
    if (isHomepage) {
      url = location.protocol + "//" + location.host + "/eng";
    } else {
      var subsiteurl = location.href.toLowerCase().split("/pages/");
      if (subsiteurl.length > 0) {
        url = subsiteurl[0];
      }
      url = url.replace("/heb/", "/eng/");
    }
  }

  if (url != "") {
    location.href = url;
  }
}

/**************************************************************************************************/
/*                                          Window Resize                                         */
/**************************************************************************************************/

$(window).ready(function () {
  fixSPResize();
});

function fixSPResize() {
  var menuWidth = parseInt(
    $("#menu-container .menu-content-holder").css("width"),
    10
  );
  var menuHider = parseInt($("#menu-container #menu-hider").width(), 10);
  var templateMenuW = menuWidth + menuHider;
  var currentWidth = $(window).width();

  if (currentWidth > 768) {
    currentWidth -= templateMenuW;
  } else {
    $(".RoyalSliderContainer").css("margin-right", "0px");
  }

  if (currentWidth > 0) {
    $("#ms-designer-ribbon").css("width", currentWidth + "px");
    currentWidth -= 50;
    if (currentWidth > 971) {
      currentWidth = 971;
    }

    var bottomspantagcloud = $(".bottomspantagcloud img");

    if ($(window).width() < 768) {
      $(bottomspantagcloud).css("position", "relative");
    } else {
      $(bottomspantagcloud).css("top", "0px");
    }

    if (currentWidth < 600) {
      $(bottomspantagcloud).css("width", currentWidth + "px");
      $(bottomspantagcloud).css("position", "relative");
      $(bottomspantagcloud).css("right", "-30px");
    } else {
      $(".bottomspantagcloud img").css("width", "");
      $(bottomspantagcloud).css("right", "0px");
    }
  }
}

function hideSubmenu(obj) {
  obj.css("opacity", "0").css("display", "none");
}

function isEnglishSite() {
  return location.href.toLowerCase().indexOf("/eng/") != -1;
}

function isHebrewSite() {
  return (
    location.href.toLowerCase().indexOf("/heb/") != -1 ||
    location.href.toLowerCase().indexOf("/eng/") == -1
  );
}

function getSiteLanguage() {
  return isEnglishSite() ? "eng" : "heb";
}

function getParameterByName(name) {
  var match = RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function DisplaySessionTimeoutForcedExitDialog() {
  if (window.location.hash == "#timeout") {
    window.location.hash = "";

    $("<div>" + GetLabel("ISIS_SessionTimeout_ForcedLogoutMessage") + "</div>")
      .appendTo("body")
      .dialog({
        width: "80%",
        modal: true,
        closeOnEscape: true,
        draggable: false,
        resizable: false,
        dialogClass: "no-close",
        title: GetLabel("ISIS_SessionTimeout_ForcedLogoutTitle"),
        autoOpen: true,
        buttons: {
          Ok: {
            text: GetLabel("ISIS_SessionTimeout_ForcedLogoutButton"),
            id: "timeout-focred_logout_button",
            click: function () {
              $(this).dialog("close");
            },
          },
        },
      });
  }
}

setTimeout(function () {
  window.LBD_LoadSound = function (soundPlaceholderId, soundLink) {
    try {
      if (document.getElementById) {
        var i = soundLink.indexOf("&d=");
        if (-1 != i) {
          soundLink = soundLink.substring(0, i);
        }

        soundLink = soundLink + "&d=" + LBD_GetTimestamp();

        if (
          -1 == soundLink.indexOf("&e=") &&
          document.location.protocol == "https:"
        ) {
          soundLink = soundLink + "&e=1";
        }

        var placeholder = document.getElementById(soundPlaceholderId);
        var objectSrc =
          "<audio id='capthaud' src='/" +
          soundLink +
          "' controls autoplay type='" +
          LBD_GetMimeType() +
          "'></audio>";
        if (window.navigator.userAgent.indexOf("MSIE") != -1) {
          var objectSrc =
            "<object id='captchaSound' classid='clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95' height='0' width='0' style='width:0; height:0;'><param name='AutoStart' value='1' /><param name='Volume' value='0' /><param name='PlayCount' value='1' /><param name='FileName' value='" +
            soundLink +
            "' /><embed id='captchaSoundEmbed' src='" +
            soundLink +
            "' autoplay='true' hidden='true' volume='100' type='" +
            LBD_GetMimeType() +
            "' style='display:inline;' /></object>";
        }

        placeholder.innerHTML = "";
        placeholder.innerHTML = objectSrc;
      }
    } catch (e) {}
  };
}, 2000);

function handleImagesSliderResize(timespan) {
  $(".rsImg").each(function (i, o) {
    setTimeout(function () {
      var sw = $(window).width();
      var imgOldWidth = $(o).width();
      var imgOldHeight = $(o).height();
      if (imgOldWidth > sw) {
        var p = sw / imgOldWidth;
        $(o)
          .css("width", sw + "px")
          .css("height", "auto")
          .css("margin-left", "0px");
        var newheight = imgOldHeight * p;
        $(".rsOverflow").css("height", newheight + "px");
      }
    }, timespan);
  });
}
$(window).on("resize", function () {
  handleImagesSliderResize(55);
});
$(document).ready(function () {
  handleImagesSliderResize(500);
  if ($("#searchInput1").val() != "") {
    openMainSearch();
  }

  $("#searchiconbg").on("click", function () {
    if ($("#searchInput1").val() == "") {
      openMainSearch();
    } else {
      search("searchInput1");
    }
  });

  $(".langbtn2").on("click", function () {
    $("#ctl00_LanguageRedirect")[0].click();
  });

  var u = location.href.toLowerCase();
  if (
    u.indexOf("/eng/pages/contact") != -1 ||
    u.indexOf("/eng/pages/encontactus.aspx") != -1
  ) {
    $("#ctl00_LanguageRedirect").attr("href", "/");
  }
});

function addPromoIframe() {
  //return;
  var url = location.href.toLowerCase();
  if (url.indexOf("gov.il/pages/default.aspx") != -1) {
    //		$(".tcDiv").css("width", "100%");
    //$(".tcDiv").attr("style", "padding:0px !important;width:100%");
    //	$("#WebPartWPQ2").html('<iframe src="https://www.r-u-ready.xyz" style="max-width:860px" width="100%" height="480" scrolling="no" frameborder="0"> </iframe>').css("height", "480px").css("display", "block");
    //	$("#WebPartWPQ2").html('<div style="position:relative; width:100%; height:0; padding-bottom: 37%;">' +
    //'<iframe src="https://r-u-ready-4.it/" style="position: absolute; width:100%; height:100%; left:0; top:0;" width="560" height="320" scrolling="no" frameborder="0"></iframe>' +
    //'</div>');
  }
}

function removeAllJobs() {
  if (numberOfJobs == 0) {
    location.href = "/heb/careers/pages/application.aspx";
  } else {
    var c = confirm("אנא אשר מחיקת המשרות מהסל");
    if (c) {
      sessionStorage.setItem("selectedPages", 0);
      $.ajax({
        url: "/heb/careers/_layouts/15/isis/jobs.aspx?cmd=removeall&id=-1",
        success: function () {
          location.href = "/heb/careers/pages/application.aspx";
        },
      });
    }
  }
}

var isMobile = false; //initiate as false
// device detection
if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4)
  )
) {
  isMobile = true;
}

function isiPhone() {
  return (
    navigator.platform.indexOf("iPhone") != -1 ||
    navigator.platform.indexOf("iPod") != -1
  );
}

/////////////////CAPTCHA/////////////////
function onDone(data) {
  var json = $.parseJSON(data);
  if (json.IsLoggedIn == true) {
    try {
      fc.addFormToStorage();
    } catch (err) {}
    fc.submit();
  } else {
  }
}

function onFail() {
  $("#finalUserMessage").append("שגיאה בפניה לרכיב צד שרת").css("color", "red");
}

function onAlways(data) {
  $("#secondStage").css("visibility", "visible");
  $("#waitDiv").empty();
  $("#firstStage").empty();
  if (console && console.log) console.log(data);
}

function doLogin() {
  $("#waitDiv").empty().append("אנא המתן..");

  var formData = $("#aspnetForm").serializeArray(); //grecaptcha.getResponse();
  $.post("CheckLoginByCaptcha.ashx", formData)
    .done(function (data) {
      onDone(data);
    })
    .fail(function () {
      onFail();
    })
    .always(function (data) {
      onAlways(data);
    });
}

function setJobsCount() {
  var count = 0;
  try {
    count = getjobsobject().jobs_collection.length;
  } catch (err) {}
  $("#jobcounter").text(count);
  return count;
}

function getjobsobject() {
  var items = sessionStorage.getItem("jobs_collection");
  if (items == null) {
    items = JSON.parse('{"jobs_collection": [] }');
  } else {
    items = JSON.parse(items);
  }
  return items;
}

function SetNumberOfJobsSelectedT() {
  var idsArr = 0;
  var jc = $("#jobcounter").text();
  jobscounter = setJobsCount();
  if (
    sessionStorage.selectedPages === undefined ||
    sessionStorage.selectedPages < 0
  ) {
    sessionStorage.setItem("selectedPages", 0);
    $("#jobcounter").text(selectedPages);
    jobscounter = 0;
  } else {
    sessionStorage.setItem("selectedPages", jobscounter);
    $("#jobcounter").text(selectedPages);
  }
}
