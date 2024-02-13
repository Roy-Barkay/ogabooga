import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form/dist/index.ie11';
import { sendAuth } from '../../common/services/AuthentacationService';
import IconPerson from '../../common/icons/Person';
import './PremissionScanovate.css';
import { Button, Grid, Checkbox, Typography, Modal, Loader } from 'harelkit';
import { ResourceContext } from '../../common/context/ResourceContext';
import { useSelector } from "react-redux";
import { ifIsDesktop } from '../../common/Utility';


function PremissionScanovate(props) {
  const { register, handleSubmit, errors } = useForm();
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isLoader, setIsloader] = useState(false);
  let redirect = useSelector(state => state.redirect);
  let isFast = useSelector(state => state.isFast);

  useEffect(() => {
    props.title('זיהוי פנים');
    props.icon(<IconPerson />)
    props.closeBtn(false);

  }, []);

  const resources = useContext(ResourceContext);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
  }




  const DetailsBeforGetCode = () => {
    sendAuth("ElasticLogger", { general: { action_code: '4527', source_system_area_code: '50', system_code: '239' }, MessageForUser: { infoTitle: '' } });
    let res = {};
    res.process = "AuthenticationChoose";
    res.component = props.curcomponent;
    props.onResult(res);
  }

  const FailedScanovate = () => {
    let res = {};
    res.process = "FailedScanovate";
    res.component = props.curcomponent;
    props.onResult(res);

  }
  const getUrl = () => {
    let isDesk = ifIsDesktop();
   
      setDisabled(true)
      setIsloader(true)
      sendAuth("SCGetUrl", { url: redirect, fast: isFast ? 1 : 0 ,isDesktop:isDesk}).then(
        result => {
          if (result.status == 200) {
            if (result.data.Status == 0) {
              if (isDesk) {
                let res = {};
                res.process = "ScanovateDesktop";
                res.component = props.curcomponent;
                res.details={href:result.data.Details.link};
                props.onResult(res);
              }
              else {
              window.location.href = result.data.Details.link;
              }
            }
            else {
              FailedScanovate();
            }
          }
          else {
            console.log("error data");
            FailedScanovate();
          }
        });
    }
  
  const submitOnEnter = (e) => {
    if (e.keyCode == 13) {
      handleSubmit(getUrl)()
    }
  }


  return (
    <>
      <Modal.Body justify="center" className="bodyStyle">
        <Grid>
          <Grid.Col xs={12}>
            <Typography aria-level="2" variant="h6" align="center" role="heading" aria-level="2">לפני שנצלם את פניך ואת תעודת הזהות שלך, נבקש את אישורך לדבר המחלקה המשפטית</Typography>
          </Grid.Col>
          <Grid.Col xs={12}>
            <Checkbox
              role="alert"
              required
              id="agree"
              onKeyDown={submitOnEnter}
              name="agree"
              checked={checked}
              error={!!errors.agree}
              ref={register({ required: true })}
              onChange={handleChange}
              helperText={errors.agree && errors.agree.type === "required" && "כדי להמשיך יש לאשר את מדיניות הפרטיות"}
              align="right"
            >
              מוסכמת עלי <a target="_blank" href={resources['PrivacyPolicy']}> מדיניות הפרטיות </a> של החברה
            </Checkbox>
          </Grid.Col>
          <Grid.Col>
            <Typography variant="body2" align="center">המידע ישמש לצורך הזיהוי בבקשה זו ובבקשות עתידיות לגופים המוסדיים בקבוצת הראל</Typography>
          </Grid.Col>
        </Grid>
      </Modal.Body>

      <Modal.Footer>
        <Grid justify="center">
          <Grid.Col>
            <Button variant="outlined" onClick={DetailsBeforGetCode} disabled={disabled}>חזרה</Button>
          </Grid.Col>
          <Grid.Col>
            <Button variant="contained" onClick={handleSubmit(getUrl)} disabled={disabled}> המשך{isLoader ? <>&nbsp;&nbsp;<Loader size={18} /></> : null}</Button>
          </Grid.Col>
        </Grid>
      </Modal.Footer>

    </>
  );

}


export default PremissionScanovate;
PremissionScanovate.displayName = 'PremissionScanovate';
