import React, {useState, useEffect } from 'react';
import getTestimonialsPage from '../../services/testimonials-page';

const Testimonials = ()  => {
    const [testimonials, changeTestimonials] = useState([]);
    const [note, changeNote] = useState("");
    const [currentTestimonials, changeCurrentTestimonials] = useState({})
    const [activeVideo, changeActiveVideo] = useState(false);
    const [data, changeData] = useState({});

    useEffect(() => {
        getTestimonialsPage(changeData)
    },[])

    useEffect(() => {
        changeTestimonials(data.testimonials);
        changeNote(data.note)
    }, [data])

    useEffect(() => {
        if(testimonials && testimonials.length > 0 ){
            changeCurrentTestimonials(testimonials[0])
        }
    },[testimonials])

    const playVideo = () => {
        changeActiveVideo(!activeVideo) 
    }

    const changeVideo = (test) => {
        changeCurrentTestimonials(test)
        changeActiveVideo(false)
    }

    return <div className='testimonials'>
                <p>{note}</p>
                {currentTestimonials? 
                    <div className="testimonial-main" style={ {background: activeVideo? '#000': 'url("'+currentTestimonials.img+'")'}}>
                        {!activeVideo?
                        <React.Fragment>
                            <button onClick={playVideo}>
                                <img src="/youtube.svg" alt="play" className='play' />
                            </button>
                                
                            <div className='video-name'>
                                <h2 className="name-age">{currentTestimonials.title}</h2>
                                <h3 className="role">{currentTestimonials.role}</h3>
                            </div>
                        </React.Fragment>
                         : <div className="iframe-div" dangerouslySetInnerHTML={{__html: currentTestimonials.embeded}}></div>}
                    </div>
                    :
                    null
                }
                <ul className="testimonial-cards">
                    {testimonials && testimonials.length > 0 &&  currentTestimonials? 
                        testimonials.map((test, index) => 
                            <li key={index}>
                                <button className={test.id === currentTestimonials.id? "testimonial-card chosen": "testimonial-card"} style={{backgroundImage:'url("'+test.img+'")'}} onClick={() => changeVideo(test)}>
                                    <img src="/youtube.svg" alt="play" className='play' />
                                    <div className='video-name'>
                                    <h2 className="name-age">{test.title}</h2>
                                    <h3 className="role">{test.role}</h3>
                                    </div>
                                </button>
                            </li>)
                : null}
                    
                </ul>

            </div>;
}
 
export default Testimonials;