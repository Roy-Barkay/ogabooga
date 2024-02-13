import TopNav from "../components/general/top-nav";
import Footer from "../components/general/footer";
import PositionsPage from "./positions-page";
import HomePage from "./home-page";
import AboutPage from "./about-page";
import HistoryPage from "./history-page";
import DomainsPage from "./domains-page";
import FAQsPage from "./faq-page";
import ContactUs from "../components/faqs/contact-us";
import ContactUsAR from "../components/faqs/contact-us-ar";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ApplicationPage from "./application-page";
import getLanguage from "../translations";
import ContactUsFA from "../components/faqs/contact-us-fa";
import { useState, useEffect } from "react";
import getMasterPage from "../services/nav-footer";
import ProcessPage from "./process-page";
import AccessibilityPage from "./accessibility-page";
import { useNavigate } from "react-router-dom";

const RohmPage = () => {
  const [language, changeLanguage] = useState({});
  const [savedPositions, changeSavedPositions] = useState([]);
  const [translation, changeTranslation] = useState(getLanguage("he"));
  const { pathname } = useLocation();
  const [masterPage, changeMasterPage] = useState({});
  const navigate = useNavigate();

  const handleSave = (position) => {
    if (localStorage.savedPositions) {
      let localSavedPositions = JSON.parse(localStorage.savedPositions);
      if (!localSavedPositions.find((x) => x.id === position.id)) {
        localSavedPositions.push(position);
      } else {
        localSavedPositions = localSavedPositions.filter(
          (item) => !(item.id === position.id)
        );
      }
      localStorage.setItem(
        "savedPositions",
        JSON.stringify(localSavedPositions)
      );
      changeSavedPositions(localSavedPositions);
    } else {
      localStorage.setItem("savedPositions", JSON.stringify([position]));
      changeSavedPositions([position]);
    }
  };

  const clearSavedPosition = () => {
    localStorage.setItem("savedPositions", JSON.stringify([]));
    changeSavedPositions([]);
  };

  const changeCurrnentLanguage = ({ lang, dir }) => {
    let htmlTag = document.getElementsByTagName("html")[0];
    htmlTag.setAttribute("dir", dir);
    htmlTag.setAttribute("lang", lang);
    changeLanguage({ lang: lang, dir: dir });
    changeTranslation(getLanguage(lang));
  };

  useEffect(() => {
    if (localStorage["savedPositions"]) {
      changeSavedPositions([...JSON.parse(localStorage["savedPositions"])]);
    }
    getMasterPage(changeMasterPage);
    if (persianLang.includes(navigator.language)) {
      navigate("/contact-us/fa");
    }
    if (arabianLang.includes(navigator.language)) {
      navigate("/contact-us/ar");
    }
  }, []);

  const arabianLang = [
    "ar",
    "ar-AE",
    "ar-BH",
    "ar-DZ",
    "ar-EG",
    "ar-IQ",
    "ar-JO",
    "ar-KW",
    "ar-LB",
    "ar-LY",
    "ar-MA",
    "ar-OM",
    "ar-QA",
    "ar-SA",
    "ar-SY",
    "ar-TN",
    "ar-YE",
  ];
  const persianLang = ["fa", "fa-IR"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <React.Fragment>
      <TopNav
        savedPositions={savedPositions.length}
        translation={translation}
        changeLanguage={changeCurrnentLanguage}
        currentLang={translation}
        links={masterPage ? masterPage.topNavigation : []}
      ></TopNav>
      <Routes>
        <Route path="/faq" element={<FAQsPage translation={translation} />} />
        <Route
          path="/application/:id/"
          element={
            <ApplicationPage
              translation={translation}
              savedPositions={savedPositions}
              clearSavedPosition={clearSavedPosition}
            />
          }
        />
        <Route
          path="/application"
          element={
            <ApplicationPage
              translation={translation}
              savedPositions={savedPositions}
              clearSavedPosition={clearSavedPosition}
            />
          }
        />
        <Route
          path="/career"
          element={<DomainsPage translation={translation} />}
        />
        <Route
          path="/about"
          element={<AboutPage translation={translation} />}
        />
        <Route
          path="/history"
          element={<HistoryPage translation={translation} />}
        />
        <Route
          path="/process"
          element={<ProcessPage translation={translation} />}
        />
        <Route
          path="/accessibility"
          element={<AccessibilityPage translation={translation} />}
        />
        <Route
          path="/about/:path"
          element={<AboutPage translation={translation} />}
        />
        <Route
          path="/contact-us"
          element={<ContactUs translation={translation} />}
        />
        <Route
          path="/contact-us/ar"
          element={
            <ContactUsAR
              translation={getLanguage("ar")}
              changeLanguage={changeCurrnentLanguage}
            />
          }
        />
        <Route
          path="/eng/Pages/contactusar.aspx"
          element={
            <ContactUsAR
              translation={getLanguage("ar")}
              changeLanguage={changeCurrnentLanguage}
            />
          }
        />
        <Route
          path="/contact-us/fa"
          element={
            <ContactUsFA
              translation={getLanguage("fa")}
              changeLanguage={changeCurrnentLanguage}
            />
          }
        />
        <Route
          path="/eng/Pages/contactusfa.aspx"
          element={
            <ContactUsFA
              translation={getLanguage("fa")}
              changeLanguage={changeCurrnentLanguage}
            />
          }
        />
        <Route
          path="/positions/:id/"
          element={
            <PositionsPage
              handleSave={handleSave}
              savedPositions={savedPositions}
              translation={translation}
            />
          }
        />
        <Route
          path="/positions"
          element={
            <PositionsPage
              handleSave={handleSave}
              savedPositions={savedPositions}
              translation={translation}
            />
          }
        />
        <Route
          path="/"
          element={
            <HomePage
              handleSave={handleSave}
              savedPositions={savedPositions}
              translation={translation}
            />
          }
        />
        <Route
          path="/*"
          element={
            <HomePage
              handleSave={handleSave}
              savedPositions={savedPositions}
              translation={translation}
            />
          }
        />
        <Route
          element={
            <HomePage
              handleSave={handleSave}
              savedPositions={savedPositions}
              translation={translation}
            />
          }
        />
      </Routes>
      <Footer
        translation={translation}
        footer={masterPage ? masterPage.footer : {}}
        socials={masterPage ? masterPage.socialItems : []}
        pathname={pathname}
      ></Footer>
    </React.Fragment>
  );
};

export default RohmPage;
