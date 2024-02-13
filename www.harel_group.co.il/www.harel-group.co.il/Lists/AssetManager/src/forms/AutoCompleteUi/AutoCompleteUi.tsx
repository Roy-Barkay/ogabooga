import React from 'react';
import AutoComplete from "./ui/AutoComplete";
import Select from "./ui/Select";

export interface AutocompleteProps {
    id?: string;
    label?: string;
    value?: any;
    items?: any;
    onChange?: any;
    onError?: any;
    onBlur?: any;
    onSelect?: any;
    onClear?: any;
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
    selectMode?: boolean;
    isObjectOutput?: boolean;
    showLoader?: boolean;
    commonV3?: boolean;
    className?: string;
    labelProps?: object;
    inputProps?: object;
}

export const AutoCompleteUi = (props: AutocompleteProps) => props.selectMode ? <Select {...props}/> :
    <AutoComplete {...props}/>;

export default AutoCompleteUi;
