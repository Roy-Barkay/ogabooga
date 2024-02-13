import React, { Component } from 'react';
import useStyles from './FooterBottomMenu.style';
import LinksList from '../LinksList/LinksList';
import axios from 'axios';
import { ExpansionPanel } from 'common-ui';
import { YellowArrowIcon } from '../common/Icons/MiscIcons';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { OrangeAirBalloonIcon, CloudIcon } from '../common/Icons/MiscIcons';

class FooterBottomMenu extends Component {
    footerKey = "Harel_FooterBottomMenu";

    constructor(props) {
        super(props);
        this.state = {
            menuItems: JSON.parse(localStorage.getItem(this.footerKey)) || []
        };
    }

    render() {
        const classes = this.props.classes;
        return (
            <MatchQuery items={this.state.menuItems} class={classes} />
        );
    }

    componentDidMount() {
        const url = `${process.env.REACT_APP_BASE_URL}/_vti_bin/webapi/Footer/GetListItems`;

        axios.get(url)
            .then(response => response.data)
            .then(json => {
                //console.log("FooterBottomMenu json result axios: ", json);

                let links = [];

                for (let i = 0; i < json.length; i++) {

                    let result = json[i].LinksInFooterColumns.map(anchor => {
                        let image = null;
                        if (anchor.Icon && anchor.Icon.ImageUrl !== "/_layouts/15/IMAGES/ichtm.gif")
                            image = anchor.Icon.ImageUrl;

                        return ({
                            id: anchor.Id,
                            img: image,
                            href: anchor.Link.NavigateUrl,
                            title: anchor.Link.Text,
                            alt: anchor.Icon && anchor.Icon.AlternateText,
                            target: anchor.Link.Target,
                        })
                    });

                    //console.log("FooterBottomMenu json mapped: ", result);
                    links.push({ id: `panel${json[i].Id}`, header: json[i].ColumnTitle, body: result })
                }

                localStorage.setItem(this.footerKey, JSON.stringify(links));
                //console.log("FooterBottomMenu json mapped: ", links);
                this.setState({ menuItems: links });
            });
    }

    // collumnLinkMapper(val) {
    //     let retValue = {};

    //     // anchor => ({ 
    //     //     img: anchor.Icon.ImageUrl, 
    //     //     href: anchor.Link.NavigateUrl,
    //     //     title: anchor.Link.Text,
    //     //     alt: anchor.Icon.AlternateText,
    //     //     target: anchor.Link.Target,
    //     // })

    //     if (val.Link !== null) {
    //         retValue =  
    //         { 
    //             'img': val.Icon.ImageUrl, 
    //             'href': val.Link.NavigateUrl,
    //             'title': val.Link.Text,
    //             'alt': val.Icon.AlternateText,
    //             'target': val.Link.Target,
    //         };
    //     }
    //     else {
    //         retValue =  
    //         { 
    //             'img': null, 
    //             'href': val.Link.NavigateUrl,
    //             'title': val.Link.Text,
    //             'alt': null,
    //             'target': val.Link.Target,
    //         };
    //     }

    //     return retValue;
    // }
}

function MatchQuery(props) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up(process.env.REACT_APP_WIDTH));
    if (matches) {
        return (

            <div className={props.class.root} data-hrl-bo="atm-linksFooter" role="navigation" aria-label="תפריט תחתון">
                {props.items.map((item, index) => (
                    <div key={item.id || index} className={props.class.footerDiv} data-hrl-bo={item.header}>

                       <div role="heading" aria-level="5">{item.header}</div>
                        <hr></hr>
                        <LinksList links={item.body} />
                    </div>

                ))}
                <div className={props.class.ballonBox}>
                    <OrangeAirBalloonIcon className={props.class.blueBallon} />
                    <CloudIcon className={props.class.cloud} />
                </div>
            </div>
        );
    }
    else {
        let res = props.items.map(i => {
            return { ...i, body: <LinksList links={i.body} /> };
        });
        return (
            <div className={props.class.root}>
                <ExpansionPanel panels={res} expandIcon={<YellowArrowIcon />} />
            </div>
        );
    }
}
export default useStyles(FooterBottomMenu);
