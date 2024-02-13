import React from 'react';
import { Typography } from 'common-ui';
import SearchBar from './SearchBar'
import { MagnyfingGlassIcon, CloseBlueIcon, CloseBlueIconWithShadow } from '../common/Icons/MiscIcons';
import { SearchBackground, SearchBackgroundDesktop } from '../menus/NavigationBackground';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import useStyles from './SearchBarMenu.style';

class SearchBarMenu extends React.Component {
   
    componentDidMount() {
        setTimeout(() => {
            document.getElementById('warpPopap').focus();
         }, 50);
            if(window.innerWidth >= process.env.REACT_APP_WIDTH) {
               document.getElementById('mfHeader').getElementsByClassName('CH-MuiSvgIcon-root')[1].parentElement.setAttribute('aria-label','סגירת חלונית חיפוש')
             
            }
         else{
           
               document.getElementById('mfHeader').getElementsByClassName('CH-MuiSvgIcon-root')[5].parentElement.setAttribute('aria-label','סגירת חלונית חיפוש')
                }
           
         
    }
    render() {
        const classes = this.props.classes;
        const isDesktop = window.innerWidth >= process.env.REACT_APP_WIDTH;
        return (
            <div role="dialog" className={classes.root} id="warpPopap" tabIndex='-1' aria-labelledby="questionTitle">
                {isDesktop ? <SearchBackgroundDesktop   className={classes.background} /> :
                    <SearchBackground    className={classes.background} />}
                <div>
                    <div className={classes.message}>
                        <div className={classes.spanMessage}>
                        </div>
                        <button className={classes.closeBtn} onClick={this.props.onClick}>
                            {isDesktop ? <CloseBlueIconWithShadow /> : <CloseBlueIcon />}
                        </button>
                    </div>
                    <div className={classes.titleMobile}>
                        <Typography variant="h2" id="questionTitle">איזה מידע למצוא עבורך? </Typography>
                    </div>
                    <SearchBar placeholder="מה תרצה לעשות?" personalSuggestionsTitle={'חיפושים קודמים שלך'} searchContent={<MagnyfingGlassIcon />}></SearchBar>
                </div>
            </div>
        );
    }
}

export default withWidth()(useStyles(SearchBarMenu));