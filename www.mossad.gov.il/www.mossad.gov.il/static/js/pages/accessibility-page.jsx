import React, { useEffect, useState, useLayoutEffect} from 'react';
import BreadCrumbs from '../components/general/bread-crumbs';
import getAccessibilityPage from '../services/accessibility-page';

const AccessibilityPage = ({translation}) => {
    const [data, changeData] = useState([]);
    const [breadCrumbs, changeBreadCrumbs] = useState([{
        title: "הצהרת נגישות",
        titleEN: "Website Accessibility",
        link: "/"
      }]);

      useLayoutEffect(()=>{
        getAccessibilityPage(changeData);
    },[]);

    const htmlDecode = (content) => {
        let e = document.createElement('div');
        e.innerHTML = content;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
      }

    return <div className='page-content accessibility-page'>
                <BreadCrumbs translation={translation} breadCrumbsObj={breadCrumbs}></BreadCrumbs>
                <h1>{translation.lang === "he"? data.title: data.titleEn}</h1>
                <div dangerouslySetInnerHTML={translation.lang === "he"? {__html: data.description}: {__html: data.descriptionEn}}>
                    
                </div>
            </div>;
}
 
export default AccessibilityPage;