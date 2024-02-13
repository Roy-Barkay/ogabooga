import React, {FC} from 'react';
import {StylesAndBo} from '../interfaces/control/StylesAndBo';
import {toCssClass} from '../fp';

import styles from './Text.module.scss';

export interface TextProps extends StylesAndBo {
  strong?: boolean;
  regular?: boolean;
  light?: boolean;
}

export const Text: FC<TextProps> = (props) => {
  const {strong = null, regular = null, light = null, style = {}, className, bo = 'hds-text', children} = props;
  const classes = toCssClass([styles.text, className, strong && 'strong', regular && 'regular', light && 'light']);
  return (<span className={classes} data-hrl-bo={bo} style={style}>{children}</span>);
};
