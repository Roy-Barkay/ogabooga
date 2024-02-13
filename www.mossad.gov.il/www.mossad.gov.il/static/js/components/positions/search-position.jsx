import React, { Component } from 'react';

class SearchPosition extends Component {
    state = {  } 
    render() {
        const {searching, searchTerm, translation} = this.props;
        return <div className="search-position">
                    <form>
                        <h1>{translation.data.POSITIONS_PAGE.TITLE}</h1>
                        <input type="text" placeholder={translation.data.POSITIONS_PAGE.SEARCH_PLACEHODER} onChange={(event) => searching(event.target.value)} value={searchTerm}/>
                    </form>
                </div>;
    }
}
 
export default SearchPosition;