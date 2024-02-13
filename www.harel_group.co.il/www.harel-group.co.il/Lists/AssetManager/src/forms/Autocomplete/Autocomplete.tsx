import React from 'react';
import ArrowIcon from './icons/ArrowIcon';
import {AutocompleteItem, AutocompleteItems} from './AutocompleteItems';
import {Label} from '../Label/Label';

import styles from './Autocomplete.module.scss';

export interface AutocompleteProps {
    id?: string;
    label?: string;
    value?: any;
    items?: any;
    onChange?: any;
    onError?: any;
    disabled?: boolean;
    required?: boolean;
    hideAsterisk?: boolean;
    searchBy?: 'CONTAIN' | 'STARTFROM';
    bo?: string;
    errorMessages?: {
        required: string;
        notfound: string;
        general: string;
    };
    ariaDescribedby?: string;
    hint?: string;
    inputBackgroundColor?: string;
}

const defaultErrors = {
    required: 'שדה חובה',
    notfound: 'לא נמצא',
    general: 'אירע שגיאה, נא לנסות שנית'
}

export const Autocomplete = ({
                                 disabled = false,
                                 required = false,
                                 hideAsterisk = false,
                                 id = '',
                                 label = '',
                                 searchBy = 'CONTAIN',
                                 value = null,
                                 items = [],
                                 errorMessages = defaultErrors,
                                 bo = 'hds-autocomplete',
                                 onChange = null,
                                 onError = null,
                                 ariaDescribedby = 'Please send me exactly description',
                                 hint = '',
                                 inputBackgroundColor = ''
                             }: AutocompleteProps) => {

    const inputRef = React.useRef<HTMLInputElement>(null);
    const dropDownItemsRef = React.useRef<HTMLUListElement>(null);
    const thisComponentRef = React.useRef<HTMLDivElement>(null);


    enum keyArrowPress {
        UP = 1,
        DOWN = 0,
    }

    const isEqualStrings = (s1: string, s2: string): boolean => s1.toLowerCase().trim() === s2.toLowerCase().trim();


    const [isError, setIsError] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const initItemsToObject = (items: any): AutocompleteItem[] => {
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
    const [inputId] = React.useState<string>(id ? id : `Autocomplete_${Math.floor(Math.random() * 100) + 10}_${Math.floor(Math.random() * 999) + 101}`);
    const [disabledClassName] = React.useState<string>(disabled ? styles.disabled : '');
    const [labelMoveUpClassName, setLabelMoveUpClassName] = React.useState<string>('');
    const [options, setOptions] = React.useState<any>(items ? initItemsToObject(items) : []);
    const [data, setData] = React.useState<any>(items ? initItemsToObject(items) : []);
    const [errorClassName, setErrorClassName] = React.useState<string>('');

    const parseSelectedValue = (e: AutocompleteItem | any) => {
        if (e.target?.hasOwnProperty('value')) {
            return e.target.value;
        } else {
            return e;
        }
    }

    const filterDropDown = (e: any) => {
        const selectedValueOutput = parseSelectedValue(e);
        let mainStr: string = '';
        if (typeof selectedValueOutput === 'object') {
            mainStr = selectedValueOutput.label;
        } else {
            mainStr = inputRef?.current?.value || '';
        }
        return mainStr ? data.filter((v: any) => {
            return initValueForFiltering(v, mainStr.trim()) && v;
        }) : data;
    }

    const filterDropDownAfterEnter = () => {
        const mainStr = inputRef?.current?.value;
        const filterData = mainStr ? data.filter((v: any) => {
            return initValueForFiltering(v, mainStr.trim()) && v;
        }) : data;

        setOptions(filterData);
        setIsError(false);
        setErrorMessage('');
        setIsSelectedValue(mainStr);
    };

    const initValueForFiltering = (isInputValue: any, mainStr: string): boolean => {
        let output: boolean;
        switch (searchBy?.toUpperCase()) {
            case 'STARTFROM':
                output = isInputValue?.label && isInputValue['label'].startsWith(mainStr);
                break;
            case 'CONTAIN':
            default:
                const searchText = isInputValue?.label && isInputValue['label'].indexOf(mainStr);
                output = (searchText > -1) && true;
                break;
        }
        return output;
    };

    const updateValueByClick = (selectedItem: AutocompleteItem, index: number) => {
        const filteredDropdownItems = filterDropDown(selectedItem);
        const isInputValue = parseSelectedValue(selectedItem);
        inputRef?.current?.focus();
        setOptions(filteredDropdownItems);
        setIsFocus(false);
        setIsError(false);
        setErrorMessage('');
        setFocusOnItem(index);
        setIsSelectedValue(isInputValue.label);
    };

    const onChangeHandle = (e: any) => {
        setIsSelectedValue(e.target.value);
        if (!e.target.value.trim()) {
            setLabelMoveUpClassName(styles.labelMoveUpClassName);
            setHasFocusClassName(styles.hasFocus);
            setIsFocus(true);
            setFocusOnItem(-1);
            setOptions(data);
            setIsError(false);
            setErrorMessage('');
        } else {
            const filteredDropdownItems = filterDropDown(e);
            const inputValue: string = parseSelectedValue(e);
            const openDropdown = filteredDropdownItems?.length > 0;
            const labelMoveUpClassName = inputValue || isFocus ? styles.labelMoveUpClassName : '';
            const updatedDropdownItems = (openDropdown && inputValue) ? filteredDropdownItems : data;
            const notFoundItem = !(inputValue && filteredDropdownItems?.length > 0);
            setLabelMoveUpClassName(labelMoveUpClassName);
            setIsFocus(openDropdown);
            setHasFocusClassName(openDropdown ? styles.hasFocus : '');
            setFocusOnItem(-1);
            setOptions(notFoundItem ? [] : updatedDropdownItems);
            setIsError(notFoundItem);
            setErrorMessage(notFoundItem ? errorMessages.notfound : '')
        }
    }

    const handleClickOutside = (e: any) => {
        if (e?.target && dropDownItemsRef.current && !dropDownItemsRef.current.contains(e.target)) {
            document.removeEventListener('mousedown', handleClickOutside);
            thisComponentRef?.current?.blur();
            setIsFocus(false);
            onBlurHandle();
        }
    };

    const onFocusHandle = () => {
        document.addEventListener('mousedown', handleClickOutside);
        const mainStr = inputRef?.current?.value;
        const filterData = mainStr ? data.filter((v: any) => {
            return initValueForFiltering(v, mainStr.trim()) && v;
        }) : data;
        setIsFocus(true);
        setOptions(filterData);
    };

    const onBlurHandle = () => {
        const inputValue = (inputRef?.current?.value || '').trim();
        if (!inputValue) {
            setFocusOnItem(-1);
            setOptions(data);
            setIsFocus(false);
            setHasFocusClassName('');
            setLabelMoveUpClassName('');
            setIsSelectedValue(inputValue);
            if (required) {
                setIsError(true);
                setErrorMessage(errorMessages?.required);
            }
        } else {
            validationInputValue(inputValue);
        }
    };

    const validationInputValue = (inputValue: string) => {
        const foundValue = data.find((v: any) => v.label === inputValue?.trim());
        const errorMessageNotFound = !foundValue ? errorMessages.notfound : '';
        const errorMessageRequire = (!foundValue && required) ? `- ${errorMessages.required}` : '';
        const errorMessageByStatus = `${errorMessageNotFound} ${errorMessageRequire}`;
        const updateItemsByValue: any = foundValue ? foundValue : data;

        setIsFocus(false)
        setHasFocusClassName('');
        setFocusOnItem(-1);
        setOptions(updateItemsByValue);
        if (!foundValue) {
            setIsError(true);
            setErrorMessage(errorMessageByStatus);
        }
        !inputValue && setLabelMoveUpClassName('');
        setIsSelectedValue(inputValue);
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
        setOptions(data);
        if (inputValue) {
            setIsFocus(true);
            setHasFocusClassName(styles.hasFocus);
            setLabelMoveUpClassName(styles.labelMoveUpClassName);
        } else {
            setIsFocus(false);
            setHasFocusClassName('');
            setLabelMoveUpClassName('');
        }
        setIsSelectedValue(inputValue);
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

    const checkIfInputHasValue = () => {
        isSelectedValue && setLabelMoveUpClassName(styles.labelMoveUpClassName);
    };

    const HintAndErrorMessages = (): JSX.Element | null => {
        if (isError) {
            return <span className={styles.error} id={`errMsg_${inputId}`}>{errorMessage}</span>
        } else if (hint) {
            return <span className={styles.hint}>{hint}</span>
        }
        return null;
    }

    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        checkIfInputHasValue();
    }, []);

    React.useEffect(() => {
        if (inputRef?.current?.value) {
            setLabelMoveUpClassName(styles.labelMoveUpClassName);
            setIsSelectedValue(inputRef?.current?.value);
        }
    }, [inputRef?.current?.value]);

    React.useEffect(() => {
        setHasFocusClassName(isFocus ? styles.hasFocus : '');
        setLabelMoveUpClassName(isFocus ? styles.labelMoveUpClassName : '');
        isFocus && inputRef?.current?.focus();
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
        if (isError) {
            setErrorClassName(styles.error);
            if (typeof onError === 'function') {
                onError({error: errorMessage})
            }
        } else {
            setErrorClassName('');
        }
    }, [isError]);

    React.useEffect(() => {
        if (typeof onChange === 'function') {
            let valueObj: AutocompleteItem | any = null;
            if (!isError) {
                if (typeof isSelectedValue === 'string') {
                    const foundItemInData = data.filter((d: any) => d.label === isSelectedValue.trim());
                    valueObj = foundItemInData.length && foundItemInData[0];
                } else if (typeof isSelectedValue === 'object') {
                    valueObj = isSelectedValue;
                }
            }
            onChange(valueObj);
        }
    }, [isSelectedValue]);

    React.useEffect(() => {
        if (items?.length) {
            setData(initItemsToObject(items));
            setOptions(initItemsToObject(items));
        } else {
            setIsError(true);
            setErrorMessage(errorMessages?.general);
        }
    }, [items]);

    React.useEffect(() => {
        checkIfInputHasValue();
        if (!items?.length) {
            setIsError(true);
            setErrorMessage(errorMessages?.general);
        }
    });

    return (
        <div id={inputId}
             data-hrl-bo={bo}
             ref={thisComponentRef}
             className={`${styles.Autocomplete} ${hasFocusClassName}`}
             onKeyDown={onKeyDownHandle}>
            <div className={`${styles.inputBoxWrapper} ${errorClassName}`} style={{background: inputBackgroundColor}}>
                <div className={`${styles.inputbox} ${disabledClassName}`}>
                    <label htmlFor={`AutoCompleteInput_${inputId}`} title={label}
                           className={labelMoveUpClassName}>
            <span className={styles.labelText}>
              <Label asterisk={required && !hideAsterisk}>{label}</Label>
            </span>
                    </label>
                    <input type='text'
                           id={`AutoCompleteInput_${inputId}`}
                           value={isSelectedValue}
                           ref={inputRef}
                           onKeyDown={onKeyDownHandle}
                           onFocus={onFocusHandle}
                           disabled={disabled}
                           onChange={onChangeHandle}
                           onClick={onChangeHandle}
                           role='combobox'
                           aria-autocomplete='list'
                           aria-controls={`AutoCompleteList_${inputId}`}
                           aria-expanded={isFocus}
                           aria-haspopup='listbox'
                           aria-disabled={disabled}
                           aria-required={required}
                           aria-label={label}
                           aria-describedby={isError ? `errMsg_${inputId}` : ariaDescribedby}
                    />
                </div>
                <span className={styles.icon} onClick={onDropDownOpenHandle}>
          <ArrowIcon size='15'/>
        </span>
            </div>
            <div className={styles.dropdownDiv}>
                <ul ref={dropDownItemsRef} role='listbox' aria-label={label} id={`AutoCompleteList_${inputId}`}>
                    {isFocus && (
                        <AutocompleteItems itemOptions={options}
                                           searchBy={searchBy}
                                           focusOnItem={focusOnItem}
                                           search={isSelectedValue}
                                           updateValueByClick={updateValueByClick}/>
                    )}
                </ul>
            </div>
            {<HintAndErrorMessages/>}
            {/*TODO*/}
            {/*<Hint hint={hint} error={error} errorMessage={errorMessage}/>*/}
        </div>
    );
};

export default Autocomplete;

