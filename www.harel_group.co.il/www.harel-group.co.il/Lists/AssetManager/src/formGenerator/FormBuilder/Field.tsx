import React, {useContext} from 'react';
import styles from './Field.module.scss';
import {FormBuilderContext} from './FormBuilderContext';
import get from 'lodash-es/get';
import {TextInput} from '../../forms';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';

export interface FieldProps extends StylesAndBo {
  name: any;
}

export const Field = (props: FieldProps) => {
  const {style = {}, className, name, bo = 'hds-field'} = props;
  const classes = toCssClass([styles.field, className]);
  const {data, getScheme} = useContext(FormBuilderContext);

  // const settings = getScheme(name);
  // console.log(name, getScheme(name), get(data, name));

  const getComponent = (settings: any, value: any, onChange: any) => {
    switch (settings.type) {
      case 'string':
        return <TextInput value={value} onChange={onChange} label={'field'} />;
      default:
        return (
          <div className={classes} style={style} data-hrl-bo={bo}>
            {get(data, name)}
          </div>
        );
    }
  };

  return getComponent(getScheme(name), get(data, name), () => console.log('onChange'));
};
