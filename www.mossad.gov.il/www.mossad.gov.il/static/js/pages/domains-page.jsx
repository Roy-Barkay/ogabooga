import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../components/general/bread-crumbs';
import DomainsLobby from '../components/domains/domains-lobby';
import getDomainsPage from './../services/domains-page';
import Stages from '../components/homepage/stages';
import getHomePage from './../services/home-page';
import DomainBanner from '../components/domains/domain-banner';
import Stories from '../components/homepage/stories';


const DomainsPage = ({translation}) => {
    const [buttons, changeButtons] = useState([]);
    const [pageData, changePageData] = useState({});
    const [homePageData, changeHomePageData] = useState({});
    const [breadCrumbs, changeBreadCrumbs] = useState([{
        title: "קריירה במוסד",
        titleEN: "Career",
        link: "/"
      }])
      const [domainsData, changeDomainsData] = useState({})
      const [stages, changeStages] = useState([]);
      const [stories, storiesChange] = useState([]);


    useEffect(() => {
        getDomainsPage(changeDomainsData);
        getHomePage(changeHomePageData);
    },[])

    useEffect(() => {
        changeButtons(domainsData.domains);
        changePageData(domainsData.domainPage)
    },[domainsData])

    useEffect(() => {
        changeStages(homePageData.stages);
        storiesChange(homePageData.stories);
    },[homePageData])



    return <div className='page-content domains-page'>
                <BreadCrumbs translation={translation} breadCrumbsObj={breadCrumbs}></BreadCrumbs>
                <DomainBanner  translation={translation}></DomainBanner>
                <DomainsLobby buttons={buttons} pageData={pageData} translation={translation}></DomainsLobby>
                <Stages stages={stages} translation={translation}></Stages>
                {/* <Stories stories={stories} translation={translation}></Stories> */}
            </div>;
}
 
export default DomainsPage;