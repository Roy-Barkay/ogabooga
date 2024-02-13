
import React, { useState, useEffect } from 'react';
import { Grid, Modal, TextField, Button, Loader } from 'harelkit';
import IconPerson from '../../common/icons/Person';
import { useForm } from 'react-hook-form/dist/index.ie11';
import { sendAuth } from '../../common/services/AuthentacationService';
import { useSelector } from "react-redux";
const PermanentPassword = (props) => {

        const { register, handleSubmit, errors } = useForm();
        const [password, setPassword] = useState("")
        const [errorMessage, setErrorMessage] = useState("");
        const [disabled, setDisabled] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        let redirect = useSelector(state => state.redirect)

        useEffect(() => {
                props.title('הזן את הסיסמא הקבועה שלך');
                props.icon(<IconPerson />);
                props.closeBtn(false);

                setTimeout(() => {
                        if (!(['iPad', 'iPhone'].includes(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document))) {
                                document.querySelector('input[name="Password"]').focus();
                        }
                }, 0);
        }, []);

        const sendAuthData = (data) => {
                setIsLoading(true);
                setDisabled(true);
                sendAuth("SCValidatePassword", { Password: data.Password }).then(
                        res => {
                                setIsLoading(false);
                                setDisabled(false);
                                if (res.status == 200) {
                                        if (res.data.Status == 1 && res.data.Details.UserInputError == "InvalidPassword") {
                                                setErrorMessage('הסיסמה אינה תקינה');

                                        }
                                        else {
                                                var dataObj = Object.assign({}, res.data.Details, { "path": redirect });
                                                props.onResult(dataObj);
                                        }
                                }
                                else {
                                        //שגיאה טכנית
                                        // ErrorDetails('')
                                }
                        }
                )
        }

        const submitOnEnter = (e) => {
                if (e.keyCode == 13) {
                        handleSubmit(sendAuthData)()
                }
        }
        return (<>
                <Modal.Body className="bodyStyle">
                        <Grid>
                                <Grid.Col xs={12}>
                                        <TextField
                                                autoFocus
                                                required
                                                id="Password"
                                                name="Password"
                                                type="Password"
                                                defaultValue={password}
                                                autoComplete="off"
                                                onKeyDown={submitOnEnter}
                                                label="סיסמא"
                                                maxLength="25"
                                                ref={register({
                                                        required: true,
                                                        pattern: /^.{7,25}$/i
                                                })}
                                                error={!!errors.Password}
                                                helperText={
                                                        errors.Password && errors.Password.type === "required" && "עליך להזין סיסמה" ||
                                                        errors.Password && errors.Password.type === "pattern" && " עליך להזין סיסמה תקינה בין 7 ל- 25 תווים"
                                                }

                                        />
                                </Grid.Col>

                        </Grid>
                        <p className="errorScanovate" role="alert">{errorMessage}</p>
                </Modal.Body>
                <Modal.Footer>

                        <Button variant="contained" onClick={handleSubmit(sendAuthData)} align="center" disabled={disabled}>

                                התחבר {isLoading ? <>&nbsp;&nbsp;<Loader size={18} /></> : null}
                        </Button>
                </Modal.Footer>
        </>
        );

}

export default PermanentPassword;
PermanentPassword.displayName = 'PermanentPassword';