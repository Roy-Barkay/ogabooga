import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Grid, Modal, Loader, Typography } from 'harelkit';
import { sendAuth } from '../../common/services/AuthentacationService';
import './ContactUs.css'
import { useForm } from 'react-hook-form/dist/index.ie11';
import { isString , isIdNumber } from 'harelutils';
import {isMobile} from '../../common/validations'
import IconPerson from '../../common/icons/Person';
import { useSelector } from "react-redux";
import { ResourceContext } from '../../common/context/ResourceContext';
import {  ServerResponse } from '../../common/Enums';


function ContactUs(props) {
    const { register, handleSubmit, errors } = useForm();
    const [context, setContext] = useState({ firstName: "", lastName: "", id: "", phone: "", errorMessage: "" });
    const [disabled, setDisabled] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const resources = useContext(ResourceContext);

    let curUser = useSelector(state => state.curUserDetails)
    let redirect = useSelector(state => state.redirect)

    useEffect(() => {       
        props.title('פנייה לנציג תמיכה טכנית');
        props.icon(<IconPerson />);
        props.closeBtn(false);

    }, []);

    const sendAuthData = (data) => {
        setDisabled(true)
        setIsLoad(true)
        var screen = resources[props.prevComponent];
        var actionName = props.isFromScreen == true ? "SCCustomerHelp" : "CustomerHelp";
        sendAuth(actionName, { CustomerServiceFromScreenId: screen, firstName: data.firstname, lastName: data.lastname, id: curUser.uid ? curUser.uid : data.uid.trim(), phone: curUser.uphone ? curUser.uphone : data.phone.trim(), isFromScreen: true }).then(
            res => {
                setDisabled(false)
                setIsLoad(false)
                if (res.status == 200) {
                    if (res.data.Status == 0) {
                        let result = {};
                        result.process = "ContactUsSuccess";
                        result.component = props.curcomponent;
                        var dataObj = Object.assign({}, result, { "path": redirect }, { "curcomponent": props.curcomponent });
                        props.onResult(dataObj);
                    }
                    else {
                        if (res.data.Details.ProcessError == 'OpeningCallInvalidDetails') {
                            setErrorMessage("אחד מהפרטים אינו נכון");
                        }
                        else {
                            ErrorDetails(res.data.Details.TechnicalError)
                        }
                    }
                }
                else {
                    ErrorDetails('')
                }
            }
        );

    }
    function back() {
        let res = {};
        props.title();
        res.process = "returnFromContactUs";
        res.prev = props.prevComponent
        res.details = props.details
        props.onResult(res);
    }
    const ErrorDetails = (val) => {
        let res = {};
        res.process = "ErrorDetails";
        res.code = val;
        res.component = props.curcomponent;
        props.onResult(res);
    }

    const submitOnEnter = (e) => {
        if (e.keyCode == 13) {
            handleSubmit(sendAuthData)()
        }
    }
    return (
        <>
            <Modal.Body className="bodyStyle">
                <Typography aria-level="2" variant="h6" align="center">{resources[props.reason]}</Typography>
                <Grid>
                    <Grid.Col xs={12}>
                        <TextField
                            required
                            id="firstname"
                            autoFocus
                            autoComplete="off"
                            onKeyDown={submitOnEnter}
                            name="firstname"
                            defaultValue={context.firstName}
                            label="שם פרטי"
                            ref={register({
                                required: true,
                                validate: {
                                    isString: value => isString(value)
                                }
                            })}
                            error={!!errors.firstname}
                            helperText={
                                errors.firstname && errors.firstname.type === "required" && "חובה להזין שם פרטי" ||
                                errors.firstname && errors.firstname.type === "isString" && "חובה להזין רק אותיות"
                            }
                        />
                    </Grid.Col>
                    <Grid.Col xs={12}>
                        <TextField
                            required
                            id="lastname"
                            autoComplete="off"
                            onKeyDown={submitOnEnter}
                            name="lastname"
                            defaultValue={context.lastName}
                            label="שם משפחה"
                            ref={register({
                                required: true,
                                validate: {
                                    isString: value => isString(value)
                                }
                            })}
                            error={!!errors.lastname}
                            helperText={
                                errors.lastname && errors.lastname.type === "required" && "חובה להזין שם משפחה" ||
                                errors.lastname && errors.lastname.type === "isString" && "חובה להזין רק אותיות"
                            }
                        />
                    </Grid.Col>
                    {/*  {
                        curUser.uid ? null
                            :
                            <Grid.Col xs={12}>
                                <TextField
                                    required
                                    id="uid"
                                    numericKeyboard
                                    autoComplete="off"
                                    onKeyDown={submitOnEnter}
                                    name="uid"
                                    maxLength="9"
                                    defaultValue={context.id}
                                    label="תעודת זהות"
                                    ref={register({
                                        required: true,
                                        validate: {
                                            isIdNumber: value => isIdNumber(value)
                                        }
                                    })}
                                    error={!!errors.uid}
                                    helperText={
                                        errors.uid && errors.uid.type === "required" && "חובה להזין תעודת זהות" ||
                                        errors.uid && errors.uid.type === "isIdNumber" && "חובה להזין תעודת זהות תקינה"
                                    }
                                />
                            </Grid.Col>
                    } */}
                    <Grid.Col xs={12}>
                        <TextField
                            required
                            id="phone"
                            numericKeyboard
                            autoComplete="off"
                            onKeyDown={submitOnEnter}
                            name="phone"
                            maxLength="11"
                            defaultValue={context.phone}
                            label="טלפון נייד"
                            ref={register({
                                required: true,
                                validate: {
                                  isMobile: value => isMobile(value.trim())
                                }
                              })}
                            error={!!errors.phone}
                            helperText={
                                errors.phone && errors.phone.type === "required" && "חובה להזין מספר טלפון נייד" ||
                                errors.phone && errors.phone.type === "isMobile" && "חובה להזין מספר תקין"
                            }
                        />
                    </Grid.Col>
                </Grid>
                <p className="errorScanovate">{errorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
                <Grid justify="center">
                    {props.prevComponent && props.prevComponent != "ScanovateReferer" ?
                        <Grid.Col>
                            <Button variant="outlined" onClick={back} align="center" disabled={disabled}>
                                חזור
                            </Button>
                        </Grid.Col> : null}
                    <Grid.Col>
                        <Button variant="contained" onClick={handleSubmit(sendAuthData)} align="center" disabled={disabled}>


                            אישור  {isLoad ? <>&nbsp;&nbsp;<Loader size={18} /></> : null}
                        </Button>
                    </Grid.Col>
                </Grid>
            </Modal.Footer>
        </>
    );
}

export default ContactUs;
ContactUs.displayName = 'ContactUs';
