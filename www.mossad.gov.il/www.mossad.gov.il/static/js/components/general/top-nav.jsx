import React from 'react';
import {Link} from 'react-router-dom';
import SavedPositions from './savedPositions';
import TranslationRibbon from './translation-ribbon';
import { useEffect, useState } from 'react';


const  TopNav = ({savedPositions, translation, changeLanguage, currentLang, links}) => {

    const [mobile, changeMobile]= useState(false);
    const [thePosition, changeThePosition] = useState(0)

    useEffect(() => {
        window.addEventListener('scroll', listenToScroll)
    },[])



    const handleMobileToggle = () =>  {
        changeMobile(!mobile)
    }

    const listenToScroll = () => {
        changeThePosition(document.documentElement.scrollTop)
    }

    const handleNav = (mobile, thePosition) => {
        let navClasses = mobile? 'rohm-nav active-menu': 'rohm-nav';
        navClasses = thePosition > 0 ? navClasses+" scrolled" : navClasses;
        return navClasses;
    }
    return <div className={handleNav(mobile, thePosition)}>
                <a href="/" className='mossad-logo'>
                    <img src="/rohm-logo.png" alt="rohm logo" />
                    <div className='mossad-name'>
                        <h1 >{translation.data.SITE_NAME}</h1>
                        <h2>{translation.data.SITE_PARAGRAPH}</h2>
                    </div>
                </a>
                <button className='roham-hamburger' onClick={handleMobileToggle}>
                    <img src="/hamburger.svg" alt="hamburger" />
                </button>
                <ul className='rohm-nav-links'>
                    {links && links.length > 0 ? links.map(link => 
                        <li className='rohm-nav-link' key={link.id} onClick={() => handleMobileToggle()}>
                            <Link to={link.link}>
                                {translation.lang === "he"? link.description : link.titleEn}
                            </Link>
                        </li>
                    ) : null}
                </ul>
                <SavedPositions savedPositions={savedPositions}></SavedPositions>
                {translation.lang === "he"?
                    <React.Fragment>
                        <Link className='rohm-primary-button align-left desktop' to="/application">
                            {translation.data.TOP_NAV_BUTTON_APPLY}
                        </Link>
                        <Link className='rohm-primary-button align-left mobile' to="/application">
                            {translation.data.TOP_NAV_BUTTON_APPLY_MOBILE}
                        </Link>
                    </React.Fragment>
                    : 
                    null
                }
                
                <div className="contact-us-link">
                    <a href="/contact-us/fa">
                        فارسی       
                        <img src="/square-arrow-white.svg" alt="contact us" />
                    </a>
                </div>
                <div className="contact-us-link">
                    <a href="/contact-us/ar">
                        العربية
                        <img src="/square-arrow-white.svg" alt="contact us" />
                    </a>
                </div>
                <TranslationRibbon changeLanguage={changeLanguage} currentLang={currentLang}></TranslationRibbon>            
            </div>
}
 
export default TopNav;