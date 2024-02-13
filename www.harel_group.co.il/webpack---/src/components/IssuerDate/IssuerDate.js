import React, { useState, useContext } from 'react';
import { TextField, Grid, Typography } from 'harelkit';
import { useFormContext } from 'react-hook-form/dist/index.ie11';


function IssuerDate(props) {
    const { register, errors } = useFormContext();
    const onKeyDownIssuerDate = (e) => {
        
        if (e.keyCode == 13) {
            props.onSubmit();
        }
            var val = document.getElementById("issuerDate").value;
            var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
            if (!((((keyCode >= 96 && keyCode <= 105) || (keyCode >= 48 && keyCode <= 57)) && val.length < 10) || keyCode == 8 || keyCode == 46 || keyCode == 37 || keyCode == 39 || keyCode == 9))
                event.preventDefault();
            if ((val.length == 2 || val.length == 5) && keyCode != 8)
                e.target.value = val + "/";
    }
    const onBlurIssuerDate = (e)=>{
        props.onChange(e.target.value);
    }
    const validateNumber = (event) => {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) event.preventDefault();
    }
    return (
        <>
             <Grid alignItems="end">
                <Grid.Col>
                    <Typography >יש להזין את תאריך ההנפקה של תעודת הזהות שלך</Typography>
                </Grid.Col> 
                <Grid.Col xs={12}>
                    <TextField
                        id="issuerDate"
                        label="הזנת תאריך לדוגמא: 01/01/2021"
                        name="issuerDate"
                        onKeyDown={onKeyDownIssuerDate}
                        onBlur={onBlurIssuerDate}
                        numericKeyboard
                        aria-label="הזן תאריך הנפקה של תעודת זהות בפורמט dd/mm/yyyy"
                        onKeyPress={validateNumber}
                        direction="ltr"
                        placeholder="dd/mm/yyyy"
                        required
                        ref={register({
                            required: true,
                            pattern: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/i
                        })}
                        error={!!errors.issuerDate}
                        helperText={
                            errors.issuerDate && errors.issuerDate.type === "required" && "חובה להזין תאריך הנפקת תעודת זהות" ||
                            errors.issuerDate && errors.issuerDate.type === "pattern" && "נא להזין תאריך במבנה dd/mm/yyyy"
                        }
                    />
                </Grid.Col> 
             </Grid> 
        </>
    );
}
export default IssuerDate;
IssuerDate.displayName = 'IssuerDate';