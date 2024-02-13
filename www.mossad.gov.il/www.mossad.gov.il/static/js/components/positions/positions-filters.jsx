import React, { Component } from 'react';
import MultiSelect from '../inputs/multi-select';
import RadioButton from '../inputs/radio-button';
import ActiveFilters from '../positions/active-filters';

class PositionsFilters extends Component {
    state = {
        active: false
      }


    handleMobileShow = () => {
        this.setState({active: !this.state.active})
    }

    handelInputSwitch = (input, index, handleInputChange, translation, activeFilters) => {
        switch(input.type) {
            case 'radio':
              return <RadioButton input={input} key={index} handleInputChange={handleInputChange} translation={translation}></RadioButton>;
            case 'multi-select':
              return <MultiSelect input={input} key={index} handleInputChange={handleInputChange} translation={translation} activeFilters={activeFilters}></MultiSelect>;
            default:
              return '';
        }
    }
    render() {
        const {filterInputs, handleInputChange, activeFilters, removeAllFilters, removeFilter, positionNavigation , currentPosition, translation}  = this.props;
        const {active} = this.state;
        return  <React.Fragment>
                    <div className="mobile-actions">
                        <button className={activeFilters.length > 0? "mobile-filter active": "mobile-filter"} onClick={this.handleMobileShow}>
                            {activeFilters.length > 0? <img src="/filter-icon-filled.svg" alt="active filter" />: <img src="/filter-icon.svg" alt="filter" />}
                            סינון
                        </button>
                        {currentPosition.title?  <button className="mobile-positions-back"  onClick={() => positionNavigation({})}>חזרה לחיפוש הראשי</button> : null}
                    </div>
                    <div className={active? 'positions-filters show': 'positions-filters'}>
                        <label className='position-filter-label'>{translation.data.POSITIONS_PAGE.FILTER_BY}:</label>
                            <div className='filter-section'>
                                    {filterInputs.map((x, index) => this.handelInputSwitch(x, index, handleInputChange, translation, activeFilters))}
                            </div>
                            {activeFilters.length > 0? 
                                <div className='active-filters'>
                                    {activeFilters.map(input => 
                                        <ActiveFilters filterInput={input} removeFilter={removeFilter} key={input.field}></ActiveFilters>
                                    )}
                                    {activeFilters.length > 0? 
                                    
                                    <div className='remove-all'>
                                        <button onClick={removeAllFilters}>נקה הכל</button>
                                    </div>:null}
                                </div>
                                :
                                null
                            }
                        
                        </div>
                        
                    </React.Fragment> 
    }
}
 
export default PositionsFilters;