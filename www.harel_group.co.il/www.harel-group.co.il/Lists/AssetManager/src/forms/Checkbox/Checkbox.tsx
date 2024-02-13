import React, {FC, forwardRef} from 'react';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {FocusHoverPress} from '../../interfaces/control/FocusHoverPress';

import styles from './Checkbox.module.scss';
import {shortId, toCssClass} from '../../fp';

export interface CheckboxProps extends StylesAndBo, FocusHoverPress {
  /**
   * Set unique Id for checkbox
   */
  id?:string;
  /**
   * Checkbox state
   */
  checked?: boolean;

  /**
   * Used to tri-state checkbox
   */
  partialChecked?: boolean;

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

export const Checkbox: FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>((props, ref): JSX.Element => {
  const {
    id,
    checked = false,
    partialChecked = false,
    disabled = false,
    error = false,
    onChange,

    focused = false,
    hovered = false,
    pressed = false,

    style = {},
    className = '',
    bo = 'hds-checkbox',

    children
  } = props;

  const [componentId] = React.useState<string>(id||`hds-checkbox-${shortId()}`);

  const classes = toCssClass([
    styles.checkbox,
    className,
    partialChecked && 'partial',
    error && 'error',
    focused && 'focused',
    (hovered || pressed) && 'hovered'
  ]);

  return (
    <div className={classes} style={style} data-hrl-bo={bo}>
      <input type='checkbox'
             ref={ref}
             id={componentId}
             checked={checked}
             disabled={disabled}
             onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange?.(event)} />

      <label htmlFor={componentId}>{children}</label>
    </div>
  );
});
