import React, { Component } from 'react';

class ActiveFilters extends Component {
    state = {  } 
    render() {
        const {filterInput, removeFilter} = this.props;
        return <React.Fragment>
                {filterInput.options.map((option) => 
                        <label className='active-filter' key={option.id}>
                            {option.title}
                            <button className='close-label' onClick={() => removeFilter(filterInput , option)} title={"clear "+option.title}>
                                <img src={process.env.PUBLIC_URL + '/X.svg'} alt={"clear"+option.title} />
                            </button>
                        </label>
                        )}
                </React.Fragment>
        
    }
}
 
export default ActiveFilters;