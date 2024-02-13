import React, { Component } from 'react';


class TranslationRibbon extends Component {
    render() { 
        const {changeLanguage, currentLang} = this.props;
        return <div className='translation-ribbon'>
                    <button className={currentLang.lang === "he"? 'mobile-hide' : null} onClick={() => changeLanguage({lang:"he", dir:"rtl"})}>עב</button>
                    /
                    <button className={currentLang.lang === "en"? 'mobile-hide' : null} onClick={() => changeLanguage({lang:"en", dir:"ltr"})}>EN</button>
               </div>;
    }
}
 
export default TranslationRibbon;