import styles from './input.module.css';
import clsx from "clsx";

import {type SyntheticEvent, useRef, useState} from "react";
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

export const Input = ({
    initialValue = '',
    onInput = (v: string) => console.log(v),
    name,
    type = 'text',
    placeholder = 'Введите данные',
    title,
    isRequired = false,
    validate = defaultValidate,
    onValidation = (isValid) => console.log(isValid)
}: InputProps) => {
    const [value, setValue] = useState(initialValue);
    const [isAnyErrors, setIsAnyErrors] = useState(false);
    const errorTextElement = useRef<HTMLSpanElement | null>(null);

    const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const validationInfo = validate(value);
        setIsAnyErrors(!validationInfo.isValid);
        onValidation(validationInfo.isValid);
        if(errorTextElement.current) errorTextElement.current.textContent = validationInfo.errorText;
        setValue(value);
        onInput(value);
    }

    return (
        <>
            <label htmlFor={name} className={clsx(styles.inputTitle)}>
                <p>{title}{isRequired && (<span className={clsx(styles.inputRequired)}>*</span>)}</p>
                <input value={value} onInput={handleInput} name={name} type={type} required={isRequired} placeholder={placeholder} className={clsx(styles.input, isAnyErrors && styles.inputError)} />
                {isAnyErrors && <span ref={errorTextElement} className={clsx(styles.error)}></span>}
            </label>
        </>
    );
}