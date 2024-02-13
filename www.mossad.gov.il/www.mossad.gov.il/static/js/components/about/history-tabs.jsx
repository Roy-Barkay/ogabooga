import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from 'react';
import  History  from './history'
import Testimonials from './testimonials';


const HistoryTabs = ({historyTabs, translation, path}) =>  {

    const [currentTab, changeCurrentTab] = useState(0);

    useEffect(() => {
        if(historyTabs && historyTabs.length > 0 && path) {
            switch (path) {
                case 'history':
                    changeCurrentTab(historyTabs.length);
                    break;
                case 'testimonials':
                    changeCurrentTab(historyTabs.length+1);
                    break;
                default: 
                    break;
            }
        }
    }, [historyTabs])


    const htmlDecode = (content) => {
        let e = document.createElement('div');
        e.innerHTML = content;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
      }

    return <div className="about-tabs">
            <Tabs selectedIndex={currentTab} onSelect={tabIndex => changeCurrentTab(tabIndex)}>
                <TabList>
                    {historyTabs && historyTabs.length > 0 ? historyTabs.map(tab => <Tab key={tab.id}>{translation.lang === "he"? tab.title : tab.titleEn}</Tab>) : null}
                    <Tab key={6}>{translation.data.ABOUT.HISTORY}</Tab>
                    {/* <Tab key={7}>{translation.data.ABOUT.FIRST_HAND}</Tab> */}
                </TabList>
                {historyTabs && historyTabs.length > 0 ? 
                        historyTabs.map(content => <TabPanel key={content.id}>
                                                    <div className='about-tab-content' dangerouslySetInnerHTML={translation.lang === "he"? {__html: htmlDecode(content.content)}: {__html: htmlDecode(content.contentEn)}}>
                                                    </div>
                                                    {content.image && /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(content.image)? 
                                                    <img src={content.image} alt={content.title} className="about-icon" />
                                                    :
                                                    null}
                                                </TabPanel>)
                                                :
                                                    null}

                    <TabPanel key={historyTabs && historyTabs.length > 0 ? historyTabs.length+1: 0}>
                        <History translation={translation}></History>
                    </TabPanel>
                    {/* <TabPanel key={historyTabs && historyTabs.length > 0 ? historyTabs.length+2: 1}>
                        <Testimonials></Testimonials>
                    </TabPanel> */}
            </Tabs>
            <div className="mobile-about">
            <History translation={translation}></History>
            {!path && historyTabs && historyTabs.length > 0 ? 
            historyTabs.map((content, index) => 
            <React.Fragment key={index+"-m"}>
                {content.image && /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(content.image)? 
                                                    <img src={content.image} alt={content.title} className="about-icon"  />
                                                    :
                                                    null}
                <div key={content.id} className='about-tab-content' dangerouslySetInnerHTML={translation.lang === "he"? {__html: htmlDecode(content.content)}: {__html: htmlDecode(content.contentEn)}}>
                </div>
            </React.Fragment>
            )
            :
            path === "history"?
            <History translation={translation}></History>:
            <Testimonials></Testimonials>
        }
            </div>                                                                               
    </div>
                
}
 
export default HistoryTabs;