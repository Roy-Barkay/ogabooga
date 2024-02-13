import React, {FC, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {Button} from '../../forms';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {toCssClass} from '../../fp';

import styles from './Snackbar.module.scss';

export interface SnackbarProps extends StylesAndBo {
  isOpen?: boolean;
  hideDuration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

  /**
   * Default theme definitions:
   *
   * - `primary` is blue
   *
   * - `secondary` is yellow
   *
   * - `triadic` is green
   */
  color?: 'primary' | 'secondary' | 'triadic';

  onClose?: () => void;
}

export const Snackbar: FC<SnackbarProps> = (props) => {
  const {
    isOpen,
    onClose,
    hideDuration = 2,
    position = 'bottom-left',
    bo = 'hds-snackbar',
    color = 'primary',
    style = {},
    className,
    children
  } = props;


  if (!isOpen) return null;

  const [timer, setTimer] = useState(0);
  const [hideClass, setHideClass] = useState('');

  const classes = toCssClass([styles.snackbarWrapper, className, position, color]);

  useEffect(() => {
    if (hideDuration && hideDuration > 0 && timer < hideDuration) {
      setTimeout(() => {
        setTimer(currentTimer => currentTimer + 1)
      }, 1000);
    } else {
      setHideClass(styles.hideThisComponent);
      setTimeout(() => {
        onClose?.();
      }, 500);
    }
  }, [timer]);

  const element = (
    <div className={`${classes} ${hideClass}`} style={style} data-hrl-bo={bo}>
      <div className={styles.snackbar}>
        {children}
        <Button variant={'contained'} onClick={() => onClose?.()} color={color} className={styles.snackbarButton}>
          <svg width='1em' height='1em' viewBox='0 0 12 12'>
            <path fill='currentColor' fillRule='evenodd'
                  d='M11.73 1.58L7.31 6l4.42 4.42-1.06 1.06-4.42-4.42-4.42 4.42-1.06-1.06L5.19 6 .77 1.58 1.83.52l4.42 4.42L10.67.52z'
            />
          </svg>
        </Button>
      </div>
    </div>
  );

  return createPortal(element, document.body);
};
