import React, {FC} from 'react';
import styles from './Row.module.scss';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';

export interface RowProps extends StylesAndBo {
}

export const Row: FC<RowProps> = (props) => {
  const {style = {}, className, bo = 'hds-row', children} = props;
  const classes = toCssClass([styles.row, className]);
  return (<div className={classes} style={style} data-hrl-bo={bo}>{children}</div>);
};
