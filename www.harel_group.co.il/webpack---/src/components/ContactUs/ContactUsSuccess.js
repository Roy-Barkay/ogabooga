import React, { useState, useCallback, useEffect } from 'react';
import {  Modal,Button} from 'harelkit';
import IconPerson from '../../common/icons/Person';

function ContactUsSuccess(props){

    useEffect(() => {
            props.closeBtn(true);
            props.icon(<IconPerson />)
            props.title('פתחנו עבורך פנייה למוקד התמיכה, ונחזור אליך בהקדם')

       }, []);

       const close = () =>{

            let res = {};           
            res.process = "closeWindow";
            res.close = true;
            props.onResult(res);
       
       } 

    return(
        <>
       
       <Modal.Footer>
             <div  id="screenReaderOnly" role="alert">פתחנו עבורך פנייה למוקד התמיכה, ונחזור אליך בהקדם</div>
              <Button variant="contained" onClick={close} align="center" >
                   הבנתי
                </Button>
       </Modal.Footer>
    
        </>
    );
}
export default  ContactUsSuccess;