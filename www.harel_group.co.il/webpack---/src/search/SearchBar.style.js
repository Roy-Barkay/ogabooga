import { withStyles, createStyles } from '@material-ui/core/styles';

const SearchBoxStyles = withStyles(theme => createStyles({
    root: {
        color: '#013664',
        backgroundColor: '#ffffff',
        borderRadius: '50px',
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            width:'619px',
            display:'block',
            margin:'0 auto'            
        },
    },
    button: {
        backgroundColor: '#2d9d3a',
        minWidth: '52px',
        height: '52px',
        padding: 0,
        margin: '9px',
        borderRadius: '5rem',
        position: 'absolute',
        top: '1px',
        zIndex: '10000',
        left: '5px',
        '&:hover': {
            backgroundColor: '#5EB773',
        },
        '& span': {
            color: '#ffffff',
        },
        '& svg': {
            width: '16px',
            height: '16px',
        },
    },
    control: {
       // zIndex: 'inherit !important',
        display: 'flex',
        border: 'solid 1.2px #94b7df',
        boxShadow: '0 0 18px 0 rgba(0, 62, 137, 0.2)',
        borderRadius: '50px',
        position: 'relative', 
        height  :'72px',     
    },
    controlPop: {
        zIndex: theme.zIndex.drawer + 10,
    },
    textArea: {
        position: 'relative',        
        [theme.breakpoints.up('380')]: {
            flex: '1 0 auto',
        },
    },
    textField: {
        margin: 0,
        height: '100%',
        width: "100%",
        fontSize: "20px",
        outline: "none",
        border: "none",
        fontWeight: "100",
        borderRadius: "40px",
        paddingRight: "23px",
        '& input': {
            fontSize: '20px',
            fontWeight: 'lighter',
            color: '#013664',
            padding: '0 24px 0 5px',
            [theme.breakpoints.up('md')]: {

            },
            '&::placeholder':{
                opacity:'1 !important',
                color:'#28282b !important'
            }
        },
        '&::-webkit-input-placeholder, &::placeholder': {
            color: "#2b2b2b"
        },
        '& fieldset': {
            border: '0 !important',
        },
        '& div': {
            height: '100%',

        }
    },
    fieldset :{
        border: '0 !important',
      },
    typing: {
        zIndex: 1,
        fontSize: '20px',
        position: 'absolute',
        margin: '0 24px 0 5px',
        maxWidth: 'calc(100% - 29px)',
        transform: 'translate(0,-48%)',
        top: '50%',
        '& > div': {
            verticalAlign: 'bottom',
        },
        [theme.breakpoints.up('md')]: {

        },
    },
    srOnlyText :{
         position: 'absolute',
        // width: '1px',
        // height: '1px',
        // clip: 'rect(0 0 0 0)',
        // overflow: 'hidden'
           visibility:'hidden',
           width:"35px",
    },
    
    suggestions: {
       // zIndex:'-1',
        position: 'absolute',
        color: '#013664',
        fontSize: '0.875rem',
        backgroundColor: '#ffffff',
        borderRadius: '35px',
        boxShadow: '0 0 18px 0 rgba(0, 62, 137, 0.2)',
        width: '100%',
        zIndex: theme.zIndex.drawer,
        top: 0,
        border: 'solid 1.2px #94b7df',
        overflow: 'hidden',
        padding: '60px 0 10px 0',
        '& ul': {
            padding: 0,
            margin: 0,
            '& li': {
                listStyle: 'none',
                
                [theme.breakpoints.up('lg')]: {
                    height: '28px',
                },

                '& a': {
                    padding: '6px 24px',
                    color: '#013664',
                    display: 'block',
                    textDecoration: 'none',
                    fontWeight: 300,
                    '& span.HitWord': {
                        fontWeight: 500,
                    },
                    '&:hover,&:active,&:focus,&.keyboardSelect': {
                        color: '#00487e',
                        paddingRight: '18px',
                        borderRight: '6px solid #00538b',
                    },

                    
                
                    [theme.breakpoints.up('lg')]: {
                        height: '28px',
                        fontSize: '18px',
                    },
                },
            },
        },
        '& hr': {
            marginRight: '24px',
            width: '32px',
            border: 0,
            borderTop: 'solid 1px #8aa1b2',
        },
        '& > span': {
            color: '#00538b',
            fontSize: '20px',
            padding: '10px 24px',
            fontWeight: 'bold',
        },

        [theme.breakpoints.up('lg')]: {
            width:'619px',
            display:'block',
            margin:'0 auto' 
        },
    },
}));


export default SearchBoxStyles;