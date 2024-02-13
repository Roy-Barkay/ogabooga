import React, {forwardRef, ReactNode, useImperativeHandle, useRef} from 'react';
import ClearIcon from './icons/ClearIcon';
import {shortId, toCssClass} from '../../fp';
import {StylesAndBo} from '../../interfaces/control/StylesAndBo';
import {HintAndError} from '../../interfaces/control/HintAndError';
import {RequiredAndDisabled} from '../../interfaces/control/RequiredAndDisabled';
import {FocusHoverPress} from '../../interfaces/control/FocusHoverPress';
import {Hint} from '../Hint/Hint';

import styles from './TextInput.module.scss';

interface TextInputProps extends StylesAndBo, HintAndError, RequiredAndDisabled, FocusHoverPress {

    // === Common Props =========================================================
    /**
     * Input type
     */
    type?: string;

    /**
     * Input label
     */
    label?: string;

    /**
     * Input ID
     */
    id?: string;

    /**
     * Input value
     */
    value?: string | undefined;

    /**
     * Automatically count input
     */
    counter?: number;

    /**
     * Show prefix when value exist
     */
    prefix?: string;

    /**
     * Maximum character limit
     */
    maxlength?: number;

    /**
     * Show suffix when value exist
     */
    suffix?: string;

    /**
     * Input icon
     */
    icon?: ReactNode | any;

    /**
     * Don't show clear button when input has value
     */
    hideClearButton?: boolean;

    /**
     * Is multiline
     */
    multiline?: boolean;

    /**
     * Rows number
     * Works only multiline is **true**
     */
    rows?: number;

    /**
     * 2 line label
     */
    multilineLabel?: boolean;

    // === Events / Callbacks ===================================================

    /**
     * OnIconClick callback
     */
    onIconClick?: (e: any) => void;

    /**
     * onChange callback
     */
    onChange?: (event: string) => void;

    /**
     * onFocus callback
     */
    onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

    /**
     * onBlur callback
     */
    onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

    /**
     * onError callback
     */
    onError?: (e: boolean) => void;

    // === Aria Attributes ======================================================

    /**
     * set aria-label attribute
     */
    ariaLabel?: string;

    commonV3?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement | undefined, TextInputProps>((
    {
        type= 'text',
        id = `hds-input-${shortId()}`,
        value = undefined,
        label = '',
        counter = undefined,
        maxlength = undefined,
        icon: Icon,
        prefix = undefined,
        suffix = undefined,
        ariaLabel,

        multiline = false,
        multilineLabel = false,
        rows = 1,

        disabled = false,
        required = false,
        hideAsterisk = false,
        hideClearButton = false,

        hint = '',
        error = false,
        errorMessage = '',

        focused = false,
        hovered = false,
        pressed = false,

        onIconClick = undefined,
        onChange,
        onBlur,

        style,
        className,
        bo = 'hds-input-text',
        commonV3= false,

    }, ref) => {

    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | undefined>();

    useImperativeHandle(ref, () => inputRef.current);

    const classes = toCssClass([
        styles.input,
        className,
        focused && 'focused',
        hovered && 'hovered',
        pressed && 'pressed',
        disabled && 'disabled',
        required && 'required',
        prefix && 'has-prefix',
        suffix && 'has-suffix',
        multiline && 'is-multiline',
        multilineLabel && 'multiline-label',
        !label && 'no-label',
        !!Icon && 'has-icon',
        (!disabled && error) && styles.error,
    ]);

    const onChangeHandle = (e: any) => {
        const vLength = value?.toString().length;
        if (vLength && counter && vLength >= counter) {
            const str = e.target.value;
            onChange?.(str.substr(0, counter));
        } else {
            onChange?.(e.target.value);
        }
    };

    const onClearClick = () => {
        inputRef?.current?.focus();
        onChange?.('');
    };

    const defaultProps = {
        id,
        value,
        onChange: onChangeHandle,
        required,
        tabIndex: 0,
        disabled,
        placeholder: label,
        'aria-required': required,
        'aria-label': ariaLabel,
        'aria-disabled': disabled,
        'aria-invalid': error,
    };

    const onFocusHandler = () => {
        inputRef.current?.removeAttribute('placeholder')
    }
    const onBlurHandler = (e: any) => {
        inputRef.current?.setAttribute('placeholder', label)
        if (onBlur) {
            onBlur(e)
        }
    }

    return (
        <div className={`${classes} ${commonV3 ? styles.commonV3 : ''}`} style={style} data-hrl-bo={bo} tabIndex={-1}>

            <div className={styles.inputWrapper}>
                {(prefix && !multiline) && (
                    <span className={styles.prefix}>{prefix}</span>
                )}

                {multiline ? (
                    <textarea rows={rows} {...defaultProps}
                              ref={inputRef as React.MutableRefObject<HTMLTextAreaElement>}/>
                ) : (
                    <input type={type} maxLength={maxlength} {...defaultProps}
                           ref={inputRef as React.MutableRefObject<HTMLInputElement>} onFocus={onFocusHandler} onBlur={onBlurHandler}/>
                )}

                {label && (
                    <label htmlFor={id} title={label}>
                        <span>{label}</span>{(required && !hideAsterisk) && <span className={styles.asterisk}>*</span>}
                    </label>
                )}

                {(suffix && !multiline) && (
                    <span className={styles.suffix}>{suffix}</span>
                )}

                {(!hideClearButton && value && !disabled) && (
                    <button type={'button'} tabIndex={0} aria-label={`נקה שדה ${label}`} onClick={onClearClick}>
                        <ClearIcon/>
                    </button>
                )}

                {Icon && (
                    <button type={'button'} tabIndex={0} onClick={() => onIconClick?.(value)}>
                        <Icon/>
                    </button>
                )}

                <hr role={'presentation'}/>
            </div>

            {commonV3 ?
                ((!disabled && error) || hint) && <div className={styles.hintOrErrorWrapper}>
                    <Hint hint={hint} error={!disabled && error} errorMessage={errorMessage} className={styles.hint}/>

                    {counter && (
                        <span className={styles.counter}>{(value?.toString().length) || 0} / {counter}</span>
                    )}
                </div>
            :
                <div className={styles.hintOrErrorWrapper}>
                    <Hint hint={hint} error={!disabled && error} errorMessage={errorMessage} className={styles.hint}/>

                    {counter && (
                        <span className={styles.counter}>{(value?.toString().length) || 0} / {counter}</span>
                    )}
                </div>
            }
        </div>
    );
});
