import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Social from './social';

class Footer extends Component {
    state = {
    } 

    componentDidMount () {
    }
    render() {
        const {translation, footer, socials, pathname} = this.props;
        return <footer className='rohm-footer'>
                <div className="apply-section">
                        {footer && Object.keys(footer).length > 0? 
                            <React.Fragment>
                                <h3>{translation.lang === "he" ? footer.title : footer.titleEn }</h3>
                                <p>
                                {translation.lang === "he" ? footer.text : footer.textEn }
                                </p>
                                <Link to="/application" className='footer-link'>
                                    {translation.lang === "he" ? footer.button : footer.buttonEn }
                                    <img src="send-white.svg" alt="send application" />
                                </Link>
                            </React.Fragment>
                            : null
                        }
                        
                    </div>
                    <div>
                    <ul className="links-section">
                        {footer && footer.footerItems.length > 0 ? 
                        <React.Fragment>{footer.footerItems.map(link=> <li key={link.id}><a href={link.link}>{translation.lang === "he"? link.description : link.titleEn}</a></li>)}</React.Fragment>
                        : 
                        null
                        }
                    </ul>
                    {pathname.includes("contact-us")? null: <Social socials={socials}></Social>}
                    </div>
                </footer>;
    }
}
 
export default Footer;