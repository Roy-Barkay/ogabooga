<!-- Start of google about schema -->
const desiredUrl = "https://"+document.location.hostname+"/about/harel-group/Pages/about-harel.aspx";
if (window.location.href === desiredUrl) {
  const jsonScript = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "הראל ביטוח ופיננסים",
      "alternateName": "הראל ביטוח",
      "url": "https://www.harel-group.co.il/Pages/default.aspx",
      "description": "קבוצת הראל השקעות בביטוח ושירותים פיננסים בע&quot;מ עוסקת בתחומי הביטוח והשירותים הפיננסים - ביטוח בריאות (בריאות, ביטוח סיעוד, ביטוח שיניים וביטוח נסיעות לחו&quot;ל), ביטוח כללי (ביטוח רכב, ביטוח דירות, ביטוח חבויות, ביטוח משכנתאות וביטוח אשראי), ביטוח חיים, קרנות פנסיה, קופות גמל, קרנות השתלמות, קרנות נאמנות, ניהול תיקי השקעות, קרנות סל ושירותים פיננסים נוספים.",
      "logo": "https://www.harel-group.co.il/PublishingImages/bot/HarelVane.jpg",
      "sameAs": ["https://www.instagram.com/harel_insurance_finance/",
                  "https://www.tiktok.com/@harel_insurance_finance",
                  "https://www.linkedin.com/company/harel-insurance/"]
    }
    </script>`;

  const headElement = document.querySelector("head");
  headElement.insertAdjacentHTML("beforeend", jsonScript);
}

