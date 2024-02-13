import React, { Component } from 'react';

class ShareButton extends Component {
    state = {
        active: false
    }
    
    showShare = () => {
        this.setState({active: !this.state.active})
    }

    render() {
        const { active } = this.state;
        const { url } = this.props;
        return <div className='share-div'>
                    {/* <button className='rohm-share' onClick={() => this.showShare()} >
                        <img src={process.env.PUBLIC_URL + "/share-white.svg"} alt="share" />
                    </button> */}
                    {active? 
                    <ul className="share-links">
                        <li>
                            <a href={'https://api.whatsapp.com/send/?text='+window.location.origin+url+'&type=custom_url&app_absent=0'} target="_blank">
                                <img src="/message.svg" alt="whatsapp" />
                            </a>
                        </li>
                        <li>
                            <a href={'https://www.facebook.com/sharer/sharer.php?u="'+encodeURIComponent(window.location.origin+url)+'"'} target="_blank">
                                <img src="/facebook.svg" alt="facebook" />
                            </a>
                        </li>
                        <li>
                            <a href={'https://twitter.com/intent/tweet?url='+window.location.origin+url+''} target="_blank">
                                <img src="/twitter.svg" alt="twitter" />
                            </a>
                        </li>
                        <li>
                            <a href={'https://www.linkedin.com/sharing/share-offsite/?url='+window.location.origin+url+''} target="_blank">
                                <img src="/linkedin.svg" alt="linkedin" />
                            </a>
                        </li>
                    </ul>
                : null}
                <div className={active? 'multi-select-background show': 'multi-select-background'} onClick={() => this.showShare()}></div>
            </div>
    }
}
 
export default ShareButton;