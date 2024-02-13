import { withStyles } from '@material-ui/styles';

const FooterStyles = withStyles(theme => ({
  root: {
    color: '#ffffff',
    position: 'relative',
    backgroundColor: '#2D72C6',
    overflow: 'hidden',
    [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {

    },
  },
  background: {
    position: 'absolute',
    mixBlendMode: 'multiply',
    width: '100%',
    height: 'auto',
    
  }, 
  backgroundTop:{   
      display:'block',
      width: '100%',
      height: 'auto',
  },
  top: {
    backgroundColor: '#f3f3f3',
    minHeight: '120px',
    //borderRadius: '0 0 0 30px',
    borderBottomLeftRadius: '30px',
    border: '1px solid #f3f3f3',
    position: 'relative',
    [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
      minHeight:'unset',
      overflow:'hidden',
    },
  },
  disclaimer: {
    padding: '15px 10px 25px 10px',
    fontSize: '0.8125rem',
    fontWeight: 300,
    lineHeight: 1.31,
    [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
      maxWidth:'1350px',
      margin:'0 auto',
      
    },
  },
  orangeBalloon: {
    width: '30px',
    height: '39px',
    position: 'relative',
    right: '20px',
    transform: 'rotate(-10deg)',
    animation: '$orangeBallonAnim 1000s linear infinite',
    animationDelay: '-110s',
  },
  blueBallon: {
    width: '29px',
    height: '38px',
    transform: 'rotate(8deg)',
    margin: '0 20px',
  },
  animationBox: {
    minHeight: '45px',
  },
  cloud: {
    position: 'absolute',
    animation: '$animateCloud 1000s linear infinite',
    animationDelay: '-900s',
  },
  cloud1: {
    height: '10px',
    width: '23px',
    position: 'absolute',
    right: '37px',
    top: '15px',
  },
  cloud2: {
    height: '17px',
    width: '39px',
    position: 'absolute',
    left: '34px',
    top: '0px',
  },
  '@keyframes animateCloud': {
    '0%': {
      left: '100%',
    },
    '100%': {
      left: '-28px',
    },
  },
  '@keyframes orangeBallonAnim': {
    '0%': {
      right: '100%',
    },
    '100%': {
      right: '-30px',
    },
  },
}));

export default FooterStyles;