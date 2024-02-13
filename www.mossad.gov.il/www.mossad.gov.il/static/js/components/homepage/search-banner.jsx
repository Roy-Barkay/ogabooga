import React, { Component } from 'react';
import getScrumble from '../../utilities/scrumble'
import { Link } from 'react-router-dom';
import AutoComplete from '../inputs/auto-complete';
import getAutocomplete from './autocomplete-mockup';
import getDomains from '../../pages/home-page-mockups/domains-mockup';
import getPositions from '../../services/getPositions';
import { useState, useEffect, useRef } from 'react';



const SearchBanner = ({tags, translation}) =>  {

    const [searchBox, changeSearchBox] = useState("");
    const [options, changeOptions] = useState([]);
    const [positions, changePositions] = useState([])
    const [scrumbleActivated, changeScrumbledActivated] = useState(false);
    const video = useRef(null);
    const [played, setPlayed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = "/positions?searchTerm="+searchBox+""     
    }

    const handleInputChange = (event) => {
        changeSearchBox(event.target.value);
    }

    const scrumble = text => {
        if(!scrumbleActivated){
            getScrumble(document.getElementById("searchHeader"), [text]);
            changeScrumbledActivated(true)
        }
    }

    const PlayPauseVideo = () => {
        if(!played) {
            setPlayed(!played);
            video.current.play()
        }
        else {
            setPlayed(!played);
            video.current.pause()
        }
    }

     useEffect(() => {

        if(searchBox.length > 1) {
            getPositions(searchBox, changePositions);
        }
        else {
            changeOptions([])  
        }
    },[searchBox])

    useEffect (() => {
        if(searchBox.length > 1) {
            changeOptions([...positions, ...getDomains().filter(x => x.title.includes(searchBox))])
        }
    }, [positions])


    



    return <div className='search-banner'onClick={() => scrumble(translation.data.SEARCH_BANNER.TITLE_AFTER)}>
                <h2 id="searchHeader">
                    {translation.data.SEARCH_BANNER.TITLE}
                </h2>
                <form onSubmit={handleSubmit} >
                    <div className={scrumbleActivated? 'search-div show':'search-div'} action="/positions" >
                        <label htmlFor="searchTerm" className='search-label'>{translation.data.SEARCH_BANNER.LABEL}</label>
                            <AutoComplete options={options} handleInputChange={handleInputChange} placeholder={translation.data.SEARCH} value={searchBox}></AutoComplete>
                        <button type='submit'>
                            <img src="search.svg" alt="search" />
                        </button>
                        <div className="tags">
                            {tags && tags.length > 0?  tags.map(tag => <Link to={"/positions?"+tag.type+"="+tag.id} className="cat" key={tag.title}>
                                                                    {translation.lang === "he"? tag.title : tag.titleEn}
                                                                </Link>)
                                :
                                null
                            }
                        </div>
                    </div>
                </form>
                {/* <button className={played? 'play pause' : 'play'} onClick={() => PlayPauseVideo()}></button>
                <video muted loop id="videoBackground" ref={video}>
                    <source src="המוסד.mp4#t=1,300" type="video/mp4"/>
                </video> */}
                <iframe id="videoBackground" src="https://www.youtube-nocookie.com/embed/a54mP2ZJi0U?playlist=a54mP2ZJi0U&autoplay=1&loop=1&mute=1&controls=0&modestbranding=1" ></iframe>
            </div>;
    
}
 
export default SearchBanner;