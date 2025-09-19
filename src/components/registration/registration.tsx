import clsx from "clsx";
import styles from './registration.module.css';
import {Input} from "../../ui/input";
import {type SyntheticEvent, useRef, useState} from "react";
import {validateEmail, validatePassword} from "../../utilities/validation.ts";
import {Button} from "../../ui/button";
import type { TRegistrationData } from "../../utilities/types.ts";

type Registration = {
    name: string;
    secName: string;
    patronym: string;
    email: string;
    password: string;
}

interface RegistrationProps {
    onRegister: (data: TRegistrationData) => string | null;
}

export const Registration = ({
    onRegister
}: RegistrationProps) => {
    const [isFormValid, setIsFormValid] = useState<{[key in keyof Registration]: boolean}>({
        name: false,
        secName: false,
        patronym: false,
        email: false,
        password: false,
    });

    const [userInfo, setUserInfo] = useState<Registration>({
        name: '',
        secName: '',
        patronym: '',
        email: '',
        password: ''
    });

    const errorText = useRef<HTMLSpanElement | null>(null);

    const handleValidation = (name: string) => (value: boolean) => {
        setIsFormValid({
            ...isFormValid,
            [name]: value
        })
    }

    const handleInput = (name: string) => (value: string) => {
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const error = onRegister({
            fio: `${userInfo.secName} ${userInfo.name} ${userInfo.patronym}`,
            email: userInfo.email,
            password: userInfo.password,
        });
        if(errorText.current) errorText.current.textContent = error;
    }

    return (
        <form className={clsx(styles.form)} onSubmit={handleSubmit}>
            <Input
                onInput={handleInput('secName')}
                initialValue={userInfo.secName}
                title="Фамилия"
                name="secName"
                placeholder="Иванов"
                isRequired
                onValidation={handleValidation('secName')}
            />
            <Input
                onInput={handleInput('name')}
                initialValue={userInfo.name}
                title="Имя"
                name="name"
                placeholder="Иван"
                isRequired
                onValidation={handleValidation('name')}
            />
            <Input
                onInput={handleInput('patronym')}
                initialValue={userInfo.patronym}
                title="Отчество"
                name="patronym"
                placeholder="Иванович"
                isRequired
                onValidation={handleValidation('patronym')}
            />
            <Input
                type='email'
                onInput={handleInput('email')}
                initialValue={userInfo.email}
                title="E-mail"
                name="email"
                placeholder="example@ya.ru"
                isRequired
                validate={validateEmail}
                onValidation={handleValidation('email')}
            />
            <Input
                type='password'
                onInput={handleInput('password')}
                initialValue={userInfo.password}
                title="Пароль"
                name="password"
                placeholder="********"
                isRequired
                validate={validatePassword}
                onValidation={handleValidation('password')}
            />
            <Button type='submit' isPrimary isDisabled={!(isFormValid.name && isFormValid.secName && isFormValid.patronym && isFormValid.email && isFormValid.password)}>
                Зарегистрироваться
            </Button>
            <span ref={errorText} className={clsx(styles.errorText)}></span>
        </form>
    )
}