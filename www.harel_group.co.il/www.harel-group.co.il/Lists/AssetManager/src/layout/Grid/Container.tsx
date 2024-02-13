import React, {FC} from 'react';
import styles from './Container.module.scss';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {toCssClass} from '../../fp';

export const Container: FC<StylesAndBo> = (props) => {
  const {style = {}, className, bo = 'hds-container', children} = props;
  const classes = toCssClass([styles.container, className]);

  return (
    <div className={classes} style={style} data-hrl-bo={bo}>
      {children}
    </div>
  );
};
