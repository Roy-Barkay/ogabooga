import React, { Component } from 'react';
import Story from './story';

class Stories extends Component {
    state = {
        open: false,
        currentStory: {}
    }

    handleStoryPopup = story => {
        this.setState({currentStory :story, open: !this.state.open})
    }



    render() {
        const {stories, translation} = this.props;
        const {open, currentStory} = this.state
        return <div className="stories">
                    <div className="stories-section">
                        <h2>
                            {translation.data.HOMEPAGE_STORIES.TITLE}
                           
                        </h2>
                        {stories && stories.length > 0 ? stories.map(story => <div className='story' key={story.id} tabIndex="0"  style={{background: "url("+story.image+")"}}>
                                                            <h3>
                                                                {story.title}
                                                                <span className='arrow-left'></span>
                                                            </h3>
                                                            <div className="story-content">
                                                                <h4>{story.role}</h4>
                                                                <p>{story.story}</p>
                                                                <a href={story.link}>
                                                                    {story.linkText}
                                                                    <span className='arrow-left'></span>
                                                                </a>
                                                            </div>
                                                        </div>): null}

                    </div>
                    <div className="stories-section stories-mobile">
                        <h2>
                            עשייה, מעבר 
                            <br/>
                            לכל  דימיון 
                        </h2>
                        {stories && stories.length > 0 ?stories.map(story => <button className='story' key={story.id} tabIndex="0" onClick={() => this.handleStoryPopup(story)} style={{background: "url("+story.image+")"}}>
                            <h3>
                                {story.title}
                                <span className='arrow-left'></span>
                            </h3>
                        </button>)
                        : null}
                    </div>
                    <Story story={currentStory} open={open} togglePopup={this.handleStoryPopup}></Story>
                </div>;
    }
}
 
export default Stories;