import React, { Component } from 'react';
import useStyles from './FooterHorizontalMenu.style';
import LinksList from '../LinksList/LinksList';
import axios from 'axios';
import { YellowArrowIcon } from '../common/Icons/MiscIcons';

class FooterHorizontalMenu extends Component {
  footerKey = "Harel_FooterHorizontalMenu";

  constructor(props) {
    super(props);
    this.state = {
      menuItems: JSON.parse(localStorage.getItem(this.footerKey)) || []
    };
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root} data-hrl-bo="atm-footerHorizontalMenu">
        <LinksList bullet={<YellowArrowIcon />} links={this.state.menuItems} />
      </div>
    );
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_BASE_URL}/_vti_bin/webapi/Footer/GetHorizontalFooterMenuLinks`;

    axios.get(url)
      .then(response => response.data)
      .then(json => {
        //console.log("FooterHorizontalMenu json result axios: ", json);

        var result = json.filter(anchor => anchor.ShouldDisplay).map(anchor => ({
          id: anchor.Id,
          //          img: anchor.Link.IconUrl, 
          img: null,
          href: anchor.Link.NavigateUrl,
          title: anchor.Link.Text,
          alt: anchor.Link.ToolTip,
          target: anchor.Link.Target,
          icon: null,
        }));

        localStorage.setItem(this.footerKey, JSON.stringify(result));
        //console.log("FooterHorizontalMenu json mapped: ", result);
        this.setState({ menuItems: result });
      });
  }
}

export default useStyles(FooterHorizontalMenu);
