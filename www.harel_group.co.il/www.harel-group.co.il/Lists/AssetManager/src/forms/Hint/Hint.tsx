import React from 'react';
import {HintAndError} from '../../interfaces/control/HintAndError';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {toCssClass} from '../../fp';
import styles from './Hint.module.scss';

export interface HintAndErrorProps extends HintAndError, StylesAndBo {
}

export const Hint = (props: HintAndErrorProps): JSX.Element => {
  const {
    hint = '',
    error = false,
    errorMessage = '',

    style = {},
    className,
    bo = undefined
  } = props;

  const classes = toCssClass([
    'hds-hint',             // generic class
    styles.hint,            // css module
    error && 'has-error',   // css modifier
    className               // custom css class
  ]);

  return (
    <span className={classes} style={style} data-hrl-bo={bo}>
      {(error && errorMessage) ? errorMessage : hint}
    </span>
  );
}
