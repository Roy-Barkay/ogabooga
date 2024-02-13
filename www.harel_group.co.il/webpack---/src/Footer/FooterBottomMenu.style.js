import { withStyles, createStyles } from '@material-ui/styles';

const FooterBottomMenuStyles = withStyles(theme => createStyles({
 
  root: {
    padding: '10px',
    [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
      padding: '20px',        
     },
    '& div': {
      color: '#ffffff',
      fontSize: '0.8125rem',
      fontWeight: 'bold',
      lineHeight: '1.69',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      //minWidth:'80px',
      paddingTop: 0,
      [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
        fontSize:'1.125rem'
      },
      '&::before': {
        backgroundColor: 'transparent',
      },      
      '&.Mui-expanded': {
        margin: 0,       
      },
      
    },
    '& > div': {
      borderBottom: 'solid 1px rgba(255, 255, 255, 0.3)',
      [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
        borderBottom:'none',
        marginTop:'40px',
      },
     
    },

   
   /*  '& svg': {
      transform: 'rotate(270deg)',
      width: '16px',
      height: '10px',
      position: 'relative',
      top: '9px',
    }, */
    '& ul': {
      margin: 0,
      padding: 0,
      '& li': {
        listStyle: 'none',
        marginBottom: '10px',
        '& a': {
          textDecoration: 'none',
          '&,&:hover,&:active,&:focus': {
            color: '#ffffff',
            fontWeight: 300,
            lineHeight: 1.69,
          },
        },
      },
      [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
        whiteSpace:'nowrap', 
      },
    },
    [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
     display:'flex',     
     margin:'0 auto',
     maxWidth:'1400px',
     position:'relative',
     flexWrap:'wrap', 
    },
    '& hr':{
      border:'solid 1px rgba(255, 255, 255, 0.3)',
    },    
  },
  blueBallon: {
    width: '57px',
    height: '72px',    
    margin: '0 20px',
  },
cloud: {
    height: '15px',
    width: '34px',
    position: 'relative',
    right: '55px',
    top: '-50px',
  },
  ballonBox:{    
    flex:'1 0 0px',
    marginRight:'-30px',
    marginLeft:'30px',
  },
  footerDiv:{    
    margin:'0 30px',
    flex:'1 0 148px',
  }
}));

export default FooterBottomMenuStyles;