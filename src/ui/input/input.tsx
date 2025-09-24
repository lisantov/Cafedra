import styles from './input.module.css';
import clsx from "clsx";

import {forwardRef, type SyntheticEvent, useImperativeHandle, useRef, useState} from "react";
import {defaultValidate, type TValidation} from "../../utilities/validation.ts";

interface InputProps {
    initialValue?: string;
    onInput?: (value: string) => void;
    name?: string;
    type?: string;
    placeholder?: string;
    title?: string;
    isRequired?: boolean;
    validate?: (value: string) => TValidation;
    onValidation?: (isValid: boolean) => void;
}

export interface InputRef {
    setError: (error: string) => void;
    clearError: () => void;
}

export const Input = forwardRef<InputRef, InputProps>(({
    initialValue = '',
    onInput = (v: string) => console.log(v),
    name,
    type = 'text',
    placeholder = 'Введите данные',
    title,
    isRequired = false,
    validate = defaultValidate,
    onValidation = (isValid) => console.log(isValid)
}, ref) => {
    const [value, setValue] = useState(initialValue);
    const [isAnyErrors, setIsAnyErrors] = useState(false);
    const errorTextElement = useRef<HTMLSpanElement | null>(null);

    useImperativeHandle(ref, () => ({
        setError: (error: string) => {
            console.log(error);
            setIsAnyErrors(true);
            console.log(errorTextElement.current);
            if(errorTextElement.current) errorTextElement.current.textContent = error;
            onValidation(false);
        },
        clearError: () => {
            setIsAnyErrors(false);
            if(errorTextElement.current) errorTextElement.current.textContent = '';
            onValidation(validate(value).isValid);
        }
    }))

    const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const validationInfo = validate(value);
        setIsAnyErrors(!validationInfo.isValid);
        onValidation(validationInfo.isValid);
        setError(validationInfo.errorText);
        setValue(value);
        onInput(value);
    }

    const setError = (error: string) => {
        if(errorTextElement.current) errorTextElement.current.textContent = error;
    }

    return (
        <>
            <label htmlFor={name} className={clsx(styles.inputTitle)}>
                <p>{title}{isRequired && (<span className={clsx(styles.inputRequired)}>*</span>)}</p>
                <input value={value} onInput={handleInput} name={name} type={type} required={isRequired} placeholder={placeholder} className={clsx(styles.input, isAnyErrors && styles.inputError)} />
                <span ref={errorTextElement} className={clsx(styles.error)}></span>
            </label>
        </>
    );
});