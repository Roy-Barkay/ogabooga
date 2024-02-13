//import { makeStyles } from '@material-ui/core/styles';

const PersonalActionsStyles = theme => ({
    root: {
        fontSize: '0.875rem',
        margin: '20px 0px',
        [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
        },
        '& ul': {
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexFlow: 'wrap',
            '& li': {
                flex: '0 0 49%',
                '&:nth-child(even)': {
                    borderRight: 'solid 1px rgba(255, 255, 255, 0.31)',
                },
                '& a': {
                    color: 'white',
                    verticalAlign: 'middle',
                    textDecoration: 'none',
                    [theme.breakpoints.up(process.env.REACT_APP_WIDTH)]: {
                        padding: '17px 10px',
                    },
                    '&,&:hover,&:active,&:focus': {

                        textDecoration: 'none',
                    },
                    '& > svg': {
                        verticalAlign: 'middle',
                        height: '20px',
                        width: '20px',
                        marginLeft: '5px',
                    },
                },
            },
        },
    },
});

export default PersonalActionsStyles;