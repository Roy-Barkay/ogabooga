import React, { Component } from 'react';
import FAQ from './faq';

class FAQs extends Component {
    state = {  } 
    render() {
        const {faqs, translation} = this.props;
        return <div className="faqs-lobby">
                    <h1>{translation.lang === "he"? faqs.title: faqs.titleEN}</h1>
                    <p>{translation.lang=== "he" ? faqs.description: faqs.paragraphEN}</p>
                    <ul className="faqs-list">
                        {faqs &&  faqs.faqs? faqs.faqs.map(faq => <FAQ faq={faq} key={faq.id} translation={translation}></FAQ>): null}
                    </ul>
                </div>;
    }
}
 
export default FAQs;