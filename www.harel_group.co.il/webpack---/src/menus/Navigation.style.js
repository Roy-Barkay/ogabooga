import { withStyles } from '@material-ui/styles';
//import blueSquare from './blue-square.svg';

const NavigationStyles = withStyles(theme => ({
    root: {
        backgroundColor: '#c9e2ff',
        minHeight: '100px',
        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            minHeight: '140px',
        },
    },
    rootHome: {
        backgroundColor: '#c9e2ff',
        minHeight: '200px',
        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            minHeight: '140px',
        },
    },

    personalBoxDesktop: {
        flex: '0 0 300px',
        position: 'relative',
    },
    base: {
        position: 'relative',
        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            maxWidth: '1250px',
            margin: '0 auto',
        },
        '& > div > a': {
            padding: 0,
        },
    },
    menuLine: {
        display: 'flex',
        '& a': {
            flex: '1 0 auto',
            padding: '11px',
            textAlign: 'center',
            [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
                padding: '17px 20px',
                flex: '0 0 auto',
            },
        },
        '& > button svg': {
            width: '18px',
            height: '18px',
        }
    },
    background: {
        //position: 'absolute',
        mixBlendMode: 'multiply',
        width: '1920px',
        height: '70px',

    },
    divSearch:{
        width:'72px'
    },
    backgroundLogo: {
        width: '87px',
        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            margin: '12px',
            height:'1.2em'
        },
    },
    backgroundBox: {
        overflow: 'hidden',
        position: 'absolute',
        width: '100%',
        backgroundColor: '#f4f6fc',
        '& svg': {
            display: 'block',
        }
    },
    //old down
    personalButton: {
        flex: '0 0 auto',
        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            textAlign: 'right',
            flex: '0 1 258px',
            boxSizing: 'border-box',
            maxWidth: '258px',
        },
    },
    personalMenu: {
        position: 'absolute',
        zIndex: theme.zIndex.drawer,
        width: '100%',
        backgroundColor: '#fff6dd',
        '& > span': {
            color: '#002447',
            fontSize: '1.125rem',
            margin: '15px 14px',
            display: 'inline-block',
        },
        '& hr': {
            width: '184px',
            border: 0,
            marginRight: '14px',
            borderTop: 'solid 1px #dcd9d1',

        },
        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            maxWidth: '258px',
            left: 0,
            padding: '26px',
        },
    },
    modalTitle: {
        '& h2': {
            fontSize: '1.4rem',
        },
    },
    modalContent: {
        textAlign: 'center',
    },
    ob: {
        position: 'absolute',
        width: '65px',
        height: '82px',
        top: '359px',
        left: '14vw',
        zIndex: '1',
    },
    bb: {
        position: 'absolute',
        width: '29px',
        height: '37px',
        top: '412px',
        right: '14vw',
        zIndex: '1',
    },
    c: {
        position: 'absolute',
        width: '39px',
        height: '18px',
        top: '369px',
        left: '13vw',
        zIndex: '1',
    },
}));

export default NavigationStyles;