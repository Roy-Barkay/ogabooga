import React from 'react';
import { useState, useEffect } from 'react';
import getExhibitionsPage from '../../services/exhibitions-page';


export const Exhibitions = () => {
    const [exhibitions, changeExhibitons] = useState([]);
    const [data, changeData] = useState({})
    const [title, changeTitle] = useState("")
    // const [numItems, changeNumItems] = useState(9);
    // const [numIncrease, changenumIncrease] = useState(9);
    // const [exhibitionsLength,changeExhibitionsLength] = useState(0);


    useEffect(() => {
        getExhibitionsPage(changeData);
    },[])

    useEffect(() => {
        changeExhibitons(data.exhibitions)
        changeTitle(data.title)
        // changeExhibitons(getExhibitions(numItems))
        // changeExhibitionsLength(getExhibitions().length)
    },[data])


    // useEffect(() => {
    //     changeExhibitons(getExhibitions(numItems))
    // },[numItems])



    const loadMore = () => {
        // changeNumItems(numItems+numIncrease)
    }
    
    return <React.Fragment>
                {exhibitions && exhibitions.length > 0 ? 
                    <div className="exhibitions">
                        <h2>{title}</h2>
                        <ul>
                            {exhibitions.map(ex => 
                                    <li className="exhibition" key={ex.id} title={ex.title}>
                                        <a href={ex.link}>
                                            <div className="exhibitions-image">
                                                <img src={ex.img} alt={ex.title} />
                                            </div>
                                            <div className="exhibition-text">
                                                <h4>{ex.title}</h4>
                                            </div>
                                        </a>
                                    </li>
                                )}
                                
                        </ul>
                    </div>
                :
                    null
                }
            </React.Fragment>
}
 
export default Exhibitions;