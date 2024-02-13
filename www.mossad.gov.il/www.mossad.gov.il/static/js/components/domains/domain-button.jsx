import React, { Component } from 'react';

class DomainButton extends Component {
    render() { 
        const {button, translation} = this.props;
        return <li  >
                    <a href={"positions?department="+button.id}  className="domain-link" >
                        <img src={button.icon} className="domain-icon" alt={translation.lang === "he"? button.title : button.titleEn} />
                        <h3>{translation.lang === "he"? button.title: button.titleEn}</h3>
                        <p>{button.description}</p>

                    </a>
                    <img className="domain-background" src={button.background} alt="a"/>
               </li>;
    }
}
 
export default DomainButton;