import React, {useEffect, useMemo, useRef, useState} from 'react';
import {AutocompleteItem, AutocompleteItems} from './AutocompleteItems';
import styles from '../scss/Autocomplete.module.scss';
// import {Label} from '../../Label/Label';
import ArrowIcon from '../../Autocomplete/icons/ArrowIcon';
import ClearIcon from '../../TextInput/icons/ClearIcon';


export interface AutocompleteProps {
    id?: string;
    label?: string;
    value?: any;
    items?: any;
    onChange?: any;
    onError?: any;
    onBlur?: any;
    onClear?: any;
    onSelect?: any;
    error?: boolean;
    disabled?: boolean;
    required?: boolean;
    freeSolo?: boolean;
    hideAsterisk?: boolean;
    searchBy?: 'CONTAIN' | 'STARTFROM';
    sortFilteredOption?: boolean,
    bo?: string;
    errorMessages?: {
        required: string;
        notfound: string;
        general: string;
    } | string;
    ariaDescribedby?: string;
    hint?: string;
    inputProps?: any;
    labelProps?: any;
    isObjectOutput?: boolean;
    showLoader?: boolean;
    commonV3?: boolean;
    className?: string;
}

const defaultErrors = {
    required: 'שדה חובה',
    notfound: 'אין אפשרויות',
    general: 'אירע שגיאה, נא לנסות שנית'
}

const deepErrors = {
    notSelectedFromList: 'אנה בחר ערך מהרשימה'
}

export const AutoComplete = ({
                                 disabled = false,
                                 required = false,
                                 hideAsterisk = false,
                                 freeSolo = false,
                                 id = '',
                                 label = '',
                                 searchBy = 'STARTFROM',
                                 sortFilteredOption = false,
                                 value = '',
                                 items = [],
                                 errorMessages = defaultErrors,
                                 bo = 'hds-autocomplete',
                                 onChange = null,
                                 onError = null,
                                 onSelect = null,
                                 onBlur = null,
                                 error = false,
                                 ariaDescribedby = '',
                                 hint = '',
                                 inputProps = null,
                                 labelProps = null,
                                 isObjectOutput = false,
                                 showLoader = true,
                                 commonV3 = true,
                                 className,
                             }: AutocompleteProps) => {

        const inputRef = useRef<HTMLInputElement>(null);
        const dropDownItemsRef = useRef<HTMLUListElement>(null);
        const thisComponentRef = useRef<HTMLDivElement>(null);

        const foundItemsRef = useRef(false);

        enum keyArrowPress {
            UP = 1,
            DOWN = 0,
        }

        const isEqualStrings = (s1: string, s2: string): boolean => s1.toLowerCase().trim() === s2.toLowerCase().trim();

        const errorMessageHandle = () => !!(typeof errorMessages === 'string' && errorMessages?.length);

        const [isError, setIsError] = useState<boolean>(error);
        const [errorMessage, setErrorMessage] = useState(errorMessageHandle() ? errorMessages : defaultErrors.general);

        const [isSelectedValue, setIsSelectedValue] = useState<any>(value ? value : '');
        const [isFocus, setIsFocus] = useState<boolean>(false);
        const [hasFocusClassName, setHasFocusClassName] = useState<string>('');
        const [focusOnItem, setFocusOnItem] = useState<number>(-1);
        const [inputId] = useState<string>(id ? id : `Autocomplete_${Math.floor(Math.random() * 100) + 10}_${Math.floor(Math.random() * 999) + 101}`);
        const [disabledClassName, setDisabledClassName] = useState<string>(disabled ? styles.disabled : '');
        const [labelMoveUpClassName, setLabelMoveUpClassName] = useState<string>('');
        const [options, setOptions] = useState<any>([]);
        const [data, setData] = useState<any>([]);
        const [errorClassName, setErrorClassName] = useState<string>('');

        const [loader, setLoader] = useState<boolean>(true);

        const openDropDown = useRef<any>();
        const clearButton = useRef<any>();

        const notSelectedFromList = useRef<boolean>(false);

        const parseSelectedValue = (e: AutocompleteItem | any) => {
            if (e.target?.hasOwnProperty('value')) {
                return e.target.value;
            } else {
                return e;
            }
        }

        useEffect(() => {
            //@ts-ignore
            errorMessageHandle() && setErrorMessage(errorMessages)
        }, [errorMessages]);

        useEffect(() => {
            //@ts-ignore
            disabled ? setDisabledClassName(styles.disabled) : setDisabledClassName('');
        }, [disabled]);

        useEffect(() => {
            //@ts-ignore
            setErrorMessage(errorMessageHandle() ? errorMessages : defaultErrors.general);
            setIsError(error);
        }, [error])

        useEffect(() => {
            if (items.length) {
                if (inputRef?.current?.value) {
                    setLabelMoveUpClassName(styles.labelMoveUpClassName);
                    setIsSelectedValue(inputRef?.current?.value);
                }
            } else if (!isSelectedValue) {
                setIsError(false);
                setLabelMoveUpClassName('')
            }
        }, [inputRef?.current?.value]);

        useEffect(() => {
            setHasFocusClassName(isFocus ? styles.hasFocus : '');
            isFocus && inputRef?.current?.focus();
        }, [isFocus]);

        useEffect(() => {
            focusOnItem === -1 && dropDownItemsRef?.current?.focus();
            if (focusOnItem > -1 && dropDownItemsRef?.current?.childNodes.length) {
                const currentElement = dropDownItemsRef?.current?.childNodes;
                // @ts-ignore
                currentElement[focusOnItem]?.focus();
            }
        }, [focusOnItem]);

        useEffect(() => {
            if (isError) {
                setErrorClassName(styles.error);
                if (typeof onError === 'function') {
                    onError?.({
                        'error': true,
                        'errorMessage': errorMessage,
                        'currentValue': isSelectedValue,
                        'value': value,
                        'foundItem': !foundItemsRef.current
                    })
                }
            } else {
                setErrorClassName('');
            }
        }, [isError]);

        useEffect(() => {
            isSelectedValue ? setLabelMoveUpClassName(styles.labelMoveUpClassName) : setLabelMoveUpClassName('');
        }, [JSON.stringify(isSelectedValue)]);

        useEffect(() => {
            // new items array === reset autocomplete
            if (!Array.isArray(items)) {
                onError && onError({error: true, message: 'You didn\'t provide a list to the component!'})
            } else if (Array.isArray(items)) {
                if (items.length) {
                    setLoader(false);
                    const updatedDate = items.map((v: any, i: number) => {
                        return {
                            ...v,
                            id: v.id || i,
                            label: v?.label || v,
                            subLabel: v?.subLabel || undefined
                        };
                    });
                    setData(updatedDate);
                    setOptions(updatedDate);
                    setIsError(error);
                    !error && onError?.({error: false, errorMessage: ''});
                    (error && typeof errorMessages === 'string' && errorMessages) && setErrorMessage(errorMessages)
                } else {
                    setIsSelectedValue(() => '');
                    setIsError(error);
                    setLabelMoveUpClassName(() => '');
                    setData([]);
                    setLoader(true)
                }
            } else {
                onError?.({error: true, errorMessage: 'items array is empty'});
                setErrorMessage(defaultErrors?.general);
                setIsError(true);
            }
        }, [JSON.stringify(items)]);

    useEffect(() => {
        isSelectedValue ? setLabelMoveUpClassName(styles.labelMoveUpClassName) : setLabelMoveUpClassName('');
        setIsSelectedValue(value);
    }, [value]);

    useEffect(() => {
        if ((inputRef?.current?.value || inputRef?.current?.focus) && !!labelMoveUpClassName) {
            setLabelMoveUpClassName(styles.labelMoveUpClassName);
        } else if (isFocus && options.length > 0) {
            setLabelMoveUpClassName(styles.labelMoveUpClassName);
        }
    });

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

        const filterDropDownAfterEnter = (e?: any) => {
            // const mainStr = inputRef?.current?.value;
            const mainStr = e?.target?.innerText || inputRef?.current?.value;
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
            onSelect?.(normalizeDataForUser(selectedItem));
            onChange?.(selectedItem);
            notSelectedFromList.current = true;
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
                foundItemsRef.current = false;
                onChange?.(null);
            } else {
                const filteredDropdownItems = filterDropDown(e);
                const inputValue: string = parseSelectedValue(e);
                const openDropdown = filteredDropdownItems?.length > 0;
                const labelMoveUpClassName = inputValue || isFocus ? styles.labelMoveUpClassName : '';
                const updatedDropdownItems = (openDropdown && inputValue) ? filteredDropdownItems : data;
                const notFoundItem = !freeSolo && !(inputValue && filteredDropdownItems?.length > 0);
                setLabelMoveUpClassName(labelMoveUpClassName);
                setIsFocus(openDropdown);
                setHasFocusClassName(openDropdown ? styles.hasFocus : '');
                setFocusOnItem(-1);
                setOptions(notFoundItem ? [] : updatedDropdownItems);
                foundItemsRef.current = notFoundItem;
                // @ts-ignore
                setErrorMessage(notFoundItem ? (errorMessageHandle() ? errorMessages : defaultErrors?.notfound) : '');
                setIsError(notFoundItem);
                if (freeSolo) {
                    onChange?.(inputValue);
                }
            }
        }

        const handleClickOutside = (e: any) => {
            if (e?.target && thisComponentRef.current && !thisComponentRef.current.contains(e.target)) {
                document.removeEventListener('mousedown', handleClickOutside);
                thisComponentRef?.current?.blur();
                setIsFocus(false);
                onBlurHandle();
            }
        };

        const onClearHandle = () => {
            clearValue();
        }

        const onFocusHandle = () => {
            document.addEventListener('mousedown', handleClickOutside);
            const mainStr = inputRef?.current?.value;
            const filterData = mainStr ? data.filter((v: any) => {
                return initValueForFiltering(v, mainStr.trim()) && v;
            }) : data;
            setIsFocus(true);
            notSelectedFromList.current = false;
            setLabelMoveUpClassName(styles.labelMoveUpClassName);
            setOptions(filterData);
        };

        const onBlurHandle = (e?: any) => {
            const inputValue = (e?.target?.innerText || inputRef?.current?.value || '').trim();
            if (!inputValue) {
                setFocusOnItem(-1);
                setOptions(data);
                setIsFocus(false);
                setHasFocusClassName('');
                setLabelMoveUpClassName('');
                setIsSelectedValue(inputValue);
                if (required) {
                    // @ts-ignore
                    setErrorMessage(errorMessageHandle() ? errorMessages : `${label} ${defaultErrors?.required}`);
                    setIsError(true);
                }
            } else {
                validationInputValue(inputValue);
                if (!notSelectedFromList.current && !freeSolo) {
                    if (value.trim() !== inputValue) {
                        onError?.({error: true, errorMessage: deepErrors.notSelectedFromList});
                        setErrorMessage(deepErrors.notSelectedFromList);
                        onChange?.(null);
                        setIsError(true);
                    }
                }
            }
        };

        const clearValue = () => {
            setIsSelectedValue('')
            setFocusOnItem(-1);
            setIsFocus(true);
            setHasFocusClassName('');
            setLabelMoveUpClassName('');
            setIsError(false);
            onChange?.(null)
        }

        const validationInputValue = (inputValue: string) => {
            const foundValue = data.find((v: any) => v.label?.trim() === inputValue?.trim());
            const updateItemsByValue: any = foundValue ? foundValue : data;
            setIsFocus(false)
            setHasFocusClassName('');
            setFocusOnItem(-1);
            setOptions(updateItemsByValue);
            if (!foundValue && !freeSolo) {
                //@ts-ignore
                setErrorMessage(errorMessageHandle() ? errorMessages : defaultErrors?.notfound);
                setIsError(true);
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

            const minusFocusOnItem = focusOnItem !== -1 ? focusOnItem - 1 : 0;

            const childrenLength = dropDownItemsRef?.current?.childNodes?.length || 0;

            const plusFocusOnItem = focusOnItem >= childrenLength - 1 ? focusOnItem : focusOnItem + 1;

            const newFocusItem = flag ? minusFocusOnItem : plusFocusOnItem;

            setFocusOnItem(newFocusItem);

            setIsError(false);

            if (flag && newFocusItem < 0) {
                inputRef?.current?.focus();
                return;
            }

        }

        const EscapeKeyDown = () => {
            setHasFocusClassName(styles.hasFocus);
            setLabelMoveUpClassName(styles.labelMoveUpClassName);
            inputRef?.current?.focus();
            setIsFocus(false);
        };

        const onKeyDownHandle = async (e: any) => {
            switch (e.key) {
                case 'ArrowUp':
                    moveFocusHandle(keyArrowPress.UP);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    moveFocusHandle(keyArrowPress.DOWN);
                    break;
                case 'Escape':
                    EscapeKeyDown();
                    break;
                case 'Tab':
                    onBlurInput();
                    onBlurHandle();
                    thisComponentRef?.current?.blur();
                    break;
                case 'Enter':
                    if (document.activeElement === openDropDown.current) {
                        e.preventDefault();
                        setIsFocus(true);
                        filterDropDownAfterEnter(e);
                    } else if (document.activeElement === clearButton.current) {
                        onBlurHandle(e);
                        filterDropDownAfterEnter(e);
                        onSelect?.(normalizeDataForUser());
                    } else {
                        e.preventDefault();
                    }
                    break;
                default:
                    break;
            }
        }


        const HintAndErrorMessages = (): JSX.Element | null => {
            if (commonV3) {
                if (isError) {
                    return <span className={styles.error} id={`errMsg_${inputId}`}>{errorMessage}</span>
                } else if (hint) {
                    return <span className={styles.hint} id={`errMsg_${inputId}`}>{hint}</span>
                }
                return null;
            } else {
                if (isError) {
                    return <span className={styles.error} id={`errMsg_${inputId}`}>{errorMessage}</span>
                } else if (hint) {
                    return <span className={styles.hint} id={`errMsg_${inputId}`}>{hint}</span>
                }
                return <span className={styles.hint}>&nbsp;</span>;
            }

        }
        const showHintOrError = useMemo(() => <HintAndErrorMessages />, [isError]);


        const normalizeDataForUser = (value?: any) => {
            let selectedValue = value || isSelectedValue
            let valueObj: AutocompleteItem | any = null;
            if (typeof selectedValue === 'string') {
                const foundItemInData = data.filter((d: any) => d.label.trim() === selectedValue.trim());
                valueObj = !!foundItemInData.length ? foundItemInData[0] : (isObjectOutput ? {label: selectedValue} : null);
            } else if (typeof selectedValue === 'object') {
                valueObj = selectedValue;
            }
            return valueObj
        }

        const labelPropsVar = typeof labelProps === 'object' ? {...labelProps} : null;
        const inputPropsVar = typeof inputProps === 'object' ? {...inputProps} : null;

        return (

            <div id={inputId}
                 data-hrl-bo={bo}
                 ref={thisComponentRef}
                 data-name={'AutocompleteUi'}
                 className={`${styles.ImagineAutocompleteUi} ${hasFocusClassName} ${className} ${commonV3 ? styles.commonV3 : ''}`}
                 onKeyDown={onKeyDownHandle}>
                <div className={`${styles.inputBoxWrapper} ${hasFocusClassName} ${errorClassName}`}>
                    <div className={`${styles.inputbox} ${disabledClassName}`}>
                        <label
                            htmlFor={`AutoCompleteInput_${inputId}`}
                            title={label}
                            id={`AutoCompleteLabel_${inputId}`}
                            className={`${labelMoveUpClassName} 
            ${hasFocusClassName}`}
                            {...labelPropsVar}
                        >
            <span>
            <span className={styles.labelText}>{label}</span>
                {required && !hideAsterisk && <span className={styles.asterisk}>*</span>}
            </span>
                        </label>
                        <input type="text"
                               id={`AutoCompleteInput_${inputId}`}
                               value={isSelectedValue}
                               ref={inputRef}
                               onKeyDown={onKeyDownHandle}
                               onFocus={onFocusHandle}
                               onBlur={onBlur}
                               disabled={disabled}
                               onChange={onChangeHandle}
                               onClick={onChangeHandle}
                               role="combobox"
                               aria-autocomplete="list"
                               aria-controls={`AutoCompleteList_${inputId}`}
                               aria-expanded={(isFocus && options.length) > 0}
                               aria-haspopup="listbox"
                               aria-disabled={disabled}
                               aria-required={required}
                               aria-label={''}
                               required={required}
                               aria-describedby={`errMsg_${inputId} ${ariaDescribedby}`.trim()}
                               {...inputPropsVar}
                        />
                    </div>
                    {(showLoader && !disabled && !freeSolo && loader) && <div className={styles.loader}></div>}
                    {
                        (isSelectedValue && !disabled) && (
                            <button className={styles.clearButton} onClick={onClearHandle} type={'button'}
                                    ref={clearButton} aria-label={`נקה שדה ${label}`}>
                                <ClearIcon />
                            </button>
                        )
                    }
                    <button className={`${styles.icon} ${options.length > 0 ? styles.rotate : ''}`}
                            aria-expanded={(isFocus && options.length) > 0} type={'button'}
                            onClick={onDropDownOpenHandle} ref={openDropDown} aria-label={` רשימה עבור ${label}`}
                            disabled={disabled}>
                        <ArrowIcon size="15" iconColor={disabled ? 'rgba(0, 0, 0, 0.54)' : '#003c7f'} />
                    </button>
                </div>
                {isFocus && options.length > 0 && (
                    <div className={styles.dropdownDiv}>
                        <ul ref={dropDownItemsRef} role="listbox" aria-label={label} id={`AutoCompleteList_${inputId}`}>
                            <AutocompleteItems itemOptions={options}
                                               searchBy={searchBy}
                                               sortFilteredOption={sortFilteredOption}
                                               focusOnItem={focusOnItem}
                                               search={isSelectedValue}
                                               updateValueByClick={updateValueByClick} />
                        </ul>
                    </div>
                )}
                {showHintOrError}
            </div>

        );
    }
;

export default AutoComplete;
