import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Typography, Modal, Grid, Radio, Checkbox, Loader } from 'harelkit';
import { isFast, getQueryParameterByName } from '../../common/Utility';
import { sendAuth } from '../../common/services/AuthentacationService';
import { useForm } from 'react-hook-form/dist/index.ie11';
import {isEmail } from 'harelutils';
import {isMobile} from '../../common/validations'
import Phone from '../../common/icons/phone';
import Error from '../../common/icons/Error';
import { UserStatus, ServerResponse } from '../../common/Enums';
import { ResourceContext } from '../../common/context/ResourceContext';
import { useSelector, useDispatch } from "react-redux";
import { fillCurrentUser, LoggerContactUs } from '../../common/Utility';
import { ifIsDesktop } from '../../common/Utility';

function ScanovateReferer(props) {
  const { register, handleSubmit, errors } = useForm();
  const [userStatus, setUserStatus] = useState();
  const [Activation, setActivation] = useState(0);
  const [useOtherphone, setUseOtherphone] = useState(false);
  const [useThisphone, setUseThisphone] = useState(false);
  const [checked, setChecked] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isDecleration, setDecleration] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [isLoaderBtn, setIsLoaderBtn] = useState(false);
  const [context, setContext] = useState({ firstName: "", lastName: "", id: "", phone: "", errorMessage: "", email: "" });
  const resources = useContext(ResourceContext);
  const dispatch = useDispatch();
  let redirectRDX = useSelector(state => state.redirect)
  let hasOpenCalls = useSelector(state => state.hasOpenCalls)
  const [hasOpenCallsState, SetHasOpenCalls] = useState(false);
  const handleAgreeChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
  }

  useEffect(() => {
    props.title("");
    let redirect = sessionStorage.getItem('redirect')
    let pathUrl = sessionStorage.getItem('pathUrl')
    let fast = false;
    if (pathUrl != null)
      dispatch({ type: 'pathUrl', payload: pathUrl })
    if (redirect != null) {
      dispatch({ type: 'redirect', payload: redirect })
      if (isFast(redirect)) {
        fast = true;
        dispatch({ type: 'isFast', payload: true })
      }
    }
    if (props.isReturn == true) {
      var data = JSON.parse(sessionStorage.getItem("ScanovateData"));
      setDetails(data);
    }
    else {
      setIsLoader(true);
      sendDecryptScanovate(fast);
    }
  }, []);

  const setDetails = (data) => {
    props.icon(<Phone />);
    setUserStatus(data.Details.UserStatus)
    setPhone(data.Details.PhoneNumber)
    setActivation(data.Details.Activation);
    setEmail(data.Details.Email)
    setDecleration(data.Details.IsDecleration);
  }
  let isDesktop = ifIsDesktop();
  const contactUs = () => {
    LoggerContactUs(hasOpenCallsState, resources['ScanovateReferer'], true);

    if (!hasOpenCallsState) {
      let res = {};
      res.process = "ContactUs";
      res.prev = "ScanovateReferer";
      res.code = "CameFromScanovateReferer";
      res.component = props.curcomponent;
      props.onResult(res);
    }
    else {
      ErrorDetails(ServerResponse.ALREADY_EXIST)

    }
  }

  const sendLogin = (data) => {
    let redirect = sessionStorage.getItem('redirect') == null ? redirectRDX : sessionStorage.getItem('redirect');
    setDisabled(true);
    setIsLoaderBtn(true);
    sendAuth("SCConfirmDetails", { FullPhone:data.phone !== undefined?data.phone.trim():null, Email: data.email, acceptActivation: checked, isThisPhone: useThisphone }).then(
      res => {
        if (res.status == 200) {

          if (res.data.Status == 0) {
            var dataObj = Object.assign({}, res.data.Details, { "path": redirect });
            sessionStorage.setItem('redirect', "/personal-info");
            // props.title('מעבירים אותך')
            props.onResult(dataObj);
          }
          else {
            if (res.data.Details.UserInputError == "DetailsNotValid") {
              setErrorMessage("יש להזין מספר תקין");
              setDisabled(false);
              setIsLoaderBtn(false);
            }
            else {
              ErrorDetails(res.data.Details.ProcessError);
            }
          }
        }
        else {
          FailedScanovate()
        }
      }
    );
  }


  const sendDecryptScanovate = (fast) => {
    let redirect = sessionStorage.getItem('redirect') == null ? redirectRDX : sessionStorage.getItem('redirect');
    let token = getQueryParameterByName("token");
    let isMock = getQueryParameterByName("isMock");
    let mockUserId = getQueryParameterByName("mockUserId");

    sendAuth("ElasticLogger", { elasticCode: '4529', MessageForUser: { infoTitle: '' } });
    sendAuth("SCDecryptScanovate", { Token: token, isMock: isMock, mockUserId: mockUserId, isFast: fast }).then(

      res => {
        setIsLoader(false);
        if (res.status == 200) {
          dispatch({ type: 'curUserDetails', payload: fillCurrentUser(res.data.Details.UserId, res.data.Details.PhoneNumber) })
          dispatch({ type: 'hasOpenCalls', payload: res.data.Details.hasOpenCalls })
          SetHasOpenCalls(res.data.Details.hasOpenCalls);
          if (res.data.Status == 0) {
            if (res.data.Details.ProcessSuccess == ServerResponse.NEED_DETAILS) {
              var dataObj = Object.assign({}, res.data.Details, { "path": redirect });
              sessionStorage.setItem('redirect', "/personal-info")
              props.onResult(dataObj);
            }
            else {
              sessionStorage.setItem("ScanovateData", JSON.stringify(res.data));
              setDetails(res.data);
            }
          }
          else {
            if (res.data.Details.TechnicalError == ServerResponse.SCANOVATEDECRYPTTOKEN) {
              props.icon(<Error />);
              if (fast == 0) {
                ErrorDetails("AuthenticationFailedSubTitle", "AuthenticationFailedTitle");
              }
              else
                FailedScanovate()
            }
            else {
              if (res.data.Details.ProcessError)//USER_NOT_VIEW_PERMISSIOM,LoginFailed
                ErrorDetails(res.data.Details.ProcessError, res.data.Details.ProcessError + ServerResponse.TITLE_ERROR);
              else if (res.data.Details.TechnicalError)
                ErrorDetails(res.data.Details.TechnicalError, res.data.Details.TechnicalError + ServerResponse.TITLE_ERROR);
              else
                ErrorDetails(res.data.Details.ProcessError);
            }
          }
        }
        else {
          props.icon(<Error />);
          if (fast == 0) {
            ErrorDetails("AuthenticationFailedSubTitle", "AuthenticationFailedTitle");
          }
          else
            FailedScanovate()
        }
      }
    );

  }
  const ErrorDetails = (code, codeTitle) => {
    let res = {};
    res.process = "ErrorDetails";
    res.code = code;
    res.codeTitle = codeTitle;
    res.componentName = "ScanovateReferer";
    props.onResult(res);
  }

  const FailedScanovate = () => {
    let res = {};
    res.process = "FailedScanovate";
    res.component = props.curcomponent;
    props.onResult(res);
  }

  const onChangeRadio = (event) => {
    if (event.target.id == "no") {
      setUseOtherphone(true);
      setUseThisphone(false);
    }
    else {
      setUseOtherphone(false);
      setUseThisphone(true);
    }
  }
  const submitOnEnter = (e) => {
    if (e.keyCode == 13) {
      handleSubmit(sendDecryptScanovate)()
    }
  }

  let ActivationComp =
    <>
      <Grid.Col xs={12}>
        <Checkbox
          label="אני מסכים לקבל הצעות לרכישת מוצרי חברות קבוצת הראל ושותפיה העסקיים בכל האמצעים שמסרתי לכם"
          id="agree1"
          name="agree1"
          checked={checked}
          onChange={handleAgreeChange}
        />
      </Grid.Col>
    </>

  let ServiceCondition =
    <>
      <Grid.Col xs={12}>
        <Typography Variant='body1' align='right'>
          מוסכמים עלי
         <a target="_blank" href={resources['TermsOfUse']}> תנאי השירות באתר האינטרנט </a> </Typography>
      </Grid.Col>
    </>

  let WithPhone =
    <>
      <Grid>
        <Grid.Col xs={12}>
          <Typography variant="h3" align="center" role="heading" aria-level="1"> עוד פרט קטן שנצטרך לוודא</Typography>
        </Grid.Col>
        <Grid.Col xs={12}>
          <Typography aria-level="2" variant="h6" align="center" role="presentation" id="radio"> האם הטלפון הנייד שלך הוא {!isDesktop ? <br /> : null} {phone}?</Typography>
        </Grid.Col>
        <Grid.Col xs={12} alignItems='center'>
          <Radio.Group
            required
            id="radio"
            name="radio"
            onChange={onChangeRadio}
            ref={register({
              required: true,
            })}
            error={!!errors.radio}
            helperText={
              errors.radio && errors.radio.type === "required" && <p id="errorradio" >יש לבחור אחד מהאפשרויות</p>
            }>
            <Radio label="כן" value="1" id="yes" aria-describedby="errorradio" />
            <Radio label="לא" value="2" id="no" />
          </Radio.Group>
        </Grid.Col>
        {useOtherphone &&
          <Grid.Col xs={12}>
            <TextField
              required
              id="phone"
              autoFocus
              numericKeyboard
              autoComplete="off"
              onKeyDown={submitOnEnter}
              defaultValue={context.phone}
              name="phone"
              maxLength="11"
              label="מספר טלפון נייד"
              ref={register({
                required: true,
                validate: {
                  isMobile: value => isMobile(value.trim())
                }
              })}
              error={!!errors.phone}
              helperText={
                errors.phone && errors.phone.type === "required" && "חובה להזין טלפון" ||
                errors.phone && errors.phone.type === "isMobile" && "חובה להזין מספר תקין"
              }
            />
          </Grid.Col>
        }

        {(isDecleration == 1 || (userStatus == UserStatus.NoRegisterWithPhone)) &&
          <Grid.Col xs={12}>
            <TextField
              required
              id="email"
              defaultValue={email}
              name="email"
              autoComplete="off"
              onKeyDown={submitOnEnter}
              label="דואר אלקטרוני"
              ref={register({
                required: true,
                validate: {
                  isEmail: value => isEmail(value)
                }
              })}
              error={!!errors.email}
              helperText={
                errors.email && errors.email.type === "required" && "חובה להזין אימייל" ||
                errors.email && errors.email.type === "isEmail" && "כתובת לא תקינה"
              }
            />
          </Grid.Col>
        }

        {
          Activation == 1 && ActivationComp
        }
        {(userStatus == UserStatus.NoRegisterWithPhone || isDecleration == 1) && ServiceCondition}
      </Grid>
    </>


  let WithOutPhone =
    <>
      <Grid>
        <Grid.Col xs={12}>
          <Typography variant='h2' align='center'>עוד פרט קטן שנצטרך לוודא</Typography>
        </Grid.Col>
        <Grid.Col xs={12}>
          <TextField
            required
            id="phone"
            autoFocus
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
              errors.phone && errors.phone.type === "required" && "חובה להזין טלפון נייד" ||
              errors.phone && errors.phone.type === "isMobile" && "חובה להזין מספר תקין"
            }
          />
        </Grid.Col>
        {(isDecleration == 1 || (userStatus == UserStatus.NoRegisterWithoutPhone)) &&
          <Grid.Col xs={12}>
            <TextField
              required
              id="email"
              defaultValue={email}
              name="email"
              autoComplete="off"
              onKeyDown={submitOnEnter}
              label="דואר אלקטרוני"
              ref={register({
                required: true,
                validate: {
                  isEmail: value => isEmail(value)
                }
              })}
              error={!!errors.email}
              helperText={
                errors.email && errors.email.type === "required" && "חובה להזין אימייל" ||
                errors.email && errors.email.type === "isEmail" && "כתובת לא תקינה"
              }
            />
          </Grid.Col>
        }

        {Activation == 1 && ActivationComp
        }
        {(userStatus == UserStatus.NoRegisterWithoutPhone || isDecleration == 1) && ServiceCondition}
      </Grid>
    </>

  // RegisterWithPhone=0,
  // RegisterWithoutPhone=1,
  // RegisterAndLock=3 - contactUs,
  // NoRegisterWithPhone=4,
  // NoRegisterWithoutPhone=5 

  return (

    <>

      <Modal.Body className="bodyStyle">
        {
          isLoader ?
            <Grid justify='center'>
              <div id="screenReaderOnly" role="alert">הפרטים בבדיקה</div>
              <Grid.Col xs={12}>
                <Typography role="alert" variant="h3" align="center"> הפרטים בבדיקה...</Typography>
              </Grid.Col>
              <Grid.Col>
                <Loader />
              </Grid.Col>
            </Grid>
            : null
        }

        {!isLoader && (userStatus == UserStatus.NoRegisterWithPhone || userStatus == UserStatus.RegisterWithPhone) ?
          WithPhone : null
        }
        {!isLoader && (userStatus == UserStatus.NoRegisterWithoutPhone || userStatus == UserStatus.RegisterWithoutPhone) ?
          WithOutPhone : null
        }
        <p className="errorScanovate">{errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        {(userStatus == UserStatus.NoRegisterWithPhone || userStatus == UserStatus.NoRegisterWithoutPhone) ?
          <p id='help'>עזרה? <button onClick={contactUs} aria-label="פניה לנציג תמיכה טכנית">
            תמיכה טכנית</button></p>
          : null
        }
        {!isLoader ?
          <Button variant="contained" onClick={handleSubmit(sendLogin)} disabled={disabled}>המשך{isLoaderBtn ? <>&nbsp;&nbsp;<Loader size={18} /></> : null}</Button>
          : null}
      </Modal.Footer>
    </>
  );

}
export default ScanovateReferer;
ScanovateReferer.displayName = 'ScanovateReferer';
