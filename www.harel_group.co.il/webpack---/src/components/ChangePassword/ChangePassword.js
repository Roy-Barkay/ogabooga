
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Grid, Typography, Modal, TextField, Button, Loader } from 'harelkit';
import IconPerson from '../../common/icons/Person';
import { useForm } from 'react-hook-form/dist/index.ie11';
import { sendAuth } from '../../common/services/AuthentacationService';
import { ResourceContext } from '../../common/context/ResourceContext';

const ChangePassword = (props) => {

  useEffect(() => {

    props.title('עדכון סיסמא');
    props.icon(<IconPerson />)
    props.closeBtn(false);

  }, []);
  const [oldPassword, setOldPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const { register, errors, handleSubmit, watch } = useForm({});
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const password = useRef({});
  const resources = useContext(ResourceContext);

  password.current = watch("password", "");


  const sendAuthData = (data) => {
    setIsLoading(true);
    setDisabled(true);
    sendAuth("SCChangePassword", { Password: data.oldPassword, NewPassword: data.password }).then(
      res => {
        setIsLoading(false);
        setDisabled(false);
        if (res.status == 200) {
          if (res.data.Status == 1 && res.data.Details.UserInputError == "InvalidPassword") {
            setErrorMessage(resources['ChangePasswordError']);
          }
          else {
            props.onResult(res.data.Details);
          }
        }
        else {
          ErrorDetails('');
        }
      })
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


  return (<>
    <Modal.Body>
      <Typography variant="h5" align="center" role="heading" aria-level="2">{resources['ChangePasswordAlert']}</Typography>
      <Typography variant="h5" align="center" role="heading" aria-level="2">{resources['ChangePasswordLengthAlert']}</Typography>
      <Grid>
        <Grid.Col xs={12}>
          <TextField
            onKeyDown={submitOnEnter}
            id="oldPassword"
            required
            name="oldPassword"
            type="Password"
            defaultValue={oldPassword}
            label="סיסמא נוכחית"
            maxLength="25"
            ref={register({
              required: true,
              pattern: /^.{2,25}$/i
            })}
            error={!!errors.oldPassword}
            helperText={
              errors.oldPassword && errors.oldPassword.type === "required" && "עליך להזין סיסמה" ||
              errors.oldPassword && errors.oldPassword.type === "pattern" && " עליך להזין סיסמה תקינה בין 2 ל- 25 תווים"
            }

          />
        </Grid.Col>
        <Grid.Col xs={12}>
          <TextField
            onKeyDown={submitOnEnter}
            label="סיסמא חדשה"
            id="password"
            required
            name="password"
            type="password"
            maxLength="25"
            ref={register({
              required: true,
              minLength: {
                value: 7
              }
            })}
            error={!!errors.password}
            helperText={
              errors.password && errors.password.type === "required" && "עליך להזין סיסמה" ||
              errors.password && errors.password.type === "minLength" && " עליך להזין סיסמה תקינה בין 7 ל- 25 תווים"
            }
          />

        </Grid.Col>
        <Grid.Col xs={12}>
          <TextField
            onKeyDown={submitOnEnter}
            label="אימות סיסמא חדשה"
            id="password_repeat"
            name="password_repeat"
            type="password"
            maxLength="25"
            ref={register({
              validate: value =>
                value === password.current || "The passwords do not match"
            })}
            error={!!errors.password_repeat}
            helperText={
              errors.password_repeat && errors.password_repeat.type === "validate" && "אימות סיסמא החדשה איננו תואם"
            }
          />
          <p className="errorScanovate" role="alert">{errorMessage}</p>
        </Grid.Col>
      </Grid>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="contained" onClick={handleSubmit(sendAuthData)} align="center" disabled={disabled}>
        המשך {isLoading ? <>&nbsp;&nbsp;<Loader size={18} /></> : null}
      </Button>
    </Modal.Footer>
  </>
  );

}
export default ChangePassword;
ChangePassword.displayName = 'ChangePassword';