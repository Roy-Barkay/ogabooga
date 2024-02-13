import React from 'react';

export const Social = ({socials}) => {
  return <ul className="social-links">
            {socials && socials.length > 0?

            socials.map((social, index) => <li key={index}>
                                    <a href={social.link} target={"_blank"}>
                                    <img src={social.img} alt="Instagram" />
                                    <img src={social.img2} alt="Instagram" className='img-hover' />
                                    </a>
                                </li>)
            
            :
            null
        }
        </ul>
}

export default Social;
