import { createStyles, makeStyles } from 'common-ui';

const PersonalMenuStyles = makeStyles(theme => createStyles({
    root: {

        [theme.breakpoints.up('md')]: {

        },
    },
    personalBox: {
        width: '355px',
        //margin: '0 auto',
        overflow: 'hidden',
        borderBottomRightRadius: '30px',
        borderBottomLeftRadius: '30px',
        position: 'absolute',
        //backgroundImage: `url(${blueSquare})`,
        backgroundRepeat: 'no-repeat',
        //height: '600px',
        padding: '20px 10px 35px 10px',
        top: '0px',
        left: '50%',
        transform: 'translateX(-50%)',
       zIndex:'20000',
        // zIndex: theme.zIndex.drawer,
        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            width: '300px',
        },
    },
    background2: {
        backgroundImage: 'linear-gradient(to bottom, #052f58, #2e73c5 10%, #2d79d2)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        minHeight: '560px',
        height: '100%',
        width: '355px',
        '& > svg': {
            position: 'absolute',
            mixBlendMode: 'multiply',
        },
        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            backgroundImage: 'linear-gradient(to bottom, #2e73c5, #2d79d2)',
        },
    },
    personalMenu2: {
        position: 'relative',
        '& button,& button:not(:last-child)': {
            color: 'white',
            margin: 0,
            //padding: 0,
            minWidth: '10px',
            
            '& svg': {
                width: '18px',
                height: '18px',
            }
        },
    },
    logoSpace: {
        position: 'absolute',
        top: '0px',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    homePage: {
        textAlign: 'center',
        color: 'white',
        fontSize: '1.9375rem',
        fontWeight: '300',
        '& button': {
            backgroundColor: '#f7b207',
            borderRadius: '19.5px',
            padding: '12px 48px',
            '& span': {
                color: '#003e7a',
                fontSize: '0.9375rem',
                [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                },
            },
            '&:hover': {
                backgroundColor: '#FED264',
            },
        },
        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            fontSize: '1.5625rem',
        },
    },
    menuArrowBtn:{
      backgroundColor:'transparent', 
      border:'none',   
      
      '&:hover': {
        backgroundColor:'rgb(10, 120, 200)', 
      },
      '&:active': {
        backgroundColor:'rgb(10, 120, 200)', 
      },
    },
    innerPage: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    menuArrow: {
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        height: '22px',
        width: '100%',
        textAlign: 'center',
        '& svg': {
            cursor:'pointer',
            width: '82px',
            height: '22px',
            cursor: 'pointer',
        },
    },
    openNotConnected: {
        color: 'white',
        textAlign: 'center',
        '& ul': {
            display: 'flex',
            padding: 0,
            '& li': {
                listStyleType: 'none',
                fontSize: '0.8125rem',
                fontWeight: '500',
                padding: '0 15px',
                //flex: '1 0 auto',
                '& svg': {
                    width: '15px',
                },
                [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
                    padding: '0 10px',
                },
            },
        },
        '& > div': {
            fontSize: '1.9375rem',
            fontWeight: '300',
            [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
                fontSize: '1.5625rem',
            },
        },
        '& > div + div': {
            fontSize: '0.9375rem',
            fontWeight: 'bold',
            marginTop: '20px',
            '& svg': {
                width: '34px',
            }
        }
    },
    backgroundLogo: {
        width: '87px',
        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            margin: '15px',
        },
    },
    greeting: {
        color: 'white',
        textAlign: 'center',
        fontSize: '1.9375rem',
        fontWeight: '300',
        lineHeight: '1.03',
        '& > div': {
            fontWeight: 'normal',
        },
        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            fontSize: '1.5625rem',
        },
    },
    connected: {
        textAlign: 'center',
        '& button': {
            backgroundColor: '#f7b207',
            borderRadius: '19.5px',
            padding: '12px 72px',
            fontWeight: 'bold',
            '& span': {
                color: '#003e7a',
                fontSize: '0.9375rem',
                [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
                    fontSize: '1.125rem',
                },
            },
            '&:hover': {
                backgroundColor: '#FED264',
            },
        },
    },
    getOut: {
        textAlign: 'left',
        margin: '0 12px',
        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            margin: '0px',
        },
        '& a': {
            fontSize: '1.4rem',
            color: 'white',
            '&,&:hover,&:active,&:focus': {
                textDecoration: 'none',
            },
            '& > svg': {
                verticalAlign: 'middle',
                height: '26px',
                width: '26px',
                marginLeft: '5px',
            },
        },
    },
  
    link:{
        color: 'white !important',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        textDecoration:'underline',
        "&:hover": {
             backgroundColor: 'transparent !important'
          },
    },
    personalBtn:{
        backgroundColor: 'transparent !important'
    }
}));

export default PersonalMenuStyles;