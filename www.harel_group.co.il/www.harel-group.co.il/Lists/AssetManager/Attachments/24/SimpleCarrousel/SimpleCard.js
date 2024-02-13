import './SC.css';
import { Button } from 'common-ui';
import React, { useCallback } from 'react';

const SimpleCard = ({ id, imgURL, title, buttText, bodyText, buttonURL, newWindow }) => {

    if (newWindow == null) {
        newWindow = "_self";
    } 
    
    

    const bgIMage = "/PublishingImages/ServiceCenters/BG_Desktop.png";
    return (
        <div key={id} tabIndex="-1" aria-hidden="true" className="sc-card"   style={{ backgroundImage:`url(${bgIMage})` }}>
            <div className="sc-icon-container">
                <img className="sc-icon" alt="" src={imgURL} />
            </div>
                <h3 className="sc-card-title" role='heading' aria-level='3'>
                    {title}
                </h3>
                <div className="sc-card-body">
                    {bodyText}
                </div>
                <Button className="sc-card-button" tabIndex="-1" role="link"  aria-label={buttText + ' בנושא '+title}
                    onClick={() => window.open(buttonURL, newWindow)}
                    fullWidth={true}
                    content={buttText}
                />
        </div>
    );
}

export default SimpleCard;