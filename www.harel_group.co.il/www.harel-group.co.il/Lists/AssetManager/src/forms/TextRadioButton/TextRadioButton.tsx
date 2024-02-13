import React, {useEffect, useRef, useState} from 'react';
import classes from './TextRadioButton.module.scss';
import {TextRadioButtonInterface} from './TextRadioButtonInterface';

export const TextRadioButton = (props: TextRadioButtonInterface) => {
    const {
        name,
        id,
        items,
        onFocus,
        onChange,
        onBlur,
        onError,
        title,
        error,
        disabled,
        className,
        errorMessage,
        bo,
        required,
        selectedValue
    } = props;

    const randomNumber = useRef(Math.random().toString().slice(6));
    const isSelected = useRef(false);

    const [selectedItem, setSelectedItem] = useState<string>();
    const [hasError, setHasError] = useState(error);

    const radioName = name || `TextRadioButton_name_${randomNumber.current}`
    const radioId = id || `TextRadioButton_id_${randomNumber.current}`


    useEffect(() => {
        setHasError(props.error);
    }, [props.error]);


    useEffect(() => {
        if (selectedValue) {
            setSelectedItem(selectedValue);
        } else {
            items.map((v: any) => {
                if (v?.defaultValue) {
                    setSelectedItem(v.value);
                }
            })
        }
    }, [selectedValue]);


    const selectedItemManagement = (e: any) => {
        const selectedItemId = e.target.id;
        const i = selectedItemId.split(`${radioId}_item_`)[1];
        setSelectedItem(i);
    };

    const onChangeHandle = (e: any) => {
        selectedItemManagement(e);
        isSelected.current = true;
        setHasError(false);
        setSelectedItem(e.target.value);
        onError?.(e, false);
        onChange?.(e);
    };

    const onFocusHandle = (e: any) => {
        onFocus?.(e);
    };

    const onBlurHandle = (e: any) => {
        if (required && !isSelected.current) {
            setHasError(true);
            onError?.(e, true);
        }
        onBlur?.(e);
    };


    return (
        <div className={classes.textRadioButton}>
            <fieldset aria-required={required} role={'radiogroup'} aria-describedby={`${radioId}_error`}
                      aria-invalid={hasError} disabled={disabled} className={`${className}`}
                      onBlur={onBlurHandle} data-hrl-bo={bo} id={radioId}>
                {title && <legend data-hrl-bo={`${bo}-title`}>{title} {(required && !disabled) &&
                  <span className={classes.showAsterisk}>*</span>}</legend>}
                {
                    items.map((v: any, i: number) => {
                        return <div key={i}>
                            <input type={'radio'} name={radioName} id={`${radioId}_item_${i}`} value={v?.value}
                                   data-hrl-bo={`${bo}-radio-${i}`}
                                   checked={!!(selectedItem === v?.value)} aria-checked={selectedItem === v.value}
                                   onChange={onChangeHandle} disabled={disabled || v?.disabled}
                                   aria-disabled={disabled || v?.disabled}
                                   onFocus={onFocusHandle} />
                            <label tabIndex={-1} htmlFor={`${radioId}_item_${i}`}
                                   data-hrl-bo={`${bo}-label-${i}`}>{v?.label}</label>
                        </div>
                    })
                }
            </fieldset>
            {hasError && <p id={`${radioId}_error`} className={classes.textRadioButtonError}
                            data-hrl-bo={`${bo}-errorMessage`}>{errorMessage}</p>}
        </div>
    )
}


