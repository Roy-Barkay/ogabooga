import React, {FC, forwardRef} from 'react';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {RequiredAndDisabled} from '../../interfaces/control/RequiredAndDisabled';
import {FocusHoverPress} from '../../interfaces/control/FocusHoverPress';

import styles from './Radio.module.scss';
import {shortId, toCssClass} from '../../fp';

export interface NewRadioProps extends StylesAndBo, RequiredAndDisabled, FocusHoverPress {
  /**
   * Radio state
   */
  checked?: boolean;

  /**
   * Radio value
   */
  value?: any;

  /**
   * Field name
   */
  name?: string;

  /**
   * onChange callback
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Mark control as disabled
   */
  disabled?: boolean;

  /**
   * Mark control as error
   */
  error?: boolean;
}

export const Radio: FC<NewRadioProps> = forwardRef<HTMLInputElement, NewRadioProps>((props, ref): JSX.Element => {
  const {
    onChange,
    name = 'hdsRadioField',
    checked = false,
    disabled = false,

    focused = false,
    hovered = false,
    pressed = false,
    error = false,

    style = {},
    bo = 'hds-radio',
    value = null,
    className = '',
    children
  } = props;

  const [id] = React.useState<string>(`hds-radio-${shortId()}`);

  const classes = toCssClass([
    'hds-radio',
    styles.radioButton,
    className,
    focused && 'focused',
    hovered && 'hovered',
    pressed && 'pressed',
    disabled && 'disabled',
    error && 'error'
  ]);

  return (
    <div className={classes} style={style} data-hrl-bo={bo}>
      <input ref={ref}
             name={name}
             id={id}
             type='radio'
             value={value}
             checked={checked}
             disabled={disabled}
             onChange={(e) => onChange?.(e)} />
      <label htmlFor={id}>{children}</label>
    </div>
  );

});
