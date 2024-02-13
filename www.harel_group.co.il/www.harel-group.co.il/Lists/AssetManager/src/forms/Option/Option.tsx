import React, {FC, forwardRef} from 'react';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {FocusHoverPress} from '../../interfaces/control/FocusHoverPress';

export interface OptionProps extends StylesAndBo, FocusHoverPress {
  value: any;
  tabIndex?: number;
  onSelect?: (value: any) => void;
  selected?: boolean;
  disabled?: boolean;
  bo?: string;
  onKeyPressed?: any;
  onFocus?: any;
}

export const Option: FC<OptionProps> = forwardRef<HTMLDivElement, OptionProps>((props, ref): JSX.Element => {
    const {
      value,
      onSelect,
      selected = false,
      disabled = false,
      focused = false,
      hovered = false,
      pressed = false,
      tabIndex = 0,
      style,
      className,
      bo = 'hds-option',
      children,
      onKeyPressed,
      onFocus
    } = props;
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onSelect?.(value);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (onKeyPressed && typeof onKeyPressed === 'function') {
        onKeyPressed?.(e);
      } else {
        e.stopPropagation();
        onSelect?.(value);
      }
    };

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
    };

    const onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
      return e.code;
    };

    const classes = toCssClass([
      'hds-option',
      className,
      focused && 'focused',
      hovered && 'hovered',
      pressed && 'pressed',
      selected && 'selected',
      disabled && 'disabled'
    ]);


    return (
      <div ref={ref}
           role='option'
           onFocus={() => onFocus?.(value)}
           className={classes}
           tabIndex={tabIndex}
           style={style}
           onClick={(e) => onClick(e)}
           onMouseDown={(e) => onMouseDown(e)}
           onKeyDown={(e) => onKeyDown(e)}
           onKeyUp={(e) => onKeyUp(e)}
           aria-disabled={disabled}
           aria-pressed={selected}
           data-hrl-bo={bo}>
        {children}
      </div>
    );
  }
);
