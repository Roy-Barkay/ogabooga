import React from 'react';
import { ExpansionPanel } from 'common-ui';
import useStyles from './MegaMenuExpansion.style';
import LinksList from '../../LinksList/LinksList';
import { YellowArrowIcon, LeftIcon, CloseIcon } from '../../common/Icons/MiscIcons';
import { LogoIcon, BackgroundExpansion } from '../NavigationBackground';
import IconRef from '../../common/Icons/IconRef';
import MessageTime from '../../common/Times/MessageTime';
import { Slide, useForkRef } from '@material-ui/core';

class MegaMenuExpansion extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            document.querySelector('button[id="close"]').focus();
        }, 0);
    }

 

    keyDownFocus(e)
     {
        if (e.keyCode === 9) {
            var menuDiv = document.getElementById('expantionDiv').querySelectorAll('[id*="header"]');
            var contentDiv = document.getElementById('expantionDiv').querySelectorAll('[id*="content"]');
            var subMenuDiv = contentDiv[contentDiv.length - 1].querySelectorAll('a');
            var lastDiv = menuDiv[menuDiv.length - 1].getAttribute("aria-expanded") == 'true' ? subMenuDiv[subMenuDiv.length - 1] : menuDiv[menuDiv.length - 1];

            if (document.activeElement === lastDiv) {
                setTimeout(() => {
                    document.querySelector('button[id="close"]').focus();
                }, 0);
            }
        }
        ;
    }
    render() {
        let items = [];
        let world = this.props.worlds;

        const classes = this.props.classes;

        if (this.props.topics && this.props.topics.length > 0) {
            let topicsLinks = this.props.topics.map(t => {
                return ({
                    img: null,
                    id: t.TopicId,
                    href: t.Link.NavigateUrl,
                    title: t.Title,
                    alt: null,
                    target: null,
                    icon: null,
                    //alt: anchor.Harel_Link.ToolTip,                        
                })

            });
            topicsLinks.push({ href: '/personal-info/my-harel/Pages/client-view.aspx', title: 'לכל המוצרים שלי', img: null, alt: null, icon: <LeftIcon />, target: null })
            let header = <div className={classes.divLi}><IconRef name="icon-House" viewBox="0 0 30 30" /><span className={classes.spanItems}>המוצרים שלי</span></div>;
            items.push({ id: 'topics', header: header, body: <LinksList links={topicsLinks} mainCategory='המוצרים שלי' /> });
        }

        let areas = [];
        if (this.props.subAreas.length && world.length) {
            for (let i = 0; i < world.length; i++) {
                areas = this.props.subAreas.filter(area => area.Harel_MainArea.startsWith(`${world[i].ID};#`))

                let result = areas.map(anchor => {
                    return ({
                        img: null,
                        id: anchor.ID,
                        href: anchor.Harel_Link.NavigateUrl,
                        title: anchor.Title,
                        alt: null,
                        target: null,
                        icon: null,
                        //alt: anchor.Harel_Link.ToolTip,                        
                    })

                });
                result.push({ href: world[i].Harel_LinkContent.NavigateUrl, title: world[i].Harel_LinkContent.Text, img: null, alt: null, icon: <LeftIcon />, target: null })
                let header = <div className={classes.divLi} aria-haspopup="true"><IconRef name={world[i].SVGIcon} viewBox="0 0 30 30" /><span className={classes.spanItems}>{world[i].Title}</span></div>;
                items.push({ id: world[i].ID, header: header, body: <LinksList links={result} mainCategory={world[i].Title} /> });
            }

            return (

                <div className={classes.root}>
                    <Slide direction='left' in={true}>
                        <div className={classes.backgroundBox} id="expantionDiv" role="dialog" onKeyDown={this.keyDownFocus} >
                        {!(/iPad|iPhone|iPod/.test(navigator.userAgent))  && <BackgroundExpansion className={classes.background}></BackgroundExpansion>}
                            <div className={classes.content} role="navigation" aria-label="תפריט ראשי">
                                <div id="message" className={classes.message}>
                                    <div className={classes.spanMessage}>
                                        <MessageTime /> </div>
                                    <button id="close" className={classes.closeBtn} onClick={this.props.onClick} aria-label="סגירה">
                                        <CloseIcon />
                                    </button>
                                </div>
                                <div className={classes.items}>
                                    <LogoIcon></LogoIcon>
                                    <a href="/Pages/default.aspx" title="הראל ביטוח ופיננסים" >דף הבית</a>
                                </div>
                                <ExpansionPanel className={classes.panel} panels={items} expandIcon={<YellowArrowIcon />} />
                            </div>
                        </div>
                    </Slide>
                </div>

            );
        };
        return (null);
    }
}

export default useStyles(MegaMenuExpansion); 