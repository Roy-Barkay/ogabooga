import React, {FC, forwardRef, useState} from 'react';
import {getCalendarDays} from './fn/getCalendarDays';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {HintAndError} from '../../interfaces/control/HintAndError';

import styles from './Calendar.module.scss';

export interface CalendarProps extends StylesAndBo, HintAndError {
  value?: string | number | readonly string[] | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// TODO: i18n
const monthList = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

export const Calendar: FC<CalendarProps> = forwardRef(
  (props, ref): JSX.Element => {
    const [month, setMonth] = useState(new Date().getMonth());

    const {
      // value = undefined,
      // onChange = noop,
      bo = 'hds-calendar'
      // children,
    } = props;

    const classes = toCssClass(['hds-calendar', styles.calendar]);

    return (
      <div className={classes} data-hrl-bo={bo} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className='right' onClick={() => setMonth((prev) => (prev === 0 ? 11 : --prev % 12))}>
            <span>&lsaquo;</span>
          </div>
          <div className='monthYear'>
            <div className='month'>
              <span>{monthList[month]}</span>
            </div>
            <div className='year'>
              <span>2021</span>
            </div>
          </div>
          <div className='left' onClick={() => setMonth((prev) => ++prev % 12)}>
            <span>&rsaquo;</span>
          </div>
        </div>

        <div className={styles.weeks}>
          {'אבגדהוש'.split('').map((e, i) => (
            <span key={i}>{e}</span>
          ))}
        </div>

        <div className={(styles as any).days}>
          {getCalendarDays(month, 2021).map((line, index) => {
            return (
              <ul key={index}>
                {line.map((item: { date: Date; classes: string[] }, dateIndex: number) => {
                  return (
                    <li key={dateIndex} className={item.classes.join(' ')}>
                      {item.date.getDate()}
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>

        {false && ref}
      </div>
    );
  }
);

export default Calendar;
