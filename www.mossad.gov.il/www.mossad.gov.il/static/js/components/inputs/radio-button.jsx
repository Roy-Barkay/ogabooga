import React, { Component } from 'react';

class RadioButton extends Component {
    
    radioChange = (input, radio ,handleInputChange, e) => {
        let localInput = {...input};
        localInput.options = [radio];
        handleInputChange(e, input, radio, localInput)
    }

    render() {
        const {input, handleInputChange, label, error, translation} = this.props;
        return <React.Fragment>
                    {label? <label htmlFor={input.options[0].id} className="input-label">{label}</label>: null}
                    <div className='radio-div'>
                            {input.options? input.options.map(radio => 
                                <label htmlFor={radio.title} key={radio.id} onClick={(e) => this.radioChange(input, radio, handleInputChange,e)} className="radio-label">
                                    <input type="radio" name={input.field} value={radio.id} id={radio.title} checked={radio.checked}/>
                                    <span>{translation.lang === "he"? radio.title: radio.titleEN}</span>
                                </label>)
                                : null}
                    </div>
                    {error && <span className='error-message'>{error}</span>}
                </React.Fragment>
               
    }
}
 
export default RadioButton;