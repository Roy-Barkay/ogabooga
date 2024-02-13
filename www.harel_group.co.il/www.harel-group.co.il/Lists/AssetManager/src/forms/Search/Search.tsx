import React from 'react';
import {createPortal} from 'react-dom';
import SearchIcon from './icons/SearchIcon';
import ClearIcon from './icons/ClearIcon';
import LeftArrowIcon from './icons/LeftArrowIcon';
import {SearchItem, SearchItems} from './SearchItems';
import styles from './Search.module.scss';
import {Button} from '..';
import {AutocompleteItem} from '../Autocomplete/AutocompleteItems';

export interface SearchProps {
  placeholder?: string;
  value?: any;
  items?: any;
  recent?: any;
  onChange?: any;
  onInputChange?: any;
  onError?: any;
  disabled?: boolean;
  required?: boolean;
  bo?: string;
  errorMessages?: {
    required: string;
    notfound: string;
    general: string;
  };
  ariaDescribedby?: string;
  ariaLabel?: string;
  hint?: string;
  secondary?: boolean;
}

const defaultErrors = {
  required: 'שדה חובה',
  notfound: 'לא נמצא',
  general: 'אירע שגיאה, נא לנסות שנית'
}

export const Search = ({
                         disabled = false,
                         required = false,
                         ariaLabel = '',
                         placeholder = '',
                         value = null,
                         items = [],
                         recent = [],
                         errorMessages = defaultErrors,
                         bo = 'hds-search',
                         onChange = null,
                         onError = null,
                         onInputChange = null,
                         ariaDescribedby = 'Please send me exactly description',
                         hint = '',
                         secondary = false,
                       }: SearchProps) => {

  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropDownItemsRef = React.useRef<HTMLUListElement>(null);
  const dropDownRecentRef = React.useRef<HTMLUListElement>(null);
  const dropDownContainerRef = React.useRef<HTMLDivElement>(null);
  const thisComponentRef = React.useRef<HTMLDivElement>(null);

  enum keyArrowPress {
    UP = 1,
    DOWN = 0,
  }

  const isEqualStrings = (s1: string, s2: string): boolean => s1.toLowerCase().trim() === s2.toLowerCase().trim();

  const [isError, setIsError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const initItemsToObject = (items: any): SearchItem[] => {
    if (typeof items === 'string') {
      setIsError(true);
      setErrorMessage(errorMessages.general);
      throw new Error(' >>>> Items Should be Array');
    }

    return items.map((v: any, i: number) => {
      return {
        id: v.id || i,
        label: v?.label || v
      };
    });
  };

  const [isSelectedValue, setIsSelectedValue] = React.useState<any>(value ? value : '');
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const [hasFocusClassName, setHasFocusClassName] = React.useState<string>('');
  const [focusOnItem, setFocusOnItem] = React.useState<number>(-1);
  const [inputId] = React.useState<string>(`Search_${Math.floor(Math.random() * 100) + 10}_${Math.floor(Math.random() * 999) + 101}`);
  const [disabledClassName] = React.useState<string>(disabled ? styles.disabled : '');
  const [options, setOptions] = React.useState<any>(items ? initItemsToObject(items) : []);
  const [recentOptions, setRecentOptions] = React.useState<any>(recent ? initItemsToObject(recent) : []);
  const [errorClassName, setErrorClassName] = React.useState<string>('');
  const [dropDownPosition, setDropDownPosition] = React.useState<any>({});


  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    //checkIfInputHasValue();
  }, []);

  React.useEffect(() => {
    isFocus && inputRef?.current?.focus();
    if (isFocus && thisComponentRef.current) {
      DropDownPosition();
    }
  }, [isFocus]);

  React.useEffect(() => {
    focusOnItem === -1 && dropDownItemsRef?.current?.focus();
    if (focusOnItem > -1 && dropDownItemsRef?.current?.childNodes.length) {
      const currentElement = dropDownItemsRef?.current?.childNodes;
      // @ts-ignore
      currentElement[focusOnItem]?.focus();
      // @ts-ignore
      const isInputValue = currentElement[focusOnItem]?.innerText;
      setIsSelectedValue(isInputValue);
    }
  }, [focusOnItem]);

  React.useEffect(() => {
    if (inputRef?.current?.value) {
      setIsSelectedValue(inputRef?.current?.value);
    }
  }, [inputRef?.current?.value]);

  React.useEffect(() => {
    if (typeof onChange === 'function') {
      let valueObj: AutocompleteItem | any = null;
      if (!isError) {
        if (typeof isSelectedValue === 'string') {
          const foundItemInData = options.filter((d: any) => d.label === isSelectedValue.trim());
          valueObj = foundItemInData.length && foundItemInData[0];
        } else if (typeof isSelectedValue === 'object') {
          valueObj = isSelectedValue;
        }
      }
      onChange(valueObj);
    }
  }, [isSelectedValue]);

  React.useEffect(() => {
    setOptions(initItemsToObject(items || []));
  }, [items]);

  React.useEffect(() => {
    setRecentOptions(initItemsToObject(recent || []));
  }, [recent]);

  React.useEffect(() => {
    if (isError) {
      setErrorClassName(styles.error);
      if (typeof onError === 'function') {
        onError({error: errorMessage})
      }
    } else {
      setErrorClassName('');
    }
  }, [isError]);

  const filterDropDownAfterEnter = () => {
    //const mainStr = inputRef?.current?.value;
    // const filterData = mainStr ? data.filter((v: any) => {
    //   return initValueForFiltering(v, mainStr.trim()) && v;
    // }) : data;

    //setOptions(filterData);
    setIsError(false);
    setErrorMessage('');
    //setIsSelectedValue(mainStr);
  };

  const onKeyDownHandle = (e: any) => {
    switch (e.key) {
      case 'ArrowUp':
        moveFocusHandle(keyArrowPress.UP);
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveFocusHandle(keyArrowPress.DOWN);
        break;
      case 'Escape':
        onBlurInput();
        EscapeKeyDown();
        thisComponentRef?.current?.blur();
        break;
      case 'Tab':
        onBlurInput();
        onBlurHandle();
        thisComponentRef?.current?.blur();
        break;
      case 'Enter':
        filterDropDownAfterEnter();
        inputRef?.current?.focus();
        onBlurHandle();
        break;
      default:
        break;
    }
  }

  const moveFocusHandle = (flag: keyArrowPress): void => {

    if (flag && focusOnItem < 0) {
      inputRef?.current?.focus();
      return;
    }

    const minusFocusOnItem = focusOnItem !== -1 ? focusOnItem - 1 : 0;

    const childrenLength = dropDownItemsRef?.current?.childNodes?.length || 0;

    const plusFocusOnItem = focusOnItem >= childrenLength - 1 ? focusOnItem : focusOnItem + 1;

    const newFocusItem = flag ? minusFocusOnItem : plusFocusOnItem;

    setFocusOnItem(newFocusItem);
  }

  const EscapeKeyDown = () => {
    let inputValue = value?.label || value;
    inputValue = inputValue ?? '';
    setFocusOnItem(-1);
    //setOptions(data);
    if (inputValue) {
      setIsFocus(true);
      setHasFocusClassName(styles.hasFocus);
    } else {
      setIsFocus(false);
      setHasFocusClassName('');
    }
    //setIsSelectedValue(inputValue);
  };

  const onBlurInput = () => {
    const nodename = document.activeElement?.nodeName;
    if (nodename) {
      if (isEqualStrings(nodename, 'INPUT')) {
        inputRef?.current?.blur();
      }
    }
  }

  const onDropDownOpenHandle = () => {
    if (isFocus) {
      setIsFocus(false);
    } else if (!disabled) {
      onFocusHandle();
    }
  }

  const onFocusHandle = () => {
    document.addEventListener('mousedown', handleClickOutside);
    //const mainStr = inputRef?.current?.value;
    // const filterData = mainStr ? data.filter((v: any) => {
    //   return initValueForFiltering(v, mainStr.trim()) && v;
    // }) : data;
    setIsFocus(true);
    //setOptions(filterData);
  };


  const handleClickOutside = (e: any) => {
    if (e?.target && dropDownContainerRef.current && !dropDownContainerRef.current.contains(e.target)) {
      document.removeEventListener('mousedown', handleClickOutside);
      thisComponentRef?.current?.blur();
      setIsFocus(false);
      onBlurHandle();
    }
  };

  const onBlurHandle = () => {
    const inputValue = (inputRef?.current?.value || '').trim();
    if (!inputValue) {
      setFocusOnItem(-1);
      setIsFocus(false);
      setHasFocusClassName('');
      setIsSelectedValue(inputValue);
    }
  };

  const onChangeHandle = (e: any) => {
    setIsSelectedValue(e.target.value);
    onInputChange?.(e.target.value);
    if (!e.target.value.trim()) {
      setHasFocusClassName(styles.hasFocus);
      setIsFocus(true);
      setFocusOnItem(-1);
    } else {
      setHasFocusClassName(options?.length > 0 ? styles.hasFocus : '');
      setFocusOnItem(-1);
    }
  };

  const onClickSearchButton = () => {

  };

  const onClickClearButton = () => {
    setIsSelectedValue('');
    setOptions([]);
  };

  const parseSelectedValue = (e: AutocompleteItem | any) => {
    if (e.target?.hasOwnProperty('value')) {
      return e.target.value;
    } else {
      return e;
    }
  }

  const updateValueByClick = (selectedItem: AutocompleteItem, index: number) => {
    //const filteredDropdownItems = filterDropDown(selectedItem);
    const isInputValue = parseSelectedValue(selectedItem);
    //inputRef?.current?.focus();
    //setOptions(filteredDropdownItems);
    setIsFocus(false);
    setIsError(false);
    setErrorMessage('');
    setFocusOnItem(index);
    setIsSelectedValue(isInputValue.label);
    onInputChange?.(isInputValue.label);
  };

  const DropDownPosition = () => {
    // @ts-ignore
    const {top, width, height, right} = thisComponentRef?.current?.getBoundingClientRect();
    const hintAreaSize = hint ? 25 : 0;
    const paddingTop = 44;
    const position = {
      top: top + window.scrollY + height - hintAreaSize - paddingTop,
      left: right - width,
      width,
      visibility: 'visible'
    };
    setDropDownPosition(position);
  }

  const HintAndErrorMessages = (): JSX.Element | null => {
    if (isError) {
      return <span className={styles.error}>{errorMessage}</span>
    } else if (hint) {
      return <span className={styles.hint}>{hint}</span>
    }
    return null;
  }

  return (
    <div id={inputId}
         data-hrl-bo={bo}
         tabIndex={0}
         ref={thisComponentRef}
         className={`${styles.Search} ${hasFocusClassName}`}
         onKeyDown={onKeyDownHandle}
    >
      <div className={`${styles.inputBoxWrapper} ${errorClassName}`}>
        <div className={`${styles.inputbox} ${disabledClassName}`}>
          <input type='text'
                 id={`SearchInput_${inputId}`}
                 value={isSelectedValue}
                 ref={inputRef}
                 onKeyDown={onKeyDownHandle}
                 onFocus={onFocusHandle}
                 disabled={disabled}
                 onChange={onChangeHandle}
            //onClick={onChangeHandle}
                 role='combobox'
                 aria-autocomplete='list'
                 aria-controls={`SearchList_${inputId}`}
                 aria-expanded='false'
                 aria-haspopup='listbox'
                 aria-disabled={disabled}
                 aria-required={required}
                 aria-label={ariaLabel}
                 aria-describedby={ariaDescribedby}
                 placeholder={placeholder}
          />
        </div>

        <div className={styles.buttonsContainer} tabIndex={0}>
          {isSelectedValue?.length > 0 &&
          <Button variant={'text'} className={styles.iconButton} onClick={onClickClearButton} bo={`${bo}-clear-button`}>
            <span>
              <ClearIcon focusable='false' />
            </span>
          </Button>
          }

          <Button variant={'text'} className={styles.iconButton} onClick={onClickSearchButton}
                  bo={`${bo}-search-button`}>
            <span className={styles.icon}
                  onClick={onDropDownOpenHandle}
            >
              {isFocus && isSelectedValue ?
                <LeftArrowIcon focusable='false' secondary={secondary} />
                : <SearchIcon focusable='false' secondary={secondary} />
              }
            </span>
          </Button>
        </div>
      </div>
      {isFocus && createPortal(
        <div className={styles.Search_dropdownDiv} style={dropDownPosition} ref={dropDownContainerRef}>
          {options?.length > 0 &&
          <ul ref={dropDownItemsRef} role='listbox' aria-label={ariaLabel} id={`SearchList_${inputId}`}>
            <SearchItems itemOptions={options}
                         searchBy={'CONTAIN'}
                         focusOnItem={focusOnItem}
                         search={isSelectedValue}
                         updateValueByClick={updateValueByClick}
            />
          </ul>
          }
          {recent?.length > 0 &&
          <>
            {options?.length > 0 &&
            <div className={styles.recentSeparatorContainer}>
              <span className={styles.recentSeparatorLine} />
            </div>
            }
            <div className={styles.recentHeader}>חיפושים קודמים שלך</div>
            <ul ref={dropDownRecentRef} role='listbox' aria-label={ariaLabel} id={`RecentList_${inputId}`}>
              <SearchItems itemOptions={recentOptions}
                           searchBy={'CONTAIN'}
                           focusOnItem={focusOnItem}
                           updateValueByClick={updateValueByClick}
              />
            </ul>
          </>
          }
        </div>, document.body)}
      {<HintAndErrorMessages />}
    </div>
  );
};

export default Search;

