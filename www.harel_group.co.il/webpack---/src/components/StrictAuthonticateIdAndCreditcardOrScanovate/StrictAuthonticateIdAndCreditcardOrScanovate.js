import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Grid, Modal, Loader, Typography, Box, Select, Checkbox, DatePicker } from 'harelkit';
import { sendAuth } from '../../common/services/AuthentacationService';
import { useForm } from 'react-hook-form/dist/index.ie11';
import IconPerson from '../../common/icons/Person';
import IdAndCreditcard from '../../common/icons/IdAndCreditcard';
import Tabs from '../../common/Tabs';
import Video from '../../common/icons/Video';
import { useSelector } from "react-redux";
import { ResourceContext } from '../../common/context/ResourceContext';
import { ServerResponse } from '../../common/Enums';
import { LoggerContactUs } from '../../common/Utility';


function StrictAuthonticateIdAndCreditcardOrScanovate(props) {
    const { register, handleSubmit, errors ,clearErrors} = useForm();
    const [disabled, setDisabled] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageSmallerDate, setErrorMessageSmallerDate] = useState("");
    const [checked, setChecked] = useState(false);
    const [activeTab, setActiveTab] = useState("scanovate");
    let redirect = useSelector(state => state.redirect);
    let isFast = useSelector(state => state.isFast);
    const resources = useContext(ResourceContext);
    let hasOpenCalls = useSelector(state => state.hasOpenCalls)

    useEffect(() => {
        props.title('איך ברצונך להזדהות?');
        props.icon(<IconPerson />);
        setTimeout(() => {
            document.querySelector('#modal button').focus();
        }, 0);

    }, []);
    const sendValidate = (data) => {
        let actionName;
        let actionData;
        let isValid = true;

        var isScanovate = false;
        switch (activeTab) {
            case 'scanovate':
                actionName = "SCGetUrl";
                actionData = { url: redirect, isStrict: true, fast: isFast ? 1 : 0 };
                isScanovate = true;
                break;
            case 'fullStrict':
                actionName = "ValidateFullStrictId";
                var dateFormat = data.issuerDate.toDate("dd/mm/yyyy")

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
                        Year: data.year.substring(2, 4),
                        CVV: data.cvv
                    };
                    var mydate = data.issuerDate.split("/");
                    actionData = { creditCardDetails: creditCardDetails, year: parseInt(mydate[2]), month: parseInt(mydate[1]), day: parseInt(mydate[0]) };
                }
                break;

            default:
                setErrorMessage("ערך לא תקין");
                break;
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
                            if (isScanovate)
                                window.location.href = res.data.Details.link;
                            else
                                props.onResult(res.data.Details);
                        }
                        else if (res.data.Status == 1 && res.data.Details.UserInputError == ServerResponse.INVALIDE_ISSUE_DATE) {
                            setErrorMessage(resources['ErrorMsgInvalidIssueDate']);
                        }
                        else if (res.data.Status == 1 && res.data.Details.TechnicalError == ServerResponse.VALIDATE_ISSUE_DATE) {
                            ErrorDetails(ServerResponse.VALIDATE_ISSUE_DATE);
                        }

                        else if (res.data.Status == 1 && res.data.Details.UserInputError == "InvalidCreditCard") {
                            setErrorMessage(resources['ErrorMsgInvalidCreditCard']);
                        }
                        else if (res.data.Status == 1 && res.data.Details.UserInputError == ServerResponse.INVALIDE_ISSUE_DATE) {
                            ErrorDetails(ServerResponse.INVALIDE_ISSUE_DATE);
                        }
                        else {
                            if (isScanovate) {
                                ErrorDetails("AuthenticationFailedSubTitle", "AuthenticationFailedTitle");
                            }
                            else
                                ErrorDetails(res.data.Details.ProcessError)
                        }
                    }
                    else {
                        //שגיאה טכנית
                        if (isScanovate)
                            FailedScanovate();
                        else
                            ErrorDetails('');
                    }
                }
            );
        }
    }

    const FailedScanovate = () => {
        let res = {};
        res.process = "FailedScanovate";
        res.component = props.curcomponent;
        props.onResult(res);

    }
    const ErrorDetails = (code, codeTitle) => {
        let res = {};
        res.process = "ErrorDetails";
        res.code = code;
        res.codeTitle = codeTitle;
        res.component = props.curcomponent;
        props.onResult(res);
    }
    const contactUs = () => {
        LoggerContactUs(hasOpenCalls,resources['StrictAuthonticateIdAndCreditcardOrScanovate'],true);
        if (!hasOpenCalls) {
            let res = {};
            res.process = "ContactUs";
            res.prev = "StrictAuthonticateIdAndCreditcardOrScanovate";
            res.code = "CameFromestrictAuthonticateIdAndCreditcardAndScanovate";
            res.component = props.curcomponent;
            props.onResult(res);
        }
        else {
            ErrorDetails(ServerResponse.ALREADY_EXIST)
        }


    }
    const currentDate = new Date();
    const createOptions = (startYear, size) => {
        let result = [];
        for (let index = startYear; index < startYear + size; index++) {
            result.push({
                value: index,
                label: index,
                id:index
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
                label: index,
                id:index
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
    const handleChange = () => {
        const newChecked = !checked;
        setChecked(newChecked);
    }

    function TabClick(val) {
        setActiveTab(val)
    }

    const submitOnEnter = (e) => {
        if (e.keyCode == 13) {
            handleSubmit(sendValidate)()
        }
        if (e.target.id == "issuerDate") {
            var val = document.getElementById("issuerDate").value;
            var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
            if (!((((keyCode >= 96 && keyCode <= 105) || (keyCode >= 48 && keyCode <= 57)) && val.length < 10) || keyCode == 8 || keyCode == 46 || keyCode == 37 || keyCode == 39 || keyCode == 9))
                event.preventDefault();
            if ((val.length == 2 || val.length == 5) && keyCode != 8)
                e.target.value = val + "/";
        }

    }
    const validateNumber = (event) => {

        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) event.preventDefault();
    }

    const getFocused = () =>{
        if(activeTab!="scanovate"){    
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
     }

    return (
        <>
            <Modal.Body className="bodyStyle">
                <Typography variant="h6" align="center">אנחנו רוצים לוודא שנציג את המידע שלך לעיניך בלבד</Typography>
                <br />
                <Tabs
                    active="scanovate"
                    onClick={TabClick}
                >
                    <Tabs.Tab
                        label="צילום פנים|ותעודת זהות"
                        tabkey="scanovate"
                        icon={<Video />}
                        display={true}
                        onClick={TabClick}
                    >
                        <Typography>לפני שנצלם את פניך ותעודה מזהה, נבקש את אישורך לדבר המחלקה המשפטית</Typography>
                        <br />

                        <Checkbox
                            name="agree"
                            id="agree"
                            required
                            checked={checked}
                            error={!!errors.agree}
                            ref={register({ required: true })}
                            onChange={handleChange}
                            helperText={errors.agree && errors.agree.type === "required" && "כדי להמשיך יש לאשר את תנאי השימוש ומדיניות הגנת הפרטיות"}
                            align="right"
                        >
                            מוסכמים עלי <a href="/">תנאי השירות</a> ו<a href="/">מדיניות הפרטיות של החברה</a>
                        </Checkbox>
                        <br />
                        <br />
                        <Typography variant="body2">המידע ישמש לצורך הזיהוי בבקשה זו ובבקשות עתידיות לגופים המוסדיים בקבוצת הראל</Typography>
                    </Tabs.Tab>
                    <Tabs.Tab
                        label="תאריך הנפקת תעודת |זהות וכרטיס אשראי"
                        tabkey="fullStrict"
                        icon={<IdAndCreditcard />}
                        width="94"
                        display={true}
                        onClick={TabClick}
                    >
                        <Grid alignItems="end">
                                    <Grid.Col xs={12}>
                                        <Box m={{ bottom: 1 }}>
                                            <Typography>
                                                יש להזין פרטי כרטיס אשראי הרשום על שמך -
                                                הוא לא יחוייב, רק נוודא את זהותך
                                            </Typography>
                                        </Box>
                                        <TextField
                                            id="creditcard"
                                            required
                                            numericKeyboard
                                            autoComplete="off"
                                            onKeyDown={submitOnEnter}
                                            onKeyPress={validateNumber}//,ChangeForErroreMessage}
                                            label="מספר כרטיס אשראי"
                                            name="creditcard"
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
                                        <Grid.Col xs={6} role="alert">
                                            <Box m={{ bottom: 0.5 }}>
                                                <Typography>
                                                    תאריך תוקף
                                                </Typography>
                                            </Box>
                                            <Select

                                                required
                                                onChange={ChangeYear}
                                                options={options}
                                                values={[]}
                                                id="year"
                                                name="year"
                                                label="שנה"
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
                            onChange={ChangeForErroreMessage}
                            numericKeyboard
                            aria-label="הזן תאריך הנפקה של תעודת זהות בפורמט dd/mm/yyyy"
                            onKeyPress={validateNumber}
                            direction="ltr"
                            placeholder="dd/mm/yyyy"
                            required
                            ref={register({
                                required: true,
                                pattern: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/i
                            })}
                            error={!!errors.issuerDate}
                            helperText={
                                errors.issuerDate && errors.issuerDate.type === "required" && "חובה להזין תאריך הנפקת תעודת זהות" ||
                                errors.issuerDate && errors.issuerDate.type === "pattern" && "נא להזין תאריך במבנה dd/mm/yyyy"
                            }
                        />
                    </Tabs.Tab>
                </Tabs>
                <p className="errorScanovate" role="alert">{errorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
                <p id='help'>עזרה? <button onClick={contactUs} aria-label="פניה לנציג תמיכה טכנית">
                    תמיכה טכנית</button></p>
                <Button variant="contained" onClick={handleSubmit(sendValidate, getFocused)}  align="center"
                    disabled={disabled}> המשך{isLoader ? <>&nbsp;&nbsp;<Loader size={18} /></> : null}
                </Button>
            </Modal.Footer>
        </>


    );

}

export default StrictAuthonticateIdAndCreditcardOrScanovate;
StrictAuthonticateIdAndCreditcardOrScanovate.displayName = 'StrictAuthonticateIdAndCreditcardOrScanovate';