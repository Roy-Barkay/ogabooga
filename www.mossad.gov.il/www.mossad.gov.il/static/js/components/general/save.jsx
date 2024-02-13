import React, { Component } from 'react';

class SaveButton extends Component {
    render() {
        const {position, handleSave, savedPositions} = this.props; 
        return <button onClick={() => handleSave({id: position.id, name: position.title})} className="rohm-save">
                    <img src={savedPositions.find(x => x.id === position.id)? process.env.PUBLIC_URL + "/saved-white.svg": process.env.PUBLIC_URL + "/save-white.svg"} alt="save" />
                </button>;
    }
}
 
export default SaveButton;