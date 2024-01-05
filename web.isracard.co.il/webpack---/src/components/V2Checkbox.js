import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react';
import { PropTypes } from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Checkbox } from '@mui/material';
// import { config } from '../../../utils/utils';
// import { hexToRgbA } from '../../../utils/helpers';
import CheckboxCheckImage from '../../../../../DigitalV2.SiteContainer.Backend/wwwroot/assets/images/checkbox-check.svg';

const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    icon: {
        borderRadius: 3,
        width: 20,
        height: 20,
        boxShadow: 'none',
        fontSize: '.65em',
        // backgroundColor: hexToRgbA('#ffffff'),
        backgroundColor:('#ffffff'),
        backgroundImage: 'none',
        border: `solid 1px ${theme.palette.primary.main}`,
        transition: 'all .35s',
        '$root.Mui-focusVisible &': {
            outline: 'none',
            boxShadow: '0 0 0 1px #fff, 0 0 0 2px #AFA8BA'
        },
        'input:hover ~ &': {
        },
        'input:disabled ~ &': {
        },

    },
    error: {
        border: 'solid 2px #de0000',
    },
    checkedIcon: {
        // backgroundColor: hexToRgbA(`${theme.palette.primary.main}`),
        backgroundColor: (`${theme.palette.primary.main}`),
        '& $checkIcon': {
            transform: 'translate(-50%,-50%) scale(1)',
        }
    },
    checkIcon: {
        position: 'absolute',
        // color: hexToRgbA('#ffffff'),
        backgroundColor: (`${theme.palette.primary.main}`),
        display: 'block',
        top: '50%',
        left: '50%',
        width: 15,
        height: 15,
        transform: 'translate(-50%,-50%) scale(0)',
        transition: 'transform .5s',
        backgroundImage: `url(assets/images/checkbox-check.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'center center',
    }
}, { name: 'V2Checkbox' });

const V2Checkbox = (props) => {
    const classes = useStyles();
    return (
        <Checkbox
            className={classes.root}
            color="primary"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}>
                <span className={classes.checkIcon} />
            </span>}
            icon={<span className={clsx({ [classes.icon]: true, [classes.error]: props.isError })}>
                <span className={classes.checkIcon} />
            </span>}
            name={props.name}
            id={props.id}
            checked={props.checked}
            required={props.required}
            onChange={props.onChange}
            inputProps={{
                "aria-label": props.label,
                "aria-describedby": props.ariaDescribedby,
            }}
        />
    );
}

V2Checkbox.propTypes = {
    //checked: PropTypes.bool.isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    ariaDescribedby: PropTypes.string,
    isError: PropTypes.bool,
    onChange: PropTypes.func
};

export default observer(V2Checkbox);
