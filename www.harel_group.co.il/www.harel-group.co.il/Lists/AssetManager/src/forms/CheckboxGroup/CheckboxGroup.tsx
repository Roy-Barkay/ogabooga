import React, {FC, forwardRef, useEffect, useState} from 'react';
import {toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {HintAndError} from '../../interfaces/control/HintAndError';
import {RequiredAndDisabled} from '../../interfaces/control/RequiredAndDisabled';
import {Label} from '../Label/Label';

import styles from './CheckboxGroup.module.scss';
import {Hint} from '../Hint/Hint';
import {Checkbox} from '../Checkbox/Checkbox';

export interface CheckboxGroupProps extends StylesAndBo, HintAndError, RequiredAndDisabled {
    /**
     * Checkbox Label
     */
    label?: string;

    /**
     * Value (Must be array)
     */
    selectedValue?: any[];

    /**
     * onChange Callback
     */
    onChange?: (event: any) => void;

    /**
     * hide top level checkbox
     */
    hideTopLevelCheckbox?: boolean;

    /**
     * onKeyDown Callback
     */
    onKeyDown?: () => void;
    isReset?: boolean;
}

const isSelected = (value: any, values: any[]): boolean => {
    if (Array.isArray(values)) {
        return values.includes(value.value);
    }
    return false;

};
export const CheckboxGroup: FC<CheckboxGroupProps> = forwardRef<HTMLUListElement, CheckboxGroupProps>((props, ref): JSX.Element => {
    const {
        label = '',
        selectedValue = [],
        onChange,
        hideTopLevelCheckbox = false,
        isReset,

        hideAsterisk = false,
        required = false,
        disabled = false,

        hint = '',
        error = false,
        errorMessage = '',

        style = {},
        className,
        onKeyDown,
        bo = 'hds-checkbox-group',
        children
    } = props;

    const [value, setValue] = useState(selectedValue || []);
    const [topLevelState, setTopLevelState] = useState({checked: false, partialChecked: false});

    const classes = toCssClass([
        'hds-checkbox-group',
        styles.checkboxGroup,
        className,
        label ? 'has-label' : 'no-label',
        error && 'error',
        disabled && 'disabled',
        hideTopLevelCheckbox && 'hidden-top-level-checkbox',
    ]);

    useEffect(()=>{
        setValue(selectedValue);
    },[selectedValue])

    useEffect(() => {
        if (isReset) {
            setValue([])
        }
    }, [isReset])

    const getTopLevelState = (values: any[]): { checked: boolean, partialChecked: boolean } => {
        const topLevelState = {checked: false, partialChecked: false};
        if (values.length) {
            topLevelState.checked = true;
            const optionValues: any[] = [];
            const selected = new Set(values);
            React.Children.map(children, (option) => {
                if (React.isValidElement(option)) {
                    optionValues.push(option.props.value);
                }
            });
            topLevelState.partialChecked = !optionValues.reduce((acc, curr) => acc && selected.has(curr), true);
        }
        return topLevelState;
    }

    useEffect(() => {
        setTopLevelState(getTopLevelState(value));
    }, [React.Children.count(children)]);

    const onSelectCallback = (e: React.ChangeEvent<HTMLInputElement>, val: any) => {
        let updateValue: any[];
        if (e.target.checked) {
            updateValue = [...(value || []), val];
        } else {
            updateValue = value.filter((v: any) => v !== val);
        }
        setValue(updateValue);
        onChange?.(updateValue);

        setTopLevelState(getTopLevelState(updateValue));
    }

    const options = React.Children.map(children, (option, index) => {
        if (React.isValidElement(option)) {
            return (
                <Checkbox bo={`hds-option-${index}`}
                          id={`checkbox-item-${index}`}
                          error={error}
                          disabled={disabled || option.props.disabled}
                          checked={isSelected(option.props, value)}
                          onChange={(e) => onSelectCallback(e, option.props.value)}>
                    {option.props.children}
                </Checkbox>
            );
        }
        return <></>;
    })

    const onTopLevelChange = () => {
        const {checked, partialChecked} = topLevelState;
        const hasValue = checked || partialChecked;
        const values: any[] = [];

        if (!hasValue) {
            React.Children.map(children, (option) => {
                if (React.isValidElement(option)) {
                    if (!option.props.disabled) {
                        values.push(option.props.value);
                    }
                }
            });
            setTopLevelState({checked: true, partialChecked: false});
        } else {
            setTopLevelState({checked: false, partialChecked: false});
        }

        setValue(values);
        onChange?.(values);
    };

    return (
        <div className={classes}
             style={style}
             data-hrl-bo={bo}
             aria-required={required}
             aria-disabled={disabled}>

            {label && <>
                {hideTopLevelCheckbox ? (
                    <span className={styles.label}>
            <Label asterisk={required && !hideAsterisk}>{label}</Label>
          </span>
                ) : (
                    <Checkbox disabled={disabled} error={error} {...topLevelState} onChange={() => onTopLevelChange()}>
                        <Label asterisk={required && !hideAsterisk}>{label}</Label>
                    </Checkbox>
                )}
            </>}

            <ul onKeyDown={onKeyDown} ref={ref}>
                {options?.map((e, i) => <li key={i}>{e}</li>)}
            </ul>

            <Hint hint={hint} error={error} errorMessage={errorMessage}/>
        </div>
    );
});
