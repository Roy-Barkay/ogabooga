import React from 'react';

const Upload = ({name, placeholder, value, error, onChange, label, required }) => {
    return <div className='upload-input'>
                {label && value.length === 0 ? <label htmlFor={name} className="input-label">{label}</label> : <label htmlFor={name} className="input-label">{value[0].name}</label>}
                <input type="file" name={name} id={name} placeholder={placeholder} value={value.path} onChange={onChange} className={error && "error-input"}  accept=".docx,.doc,.pdf" required={required}/>
                {error && <span className='error-message'>{error}</span>}
            </div>
}
 
export default Upload;