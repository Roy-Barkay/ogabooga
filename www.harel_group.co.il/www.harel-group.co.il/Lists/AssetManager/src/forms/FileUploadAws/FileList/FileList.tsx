import React from 'react';
import {FileItem} from '../FileItem/FileItem';
import {FileUploadItem} from '../FileUploadAws';

import styles from './FileList.module.scss';

export interface FileListProps {
  hint?: string;
  error?: string | boolean;
  value?: string | number | readonly string[] | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  bo?: string;
  updateFilesCallback?: any;
  pickFilesText?: string;
  dropFilesText?: string;
  maxFileSize?: string | number;
  multiple?: boolean;
  hasError?: boolean;
  step?: string | number;
  id?: number;
  files: FileUploadItem[];
  onDeleteFile: (fileId: number) => any;
}

export const FileList = (props: FileListProps): JSX.Element => {
  const {files = [], bo = 'hds-file-list'} = props;

  return (
    <>
      {files && files.length > 0 ? (
        <section className={styles.fileListContainer} data-hrl-bo={bo}>
          {files.map((file) => {
            return <FileItem key={file.id} file={file} onDelete={props.onDeleteFile}
                             bo={`${bo}-item-${file.bo}`} />;
          })}
        </section>
      ) : null}
    </>
  );
};
