import React, { useState, useEffect } from 'react';
import IconPerson from '../../common/icons/Person';
import { Grid, Typography, Modal, TextField, Button, Loader } from 'harelkit';
import { useForm } from 'react-hook-form/dist/index.ie11';
import {  isIdNumber } from 'harelutils';
import {isMobile} from '../../common/validations'
import { sendAuth } from '../../common/services/AuthentacationService';
import { fillCurrentUser, ifIsDesktop } from '../../common/Utility';
import { useDispatch, useSelector } from "react-redux";
import { ServerResponse, ScreensNames } from '../../common/Enums';



function UserDetails(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const [context] = useState({ id: "", phone: "", errorMessage: "" });
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let isFast = useSelector(state => state.isFast)

  useEffect(() => {
    sendAuth("ElasticLogger", { general: { action_code: '4531', source_system_area_code: isFast ? '50' : '51', system_code: '239' }, MessageForUser: { infoTitle: '' } });
    props.title(props.powerOfAttorney ? 'כניסה כמיופה כוח' : 'קבלת קוד לטלפון');
    props.icon(<IconPerson />);
    props.closeBtn(false);

  }, []);
  const sendAuthData = (data) => {
    setIsLoading(true);
    setDisabled(true);
    dispatch({ type: 'curUserDetails', payload: fillCurrentUser(data.uid, data.phone) })
    sendAuth("StartProcess", { UserId: data.uid.trim(), FullPhone: data.phone.trim(), isFast: isFast }).then(
      res => {
        setIsLoading(false);
        setDisabled(false);
        if (res.status == 200) {
          dispatch({ type: 'hasOpenCalls', payload: res.data.Details.hasOpenCalls })

          if (res.data.Status == 0) {
            props.onResult(res.data.Details);
          }
          else {
            if (res.data.Details.ProcessError == ServerResponse.USER_NOT_VIEW_PERMISSIOM)
              ErrorDetails(res.data.Details.ProcessError, res.data.Details.ProcessError + ServerResponse.TITLE_ERROR);
            else if (res.data.Details.TechnicalError)//UserDetailsService,ClientExtraDetailsService,PrepareDataUser,ADFail
              ErrorDetails(res.data.Details.TechnicalError, res.data.Details.TechnicalError + ServerResponse.TITLE_ERROR);
            else
              props.onResult(res.data.Details);
          }
        }
        else
          ErrorDetails('')

      }
    );
  }
  const submitOnEnter = (e) => {
    if (e.keyCode == 13) {
      handleSubmit(sendAuthData)()
    }
  }
  const PremissionScanovate = () => {
    let res = {};
    res.process = "AuthenticationChoose";
    props.onResult(res);
  }

  const ErrorDetails = (val, codeTitle) => {
    let res = {};
    res.process = "ErrorDetails";
    res.code = val;
    res.codeTitle = codeTitle;
    props.onResult(res);
  }
  const getFocuse = () => {
    document.querySelector('input[name="uid"]').focus();
  }

  const subTitle = () => {
    if(props.prevComponent == "AuthenticationChoose" )
      return null;
    if (props.powerOfAttorney)
      return  <Typography variant="h5" align="center" role="heading" aria-level="2">יש להקליד ת.ז של בעל החשבון ומספר טלפון נייד של מיופה הכוח</Typography>
    else
      return  <Typography variant="h5" align="center" role="heading" aria-level="2">אנחנו רוצים לוודא שנציג את<br /> המידע שלך לעיניך בלבד</Typography>
    }
  
  return (
    <>
      <Modal.Body className="bodyStyle">
        <Grid>
          <Grid.Col xs={12}>
            {subTitle()}
          </Grid.Col>
          <Grid.Col xs={12}>
            <TextField
              required
              onClick={getFocuse}
              autoComplete="off"
              numericKeyboard
              id="uid"
              onKeyDown={submitOnEnter}
              defaultValue={context.id}
              name="uid"
              maxLength="9"
              label="תעודת זהות"
              ref={register({
                required: true,
                validate: {
                  isIdNumber: value => isIdNumber(value.trim())
                }
              })}
              error={!!errors.uid}
              helperText={
                errors.uid && errors.uid.type === "required" && "חובה להזין תעודת זהות" ||
                errors.uid && errors.uid.type === "isIdNumber" && "חובה להזין תעודת זהות תקינה"
              }
            />
          </Grid.Col>
          <Grid.Col xs={12}>
            <TextField
              numericKeyboard
              required
              autoComplete="off"
              onKeyDown={submitOnEnter}
              defaultValue={context.phone}
              name="phone"
              id="phone"
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
        </Grid>

      </Modal.Body>
      <Modal.Footer>
        <Grid justify="center">{
          (!isFast || window.IsShowScanovate=="false"  || props.prevComponent == "FailedScanovate") ? null : <Grid.Col>
            <Button variant="outlined" onClick={PremissionScanovate} disabled={disabled}>חזרה</Button>
          </Grid.Col>
        }
          <Grid.Col>
            <Button variant="contained" onClick={handleSubmit(sendAuthData)} align="center" disabled={disabled}>
              המשך {isLoading ? <>&nbsp;&nbsp;<Loader size={18} /></> : null}
            </Button>
          </Grid.Col>
        </Grid>
      </Modal.Footer>
    </>
  );

}

export default UserDetails;
UserDetails.displayName = 'UserDetails';
