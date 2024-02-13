import React, {FC, useState} from 'react';
import {FormBuilderContext} from './FormBuilderContext';

export const FormBuilderContextProvider: FC<any> = ({children, data, scheme, onChange}) => {
  console.log(data, scheme, onChange);

  const [d] = useState(data);
  const [s] = useState(scheme);

  const getSchemeDefinition = (name: string, scheme: any): any => {
    const fields = name.split('.');
    const firstKey = fields[0];
    if (fields.length === 1) {
      return scheme[firstKey];
    } else {
      const otherKeys = fields.slice(1).join('.');
      const isArray = firstKey.includes('[');
      const subScheme = isArray ? scheme[firstKey.split('[')[0]].options : scheme[firstKey].fields;
      return getSchemeDefinition(otherKeys, subScheme);
    }
  };

  const getScheme = (name: string): any => (s ? getSchemeDefinition(name, s) : {});

  return (
    <FormBuilderContext.Provider
      value={{
        data: d,
        scheme: s,
        getScheme
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};
