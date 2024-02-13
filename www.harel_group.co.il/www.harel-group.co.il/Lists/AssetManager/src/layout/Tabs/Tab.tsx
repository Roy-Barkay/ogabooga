import React, {FC} from 'react';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';

import styles from './Tab.module.scss';

export interface TabProps extends StylesAndBo {
  /**
   * Tab Label
   */
  label: string;

  /**
   * isActive
   */
  isActive?: boolean;

  /**
   * Tab Icon
   */
  icon?: JSX.Element;

  /**
   * onTabSelect
   */
  onTabSelect?: () => void;

  /**
   * Disable state
   */
  disabled?: boolean;
}

export const Tab: FC<TabProps> = (props) => {
  const {style = {}, className, isActive, disabled, onTabSelect, bo = 'hds-row', label} = props;

  const classes = toCssClass([styles.tab, className, isActive && 'active', disabled && 'disabled']);

  const onClick = () => {
    if (onTabSelect && !disabled) {
      onTabSelect();
    }
  };

  return (
    <div className={classes} style={style} data-hrl-bo={bo} onClick={onClick}>
      {label}
    </div>
  );
};
