import React, { useContext, useEffect,useState  } from 'react';
import { Modal, Button,Typography,Loader   } from 'harelkit';
import IconPerson from '../../common/icons/Person';
import { ResourceContext } from '../../common/context/ResourceContext';
import { sendAuth } from '../../common/services/AuthentacationService';
import { useSelector } from "react-redux";

function AuthorizedMessage(props) {
    const resources = useContext(ResourceContext);
    const [disabled, setDisabled] = useState();
    const [isLoad, setIsLoad] = useState(false);
    let redirect = useSelector(state => state.redirect)
    useEffect(() => {
        props.closeBtn(true);
        props.icon(<IconPerson />)
        props.title(resources['AuthorizedMessageTitle']+" "+props.userName )
    }, []);

    
    const ProcessContinue = (isClose) => {
        setDisabled(true);
        setIsLoad(true)
        sendAuth("CloseOpenCalls", {}).then(
            res => {
                setDisabled(false)
                setIsLoad(false)
                if (res.status == 200) {
                    if (res.data.Status == 0) {
                        var dataObj = Object.assign({}, res.data.Details, {"path":redirect});
                        props.onResult(dataObj);
                       
                    }
                    else {
                        props.onResult(res);

                    }
                }
                else {

                }
            }
        );

    }

    return (
        <>
            <Modal.Body>
            <Typography variant="h3" align="center" role="heading" aria-level="2">
            {resources['AuthorizedMessageText']}
                   </Typography>
              
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" onClick={ProcessContinue} disabled={disabled} align="center" >
                    המשך {isLoad ? <>&nbsp;&nbsp;<Loader size={18} /></> : null}
                </Button>
            </Modal.Footer>

        </>
    );
}
export default AuthorizedMessage;
AuthorizedMessage.displayName = 'AuthorizedMessage';