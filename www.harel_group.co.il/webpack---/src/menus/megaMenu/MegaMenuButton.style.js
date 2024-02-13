import { withStyles } from '@material-ui/styles';

const MegaMenuButtonStyles = withStyles(theme => ({
    root: {
        display: 'inline-block',
        border: '0 none',
        backgroundColor: 'transparent',
        padding: '10px',
        cursor: 'pointer',
        '& > svg': {
            width: '19px',
            height: '17px',
        },
        '&:hover,&:focus': {
            //backgroundColor: '#013469',
        },
    },
}));

export default MegaMenuButtonStyles;

