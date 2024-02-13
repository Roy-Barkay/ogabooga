import React from 'react';

const Input = ({name, placeholder, value, error, onChange, label, required }) => {
    const textInput = React.createRef();

    const handleChange = () => {
        onChange({currentTarget: textInput.current})
    }

    const handleEmpty = () => {
        textInput.current.value = "";
        onChange({currentTarget: textInput.current})
    }
    return <div className='text-input'>
                {label? <label htmlFor={name} className="input-label">{label}{required? <span className='required'>*</span>: null}</label> : null}
                <input type="text" name={name} id={name} placeholder={placeholder} value={value} onChange={handleChange} className={error && "error-input"} required={required} ref={textInput}  />
                <span className='error-message'>{error}</span>
                {value?  <button type="button"><img src="/ex.svg" alt="empty input" onClick={handleEmpty}/></button> :  null }
            </div>
}
 
export default Input;