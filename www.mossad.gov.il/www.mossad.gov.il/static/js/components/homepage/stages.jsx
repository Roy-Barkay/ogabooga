import React from 'react';
import { useEffect, useRef, useState, useMemo } from 'react';

const Stages = ({stages, translation}) => {
    const ref1 = useRef(null);
    const [visible, visibleChange] = useState(false)



    const useIsInViewport = (ref) => {
        const [isIntersecting, setIsIntersecting] = useState(false);
      
        const observer = useMemo(
          () =>
            new IntersectionObserver(([entry]) =>
              setIsIntersecting(entry.isIntersecting),
            ),
          [],
        );
      
        useEffect(() => {
          observer.observe(ref.current);
          return () => {
            observer.disconnect();
          };
        }, [ref, observer]);
        return isIntersecting;
      }

      const isInViewport1 = useIsInViewport(ref1)

      useEffect(() => {
        if(isInViewport1 === true) {
            visibleChange(true)
        }
      },[isInViewport1])
      
      

    return <div className="stages" ref={ref1}>
                <h2>{translation.data.STAGES.TITLE}</h2>
                <div className={visible? "stages-section stages-animation": "stages-section"}>
                {stages && stages.length > 0 ? stages.map((stage, index) => <div className='stage' key={stage.id}>
                                                                                    <div className="stage-number">
                                                                                        {index+1}
                                                                                    </div>
                                                                                    <h3>{translation.lang === "he"? stage.title : stage.titleEn}</h3>
                                                                                    <p>
                                                                                        {translation.lang === "he"? stage.description : stage.descriptionEn}
                                                                                    </p>
                                                                                </div>) : null}
                    
                </div>
                <div className='domains-stages to-all'>
                    <a href="/positions">
                        {translation.data.HOT_POSITIONS.TO_ALL}
                        <img src="send-white.svg" alt="go" />
                    </a>
                </div>  
            </div>
}
 
export default Stages;