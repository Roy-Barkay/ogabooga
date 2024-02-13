import React, {FC, useState} from 'react';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';

import styles from './Stepper.module.scss';

export interface StepperProps extends StylesAndBo {
  /**
   * activeIndex
   *
   * default: 0
   */
  activeStepIndex?: number;

  /**
   * onStepSelect callback
   */
  onStepSelect?: (index: number) => void;
}

export const Stepper: FC<StepperProps> = (props) => {
  const {
    activeStepIndex = 0,
    onStepSelect,

    style = {},
    className,
    bo = 'hds-stepper',
    children
  } = props;
  const [selectedIndex, setSelectedIndex] = useState(activeStepIndex);

  const classes = toCssClass([
    styles.stepper,
    className
  ]);

  const steps = React.Children.map(children, (element, index) => {
    if (React.isValidElement(element)) {
      return React.cloneElement(element, {
        bo: `hds-step-${index}`,
        isActive: selectedIndex === index,
        onStepSelect: () => {
          setSelectedIndex(index);
          if (onStepSelect) {
            onStepSelect(index);
          }
        },
        children: element.props.children
      });
    }
    return <></>;
  });

  return (
    <div className={classes} style={style} data-hrl-bo={bo}>
      <div className='line' />
      <div style={{zIndex: 1}}>{steps}</div>
    </div>
  );
};
