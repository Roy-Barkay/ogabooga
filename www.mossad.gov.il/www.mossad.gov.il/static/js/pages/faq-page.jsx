import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../components/general/bread-crumbs';
import FAQs from '../components/faqs/faqs';
import getFaqsPage from '../services/faqs-page';

const FAQsPage = ({translation}) => {
    const [faqs, changeFaqs] = useState([]);
    const [breadCrumbs, changeBreadCrumbs] = useState([{
        title: "שאלות ותשובות",
        titleEN: "Frequently Asked Questions",
        link: "/"
      }]);

    useEffect(()=>{
        getFaqsPage(changeFaqs);
    },[]);



    return <div className='page-content faqs-page'>
                <BreadCrumbs translation={translation} breadCrumbsObj={breadCrumbs}></BreadCrumbs>
                <FAQs faqs={faqs} translation={translation}></FAQs>
            </div>;
}
 
export default FAQsPage;