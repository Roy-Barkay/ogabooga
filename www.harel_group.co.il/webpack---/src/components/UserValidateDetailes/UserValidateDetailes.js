
import React, { useState, useContext, useEffect } from 'react';
import IconPerson from '../../common/icons/Person';
import { Grid, Typography, Modal, TextField, Button, Loader } from 'harelkit';
import { useForm } from 'react-hook-form/dist/index.ie11';
import {  isIdNumber } from 'harelutils';
import {isMobile} from '../../common/validations'
import { sendAuth } from '../../common/services/AuthentacationService';
import { useDispatch, useSelector } from "react-redux";
import { ResourceContext } from '../../common/context/ResourceContext';
import { ServerResponse } from '../../common/Enums';

function UserValidateDetailes(props) {
  const dispatch = useDispatch();
  let curUser = useSelector(state => state.curUserDetails)
  const { register, handleSubmit, errors } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let redirect = useSelector(state => state.redirect)
  const resources = useContext(ResourceContext);

  useEffect(() => {
    props.title('בטוח שלזה התכוונת?');
    props.icon(<IconPerson />)
    props.closeBtn(false);

    dispatch({ type: 'hasOpenCalls', payload: props.hasOpenCalls })

    setTimeout(() => {
      if (!(['iPad', 'iPhone'].includes(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document))) {
        document.querySelector('input[name="uid"]').focus();
      }
    }, 0);
  }, []);

  const sendValidateDetails = (data) => {

    setIsLoading(true);
    setDisabled(true);
    curUser = {};
    curUser.uid = data.uid;
    curUser.phone = data.phone;
    dispatch({ type: 'curUserDetails', payload: curUser })

    sendAuth("ValidateUserDetails", { UserId: data.uid.trim(), FullPhone: data.phone.trim(), isFromScreen: true }).then(
      res => {
        setIsLoading(false);
        setDisabled(false);
        if (res.status == 200) {

          if (res.data.Details.UserInputError == ServerResponse.DETAILS_NOT_VALID) {
            setErrorMessage(resources['ErrorMsgDetailsNotValid']);
          }
          else if (res.data.Details.ProcessError==ServerResponse.LOGIN_FAILED)//LoginFailed
              ErrorDetails(res.data.Details.ProcessError , res.data.Details.ProcessError + ServerResponse.TITLE_ERROR ); 
         else {
            var dataObj = Object.assign({}, res.data.Details, { "path": redirect });
            props.onResult(dataObj);
          }
        }
        else {
          //שגיאה טכנית
          ErrorDetails('')

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
      handleSubmit(sendValidateDetails)()
    }
  }

  return (
    <>

      <Modal.Body className="bodyStyle">
        <Grid>
          <Grid.Col xs={12}>
            <Typography variant="h5" align="center" role="heading" aria-level="2">להמשך התחברות לאתר הראל,<br />נבקש לוודא שאלה הפרטים הנכונים שלך:</Typography>
          </Grid.Col>

          <Grid.Col xs={12}>
            <TextField
              autoFocus
              numericKeyboard
              autoComplete="off"
              onKeyDown={submitOnEnter}
              defaultValue={curUser.uid}
              id="uid"
              required
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
              autoComplete="off"
              onKeyDown={submitOnEnter}
              defaultValue={curUser.phone}
              id="phone"
              required
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
            <p className="errorScanovate">{errorMessage}</p>
          </Grid.Col>
        </Grid>

      </Modal.Body>
      <Modal.Footer>
        <Grid justify="center">
          <Grid.Col>
            <Button variant="contained" onClick={handleSubmit(sendValidateDetails)} align="center" disabled={disabled}>
              המשך {isLoading ? <>&nbsp;&nbsp;<Loader size={18} /></> : null}
            </Button>
          </Grid.Col>
        </Grid>
      </Modal.Footer>
    </>


  );

}

export default UserValidateDetailes;
UserValidateDetailes.displayName = 'UserValidateDetailes';
