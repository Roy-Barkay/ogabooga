import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash'

class Pagination extends React.Component {
    
   render() { 
        const { itemsCount, pageSize, currentPage, onPageChange, translation} = this.props;
        const pagesCount = Math.ceil(itemsCount/pageSize);
        if(pagesCount === 1) return null;
        const pages = lodash.range(1, pagesCount+1)
        return <nav aria-label="navigation" className='pagination-div'>
                    <div className="pagination">
                        {pages.length > 0? 
                        <button className='paginaion-arrow' disabled={currentPage === 1} onClick={(event)=> onPageChange(event ,currentPage-1)}>
                            <span className='square-arrow right'></span>
                           {translation.data.PREVIOUS}
                        </button>
                        : null
                        }
                        <ul className='pages-section'>
                            {pages.map(page => <li className={page === currentPage? "page-item active" : "page-item"} key={page} onClick={(event)=> onPageChange(event ,page)} onKeyDown={(event)=> onPageChange(event ,page)} tabIndex="0">
                                                    <a className="page-link" >
                                                        {page}
                                                    </a>
                                                </li>)}
                        </ul>
                        {pages.length > 0? 
                        <button className='paginaion-arrow right' disabled={pagesCount === currentPage} onClick={(event)=> onPageChange(event ,currentPage+1)}>
                           {translation.data.NEXT}
                            <span className='square-arrow'></span>
                        </button>
                        : null
                        }
                    </div>
                </nav>;
    }
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func.isRequired 
}



export default Pagination;