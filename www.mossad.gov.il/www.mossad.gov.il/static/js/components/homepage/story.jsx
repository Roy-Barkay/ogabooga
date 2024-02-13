import React, { Component } from 'react';

class Story extends Component {
    state = {
        
    } 

    render() {
        const {story, open, togglePopup} = this.props
        return <div className={open? 'story-popup show': 'story-popup'}>
                    <div className='story-background' onClick={() => togglePopup({})}>
                    </div>
                    <div className='story-window' style={{background: "url("+story.image+")"}}>
                        <button onClick={() => togglePopup({})}>
                            <img src="/x-icon.svg" alt="close" />
                        </button>
                        <div className="story-info">
                            <h3>{story.title}</h3>
                            <h4>{story.role}</h4>
                            <p>{story.story}</p>
                            <a href={story.link}>
                                {story.linkText}
                                <span className='arrow-left'></span>
                            </a>
                        </div>
                    </div>
                </div>;
    }
}
 
export default Story;