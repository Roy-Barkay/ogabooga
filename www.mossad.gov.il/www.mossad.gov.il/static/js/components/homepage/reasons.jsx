import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { LottiePlayer } from '@lottiefiles/lottie-player';

class Reasons extends Component {
    render() { 
        const {reasons, translation} = this.props;
        return <div className='reasons'>
                    <div className="reasons-tabs">
                        <Tabs>
                            <TabList>
                                {reasons && reasons.length > 0?  reasons.map(reason => <Tab key={reason.id}>{translation.lang === "he"? reason.title : reason.titleEn}</Tab>) : null}
                            </TabList>
                            {reasons && reasons.length > 0? reasons.map(content => <TabPanel key={content.id}>
                                                                <p>{translation.lang === "he"? content.description : content.descriptionEn}</p>
                                                                <div className="image-container">
                                                                    <lottie-player
                                                                        autoplay
                                                                        loop
                                                                        mode="normal"
                                                                        src={content.image}
                                                                        style={{width: "30rem", height: "auto", margin: "auto"}}
                                                                    ></lottie-player>
                                                                </div>
                                                            </TabPanel>): null}
                            
                        </Tabs>
                    </div>

                   

                    <ul className='reasons-mobile'>
                        {reasons && reasons.length > 0? reasons.map(reason => <li key={reason.id} >
                            <h3>{translation.lang === "he"? reason.title : reason.titleEn}</h3>
                            <lottie-player
                                autoplay
                                loop
                                mode="normal"
                                src={reason.image}
                                style={{width: "60rem", height: "auto", margin: "auto"}}
                            ></lottie-player>
                            <p>{translation.lang === "he"? reason.description : reason.descriptionEn}</p>
                        </li>)
                        : null}
                    </ul>
                </div>;
    }
}
 
export default Reasons;