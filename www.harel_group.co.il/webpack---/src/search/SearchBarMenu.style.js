import { withStyles } from '@material-ui/styles';

const SearchBarMenuStyle = withStyles(theme => ({
    root: {
        position: 'absolute',
        top: '0px',
        opacity: '0.95',
        backgroundImage: 'linear-gradient(to bottom, #c9e2ff 24%, #f3f3f3 87%)',
        backgroundColor: '#C9E2FF',
        zIndex: '20001',
        height: '100vh',
        left: '0px',
        right: '0px',
        [theme.breakpoints.up('lg')]: {
        },
        '& button': {
            borderRadius: '24px', 
        },
        '& > div': {
            padding: '30px',
            position: 'relative',
            '@media (min-width: 1300px)' : {
                padding:'10px',
            },
        },
        '& button > svg': {
            width: '15px',
            height: '15px',
            [theme.breakpoints.up('lg')]: {
                width: '36px',
                height: '36px',
            },
            '@media (min-width: 1300px)' : {
                width: '88px',
                height: '88px',
              }
        },
    },
    background: {
        width: '100%',
        height: '100vh',
        position: 'absolute',
    },
    titleMobile: {
        '& h2': {
            color: '#052f58',
            fontSize: '0.9375rem',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '12px 0',
            position: 'relative',
            [theme.breakpoints.up('lg')]: {
                color: '#013664',
                fontSize: '40px',           
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: '0.45',
                letterSpacing: 'norma',
                padding: '31px',
            },
        },

    },
    message: {
        display: 'flex',
        marginBottom: '22px',
    },
    spanMessage: {
        flex: '1 0 auto',
    },
    closeBtn: {
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        verticalAlign: 'middle',
    },

}));

export default SearchBarMenuStyle;