
import React, { useEffect } from 'react';
import { Modal, Button } from 'harelkit';
import Success from '../../common/icons/success';


const ChangePassSuccess = (props) => {
        useEffect(() => {
                props.title('סיסמתך עודכנה בהצלחה');
                props.icon(<Success />)
                props.closeBtn(false);

        }, []);

        function close() {
                let res = {};
                res.ClientHasOpenCalls = props.isOpenCalls;
                props.onResult(res);
        }
        return (<>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                        <Button variant="contained" align="center" onClick={close}> המשך
                       </Button>
                </Modal.Footer>
        </>
        );

}

export default ChangePassSuccess;