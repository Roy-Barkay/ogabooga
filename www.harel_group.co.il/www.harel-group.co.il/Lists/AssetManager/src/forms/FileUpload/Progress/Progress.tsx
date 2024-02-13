import React from 'react';
import {toCssClass} from '../../../fp';

import styles from './Progress.module.scss';

enum ProgressStatus {
  Uploading = 'uploading',
  Success = 'success',
  Error = 'error'
}

export interface ProgressProps {
  error?: string | boolean;
  bo?: string;
  hasError?: boolean;
  id?: number;
  value?: number;
  status?: string | ProgressStatus;
  statusText?: string;
  fileName: string;
}

export const Progress = (props: ProgressProps): JSX.Element => {
  const {value = 0, status = ProgressStatus.Uploading, statusText = '', bo = 'hds-progress', fileName = ''} = props;

  const accessibilityProps = {
    role: 'progressbar',
    tabIndex: -1,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-valuenow': value,
    'aria-describedby': `status-${props.id}`
  };

  const getAccessibilityStatusMessage = () => {
    switch (status) {
      case ProgressStatus.Error:
        return fileName ? `העלאה נכשלה עבור מסמך ${fileName}` : 'העלאה נכשלה';
      case ProgressStatus.Success:
        return fileName ? `המסמך ${fileName} עלה בהצלחה ` : 'המסמך עלה בהצלחה';
      default:
        return fileName ? `העלאה בתהליך עבור מסמך ${fileName}` : 'העלאה בתהליך';
    }
  };

  const getStatusMessage = () => {
    if (statusText) {
      return statusText;
    }

    switch (status) {
      case ProgressStatus.Error:
        return 'העלאה נכשלה';
      case ProgressStatus.Success:
        return 'המסמך עלה בהצלחה';
      default:
        return '';
    }
  };

  const progressClasses = toCssClass([styles.progress, status && status]);
  const statusTextClasses = toCssClass([styles.statusText, status && status]);

  return (
    <>
      <div className={styles.progressWrapper} data-hrl-bo={bo}>
        <div className={progressClasses} style={{width: `${value}%`}} {...accessibilityProps} />
        <span id={`status-${props.id}`} className={styles.accessibilityStatus} aria-live='polite'>
          {getAccessibilityStatusMessage()}
        </span>
      </div>

      <div className={styles.statusWrapper}>
        {status === ProgressStatus.Success ? (
          <span className={styles.statusIcon} data-hrl-bo={`${bo}-success-icon`}>
            <svg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 19 19' focusable='false'>
              <g fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
                <path
                  stroke='#278732'
                  strokeWidth='2'
                  d='M0.587 3.509L0.537 7.327 9.445 7.21'
                  transform='translate(-290 -592) translate(30 194) translate(26 321) translate(0 26) translate(234.08 51.012) translate(4.52 2.724) rotate(-45 4.991 5.418)'
                />
              </g>
            </svg>
          </span>
        ) : null}

        {status === ProgressStatus.Error ? (
          <span className={styles.statusIcon} data-hrl-bo={`${bo}-error-icon`}>
            <svg xmlns='http://www.w3.org/2000/svg' width='21' height='21' viewBox='0 0 21 21' focusable='false'>
              <g fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
                <path
                  stroke='#D32704'
                  strokeWidth='2'
                  d='M-.816 4.545l9.911-.109-9.911.11z'
                  transform='translate(-288 -682) translate(30 194) translate(26 321) translate(0 26) translate(232.08 141.012) translate(5.5 5.4) translate(.369 .48) rotate(-45 4.14 4.49)'
                />
                <path
                  stroke='#D32704'
                  strokeWidth='2'
                  d='M-.816 4.545l9.911-.109-9.911.11z'
                  transform='translate(-288 -682) translate(30 194) translate(26 321) translate(0 26) translate(232.08 141.012) translate(5.5 5.4) translate(.369 .48) rotate(45 4.14 4.49)'
                />
              </g>
            </svg>
          </span>
        ) : null}

        <span className={statusTextClasses} data-hrl-bo={`${bo}-status`}>
          {getStatusMessage()}
        </span>
      </div>
    </>
  );
};
