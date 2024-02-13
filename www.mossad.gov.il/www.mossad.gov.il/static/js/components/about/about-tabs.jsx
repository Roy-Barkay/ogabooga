import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from 'react';
import  History  from './history'
import Testimonials from './testimonials';


const AboutTabs = ({aboutTabs, translation, path}) =>  {

    const [currentTab, changeCurrentTab] = useState(0);



    const htmlDecode = (content) => {
        let e = document.createElement('div');
        e.innerHTML = content;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
      }

    return <div className="about-tabs">
            <Tabs selectedIndex={currentTab} onSelect={tabIndex => changeCurrentTab(tabIndex)}>
                <TabList>
                    {aboutTabs && aboutTabs.length > 0 ? aboutTabs.map(tab => <Tab key={tab.id}>{translation.lang === "he"? tab.title : tab.titleEn}</Tab>) : null}
                </TabList>
                {aboutTabs && aboutTabs.length > 0 ? 
                        aboutTabs.map(content => <TabPanel key={content.id}>
                                                    <div className='about-tab-content' dangerouslySetInnerHTML={translation.lang === "he"? {__html: htmlDecode(content.content)}: {__html: htmlDecode(content.contentEn)}}>
                                                    </div>
                                                    {content.image && /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(content.image)? 
                                                    <img src={content.image} alt={content.title} className="about-icon" />
                                                    :
                                                    null}
                                                </TabPanel>)
                                                :
                                                    null}
            </Tabs>
            <div className="mobile-about">
            {!path && aboutTabs && aboutTabs.length > 0 ? 
            aboutTabs.map((content, index) => 
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
null
        }
            </div>                                                                               
    </div>
                
}
 
export default AboutTabs;