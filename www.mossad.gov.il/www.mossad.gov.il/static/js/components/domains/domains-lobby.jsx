import React, { Component } from 'react';
import DomainButton from './domain-button';

class DomainsLobby extends Component {
    render() { 
        const {buttons, pageData, translation} = this.props;
        return <div className="domains-lobby">
                    {pageData && buttons? 
                    <React.Fragment>
                        <h1>{translation.lang === "he"? pageData.title: pageData.titleEN}</h1>
                        <p>{translation.lang === "he"? pageData.description: pageData.paragraphEN}</p>
                        <ul className="domain-buttons">
                            {buttons.map(button => <DomainButton key={button.id} button={button} translation={translation}></DomainButton>)}
                        </ul>
                    </React.Fragment>
                    : 
                    null}
                    
                </div>;
    }
}
 
export default DomainsLobby;