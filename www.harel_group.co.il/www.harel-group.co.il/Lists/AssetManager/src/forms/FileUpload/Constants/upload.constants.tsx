export default {
  WHITELIST_CHARS: '\\"//- פםןוטארק\'ףךלחיעכגדשץתצמנהבסזabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@!:.,~\n\r_?/()[]#',
  RIGHT_TO_LEFT_MARK: '\u200F',
  DEFAULT_MAX_FILE_SIZE: 7,
  DEFAULT_EXTENSIONS: ['doc', 'docx', 'pdf', 'xls', 'xlsx', 'tiff', 'tif', 'bmp', 'gif', 'jpeg', 'png', 'jpg'],
  DEFAULT_MAX_AMOUNT_FILES: 99,
  ZERO_FILE_SIZE_ERROR_MESSAGE: `לא ניתן לעלות קובץ בגודל 0`,
  maxFileSizeErrorMessage: (maxFileSize: number | string) => ` ניתן להעלות קבצים עד גודל ${maxFileSize}MB`,
  fileExtensionErrorMessage: (extension: string) => !extension ? `לא ניתן לעלות קובץ ללא סיומת` : `לא ניתן לעלות קובץ מסוג ${extension}`,
  maxFilesAmountErrorMessage: (maxFilesAmount: number | string) => `ניתן לעלות עד ${maxFilesAmount} קבצים `,
  FILE_NAME_ERROR_MESSAGE: `שם קובץ אינו תקין`,
  REQUIRED_FILES_ERROR_MESSAGE: 'חסרים מסמכי חובה',
  INVALID_FILES_ERROR_MESSAGE: 'יש להסיר קבצים לא תקינים',
  UPLOADING_STATUS_ERROR_MESSAGE: 'ישנם קבצים בתהליך העלאה',
  ENCRYPTED_FILE: 'לא ניתן להעלות קובץ מוגן',
  VALID_MESSAGE: 'תקין'
}

