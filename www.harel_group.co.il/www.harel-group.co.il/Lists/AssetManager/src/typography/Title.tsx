import React, {FC} from 'react';
import {StylesAndBo} from '../interfaces/control/StylesAndBo';
import {toCssClass} from '../fp';

import styles from './Title.module.scss';

export interface TitleProps extends StylesAndBo {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Title: FC<TitleProps> = (props) => {
  const {level = 1, style = {}, className, bo = 'hds-title', children} = props;
  const isValidLevel = [1, 2, 3, 4, 5, 6].includes(parseInt(level.toString()));
  const Component = isValidLevel ? (`h${level}` as keyof JSX.IntrinsicElements) : 'h1';
  const classes = toCssClass([styles.title, className]);
  return (<Component className={classes} data-hrl-bo={bo} style={style}>{children}</Component>);
};
