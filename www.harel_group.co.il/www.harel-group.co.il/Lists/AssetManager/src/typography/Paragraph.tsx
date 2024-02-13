import React, {FC} from 'react';
import {toCssClass} from '../fp';
import {StylesAndBo} from '../interfaces/control/StylesAndBo';

import styles from './Paragraph.module.scss';

export interface ParagraphProps extends StylesAndBo {
  strong?: boolean;
  regular?: boolean;
  light?: boolean;
}

export const Paragraph: FC<ParagraphProps> = (props) => {
  const {strong = null, regular = null, light = null, style = {}, className, bo = 'hds-paragraph', children} = props;
  const classes = toCssClass([styles.paragraph, className, strong && 'strong', regular && 'regular', light && 'light']);
  return (<p className={classes} data-hrl-bo={bo} style={style}>{children}</p>);
};
