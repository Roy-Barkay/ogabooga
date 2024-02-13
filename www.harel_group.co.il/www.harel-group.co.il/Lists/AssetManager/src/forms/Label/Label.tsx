import React, {FC} from 'react';

import styles from './Label.module.scss';

export interface LabelProps {
  asterisk?: boolean;
}

export const Label: FC<LabelProps> = (props): JSX.Element => {
  const {asterisk = false, children} = props;
  return <>{children}{asterisk && <span className={styles.asterisk}>*</span>}</>;
}
