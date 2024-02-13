import React, { Component } from 'react';
import { useState, useEffect, useRef } from 'react';
import getCEOPage from '../../services/ceo-page';

export const  TimeLine = ({translation}) =>  {
    const [CEOS, changeCEOS] = useState([]);
    const [data, changeData] = useState({});
    const [rangeValue, changeRangeValue] = useState(0);
    const [currentCEO, changeCurrentCEO] = useState({})
    const rangeInput = useRef();

    useEffect(()=> {
        getCEOPage(changeData)
    },[])

    useEffect(() => {
        changeCEOS(data.ceos);
    },[data])


    useEffect(()=> {
        if(data.ceos && data.ceos.length > 0) {
            setCEO(0)
        }
        
    },[CEOS]);
    
    useEffect(() => {
        if(document.getElementsByClassName('active').length > 0 ){
            document.getElementsByClassName('active')[0].scrollIntoView({ behavior: "smooth", block: "end", inline: "center" })
        }
    },[currentCEO])


    const setCEO = (value) => {
        changeRangeValue(value);
        changeCurrentCEO(currentCEO => ({
            ...currentCEO,
            ...CEOS[value]}))
    }

    useEffect(()=> {

    }, [rangeValue])

    return <div className="timeline-div">
                {CEOS && CEOS.length > 0? 
                <React.Fragment>
                    <h2>{translation.data.CEOS.TITLE}</h2>
                    <div className="timeline-images">
                        {CEOS && CEOS.length > 0? CEOS.map((CEO, index) => 
                        <button key={index} onClick={() => setCEO(index)} className={CEOS.map(e => e.id).indexOf(currentCEO.id) === index ? 'active': null}>
                            <img  src={CEO.img} alt={CEO.title} />
                        </button>): null}
                    </div>
                    <div className='timeline-input'>
                        <span>1949</span>
                        <input type="range" min="0" max={CEOS.length-1} value={rangeValue} onChange={(e) => setCEO(e.target.value)} ref={rangeInput} style={{backgroundSize:  (rangeValue - 0) * 100 / (CEOS.length-1 - 0) + '% 100%'}}/>
                        <span>{new Date().getFullYear()}</span>
                    </div>
                    <h3>{translation.lang === "he"? currentCEO.title: currentCEO.titleEn}, {currentCEO.end}-{currentCEO.start}</h3>
                    <div dangerouslySetInnerHTML={translation.lang === "he"? {__html: currentCEO.description} : {__html: currentCEO.descriptionEn}}></div>
                </React.Fragment>
                : null}
            </div>
}
 
export default TimeLine;