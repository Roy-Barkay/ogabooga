import React, {FC} from 'react';
import {StylesAndBo} from '../interfaces/control/StylesAndBo';
import {toCssClass} from '../fp';

import styles from './SubTitle.module.scss';

export interface SubTitleProps extends StylesAndBo {
  level?: 1 | 2 | 3;
}

export const SubTitle: FC<SubTitleProps> = (props) => {
  const {level = 1, style = {}, className, bo = 'hds-sub-title', children} = props;
  const isEqual = (a: any, b: any) => a.toString().toLowerCase() === b.toString().toLowerCase();
  const classes = toCssClass([
    styles.subTitle,
    className,
    isEqual(level, 1) && 'large',
    isEqual(level, 2) && 'medium',
    isEqual(level, 3) && 'small'
  ]);
  return (<div className={classes} data-hrl-bo={bo} style={style}>{children}</div>);
};
