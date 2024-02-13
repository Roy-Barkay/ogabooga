import React, {Fragment, useContext} from 'react';
import styles from './FieldArray.module.scss';
import get from 'lodash-es/get';
import {FormBuilderContext} from './FormBuilderContext';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';

export interface FieldArrayProps extends StylesAndBo {
  name?: any;
  render?: (index: number) => JSX.Element;
}

export const FieldArray = (props: FieldArrayProps) => {
  const {style = {}, className, render, name, bo = 'hds-field-array'} = props;
  const classes = toCssClass([styles.fieldArray, className]);
  const {data} = useContext(FormBuilderContext);

  return (
    <div className={classes} style={style} data-hrl-bo={bo}>
      {/* @ts-ignore */}
      {get(data, name).map((e, i) => (
        <Fragment key={i}>{render?.(i)}</Fragment>
      ))}
    </div>
  );
};
