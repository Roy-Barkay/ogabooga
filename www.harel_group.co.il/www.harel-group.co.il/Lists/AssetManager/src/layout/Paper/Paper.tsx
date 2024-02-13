import React, {FC} from 'react';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {toCssClass} from '../../fp';

import styles from './Paper.module.scss';

export const Paper: FC<StylesAndBo> = (props) => {
  const {style = {}, className, bo = 'hds-paper', children} = props;
  const classes = toCssClass([styles.paper, className]);

  return (<div className={classes} style={style} data-hrl-bo={bo}>{children}</div>);
};
