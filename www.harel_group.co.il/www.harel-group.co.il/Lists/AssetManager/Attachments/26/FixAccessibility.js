document.addEventListener('DOMContentLoaded', () => {
	if (document.getElementById("archive_polisot_list") != null
		&& document.getElementById("archive_polisot_list") != undefined) {
		const p = document.createElement("p");
		p.innerHTML = "<a style='padding-right:30px;position: relative;' class='llwa' href='/about/Pages/available.aspx'>הצהרת נגישות​<em>&nbsp;</em></a>";
		document.getElementById("archive_polisot_list").appendChild(p);
	}
});
$(document).ready(function () {

	// DPH-3094 Adding attribute loading lazy to all images in the following pages:
	const lazyLoadingUrls = [
		"https://www.harel-group.co.il/",
		"https://www-edit.harel-ext.com/"
	];
	if (lazyLoadingUrls.some(url => window.location.href.startsWith(url))) {
		document.querySelectorAll('img')?.forEach(img => img.setAttribute('loading', 'lazy'));
	}


	$(".strip").each(function () {
		if ($(this).text().trim().length == 0 && $(this).find("iframe").length == 0 && $(this).find("img").length == 0) {
			$(this).remove()
		}
	});
	$(".popover_container").on('click.popover.harel', ".popover_btn", function (e) {
		if (typeof ($(this).data('content')) !== 'undefined' && typeof ($(this).data('title')) !== 'undefined') {
			e.preventDefault();
			$(this).popover('show');
			$('.popover_btn').not(this).popover('hide');
		}
	});

	//DPH-1863
	$("iframe[src*='youtube']").parent().attr("aria-label", "סרטון יוטיוב").attr("role", "region");

	// DPH-2972 -  תיקון הבעיה שהקורא מסך דילג על באנר בדפי לובי אבל הקריא אותו כשהוא כבר לא מוצג על המסך  
	const isStripBoxBanner = document.querySelector(".stripbox .info-inner.box.added.whitebox.richtext.allow_overflow.boxmh_1");
	if (isStripBoxBanner) {
		isStripBoxBanner.setAttribute("role", "banner");
	}

	// DPH=2970 - תיקון הקראה של תמונה ראשית כאשר לא מוזן ברכיב תמונה
	if (!document.querySelector("#ctl00_HarelPageContent_PlaceHolderMain_RichImageField1__ControlWrapper_RichImageField")?.querySelector("img,svg")) {
		document.querySelector("#ctl00_HarelPageContent_PlaceHolderMain_RichImageField1_label").setAttribute("role", "presentation");
		document.querySelector("#ctl00_HarelPageContent_PlaceHolderMain_RichImageField1__ControlWrapper_RichImageField").setAttribute("role", "presentation");
	}
});
