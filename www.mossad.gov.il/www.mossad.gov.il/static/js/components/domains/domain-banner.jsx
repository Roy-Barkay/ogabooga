
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DomainBanner = ({translation}) => {
  return <div className='career-banner'>
              <h2>{translation.data.CAREER.TITLE}</h2>
              <p>{translation.data.CAREER.PARAGRAPH}</p>
              <Link to="/positions">
                {translation.data.HOT_POSITIONS.TO_ALL}
                <img src="send-white.svg" alt="share" />
              </Link>
          </div>
  
}

export default DomainBanner;