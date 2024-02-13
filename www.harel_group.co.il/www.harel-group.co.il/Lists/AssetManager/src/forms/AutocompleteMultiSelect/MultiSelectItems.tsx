import React, {FC, useEffect, useState} from "react"
import {CheckboxGroup} from "../CheckboxGroup/CheckboxGroup";
import {Option} from "../Option/Option";
import styles from './scss/MultiSelectItems.module.scss';

export interface itemType {
    id: string | number;
    label: string;
    isSelected?: boolean;

}

export interface MultiAutocompleteItemsProps {
    items: Array<itemType>,
    searchedString?:string
    onChange?: (e: any) => void;
    checkboxGroupProps?:object;
    isReset?:boolean;
}
export const MultiAutocompleteItems: FC<MultiAutocompleteItemsProps> = (props): JSX.Element => {

    const {
        items,
        searchedString,
        checkboxGroupProps,
        onChange,
        isReset
    } = props;
    const [selectedValues, setSelectedValues] = useState<Array<any>>([]);

    const getCheckedValues = () => {
        return items?.filter((item: itemType) => item.isSelected)?.map(i => i.id);
    }

    useEffect(() => {
        setSelectedValues(getCheckedValues());
    }, [items])

    const highlightContainString = (value: string): JSX.Element => {
        const startIndex = searchedString ? value.trim().indexOf(searchedString) : -1;

        if (startIndex === -1) {
            return <>{value}</>
        }
        const end = searchedString?.length;
        const prefix = value?.substr(0, startIndex);
        const boldPart = value?.substr(startIndex, end);
        const postfix = value?.substr((prefix + boldPart).length, value.length);
        return <span className={styles.item}>{prefix}<strong>{boldPart}</strong>{postfix}</span>
    };

    return (<>
        <CheckboxGroup {...checkboxGroupProps} isReset={isReset} selectedValue={selectedValues} onChange={onChange} className={styles['Checkbox-items']}>
            {items.map((item: itemType) => <Option key={`Option-${item.id}`} value={item.id}>{highlightContainString(item.label)} </Option>)}
        </CheckboxGroup>
    </>);
}