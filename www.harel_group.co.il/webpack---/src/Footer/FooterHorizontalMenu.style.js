import { withStyles, createStyles } from '@material-ui/styles';

const FooterHorizontalMenuStyles = withStyles(theme => createStyles({
  root: {
    position: 'relative',    
    
    '& ul': {
      padding: '0 10px',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: '30px',
      [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
        maxWidth:'1400px',
        margin:'0 auto',
        padding:'18px',
        height:'76px',
      },
     
      '& li': {
        listStyle: 'none',
        flex: '0 0 50%',
        padding: '9px 0',
        
        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
          flex:'1 0 50px',
          margin:'0 20px',
          whiteSpace:'nowrap',
          padding: '0 0',
        },
        '& svg':{
          width: '8px',
          height: '12px',
          marginLeft: '20px',
          verticalAlign: 'middle',
          [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            marginLeft: '10px',
          },
        },
        '& a': {
          textDecoration: 'none',
          fontSize: '0.875rem',
          '&,&:hover,&:active,&:focus': {
            color: '#ffffff',
          },
          [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
            fontSize: '18px',
            fontWeight: '500',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: '2.22',
            letterSpacing: 'normal',
            textAlign: 'right',
            color: '#ffffff',
          },
        },
      },
    },
    [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
      backgroundColor:'rgba(21, 45, 102, 0.102463942)',
    },
  },
}));

export default FooterHorizontalMenuStyles;