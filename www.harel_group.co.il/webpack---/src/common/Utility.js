import { sendAuth } from './services/AuthentacationService';
import { isMobile } from 'react-device-detect';
import { ServerResponse } from '../common/Enums';;


export const isReturnScanovate = (url) => {
  return url != null && url.indexOf("isReturnScanovate=true") != -1;
}
export const isShowLogin = () => {
  return window.location.search.indexOf("isshowlogin=true") != -1;
}
export const isFast = (url) => {
  return url != null && url.indexOf("fast=1") != -1;
}

export const getQueryParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const fillCurrentUser = (uid, phone) => {
  let curUser = {};
  curUser.uid = uid;
  curUser.phone = phone;
  return curUser;
}

export const ifIsDesktop = () => {
  return !isMobile;
}


export const fillExetrnalUserDetails = (email, isDecleration, isActivation, emailNeedsVerification) => {
  let curUser = {};
  curUser.email = email;
  curUser.isDecleration = isDecleration;
  curUser.isActivation = isActivation;
  curUser.emailNeedsVerification = emailNeedsVerification;
  return curUser;
}

export const returnUrl = (curComponentDisplayName) => {
  if (curComponentDisplayName == "FailedScanovate" || curComponentDisplayName == "ScanovateReferer" || curComponentDisplayName == "ErrorDetails") {
    return true;
  }
  return false;
}
String.prototype.toDate = function (format) {
  var normalized = this.replace(/[^a-zA-Z0-9]/g, '-');
  var normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
  var formatItems = normalizedFormat.split('-');
  var dateItems = normalized.split('-');
  var monthIndex = formatItems.indexOf("mm");
  var dayIndex = formatItems.indexOf("dd");
  var yearIndex = formatItems.indexOf("yyyy");
  var hourIndex = formatItems.indexOf("hh");
  var minutesIndex = formatItems.indexOf("ii");
  var secondsIndex = formatItems.indexOf("ss");
  var today = new Date();
  var year = yearIndex > -1 ? dateItems[yearIndex] : today.getFullYear();
  var month = monthIndex > -1 ? dateItems[monthIndex] - 1 : today.getMonth() - 1;
  var day = dayIndex > -1 ? dateItems[dayIndex] : today.getDate();
  var hour = hourIndex > -1 ? dateItems[hourIndex] : today.getHours();
  var minute = minutesIndex > -1 ? dateItems[minutesIndex] : today.getMinutes();
  var second = secondsIndex > -1 ? dateItems[secondsIndex] : today.getSeconds();
  return new Date(year, month, day, hour, minute, second);
};
if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function (search, rawPos) {
      var pos = rawPos > 0 ? rawPos | 0 : 0;
      return this.substring(pos, pos + search.length) === search;
    }
  });
}
export const LoggerContactUs = (hasOpenCalls, nameSreen, isManual) => {

  sendAuth("PortalLogger", { actionLog: { Id: 23, SuccessMessage: 'AL33', FailureMessage: 'AL33' }, success: isManual, actionContent: nameSreen });
  sendAuth("ElasticLogger", { general: { action_code: 2174, system_code: '218' }, MessageForUser: { infoTitle: '' } })
  sendAuth("ElasticLogger", { general: { action_code: hasOpenCalls ? 2176 : 2177, system_code: '218' }, MessageForUser: { infoTitle: '' } })
  sendAuth("PortalLogger", { actionLog: { Id: 223, SuccessMessage: 'AL120', FailureMessage: 'AL121' }, success: hasOpenCalls ? false : true });
}
export const IsValideExpirationDate = (CreditCardYear,CreditCardMonth) => {
  const currentDate = new Date();
  if(CreditCardYear == currentDate.getFullYear() && CreditCardMonth < (currentDate.getMonth() + 1))
  {
    return false;
  }
  return true;
}
export const IsValideIssuerDate = (dateExpirationDate) => {
  const currentDate = new Date();
  if (dateExpirationDate > currentDate) {
    return false
  }
  return true;
}
export const  IsHarelDomain=(origin)=> {
  var hrlDomains = ["hrl.co.il", "harel-ext.com", "harel-ins.co.il", "harel-group.co.il", "10.40.101.40", "harel-net.co.il", "harel-office.com"];
  hrlDomains.push(window.location.host);
  var separatesubdom = origin.split('.');
  separatesubdom.shift();
  origin = separatesubdom.join('.');
  for (var i = 0; i < hrlDomains.length; i++)
  {
      if (origin == hrlDomains[i]) return true;
  }
  return false;
}
export const RemoveSearchParams=()=>{
      const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
      window.history.replaceState({path: newUrl}, "", newUrl); 
}
export const GetErrorMsg = (error,resources) => {
switch(error){
  case ServerResponse.INVALIDE_ISSUE_DATE:
    return resources['ErrorMsgInvalidIssueDate'];
    
  case ServerResponse.VALIDATE_ISSUE_DATE:
    return ServerResponse.VALIDATE_ISSUE_DATE;

  case ServerResponse.INVALIDE_CREDIT_CARD:
    return resources['ErrorMsgInvalidCreditCard'];

  case ServerResponse.INVALIDE_CREDIT_CARD_TEC:
    return resources['ErrorMsgInvalidCreditCard'];

  default:
            return ;
}
 
}