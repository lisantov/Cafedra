import clsx from "clsx";
import styles from './registration.module.css';
import {Input} from "../../ui/input";
import {type SyntheticEvent, useRef, useState} from "react";
import {validateEmail, validatePassword} from "../../utilities/validation.ts";
import {Button} from "../../ui/button";
import type {TError, TLoginSuccess, TRegistrationData} from "../../utilities/types.ts";
import {registerUser} from "../../utilities/api.ts";
import {setToken} from "../../utilities/token.ts";
import type {InputRef} from "../../ui/input/input.tsx";

type Registration = {
    name: string;
    secName: string;
    patronym: string;
    email: string;
    password: string;
}

interface RegistrationProps {
    onRegister: () => void;
}

export const Registration = ({
    onRegister
}: RegistrationProps) => {
    const emailFieldRef = useRef<InputRef | null>(null);
    const passwordFieldRef = useRef<InputRef | null>(null);
    const nameFieldRef = useRef<InputRef | null>(null);
    const secNameFieldRef = useRef<InputRef | null>(null);
    const patronymFieldRef = useRef<InputRef | null>(null);

    const fields = [
        {ref: secNameFieldRef, name: 'secName'},
        {ref: nameFieldRef, name: 'name'},
        {ref: patronymFieldRef, name: 'patronym'},
        {ref: emailFieldRef, name: 'email'},
        {ref: passwordFieldRef, name: 'password'}
    ];

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
        handleRegistration({
            fio: `${userInfo.secName} ${userInfo.name} ${userInfo.patronym}`,
            email: userInfo.email,
            password: userInfo.password,
        });
    }

    const handleRegistration = (data: TRegistrationData) => {
        registerUser(data)
            .then((resp): Promise<TLoginSuccess> => {
                if(resp.ok) return resp.json()
                else throw resp;
            })
            .then((data: TLoginSuccess) => {
                if(errorText.current) errorText.current.textContent = '';
                setToken(data.data.user_token);
                onRegister();
            })
            .catch(async (error) => {
                if(errorText.current) errorText.current.textContent = '';

                try {
                    const errorData: TError = await error.json();
                    console.error('Ошибка при регистрации:', errorData);

                    if(errorData && errorData.errors) {
                        const fieldErrors = errorData.errors;

                        fieldErrors.forEach(errorFieldResp => {
                            fields.forEach(({ref, name}) => {
                                if(ref.current && errorFieldResp[name]) {
                                    ref.current.setError(errorFieldResp[name][0]);
                                }
                            });
                        })

                        if(errorText.current) {
                            errorText.current.textContent = errorData.message || 'Ошибка при регистрации';
                        }
                    } else {
                        if(errorText.current) errorText.current.textContent = 'Ошибка при регистрации';
                    }
                }
                catch (parseError) {
                    console.error('Ошибка при обработке ответа:', parseError);
                    if (errorText.current) errorText.current.textContent = 'Ошибка при регистрации';
                }
            })
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
                ref={secNameFieldRef}
            />
            <Input
                onInput={handleInput('name')}
                initialValue={userInfo.name}
                title="Имя"
                name="name"
                placeholder="Иван"
                isRequired
                onValidation={handleValidation('name')}
                ref={nameFieldRef}
            />
            <Input
                onInput={handleInput('patronym')}
                initialValue={userInfo.patronym}
                title="Отчество"
                name="patronym"
                placeholder="Иванович"
                isRequired
                onValidation={handleValidation('patronym')}
                ref={patronymFieldRef}
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
                ref={emailFieldRef}
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
                ref={passwordFieldRef}
            />
            <Button type='submit' isPrimary isDisabled={!(isFormValid.name && isFormValid.secName && isFormValid.patronym && isFormValid.email && isFormValid.password)}>
                Зарегистрироваться
            </Button>
            <span ref={errorText} className={clsx(styles.errorText)}></span>
        </form>
    )
}