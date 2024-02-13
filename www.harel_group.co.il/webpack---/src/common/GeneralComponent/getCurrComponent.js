import React from 'react'
import AuthenticationChoose from '../../components/AuthenticationChoose/AuthenticationChoose';
import PremissionScanovate from '../../components/PremissionScanovate/PremissionScanovate';
import ContactUs from '../../components/ContactUs/ContactUs';
import UserOtp from '../../components/UserOtp/UserOtp';
import UserDetails from '../../components/UserDetails/UserDetails';
import UserValidationDetails from '../../components/UserValidateDetailes/UserValidateDetailes';
import StrictAuthenticateIdAndCreditcard from '../../components/StrictAuthenticateIdAndCreditcard/StrictAuthonticateIdAndCreditcard';
import StrictAuthonticateIdAndCreditcardOrScanovate from '../../components/StrictAuthonticateIdAndCreditcardOrScanovate/StrictAuthonticateIdAndCreditcardOrScanovate';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import ScanovateReferer from '../../components/ScanovateReferer/ScanovateReferer';
import ActivationRegistrationOtp from '../../components/ActivationRegistrationOtp/ActivationRegistrationOtp';
import StrictAuthenticationMain from '../../components/StrictAuthenticationMain/StrictAuthenticationMain';
import { ServerResponse, MapaProcess } from '../Enums';

const getCurrComponent = (process, prev, changeIcon, changeTitle, handleComponentResult, changCloseBtn, details) => {

  var prevComponent = '';
  if (process == "returnFromContactUs") {
    if (prev == "ActivationRegistrationOtp") {
      prevComponent = <ActivationRegistrationOtp closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
    }
    if (prev == "AuthenticationChoose") {
      prevComponent = <AuthenticationChoose closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
    }
 
    if (prev == "PremissionScanovate") {
      prevComponent = <PremissionScanovate closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
    }
    if (prev == "UserDetails") {
      prevComponent = <UserDetails closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
    }
    if (prev == "ContactUs") {
      prevComponent = <ContactUs title={changeTitle} icon={changeIcon} closeBtn={changCloseBtn} onResult={handleComponentResult} />
    }
    if (prev == "UserOtp") {
      prevComponent = <UserOtp closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
    }
    if (prev == "UserValidationDetails") {
      prevComponent = <UserValidationDetails closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
    }
    if (prev == "ChangePassword") {
      prevComponent = <ChangePassword  closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
    }
    if (prev == "StrictAuthenticateIdAndCreditcard") {
      prevComponent = <StrictAuthenticateIdAndCreditcard closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
    }
    if (prev == "ScanovateReferer") {
      prevComponent = <ScanovateReferer isReturn={true} closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
    }
    if (prev == "StrictAuthonticateIdAndCreditcardOrScanovate") {
      prevComponent = <StrictAuthonticateIdAndCreditcardOrScanovate title={changeTitle} closeBtn={changCloseBtn} icon={changeIcon} onResult={handleComponentResult} />
    }
    if (prev == "StrictAuthenticationMain") {
      prevComponent = <StrictAuthenticationMain MapaProcess={details.MapaProcess} isTab={details.isTab} isDisplayScanovate={details.isDisplayScanovate} closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />
    }
  }
    else {
      prevComponent = prev;
    }
    return prevComponent;
  }

  export default getCurrComponent;
