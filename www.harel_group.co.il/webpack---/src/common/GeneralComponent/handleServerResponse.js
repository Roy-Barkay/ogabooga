import React, { useState, useCallback, useEffect, useContext } from 'react';

import PremissionScanovate from '../../components/PremissionScanovate/PremissionScanovate';
import ScanovateDesktop from '../../components/ScanovateDesktop/ScanovateDesktop';

import AuthenticationChoose from '../../components/AuthenticationChoose/AuthenticationChoose';
import ContactUs from '../../components/ContactUs/ContactUs';
import UserDetails from '../../components/UserDetails/UserDetails';
import ErrorDetails from '../../components/ErrorDetails/ErrorDetails';
import UserOtp from '../../components/UserOtp/UserOtp';
import OpenCalls from '../../components/OpenCalls/OpenCalls';
import FailedScanovate from '../../components/FailedScanovate/FailedScanovate';
import LoaderProcces from '../../components/LoaderProcces/LoaderProcces';
import ContactUsSuccess from '../../components/ContactUs/ContactUsSuccess';
import getCurrComponent from './getCurrComponent';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import PermanentPassword from '../../components/PermanentPassword/PermanentPassword';
import ChangePassSuccess from '../../components/ChangePassword/ChangePassSuccess';
import ActivationRegistrationOtp from '../../components/ActivationRegistrationOtp/ActivationRegistrationOtp';
import UserValidateDetailes from '../../components/UserValidateDetailes/UserValidateDetailes';
import { isFast, returnUrl, ifIsDesktop ,LoggerContactUs} from '../Utility';
import { ServerResponse, MapaProcess } from '../Enums';
import StrictAuthenticationMain from '../../components/StrictAuthenticationMain/StrictAuthenticationMain';
import AuthorizedMessage from '../../components/AuthorizedMessage/AuthorizedMessage';
import { GALogin } from '../GAManager';

export function handleServerResponse(res, changeIcon, changeTitle, handleComponentResult,changCloseBtn,redirect,changeOpen,dispatch,changeCurrentComponent) {
  
  let curComponent;
    if (res.ProcessSuccess == ServerResponse.USER_LOGGED_IN_SUCCESS && res.current) {
      dispatch({ type: 'curUserDetails', payload: res.current })
    }
    else if (res.process == "closeWindow") {
      if (returnUrl(res.componentName)) {
        window.location.href = res.pathUrl;
    }
      if (res.close) {
        changeOpen(false)
      }
    }
    if (res.process == "returnFromExit" || res.process == "returnFromContactUs") {
      curComponent = getCurrComponent(res.process, res.prev, changeIcon, changeTitle, handleComponentResult, changCloseBtn,res.details);
    }
    else if (res.process == "AuthenticationChoose") {
      curComponent = <AuthenticationChoose closeBtn={changCloseBtn} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} />;
    }
    else if (res.process == "PremissionScanovate") {
      curComponent = <PremissionScanovate closeBtn={changCloseBtn} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} />;
    }
    else if (res.process == "ScanovateDesktop") {
      curComponent = <ScanovateDesktop closeBtn={changCloseBtn} link={res.details.href} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} />;
    }
    else if (res.process == "ContactUs") {
      curComponent = <ContactUs closeBtn={changCloseBtn} reason={ServerResponse.GENERAL_CONTACT_US} code={res.code} isFromScreen={true} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} prevComponent={res.prev} details={res.details} />;
    }
    else if (res.process == "ContactUsSuccess") {
      curComponent = <ContactUsSuccess curcomponent={res.component} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} closeBtn={changCloseBtn}/>;
    }
    else if (res.process == "UserDetails") {
      curComponent = <UserDetails closeBtn={changCloseBtn} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} prevComponent={res.prev}/>;
    }
    else if (res.process == "ErrorDetails") {
      curComponent = <ErrorDetails code={res.code} curcomponentName={res.componentName} codeTitle={res.codeTitle} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} closeBtn={changCloseBtn}/>;
    }
    else if (res.process == "FailedScanovate") {
      curComponent = <FailedScanovate closeBtn={changCloseBtn} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} />;
    }
    else if (res.ProcessSuccess == ServerResponse.ACTIVATION_SCREEN) {
      curComponent = <ActivationRegistrationOtp closeBtn={changCloseBtn} icon={changeIcon} title={changeTitle} codeTitle={res.CodeTitle} isActivationScreenTrigger={res.IsActivationScreenTrigger} onResult={handleComponentResult} />;
    }
    else if (res.ProcessError == ServerResponse.VALIDATE_DETAILS) {
      curComponent = <UserValidateDetailes closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult}  hasOpenCalls={res.hasOpenCalls} />
    }
 
    else if (res.ProcessError == ServerResponse.USER_NOT_FOUND) {
      curComponent = <ContactUs closeBtn={changCloseBtn} reason={ServerResponse.GENERAL_CONTACT_US} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} prevComponent={res.prev} />;
    }
    else if (res.ProcessSuccess == ServerResponse.OTP_SENT) {
      curComponent = <UserOtp closeBtn={changCloseBtn} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} data={res} />;
    }
    else if (res.IsPowerOfAttorney == ServerResponse.HAS_POWWER_OF_ATTORNEY) {
      curComponent = <AuthorizedMessage closeBtn={changCloseBtn} userName={res.userName} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
    }
    else if (res.ClientHasOpenCalls == ServerResponse.HAS_OPEN_CALLS) {
      curComponent = <OpenCalls closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
    }

  else if (res.ClientHasOpenCalls == ServerResponse.HAS_OPEN_CALLS) {
    curComponent = <OpenCalls closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
  }

  else if (res.ClientHasOpenCalls == ServerResponse.HAS_NOT_OPEN_CALLS) {
    curComponent =endLogin(changeIcon, changeTitle, handleComponentResult,redirect,changCloseBtn,dispatch);
  }
  else if (res.ProcessSuccess == ServerResponse.REGISTRATION_SUCCESS) {
    curComponent = endLogin(changeIcon, changeTitle, handleComponentResult,redirect,changCloseBtn,dispatch);
  }
  else if (res.ProcessSuccess == ServerResponse.PERMANENT_PASSWORD) {
    curComponent = <PermanentPassword closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
  }
  else if (res.ProcessSuccess == ServerResponse.CHANGE_PASSWORD) {
    curComponent = <ChangePassword closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
  }
  else if (res.ProcessError == ServerResponse.ALREADY_EXIST) {
    curComponent = <ErrorDetails code={ServerResponse.ALREADY_EXIST} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} closeBtn={changCloseBtn} />;
  }
  else if (res.ProcessError == ServerResponse.USER_IS_BLOCKED) {
    LoggerContactUs(res.hasOpenCalls, "", false);
    if (res.hasOpenCalls)
      curComponent = <ErrorDetails code={ServerResponse.ALREADY_EXIST} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} closeBtn={changCloseBtn}/>;
    else
      curComponent = <ContactUs closeBtn={changCloseBtn} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} prevComponent={res.prev} />;
  }
  else if (res.ProcessSuccess == ServerResponse.NEED_DETAILS) {
    curComponent = <ContactUs closeBtn={changCloseBtn} reason={res.CustomerServiceReason} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} prevComponent={res.prev} />;
  }
  else if (res.TechnicalError) {
    curComponent = <ErrorDetails code={""} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} closeBtn={changCloseBtn}/>;
  }
  else if (res.ProcessSuccess == ServerResponse.CURRENT_PROCESS_BY_MAPA) {
    var isTab = (res.MapaProcess ==MapaProcess.StrictIdentificationChoice ||(res.IsScanovate=="True" && res.MapaProcess != MapaProcess.OTP))?true:false;
    curComponent = <StrictAuthenticationMain MapaProcess={res.MapaProcess} isTab={isTab} isDisplayScanovate={res.IsScanovate=="True"} closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
  }
  else if (res.ProcessSuccess == ServerResponse.PASSWORD_CHANGE_SUCCESS) {
    curComponent = <ChangePassSuccess closeBtn={changCloseBtn} isOpenCalls={res.ClientHasOpenCalls} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} prevComponent={res.prev} />;
  }
  else if (res.redirect == ServerResponse.REDIRECT) {
    curComponent = endLogin(changeIcon, changeTitle, handleComponentResult,redirect,changCloseBtn,dispatch);  }
  else {
    curComponent = <ErrorDetails code={""} icon={changeIcon} title={changeTitle} onResult={handleComponentResult} closeBtn={changCloseBtn}/>;
  }
  changeCurrentComponent(curComponent);
}
function endLogin(changeIcon, changeTitle, handleComponentResult,redirect,changCloseBtn,dispatch)
{
    changeTitle("מעבירים אותך");
    changeIcon();
    GALogin();   
    window.location.href = redirect == null ? "/personal-info" : redirect;
    dispatch({ type: 'redirect', payload: "/personal-info" })
    if(redirect.includes('#')){
    window.location.reload();}
    return  <LoaderProcces closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />;
}