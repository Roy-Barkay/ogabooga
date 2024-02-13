import React, { useEffect ,useContext} from 'react';
import { Button, Modal, Grid } from 'harelkit';
import IconEnd from '../../common/icons/End';
import { useSelector } from "react-redux";
import { ResourceContext } from '../../common/context/ResourceContext';
import { sendAuth } from '../../common/services/AuthentacationService';
import {  ScreensNames } from '../../common/Enums';

function EndProcess(props) {
    const resources = useContext(ResourceContext);
    let pathUrl = useSelector(state => state.pathUrl)
    useEffect(() => {
        props.closeBtn(true);
        props.title('לצאת מתהליך ההתחברות לאתר הראל?');
        props.icon(<IconEnd />);
    }, []);

    let res = {};
    res.process = "closeWindow";
    function back() {
        props.closeBtn(false);
        res.prev = props.prevComponent;
        res.process = "returnFromExit";
        props.onResult(res);
    }
    function exit() { 
        if(document.getElementsByTagName('body')[0]){
            document.getElementsByTagName('body')[0].style.position='absolute !important';
           }      
        props.closeBtn(false);
        let comp=resources[props.prevComponent.type.displayName];
        sendAuth("PortalLogger", { actionLog: { Id: 95, SuccessMessage: '',FailureMessage:'AL40'}, success: false ,actionContent:comp});
        if(props.prevComponent.type.displayName != ScreensNames.CONTACT_US) 
            sendAuth("ImpersonateToMapa",{suspicionType:4,notes:"לקוח נטש בחלונית "+comp, actionLog: { Id: 504, SuccessMessage: 'AL504',FailureMessage:''}, success: true ,actionContent:comp});
        
        res.process = "closeWindow";
        res.component = props.prevComponent;
        res.componentName = props.prevComponent.type.displayName;
        res.pathUrl=pathUrl;
        res.close = true;
        props.onResult(res);
    }
    return (
        <>

            <Modal.Body>
            </Modal.Body>
            <Modal.Footer>
                <Grid justify="center">
                    <Grid.Col>
                        <Button variant="outlined" onClick={exit}>כן</Button>
                    </Grid.Col>
                    <Grid.Col>
                        <Button variant="contained" onClick={back}>חזרה</Button>
                    </Grid.Col>
                </Grid>
            </Modal.Footer>
        </>

    );

}


export default EndProcess;