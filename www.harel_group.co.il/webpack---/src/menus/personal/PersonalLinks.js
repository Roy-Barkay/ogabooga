import React, { useState } from 'react';
import useStyles from './PersonalLinks.style';
import callCustomerAction from '../../elasticLog';
import IconRef from '../../common/Icons/IconRef';

class PersonalLinks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Promotions: [],
        }

        this.promoClick = this.promoClick.bind(this);
    }

    async promoClick(e, navUrl, target, title) {
       
        e.preventDefault();
        await callCustomerAction(3335, 213, title, navUrl, 7);
        window.open(navUrl, target || '_self');
    }

    render () 
    {
        const classes = this.props.classes;

        let buttons = this.props.links.map(item => {

            return (<li key={item.UserMenuKey}>
                  <a href={item.UserMenuLink.NavigateUrl}  onClick={(e) => this.promoClick(e, item.UserMenuLink.NavigateUrl, "_self", item.Title)}>
                    <IconRef viewBox="0 0 84 90" name={item.SvgIconId} />
                    {item.Title}
                </a>
            </li>
            )
        });

        return (
            <div className={classes.root}>
                   <div role="heading"  aria-level="3">באנו לקצר לך את הדרך...</div> 
                <ul data-hrl-bo="atm-personalMenuLinks">{buttons}</ul>
            </div>
        );
    }
}

export default useStyles(PersonalLinks);;
