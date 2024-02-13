import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const WhatsYourDomain = ({domains, translation, positions}) => {
    const domainsContainer = useRef();

    const slickParams = {
        settings :{
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            rtl: false,
            responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    autoplay: false,
                  }
                }]
        }
    }
   

    const handleBackground = (background) => {
        var reg= new RegExp(/^#([0-9a-f]{3}){1,2}$/i);
        if(reg.test(background) || CSS.supports('color',background) ) return {background: background};
        return { backgroundImage: 'url('+background+')'};
    }

    const handleLeft = () => {
        let container = domainsContainer.current;
        container.scrollBy({
            top: 0,
            left: +500,
            behavior: 'smooth'
          }) 
    }
    
    const handleRight = () => {
        let container = domainsContainer.current;
        container.scrollBy({
            top: 0,
            left: -500,
            behavior: 'smooth'
          }) 
    }



        return <div className='whats-your-domain'>
                    <h2>
                        {translation.data.HOMEPAGE_DOMAINS.TITLE}
                    </h2>
                    <div id="domains" >
                    {/* <Slider {slickParams.settings}>
                            {domains && domains.length > 0 && positions && positions.length > 0 ? domains.map(domain => <a href={"positions?department="+domain.id} key={domain.id} className="domain" target="_self">
                                                                                                    <img src={domain.background} className="background" alt={domain.id}/>
                                                                                                    <img src={domain.icon} alt={domain.title} className="icon" />
                                                                                                    <h3>{translation.lang === "he"? domain.title: domain.titleEn}</h3>
                                                                                                    <p>{positions && positions.length > 0 ? positions.filter(x => x.department.id === domain.id).length : 0} {translation.data.POSITIONS}</p>
                                                                                                </a>)
                                :
                                null}
                        </Slider> */}

                    </div>
                    <div id="domains" className='scrollable' ref={domainsContainer}>
                    {domains && domains.length > 0 && positions && positions.length > 0 ? domains.map(domain => <a href={"positions?department="+domain.id} key={domain.id} className="domain slick-slide" target="_self">
                                                                                                    <img src={domain.background} className="background" alt={domain.id}/>
                                                                                                    <img src={domain.icon} alt={domain.title} className="icon" />
                                                                                                    <h3>{translation.lang === "he"? domain.title: domain.titleEn}</h3>
                                                                                                    <p>{positions && positions.length > 0 ? positions.filter(x => x.department.id === domain.id).length : 0} {translation.data.POSITIONS}</p>
                                                                                                </a>)
                                :
                                null}
                    {domains && domains.length > 0 && positions && positions.length > 0 ? domains.map(domain => <a href={"positions?department="+domain.id} key={domain.id} className="domain slick-slide" target="_self">
                                                                                                    <img src={domain.background} className="background" alt={domain.id}/>
                                                                                                    <img src={domain.icon} alt={domain.title} className="icon" />
                                                                                                    <h3>{translation.lang === "he"? domain.title: domain.titleEn}</h3>
                                                                                                    <p>{positions && positions.length > 0 ? positions.filter(x => x.department.id === domain.id).length : 0} {translation.data.POSITIONS}</p>
                                                                                                </a>)
                                :
                                null}
                    </div>
                    <div className='domains-footer to-all'>
                        <div className="navigation">
                            <button className='navigation-button' tabIndex="-1" onClick={() => handleLeft()}><img src="arrow-right.svg" alt="navigate right"/></button>
                            <button className='navigation-button' tabIndex="-1" onClick={() => handleRight()}><img src="arrow-left.svg" alt="navigate left" /></button>
                        </div>
                        <Link to="/career">
                            {translation.data.HOMEPAGE_DOMAINS.TO_ALL}
                            <img src="send-black.svg" alt="go" />
                        </Link>
                    </div>

                </div>;
    
}
 
export default WhatsYourDomain;