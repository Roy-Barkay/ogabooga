import { withStyles } from '@material-ui/styles';

const MegaMenuExpansionStyles = withStyles(theme => ({

  root: {
    position: 'absolute',
    backgroundColor: 'rgba(5, 47, 88, 0.78)',
    //zIndex: theme.zIndex.modal,
    zIndex: '20000',
    minHeight: '100vh',
    width: '100%',
    '& > div > div > div > a': {
      textAlign: 'right',
      textDecoration: 'none',
      padding: '8px',
    },
    ' & .MuiExpansionPanelDetails-root':
    {
      padding: '0',
    },
    '& .MuiExpansionPanelSummary-content': {
      padding: '0',
    },
    '& > div > div > div > div > div .Mui-expanded': {
      margin: '12px 0',
    },
    '& .Mui-expanded': {
      marginTop: '0',
      marginBottom: '0',
    },
    ' & .MuiPaper-root': {
      borderBottom: 'solid 1px #c3c9d7',
    },
    '& polyline': {
      stroke: '#052f58',
    },
    
    '& span': {
      '& svg':
      {
        width: '8px',
        transform: 'rotate(-90deg)',
      },
    },
    '& svg':
    {
      width: '30px',
      height: '30px',
    },
    '& > div': {
      borderBottom: 'solid 1px rgba(255, 255, 255, 0.3)',
      backgroundImage: 'linear-gradient(to top, #D5DFF2 0%, #f3f3f3 100%)',
      borderBottomLeftRadius: '30px',
      minHeight: '100vh',
      width: '300px',
    },
    '& button > svg': {
      width: '20px',
      height: '20px',
      filter:'invert(75%)',
    },
    '& > div > svg': {
      width: '375px',
      height: '667px',
    },
    '& > div > div > div': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      '& > svg':{
        width:'36px',
        height:'36px',
      },
    },
    '& > div > div > div > div': {
      backgroundColor: 'transparent',
      padding: 0,
      

    },
    '& ul': {
      margin: '0',
      paddingRight: '40px',
    },
    '& li:last-child': {
      '& a': {
        fontSize: '17px',
        fontWeight: 'bold',
        lineHeight: 'normal',
        color: '#286cbe',
      }
    },
    '& > div > a > svg':{

      width:'36px',
      height:'36px',
    },
    '& a': {
      fontStretch: 'normal',
      fontStyle: 'normal',
      letterSpacing: 'normal',
      textAlign: 'right',
    },
    '& li': {
      listStyle: 'none',
      paddingBottom: '20px',
      '& a': {
        '&:active,&:focus,&.keyboardSelect': {            
          fontWeight: 'bold',
      },
        textDecoration: 'none',
        fontSize: '17px',
        fontWeight: '300',
        lineHeight: 'normal',
        color: '#052f58',
        '& svg': {
          width: '8px',
          height: '10px',
        }
      },
    },

  },
 
  background: {
    position: 'absolute',
    mixBlendMode: 'multiply',
    width: '100%',
    height: '100%',

  },
  content: {
    zIndex: '10',
    overflow: 'auto',
    maxHeight: '100vh',
    position: 'relative',
    padding: '15px',
    paddingBottom: '71px',
  },
  closeBtn: {
    padding: 0,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    verticalAlign: 'middle',
  },
  backgroundBox: {
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
  },
  divLi: {
    display: 'flex',
    alignItems: 'center',
  },
  spanItems: {
    fontSize: '17px',
    width: '192px',
    marginRight: '13px',
    marginLeft: '13px',
    paddingTop: '5px'
  },
  panel: {
    width: '252px',
  },
  line: {
    width: '252px',
    height: '1px',
    border: 'solid 1px #c3c9d7',
  },
  items: {
    paddingBottom: '15px',
    display: 'flex',
    borderBottom: 'solid 1px #c3c9d7',
    '& a': {
      fontSize: '17px',
      fontWeight: '500',
      lineHeight: '1.24',
      color: '#052f58',
    },
  },


  message: {
    paddingTop: '27px',
    paddingBottom: '72px',
    fontSize: '19px',
    fontWeight: 'bold',
    lineHeight: '1.21',
    textAlign: 'right',
    color: '#00477e',
    display: 'flex',

  },
  spanMessage: {
    flex: '1 0 auto',
  },
}));

export default MegaMenuExpansionStyles;
