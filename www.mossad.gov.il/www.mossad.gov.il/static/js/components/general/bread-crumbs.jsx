import React, { Component } from 'react';

class BreadCrumbs extends Component {
    render() {
        const {translation, breadCrumbsObj} = this.props;
        return <ul className='bread-crumbs'>
                    <li>
                        <span><a href="/">{translation.data.HOME}</a><span className='arrow-left-black'></span></span>
                    </li>  
                    {breadCrumbsObj.map((breadcrumb, index) => 
                        <li key={index}>
                            {breadCrumbsObj.length === index+1? 
                            <span>{translation.lang ==="he"? breadcrumb.title: breadcrumb.titleEN}</span>
                            :
                            <span><a href={breadcrumb.link}>{translation.lang ==="he"? breadcrumb.title: breadcrumb.titleEN}</a><span className='arrow-left-black'></span></span>}
                        </li>    
                    )}
                </ul>;
    }
}
 
export default BreadCrumbs;