import React, {FC, forwardRef, useCallback, useEffect, useRef, useState} from 'react';
import Calendar from './Calendar';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {HintAndError} from '../../interfaces/control/HintAndError';
import {RequiredAndDisabled} from '../../interfaces/control/RequiredAndDisabled';
import {createPortal} from 'react-dom';
import {getElementPosition} from '../Dropdown/fn/getElementPosition';

/**
 * TODO:
 *
 * value
 * selectStyle: "calendar|dropdown" -> default "calendar"
 * showTime -> bool
 * range -> bool
 *
 * Events:
 *  onChange
 */
import styles from './DatePicker.module.scss';
import {TextInput} from '../TextInput/TextInput';

export interface DatePickerProps extends StylesAndBo, HintAndError, RequiredAndDisabled {
  value?: string | number | readonly string[] | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DatePicker: FC<DatePickerProps> = forwardRef((props, ref): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({});
    const elementRef = useRef<HTMLElement>();

    const {
      hint = '',
      error = false,
      // value = undefined,
      // onChange = noop,
      bo = 'hds-data-picker'
    } = props;

    const classes = toCssClass([
      'hds-data-picker',
      styles.datePicker,
      error && 'error'
    ]);

    const iconClasses = toCssClass([styles.icon, isOpen && 'open']);

    const onDocumentMouseDown = useCallback((e) => {
      console.log('onDocumentMouseDown', e);
      setIsOpen(false);
    }, []);

    const onDocumentKeyDown = useCallback((e) => {
      console.log('onDocumentKeyDown', e);
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      if (e.key === 'ArrowDown') {
        // TODO: set focus to option div
      }
    }, []);

    /*    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
          console.log(e);
          setIsOpen(true);
        };

        const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
          console.log(e);
        };*/

    useEffect(() => {
      window.document.addEventListener('keydown', onDocumentKeyDown);
      // window.document.addEventListener('click', onDocumentClick);
      window.document.addEventListener('mousedown', onDocumentMouseDown);

      return () => {
        window.document.removeEventListener('keydown', onDocumentKeyDown);
        // window.document.removeEventListener('click', onDocumentClick);
        window.document.removeEventListener('mousedown', onDocumentMouseDown);
      };
    }, []);

    useEffect(() => {
      if (isOpen) {
        if (elementRef.current) {
          const {top, left, width} = getElementPosition(elementRef.current);
          setPosition({top, left, width, visibility: 'visible'});
        }
      }
    }, [isOpen]);

    return (
      <div ref={elementRef as React.MutableRefObject<HTMLDivElement>}
           className={classes}
           data-hrl-bo={bo}
           onClick={(e) => e.stopPropagation()}>
        <TextInput
          ref={ref as React.MutableRefObject<HTMLInputElement>}
          label={'תאריך'}
          value={'06/08/2021'}
          /*onFocus={(e) => onFocus(e)}
          onBlur={(e) => onBlur(e)}*/
        />

        <div className={iconClasses}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'>
            <path fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  d='M.929 6L8 12.238 15.071 6' />
          </svg>
        </div>

        {isOpen && createPortal(
          <div className={styles.dropdown} style={position}>
            <div className={styles.dropdownCalendar}>
              <Calendar />
            </div>
          </div>,
          document.body
        )}

        {hint && 'TODO: Helper text'}
        {error && 'TODO: Error text'}
      </div>
    );
  }
);

export default DatePicker;
