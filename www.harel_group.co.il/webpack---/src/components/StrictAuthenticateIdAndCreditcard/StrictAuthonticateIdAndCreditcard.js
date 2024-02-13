import React, { useContext, useState, useEffect } from 'react';
import { TextField, Button, Grid, Modal, Loader, Typography, Box, Select, DatePicker } from 'harelkit';
import { sendAuth } from '../../common/services/AuthentacationService';
import { useForm } from 'react-hook-form/dist/index.ie11';
import IconPerson from '../../common/icons/Person';
import { ResourceContext } from '../../common/context/ResourceContext';
import {  ServerResponse } from '../../common/Enums';
import { LoggerContactUs } from '../../common/Utility';
import {  useSelector} from "react-redux";



function StrictAuthonticateIdAndCreditcard(props) {
    const { register, handleSubmit, errors,clearErrors } = useForm();
    const [disabled, setDisabled] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");  
    const [errorMessageSmallerDate, setErrorMessageSmallerDate] = useState("");
    const resources = useContext(ResourceContext);
    let hasOpenCalls = useSelector(state => state.hasOpenCalls);

    useEffect(() => {
        props.title('חשוב לנו לאמת את זהותך');
        props.icon(<IconPerson />)
        setTimeout(() => {
            document.querySelector('#modal button').focus();
      }, 0);

    }, []);
    const sendValidate = (data) => {
        let actionName;
        let actionData;
        let isValid = true;
        var dateFormat = data.issuerDate.toDate("dd/mm/yyyy")
      
        actionName = "ValidateFullStrictId";
        if (data.year == currentDate.getFullYear() && data.month < (currentDate.getMonth() + 1)) {
            isValid = false;
            setErrorMessageSmallerDate("תאריך תוקף קטן מהתאריך הנוכחי");
        }
        else if (dateFormat > currentDate) {
            isValid = false;
            setErrorMessage("תאריך הנפקה גדול מהתאריך הנוכחי");
        }
        else {
            const creditCardDetails = {
                CardNum: data.creditcard.trim(),
                Month: data.month,
                Year: data.year.substring(2, 4)       
            };
            var mydate = data.issuerDate.split("/");
            actionData = {creditCardDetails: creditCardDetails, year: parseInt(mydate[2]), month:  parseInt(mydate[1]), day:  parseInt(mydate[0]) };
           
        }

        if (isValid) {
            setDisabled(true);
            setIsLoader(true)
            sendAuth(actionName, actionData).then(
                res => {
                    if (res.status == 200) {
                        setDisabled(false);
                        setIsLoader(false);
                        if (res.data.Status == 0) {
                            props.onResult(res.data.Details);
                        }
                        else if (res.data.Status == 1 && res.data.Details.UserInputError == ServerResponse.INVALIDE_ISSUE_DATE) {
                            setErrorMessage(resources['ErrorMsgInvalidIssueDate']);
                        }
                        else if (res.data.Status == 1 && res.data.Details.TechnicalError == ServerResponse.VALIDATE_ISSUE_DATE) {
                            ErrorDetails( ServerResponse.VALIDATE_ISSUE_DATE);
                        }
                        else if (res.data.Status == 1 && res.data.Details.UserInputError == ServerResponse.INVALIDE_CREDIT_CARD) {
                            setErrorMessage(resources['ErrorMsgInvalidCreditCard']);
                        }
                        else if (res.data.Status == 1 && res.data.Details.UserInputError == ServerResponse.INVALIDE_CREDIT_CARD_TEC) {
                            ErrorDetails(ServerResponse.INVALIDE_CREDIT_CARD_TEC);
                        }
                        else {
                            ErrorDetails(res.data.Details.ProcessError)
                        }
                    }
                    else {
                        //שגיאה טכנית                       
                        ErrorDetails('');
                    }
                }
            );
        }
    }
   const contactUs = () => {
    LoggerContactUs(hasOpenCalls,resources['StrictAuthenticateIdAndCreditcard'],true);
    if(!hasOpenCalls)
    {
        let res = {};
        res.process = "ContactUs";
        res.prev = "StrictAuthenticateIdAndCreditcard";
        res.code = "CameFromstrictAuthonticateIdAndCreditcard";
        res.component = props.curcomponent;
        props.onResult(res);
    }
    else
    {
        ErrorDetails(ServerResponse.ALREADY_EXIST)
    }


    }
    const currentDate = new Date();
    const createOptions = (startYear, size) => {
        let result = [];
        for (let index = startYear; index < startYear + size; index++) {
            result.push({
                value: index,
                label: index
            })
        }

        return result;
    }
    const options = createOptions(currentDate.getFullYear(), 10);

    const monthes = () => {
        let result = [];
        for (let index = 1; index < 13; index++) {
            result.push({
                value: index,
                label: index
            })

        }
        return result;
    }
    const monthesOptions = monthes()

    const ChangeMonth = (value) => {
        clearErrors("month")
        if(errorMessageSmallerDate != "")
              setErrorMessageSmallerDate("");  
    }

  
    const ChangeYear = (value) => {
        clearErrors("year") 
            if(errorMessageSmallerDate != "")
              setErrorMessageSmallerDate("");  
    }

    const ChangeForErroreMessage =()=>{
        if(errorMessage != ""){
            setErrorMessage("");
        }
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
            handleSubmit(sendValidate)()
        }
        if (e.target.id == "issuerDate") {
        var val = document.getElementById("issuerDate").value;
        var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
        if (!((((keyCode >= 96 && keyCode <= 105)||(keyCode >= 48 && keyCode <= 57))&& val.length < 10) || keyCode == 8 || keyCode == 46|| keyCode == 37|| keyCode == 39 || keyCode == 9))
            event.preventDefault();
        if((val.length == 2 || val.length == 5)&& keyCode != 8)
              e.target.value = val + "/";
        }
   
    }
   
    const validateNumber = (event) => {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) event.preventDefault();
    }

    const getFocused = () =>{
        if(document.querySelectorAll("[type='text']")[0].value!=""){
            if(document.getElementById("year").value=="")
            {
                setTimeout(() => {
                     document.querySelectorAll("[role='combobox']")[0].focus()
                }, 600);
               
            }       
             else if(document.getElementById("month").value==""){
                    setTimeout(() => {
                        document.querySelectorAll("[role='combobox']")[1].focus()
                }, 600);
           }
        }
   }


    return (
        <>

            <Modal.Body>
                <Typography variant="h5" align="center" role="heading" aria-level="2">באופן חד פעמי, נבקש פרטים נוספים אלו</Typography>
                <Grid alignItems="end">
                    <Grid.Col xs={12}>
                        <Box m={{ bottom: 1 }}>
                            <Typography>
                                יש להזין פרטי כרטיס אשראי הרשום על שמך -
                                הוא לא יחוייב, רק נוודא את זהותך
                            </Typography>
                        </Box>
                        <TextField
                            required
                            id="creditcard"
                            autoFocus
                            numericKeyboard
                            autoComplete="off"
                            onKeyDown={submitOnEnter}
                            label="מספר כרטיס אשראי"
                            name="creditcard"
                            onKeyPress={validateNumber}//y,ChangeForErroreMessage}
                            maxLength="18"
                            ref={register({
                                required: true,
                                pattern: /^\s*\d{8,18}\s*$/i,
                                maxLength: 18
                            })}
                            error={!!errors.creditcard}
                            helperText={
                                errors.creditcard && errors.creditcard.type === "required" && "חובה להזין מספר כרטיס אשראי" ||
                                errors.creditcard && errors.creditcard.type === "pattern" && "מס כרטיס אשראי לא תקין" ||
                                errors.creditcard && errors.creditcard.type === "maxLength" && "מס כרטיס אשראי לא תקין"
                            } />
                    </Grid.Col>
                    </Grid>
                    <Grid alignItems="end" role="group" aria-label="תאריך תוקף">
                                <Grid.Col xs={6}>
                                    <Box p={{ bottom: 0.5 }}>תאריך תוקף</Box>
                                    <Select
                                        required
                                        id="year"
                                        onChange={ChangeYear}
                                        options={options}
                                        values={[]}
                                        id="year"
                                        name="year"
                                        label="שנה"
                                        onChange={ChangeYear}
                                        ref={register({
                                            required: true,
                                        })}
                                        error={!!errors.year}
                                        helperText={
                                            errors.year && errors.year.type === "required" && "חובה לבחור שנה"
                                        }
                                    />
                                </Grid.Col>
                                <Grid.Col xs={6}>
                                    <Select
                                    required
                                    id="month"                      
                                        options={monthesOptions}
                                        values={[]}
                                      
                                        name="month"
                                        onChange={ChangeMonth}
                                        label="חודש"
                                        ref={register({
                                            required: true,
                                        })}
                                        error={!!errors.month}
                                        helperText={
                                            errors.month && errors.month.type === "required" && "חובה לבחור חודש"
                                        } />
                                        
                                </Grid.Col>
                   
                </Grid>
                <Typography >יש להזין את תאריך ההנפקה של תעודת הזהות שלך</Typography>
                <br />
                <TextField
                         id="issuerDate"
                         label="הזנת תאריך לדוגמא: 01/01/2021"
                         name="issuerDate"
                         onKeyDown={submitOnEnter}
                         numericKeyboard
                         aria-label="הזן תאריך הנפקה של תעודת זהות בפורמט dd/mm/yyyy"
                         placeholder="dd/mm/yyyy"
                         onKeyPress={validateNumber}
                         onChange={ChangeForErroreMessage}
                        //  mask="99/99/9999"
                         maskPermanents={[2,5]}
                         direction="ltr"
                         required
                         ref={register({
                            required: true,
                            pattern: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/i                               
                        })}
                        error={!!errors.issuerDate}                                    
                        helperText={
                            errors.issuerDate && errors.issuerDate.type === "required" && "חובה להזין תאריך הנפקת תעודת זהות"||
                            errors.issuerDate && errors.issuerDate.type === "pattern" && "נא להזין תאריך במבנה dd/mm/yyyy"
                        }
                        />
              <p className="errorScanovate"  role="alert">{errorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
                <p id='help'>עזרה? <button onClick={contactUs} aria-label="פניה לנציג תמיכה טכנית">
                    תמיכה טכנית</button></p>
                <Button variant="contained" onClick={handleSubmit(sendValidate,getFocused)} align="center"
                    disabled={disabled}> המשך{isLoader ? <>&nbsp;&nbsp;<Loader size={18} /></> : null}
                </Button>
            </Modal.Footer>

        </>
    );

}

export default StrictAuthonticateIdAndCreditcard;
StrictAuthonticateIdAndCreditcard.displayName = 'StrictAuthenticateIdAndCreditcard';
