import React, { useState, useEffect, useContext } from 'react';
import { ResourceContext } from '../../common/context/ResourceContext';
import CreditCard from '../CreditCard/CreditCard';
import IssuerDate from '../IssuerDate/IssuerDate';
import Scanovate from '../Scanovate/Scanovate';
import Tabs from '../../common/Tabs';
import Video from '../../common/icons/Video';
import CreditCardIcon from '../../common/icons/CreditCard';
import IdAndCreditcard from '../../common/icons/IdAndCreditcard';
import UserIdIcon from '../../common/icons/UserId';
import { FormProvider, useForm } from 'react-hook-form/dist/index.ie11';
import { MapaProcess } from '../../common/Enums';
import IconPerson from '../../common/icons/Person';
import { Grid, Modal, Button, Typography, Loader } from 'harelkit';
import { useSelector } from "react-redux";
import { sendAuth } from '../../common/services/AuthentacationService';
import { IsValideExpirationDate, IsValideIssuerDate, ifIsDesktop } from '../../common/Utility';
import { ServerResponse } from '../../common/Enums';
import { LoggerContactUs, GetErrorMsg } from '../../common/Utility';
import styles from './StrictAuthenticationMain.css'


function StrictAuthenticationMain(props) {
    const methods = useForm();
    const resources = useContext(ResourceContext);
    const [activeTab, setActiveTab] = useState();
    const [disabled, setDisabled] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [IssuerDateValue, setIssuerDate] = useState();
    const [CreditCardYear, setOnChangeYear] = useState();
    const [CreditCardMonth, setOnChangeMonth] = useState();
    const [isValid, setIsValid] = useState(true);
    const [CreditCardNumber, setOnChangeCreditNumber] = useState();
    let redirect = useSelector(state => state.redirect);
    let isFast = useSelector(state => state.isFast);
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorMessage, setIsErrorMessage ] = useState(false); 
    let hasOpenCalls = useSelector(state => state.hasOpenCalls)

    function TabClick(val) {
        setActiveTab(val)
        setErrorMessage("");

    }
    useEffect(() => {
       
        props.title(props.isTab ? 'איך ברצונך להזדהות?' : 'חשוב לנו לאמת את זהותך');
        props.icon(<IconPerson />);
        props.closeBtn(false);

        getActiveTab();

    }, []);
    const submitOnEnter = (e) => {
        setIsErrorMessage(false);
        if (e.keyCode == 13){
            methods.handleSubmit(sendValidate, getFocused)();
        }
    }
    const OnTabKeyDown = (e) => {
        if (e.keyCode == 13)
            submitOnEnter();
    }
    const contactUs = () => {
        LoggerContactUs(hasOpenCalls, activeTab, true);
        if (!hasOpenCalls) {
            let res = {};
            res.process = "ContactUs";
            res.prev = "StrictAuthenticationMain";
            res.code = "CameFromeStrictAuthenticationMain";
            res.details = { MapaProcess: props.MapaProcess, isTab: props.isTab, isDisplayScanovate: props.isDisplayScanovate };
            res.component = props.curcomponent;
            props.onResult(res);
        }
        else {
            ErrorDetails(ServerResponse.ALREADY_EXIST)
        }
    }
    function CreditCardData() {
            let creditCardDetails = {
                CardNum: CreditCardNumber.trim()
            }
        return creditCardDetails;
    }

    function IssueDateData() {
        let actionData;
        if (!IsValideIssuerDate(IssuerDateValue.toDate("dd/mm/yyyy"))) {
            setIsValid(false);
            setErrorMessage("תאריך הנפקת תעודת זהות גדול מהתאריך הנוכחי");
            setIsErrorMessage(true);
        }
        else {
            var mydate = IssuerDateValue.split("/");
            actionData = { year: parseInt(mydate[2]), month: parseInt(mydate[1]), day: parseInt(mydate[0]) };
        }
        return actionData;
    }
    function getActiveTab() {
       
            document.querySelector('html').style.position='fixed important';
           
          
        if(document.querySelector('#modal > div:first-of-type > div:first-of-type')){
            document.querySelector('#modal > div:first-of-type > div:first-of-type').style.position='absolute';
            document.querySelector('#modal > div:first-of-type > div:first-of-type').style.marginBottom='-200px';
         }
        var displayTab = "";
        if (props.isDisplayScanovate)
            displayTab = MapaProcess.Scanovate;
        else {
            if (props.MapaProcess == MapaProcess.StrictIdentificationChoice)
                displayTab = MapaProcess.CreditCard;
            else
                displayTab = props.MapaProcess;
        }
        setActiveTab(displayTab);
        return displayTab;
    }
    const getFocused = () => {
        if (activeTab == MapaProcess.CreditCard || activeTab == MapaProcess.StrictIdentificationFull) {
            if (document.querySelectorAll("[type='text']")[0].value != "") {
                if (document.getElementById("year").value == "") {
                    setTimeout(() => {
                        document.querySelectorAll("[role='combobox']")[0].focus()
                    }, 600);

                }
                else if (document.getElementById("month").value == "") {
                    setTimeout(() => {
                        document.querySelectorAll("[role='combobox']")[1].focus()
                    }, 600);
                }
            }
        }
    }
    const ErrorDetails = (val) => {
        let res = {};
        res.process = "ErrorDetails";
        res.code = val;
        res.component = props.curcomponent;
        props.onResult(res);
    }
    const sendValidate = (data) => {
        let isDesk = ifIsDesktop();
        let actionName;
        let actionData;
        var isScanovate = false;
        switch (activeTab) {
            case MapaProcess.Scanovate:
                actionName = "SCGetUrl";
                actionData = { url: redirect, isStrict: true, fast: isFast ? 1 : 0, isDesktop: isDesk };
                isScanovate = true;
                break;
            case MapaProcess.StrictIdentificationFull:
                actionName = "ValidateFullStrictId";
                let IssueDateActionData = IssueDateData();
                let CreditCardActionData = CreditCardData();
                if (IssueDateData && CreditCardData)
                    actionData = { creditCardDetails: CreditCardActionData, year: IssueDateActionData.year, month: IssueDateActionData.month, day: IssueDateActionData.day };
                break;
            case MapaProcess.CreditCard:
                actionName = "ValidateCreditCardDetails";
                actionData = { creditCardDetails: CreditCardData() }
                break;
            case MapaProcess.IssuerDate:
                actionName = "ValidateIssueDate";
                actionData = IssueDateData();
                break;
            default:
                setErrorMessage("ערך לא תקין");
                setIsErrorMessage(true);
                break;
        }
        if (isValid) {
            setDisabled(true);
            setIsLoader(true)
            sendAuth(actionName, actionData).then(
                result => {
                    if (result.status == 200) {
                        setDisabled(false);
                        setIsLoader(false);
                        if (result.data.Status == 0) {
                            if (isScanovate)
                                if (isDesk) {
                                    let res = {};
                                    res.process = "ScanovateDesktop";
                                    res.component = props.curcomponent;
                                    res.details = { href: result.data.Details.link };
                                    
                                    props.onResult(res);
                                }
                                else {
                                    
                                    window.location.href = result.data.Details.link;
                                }
                            else{
                                       
                                       props.onResult(result.data.Details);
                                }
                        }
                        else if (result.data.Status == 1 && result.data.Details.UserInputError) {
                            setErrorMessage(GetErrorMsg(result.data.Details.UserInputError, resources));
                            setIsErrorMessage(true);
                        }
                        else if (result.data.Status == 1 && result.data.Details.TechnicalError) {
                            ErrorDetails(GetErrorMsg(result.data.Details.TechnicalError, resources));
                        }
                        else {
                            ErrorDetails(result.data.Details.ProcessError)
                        }
                    }
                    else {
                        
                        ErrorDetails('');
                    }
                }
            );
        }
    }

    return (
        <>
            <FormProvider {...methods}>
                <Modal.Body className="bodyStyle">
                    {(props.MapaProcess == MapaProcess.OTP && props.isDisplayScanovate && !props.isTab) ?
                        <Typography aria-level="2" variant="h6" align="center">כדי לוודא שנציג את המידע שלך לעיניך בלבד, נבקש לצלם את פניך ותעודה מזהה</Typography>
                        : <Typography aria-level="2" variant="h6" align="center">אנחנו רוצים לוודא שנציג את המידע שלך לעיניך בלבד</Typography>
                    }
                    <br />
                    {props.isTab ?
                        <Tabs
                            active={getActiveTab}
                            onClick={TabClick} >
                            <Tabs.Tab
                                label="צילום פנים|ותעודת זהות"
                                tabkey={MapaProcess.Scanovate}
                                icon={<Video />}
                                display={props.isDisplayScanovate}
                                onClick={TabClick}
                            >
                                <Scanovate onSubmit={submitOnEnter} isTab={props.isTab} ></Scanovate>
                            </Tabs.Tab>
                            <Tabs.Tab
                                label="תאריך הנפקת תעודת |זהות וכרטיס אשראי"
                                tabkey={MapaProcess.StrictIdentificationFull}
                                icon={<IdAndCreditcard />}
                                width="94"
                                display={props.MapaProcess == MapaProcess.StrictIdentificationFull}
                                onClick={TabClick}>
                                <Grid alignItems="end">
                                    <Grid.Col xs={12}><CreditCard onSubmit={submitOnEnter} onChangeCreditNumber={setOnChangeCreditNumber} onChangeMonth={setOnChangeMonth} onChangeYear={setOnChangeYear}></CreditCard></Grid.Col>
                                    <Grid.Col><IssuerDate onSubmit={submitOnEnter} onChange={setIssuerDate}></IssuerDate></Grid.Col>
                                </Grid>
                            </Tabs.Tab>
                            <Tabs.Tab
                                label="אימות מול חברת האשראי"
                                tabkey={MapaProcess.CreditCard}
                                icon={<CreditCardIcon />}
                                display={props.MapaProcess == MapaProcess.CreditCard || props.MapaProcess == MapaProcess.StrictIdentificationChoice}
                                onClick={TabClick}>
                                <Grid alignItems="end">
                                    <Grid.Col xs={12}><CreditCard onSubmit={submitOnEnter} onChangeCreditNumber={setOnChangeCreditNumber} onChangeMonth={setOnChangeMonth} onChangeYear={setOnChangeYear}></CreditCard></Grid.Col>
                                </Grid>
                            </Tabs.Tab>
                            <Tabs.Tab
                                label="תאריך הנפקת תעודת זהות"
                                tabkey={MapaProcess.IssuerDate}
                                icon={< UserIdIcon />}
                                display={props.MapaProcess == MapaProcess.IssuerDate || props.MapaProcess == MapaProcess.StrictIdentificationChoice}
                                onClick={TabClick}>
                                <Grid alignItems="end">
                                    <Grid.Col xs={12}><IssuerDate onSubmit={submitOnEnter} onChange={setIssuerDate}></IssuerDate></Grid.Col>
                                </Grid>
                            </Tabs.Tab>
                        </Tabs>
                        :
                        <Grid alignItems="end">
                            {(props.MapaProcess == MapaProcess.CreditCard || props.MapaProcess == MapaProcess.StrictIdentificationFull) && <Grid.Col xs={12}><CreditCard onChangeCreditNumber={setOnChangeCreditNumber} onChangeMonth={setOnChangeMonth} onChangeYear={setOnChangeYear} OnSubmit={submitOnEnter}></CreditCard></Grid.Col>}
                            {(props.MapaProcess == MapaProcess.IssuerDate || props.MapaProcess == MapaProcess.StrictIdentificationFull) && <Grid.Col xs={12}><IssuerDate onChange={setIssuerDate} OnSubmit={submitOnEnter}></IssuerDate></Grid.Col>}
                            {(props.MapaProcess == MapaProcess.OTP && props.isDisplayScanovate) && <Grid.Col>  <Scanovate onSubmit={submitOnEnter} isTab={props.isTab}></Scanovate></Grid.Col>}
                        </Grid>
                    }
                   { isErrorMessage ? <p className="errorScanovate" role="alert">{errorMessage}</p> : null }
                </Modal.Body>
                <Modal.Footer>
                    <p id='help'>עזרה? <button onClick={contactUs} aria-label="פניה לנציג תמיכה טכנית">
                        תמיכה טכנית</button></p>
                    <Button type="submit" variant="contained" onClick={methods.handleSubmit(sendValidate, getFocused)} align="center"
                        disabled={disabled}> המשך{isLoader ? <>&nbsp;&nbsp;<Loader size={18} /></> : null}
                    </Button>
                </Modal.Footer>

            </FormProvider>
        </>
    );

}
export default StrictAuthenticationMain;
StrictAuthenticationMain.displayName = 'StrictAuthenticationMain';