import { withStyles, createStyles } from '@material-ui/styles';

const PersonalLinksStyles = withStyles(theme => createStyles({
    root: {
        margin: '20px 0px 10px 0',
        color: 'white',
        fontWeight: 'bolc',
        fontSize: '0.9375rem',
        
        '& ul': {
            listStyle: 'none',
            padding: 0,
            margin: '8px 0 0 0',
            '& li': {
                display: 'inline-block',
                padding: '8px',
                verticalAlign: 'top',
                [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
                    padding: '4px',
                },
                '& a': {
                    color: 'white',
                    display: 'inline-block',
                    height: '90px',
                    width: '84px',
                    position: 'relative',
                    padding: '41px 10px 16px 10px',
                    fontSize: '0.9rem',
                    textAlign: 'center',
                    '&,&:hover,&:active,&:focus': {
                        textDecoration: 'none',
                    },
                    '& > svg': {
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: '90px',
                        width: '84px',
                    },
                },
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
    }

    
}));

export default PersonalLinksStyles;