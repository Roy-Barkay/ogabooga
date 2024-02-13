import React from 'react';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import styles from './Loader.module.scss';

export interface LoaderProps extends StylesAndBo {
  fullscreen?: boolean;
  size?: number;
}

export const Loader = (props: LoaderProps): JSX.Element => {
  const {
    fullscreen = false,
    size = 14,
    style = {},
    className,
    bo = 'hds-loader'
  } = props;

  const classes = toCssClass([
    className,
    fullscreen && 'fullscreen', // TODO: implement loader fullscreen
    !!size && size.toString() // TODO: implement loader size
  ]);

  return (
    <div className={classes} style={style} data-hrl-bo={bo}>
      <div className={styles.ldsRing}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
