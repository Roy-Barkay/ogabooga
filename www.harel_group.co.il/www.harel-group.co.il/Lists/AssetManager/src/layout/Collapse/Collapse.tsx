import React from 'react';
import {toCssClass} from '../../fp';
import styles from './Collapse.module.scss';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';

export interface CollapseProps extends StylesAndBo {
  open?: boolean;
}

export const Collapse: React.FC<CollapseProps> = (props) => {
  const {open = false, style = {}, className, bo = 'hds-collapse', children} = props;
  const classes = toCssClass(['hds-collapse', styles.collapse, className, open ? 'opened' : 'closed']);
  const ref = (el: HTMLDivElement | null) => el && (el.style.maxHeight = el?.scrollHeight + 'px');

  return <div className={classes} style={style} data-hrl-bo={bo} ref={ref}>{children}</div>;
};

export default Collapse;
