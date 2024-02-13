import React, {FC, forwardRef, useEffect, useRef, useState} from 'react';
import {Button, Checkbox, TextInput} from '..';
import {createPortal} from 'react-dom';
import ArrowIcon from './icons/ArrowIcon';
import {toCssClass} from '../../fp';

import styles from './Dropdown.module.scss';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {HintAndError} from '../../interfaces/control/HintAndError';

declare const window: Window;

export interface DropdownProps extends StylesAndBo, HintAndError {
  label?: string;
  multi?: boolean;
  value?: string | number | readonly string[] | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dropdownClassName?: string;
  buttonTitle?: string;
}

export const Dropdown: FC<DropdownProps> = forwardRef(
  (props, ref): JSX.Element => {
    const {
      label = 'בחירה',
      hint = '',
      error = false,
      errorMessage = '',
      multi = false,
      value = undefined,
      buttonTitle = 'אישור',
      onChange,
      className,
      dropdownClassName,
      bo = 'hds-select',
      children
    } = props;


    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<any>(value);
    const [position, setPosition] = useState({});
    const [usedKeyBoard, setUsedKeyBoard] = useState<any>(null);
    const [optionValuesArray, setOptionValuesArray] = useState<any>([]);

    const elementRef = useRef<HTMLElement>();
    const optionsRef = useRef<any>();
    const textInputRef = ref ? ref : useRef<React.MutableRefObject<HTMLInputElement>>();

    const classes = toCssClass(['hds-select', styles.select, className, error && 'error']);
    const dropdownClasses = toCssClass(['hds-select-options', styles.dropdown, dropdownClassName]);
    const iconClasses = toCssClass([styles.icon, isOpen && 'open']);


    const onDocumentMouseDown = (e: any) => {
      if (!detectHasFocus(e)) {
        setUsedKeyBoard(null);
        setIsOpen(false);
      }
    };

    const onOptionKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const previousELMT = e.currentTarget?.previousElementSibling;
      // @ts-ignore
      previousELMT?.focus() && e.currentTarget?.parentElement?.focus();
    };

    const focusDropDown = () => {
      // @ts-ignore
      if (document?.activeElement === textInputRef.current || document?.activeElement === elementRef.current) {
        optionsRef?.current?.focus();
        const found = optionValuesArray.indexOf(selectedValue?.toString());
        optionsRef?.current?.childNodes[found > -1 ? found : 0]?.focus();
      }
    };

    const onOptionGotoFirst = () => {
      optionsRef?.current?.focus();
      optionsRef?.current?.childNodes[0]?.focus();
    };

    const onOptionGotoEnd = () => {
      optionsRef?.current?.focus();
      const optionsLength: number = optionsRef?.current?.childNodes.length - 1;
      optionsRef?.current?.childNodes[optionsLength]?.focus();
    };

    const detectHasFocus = (e: any): boolean => {
      if (e?.target) {
        // @ts-ignore
        if (optionsRef?.current?.contains(e.target) || elementRef?.current?.contains(e.target) || textInputRef?.current?.contains(e.target)) {
          return true
        }
      }
      return false;
    }

    const lostFocusFromOptions = (e: any, getFocus: boolean = false) => {
      e.stopPropagation();
      setUsedKeyBoard(null);
      setIsOpen(false);
      if (getFocus) {
        // @ts-ignore
        textInputRef?.current?.focus();
      }
    };

    const onSelectMulti = (checkedStatus: boolean, val: string) => {
      let updateValue: any[];
      if (checkedStatus) {
        // @ts-ignore
        updateValue = [...(selectedValue || []), val];
      } else {
        // @ts-ignore
        updateValue = selectedValue.filter((v: any) => v !== val);
      }
      setSelectedValue(updateValue);
    };

    const isSelectMulti = (val: any, allValues: any[]): boolean => {
      if (Array.isArray(allValues)) {
        return allValues.includes(val.toString());
      } else {
        return false;
      }
    };

    const onOptionKeyPressedHandle = (e: any, ref?: any) => {
      e.preventDefault();
      e.stopPropagation()
      switch (e.key) {
        case 'ArrowDown':
          // @ts-ignore
          e.currentTarget?.nextElementSibling?.focus();
          break;
        case 'ArrowUp':
          onOptionKeyUp(e);
          break;
        case 'Home':
          onOptionGotoFirst();
          break;
        case 'End':
          onOptionGotoEnd();
          break;
        case 'Enter':
          let textInputGetFocus: boolean = false;
          textInputGetFocus = (usedKeyBoard && !isOpen);
          lostFocusFromOptions(e, textInputGetFocus);
          elementRef?.current?.blur();
          // @ts-ignore
          textInputRef?.current?.blur();

          break;
        case 'Backspace':
        case 'Delete':
          setSelectedValue('');
          setUsedKeyBoard(null);
          setIsOpen(false);
          break;
        case 'Tab':
          if (!multi) {
            lostFocusFromOptions(e);
          }
          break;
        case 'Escape':
          lostFocusFromOptions(e);
          break;
        case ' ':
          if (multi) {
            const checkedStatus: boolean = !ref.current.checked;
            const val: string = e.target.innerText.toString();
            onSelectMulti(checkedStatus, val);
          }
          break;
        default:
          break;
      }
    };

    const onDocumentKeyDown = (e: any) => {
      if (detectHasFocus(e) && !usedKeyBoard) {
        setUsedKeyBoard(e);
      }
    };

    const onArrowClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
    };

    const onClickHandle = () => {
      setUsedKeyBoard(null);
      if (!multi) {
        setIsOpen(!isOpen);
      } else if (multi && !isOpen) {
        setIsOpen(true);
      }
    };

    const hideDropDown = () => {
      if (elementRef.current) {
        const {width} = elementRef.current.getBoundingClientRect();
        const position = {
          height: 0,
          width,
          visibility: 'visible'
        }
        !isOpen && setPosition(position);
      }
    };

    const createArrayOfOptionsValue = () => {
      const items = [optionsRef?.current.children][0];
      const arr = [];
      for (let child of items) {
        arr.push(child.textContent);
      }
      setOptionValuesArray(arr);
    }

    const createCheckboxes = (index: number, option: any) => {
      return (
        <div onKeyPress={onOptionKeyPressedHandle}>
          <Checkbox bo={`hds-option-${index}`}
                    checked={isSelectMulti(option.props.value, selectedValue)}
                    onChange={(e) => {
                      const checkedStatus: boolean = e?.target?.checked;
                      const val: string = option.props.value.toString();
                      onSelectMulti(checkedStatus, val);
                    }}>
            {option.props.children}
          </Checkbox>
        </div>

      );
    };

    const createOptions = (index: number, option: any) => {
      return (
        React.cloneElement(option, {
          bo: `hds-option-${index}`,
          onKeyPressed: onOptionKeyPressedHandle,
          onFocus: (value: any) => setSelectedValue(value),
          onSelect: (value: any) => setSelectedValue(value)
        })
      )
    };

    const options = React.Children.map(children, (option, index) => {
      if (React.isValidElement(option)) {
        return multi ? createCheckboxes(index, option) : createOptions(index, option)
      }
      return <></>;
    });

    const MultiSelectButton = (): JSX.Element => {
      let howManySelected: number = 0;
      if (typeof selectedValue === 'object' && Array.isArray(selectedValue)) {
        howManySelected = selectedValue.length;
      }
      const childrenNumbers = React.Children.count(props.children);

      const message = howManySelected ? `${howManySelected}  מתוך ${childrenNumbers} בחרת ` : 'עוד לא נבחר כלום';
      const tabIndex = {tabIndex: 0}
      return (
        <div className={styles.multiSelectSubmitButton}>
          <div className={styles.howManySelected}>{message}</div>
          <Button disabled={!howManySelected}
                  onClick={() => {
                    setIsOpen(false)
                  }}
                  aria-label={buttonTitle} {...tabIndex}>{buttonTitle}</Button>
        </div>
      );
    };

    useEffect(() => {
      if (optionsRef?.current?.children && !optionValuesArray.length) {
        createArrayOfOptionsValue();
      }
    });

    useEffect(() => {
      if (multi && !Array.isArray(value)) {
        setSelectedValue([]);
      }
      window.document.addEventListener('keydown', onDocumentKeyDown);
      window.document.addEventListener('mousedown', onDocumentMouseDown);
      return () => {
        window.document.removeEventListener('keydown', onDocumentKeyDown);
        window.document.removeEventListener('mousedown', onDocumentMouseDown);
      };
    }, []);

    useEffect(() => {
      if (isOpen) {
        if (elementRef.current) {
          const {top, width, height, right} = elementRef.current.getBoundingClientRect();
          const hintAreaSize = 20;
          const position = {
            top: top + window.scrollY + height - hintAreaSize,
            left: right - width,
            width,
            visibility: 'visible'
          };
          setPosition(position);
        }
      } else {
        onChange?.(selectedValue);
      }
    }, [isOpen]);

    useEffect(() => {
      if (!usedKeyBoard && isOpen) {
        !multi && setIsOpen(false);
        onChange?.(selectedValue);
      } else if (usedKeyBoard && !isOpen) {
        onChange?.(selectedValue);
      }
    }, [selectedValue]);

    useEffect(() => {

      if (!usedKeyBoard) {
        return;
      }

      (!Object.keys(position).length || !isOpen) && hideDropDown();

      usedKeyBoard.stopPropagation();

      switch (usedKeyBoard.key) {
        case 'ArrowDown' :
        case 'ArrowUp':
          focusDropDown();
          break;
        case 'Home':
          onOptionGotoFirst();
          break;
        case 'End':
          onOptionGotoEnd();
          break;
        case 'Backspace':
        case 'Delete':
          setSelectedValue('');
          setUsedKeyBoard(null);
          setIsOpen(false);
          break;
        case 'Escape' :
        case 'Tab':
          setUsedKeyBoard(null);
          setIsOpen(false);
          break
        case 'Enter':
        case ' ':
          setUsedKeyBoard(null);
          setIsOpen(true);
          break;
        default:
          break;
      }
    }, [usedKeyBoard]);


    return (
      <div tabIndex={0}
           className={classes}
           data-hrl-bo={bo}
           role='combobox'
           ref={elementRef as React.MutableRefObject<HTMLDivElement>}
           onClick={onClickHandle}
           onKeyDown={onDocumentKeyDown}>

        <TextInput ref={textInputRef as React.MutableRefObject<HTMLInputElement>}
                   label={label}
                   value={selectedValue}
                   hideClearButton={true}
                   error={error}
                   errorMessage={errorMessage}
                   hint={hint} />

        <div className={iconClasses} onClick={(e) => onArrowClick(e)}>
          <ArrowIcon />
        </div>

        {(isOpen || usedKeyBoard) && createPortal(
          <div className={dropdownClasses} style={position}>
            <div tabIndex={0} ref={optionsRef}>
              {options}
            </div>
            {multi && <MultiSelectButton />}
          </div>
          , document.body
        )}
      </div>

    );
  });
