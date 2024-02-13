import React, {useEffect, useState} from 'react';
import {Progress} from '../Progress/Progress';
import {FileUploadItem} from '../FileUpload';
import CancelIcon from '../Icons/CancelIcon';
import TrashIcon from '../Icons/TrashIcon';
import {Button} from '../..';
import {toCssClass} from '../../../fp';

import styles from './FileItem.module.scss';

export interface FileItemProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  bo?: string;
  updateFilesCallback?: any;
  id?: string;
  file: FileUploadItem;
  name?: string;
  onDelete: (fileId: number) => any;
}

export const FileItem = (props: FileItemProps): JSX.Element => {
  const {bo = 'hds-file-item'} = props;

  const [fileDisplayName, setFileDisplayName] = useState<string>(props.file?.name);
  const [progress, setProgress] = useState<number>(0);
  const [progressInterval, setProgressInterval] = useState<any>(null);
  const MAX_MOCK_PROGRESS = 85;

  useEffect(() => {
    if (props.file && props.file.status === 'uploading' && progressInterval == null) {
      setProgressInterval(updateProgress());
    }
    return () => {
      if (props.file?.status === 'uploading') {
        props.file.canceled();
        delete props.file.canceled;
      }
    };
  }, []);

  useEffect(() => {
    if (props.file && props.file.status !== 'uploading') {
      clearInterval(progressInterval);
      setProgress(100);
    }
  }, [props.file?.status]);

  useEffect(() => {
    if (props.file && props.file.progress) {
      clearInterval(progressInterval);
      setProgress(props.file.progress);
    }
  }, [props.file?.progress]);

  useEffect(() => {
    if (props.file?.name != null) {
      setFileDisplayName(getFileNameWithoutExtension(props.file.name));
    }
  }, [props.file?.name]);

  const getFileNameWithoutExtension = (fileName: string): string => {
    return (fileName.split('.').slice(0, -1).join('.') || fileName);
  };

  const onClickDeleteButton = (fileId: number | undefined) => {
    fileId != null && props.onDelete(fileId);
  };

  const updateProgress = () => {
    let progress = 0;
    let interval = setInterval(function () {
      progress < MAX_MOCK_PROGRESS ? setProgress(progress++) : clearInterval(interval);
    }, 20);

    return interval;
  };

  const filesClasses = toCssClass([styles.contentContainer, styles.filesWrapper]);

  return (
    <section key={props.file?.id} className={styles.fileItemContainer} data-hrl-bo={bo}>
      <div className={filesClasses}>
        <div className={styles.fileTextContainer} data-hrl-bo={`${bo}-name`}>
          <span className={styles.fileNameText}>{fileDisplayName}</span>
          <span>{props.file?.extension ? `.${props.file.extension}` : ''}</span>
        </div>

        <Progress
          id={props.file.id}
          value={progress}
          status={props.file?.status}
          statusText={props.file?.statusText}
          fileName={props.file.name}
          bo={`${bo}-progress`}
        />
      </div>

      <div className={styles.deleteContainer}>
        <Button
          variant={'text'}
          className={styles.deleteFileButton}
          onClick={() => onClickDeleteButton(props.file.id)}
          aria-invalid={props?.file?.status === 'error'}
          bo={props.file.status === 'uploading' ? `${bo}-cancel-button` : `${bo}-remove-button`}
        >
          <i>
            {props.file.status === 'uploading' ? <CancelIcon focusable='false' /> : <TrashIcon focusable='false' />}
          </i>
          <span className={styles.accessibilityText}>{`מחיקת קובץ ${props.file.name}`}</span>
        </Button>
      </div>
    </section>
  );
};
