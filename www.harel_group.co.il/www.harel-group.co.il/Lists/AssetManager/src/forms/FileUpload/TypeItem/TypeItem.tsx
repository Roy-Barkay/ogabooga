import React, {useRef, useState} from 'react';
import {FileList} from '../FileList/FileList';
import {uploadFile} from '../UploadRestApi/UploadRestApi';
import {Tooltip} from '../../../components';
import {FileUploadItem, ValidateFileTypeResult} from '../FileUpload';
import FolderIcon from '../Icons/FolderIcon';
import AddIcon from '../Icons/AddIcon';
import InfoOpenIcon from '../Icons/InfoOpenIcon';
import InfoIcon from '../Icons/InfoIcon';
import {Button} from '../../Button/Button';
import Constants from '../Constants/upload.constants';
import {Title} from '../../../typography';
import {toCssClass} from '../../../fp';
import * as ReactDOMServer from 'react-dom/server';

import styles from './TypeItem.module.scss';

export interface TypeItemProps {
  code: string | number;
  name: string | JSX.Element;
  description?: string | JSX.Element;
  tooltipInfo?: string | (() => JSX.Element);
  isRequired?: boolean;
  hideAsterisk?: boolean;
  files?: FileUploadItem[];
  maxFilesAmount?: number;
  allowedExtensions: string[];
  infoLink?: string | JSX.Element;
  docLink?: string;
  bo?: string;
  onChangeFileItem?: (files: FileUploadItem[], code: string | number, isExecuteCallback: boolean | undefined) => any;
  onErrorFileItem?: (file: FileUploadItem, fileTypeCode: string | number, reason: string) => void;
  onStartUploadingFile?: (file: FileUploadItem, fileTypeCode: string | number) => void;
  onFinishUploadingFile?: (file: FileUploadItem, fileTypeCode: string | number) => void;
  pickFilesText?: string;
  dropFilesText?: string;
  maxFileSize?: string | number;
  isMultiple?: boolean;
  id?: string;
  url: string;
  isUsingToken: boolean;
  className?: string;
  validateStatus?: ValidateFileTypeResult;
  titleLevel?: any;
  subtitleLevel?: any;
  ariaDescribedby?: string;
}

export interface FileErrors {
  maxSize?: boolean;
  zeroSize?: boolean;
  extension?: boolean;
  name?: boolean;
  maxAmount?: boolean;
  encrypted?: boolean;
  upload?: boolean;
}

export const TypeItem = (props: TypeItemProps): JSX.Element => {
  const {
    name = '',
    description = '',
    pickFilesText = 'בחירת קובץ',
    dropFilesText = '(אפשר גם לגרור לכאן)',
    onChangeFileItem = () => {
    },
    onErrorFileItem = () => {
    },
    onStartUploadingFile,
    onFinishUploadingFile,
    maxFileSize = 0,
    isMultiple = true,
    url = '/api/file-upload/',
    isUsingToken = false,
    tooltipInfo = '',
    maxFilesAmount = Constants.DEFAULT_MAX_AMOUNT_FILES,
    bo = 'hds-type-item',
    titleLevel = 3,
    subtitleLevel = 4,
    // validateStatus,
    isRequired,
    infoLink = null,
  } = props;

  let name_ToString = name;
  if (typeof name !== 'string') {
    name_ToString = ReactDOMServer.renderToString(name);
    name_ToString = name_ToString.replace(/<[^>]*>/g, '');
  }

  const getMaxFileBo = () => {
    if (!files.length) {
      return -1;
    }
    return files.reduce((maxBo, curr) => (curr.bo && maxBo < curr.bo ? curr.bo : maxBo), -1);
  };

  const generateRandomId = () => {
    return Math.floor(Date.now() + (Math.random() * 100000))
  };

  const initFiles = () => {
    if (props.files?.length) {
      let currentBo = -1;
      props.files.forEach(fileItem => {
        if (!fileItem.id) fileItem.id = generateRandomId();
        if (!fileItem.bo) fileItem.bo = ++currentBo;
      })
      return props.files;
    }
    return [];
  }

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileUploadItem[]>(initFiles());
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isShowUploadContainer, setIsShowUploadContainer] = useState<boolean>(!files?.length);
  const [isHoverTooltip, setIsHoverTooltip] = useState<boolean>(false);
  const [filesBoIncrementer, setFilesBoIncrementer] = useState<number>(getMaxFileBo());
  const [maxAmountErrorList, setMaxAmountErrorList] = useState<string[]>([]);

  const handleUploadBtnClick = () => {
    if (fileInputRef?.current?.click) {
      fileInputRef.current.click();
    }
  };

  const onChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target?.files?.length && handleNewFileUpload(e.target.files);
  };

  const dragEnterHandle = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const dragLeaveHandle = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const dragOverHandle = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e?.dataTransfer?.files?.length) {
      handleNewFileUpload(e.dataTransfer.files);
    }
  };

  const handleNewFileUpload = (newFiles: FileList) => {
    if (newFiles?.length) {
      let updatedFileType = addNewFiles(Array.from(newFiles));
      setFiles(updatedFileType);
      setIsShowUploadContainer(false);
    }
  };

  const generateBlob = (originalFile: File) => {
    return originalFile.slice(0, originalFile.size, originalFile.type);
  };

  const generateFileUploadItem = (file: File, bo: number): FileUploadItem => {
    return {
      name: cleanRLMChar(file.name),
      extension: getExtension(file.name),
      size: file.size,
      id: generateRandomId(),
      bo,
      status: 'uploading',
      uniqueName: '',
      uniqueKey: ''
    };
  };

  const getExtension = (fileName: string): string => {
    let splitFileNameArray = fileName.split('.');
    return splitFileNameArray.length > 1 ? (splitFileNameArray.pop() || '').toLowerCase() : '';
  };

  const cleanRLMChar = (fileName: string): string => {
    let str = '';
    for (let i = 0; i < fileName.length; ++i) {
      if (fileName[i] === Constants.RIGHT_TO_LEFT_MARK) {
        continue;
      }
      str += fileName[i];
    }
    return str;
  };

  const runFileUpLoad = (file: File, fileUploadItem: FileUploadItem): Promise<File | any> => {
    return uploading(file, fileUploadItem)
      .then((res) => handleUploadResponse(res, fileUploadItem))
      .catch((err) => {
        console.log('err: ' + err);
        handleUploadResponse({}, fileUploadItem);
      });
  };


  const checkAndUploadEncryptedFile = (file: File, fileUploadItem: FileUploadItem, type: any) => {
    const reader = new FileReader();
    reader.onloadend = async (evt: any) => {
      const contentOfFile = evt.target.result;
      let fileIsEncrypted = false;
      if (type === 'application/pdf') {
        fileIsEncrypted = contentOfFile.substring(contentOfFile.lastIndexOf('<<'), contentOfFile.lastIndexOf('>>')).includes('/Encrypt');
      }
      if (!fileIsEncrypted) {
        await runFileUpLoad(file, fileUploadItem);
      } else {
        let errors: FileErrors = {};
        fileUploadItem.status = 'error';
        fileUploadItem.statusText = Constants.ENCRYPTED_FILE;
        errors.encrypted = true;
        fileUploadItem.errors = {...errors};
      }
    };
    reader.readAsBinaryString(file);
  }


  const addNewFiles = (newFiles: File[]) => {
    let currentBo = filesBoIncrementer;
    setFilesBoIncrementer(currentBo + newFiles.length);
    for (let file of newFiles) {
      let fileUploadItem: FileUploadItem = generateFileUploadItem(file, ++currentBo);
      let isValidFile = checkFileValidation(fileUploadItem);
      if (isValidFile) {
        // check PDF files ::: is encrypted => true/false
        if (file.type === 'application/pdf') {
          checkAndUploadEncryptedFile(file, fileUploadItem, file.type);
        } else {
          uploading(file, fileUploadItem)
            .then((res) => handleUploadResponse(res, fileUploadItem))
            .catch((err) => {
              console.log('err: ' + err);
              handleUploadResponse({}, fileUploadItem);
            });
        }
      } else {
        onErrorFileItem(fileUploadItem, props.code, 'validationError');
      }

      if (fileUploadItem.errors?.maxAmount && fileUploadItem.statusText) {
        maxAmountErrorList.push(fileUploadItem.name);
        //generalErrors.push(fileUploadItem.statusText);
        setMaxAmountErrorList([...maxAmountErrorList]);
        continue;
      }

      if (!isMultiple) {
        onChangeFileItem([fileUploadItem], props.code, !isValidFile);
        return [fileUploadItem];
      }

      files.push(fileUploadItem);
      onChangeFileItem([...files], props.code, !isValidFile);
    }
    return [...files];
  };

  const checkFileValidation = (fileUploadItem: FileUploadItem): boolean => {
    let errors: FileErrors = {};
    if (!isValidFileSize(fileUploadItem.size)) {
      fileUploadItem.status = 'error';
      fileUploadItem.statusText = Constants.maxFileSizeErrorMessage(maxFileSize);
      errors.maxSize = true;
    }
    if (!isNotZeroFileSize(fileUploadItem.size)) {
      fileUploadItem.status = 'error';
      fileUploadItem.statusText = Constants.ZERO_FILE_SIZE_ERROR_MESSAGE;
      errors.zeroSize = true;
    }
    if (!isValidFileExtension(fileUploadItem.extension)) {
      fileUploadItem.status = 'error';
      fileUploadItem.statusText = Constants.fileExtensionErrorMessage(fileUploadItem.extension);
      errors.extension = true;
    }
    if (!isValidFileName(fileUploadItem.name)) {
      fileUploadItem.status = 'error';
      fileUploadItem.statusText = Constants.FILE_NAME_ERROR_MESSAGE;
      errors.name = true;
    }
    if (maxFilesAmount && files.length >= maxFilesAmount) {
      fileUploadItem.status = 'error';
      fileUploadItem.statusText = Constants.maxFilesAmountErrorMessage(maxFilesAmount);
      errors.maxAmount = true;
    }

    if (Object.keys(errors).length > 0) {
      fileUploadItem.errors = {...errors};
    }
    return fileUploadItem.status !== 'error';
  };

  const isValidFileSize = (fileSize: number): boolean => {
    return convertBytesToMb(fileSize) <= maxFileSize;
  };

  const isNotZeroFileSize = (fileSize: number): boolean => {
    return fileSize > 0;
  };

  const isValidFileExtension = (fileExtension: string): boolean => {
    return props.allowedExtensions.includes(fileExtension);
  };

  const isValidFileName = (fileName: string): boolean => {
    for (let i = 0; i < fileName.length; ++i) {
      if (Constants.WHITELIST_CHARS.indexOf(fileName[i]) === -1) {
        return false;
      }
    }

    return true;
  };

  const convertBytesToMb = (bytes: number) => {
    return bytes / 1024 / 1024;
  };

  const isSuccessUploadResponse = (response: any): boolean => {
    return (
      (response.status === 200 || response.status === 202) &&
      response?.data?.success &&
      response?.data?.items?.length &&
      response.data.items[0].returnCode === 0
    );
  };

  const isCanceledUpload = (response: any): boolean => {
    return response?.data?.canceled;
  };

  const handleUploadResponse = (response: any, fileUploadItem: FileUploadItem) => {
    if (isCanceledUpload(response)) {
      onFinishUploadingFile?.(fileUploadItem, props.code);
      return;
    }

    updateFileProgress(fileUploadItem, 100, true);
    if (isSuccessUploadResponse(response)) {
      fileUploadItem.status = 'success';
      fileUploadItem.uniqueKey = response.data.items[0].filePK;
      fileUploadItem.uniqueName = response.data.items[0].fileName;
    } else {
      fileUploadItem.status = 'error';
      fileUploadItem.errors = {upload: true};
      onErrorFileItem(fileUploadItem, props.code, 'uploadError');
    }
    setFiles((files) => {
      delete fileUploadItem.canceled;
      let clonedFiles = JSON.parse(JSON.stringify(files));
      let index = files.findIndex((file) => file.id === fileUploadItem.id);
      clonedFiles[index] = fileUploadItem;
      onFinishUploadingFile?.(fileUploadItem, props.code);
      onChangeFileItem([...clonedFiles], props.code, true);
      return clonedFiles;
    });
  };

  const uploading = async (file: File, fileUploadItem: FileUploadItem): Promise<File | any> => {
    let fileCopyAsBlob = generateBlob(file);
    let data = new FormData();
    data.append('data', fileCopyAsBlob, cleanRLMChar(file.name));
    return await uploadFile(url, data, updateFileProgress, fileUploadItem, isUsingToken, startUploadingCallback);
  };

  const updateFileProgress = (fileUploadItem: FileUploadItem, progress: any, isCompleted: any) => {
    const currentFileIndex = getFileIndexById(fileUploadItem.id);
    if (currentFileIndex !== -1) {
      if (progress === 100 && isCompleted) {
        fileUploadItem.progress = progress;
      } else {
        if (progress < 100) {
          fileUploadItem.progress = progress;
        }
      }
    } else {
      fileUploadItem.progress = progress;
    }
  };

  const startUploadingCallback = (fileUploadItem: FileUploadItem) => {
    onStartUploadingFile?.(fileUploadItem, props.code);
  };

  const removeFile = (fileId: number) => {
    let fileToRemove = files[getFileIndexById(fileId)];
    let updateFiles = files.filter((file) => file != fileToRemove);
    setFiles([...updateFiles]);
    resetMaxAmountErrorList();
    onChangeFileItem([...updateFiles], props.code, true);
  };

  const getFileIndexById = (fileId: number | undefined) => {
    return files.findIndex((file) => file.id === fileId);
  };

  const isShowAdditionalFileButton = (): boolean => {
    return !!files?.length && (!maxFilesAmount || files.length < maxFilesAmount) && isMultiple && !isShowUploadContainer;
  };

  const resetMaxAmountErrorList = (): void => {
    maxAmountErrorList?.length && setMaxAmountErrorList([]);
  };

  const classes = toCssClass([props.className]);

  const fileUploadContainer = toCssClass([
    styles.fileUploadContainer,
    isDragging && 'dragging',
    isRequired && 'required',
  ]);

  const openTooltip = React.useRef(false);

  const maxWidthMobile = (window.innerWidth < 576) ? {'maxWidth': '220px'} : {'maxWidth': 'none'};

  return (
    <div className={classes} data-hrl-bo={bo}>
      <div className={styles.fileTypeContainer}>
        <div className={styles.title} data-hrl-bo={`${bo}-header`}>
          <Title level={titleLevel} className={styles.titleText}
                 bo={`${bo}-title`}>{name}{(props.isRequired && !props.hideAsterisk) &&
          <span className={styles.Asterisk}>*</span>}</Title>
          <div className={styles.subtitle} data-hrl-bo={`${bo}-subtitle`}>
            <Title level={subtitleLevel} className={styles.subtitleText}>{description}</Title>
          </div>
        </div>

        {!!tooltipInfo ? (
          <Tooltip id={`tooltip-${props.code}`} text={tooltipInfo} isOpen={openTooltip.current}
                   placement={window.innerWidth > 576 ? 'top' : 'right-end'} bo={`${bo}-tooltip`}
                   style={maxWidthMobile}>
            <i
              onMouseOver={() => {
                openTooltip.current = true;
                setIsHoverTooltip(true)
              }}
              onMouseLeave={() => {
                openTooltip.current = false;
                setIsHoverTooltip(false)
              }}
              onFocus={() => {
                openTooltip.current = true;
                setIsHoverTooltip(true)
              }}
              onBlur={() => {
                setIsHoverTooltip(false);
                openTooltip.current = false;
              }}
              onBlurCapture={() => {
                setIsHoverTooltip(false);
                openTooltip.current = false;
              }}
              aria-label={`רמז צץ על ${name_ToString}`}
              aria-describedby={`tooltip-${props.code}`}
              tabIndex={0}
              role='img'
            >
              {isHoverTooltip ? <InfoOpenIcon focusable='false' /> : <InfoIcon focusable='false' />}
            </i>
          </Tooltip>
        ) : null}

      </div>

      <article>
        {files && Object.keys(files).length > 0 ? (
          <FileList files={files} onDeleteFile={(fileId) => removeFile(fileId)} bo={`${bo}-list`} />
        ) : null}
      </article>

      {isShowAdditionalFileButton() ? (
        <div className={styles.additionalFileButtonWrapper}>
          <Button
            variant={'text'}
            className={styles.additionalFileButton}
            onClick={() => setIsShowUploadContainer(true)}
            bo={`${bo}-add-button`}
          >
            <i>
              <AddIcon focusable='false' />
            </i>
            <span className={styles.text}>קובץ נוסף</span>
            <span className={styles.accessibilityText}>{`עבור ${name_ToString}`}</span>
          </Button>
        </div>
      ) : null}

      {maxAmountErrorList?.length ? (
        <div className={styles.generalError} data-hrl-bo={`${bo}-max-amount-error`}>
          <span className={styles.message} data-hrl-bo={`${bo}-max-amount-error-message`}>
            {`ניתן לעלות עד ${maxFilesAmount} קבצים. הקבצים הבאים לא הועלו: `}
          </span>
          <ul className={styles.list} data-hrl-bo={`${bo}-max-amount-error-list`}>
            {maxAmountErrorList.map((error, index) => (
              <li key={index} data-hrl-bo={`${bo}-max-amount-error-list-item-${index}`}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}


      {!files?.length || isShowUploadContainer ? (
        <>
          <section className={fileUploadContainer}
                   onDragEnter={dragEnterHandle}
                   onDragLeave={dragLeaveHandle}
                   onDragOver={dragOverHandle}
                   onDrop={dropHandler}>

            <button type='button'
                    aria-required={isRequired}
                    className={styles.fileUploadInputButton}
                    onClick={handleUploadBtnClick}
                    data-hrl-bo={`${bo}-input-button`}
                    aria-describedby={props.ariaDescribedby}
            >
              <div className={styles.fileChooseIconWrapper}>
                <FolderIcon focusable='false' data-hrl-bo={`${bo}-choose-icon`} />
              </div>

              <label className={styles.fileChooseText} htmlFor={`file-input-${props.code}`}
                     data-hrl-bo={`${bo}-choose-label`}>
                <span>{pickFilesText}</span>
                <span className={styles.accessibilityText}>{`עבור ${name_ToString}`}</span>
                <span className={styles.desktopDisplay}>{dropFilesText}</span>
              </label>
            </button>

            <input
              type='file'
              id={`file-input-${props.code}`}
              name={`file-input-${props.code}`}
              ref={fileInputRef}
              title=''
              className={styles.formField}
              onChange={(e) => onChangeInputFile(e)}
              multiple={maxFilesAmount > 1}
              data-hrl-bo={`${bo}-input`}
              required={isRequired}
              aria-label={`העלאת קובץ ${name_ToString}`}
              aria-required={isRequired}
            />
          </section>
          <span className={styles.infoLink}>{infoLink}</span>
        </>
      ) : null}
    </div>
  );
};
