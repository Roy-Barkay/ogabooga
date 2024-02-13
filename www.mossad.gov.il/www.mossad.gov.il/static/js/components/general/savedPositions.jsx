import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SavedPositions extends Component {
    render() {
        const {savedPositions} = this.props; 
        return <Link to="/positions" className='saved-positions'>
                    <img src={process.env.PUBLIC_URL + "/save-white.svg"} alt="saved Positions" />
                    {savedPositions? <span>{savedPositions}</span>:null}
                </Link>;
    }
}
 
export default SavedPositions;