import React from 'react';
import IconRef from '../../common/Icons/IconRef';
import callCustomerAction from '../../elasticLog';
import { withStyles } from '@material-ui/styles';
import useStyles from './PersonalActions.style';

class PersonalActions extends React.Component {
    constructor(props) {
        super(props);
        this.actionsClick = this.actionsClick.bind(this);
    }
    async actionsClick(navUrl, title) {
        await callCustomerAction(3335, 213, title, navUrl, 7);
    }
    render() {
        const classes = this.props.classes;

        const logoutLink = '/_layouts/15/HarelWebSite/ApplicationPages/HarelAuthenticate.aspx?ActionSource=LogOut';
        const logoutKey = 'exit';
        const mailKey = 'mailbox';

        let buttons = this.props.menuItems.map(item => {

            return (<li key={item.UserMenuKey}>
                <a href={item.UserMenuKey === logoutKey ? logoutLink : item.UserMenuLink.NavigateUrl} title={item.UserMenuLink.ToolTip} data-hrl-bo={item.Title} onClick={() => this.actionsClick(item.UserMenuKey === logoutKey ? logoutLink : item.UserMenuLink.NavigateUrl, item.Title)}>
                    <IconRef viewBox="0 0 20 20" name={item.SvgIconId} />
                    {item.Title} {item.UserMenuKey === mailKey && this.props.msgNum > 0 ? '(' + this.props.msgNum + ')' : ''}
                </a>
            </li>
            )
        });

        return (
            <div className={classes.root}>
                <ul>{buttons}</ul>
            </div>
        );
    }
}

export default withStyles(useStyles)(PersonalActions);