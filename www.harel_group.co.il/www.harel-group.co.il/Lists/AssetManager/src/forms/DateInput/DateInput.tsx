import React, {FC, forwardRef, useState} from 'react';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {HintAndError} from '../../interfaces/control/HintAndError';
import {RequiredAndDisabled} from '../../interfaces/control/RequiredAndDisabled';
import styles from './DateInput.module.scss';
import {Label} from '../Label/Label';
import {Dropdown} from '../Dropdown/Dropdown';
import {Option} from '../Option/Option';

export interface DateInputProps extends StylesAndBo, HintAndError, RequiredAndDisabled {
  label?: string;
  value?: Date;
  onChange?: (event: Date) => void;
}

export const DateInput: FC<DateInputProps> = forwardRef<HTMLDivElement, DateInputProps>((props, ref): JSX.Element => {
    const {
      // value = undefined,
      // onChange,

      hint = '',
      error = null,
      errorMessage,
      label,

      required,
      hideAsterisk,
      disabled,

      style = {},
      className,
      bo = 'hds-data-input',
    } = props;

    const [date, setDate] = useState({
      day: 15,
      month: 6,
      year: 2000,
      hours: 12,
      minutes: 0,
      seconds: 0
    });

    const updateDate = (val: any, field: any) => {
      setDate(e => ({...e, [field]: val}))
    }

    const classes = toCssClass([
      'hds-data-input',
      className,
      styles.dateInput,
      error && 'error',
      disabled && 'disabled',
    ]);

    const getValues = (length: number): number[] => Array.from({length}, (_, k) => k);

    const pad0 = (val: number | string, round = null) => {
      let v = parseInt(val.toString(), 0);
      if (round) {
        // @ts-ignore
        v = Math.ceil(v / round) * round;
      }
      return v < 10 ? `0${v}` : `${v}`;
    };

    return (
      <div className={classes} style={style} data-hrl-bo={bo} ref={ref}>

        {label && (
          <span className={styles.label}>
          <Label asterisk={required && !hideAsterisk}>{label}</Label>
        </span>
        )}

        <div className={styles.line}>
          <Dropdown label='יום' className={styles.dropdown} value={date.day}
                    onChange={(e: any) => updateDate(e, 'day')}>
            {getValues(31).map((value, key) => (
              <Option value={value + 1} key={key}>{value + 1}</Option>
            ))}
          </Dropdown>

          <span>/</span>

          <Dropdown label='חודש' className={styles.dropdown} value={date.month}
                    onChange={(e: any) => updateDate(e, 'month')}>
            {getValues(12).map((value, key) => (
              <Option value={value + 1} key={key}>{value + 1}</Option>
            ))}
          </Dropdown>

          <span>/</span>

          <Dropdown label='שנה' className={styles.dropdown} value={date.year}
                    onChange={(e: any) => updateDate(e, 'year')}>
            {getValues(200).map((value, key) => (
              <Option value={1900 + value} key={key}>{1900 + value}</Option>
            ))}
          </Dropdown>

          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

          <Dropdown label='שעה' className={styles.dropdown} value={date.hours}
                    onChange={(e: any) => updateDate(e, 'hours')}>
            {getValues(23).map((value, key) => (
              <Option value={value} key={key}>{pad0(value)}</Option>
            ))}
          </Dropdown>

          <span>:</span>

          <Dropdown label='דקה' className={styles.dropdown} value={date.minutes}
                    onChange={(e: any) => updateDate(e, 'minutes')}>
            {getValues(60 / 5).map(v => v * 5).map(v => pad0(v)).map((value, key) => (
              <Option value={value} key={key}>{value}</Option>
            ))}
          </Dropdown>

          {/*
            TODO: show seconds by default is false
            <Dropdown label='' className={styles.dropdown} value={date.seconds}
                      onChange={(e: any) => updateDate(e, 'seconds')}>
              {getValues(59).map((value, key) => (
                <Option value={value} key={key}>{value}</Option>
              ))}
            </Dropdown>
          */}
        </div>

        {hint && !error && <span className={styles.hint}>{hint}</span>}

        {errorMessage && <span className={styles.error}>{errorMessage}</span>}
      </div>
    );
  }
);

export default DateInput;
