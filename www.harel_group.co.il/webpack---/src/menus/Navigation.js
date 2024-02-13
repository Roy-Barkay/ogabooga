import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import axios from 'axios';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import MegaMenu from './megaMenu/MegaMenu';
import useStyles from './Navigation.style';
import { OrangeAirBalloonIcon, CloudIcon, BlueAirBalloonIcon, SearchBlueIcon, SearchIcon } from '../common/Icons/MiscIcons';
import { Button, Progress } from 'common-ui';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Background, LogoIconHarel } from './NavigationBackground';
import SearchBarMenu from '../search/SearchBarMenu';

import PersonalMenu from './personal/PersonalMenu';
import { Slide } from '@material-ui/core';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            personalMenuOpen: false,
            currentUserDetails: JSON.parse(sessionStorage.getItem(process.env.REACT_APP_CONNECTED_KEY)),
            connecting: false,
            searchOpen: false,
            isDesktop: false,
        }

        this.homePage = window.location.href.includes("https://www-ta.harel-group.co.il/Pages/default.aspx") || window.location.href.includes( "https://www-dev.harel-group.co.il/Pages/default.aspx")
        ||  window.location.href.includes("https://www-t.harel-group.co.il/Pages/default.aspx") ||  window.location.href.includes("https://www-b.harel-group.co.il/Pages/default.aspx") ||  window.location.href.includes("https://www-a.harel-group.co.il/Pages/default.aspx") || 
            window.location.href.includes("https://www.harel-group.co.il/Pages/default.aspx/");
   //     this.homePage = (["/", "/pages/default.aspx", "/pages/default.aspx/", "/pages/react-test.aspx"].indexOf(window.location.pathname.toLowerCase()) > -1);
        this.searchOpenClick = this.searchOpenClick.bind(this);
        this.handleResize = this.handleResize.bind(this);

    }
    componentDidMount() {
        axios.post(`${process.env.REACT_APP_BASE_URL}/_vti_bin/webapi/CustomersAuthentication/PostAuthenticate/GetCurrentDetails`)
            .then((response) => {
                if (response.data.Status === 0) {
                    if (response.data.Details.current)
                        sessionStorage.setItem(process.env.REACT_APP_CONNECTED_KEY, JSON.stringify(response.data.Details.current))
                    this.setState({ currentUserDetails: response.data.Details.current });
                }
            })
            .catch((error) => {
                console.log(error);
            });

            this.resizeObserver = new ResizeObserver(this.handleResize);
            this.resizeObserver.observe(document.body)
            window.addEventListener("resize", this.handleResize)
    }

    componentWillUnmount() {
        this.resizeObserver.disconnect();
        window.removeEventListener("resize", this.handleResize)
    }

    handleResize() {
        this.setState({isDesktop: window.innerWidth >= process.env.REACT_APP_WIDTH })
    }

    searchOpenClick(e) {
        document.body.style.overflow = !this.state.searchOpen ? 'hidden' : 'unset';
        document.body.style.position = !this.state.searchOpen ? 'fixed' : 'static';
        document.body.style.left = !this.state.searchOpen ? '0' : 'unset';
        document.body.style.right = !this.state.searchOpen ? '0' : 'unset';
        this.setState({ searchOpen: !this.state.searchOpen });
        e.stopPropagation();
        e.preventDefault();
        setTimeout(() => {
            document.querySelector('button[aria-label="חיפוש"]').focus();
         }, 50);
    }


    render() {
        const classes = this.props.classes;

        let fullName = null;
        if (this.state.currentUserDetails)
            fullName = `${this.state.currentUserDetails.FirstName} ${this.state.currentUserDetails.LastName}`;

        let personalDiv = null;

        if (this.state.connecting)
            personalDiv = (
                <Dialog open={true} disableBackdropClick={true} disableEscapeKeyDown={true}>
                    <DialogTitle className={classes.modalTitle}>
                        הפרטים בבדיקה, אנא המתן...
                    </DialogTitle>
                    <DialogContent className={classes.modalContent}>
                        <Progress /><br /><br />
                    </DialogContent>
                </Dialog>
            );

        const logo = <a href="/Pages/default.aspx" title="הראל ביטוח ופיננסים - דף בית"><LogoIconHarel textColor={this.state.isDesktop ? "#4F5254" : "#ffffff"} className={classes.backgroundLogo} data-hrl-bo="atm-harelLogo"/></a>;
        const searchButton = <Button variant='text' aria-label="חיפוש" aria-haspopup='dialog' onClick={(event) => {event.stopPropagation(); this.searchOpenClick();}} data-hrl-bo="atm-innerSearchBtn"><SearchIcon className={classes.searchIcon} /></Button>;


        if (this.state.isDesktop)

            return (<>
                    {this.state.searchOpen ? <SearchBarMenu onClick={this.searchOpenClick} /> : null}
                <nav className={this.homePage ? classes.rootHome : classes.root} data-hrl-bo="atm-navRoot" role="banner">
                    <div className={classes.backgroundBox}>
                        <Background className={classes.background} />
                    </div>
                    <div className={classes.base} >
                        <div className={classes.menuLine} data-hrl-bo="atm-topics">
                            {logo}
                            <MegaMenu topics={this.state.currentUserDetails ? this.state.currentUserDetails.Topics : null} />
                            {this.homePage ? <div className={classes.divSearch} ></div> :
                                <Button aria-haspopup="true" variant='text'  onClick={this.searchOpenClick} aria-haspopup='dialog' aria-label="חיפוש" data-hrl-bo="atm-innerSearchBtn">
                                    <SearchBlueIcon className={classes.searchIcon} />
                                </Button>}

                            <div className={classes.personalBoxDesktop}>
                                <PersonalMenu homePage={this.homePage} currentUserDetails={this.state.currentUserDetails} />
                            </div>

                        </div>
                    </div>
                </nav >
                {this.homePage ? null :
                    <><OrangeAirBalloonIcon className={classes.ob} /><CloudIcon className={classes.c} /><BlueAirBalloonIcon className={classes.bb} /></>}
            </>);
         else
            return (
                
                <nav className={this.homePage ? classes.rootHome : classes.root}>
                    <PersonalMenu homePage={this.homePage} searchButton={searchButton} currentUserDetails={this.state.currentUserDetails} />
                    {this.state.searchOpen ?
                        <SearchBarMenu onClick={this.searchOpenClick} /> : null}
                    {/*                     {this.state.personalMenuOpen ? personalDiv : null}                 */}
                </nav >
            );
    }
}

Navigation.displayName = 'navigation';

export default withWidth()(useStyles(Navigation));