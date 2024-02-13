import React from 'react';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import styles from './Progress.module.scss';

// TODO: add colors: primary, secondary, triadic, error
export interface ProgressProps extends StylesAndBo {
  value?: number,
  max?: number
}

export const Progress = (props: ProgressProps): JSX.Element => {
  const {value = 0, max = 100, style = {}, className, bo = 'hds-progress'} = props;
  const classes = toCssClass([styles.progress, className]);

  return (
    <label className={classes} style={style} data-hrl-bo={bo}>
      <progress value={value} max={max} />
    </label>
  );
};
