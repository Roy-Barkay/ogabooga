
import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Modal, Loader, Grid } from 'harelkit';
import IconSms from '../../common/icons/Sms';
import { useForm } from 'react-hook-form/dist/index.ie11';
import { sendAuth } from '../../common/services/AuthentacationService';
import { fillExetrnalUserDetails } from '../../common/Utility';
import { useDispatch, useSelector } from "react-redux";
import { ResourceContext } from '../../common/context/ResourceContext';
import { ServerResponse } from '../../common/Enums';

function UserOtp(props) {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm();
    let redirect = useSelector(state => state.redirect)
    const [errorMessage, setErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [otpVal, setOtpVal] = useState('');
    const resources = useContext(ResourceContext);

    useEffect(() => {
        props.title('נא להזין את הקוד שקיבלת בהודעה שנשלחה ברגעים אלה לטלפון הנייד');
        props.icon(<IconSms />)
        props.closeBtn(false);
        setTimeout(() => {
            if (!(['iPad', 'iPhone'].includes(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document))) {
                document.querySelector('input[name="otp"]').focus();
            }
        }, 0);
    }, []);


          const input = document.querySelector('input[autocomplete="one-time-code"]');
           //console.log("input: "+input);
           const ac = new AbortController();
           //console.log("ac: "+ac);
           navigator.credentials.get({
             otp: { transport:['sms'] },
             signal: ac.signal
           }).then((otp) => {
        //       console.log("otp: "+otp);

        if('OTPCredential' in window){
             setOtpVal(()=>otp.code);
        
             setTimeout(() => {
        //         console.log("handleSubmit");
             handleSubmit(sendOtp)();
         }, 1000);
        }
           }).catch((err) => {
             console.error(err);
           
           });           
            
           
    const sendCreateOtp = (data) => {
       setDisabled(true)
       setIsLoading(true);

       sendAuth("CreateOTP", {}).then(
           res => {
               setIsLoading(false);
               setDisabled(false);
               if (res.status == 200) {
                   if (res.data.Status != 0) {
                       ErrorDetails('');
                   }
               }
               else {
                   ErrorDetails('');
               }
           }
       );
    }

    const sendOtp = (data) => {
        setDisabled(true)
        setIsLoading(true);
        sendAuth("SCValidateOTP", { OTP: data.otp }).then(
            res => {
                setIsLoading(false);
                setDisabled(false);
                if (res.status == 200) {
                    if (res.data.Status == 0) {
                        dispatch({ type: 'externalUserDetails', payload: fillExetrnalUserDetails(res.data.Details.Email, res.data.Details.IsDecleration, res.data.Details.Activation, res.data.Details.EmailNeedsVerification) })
                        var dataObj = Object.assign({}, res.data.Details, { "path": redirect });
                        props.onResult(dataObj);
                    }
                    else {
                        if (res.data.Details.UserInputError == "OTPInvalid") {
                            setErrorMessage(resources['ErrorMsgOTPInvalid']);
                        }
                        else if (res.data.Details.ProcessError == "UserIsBlocked") {
                            ErrorDetails(res.data.Details.TechnicalError,res.data.Details.TechnicalError+ ServerResponse.TITLE_ERROR)
                        }
                        else {
                            props.onResult(res.data.Details);
                        }
                    }
                }
                else {
                    //שגיאה טכנית
                    ErrorDetails('');
                }
            }
        );
    }

    const ErrorDetails = (val,codeTitle) => {
        let res = {};
        res.process = "ErrorDetails";
        res.code = val;
        res.codeTitle = codeTitle;
        res.component = props.curcomponent;
        props.onResult(res);
    }
    const submitOnEnter = (e) => {
        if (e.keyCode == 13) {
            handleSubmit(sendOtp)()
        }
    }
    const handleDataValue = (text) => {
        setOtpVal(text);
       };

    const otpBottomContainerText = resources["otpBottomContainerText"]

    return (
        <>
            <Modal.Body className="bodyStyle">
                <TextField
                    onKeyDown={submitOnEnter}
                    numericKeyboard
                    name="otp"
                    id="otp"
                    required
                    value={otpVal}
                    maxLength="10"
                    label="קוד"
                    autoComplete="one-time-code"
                    onChange={(e) => handleDataValue(e.target.value)}
                    ref={register({
                        required: true
                    })}
                    error={!!errors.otp}
                    helperText={
                        errors.otp && errors.otp.type === "required" && "חובה להזין קוד"
                    }
                />

                <p className="errorScanovate">{errorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
                <Grid justify="center">
                    <Grid.Col >
                        <Button variant="outlined" onClick={sendCreateOtp} disabled={disabled} >לשלוח שוב</Button>
                    </Grid.Col>
                    <Grid.Col >
                        <Button variant="contained" onClick={handleSubmit(sendOtp)} disabled={disabled}>  המשך {isLoading ? <>&nbsp;&nbsp;<Loader size={18} /></> : null}</Button>
                    </Grid.Col>
                </Grid>
            </Modal.Footer>

            {otpBottomContainerText && (
                <div
                    style={{ marginTop: "10px", textAlign: "center" }}
                    dangerouslySetInnerHTML={{ __html: otpBottomContainerText }}
                ></div>
            )}
            
        </>
    );
}


export default UserOtp;
UserOtp.displayName = 'UserOtp';