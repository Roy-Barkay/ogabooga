import React from 'react';
import WhatsYourDomain from '../components/homepage/whats-your-domain';
import DownButton from '../components/homepage/homepage-down-button';
import SearchBanner from '../components/homepage/search-banner';
import HotPositions from '../components/homepage/hot-positions';
import Reasons from '../components/homepage/reasons';
import { useState, useEffect} from 'react';
import getHomePage from './../services/home-page';
import getPositionsPage from './../services/positions-page';
import { data } from 'jquery';

const HomePage = ({ handleSave, savedPositions, translation}) => {

    const [hotPositions, hotPositionsChange] = useState([]);
    const [positionData, positionsDataChange] = useState({})
    const [positions, positionsChange] = useState([])
    const [reasons, reasonsChange] = useState([]);
    const [tags, tagsChange] = useState([]);
    const [domains, domainsChange] = useState([]);
    const [homePageData, changeHomepageData] = useState({})


    useEffect(() => {
        getPositionsPage(positionsDataChange);
        getHomePage(changeHomepageData)
    }, [])

    useEffect(() => {
        if(Object.keys(homePageData).length > 0){
            let domains = homePageData.domains.filter(x => x.selected);
            domains.map(x => x["type"] = "department");
            let positionsPercentage = homePageData.positionPercentages.filter(x => x.selected);
            positionsPercentage.map(x => x["type"] = "positionPrecentage");
            tagsChange(domains.concat(positionsPercentage));
            reasonsChange(homePageData.reasons);
            hotPositionsChange(homePageData.positions);
            domainsChange(homePageData.domains);
        }
    },[homePageData])

    useEffect(() => {
        if(Object.keys(positionData).length > 0){
            positionsChange(positionData.payload.positions)
        }
    },[positionData])


        return ( <React.Fragment>
                    <SearchBanner tags={tags} translation={translation}></SearchBanner>
                    <DownButton></DownButton>
                    <Reasons reasons={reasons} translation={translation}></Reasons>
                    <HotPositions hotPositions={hotPositions}  handleSave={handleSave} savedPositions={savedPositions} translation={translation}></HotPositions>
                    <WhatsYourDomain domains={domains} translation={translation} positions={positions}></WhatsYourDomain>
               </React.Fragment>
               )
}
 
export default HomePage;