import React, {FC, forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {RequiredAndDisabled} from '../../interfaces/control/RequiredAndDisabled';
import {HintAndError} from '../../interfaces/control/HintAndError';
import {shortId, toCssClass} from '../../fp';
import styles from './Slider.module.scss';

export interface SliderProps extends StylesAndBo, RequiredAndDisabled, HintAndError {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onMouseUp?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onPointerUp?: (e: any) => void;
  onPointerLeave?: (e: any) => void;
  onTouchEnd?: (e: any) => void;
}

export const errorMessageDefault = {
  valueError: 'הערך לא יכול להיות פחות מינימום או יותר מקסימום',
  stepError: 'צריך להיות יחס בין min, max ומספר step',
  maxError: 'מספר max צריך להיות יותר גדול ממספר min',
}
export const Slider: FC<SliderProps> = forwardRef<HTMLInputElement, SliderProps>((
  {
    label = '',
    min = 0,
    max = min + 10,
    step = 1,
    value = min,

    required = false,
    disabled = false,
    hideAsterisk = false,

    onChange,
    onClick,
    onKeyDown,
    onFocus,
    onBlur,
    onMouseUp,
    onPointerUp,
    onPointerLeave,
    onTouchEnd,

    style = {},
    bo = 'hds-slider',
    className = '',

    hint = '',
    error = false,
    errorMessage = '',
  }, ref): JSX.Element => {


  const [sliderStates, setSliderStates] = useState({min, max, step: step <= 0 ? 1 : step, error, errorMessage});
  const [id] = useState<string>(`hds-slider-${shortId()}`);
  const inputRef = useRef<any>();
  useImperativeHandle(ref, () => inputRef.current);

  useEffect(() => {
    const updatedStep = step <= 0 ? 1 : step;
    let updateError: boolean = error;
    let updateErrorMessage: string = errorMessage;
    const errorArray = [];

    (value < min) && errorArray.push(errorMessageDefault.valueError);
    (value > max) && errorArray.push(errorMessageDefault.valueError);
    (max <= min) && errorArray.push(errorMessageDefault.maxError);
    ((max - min) % updatedStep) && errorArray.push(errorMessageDefault.stepError);
    updateError = errorArray.length > 0;
    updateErrorMessage = updateError ? errorArray.join(', ') : errorMessage;

    setSliderStates({...sliderStates, step: updatedStep, error: updateError, errorMessage: updateErrorMessage});
  }, [])

  const getRange = () => {
    const a = [];
    if (!sliderStates.error) {
      for (let i = sliderStates.min; i <= sliderStates.max; i += sliderStates.step) {
        a.push(i);
      }
    }
    return a;
  }

  const calculateThumbBar = () => {
    // @ts-ignore
    const inputItem = inputRef?.current;
    const inputWidth = Math.round(inputItem?.offsetWidth) || 0;

    let v: any = value;
    if (typeof value === 'string') {
      v = parseInt(value);
    }
    if (v > max) {
      v = max;
    }
    const c = (sliderStates.max - sliderStates.min) / sliderStates.step;
    const x = Math.round(inputWidth / c);
    let output: number = Math.round(((v - sliderStates.min) / sliderStates.step) * x);
    output = v === min ? 0 : output;
    output = v === max ? inputWidth : output;

    let thumbPlace = output;

    if (min > max) {
      thumbPlace = inputWidth;
      output = inputWidth;
    } else if (v === max) {
      thumbPlace = output - 15;
    } else if (v > max / 2) {
      thumbPlace = output - 15;
    } else if (v === min) {
      thumbPlace = output - 5;
    } else {
      thumbPlace = output - 9;
    }
    thumbPlace = thumbPlace >= 0 ? thumbPlace : 0;
    inputItem?.style.setProperty('--thumbBar', thumbPlace + 'px')
    inputItem?.style.setProperty('--trackerBar', output + 'px');
  }

  useEffect(() => {
    calculateThumbBar();
  }, [ref, value, sliderStates]);

  const classes = toCssClass([
    styles.slider,
    disabled && styles.disabled,
    className
  ]);

  return (
    <div className={classes} style={style} id={id} data-hrl-bo={bo}>
      <label htmlFor={id}>{label}{required && !hideAsterisk && <span className={styles.asterisk}>*</span>}</label>

      <div className={styles.indicator}>
        {getRange().map((v, i) => <span key={i}>{v}</span>)}
      </div>
      {sliderStates.error ? <div className={styles.settingsError}>{sliderStates.errorMessage}</div> : null}
      <input ref={inputRef}
             value={value}
             type={'range'}
             min={sliderStates.min}
             max={sliderStates.max}
             step={sliderStates.step}
             disabled={disabled}
             onChange={(e) => onChange?.(e)}
             onClick={(e) => onClick?.(e)}
             onKeyDown={(e) => onKeyDown?.(e)}
             onFocus={(e) => onFocus?.(e)}
             onBlur={(e) => onBlur?.(e)}
             onMouseUp={(e) => onMouseUp?.(e)}
             onPointerUp={(e) => onPointerUp?.(e)}
             onPointerLeave={(e) => onPointerLeave?.(e)}
             onTouchEnd={(e) => onTouchEnd?.(e)}

             required={required}
             aria-required={required}
             aria-valuemin={min}
             aria-valuemax={sliderStates.max}
             aria-valuenow={value}
             aria-disabled={disabled}
             aria-invalid={error}
      />
      {error ? <span className={`has-error ${styles.error}`}>{errorMessage}</span> :
        <span className={`hds-hint ${styles.hint}`}>{hint}</span>}
    </div>
  );
});
