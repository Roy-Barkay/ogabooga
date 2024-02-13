import { TextField, Grid, Typography, Box, Select } from 'harelkit';
import { useFormContext } from 'react-hook-form/dist/index.ie11';
import React from 'react';

function CreditCard(props) {
    const { register, errors, clearErrors } = useFormContext();

    const ChangeYear = (value) => {
        clearErrors("year")
        props.onChangeYear(value[0].value);
    }
    const ChangeMonth = (value) => {
        props.onChangeMonth(value[0].value);
        clearErrors("month")
    }
    const ChangeCreditNumber = (e) => {
        props.onChangeCreditNumber(e.target.value);
        clearErrors("creditcard")
    }
    const OnSubmit = (e) => {
        props.onSubmit(e);
    }
    const monthes = () => {
        let result = [];
        for (let index = 1; index < 13; index++) {
            result.push({
                value: index,
                label: index,
                id: index
            })
        }
        return result;
    }
    const monthesOptions = monthes()
    const validateNumber = (event) => {
        props.onChangeCreditNumber(event.target.value);
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) event.preventDefault();
    }

    const currentDate = new Date();
    const createOptions = (startYear, size) => {
        let result = [];
        for (let index = startYear; index < startYear + size; index++) {
            result.push({
                value: index,
                label: index,
                id: index
            })
        }
        return result;
    }
    const options = createOptions(currentDate.getFullYear(), 10);

    return (
        <>
            <Grid alignItems="end">
                <Grid.Col xs={12}>
                    <Box m={{ bottom: 1 }}>
                        <Typography>
                            יש להזין פרטי כרטיס אשראי הרשום על שמך -
                            הוא לא יחוייב, רק נוודא את זהותך
                                            </Typography>
                    </Box>
                    <TextField
                        id="creditcard"
                        required
                        numericKeyboard
                        autoComplete="off"
                        onKeyPress={validateNumber}
                        onKeyDown={OnSubmit}

                        onBlur={ChangeCreditNumber}
                        label="מספר כרטיס אשראי"
                        name="creditcard"
                        maxLength="18"
                        ref={register({
                            required: true,
                            pattern: /^\s*\d{8,18}\s*$/i,
                            maxLength: 18,
                        })}
                        error={!!errors.creditcard}
                        helperText={
                            errors.creditcard && errors.creditcard.type === "required" && "חובה להזין מספר כרטיס אשראי" ||
                            errors.creditcard && errors.creditcard.type === "pattern" && "מס כרטיס אשראי לא תקין" ||
                            errors.creditcard && errors.creditcard.type === "maxLength" && "מס כרטיס אשראי לא תקין"
                        } />
                </Grid.Col>
            </Grid>
        </>
    );
}

export default CreditCard;
CreditCard.displayName = 'CreditCard';