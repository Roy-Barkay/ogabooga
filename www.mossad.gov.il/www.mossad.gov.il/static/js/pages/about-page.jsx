import React from 'react';
import AboutTabs from '../components/about/about-tabs';
import BreadCrumbs from '../components/general/bread-crumbs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getAboutPage from './../services/about-page';

 const AboutPage = ({translation}) => {
    const {path} = useParams();
    const [tabs, changeTabs] = useState([]);
    const [breadCrumbs,changeBreadCrumbs] = useState([{
        title: "אודות",
        titleEN: "About",
        link: "/"
      }])
    const [aboutData, changeAboutData] = useState({})


    useEffect(()=>{
      getAboutPage(changeAboutData);
    }, [])

    useEffect(()=>{
      changeTabs(aboutData.about);
    }, [aboutData])


    
    return  <div className='page-content about-page'>
                <BreadCrumbs translation={translation} breadCrumbsObj={breadCrumbs}></BreadCrumbs>
                <AboutTabs aboutTabs={tabs} translation={translation} path={path}></AboutTabs>
            </div>;

}
 
export default AboutPage;