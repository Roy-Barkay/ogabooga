import React, { Component } from 'react';
import SaveButton from '../general/save';
import ShareButton from '../general/share';

class HotPositions extends Component {

    shuffle = array => {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    render() {
        const {hotPositions, handleSave, savedPositions, translation} = this.props;
        return <div className='hot-positions'>
                    <h2>
                        {translation.data.HOT_POSITIONS.TITLE}
                    </h2>
                    <div className='hot-positions-div'>
                    {hotPositions && hotPositions.length > 0 ?  hotPositions.map(position => <div className='hot-position' tabIndex="0" key={position.id}>
                            <div className="hot-position-body">
                                <span className="hot-position-type">{position.department.title}</span>
                                <h3>{position.title}</h3>
                                <p>{position.jobDescription}</p>
                            </div>
                            <div className='hot-position-footer'>
                                <SaveButton position={position} handleSave={handleSave} savedPositions={savedPositions}></SaveButton>
                                <ShareButton url={"/positions/"+position.id}></ShareButton>
                                <a href={"/positions/"+position.id}>{translation.data.HOT_POSITIONS.VIEW}</a>
                            </div>
                        </div>
                        )
                        : null}
                    </div>
                    <div className='to-all'>
                        <a href="/positions">
                            {translation.data.HOT_POSITIONS.TO_ALL} 
                            <img src="send-white.svg" alt="go" />
                        </a>
                    </div>
               </div>;
    }
}
 
export default HotPositions;