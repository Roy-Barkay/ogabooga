
import React, { forwardRef, useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import V2Checkbox from '../../components/V2Checkbox';
import { storeContext } from '../../store/store';
import { openErrorModal } from '../../utils/helpers';
import { UseDialogStyles } from './DialogStyles';
import { makeStyles } from '@mui/styles';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography,
    IconButton,
    Grid,
    Link,
    Box,
    FormControlLabel
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    submit: {
        maxWidth: '288px',
        width: '100%'
    }
}));


const OnlineBankingDialog = (props) => {
    const [open, setOpen] = React.useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const classes = useStyles();
    const dialogStyles = UseDialogStyles();
    const store = useContext(storeContext);
    addEventListener('reopenOnlineBankingModal', function () { setOpen(true) });

    useEffect(() => {
        if (localStorage.getItem('displayOnlineBankingModal') == "true" && localStorage.getItem('closeModalTemp') == "true") {
            setOpen(true)
        }


    });




    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCheck = () => {
        setIsChecked(!isChecked);

    };


    const handleXClose = (e, reason) => {
        if (reason && (reason == "backdropClick" || reason == "escapeKeyDown"))
            return;


        localStorage.setItem('closeModalTemp', false);
        setOpen(false)


    };

    const handleBtnClose = async () => {
        const response = await AjaxHelper.postData('/RegisterOnlineBanking').catch((e) => { dispatchEvent(new Event('serverErrorEvent')); });

        //Register to this event for get notify on success  response
        //Example for implmantion in your ministie: document.addEventListener("OnlineBankingResults", (function handleRegister));
        try {
            const registerOnlineEvent = new CustomEvent("OnlineBankingResults", { detail: response });
            document.dispatchEvent(registerOnlineEvent);
        } catch (error) {
            console.log("RegisterOnlineBanking Event Handler Error", error);
        }

        if (response && response.data && response.data.internetCommCode == "2") {
            localStorage.setItem('closeModalTemp', false);
            localStorage.setItem('displayOnlineBankingModal', false);
            setOpen(false)

        } else {
            localStorage.setItem('closeModalTemp', false);
            setOpen(false)
            openErrorModal();

        }




    };




    return (
        <>
            <Dialog classes={{ paper: dialogStyles.paper }}
                onClose={handleXClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                role="dialog">
                <DialogTitle id="customized-dialog-title" onClose={handleXClose} >
                    <IconButton aria-label="סגור" className={dialogStyles.closeButton} onClick={handleXClose}>
                        <span className={dialogStyles.closeButtonIcon} />
                    </IconButton>
                </DialogTitle>
                <DialogContent className={dialogStyles.dialogContentWrapper} dividers>
                    <span className={dialogStyles.iconContentModal} />
                    <img alt="" className={dialogStyles.iconContentModal} src={`${window.currentApplication.contentAssetsDomain}/${window.commonData.onlineBanking.onlineBankingImg}`} />
                    <Typography color="info" className={dialogStyles.pageTitle} component="h2" variant="h1" gutterBottom>
                        {window.commonData.onlineBanking.attentionAlertText1}
                    </Typography>
                    <Typography component="p" gutterBottom>
                        {window.commonData.onlineBanking.attentionAlertText2}
                    </Typography>
                    <Typography component="p" gutterBottom>
                        {window.commonData.onlineBanking.attentionAlertText3}
                    </Typography>
                    <Typography gutterBottom>

                    </Typography>
                    <Link rel="noopener" target="_blank" href={window.commonData.onlineBanking.onlineBankingRegulationLink} sx={{
                        color: 'currentColor',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        color: '#4338FC'
                    }}> {window.commonData.onlineBanking.onlineBankingRegulationTextToLink}</Link>
                    <Box mt={3}>
                        <FormControlLabel control={<V2Checkbox onChange={() => { handleCheck(); }} checked={isChecked} defaultChecked />} label="התנאים מקובלים עליי" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Grid container justifyContent="center">
                        <Button tabIndex={0} aria-disabled="true" aria-describedby="disabledReason" className={classes.submit} variant="contained" disabled={!isChecked} onClick={handleBtnClose} >{window.commonData.onlineBanking.approvedBtnText}</Button>
                        <Typography className={dialogStyles.srOnly} tabIndex={0} id="disabledReason">נא לאשר תנאים</Typography>
                    </Grid>
                </DialogActions>

            </Dialog>




        </>
    );
}
export default observer(OnlineBankingDialog);
