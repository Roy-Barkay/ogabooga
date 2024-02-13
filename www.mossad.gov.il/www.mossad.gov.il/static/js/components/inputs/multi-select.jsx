import React, { Component } from 'react';

class MultiSelect extends Component {
    state = {
        active: false
      }
    
    options = React.createRef()

    handleDropDown = () => {
        this.setState({active: !this.state.active})
        this.options.current.children[0].focus()
    }

    handleApprove = () => {
        this.setState({active: !this.state.active})
    }

    handleCheck = e => {
        e.preventDefault();
        if (e.keyCode === 13) {
            e.target.checked = !e.target.checked;
        }
    }

    render() {
        const {input, handleInputChange, translation} = this.props;
        const {active} = this.state;
        return <div className={active? "multi-select active": "multi-select"}>
                    <button onClick={this.handleDropDown} onKeyDown={this.handleDropDown} aria-expanded={active} className="multiselect-button">{translation.data.POSITIONS_PAGE.DOMAIN}</button>
                    <div className={active? 'multi-select-dropdown show': 'multi-select-dropdown'}>
                        <ul ref={this.options}>
                        {input.options? input.options.map(option => 
                            <li className="option" key={option.id}>
                                <label tabIndex="1"  onClick={(e) => handleInputChange(e,input, option)}>
                                    <input type="checkbox"  name={option.title} id={option.title} checked={option.checked} readOnly/>
                                    <span>{translation.lang === "he"? option.title: option.titleEN}</span>
                                </label>
                            </li>
                        ): null}
                        </ul>
                        <div className='drop-down-footer'>
                            <button onClick={() => this.handleApprove()} onKeyDown={this.handleDropDown}>{translation.data.POSITIONS_PAGE.FIND_ME_POSITION}</button>
                        </div>
                    </div>
                    <div className={active? 'multi-select-background show': 'multi-select-background'} onClick={this.handleDropDown}></div>
                </div>;
    }
}
 
export default MultiSelect;