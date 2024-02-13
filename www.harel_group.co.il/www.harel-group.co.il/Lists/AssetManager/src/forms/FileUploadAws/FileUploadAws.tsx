import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import styles from './FileUploadAws.module.scss';
import {FileErrors, TypeItem} from './TypeItem/TypeItem';
import Constants from './Constants/upload.constants';
import {toCssClass} from '../../fp';


export interface FileUploadProps {
  value?: TagFileItem[];
  typeList: TagFileItem[];
  onChangeFiles?: (fileList: TagFileItem[]) => void;
  onError?: (fileItem: FileUploadItem, fileTypeCode: string | number, reason: string) => void;
  onStartUploading?: (fileItem: FileUploadItem, fileTypeCode: string | number) => void;
  onFinishUploading?: (fileItem: FileUploadItem, fileTypeCode: string | number, fileName?: string, phaseName?: string, success?: boolean) => void;
  onDeleted?: (fileItem: FileUploadItem) => void,
  maxFileSize?: string | number;
  allowedExtensions?: string[];
  id?: string;
  presignUrl: string;
  presignError?: string;
  uploadBucketError?: string;
  isUsingToken?: boolean;
  bo?: string;
  className?: string;
  errorMessages?: ErrorMessages;
  titleLevel?: number;
  subtitleLevel?: number;
  /**
   * @hidden
   * Pass proxy server url to allow on local
   * */
  proxy?: string,

}

export interface TagFileItem {
  code: string | number;
  name: string;
  description?: string;
  tooltipInfo?: string | (() => JSX.Element);
  isRequired?: boolean;
  hideAsterisk?: boolean;
  files?: FileUploadItem[];
  pickFilesText?: string;
  dropFilesText?: string;
  infoLink?: string | JSX.Element;
  docLink?: string;
  maxFilesAmount?: number;
  allowedExtensions?: string;
  bo?: string;
}

export interface FileUploadItem {
  name: string;
  uniqueName: string;
  uniqueKey: string;
  size: number;
  extension: string;
  id?: number;
  bo?: number;

  status?: string;
  progress?: number;
  statusText?: string;
  canceled?: any;
  errors?: FileErrors
}

interface ErrorMessages {
  required?: string;
  uploading?: string,
  invalid?: string;
}

export interface ValidateResponse {
  isValid: boolean;
  returnMessage: string,
  fileList: TagFileItem[];
}

export interface FileUploadRef {
  validate(): ValidateResponse;
}

export type ValidateFileTypeResult = {
  hasError: boolean;
  returnMessage: string;
}

export const validateFileType = (fileType: TagFileItem, errorMessages: ErrorMessages): ValidateFileTypeResult => {

  const hasInvalidFile = (file: FileUploadItem) => file.errors && Object.keys(file.errors).length > 0;
  const hasUploadingFile = (file: FileUploadItem) => file.status === 'uploading';

  const messages = {
    required: errorMessages.required || Constants.REQUIRED_FILES_ERROR_MESSAGE,
    invalid: errorMessages.invalid || Constants.INVALID_FILES_ERROR_MESSAGE,
    uploading: errorMessages.uploading || Constants.UPLOADING_STATUS_ERROR_MESSAGE,
  }

  switch (true) {
    case (fileType.isRequired && !fileType?.files?.length):
      return {hasError: true, returnMessage: messages.required};
    case (fileType.files && fileType.files.some(hasInvalidFile)):
      return {hasError: true, returnMessage: messages.invalid};
    case (fileType.files && fileType.files.some(hasUploadingFile)):
      return {hasError: true, returnMessage: messages.uploading};
    default:
      return {hasError: false, returnMessage: Constants.VALID_MESSAGE};
  }
}

export const FileUploadAws = forwardRef<FileUploadRef, FileUploadProps>((props, ref): JSX.Element => {
  const {
    maxFileSize = Constants.DEFAULT_MAX_FILE_SIZE,
    allowedExtensions = Constants.DEFAULT_EXTENSIONS,
    typeList = [],
    onChangeFiles,
    onError,
    onStartUploading,
    onFinishUploading,
    onDeleted,
    isUsingToken = false,
    value,
    id = 'file-upload',
    bo = 'hds-file-upload',
    errorMessages = {},
    presignUrl,
    presignError = Constants.PRESIGN_ERROR,
    uploadBucketError = Constants.UPLOAD_BUCKET_ERROR,
    proxy = undefined,
    //...otherProps
  } = props;

  const initFileTypes = (initialValue: TagFileItem[] | undefined, typeList: TagFileItem[]): TagFileItem[] => {
    if (initialValue?.length) {
      return initialValue;
    }

    typeList.forEach(item => {
      if (item?.isRequired == null) {
        item.isRequired = true;
      }
      if (item?.hideAsterisk == null) {
        item.hideAsterisk = true;
      }
    });
    return typeList;
  };

  const validate = (): ValidateResponse => {
    let isValid = true;
    let returnMessage = Constants.VALID_MESSAGE;

    for (const fileType of fileTypes) {
      const validate = validateFileType(fileType, errorMessages);
      if (validate.hasError) {
        isValid = false;
        returnMessage = validate.returnMessage;
        break;
      }
    }

    return {isValid, returnMessage, fileList: fileTypes};
  };

  const [fileTypes, setFileTypes] = useState<TagFileItem[]>([]);

  useEffect(() => {
    setFileTypes(initFileTypes(value, typeList));
    validate();
  }, [value, typeList]);

  useImperativeHandle(ref, () => ({validate}));

  const onChangeFileItem = (files: FileUploadItem[], code: string | number, isExecuteCallback: boolean = true) => {
    let index = getFileItemIndexByCode(code);
    fileTypes[index].files = [...files].map(({bo, id, ...e}) => e);
    //setFileTypes([...fileTypes]);
    validate();
    isExecuteCallback && onChangeFiles && onChangeFiles([...fileTypes]);
  };

  const getFileItemIndexByCode = (itemCode: string | number) => {
    return fileTypes.findIndex((file) => file.code === itemCode);
  };

  const onErrorFileItem = (file: FileUploadItem, fileTypeCode: string | number, reason: string) => {
    onError?.((({bo, id, ...e}) => e)(file), fileTypeCode, reason);
  }

  const onStartUploadingFile = (file: FileUploadItem, fileTypeCode: string | number) => {
    onStartUploading?.(file, fileTypeCode);
  }

  const onFinishUploadingFile = (file: FileUploadItem, fileTypeCode: string | number, fileName?: string, phaseName?: string, success?: boolean) => {
    onFinishUploading?.(file, fileTypeCode, fileName, phaseName, success);
  }

  const onDeletedFile = (file: FileUploadItem) => {
    console.log(file);
    onDeleted?.(file);
  }

  const classes = toCssClass([props.className]);

  return (
    <div id={id} className={classes} data-hrl-bo={bo}>
      {fileTypes?.map((fileType) => {
        return (
          <TypeItem
            code={fileType.code}
            name={fileType.name}
            description={fileType.description}
            isRequired={fileType.isRequired}
            hideAsterisk={fileType.hideAsterisk}
            files={fileType.files}
            maxFileSize={maxFileSize}
            allowedExtensions={allowedExtensions}
            maxFilesAmount={fileType.maxFilesAmount}
            onChangeFileItem={onChangeFileItem}
            onErrorFileItem={onErrorFileItem}
            onStartUploadingFile={onStartUploadingFile}
            onFinishUploadingFile={onFinishUploadingFile}
            isUsingToken={isUsingToken}
            tooltipInfo={fileType.tooltipInfo}
            presignUrl={presignUrl}
            className={styles.typeItemContainer}
            titleLevel={props.titleLevel}
            subtitleLevel={props.subtitleLevel}
            validateStatus={validateFileType(fileType, errorMessages)}
            bo={`${bo}-type-item-${fileType.code}`}
            key={fileType.code}
            pickFilesText={fileType.pickFilesText}
            dropFilesText={fileType.dropFilesText}
            infoLink={fileType.infoLink}
            docLink={fileType.docLink}
            presignError={presignError}
            uploadBucketError={uploadBucketError}
            proxy={proxy}
            onDeletedFile={onDeletedFile}
          />
        );
      })}
    </div>
  );
});
