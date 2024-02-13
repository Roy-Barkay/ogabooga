import React, {FC, forwardRef, useRef, useState} from 'react';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {HintAndError} from '../../interfaces/control/HintAndError';
import {RequiredAndDisabled} from '../../interfaces/control/RequiredAndDisabled';
import {Label} from '../Label/Label';

import styles from './ToggleButton.module.scss';
import {Hint} from '../Hint/Hint';

export interface ToggleButtonProps extends StylesAndBo, HintAndError, RequiredAndDisabled {
  /**
   * Toggle Button label
   */
  label?: string;

  /**
   * Set Selected Value
   */
  value?: any | any[] | null;

  /**
   * OnChange Callback
   */
  onChange?: (value: any) => void;

  /**
   * Is allowed multiple selection
   */
  multi?: boolean;
}

const isSelected = (value: any, values: any | any[] | null): boolean => {
  if (Array.isArray(values)) {
    return values.includes(value);
  } else {
    return value === values;
  }
};

export const ToggleButton: FC<ToggleButtonProps> = forwardRef<HTMLDivElement, ToggleButtonProps>((props, ref) => {
  const {
    label,
    multi,

    // value: selectedValue,
    value = props.value || null,
    onChange,

    required = false,
    hideAsterisk = false,
    disabled = false,

    hint = '',
    error = false,
    errorMessage = '',

    className,
    style,
    bo = 'hds-toggle',
    children
  } = props;

  const refs = useRef<any>([]);
  const [maiValue] = useState<any | any[] | null>(value);

  const onSelectCallback = (e: any) => {
    let updateValue = multi ? [] : null;
    if (multi) {
      if (Array.isArray(value) && value.includes(e)) {
        // @ts-ignore
        updateValue = value.filter((val: any) => e !== val);
      } else {
        // @ts-ignore
        updateValue = [...(value || []), e];
      }
    } else {
      updateValue = value === e ? null : e;
    }
    onChange?.(updateValue);
  };

  const options = React.Children.map(children, (option, index) => {
    if (React.isValidElement(option)) {
      return React.cloneElement(option, {
        bo: `hds-option-${index}`,
        selected: isSelected(option.props.value, value),
        disabled: disabled || option.props.disabled,
        onSelect: onSelectCallback,
        onKeyPressed: (e: any) => onKeyPressed(e),
        ref: (r: any) => {
          if (r) {
            refs.current[index] = r;
            refs.current[index].value = option.props.value;
          }
        },
      });
    }
    return <></>;
  });

  const classes = toCssClass([
    styles.toggle,
    className,
    error && 'error',
    disabled && 'disabled',
  ]);

  const getDelta = (e: any) => {
    switch (e.code) {
      case 'ArrowRight':
      case 'ArrowUp':
        return -1;
      case 'ArrowLeft':
      case 'ArrowDown':
        return +1;
      default:
        return 0;
    }
  };

  const onKeyPressed = (e: any) => {
    if (e.code !== 'Tab') {
      e.preventDefault();
      e.stopPropagation();
      const activeElement = refs.current.indexOf(document.activeElement);
      if (activeElement > -1) {
        switch (e.code) {
          case 'Space':
          case 'Enter':
            onSelectCallback(refs?.current[activeElement]?.value);
            return;
          case 'Home':
            refs.current[0].focus();
            return;
          case 'End':
            refs.current[refs.current.length - 1].focus();
            return;
          case 'Escape':
            onChange?.(maiValue);
            return;
          default:
            break;
        }

        const newIndex = (activeElement + getDelta(e));
        if (newIndex === -1) {
          refs.current[refs.current.length - 1].focus();
        } else {
          refs.current[newIndex % refs.current.length].focus();
        }
      }
    }
  }

  return (
    <div className={classes} style={style} data-hrl-bo={bo} ref={ref}>
      {label && (
        <div className={styles.label}>
          <Label asterisk={required && !hideAsterisk}>{label}</Label>
        </div>
      )}
      <div className='options'>{options}</div>
      <Hint hint={hint} error={error} errorMessage={errorMessage} />
    </div>
  );
});
