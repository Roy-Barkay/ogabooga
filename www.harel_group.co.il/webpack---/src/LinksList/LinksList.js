import React from 'react';
import PropTypes from "prop-types";
import ul from './LinksList.style';


function LinksList(props) {  
    return (
      <ul>
        {props.links.map((item, index) => (
          <li key={item.id || index}>
            {props.bullet}
            <Link link={item} mainCategory={props.mainCategory}/>
          </li>
        ))}
      </ul>
    );
 
}
  function Link(props) {
   
    let img = "";
    
    if (props.link.href === null) {
      return <span>{props.link.title}</span>;
    }
    else {
      if (props.link.img !== null) {
       
        img = <img src={props.link.img} alt={props.link.title} />;
        return <a href={props.link.href} >{props.link.title}<br role="presentation"/>{img}</a>;
      }
      else {
        if (props.link.icon !== null) {         
          return <a href={props.link.href} mainCategory={props.mainCategory} ><span>{props.link.title}</span> {props.link.icon} </a>;
        }
      
      return <a href={props.link.href} mainCategory={props.mainCategory}>{props.link.title}</a>;
    }
  }
  }

  Link.propTypes = {
    link: PropTypes.shape({
      title: PropTypes.string.isRequired,
      href: PropTypes.string,
      img: PropTypes.string,
      alt: PropTypes.string,
      target: PropTypes.string
    })
  }

LinksList.propTypes = {
  links: PropTypes.array.isRequired
}

export default LinksList;
