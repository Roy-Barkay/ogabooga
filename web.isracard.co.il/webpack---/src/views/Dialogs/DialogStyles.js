import { makeStyles } from '@mui/styles';
import IconCloseImage from '../../../../../../DigitalV2.SiteContainer.Backend/wwwroot/assets/images/close-icon.svg';


export const UseDialogStyles = makeStyles((theme) => ({
    paper: {
        maxWidth: '514px',
        width: '100%',
        borderRadius: 10,
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.16)',
        padding: '10px 10px',
        [theme.breakpoints.only('xs')]: {
            margin: theme.spacing(2),
        },
    },
    closeButton: {
        position: 'absolute',
        left: theme.spacing(1),
        top: theme.spacing(1)
    },
    closeButtonIcon: {
        display: 'block',
        width: 14,
        height: 14,
        backgroundImage: `url(/assets/images/close-icon.svg)`,
        
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'center center',
    },
    dialogContentWrapper: {
        textAlign: 'center',
        margin: '0 0 20px 0',
        border: 'none',
        color: theme.palette.info.dark
    },
    pageTitle: {
        whiteSpace: "pre-line",
        textAlign: "center",
        color: theme.palette.info.main,
        fontWeight: "600",
        paddingTop: theme.spacing(1.5),
        [theme.breakpoints.down('md')]: {
            padding: '0 10px',
            fontSize: "25px"
        }

    },
    srOnly: {
        position: 'relative',
        display: 'table-caption',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        borderWidth: 0,
        outline: 'none'
    }
}), { name: 'dialogStyles' });