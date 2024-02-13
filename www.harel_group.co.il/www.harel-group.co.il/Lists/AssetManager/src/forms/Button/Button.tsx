import React, {FC, forwardRef} from 'react';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {FocusHoverPress} from '../../interfaces/control/FocusHoverPress';

import styles from './Button.module.scss';

export interface ButtonProps extends StylesAndBo, FocusHoverPress {
  /**
   * Button shape
   *
   * - `contained` is for general primary actions
   *
   * - `outline` is for secondary actions
   *
   * - `text` is for actions that are least important
   *
   */
  variant?: 'contained' | 'outline' | 'text';

  /**
   * Button color
   *
   * Default theme definitions:
   *
   * - `primary` is blue
   *
   * - `secondary` is yellow
   *
   * - `triadic` is green
   */
  color?: 'primary' | 'secondary' | 'triadic';

  /**
   * Button size
   */
  size?: 'medium' | 'large' | 'small';

  /**
   * onClick callback
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

    /**
     * onKeyDown callback
     */
    onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Button type
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type
   *
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * Aria Label
   *
   * if you pass "string" as child - it will fill *automatically*
   */
  'aria-label'?: string;

  /**
   * Aria Invalid
   */
  'aria-invalid'?: boolean;
}

export const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>((
  {
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    focused = false,
    hovered = false,
    pressed = false,
    disabled = false,
    onClick,
    onKeyDown,
    style,
    className,
    type = 'button',
    bo = 'hds-button',
    'aria-label': ariaLabelProp = undefined,
    'aria-invalid': ariaInvalidProp = undefined,
    children
  },
  ref): JSX.Element => {

    const classes = toCssClass([
      styles.button,
      className,
      color,
      variant,
      size,
      focused && 'focused',
      hovered && 'hovered',
      pressed && 'pressed',
      disabled && 'disabled'
    ]);

    const getAriaLabel = (): string | undefined => {
      if (ariaLabelProp) {
        return ariaLabelProp;
      }
      return typeof children === 'string' ? children : undefined;
    }

    return (
      <button ref={ref}
              className={classes}
              style={style}
              type={type}
              disabled={disabled || undefined}
              onClick={(event) => onClick?.(event)}
              onKeyDown={(event) => onKeyDown?.(event)}
              data-hrl-bo={bo}
              aria-label={getAriaLabel()}
              aria-invalid={ariaInvalidProp}
              aria-disabled={disabled || undefined}>{children}</button>
    );
  }
);
