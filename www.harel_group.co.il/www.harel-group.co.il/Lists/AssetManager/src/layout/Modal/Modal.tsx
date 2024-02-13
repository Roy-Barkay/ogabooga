import React, {FC} from 'react';
import {createPortal} from 'react-dom';
import {Icon} from '../../icons/Icon';

import styles from './Modal.module.scss';

export interface ModalProps {
  isOpen?: boolean;

  icons?: React.ReactElement;

  onClose?: () => void;

  /**
   * Override data-hrl-bo
   */
  bo?: string;
}

export const Modal: FC<ModalProps> = ({bo, isOpen, onClose, children}) => {
  if (!isOpen) return null;

  const element = (
    <>
      <div className={styles.modal} data-hrl-bo={bo || 'hds-modal'}>
        <div className='modal-body'>
          <div className='modal-header'>
            <button className='close-button' onClick={() => onClose?.()}>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M12 10.586L6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 0 0
              1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 1 0-1.414-1.414L12 10.586z'
                />
              </svg>
            </button>
            <div className='modal-icon'>
              {/* TODO: Get from props */}
              <Icon name='earthQuake' />
            </div>
          </div>

          {children}
        </div>
        <div className='backdrop' />
      </div>
    </>
  );

  return createPortal(element, document.body);
};
