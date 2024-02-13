import React, { useState } from 'react';
import useStyles from './PersonalMenu.style';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Slide, Grow, Collapse } from '@material-ui/core';
import { LogoIconHarel } from '../NavigationBackground';
import { SvgMenuBG, ConnectedBobIcon, MenuArrowIcon, MenuCloseArrowIcon, YellowVIcon, ConnectComputerIcon } from '../MenuIcons';
import { Button } from 'common-ui';
import MegaMenu from '../megaMenu/MegaMenu';
import MegaMenuButton from '../megaMenu/MegaMenuButton';
import PersonalConnect from './PersonalConnect'
import MessageTime from '../../common/Times/MessageTime';
import PersonalActions from './PersonalActions';
import PersonalLinks from './PersonalLinks';
import IconRef from '../../common/Icons/IconRef';

function PersonalMenu(props) {
    const [personalMenuOpen, setPersonalMenuOpen] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);

    const classes = useStyles();
    const theme = useTheme();

    const toggleMenu = () => 
    {
        setPersonalMenuOpen(!personalMenuOpen);
        setTimeout(() => {
           let element = document.querySelector('[id="entered"]');
           if (element && element.focus) {
               element.focus();
           }
           else{
               let element = document.getElementById('msg');
               if (element) {
                   element.parentNode.setAttribute("tabindex","-1");
                   element.parentNode.focus();
               }

           }
   }, 100);
    }
    const isDesktop =useMediaQuery(theme.breakpoints.up(process.env.REACT_APP_WIDTH));

    const logo = <a href="/Pages/default.aspx" title="הראל ביטוח ופיננסים" onClick={(e)=> e.stopPropagation()}><LogoIconHarel textColor={isDesktop ? "#4F5254" : "#ffffff"} className={classes.backgroundLogo} /></a>;
    const megaMenuButton = <MegaMenuButton onClick={(event) => {setMegaMenuOpen(true); event.stopPropagation();}} />;
    var menuTop = null;
    var menuBody = null
    var personalButton = null;
   
    function closeMenu(){
        setMegaMenuOpen(false);
        // setTimeout(() => {
        //     const element = document.querySelector('[aria-label="תפריט"]');
        //     if (element && element.focus) {
        //         element.focus();
        //     }
        // }, 1);
        
    }

    
    function clickBtnFocuse(e){
        // if( e.shiftKey) 
        // { 
        //     if(personalMenuOpen)
        //          setPersonalMenuOpen(true)  
        //     else
        //         setPersonalMenuOpen(false)
        // }
        // if(e.keyCode == 9 && e.shiftKey) 
        // {          
        //    if(personalMenuOpen){
        //     setTimeout(() => {
        //         const element = document.querySelector('[id="empoweredId"]');
        //         if (element && element.focus) {
        //             element.focus();
        //         }
        //     }, 100);}
        // }
        // if(e.keyCode == 9 && !e.shiftKey) 
        // {
        //    console.log('9')
        //    setPersonalMenuOpen(false)
        //     setTimeout(() => {
        //         const element = document.querySelector('[id="searchBox"]');
        //         if (element && element.focus) {
        //             element.focus();
        //         }
        //     }, 1);
        // }
    //    if(e.keyCode == 13) {
    //             // if(!personalMenuOpen){
    //             setTimeout(() => {
    //                     const element = document.querySelector('[id="entered"]');
    //                     if (element && element.focus) {
    //                         element.focus();
    //                     }
    //                 }, 1);
    //             }
        //  }
    }
    
    //home: props.homePage   open: personalMenuOpen   mobile: isDesktop   logged in: props.currentUserDetails
    if (isDesktop) {
        if (props.currentUserDetails) {
            menuTop = (<div className={classes.greeting} data-hrl-bo="atm-currentGreeting">
                <MessageTime />
                {props.currentUserDetails.PowerOfAttorneyUser && props.currentUserDetails.PowerOfAttorneyUser.IsPowerOfAttorney?
                
                      <>
                            <div>{props.currentUserDetails.PowerOfAttorneyUser.firstName}</div>
                            <div>מחובר/ת לחשבון של {props.currentUserDetails.FirstName}</div> 
                      </> :
                     <div>{props.currentUserDetails.FirstName}</div>
                    }

            </div>);
        }
        else {
            personalButton = <Button variant='contained' onClick={toggleMenu} aria-expanded= "false">כניסה לאזור האישי</Button>;
            menuBody = (<div className={classes.homePage} data-hrl-bo="atm-generalPersonalMenuTest">
              <div >שלום, כאן הראל</div>
                {personalButton}
            </div>);
        }
    }
    else {
        if (props.homePage) {

            if (props.currentUserDetails) {
                menuTop = (<React.Fragment>
                    {megaMenuButton}
                    <div className={classes.logoSpace}>{logo}</div>
                    <div className={classes.greeting}>
                        <MessageTime />
                        {props.currentUserDetails.PowerOfAttorneyUser && props.currentUserDetails.PowerOfAttorneyUser.IsPowerOfAttorney?
                      <>
                            <div>{props.currentUserDetails.PowerOfAttorneyUser.firstName}</div>
                            <div>מחובר/ת לחשבון של {props.currentUserDetails.FirstName}</div> 
                      </> :
                     <div>{props.currentUserDetails.FirstName}</div>
                    }

                    </div>
                </React.Fragment>);
            }
            else {
                menuTop = (<React.Fragment>
                    {megaMenuButton}
                    <div className={classes.logoSpace}>{logo}</div>
                </React.Fragment>);
                   personalButton = <Button variant='contained' onClick={toggleMenu} data-hrl-bo="atm-enterPersonalBtn" aria-expanded= "false">כניסה לאזור האישי</Button>;
                menuBody = (<div className={classes.homePage} >
                     <div  >שלום, כאן הראל</div>
                    {personalButton}
                </div>);
            }
        }
        else // not home page
        {
            if (props.currentUserDetails)
                personalButton = <Button aria-expanded={personalMenuOpen} className={classes.personalBtn} onClick={toggleMenu}><ConnectedBobIcon /></Button>;
            else
                personalButton = <Button aria-expanded={personalMenuOpen} variant='text' onClick={toggleMenu}>כניסה</Button>;

            menuTop = (<>
                <div className={classes.innerPage}>
                    {megaMenuButton}
                    <div className={classes.logoSpace}>{logo}</div>
                    <div>
                        {props.searchButton}
                        {personalButton}
                    </div>
                </div>
                {props.currentUserDetails && personalMenuOpen ? <div className={classes.greeting}>
                    <MessageTime />
                    {props.currentUserDetails.PowerOfAttorneyUser && props.currentUserDetails.PowerOfAttorneyUser.IsPowerOfAttorney?
                      <>
                            <div>{props.currentUserDetails.PowerOfAttorneyUser.firstName}</div>
                            <div>מחובר/ת לחשבון של {props.currentUserDetails.FirstName}</div> 
                      </> :
                     <div>{props.currentUserDetails.FirstName}</div>
                    }
                </div> : null}

            </>);
        }
    }

    if (personalMenuOpen) {
        if (props.currentUserDetails) {
            menuBody = (<div className={classes.connected}>
                <PersonalActions menuItems={props.currentUserDetails.PersonalMenu} msgNum={props.currentUserDetails.NumberOfMessages} />
                <Button variant='contained' onClick={(e) => { window.location.href = '/personal-info/my-harel/Pages/client-view.aspx'; e.preventDefault(); }} data-hrl-bo="atm-personalMenuMyHarel" role="link">להראל שלי</Button>
                <PersonalLinks links={props.currentUserDetails.PersonalLinks}/>
                <div className={classes.getOut} data-hrl-bo="atm-personalMenuLogout">
                    <a href={'/_layouts/15/HarelWebSite/ApplicationPages/HarelAuthenticate.aspx?ActionSource=LogOut'} onClick={()=> sessionStorage.removeItem(process.env.REACT_APP_CONNECTED_KEY)} title={'התנתק'}>
                        <IconRef viewBox="0 0 20 20" name={'icon-LogOut'} />
                        יציאה
                    </a>
                </div>
            </div>);
        } else {
            menuBody = (
              
                <Slide direction='down' in={true}>
            <div className={classes.openNotConnected}>
                <div id="entered" tabIndex="-1" role="heading" aria-level="2">כניסה לאזור האישי</div>
                <PersonalConnect  connectClick={() => setPersonalMenuOpen(false)}></PersonalConnect>
                <div>
                    <ConnectComputerIcon />
                    <br role="presentation"/>
                    <div role="heading"  aria-level="3">
                        דברים שאפשר
                            <br role="presentation"/>
                      לעשות באיזור האישי</div>
                    <ul data-hrl-bo="atm-staticMenuLinks">
                        <li><YellowVIcon /><br role="presentation"/>בדיקת סטטוס התביעות שלך</li>
                        <li><YellowVIcon /><br  role="presentation"/>צפייה ושינוי בפוליסות שלך</li>
                        <li><YellowVIcon /><br role="presentation"/>צפייה בדוחות הקיימים שלך</li>
                    </ul>
                </div>
                <div>
                <button onClick={()=>{ window.postMessage('empowered', "*");}} className={classes.link} aria-haspopup="true" id="empoweredId">כניסה כמיופה כוח</button>
                </div>

            </div></Slide>)
        }
    }

    return (<>
      
        <ClickAwayListener onClickAway={() => setPersonalMenuOpen(false)}>
       
        <div className={classes.personalBox}  onKeyDown={(e) => { if (e.keyCode === 27) setPersonalMenuOpen(false); }} onClick={!personalMenuOpen ? toggleMenu : function(){} }>
          
                <div className={classes.background2} aria-hidden="true"><SvgMenuBG /></div>
                <div className={classes.personalMenu2}>
                    {menuTop}
                   
                    {menuBody}
                   
                </div>
                <div className={classes.menuArrow}>
                <button className={classes.menuArrowBtn} aria-label="איזור אישי. פתח/סגור פאנל" aria-expanded={personalMenuOpen ? "true" : "false"} onClick={(e)=>{toggleMenu()}}  data-hrl-bo="atm-personalMenuArrow">
                    {personalMenuOpen ?
                        <MenuCloseArrowIcon  /> :
                        <MenuArrowIcon  />}
                </button>
                </div>
             
            </div>  
            
        </ClickAwayListener>
        
        
        {megaMenuOpen ? <MegaMenu closeMenu={() => closeMenu()} topics={props.currentUserDetails ? props.currentUserDetails.Topics : null} /> : null}
    </>);
}

export default PersonalMenu;
