import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {Fade } from 'common-ui';
import useStyles from './WorldMenu.style';
import {DownIcon} from '../NavigationBackground';
import { LeftIcon } from '../../common/Icons/MiscIcons';


class WorldMenu extends React.Component {
    render() {
        const classes = this.props.classes;
       let areas = null;

        if (this.props.areas) {
            let items = this.props.areas.map(item => <li key={item.ID} onKeyDown={(e) => {
              if(e.keyCode === 27)
                 this.props.CloseWorldByTab()}}><a href={item.Harel_Link.NavigateUrl} mainCategory={this.props.world.Title}>{item.Title}</a></li>);
            areas = (
              <ClickAwayListener onClickAway={this.props.onClickAway}>

                    <Fade number={50} in={this.props.areas ? true : false}>
                        <ul>{items}
                        <div id="linkLi" className={classes.linkLi} noValidate onKeyDown={(e) => {
                          if(e.keyCode === 9)
                             this.props.CloseWorldByTab()}}>              
                        <a href={this.props.world.Harel_LinkContent.NavigateUrl} ToolTip={this.props.world.Harel_LinkContent.ToolTip} mainCategory={this.props.world.Title} >
                           
                          <span  className={classes.extendSpan}>{this.props.world.Harel_LinkContent.Text}</span>
                          <div className={classes.downBox}>
                        <LeftIcon className={classes.down}/>
                        </div>
                        </a>
                        </div>  
                       
                        </ul>
                 </Fade>
                 </ClickAwayListener>

               );
        }

        return (
            <div  onMouseLeave={this.props.closeWorld} className={classes.root}>
                <button type="button" className={this.props.areas ? "open" : null} aria-expanded={this.props.areas ? true : false} onClick={this.props.areas ?this.props.closeWorld:this.props.worldClick} onMouseEnter={this.props.worldMouseEnter} aria-haspopup="menu" style={{display:'block'}}>
                <span>{this.props.world.Title}</span>             
                <div className={classes.downIconBox}><DownIcon className={classes.downIcon}/></div> 
                 <div className={classes.lineCopy}/>              
                </button>
              {areas}
               
                
                
            
            </div>
            
        );
    }
}

export default useStyles(WorldMenu);