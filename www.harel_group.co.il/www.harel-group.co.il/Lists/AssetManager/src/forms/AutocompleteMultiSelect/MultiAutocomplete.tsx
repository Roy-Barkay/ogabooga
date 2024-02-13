import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './scss/MultiAutocomplete.module.scss';
import {Label} from '../Label/Label';
import ArrowIcon from '../Autocomplete/icons/ArrowIcon';
import ClearIcon from '../TextInput/icons/ClearIcon';
import {itemType, MultiAutocompleteItems} from './MultiSelectItems';
import {AutocompleteItem} from '../AutoCompleteUi/ui/AutocompleteItems';
import {AutocompleteProps} from '../AutoCompleteUi/ui/AutoComplete';
import {Button} from '../Button/Button';

export interface MultiAutocompleteProps extends AutocompleteProps {
    /**
     * Returns array of IDs
     */
    onChange?: any;

    /**
     * Gets array of IDs & initialize is selected property
     */
    defaultValues?: Array<itemType>;
    /**
     * Returns array of selected items IDs
     */
    onBlur?: any;
}

const defaultErrors = {
    required: 'נא לבחור ערך אחד לפחות',
    notfound: 'אין אפשרויות',
    general: 'אירעה שגיאה, נא לנסות שנית',
    wrongInputPosition: 'נא להזין את ערך החיפוש בסוף הטקסט'
}

export interface checkboxGroupPropsType {
    ref?: any;
    onKeyDown?: (e: any) => void;
}

export const MultiAutoComplete = ({
                                      required = false,
                                      hideAsterisk = false,
                                      id = '',
                                      label = '',
                                      items = [],
                                      errorMessages = defaultErrors,
                                      bo = 'multi-autocomplete',
                                      onChange = null,
                                      onError = null,
                                      onSelect = null,
                                      onBlur = null,
                                      error = false,
                                      ariaDescribedby = '',
                                      inputProps = null,
                                      labelProps = null,
                                      defaultValues = []
                                  }: MultiAutocompleteProps) => {

    const filterInputRef = useRef<HTMLInputElement>(null);
    const thisComponentRef = useRef<HTMLDivElement>(null);
    const itemsListRef = useRef<HTMLUListElement>(null);
    const openDropDownButton = useRef<any>();
    const clearButton = useRef<any>();
    const resetSelectedItems = useRef<any>();

    const getUniqueItemsById = (key: any, value = new Set) => {
        return (item: any) => !value.has(item[key]) && value.add(item[key])
    }

    const removeDuplicateId = (arr: any) => arr.filter(getUniqueItemsById('id'));

    const initItemsToObject = (items: any): AutocompleteItem[] => {
        if (!Array.isArray(items)) {
            onError && onError({error: true, message: 'You didn\'t provide a list to the component!'})
        }
        if (defaultValues?.length && !didMount) {
            return items.map((item: any, i: number) => {
                return {
                    ...item,
                    id: item.id || i,
                    label: item?.label || item,
                    isSelected: !!defaultValues?.find((selectedItem: itemType) => selectedItem.id === item.id)
                };
            });
        }
        return items.map((item: any, i: number) => {
            return {
                ...item,
                id: item.id || i,
                label: item?.label || item,
                isSelected: resetSelectedItems?.current?.find((selectedItem: itemType) => selectedItem.id === item.id)?.isSelected || false
            };
        });
    };

    const checkIfInputHasValue = () => {
        selectedItems.length && setLabelMoveUpClassName(styles.labelMoveUpClassName);
        if (defaultValues?.length) {
            setLabelMoveUpClassName(styles.labelMoveUpClassName);
            setInputValue(getValueToDisplay(defaultValues))
        }
    };
    const errorMessageHandle = () => !!(typeof errorMessages === 'string' && errorMessages?.length);

    const [isError, setIsError] = useState<boolean>(error || false);
    const [isReset, setIsReset] = useState<any>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [labelMoveUpClassName, setLabelMoveUpClassName] = useState<string>('');
    const [hasFocusClassName, setHasFocusClassName] = useState<string>('');
    const [arrowButtonRotateClassName, setArrowButtonRotateClassName] = useState<string>('');
    const [errorClassName, setErrorClassName] = useState<string>('');
    const [isComponentInUse, setIsComponentInUse] = useState<boolean>(false);
    const [filterInputId] = useState<string>(id ? id : `Autocomplete_${Math.floor(Math.random() * 100) + 10}_${Math.floor(Math.random() * 999) + 101}`);
    const [options, setOptions] = useState<any>(items ? removeDuplicateId(initItemsToObject(items)) : []);
    const [data, setData] = useState<any>(items ? removeDuplicateId(initItemsToObject(items)) : []);
    const [textForSearch, setTextForSearch] = useState('');


    //stores selected values of checkbox Group
    const [selectedItems, setSelectedItems] = useState<any>([]);
    const [checkboxGroupProps, setCheckboxGroupProps] = useState<checkboxGroupPropsType>({});
    const [currentFocusedOption, setCurrentFocusedOption] = useState<number>(-1);

    const [inputValue, setInputValue] = useState('');
    const [showClearButton, setShowClearButton] = useState<boolean>(selectedItems?.length > 0 || defaultValues?.length > 0);
    const [didMount, setDidMount] = useState(false);
    const [defaultValueArr, setDefaultValueArr] = useState(defaultValues);

    const selectedItemsLabel = (n: number) => `נבחרו ${n} פריטים `;

    useEffect(() => {
        checkIfInputHasValue();
        setDidMount(true);
        setSelectedItems(defaultValues);
        resetSelectedItems.current = [...defaultValues];
    }, []);

    useEffect(() => {
        resetSelectedItems.current = [...selectedItems];
    }, [selectedItems]);

    useEffect(() => {
        if (didMount) {
            //when items change dynamically
            setSelectedItems(() => []);
            resetSelectedItems.current = [];
            const newItems = items ? removeDuplicateId(initItemsToObject(items)) : [];
            setData(newItems);
            setOptions(newItems);
            setShowClearButton(false);
            setIsReset(true);
            setInputValue('');
            setLabelMoveUpClassName('');
            setIsError(false);
        }
    }, [items])

    useEffect(() => {
        if (isComponentInUse && options.length > 0) {
            setCheckboxGroupProps({ref: itemsListRef, onKeyDown: insideListNavigation});
            setCurrentFocusedOption(-1);
        }
    }, [isComponentInUse, options])

    useEffect(() => {
        if (isComponentInUse && currentFocusedOption === -1) {
            filterInputRef?.current?.focus();
        }
        if (currentFocusedOption !== -1) {
            const currentElement = itemsListRef?.current?.childNodes;
            if (currentElement) {
                //Set focus on input which is nested inside checkboxGroup's option

                // @ts-ignore
                currentElement[currentFocusedOption]?.childNodes[0]?.childNodes[0].focus();
            }
        }
    }, [currentFocusedOption])

    useEffect(() => {
        if (!isComponentInUse) {
            if (!data.find((item: itemType) => item.isSelected === true)) {
                setLabelMoveUpClassName('');
                setHasFocusClassName('');
                if (required) {
                    setIsError(true);
                    // @ts-ignore
                    setErrorMessage(errorMessageHandle() ? errorMessages : defaultErrors?.required);
                }
                const uncheckedItems = options.filter((option: itemType) => selectedItems.every((selectedValue: itemType) => selectedValue.id !== option.id))
                uncheckedItems.map((item: itemType) => item.isSelected = false)
                setOptions([...uncheckedItems, ...selectedItems])
            } else {
                setArrowButtonRotateClassName('');
            }
        }
    }, [isComponentInUse]);

    useEffect(() => {
        if (isReset) {
            setInputValue('');
            setOptions(data);
        }
    }, [isReset])

    useEffect(() => {
        //@ts-ignore
        errorMessageHandle() && setErrorMessage(errorMessages)
    }, [errorMessages]);

    useEffect(() => {
        setIsError(error);
        //@ts-ignore
        setErrorMessage(errorMessageHandle() ? errorMessages : defaultErrors.general);
    }, [error])

    useEffect(() => {
        if (isReset === true) {
            setIsReset(false);
        }
        if (filterInputRef?.current?.value === '' || filterInputRef?.current?.value === getValueToDisplay(selectedItems)) {
            setOptions(data);
        }
        if (items.length) {
            if (filterInputRef?.current?.value || selectedItems.length) {
                setLabelMoveUpClassName(styles.labelMoveUpClassName);
            }
        } else if (!selectedItems.length) {
            setIsError(false);
            setLabelMoveUpClassName('')
        }
    }, [filterInputRef?.current?.value]);

    useEffect(() => {
        if (isError) {
            setErrorClassName(styles.error);
            if (typeof onError === 'function') {
                onError({
                    'error': true,
                    'errorMessage': errorMessage,
                    'values': selectedItems,
                })
            }
        } else {
            setErrorClassName('');
            setErrorMessage('')
        }
    }, [isError]);

    const isCorrectUserInput = (currentInputValue: string): boolean => {
        const fewItemsSelected = selectedItemsLabel(selectedItems.length);
        if (currentInputValue.trim().includes(fewItemsSelected.trim())) {
            if (selectedItems.length === 1) {
                return currentInputValue.substring(0, selectedItems[0]?.label.length) === selectedItems[0]?.label;
            } else if (selectedItems.length > 1) {
                return currentInputValue.substring(0, fewItemsSelected.length) === fewItemsSelected;
            }
        }
        return true;
    }

    const getValueToDisplay = (selectedItemsArray: Array<itemType>): string => {
        if (selectedItemsArray.length > 1) return (selectedItemsLabel(selectedItemsArray.length));
        else return (selectedItemsArray[0]?.label ? selectedItemsArray[0]?.label + ' ' : '');
    }

    const updateSelectedItems = (e: any) => {

        if (isReset) {
            setIsReset(false);
        }
        filterInputRef.current?.focus();
        let uniqSelectedItems: any;
        if (options.length === data.length) {
            uniqSelectedItems = e;
        } else {
            const previouslySelected = selectedItems.filter((item: itemType) => !options.includes(item));
            const idsOfSelectedValues = previouslySelected.map((item: itemType) => item?.id);
            const mergeAllSelectedItems = [...e, ...idsOfSelectedValues];
            uniqSelectedItems = mergeAllSelectedItems.filter((c: any, index: number) => mergeAllSelectedItems.indexOf(c) === index);
        }
        const selectedItemsNew: any = data.filter((item: itemType) => uniqSelectedItems.includes(item?.id));
        data.map((item: itemType) => item.isSelected = uniqSelectedItems.includes(item?.id));
        setSelectedItems(selectedItemsNew);
        setShowClearButton(!!selectedItemsNew?.length);
        setInputValue(getValueToDisplay(selectedItemsNew));
        setIsError(false);
        setErrorMessage('');
        setTextForSearch('');
        onChange?.(selectedItemsNew.map((item: itemType) => item?.id));
    }

    const createTextForSearch = () => {
        const inputValueRef = filterInputRef?.current?.value;
        if (!!inputValueRef) {
            let currentValueOfInput = '';
            if (selectedItems?.length > 1) currentValueOfInput = selectedItemsLabel(selectedItems?.length);
            else if (selectedItems?.length === 1) currentValueOfInput = selectedItems[0]?.label;
            const s = inputValueRef.indexOf(currentValueOfInput);
            const c = s > -1 ? inputValueRef.replace(inputValueRef?.trim()?.substr(s, currentValueOfInput.length), '') : inputValueRef;
            return c.trim();
        }
        return '';
    }

    const parseSelectedValue = (e: AutocompleteItem | any) => {
        if (e.target?.hasOwnProperty('value')) {
            return e.target.value;
        } else {
            return e;
        }
    }

    const filterDropDown = (e: any) => {
        const selectedValueOutput = parseSelectedValue(e);
        const currentInputValue = filterInputRef?.current?.value || '';
        let mainStr: string = '';
        if (typeof selectedValueOutput === 'object') {
            mainStr = selectedValueOutput.label;
        } else {
            // remove selected items string & get user's input string to search by
            mainStr = selectedItems.length === 0 ? currentInputValue : currentInputValue?.replace(getValueToDisplay(selectedItems), '');
        }

        if (defaultValues && selectedItems.length === 0) {
            mainStr = currentInputValue?.replace(getValueToDisplay(defaultValues), '')
            // disable filter on initial search when provided defaultValues (return all options)
            if (mainStr === '')
                return data;
        }

        return mainStr ? data.filter((v: any) => {
            if (v?.label?.includes(mainStr.trim()))
                return v;
        }) : data;
    }

    const onChangeHandle = (e: any) => {
        setInputValue(e?.target?.value || filterInputRef?.current?.value?.trim());
        if (!e?.target?.value?.trim()) {
            setLabelMoveUpClassName(styles.labelMoveUpClassName);
            setHasFocusClassName(styles.hasFocus);
            setIsComponentInUse(true);
            setIsError(false);
            setErrorMessage('');
        } else {
            const filteredDropdownItems = filterDropDown(e);
            const inputValue: string = parseSelectedValue(e);
            const openDropdown = filteredDropdownItems?.length > 0;
            const labelMoveUpClassName = inputValue || isComponentInUse ? styles.labelMoveUpClassName : '';
            const updatedDropdownItems = (openDropdown && inputValue) ? filteredDropdownItems : data;
            setLabelMoveUpClassName(labelMoveUpClassName);
            setIsComponentInUse(openDropdown);
            setHasFocusClassName(openDropdown ? styles.hasFocus : '');
            const typedInputNotFound = !(inputValue && filteredDropdownItems?.length > 0);
            setOptions(typedInputNotFound ? [] : updatedDropdownItems);
            setIsError(typedInputNotFound);
            const wrongInputPosition = !isCorrectUserInput(e?.target?.value || '');
            const errorMessage = typedInputNotFound ? (errorMessageHandle() ? errorMessages : wrongInputPosition ? defaultErrors?.wrongInputPosition : defaultErrors?.notfound) : '';
            // @ts-ignore
            setErrorMessage(errorMessage);
            setTextForSearch(createTextForSearch());
        }
    }

    const handleClickOutside = (e: any) => {
        if (e?.target && thisComponentRef.current && !thisComponentRef.current.contains(e.target)) {
            document.removeEventListener('mousedown', handleClickOutside);
            thisComponentRef?.current?.blur();
            setIsComponentInUse(false);
        }
    };

    const onClearHandle = () => {
        setShowClearButton(false);
        if (defaultValueArr?.length > 0) {
            setDefaultValueArr([]);
        }
        clearValue();
    }

    const onFocusHandle = (e: any) => {
        setArrowButtonRotateClassName(styles.rotate);
        document.addEventListener('mousedown', handleClickOutside);
        onChangeHandle(e);
    };

    const onBlurHandle = () => {
        setIsComponentInUse(false);
        setHasFocusClassName('');
        if (isError) {
            setIsError(false);
            setErrorMessage('')
            setOptions(data)
            setInputValue(getValueToDisplay(selectedItems))
        }
        if (selectedItems.length === 0) {
            setOptions(data);
            const onBlurString = showClearButton ? getValueToDisplay(defaultValues) : ''
            if (!onBlurString) {
                setLabelMoveUpClassName('');
                setInputValue('')
            } else {
                setInputValue(onBlurString)
            }
            if (required) {
                setIsError(true);
                // @ts-ignore
                setErrorMessage(errorMessageHandle() ? errorMessages : defaultErrors?.required);
            }
        } else {
            setInputValue(getValueToDisplay(selectedItems))
        }
        onBlur && onBlur(selectedItems.map((item: any) => {
            return item.id
        }));
    };

    const clearValue = () => {
        setIsReset(true);
        setInputValue('');
        const uncheckAllOptions = data.map((option: itemType) => ({...option, isSelected: false}))
        setOptions(uncheckAllOptions);
        setData(uncheckAllOptions);
        setSelectedItems([]);
        setIsError(false);
        onChange?.(null)
        filterInputRef?.current?.focus();
    }

    const onDropDownOpenHandle = (e: any) => {
        if (isError || errorMessage) {
            setOptions(data)
            isError && setIsError(false);
            errorMessage && setErrorMessage('')
        }
        if (isComponentInUse) {
            setIsComponentInUse(false);
        } else {
            setArrowButtonRotateClassName(styles.rotate);
            onChangeHandle(e);
        }
    }

    const escapeKeyDown = () => {
        setHasFocusClassName(styles.hasFocus);
        setLabelMoveUpClassName(styles.labelMoveUpClassName);
        setIsComponentInUse(false);
        !selectedItems.length && setInputValue('');
    };

    const insideListNavigation = (e: any) => {
        const currentElementId = document?.activeElement?.id;
        const isCheckboxElement = currentElementId?.includes('checkbox');
        const currentElementIndex = parseInt(currentElementId?.substring(currentElementId?.lastIndexOf('-') + 1) || '-1');
        switch (e.key) {
            case 'Escape':
                escapeKeyDown();
                break;
            case 'ArrowDown':
                e.preventDefault();
                setCurrentFocusedOption(isCheckboxElement ? currentElementIndex + 1 : currentFocusedOption + 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setCurrentFocusedOption(isCheckboxElement ? currentElementIndex - 1 : currentFocusedOption - 1);
                break;
            default:
                break;
        }
    }

    const onKeyDownHandle = (e: any) => {
        if (e.shiftKey && e.keyCode === 9) {
            thisComponentRef?.current?.blur();
            setIsComponentInUse(false);
        }
        switch (e.key) {
            case 'Enter':
                if (isComponentInUse) {
                    setIsComponentInUse(!isComponentInUse);
                } else {
                    onChangeHandle(e);
                }
                break;
            default:
                insideListNavigation(e);
                break;
        }
    }

    const onButtonKeyDown = (e: any) => {
        if (e.key === 'Tab')
            setIsComponentInUse(!isComponentInUse)
    }

    const showError = useMemo(() => isError &&
      <span className={styles.error} id={`errMsg_${filterInputId}`}>{errorMessage}</span>, [isError, errorMessage]);

    const filterInputEvents = {
        onKeyDown: onKeyDownHandle,
        onSelect: onSelect,
        onFocus: onFocusHandle,
        onChange: onChangeHandle,
        onClick: onChangeHandle
    }

    const labelPropsVar = typeof labelProps === 'object' ? {...labelProps} : null;

    const inputPropsVar = typeof inputProps === 'object' ? {...inputProps} : null;

    return (<div id={filterInputId}
                 onBlur={(!isComponentInUse && onBlurHandle) || undefined}
                 data-hrl-bo={bo}
                 ref={thisComponentRef}
                 data-name={'MultiAutocomplete'}
                 className={`${styles.MultiAutocomplete} ${hasFocusClassName}`}
        >
            <div className={`${styles.inputBoxWrapper} ${hasFocusClassName} ${errorClassName}`}>
                <div className={`${styles.inputbox} `}>
                    <label
                        htmlFor={`filterInput_${filterInputId}`}
                        title={label}
                        id={`AutoCompleteLabel_${filterInputId}`}
                        className={`${labelMoveUpClassName} 
            ${hasFocusClassName}`}
                        {...labelPropsVar}
                    >
            <span className={styles.labelText}>
              <Label asterisk={required && !hideAsterisk}>{label}</Label>
            </span>
                    </label>
                    <input type="text"
                           id={`filterInput_${filterInputId}`}
                           value={inputValue}
                           ref={filterInputRef}
                           required={required}
                           {...filterInputEvents}
                           aria-autocomplete="list"
                           aria-controls={`AutoCompleteList_${filterInputId}`}
                           aria-expanded={(isComponentInUse && options.length) > 0}
                           aria-haspopup="listbox"
                           role="combobox"
                           aria-required={required}
                           aria-label={`${options.length} פרטים לבחירה`}
                           aria-describedby={`errMsg_${filterInputId} ${ariaDescribedby}`.trim()}
                           {...inputPropsVar}
                    />
                </div>
                {
                    (showClearButton) && (
                        <button className={styles.clearButton} onClick={onClearHandle} type={'button'}
                                ref={clearButton} aria-label={`נקה שדה ${label}`}>
                            <ClearIcon />
                        </button>
                    )
                }
                <button className={`${styles.icon} ${arrowButtonRotateClassName}`}
                        aria-expanded={(isComponentInUse && options.length) > 0} type={'button'}
                        onFocus={() => document.addEventListener('mousedown', handleClickOutside)}
                        onClick={onDropDownOpenHandle} ref={openDropDownButton} aria-label={` רשימה עבור ${label}`}>
                    <ArrowIcon size="15" iconColor="#003c7f" />
                </button>
            </div>
            {isComponentInUse && options.length > 0 && (<div className={styles.dropdownWrapper}>
                <div tabIndex={-1} className={styles.dropdownDiv}>
                    <MultiAutocompleteItems
                        isReset={isReset}
                        checkboxGroupProps={checkboxGroupProps}
                        searchedString={textForSearch}
                        onChange={updateSelectedItems} items={options} />
                </div>
                <div className={`${styles.footer} ${(options.length < 5) ? styles[`li-${options.length}-items`] : ''}`}>
                    <div className={styles.separator} />
                    <Button className={styles.button} onClick={onBlurHandle} onKeyDown={onButtonKeyDown}>אישור</Button>
                </div>
            </div>)}
            {showError}
        </div>

    );
};

export default MultiAutoComplete;