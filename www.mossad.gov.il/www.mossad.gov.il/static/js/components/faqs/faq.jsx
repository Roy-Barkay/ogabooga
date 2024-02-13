import React, { Component } from 'react';
import {Collapse} from 'react-collapse'

class FAQ extends Component {
    state = {
        open: false,
    }
    toggleFaq = () => {
        this.setState({open: !this.state.open})
    }
    render() {
        const {faq, translation} = this.props;
        const {open} = this.state;
        return <React.Fragment>
                {translation.lang !== "he" && faq.titleEn === "" ? null :
                    <li className={open? 'faq active':'faq'}>
                        
                        <button onClick={this.toggleFaq}>
                            <span>{translation.lang === "he"? faq.title : faq.titleEn}</span>
                            <img src="/arrow-up.svg" alt="arrow" />    
                        </button>
                        <Collapse isOpened={open}>
                            <p>
                                {translation.lang === "he"? faq.answer : faq.answerEn}
                            </p>
                        </Collapse>
                    </li>
                }
                </React.Fragment>
    }
}
 
export default FAQ;