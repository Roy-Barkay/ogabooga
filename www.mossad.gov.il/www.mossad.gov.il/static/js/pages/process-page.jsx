import React, { Component, useEffect, useState } from 'react';
import BreadCrumbs from '../components/general/bread-crumbs';
import getDomainsPage from '../services/domains-page';
import getHomePage from '../services/home-page';
import Stages from '../components/homepage/stages';


const ProcessPage = ({translation}) => {
    const [buttons, changeButtons] = useState([]);
    const [pageData, changePageData] = useState({});
    const [stages, changeStages] = useState([]);
    const [data, changeData] = useState([])
    const [breadCrumbs, changeBreadCrumbs] = useState([{
        title: "תהליך גיוס",
        titleEN: "Recruitment Process",
        link: "/"
      }])
    const [domainsData, changeDomainsData] = useState({})

    useEffect(() => {
        getDomainsPage(changeDomainsData);
        getHomePage(changeData)
    },[])

    useEffect(() => {
        changeButtons(domainsData.domains);
        changePageData(domainsData.domainPage)
    },[domainsData])

    useEffect(() => {
        changeStages(data.stages)
    },[data])



    return <div className='page-content process-page'>
                <BreadCrumbs translation={translation} breadCrumbsObj={breadCrumbs}></BreadCrumbs>
                <Stages stages={stages}  translation={translation}></Stages>
            </div>;
}
 
export default ProcessPage;