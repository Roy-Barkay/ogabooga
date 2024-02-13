
import useStyles from './PersonalConnect.style';
import { Field, Form, withFormik } from 'formik';
import axios from 'axios';
import React from 'react';
import { Loader,Progress, Button, TextField, Select } from 'common-ui';
import { Validator } from 'common-utils';
import { isMobile } from 'react-device-detect';
import { sendAuth } from '../../common/services/AuthentacationService';

const Option = Select.Option;

function PersonalConnect(props) {
    const { values, errors, handleSubmit, isSubmitting, validateForm , isValid} = props;

    React.useEffect(() => {
        validateForm(values);
      
    }, []);
    //const isValid = !Object.keys(errors).length;

    const classes = useStyles();

    const checkInvalidForFocus = () => {
        setTimeout(() => {
            let element = document.querySelectorAll('input[aria-invalid]:not([aria-invalid="false"])');
            if(element.length>0)
                element = element[0]
            if (element && element.focus) {
                element.focus();
            }
        }, 15);
    };

    return (
        <div >
           
           <Form onSubmit={handleSubmit} noValidate onKeyDown={(e) => {
                if (e.keyCode === 13) {
               
                    console.log('before submit');
                    setTimeout(handleSubmit, 500);
                }
            }}>
                <div className={classes.root} >
                    <div>
                        <Field
                            autoComplete='off'
                            required
                            name='idUser'
                            type='tel'
                            id='idUser'
                            helperText='' 
                           
                           
                            //placeholder='מספר תעודת זהות'                          
                            label='מספר תעודת זהות'
                            component={TextField}
                            value={values.idUser}
                            data-hrl-bo="atm-personalMenuIdField"
                        />
                    </div>
                    <div>
                        <Field
                            autoComplete='off'
                            required
                            name='phone'
                            type='tel'
                            id='phone'
                            helperText=''
                           
                            //placeholder='מספר טלפון נייד'                            
                            label='מספר טלפון נייד'
                            component={TextField}
                            value={values.phone}
                            data-hrl-bo="atm-personalMenuPhoneField"
                        />
                    </div>
                    <div>
                        <Button className={classes.connectBtn}
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={isSubmitting}
                            data-hrl-bo="atm-personalMenuLogin"
                         onClick={checkInvalidForFocus}
                        >
                         {isSubmitting ? <Progress size={30} /> : null}
                         
                            <div>

                                <span>כניסה</span>
                            </div>

                          
                           
                        </Button>
                    </div>
                    <div>
                   
                        {/* {  <pre style={{ textAlign: 'left', direction: 'ltr' }}>
                            {JSON.stringify(values, null, 2)}
                        </pre> } */}
                    </div>
                </div>
            </Form>
        </div>
    );
}
export default withFormik({
    mapPropsToValues: props => ({
        idUser: '',
        phone: '',
        isConnect:false,
    }),
    validate: values => {
        const errors = {};
        if (!Validator(values.idUser).required()) {
            errors.idUser = 'יש להזין מספר תעודת זהות';
        }
        else if (!Validator(values.idUser).id()) {
            errors.idUser = 'מספר תעודת הזהות אינו תקין';
        }
        if (!Validator(values.phone).required()) {
            errors.phone = 'יש להזין מספר טלפון נייד';
        }
        else if (!Validator(values.phone.trim()).phone()) {
            errors.phone = 'מספר טלפון אינו תקין';
        }
        return errors;
    },
    handleSubmit: (values, { resetForm, setSubmitting, isSubmitting, props }) => {
        let curUser = {};
        let isDesktop = !isMobile;
        var destUrl = '/personal-info/my-harel/Pages/client-view.aspx';
        curUser.UserId = values.idUser.trim();
        curUser.FullPhone = values.phone.trim();
        if (values.isConnect == false) {
            values.isConnect = true;
            sendAuth("ContextConfig", { ContextJson: { LogTypCurrentPlatform: isDesktop ? 1 : 2 } ,from: "CustomerRouting" })
                .then(() => {
                    sendAuth("ElasticLogger", { general: { action_code: '2077', system_code: '218' }, MessageForUser: { infoTitle: '' } , entityELCustomerRouting: { Action: 9999, Topic: 9999,DestinationUrlWithParams: destUrl, DestinationUrl:destUrl}})
                        .then(() => {
                            sendAuth("ElasticLogger", { general: { action_code: '4524', system_code: '218' }, MessageForUser: { infoTitle: '' } })
                                .then(() => {
                                    sendAuth("PortalLogger", { actionLog: { Id: 0, SuccessMessage: 'AL00',FailureMessage:''}, success: true ,actionContent:'לא פעולה מהירה'})
                                        .then(() => {
                                            axios.post(
                                                `${process.env.REACT_APP_BASE_URL}/_vti_bin/webapi/CustomersAuthentication/PostAuthenticate/StartProcess`, curUser)
                                                .then((response) => {
                                                    if (response.data.Details.hasOpenContactCalls) {
                                                        sessionStorage.setItem("checkOpenCalls", "hasOpenCalls");
                                                    }
                                                    var obj = Object.assign({}, response.data, curUser);
                                                    window.postMessage(obj, "*");
                                                    setSubmitting(false);
                                                    if (props.connectClick)
                                                        props.connectClick();
                                                })
                                                .catch((error) => {
                                                    console.log(error);

            
                                                    setSubmitting(false);

            
                                                    if (props.connectClick)
                                                        props.connectClick();
                                                })
                                        })
                                })
                        });
                    });
                }
    },

    })(PersonalConnect);


