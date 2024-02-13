import React, {forwardRef, useEffect, useState} from 'react';
import {Button} from '../Button/Button';
import PlusIcon from './Icons/PlusIcon';
import MinusIcon from './Icons/MinusIcon';
import {calculateInitialValue} from './Helpers/calculateInitialValue';
import Constants from './Constants/amount.constants';
import {toCssClass} from '../../fp';
import {HintAndError} from '../../interfaces/control/HintAndError';

import styles from './AmountPicker.module.scss';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {Hint} from '../Hint/Hint';

interface AmountPickerProps extends HintAndError, StylesAndBo {
  /** The value of the input element, required for a controlled component. */
  value?: number | string;

  /** Minimum acceptable value */
  min?: number;

  /** Maximum acceptable value */
  max?: number;

  /** Step size */
  step?: number;

  /** Prefix Sign */
  prefix?: string;

  /** Suffix Sign */
  suffix?: string;

  /** How many numbers after decimal */
  decimalScale?: number;

  /** Decimal separator char */
  decimalSeparator?: string;

  /** Thousand separator char */
  thousandSeparator?: string;

  /** Callback fired when the value is changed */
  onChange?: (value?: number, formattedValue?: string) => void;

  /** Callback fired when receiving new value prop */
  onValueReceived?: (value?: number, formattedValue?: string) => void;

  /** The helper text content. */
  helperText?: string;

  /** The id of the input element. Use this prop to make label and helperText accessible for screen readers. */
  id?: string;

  /**The label content. */
  label?: string | (() => JSX.Element)

  /** textInput name. */
  name?: string;

  /** If true, input element will be required. */
  required?: boolean;

  /**
   * If true, use secondary design
   * TODO: fix it with theme engine
   * */
  secondary?: boolean;

  /** custom aria-label for buttons and group */
  customAriaLabel?: CustomAriaLabel;
}

interface CustomAriaLabel {
  minusButton?: string,
  plusButton?: string,
  group?: string,
  accessibilityLabel?: string,
}

interface ValueObj {
  formattedValue?: string,
  value?: number,
}

export const AmountPicker = forwardRef<HTMLDivElement, AmountPickerProps>((props, ref): JSX.Element => {

  const {
    id = `amount-picker${Math.floor(Math.random() * 10000)}`,
    label = '',
    required = false,
    step = 1,
    prefix = '\u20AA',
    suffix = '',
    decimalScale = 2,
    decimalSeparator = '.',
    thousandSeparator = ',',
    secondary = false,
    customAriaLabel = {},
    hint,
    error,
    errorMessage,

    style = {},
    className,
    bo = 'hds-amount-picker',
  } = props;

  const classes = toCssClass([styles.root, className]);
  const valueTextClasses = toCssClass([styles.value, error && 'error']);

  const getNumber = (val: number | string | undefined) => typeof val === 'string' ? parseFloat(val) : val;
  const [valueObj, setValueObj] = useState<ValueObj>({formattedValue: ''});
  const [min, setMin] = useState(getNumber(props.min));
  const [max, setMax] = useState(getNumber(props.max));

  useEffect(function () {
    let newValue = calculateInitialValue({val: props.value, min, max});
    let {value, formattedValue} = formatAsNumber(newValue);
    setValueObj({value, formattedValue});
    props.onValueReceived && props.onValueReceived(value, formattedValue);
  }, [props.value]);

  useEffect(function () {
    setMin(getNumber(props.min));
  }, [props.min]);

  useEffect(function () {
    setMax(getNumber(props.max));
  }, [props.max]);


  const fixLeadingZero = (numStr: string) => {
    if (!numStr) {
      return numStr;
    }

    let isNegative = numStr[0] === '-';
    if (isNegative) {
      numStr = numStr.substring(1, numStr.length);
    }
    let parts = numStr.split('.');
    let beforeDecimal = parts[0].replace(/^0+/, '') || '0';
    let afterDecimal = parts[1] || '';
    return `${isNegative ? '-' : ''}${beforeDecimal}${afterDecimal ? `.${afterDecimal}` : ''}`;
  };

  const applyThousandSeparator = (str: string, thousandSeparator: string) => {
    let thousandsGroupRegex = /(\d)(?=(\d{3})+(?!\d))/g;
    let index = str.search(/[1-9]/);
    index = index === -1 ? str.length : index;
    return (
      str.substring(0, index) +
      str.substring(index, str.length).replace(thousandsGroupRegex, '$1' + thousandSeparator)
    );
  };

  const splitDecimal = (numStr: string, allowNegative = true) => {
    let hasNagation = numStr[0] === '-';
    let addNegation = hasNagation && allowNegative;
    numStr = numStr.replace('-', '');
    let parts = numStr.split('.');
    let beforeDecimal = parts[0];
    let afterDecimal = parts[1] || '';
    return {
      beforeDecimal,
      afterDecimal,
      hasNagation,
      addNegation,
    };
  };

  const limitToScale = (numStr: string, scale: number, fixedDecimalScale: boolean) => {
    let str = '';
    let filler = fixedDecimalScale ? '0' : '';
    for (let i = 0; i <= scale - 1; i++) {
      str += numStr[i] || filler;
    }
    return str;
  };

  const formatAsNumber = (numStr: string): ValueObj => {
    let result: ValueObj = {};
    numStr = numStr != null ? fixLeadingZero(numStr.toString()) : '';
    let hasDecimalSeparator = numStr.indexOf(decimalSeparator) !== -1 && decimalScale;
    let {beforeDecimal, afterDecimal, addNegation} = splitDecimal(numStr, true);
    //apply decimal precision if its defined
    if (decimalScale !== undefined) {
      afterDecimal = limitToScale(afterDecimal, decimalScale, false);
    }

    let floatStr = beforeDecimal + ((hasDecimalSeparator && decimalSeparator) || '') + afterDecimal;
    result.value = parseFloat(addNegation ? '-' + floatStr : floatStr);

    if (thousandSeparator) {
      beforeDecimal = applyThousandSeparator(beforeDecimal, thousandSeparator);
    }
    //restore negation sign
    if (addNegation) beforeDecimal = '-' + beforeDecimal;
    //add prefix and suffix
    if (prefix) beforeDecimal = prefix + beforeDecimal;
    if (suffix) afterDecimal = afterDecimal + suffix;
    result.formattedValue = beforeDecimal + ((hasDecimalSeparator && decimalSeparator) || '') + afterDecimal;
    return result;
  };

  const increaseValue = () => {
    let val = calculateInitialValue({
      val: (valueObj.value || valueObj.value === 0) && valueObj.value + Math.abs(step),
      min,
      max
    });
    let {value, formattedValue} = formatAsNumber(val);
    setValueObj({value, formattedValue});
    props.onChange && props.onChange(value, formattedValue);
  };

  const decreaseValue = () => {
    let val = calculateInitialValue({
      val: (valueObj.value || valueObj.value === 0) && valueObj.value - Math.abs(step),
      min,
      max
    });
    let {value, formattedValue} = formatAsNumber(val);
    setValueObj({value, formattedValue});
    props.onChange && props.onChange(value, formattedValue);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.keyCode === Constants.UP_ARROW) {
      e.preventDefault();
      increaseValue();
    } else if (e.keyCode === Constants.DOWN_ARROW) {
      e.preventDefault();
      decreaseValue();
    }
  };

  return (
    <div id={id} className={classes} style={style} data-hrl-bo={bo} role='group'
         aria-label={!customAriaLabel?.group ? `שינוי סכום` : customAriaLabel.group}>
      <div className={styles.stepButtonWrapper}>
        <Button variant={'text'}
                className={styles.stepButton}
                onClick={increaseValue}
                disabled={valueObj.value === max}
                bo={'hds-amount-picker-plus-button'}>
          <PlusIcon disabled={valueObj.value === max} focusable={false} secondary={secondary} />
          <span className={styles.accessibilityText}>
            {!customAriaLabel?.plusButton ? `הגדל את הסכום ב ${step}` : customAriaLabel.plusButton}
          </span>
        </Button>
      </div>

      <div className={valueTextClasses} data-hrl-bo={'hds-amount-picker-text-container'}>
        <div id={`${props.id}-value-text`}
             className={styles.valueDiv}
             onKeyDown={onKeyDown}
             tabIndex={0}
             aria-required={required}
             ref={ref}>
          <span className={styles.accessibilityText} data-hrl-bo={'hds-amount-picker-label'}>{label}</span>
          <span
            className={styles.accessibilityText}>{` ${customAriaLabel.accessibilityLabel || Constants.DEFAULT_ACCESSIBILITY_LABEL} `}</span>
          <span className={styles.formattedValueText}
                data-hrl-bo={'hds-amount-picker-value'}>{valueObj.formattedValue}</span>
        </div>

        <Hint hint={hint} error={error} errorMessage={errorMessage} className={styles.hint} />
      </div>

      <div className={styles.stepButtonWrapper}>
        <Button variant={'text'}
                className={styles.stepButton}
                onClick={decreaseValue}
                disabled={valueObj.value === min}
                bo={'hds-amount-picker-minus-button'}>
          <MinusIcon disabled={valueObj.value === min} focusable={false} secondary={secondary} />
          <span className={styles.accessibilityText}>
            {!customAriaLabel?.minusButton ? `הפחת את הסכום ב ${step}` : customAriaLabel.minusButton}
          </span>
        </Button>
      </div>

    </div>
  );
});
