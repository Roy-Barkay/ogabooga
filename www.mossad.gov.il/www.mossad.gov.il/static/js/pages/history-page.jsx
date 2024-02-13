import React, { Component } from 'react';
import HistoryTabs from '../components/about/history-tabs';
import BreadCrumbs from '../components/general/bread-crumbs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getHistoryPage from '../services/history-page';


 const HistoryPage = ({translation}) => {
    const {path} = useParams();
    const [tabs, changeTabs] = useState([]);
    const [breadCrumbs,changeBreadCrumbs] = useState([{
        title: "היסטוריה",
        titleEN: "History",
        link: "/"
      }])
    const [aboutData, changeAboutData] = useState({})


    useEffect(()=>{
      getHistoryPage(changeAboutData);
    }, [])

    useEffect(()=>{
      changeTabs(aboutData.history);
    }, [aboutData])


    
    return  <div className='page-content about-page'>
                <BreadCrumbs translation={translation} breadCrumbsObj={breadCrumbs}></BreadCrumbs>
                <HistoryTabs historyTabs={tabs} translation={translation} path={path}></HistoryTabs>
            </div>;

}
 
export default HistoryPage;