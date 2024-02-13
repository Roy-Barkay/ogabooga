import React, { Component } from 'react';

class AutoComplete extends Component {
    state = {
        active: false
      }
    render() {
        const {options, handleInputChange, placeholder, value} = this.props;
        return <div className={options.length> 0 ? "auto-complete active": "auto-complete"}>
                    <input onKeyUp={(event)=> handleInputChange(event)} className="auto-complete-input" placeholder={placeholder}/>
                    <div className={options.length> 0 ? 'auto-complete-dropdown show': 'auto-complete-dropdown'} >
                        <ul>
                        {options.length > 0? options.map(option => 
                            <li className="option" key={option.title+option.id}>
                                {option.icon? 
                                    <a href={"/positions?department="+option.id} dangerouslySetInnerHTML={ {__html: option.title.replace(value, "<strong>"+value+"</strong>")}}></a>
                                    :
                                    <a href={"/positions/"+option.id} dangerouslySetInnerHTML={ {__html: option.title.replace(value, "<strong>"+value+"</strong>")}}></a>
                                    }
                            </li>
                        ): null}
                        </ul>
                    </div>
                    {/* <div className={options.length> 0 ? 'multi-select-background show': 'multi-select-background'} onClick={this.handleDropDown}></div> */}
                </div>;
    }
}
 
export default AutoComplete;