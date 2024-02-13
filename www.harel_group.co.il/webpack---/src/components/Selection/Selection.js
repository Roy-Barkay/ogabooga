import React from 'react';
import './Selection.css';


const Selection = (props) => {
    const {title, subtitle, onClick, avatar,id} = props;

    return (
        <div className="selection">
            <button onClick={onClick} aria-describedby={id}>
                    <div className="selection-avatar">{avatar}</div>
                    <p className={'litleTitle'}>{title}</p>
            </button>
            <p id={id}>{subtitle}</p>
        </div>
    )
}

export default Selection;