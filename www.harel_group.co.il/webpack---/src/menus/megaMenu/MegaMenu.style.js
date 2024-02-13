import { withStyles } from '@material-ui/styles';

const MegaMenuStyles = withStyles(theme => ({
    root: {

        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            minWidth:'780px',
            whiteSpace:'nowrap',
        },
    },
    worldsWraper: {
        position: 'absolute',
        height: '100%',
        backgroundColor: '#F3F1F1', //003c7f
        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            position: 'static',
            margin:'0 auto',
            backgroundColor:'transparent',
        },
    },
}));

export default MegaMenuStyles;