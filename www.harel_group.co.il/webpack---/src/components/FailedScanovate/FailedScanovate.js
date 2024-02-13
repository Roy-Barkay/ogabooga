
import React, { useState, useEffect } from 'react';
import { Button, Typography, Modal, Grid, Loader } from 'harelkit';
import Error from '../../common/icons/Error';
import { sendAuth } from '../../common/services/AuthentacationService';
import { useSelector } from "react-redux";
import { ifIsDesktop } from '../../common/Utility';

function FailedScanovate(props) {
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let redirect = useSelector(state => state.redirect);
  let isFast = useSelector(state => state.isFast);

  useEffect(() => {
    props.title('הזדהות בוידאו נכשלה');
    props.icon(<Error />)

  }, []);

  const DetailsBeforGetCode = () => {
    let res = {};
    res.process = "UserDetails";
    res.component = props.curcomponent;
    res.prev = "FailedScanovate";
    props.onResult(res);
  }

  const getUrl = () => {
    let isDesk = ifIsDesktop();
    setDisabled(true)
    setIsLoading(true);
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
            if (res.data.Details.isMaxTries) {
              contactUs()
            }
            else {
              setIsLoading(false);
              setDisabled(false)
              FailedScanovate();
            }
          }
        }
        else {
          setIsLoading(false);
          setDisabled(false)
          FailedScanovate();
        }
      });
  }

  function contactUs() {
    let res = {};
    res.prev = "FailedScanovate";
    res.process = "ContactUs";
    res.code = "CameFromFailedScanovate";
    res.component = props.curcomponent;
    props.onResult(res);

  }
  const FailedScanovate = () => {
    let res = {};
    res.process = "FailedScanovate";
    res.component = props.curcomponent;
    props.onResult(res);

  }
  return (
    <>

      <Modal.Body>
        <Typography aria-level="2" variant="h6" align="center">אפשר לנסות להזדהות שוב</Typography>
      </Modal.Body>
      <Modal.Footer>
        <Grid justify="center">

          <Grid.Col xs={7}>

            <Button variant="outlined" disabled={disabled} onClick={DetailsBeforGetCode}>קבלת קוד לטלפון</Button>
          </Grid.Col>
          {!ifIsDesktop()?
          <Grid.Col xs={5}>
            <Button variant="contained" onClick={getUrl} disabled={disabled}>  {isLoading ? <>&nbsp;&nbsp;<Loader size={18} /></> : 'נסה שנית'}</Button>
          </Grid.Col>:null
}
        </Grid>
      </Modal.Footer>
    </>

  );

}


export default FailedScanovate;
FailedScanovate.displayName = 'FailedScanovate';