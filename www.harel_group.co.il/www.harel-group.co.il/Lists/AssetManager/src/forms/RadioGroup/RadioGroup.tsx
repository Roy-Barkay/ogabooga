import React, {FC} from 'react';
import {Label} from '../Label/Label';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {HintAndError} from '../../interfaces/control/HintAndError';

import styles from './RadioGroup.module.scss';
import {RequiredAndDisabled} from '../../interfaces/control/RequiredAndDisabled';
import {Hint} from '../Hint/Hint';
import {Radio} from '../Radio/Radio';

export interface RadioGroupProps extends StylesAndBo, HintAndError, RequiredAndDisabled {
  label?: string;
  value?: any;
  onChange?: (event: any) => void;
}

export const RadioGroup: FC<RadioGroupProps> = (props): JSX.Element => {
  const {
    label = '',
    // value, TODO:
    // onChange, TODO:

    hideAsterisk = false,
    required = false,
    disabled = false,

    hint = '',
    error = false,
    errorMessage = '',

    style = {},
    className,
    bo = 'hds-radio-group',
    children
  } = props;

  const classes = toCssClass([
    'hds-radio-group',
    styles.radioGroup,
    className,
    label ? 'has-label' : 'no-label',
    error && 'error',
    disabled && 'disabled',
  ]);

  const options = React.Children.map(children, (option, index) => {
    if (React.isValidElement(option)) {
      return (
        <Radio disabled={disabled}
               error={error}
               value={option.props.value}
               bo={`hds-option-${index}`}>
          {option.props.children}
        </Radio>
      );
    }
    return <></>;
  });

  return (
    <div className={classes} style={style} data-hrl-bo={bo}>
      {label && (
        <span className={styles.label}>
          <Label asterisk={required && !hideAsterisk}>{label}</Label>
        </span>
      )}

      <ul>
        {options?.map((e) => <li>{e}</li>)}
      </ul>

      <Hint hint={hint} error={error} errorMessage={errorMessage} />
    </div>
  );
};
