import React, {FC, useCallback} from 'react';
import styles from './FormBuilder.module.scss';
import {FormBuilderContextProvider} from './FormBuilderContextProvider';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';

export interface FormBuilderProps extends StylesAndBo {
  data?: any;
  scheme?: any;
  onChange?: any;
}

export const FormBuilder: FC<FormBuilderProps> = (props) => {
  const {style = {}, className, data, scheme, onChange, bo = 'hds-form-builder', children} = props;
  const classes = toCssClass([styles.formBuilder, className]);
  const onChangeCallback = useCallback(() => onChange?.(), []);
  return (
    <FormBuilderContextProvider data={data} scheme={scheme} onChange={onChangeCallback}>
      <div className={classes} style={style} data-hrl-bo={bo}>
        {children}
      </div>
    </FormBuilderContextProvider>
  );
};
