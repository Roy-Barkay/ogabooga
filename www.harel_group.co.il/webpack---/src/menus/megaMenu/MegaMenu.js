import React from 'react';
import axios from 'axios';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import WorldMenu from './WorldMenu';
import MegaMenuExpansion from './MegaMenuExpansion';


import useStyles from './MegaMenu.style';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Slide } from '@material-ui/core';

class MegaMenu extends React.Component {
    worldsKey = "Harel_MegaMenuWorlds";
    subAreasKey = "Harel_MegaMenuSubAreas";

    constructor(props) {
        super(props);

        this.state = {
            worlds: JSON.parse(localStorage.getItem(this.worldsKey)) || [],
            subAreas: JSON.parse(localStorage.getItem(this.subAreasKey)) || [],
            selectedWorld: null,
            worldsOpen: false,
            isClick: false,
        }

        this.worldClick = this.worldClick.bind(this);
        this.closeWorld = this.closeWorld.bind(this);
        this.burgerClick = this.burgerClick.bind(this);
    }
    componentDidMount() {
        const url = `${process.env.REACT_APP_BASE_URL}/_vti_bin/webapi/GeneralAccessor?id=MegaWorlds&cacheKey=MegaWorlds`;

        axios.get(url)
            .then(res => {
                let worlds = res.data || [];
                localStorage.setItem(this.worldsKey, JSON.stringify(worlds));
                this.setState({ worlds: worlds });
            })
            .catch(error => console.log(error));

        const url2 = `${process.env.REACT_APP_BASE_URL}/_vti_bin/webapi/GeneralAccessor?id=SubAreas&cacheKey=SubAreas`;

        axios.get(url2)
            .then(res => {
                let areas = res.data || [];
                localStorage.setItem(this.subAreasKey, JSON.stringify(areas));
                this.setState({ subAreas: areas });
            })
            .catch(error => console.log(error));

        let isDesktop = window.innerWidth >= process.env.REACT_APP_WIDTH;


        if (!isDesktop) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.left = '0px';
            document.body.style.right = '0px';

        }
    }
    componentWillUnmount() {
        //if (this.isDesktop) {
        document.body.style.overflow = 'unset';
        document.body.style.position = 'static';
        //}
    }
    worldClick(world, e) {      
            e.preventDefault();
            this.setState({ selectedWorld: world.ID });
            if (!world.areas && this.state.subAreas.length) {
                world.areas = this.state.subAreas.filter(area => area.Harel_MainArea.startsWith(`${world.ID};#`));
            }    
    }
    CloseWorldByTab()
    {
        this.setState({ selectedWorld: null });
    }
    closeWorld() {
       
         if (this.isClick != true)
            this.setState({ selectedWorld: null });

    }
    burgerClick() {
        document.body.style.overflow = !this.state.worldsOpen ? 'hidden' : 'unset';
        document.body.style.position = !this.state.worldsOpen ? 'fixed' : 'static';
        this.setState({ worldsOpen: !this.state.worldsOpen });
    }
    render() {
        const classes = this.props.classes;
        let isDesktop = window.innerWidth >= process.env.REACT_APP_WIDTH;

        let products = null;
        if (isDesktop && this.props.topics) {
            let personal = { "ID": 0, "Title": "המוצרים שלי", "Harel_LinkContent": { "IconUrl": "", "UseDefaultIcon": false, "NavigateUrl": '/personal-info/my-harel/Pages/client-view.aspx', "Target": "", "Text": 'לכל המוצרים שלי', "ToolTip": 'לכל המוצרים שלי' }, "SVGIcon": "icon-House" };
            let productLinks = this.props.topics.map(t => {
                return {
                    ID: t.TopicId,
                    Harel_Link: {
                        NavigateUrl: t.Link.NavigateUrl,
                        ToolTip: t.Link.ToolTip
                    },
                    Title: t.Title,
                };
            });
            products = <WorldMenu key={personal.ID} className={classes.world} world={personal} CloseWorldByTab={()=> this.CloseWorldByTab()} closeWorld={() => this.closeWorld()} worldClick={(e) =>{this.isClick = true;  this.worldClick(personal, e)}} worldMouseEnter={(e) => { this.isClick = false; this.worldClick(personal, e) }}  onClickAway={this.closeWorld} areas={personal.ID === this.state.selectedWorld ? productLinks : null} aria-expanded={personal.ID === this.state.selectedWorld ? 'true' : 'false'} />;
        }

        let worlds = this.state.worlds.map(w => <WorldMenu key={w.ID} className={classes.world} world={w} CloseWorldByTab={()=> this.CloseWorldByTab()} closeWorld={() => this.closeWorld()} worldClick={(e) => { this.isClick = true; this.worldClick(w, e) }} worldMouseEnter={(e) => { this.isClick = false; this.worldClick(w, e) }} onClickAway={this.closeWorld} areas={w.ID === this.state.selectedWorld ? w.areas : null} aria-expanded={w.ID === this.state.selectedWorld ? 'true' : 'false'} />)
        if (products)
            worlds = [products, ...worlds];
        return (
            <div className={classes.root} data-hrl-bo="atm-megaMenu" role="navigation" aria-label="תפריט ראשי">
                {!isDesktop ?

                    <MegaMenuExpansion onClick={this.props.closeMenu} worlds={this.state.worlds} subAreas={this.state.subAreas} topics={this.props.topics}></MegaMenuExpansion>

                    : (<ClickAwayListener onClickAway={() => this.setState({ worldsOpen: false, selectedWorld: null })}>
                        <div className={classes.worldsWraper} data-hrl-bo="atm-megaMenuWorlds">{worlds}</div>
                    </ClickAwayListener>)
                }
            </div>
        );
    }
}

export default withWidth()(useStyles(MegaMenu));