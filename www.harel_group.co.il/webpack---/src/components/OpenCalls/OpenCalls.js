
import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography, Modal } from 'harelkit';
import IconPerson from '../../common/icons/Person';
import { sendAuth } from '../../common/services/AuthentacationService';
import { useSelector } from "react-redux";

function OpenCalls(props) {
    const [disabled, setDisabled] = useState();
    let redirect = useSelector(state => state.redirect)

    useEffect(() => {
        props.title('פנייה לנציג שירות');
        props.icon(<IconPerson />)
        props.closeBtn(false);

    }, []);

    const sendAuthDataOpenCalls = (isClose) => {
        setDisabled(true);
        sendAuth("CloseOpenCalls", { closeOpenCalls: isClose }).then(
            res => {
                if (res.status == 200) {
                    if (res.data.Status == 0) {
                        props.title('מעבירים אותך');
                        props.icon();
                        let res = {};
                        res.redirect = true;
                        var dataObj = Object.assign({}, res, { "path": redirect });
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
                    קיימת עבורך פניה פתוחה לנציג שירות לשם סיוע<br /> בהתחברות לאזור המידע האישי.<br /> האם ברצונך לבטל את הפניה?</Typography>
            </Modal.Body>
            <Modal.Footer role="group">
                <div role="group" aria-label="?קיימת עבורך פניה פתוחה לנציג שירות לשם סיוע בהתחברות לאזור המידע האישי.האם ברצונך לבטל את הפניה">
                        <Grid justify="center">
                            <Grid.Col>
                                <Button variant="outlined" onClick={() => sendAuthDataOpenCalls(1)} disabled={disabled}>כן</Button>
                            </Grid.Col>
                            <Grid.Col>
                                <Button variant="outlined" onClick={() => sendAuthDataOpenCalls(0)} disabled={disabled}>לא</Button>
                            </Grid.Col>
                        </Grid>
                </div>
            </Modal.Footer>
        </>

    );

}


export default OpenCalls;
OpenCalls.displayName = 'OpenCalls';