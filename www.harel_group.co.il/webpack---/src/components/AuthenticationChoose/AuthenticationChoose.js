
import React, { useContext, useEffect } from 'react';
import { Grid, Typography, Modal } from 'harelkit';
import Selection from '../Selection';
import IconPerson from '../../common/icons/Person';
import IconMobile from '../../common/icons/Mobile';
import IconVideoAuthentication from '../../common/icons/VideoAuthentication';
import { sendAuth } from '../../common/services/AuthentacationService';
import { ifIsDesktop } from '../../common/Utility';

import './AuthenticationChoose.css';


const AuthenticationChoose = (props) => {
        useEffect(() => {
                props.closeBtn(false);
                props.title('איך ברצונך להזדהות?');
                props.icon(<IconPerson />)
        }, []);

        let isDesktop = ifIsDesktop();
        function vidio() {


                sendAuth("ElasticLogger", { general: { action_code: '4526', source_system_area_code: '50', system_code: '524' }, MessageForUser: { infoTitle: '' } });
                let res = {};
                res.process = "PremissionScanovate"; //isDesktop? "ScanovateDesktop": "PremissionScanovate";
                res.component = props.curcomponent;
                props.onResult(res);

        }
        function getCode() {
                sendAuth("ElasticLogger", { general: { action_code: '4525', source_system_area_code: '50', system_code: '239' }, MessageForUser: { infoTitle: '' } });
                let res = {};
                res.prev = "AuthenticationChoose";
                res.process = "UserDetails";
                res.component = props.curcomponent;
                props.onResult(res);
        }

        return (<>
                <Modal.Body className="bodyStyle">
                        <Typography variant="h6" align="center" role="heading" aria-level="2">אנחנו רוצים לוודא שנציג את<br /> המידע שלך לעיניך בלבד</Typography>
                        <Grid justify="center">
                                <Grid.Col xs={6}>
                                        <Selection
                                                title="זיהוי פנים"
                                                subtitle="נבקש לצלם את פניך ותעודת זהות"
                                                onClick={vidio}
                                                avatar={<IconVideoAuthentication />}
                                                id="subtitleface"
                                        />
                                </Grid.Col>
                                <Grid.Col xs={6}>
                                        <Selection
                                                title="קבלת קוד לטלפון"
                                                subtitle="נבקש פרטים נוספים אם לא התחברת לאתר הראל בעבר"
                                                onClick={getCode}
                                                avatar={<IconMobile />}
                                                id="subtitlephone"
                                        />
                                </Grid.Col>
                        </Grid>

                </Modal.Body>

        </>
        );

}

export default AuthenticationChoose;
AuthenticationChoose.displayName = 'AuthenticationChoose';
