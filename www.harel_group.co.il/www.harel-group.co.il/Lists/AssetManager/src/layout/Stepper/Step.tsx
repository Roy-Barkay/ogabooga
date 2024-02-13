import React, {FC} from 'react';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';

import styles from './Step.module.scss';

export interface StepProps extends StylesAndBo {
  /**
   * Step hint
   */
  hint: string;

  /**
   * isActive
   */
  isActive?: boolean;

  /**
   * Step Icon
   */
  icon?: JSX.Element;

  /**
   * onStepSelect
   */
  onStepClick?: () => void;

  /**
   * Disable state
   */
  disabled?: boolean;

  clickable?: boolean;
}

export const Step: FC<StepProps> = (props) => {
  const {
    // hint,
    isActive,
    disabled,
    onStepClick,

    style = {},
    className,
    bo = 'hds-step',
    children
  } = props;

  const classes = toCssClass([
    styles.step,
    isActive && 'active',
    disabled && 'disabled',
    className
  ]);

  const onClick = () => {
    if (onStepClick && !disabled) {
      onStepClick();
    }
  };

  return (
    <div className={classes} style={style} data-hrl-bo={bo} onClick={onClick}>
      {children}
      {/*{hint}*/}
    </div>
  );
};
