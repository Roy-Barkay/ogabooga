
import React, { useState, useContext, useCallback, useEffect } from 'react';
import IconEnvelope from '../../common/icons/Envelope';
import { Grid, Typography, Modal, TextField, Button, Loader, Checkbox } from 'harelkit';
import { useForm } from 'react-hook-form/dist/index.ie11';
import { isEmail } from 'harelutils';
import { sendAuth } from '../../common/services/AuthentacationService';
import { ResourceContext } from '../../common/context/ResourceContext';
import { useDispatch ,useSelector} from "react-redux";
import { LoggerContactUs } from '../../common/Utility';
import { ServerResponse } from '../../common/Enums';


function ActivationRegistrationOtp(props) {

  const { register, handleSubmit, errors } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [isLoader, setIsloader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uid, setUid] = useState('');
  const [phone, setPhone] = useState('');
  const [checked, setChecked] = useState(false);
  const resources = useContext(ResourceContext);
  const dispatch = useDispatch();
  let curUser = useSelector(state => state.externalUserDetails)
  let redirect = useSelector(state => state.redirect)
  let hasOpenCalls = useSelector(state => state.hasOpenCalls)

  useEffect(() => {
    const { codeTitle } = props
    props.title(resources[codeTitle] || 'השלמת הרשמה לאתר הראל');
    props.icon(<IconEnvelope />);
    props.closeBtn(false);

  }, []);

  const sendUpdateDetails = (data) => {
    const { isActivationScreenTrigger } = props
    setDisabled(true)
    setIsloader(true)
    sendAuth("UpdateDetails", {
      QS: document.location.search,
      isFillDetails: true,
      Email: data.email,
      acceptActivation: checked,
      isActivationScreenTrigger,
      isEmailActivationTrigger: curUser.emailNeedsVerification === 1,
      isNewsletterTrigger: curUser.isActivation === 1
    }).then(
      res => {
        if (res.status == 200) {
          if (res.data.Status == 0) {
            var dataObj = Object.assign({}, res.data.Details, {"path":redirect});
            props.onResult(dataObj);
          }
          else {
            if (res.data.Details.UserInputError == "EmailInvalid") {
              setErrorMessage(resources['ErrorMsgEmailInvalid']);
            }
            else {
              props.onResult(res.data.Details);
            }
          }
        }
        else {
          ErrorDetails('');
        }

      });
  }
  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
  }

  const contactUs = () => {
    LoggerContactUs(hasOpenCalls,resources['ActivationRegistrationOtp'],true);

    if(!hasOpenCalls)
    {
      let res = {};
      res.prev = "ActivationRegistrationOtp";
      res.code = "CameFromActivationRegistrationOtp"
      res.process = "ContactUs";
      props.onResult(res);
    }
    else
    {
      ErrorDetails(ServerResponse.ALREADY_EXIST)
    }

  }


  const ErrorDetails = (val) => {
    let res = {};
    res.process = "ErrorDetails";
    res.code = val;
    props.onResult(res);
  }

  return (
    <>
      <Modal.Body justify="center">
        <Grid>
          <Grid.Col xs={12}>
            <TextField
            required
            id="email"
              name="email"
              autoComplete="off"
              defaultValue={curUser.email || ""}
              label="כתובת דואר אלקטרוני"
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
          <Grid.Col xs={12}>
            {curUser.isActivation ? <Checkbox
              name="agree"
              checked={checked}
              error={!!errors.agree}
              onChange={handleChange}
              align="right"
            >
              אני מסכים לקבל הצעות לרכישת מוצרי חברות קבוצת הראל ושותפיה העסקיים בכל האמצעים שמסרתי לכם
            </Checkbox> : null}
          </Grid.Col>

           { !curUser.isDecleration ?
            <Grid.Col>
              <Typography Variant='body1' align='right'>
              מוסכמים עלי <a target="_blank" href={decodeURIComponent(resources['TermsOfUse'])}> תנאי השירות באתר</a> ו<a target="_blank" href={decodeURIComponent(resources['PrivacyPolicy'])}>מדיניות הפרטיות של החברה</a>
               
              </Typography>
            </Grid.Col>
            : null}
          <Grid.Col>
            <Typography variant="body2" align="right">המידע ישמש לצורך הזיהוי בבקשה זו ובבקשות עתידיות לגופים המוסדיים בקבוצת הראל</Typography>
          </Grid.Col>
          <Grid.Col xs={12}>
            <p id='help'>עזרה? <button onClick={contactUs} aria-label="פניה לנציג תמיכה טכנית" > 
             תמיכה טכנית</button>
             </p>
          </Grid.Col>
        </Grid>
        <p className="errorScanovate">{errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Grid justify="center">
          <Grid.Col>
            <Button variant="contained" onClick={handleSubmit(sendUpdateDetails)} disabled={disabled}> אישור והמשך{isLoader ? <>&nbsp;&nbsp;<Loader size={18} /></> : null}</Button>
          </Grid.Col>
        </Grid>
      </Modal.Footer>
    </>
  );
}

export default ActivationRegistrationOtp;
ActivationRegistrationOtp.displayName = 'ActivationRegistrationOtp';