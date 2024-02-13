import React from 'react';
import useStyles from './MegaMenuButton.style';
import { MenuIcon } from '../MenuIcons';

class MegaMenuButton extends React.Component {
    render() {
        const classes = this.props.classes;

        return (
            <button type="button" aria-label="תפריט" className={classes.root} onClick={this.props.onClick} aria-haspopup="menu"><MenuIcon /></button>
        );
    }
}

export default useStyles(MegaMenuButton);