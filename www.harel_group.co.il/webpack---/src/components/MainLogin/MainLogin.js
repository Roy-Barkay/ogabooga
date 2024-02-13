import React, { useState, useCallback, useEffect, useContext } from 'react';
import { isFast, isShowLogin, isReturnScanovate, getQueryParameterByName, fillCurrentUser, ifIsDesktop, IsHarelDomain } from '../../common/Utility';
import AuthenticationChoose from '../AuthenticationChoose/AuthenticationChoose';
import EndProcess from '../EndProcess/EndProcess';
import UserDetails from '../UserDetails/UserDetails';
import { Modal } from 'harelkit';
import ScanovateReferer from '../ScanovateReferer/ScanovateReferer';
import { sendAuth } from '../../common/services/AuthentacationService';
import { ResourceContext } from '../../common/context/ResourceContext';
import { useDispatch, useSelector } from "react-redux";
import { handleServerResponse } from '../../common/GeneralComponent/handleServerResponse';


function MainLogin(props) {
  const dispatch = useDispatch();
  let redirect = useSelector(state => state.redirect)
  const handleComponentResult = useCallback((result) => {
    handleServerResponse(result, changeIcon, changeTitle, handleComponentResult, changCloseBtn, result.path, changeOpen, dispatch, changeCurrentComponent);
  }, []);
  const [currentComponent, setCurrentComponent] = useState();
  const [open, setOpen] = useState(false);
  const [hiddenCloseBtn, setHiddenCloseBtn] = useState(false);
  const [title, setTitle] = useState();
  const [icon, setIcon] = useState();
  const resources = useContext(ResourceContext);


  useEffect(() => {
    setCurrentComponent(<AuthenticationChoose closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />);

    let isDesktop = ifIsDesktop();
    let source = getQueryParameterByName("Source");
    if (isReturnScanovate(window.location.search)) {
      let cur = <ScanovateReferer isReturn={false} closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />;
      setOpen(true);
      setCurrentComponent(cur);
    }
    else if (isShowLogin() || isFast(window.location.search)) {
      sessionStorage.setItem('pathUrl', window.location.href)
      sessionStorage.setItem('redirect', "/personal-info")
      dispatch({ type: 'isFast', payload: false })
      let fast = isFast(window.location.search);
      var destUrlWithParams = '/personal-info/my-harel/Pages/client-view.aspx';
      if (source)
        destUrlWithParams = source;
      var destUrl = destUrlWithParams.split('?')[0];
      sendAuth("ContextConfig", { ContextJson: { LogTypCurrentPlatform: isDesktop ? 1 : 2 }, from: "isShowLogin" }).then(() => {
        sendAuth("ElasticLogger", { general: { action_code: '2077', system_code: '218' }, MessageForUser: { infoTitle: '' }, entityELCustomerRouting: { Action: 9999, Topic: 9998, DestinationUrlWithParams: destUrlWithParams, DestinationUrl: destUrl } });
        sendAuth("ElasticLogger", { general: { action_code: fast ? '4523' : '4524', source_system_area_code: fast ? '50' : '51', system_code: '218' }, MessageForUser: { infoTitle: '' } })
        sendAuth("PortalLogger", { actionLog: { Id: 0, SuccessMessage: 'AL00', FailureMessage: '' }, success: true, actionContent: fast ? "פעולה מהירה" : "לא פעולה מהירה" });
      });
      if (fast)
        dispatch({ type: 'isFast', payload: true })

      dispatch({ type: 'redirect', payload: "/personal-info" })
      if (source) {
        dispatch({ type: 'redirect', payload: source })
      }
      let cur = isFast(window.location.search) && window.IsShowScanovate == "true" ? <AuthenticationChoose closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} /> : <UserDetails title={changeTitle} icon={changeIcon} closeBtn={changCloseBtn} onResult={handleComponentResult} />;
      setOpen(true);
      
      setCurrentComponent(cur);
    }

    const handler = event => {
      let isDesktop = ifIsDesktop();
      //only if from harel web sites
      if (!IsHarelDomain(event.origin.toLowerCase()))
        return;
      //get from scanovate desktop
      if (event.data.id == "ScanovateIframe") {
        window.location.href = event.data.source;
      }
      if (event.data.id == "CustomerRouting") {
        sessionStorage.setItem('pathUrl', window.location.href)
        dispatch({ type: 'isFast', payload: false })
        let fast = isFast(event.data.source);
        var destUrlWithParams = '/personal-info/my-harel/Pages/client-view.aspx';
        if (event.data.source)
          destUrlWithParams = event.data.source;
        var destUrl = destUrlWithParams.split('?')[0];
        let action = getQueryParameterByName("action", event.data.source);
        let topic = getQueryParameterByName("topic", event.data.source);
        sendAuth("ContextConfig", { ContextJson: { LogTypCurrentPlatform: isDesktop ? 1 : 2 }, from: "CustomerRouting" }).then(
          sendAuth("ElasticLogger", { general: { action_code: '2077', system_code: '218' }, MessageForUser: { infoTitle: '' }, entityELCustomerRouting: { Action: action, Topic: topic, DestinationUrlWithParams: destUrlWithParams, DestinationUrl: destUrl } }),
          sendAuth("ElasticLogger", { general: { action_code: '4523', source_system_area_code: '50', system_code: '218' }, MessageForUser: { infoTitle: '' } }));
        sendAuth("PortalLogger", { actionLog: { Id: 0, SuccessMessage: 'AL00', FailureMessage: '' }, success: true, actionContent: fast ? "פעולה מהירה" : "לא פעולה מהירה" });
        sessionStorage.setItem("redirect", event.data.source);
        dispatch({ type: 'redirect', payload: event.data.source })
        if (isFast(event.data.source)) {
          dispatch({ type: 'isFast', payload: true })
        }

        let cur = isFast(event.data.source) && window.IsShowScanovate == "true" ? <AuthenticationChoose closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} /> : <UserDetails title={changeTitle} icon={changeIcon} onResult={handleComponentResult} closeBtn={changCloseBtn} />;
        setOpen(true);
        setCurrentComponent(cur);

      }
      //get from menu
      if (event.data.Details) {
        sessionStorage.setItem('pathUrl', window.location.href)
        sessionStorage.setItem('redirect', "/personal-info")
        dispatch({ type: 'curUserDetails', payload: fillCurrentUser(event.data.UserId, event.data.FullPhone) })
        dispatch({ type: 'isFast', payload: false })
        dispatch({ type: 'redirect', payload: "/personal-info" })
        setOpen(true);
        handleServerResponse(event.data.Details, changeIcon, changeTitle, handleComponentResult, changCloseBtn, redirect, changeOpen, dispatch, changeCurrentComponent);
      }
      if (event.data == "empowered") {
        var destUrl = '/personal-info/my-harel/Pages/client-view.aspx';
        sendAuth("ContextConfig", { ContextJson: { LogTypCurrentPlatform: isDesktop ? 1 : 2 }, from: "CustomerRouting" })
          .then(() => {
            sendAuth("ElasticLogger", { general: { action_code: '2077', system_code: '218' }, MessageForUser: { infoTitle: '' }, entityELCustomerRouting: { Action: 9999, Topic: 9999, DestinationUrlWithParams: destUrl, DestinationUrl: destUrl } })
            sendAuth("ElasticLogger", { general: { action_code: '4524', system_code: '218' }, MessageForUser: { infoTitle: '' } })
            sendAuth("PortalLogger", { actionLog: { Id: 0, SuccessMessage: 'AL00', FailureMessage: '' }, success: true, actionContent: 'לא פעולה מהירה' })
            let cur = <UserDetails powerOfAttorney={true} closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />;
            setOpen(true);
            setCurrentComponent(cur);
          })
      }
    }
    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [])


  const handleClose = () => {
    var curComp=currentComponent;
    console.log(currentComponent)
    sendAuth("ElasticLogger", { general: { action_code: '4522' }, MessageForUser: { infoTitle: resources[currentComponent.type.displayName] ? resources[currentComponent.type.displayName] : currentComponent.type.displayName } });
    switch (currentComponent.type.displayName) {
      case "UserValidateDetailes":
        sendAuth("ElasticLogger", { general: { action_code: '2186' }, MessageForUser: { infoTitle: resources[currentComponent.type.displayName] ? resources[currentComponent.type.displayName] : currentComponent.type.displayName } });
        break;
      case "PermanentPassword":
        sendAuth("ElasticLogger", { general: { action_code: '2188' }, MessageForUser: { infoTitle: resources[currentComponent.type.displayName] ? resources[currentComponent.type.displayName] : currentComponent.type.displayName } });
        break;
      case "ChangePassword":
        sendAuth("ElasticLogger", { general: { action_code: '2189' }, MessageForUser: { infoTitle: resources[currentComponent.type.displayName] ? resources[currentComponent.type.displayName] : currentComponent.type.displayName } });
        break;
      case "ScanovateReferer":
        curComp=<ScanovateReferer isReturn={true} closeBtn={changCloseBtn} title={changeTitle} icon={changeIcon} onResult={handleComponentResult} />;
        break;
    }
    setCurrentComponent(<EndProcess icon={changeIcon} closeBtn={changCloseBtn} title={changeTitle} onResult={handleComponentResult} prevComponent={curComp} />);
  };
  const changeTitle = (val) => {
    setTitle(val);
  }
  const changCloseBtn = (val) => {
    setHiddenCloseBtn(val);
  }
  const changeIcon = (val) => {
    setIcon(val);
  }
  const changeOpen = (val) => {
    setOpen(val);
  }
  const changeCurrentComponent = (val) => {
    setCurrentComponent(val);
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        disableBackdropClick={true}
        title={title}
        icon={icon}
        disableCloseButton={hiddenCloseBtn}
      >
        {currentComponent}
      </Modal>
    </div>
  );

}
export default MainLogin;
