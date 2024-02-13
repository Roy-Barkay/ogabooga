import { withStyles } from '@material-ui/styles';

const MegaMenuStyles = withStyles(theme => ({
    root: {
        display: 'inline-block',
        position: 'relative',
        height: '70px',
        '& button': {
            fontSize: '1.3125rem',
            backgroundColor: 'transparent',
            color: '#013664',
            border: 0,
            padding: '10px',
            cursor: 'pointer',
            height: '100%',

            [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            fontSize: '17px',
            fontWeight: '500',
            fontStretch: 'normal',
            fontStyle: 'normal',            
            letterSpacing: 'normal',
            textAlign: 'right',
            color: '#052f58',
            '&:active,&:click,&.keyboardSelect': {
                border:'none'
              },
            },
            [theme.breakpoints.up('xl')]: {
                fontSize: '18px',
            },
            '&.open': {
               // backgroundColor: 'white',
               // color: '#003c7f',
                
                // backgroundColor: '#003c7f',
                // color: '#F3F1F1',
            }
        },
        '& > ul': {
            top:'68px',
            position: 'absolute',
            backgroundColor: 'white',
            border: 'solid 1px rgb(216, 223, 246)',
            boxShadow: '0 1px 50px 0 rgba(46, 91, 255, 0.1)',
            padding: '10px',
            zIndex: theme.zIndex.drawer+100,
            margin: 0,
            listStyle: 'none',
            [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
           
            width:'260px', 
            backgroundColor:'unset',     
            borderBottomLeftRadius:'30px',
            borderBottomRightRadius:'30px',
            backgroundImage:'linear-gradient(to top, #fcfafa 75%, #f3f5f5);',
            },
            '& a':{               
                textDecoration:'none',
            },
            '& li': {
                listStyle: 'none',
                whiteSpace: 'nowrap',
                padding: '10px',
                
                '& a':{
                    [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
                       
                width: '110px',
                height: '529px',               
                fontSize: '17px',
                fontWeight: '300',
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: 'normal',
                letterSpacing: 'normal',
                textAlign: 'right',
                color: '#01467b',
                textDecoration:'none',
                },
                '&:hover,&:active,&:focus,&.keyboardSelect': {
                    color: '#00487e',
                    paddingRight: '14px',
                    borderRight: '6px solid #00538b',
                    fontWeight: 'bold',
                },
            },
             
            }
        },
              
    },
    areaDiv:{
        display:'none',
    },
   extendSpan:{
    fontSize: '16px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#286cbe',    
   },
    downIcon:{
        width:'8px',
        height:'8px',
    },
    downIconBox:{
        paddingLeft:'9px',
        paddingRight:'9px',
        display:'inline',
        [theme.breakpoints.up('xl')]: {
            paddingLeft:'10px',
            paddingRight:'10px',
        },  
    },
    lineCopy: {
        display:'inline',
        width: '1px',
        height: '24px',
        border: 'solid 1px rgba(151, 151, 151, 0.26)',
      },
      down: {        
        height:'10px',
        width:'8px',          
      }  ,
      downBox: {
          display:'inline',
          paddingRight:'5px',
      },
      linkLi:{
          paddingRight:'7px',
          paddingTop:'10px',
      },
}));

export default MegaMenuStyles;