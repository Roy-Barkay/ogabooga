import React, {  useContext } from 'react';
import {  Typography, Checkbox } from 'harelkit';
import { useFormContext } from 'react-hook-form/dist/index.ie11';

import { ResourceContext } from '../../common/context/ResourceContext';

function Scanovate(props) {
    const onKeyDownCheckBox = (e) => {
        if (e.keyCode == 13) {
            props.onSubmit();
        }
    }
    const resources = useContext(ResourceContext);
    const { register, errors } = useFormContext();
    return (
        <>
       {props.isTab ?<Typography>לפני שנצלם את פניך ותעודה מזהה, נבקש את אישורך לדבר המחלקה המשפטית</Typography>
                    :<Typography>לפני שנמשיך לצילום, נבקש את אישורך לדבר המחלקה המשפטית</Typography>}
                        <br />
                        <Checkbox
                            onKeyDown={onKeyDownCheckBox}
                            name="agree"
                            id="agree"
                            required
                            error={!!errors.agree}
                            ref={register({ required: true })}
                            helperText={errors.agree && errors.agree.type === "required" && "כדי להמשיך יש לאשר את תנאי השימוש ומדיניות הגנת הפרטיות"}
                            align="right"
                        >
                        מוסכמים עלי <a target="_blank" href={resources['TermsOfUse']}> תנאי השירות באתר</a> ו<a target="_blank" href={resources['PrivacyPolicy']}>מדיניות הפרטיות של החברה</a>
                        </Checkbox>
                        <br />
                        <Typography variant="body2">המידע ישמש לצורך הזיהוי בבקשה זו ובבקשות עתידיות לגופים המוסדיים בקבוצת הראל</Typography>                
        </>
    );
}

export default Scanovate;
Scanovate.displayName = 'Scanovate';