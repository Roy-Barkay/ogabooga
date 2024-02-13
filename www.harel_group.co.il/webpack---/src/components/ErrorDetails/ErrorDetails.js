
import React, { useContext, useEffect } from 'react';
import { Button, Typography, Modal } from 'harelkit';
import { ResourceContext } from '../../common/context/ResourceContext';
import Error from '../../common/icons/Error';
import { useSelector } from "react-redux";
import {  ServerResponse } from '../../common/Enums';


function ErrorDetails(props) {
  let pathUrl = useSelector(state => state.pathUrl) 
  const resources = useContext(ResourceContext);   
  useEffect(() => {   
    if (props.codeTitle && props.codeTitle != "" )
      props.title(resources[props.codeTitle]);
    else
      props.title(resources[ServerResponse.DEFAULT_ERROR_MSG + ServerResponse.TITLE_ERROR]);
    props.icon(<Error />)
    props.closeBtn(true);

    setTimeout(() => {
      if (!(['iPad', 'iPhone'].includes(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document))) {
        document.querySelector('#modal-description button:first-child').focus();
      }
    }, 0);
  }, []);

  
  const closeWindow = () => {
    let res = {};
    res.process = "closeWindow";
    res.close = true;
    res.componentName = props.curcomponentName;
    res.pathUrl=pathUrl;
    props.onResult(res);
  }



  return (
    <>
      <Modal.Body>
        <Typography aria-level="2" variant="h6" align="center">
         {props.code ? resources[props.code] : resources[ServerResponse.DEFAULT_ERROR_MSG]}
        </Typography>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="contained" onClick={closeWindow}>הבנתי</Button>
      </Modal.Footer>

    </>

  );

}


export default ErrorDetails;
ErrorDetails.displayName = 'ErrorDetails';