import clsx from "clsx";
import styles from "./login.module.css";

import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { type SyntheticEvent, useRef, useState } from "react";
import { validateEmail, validatePassword } from "../../utilities/validation.ts";
import type { TLoginData } from "../../utilities/types.ts";

type Login = {
    email: string;
    password: string;
}

interface LoginProps {
    onLogin: (data: TLoginData) =>  string | null
}

export const Login = ({
    onLogin
}:LoginProps) => {
    const [isFormValid, setIsFormValid] = useState<{[key in keyof Login]: boolean}>({
        email: false,
        password: false,
    });

    const errorText = useRef<HTMLSpanElement | null>(null);

    const [userInfo, setUserInfo] = useState<Login>({
        email: '',
        password: ''
    });

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
        const error = onLogin({
            email: userInfo.email,
            password: userInfo.password,
        });
        if(errorText.current) errorText.current.textContent = error;
    }

    return (
        <form className={clsx(styles.form)} onSubmit={handleSubmit}>
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
            <Button type='submit' isPrimary isDisabled={!(isFormValid.email && isFormValid.password)}>
                Войти
            </Button>
            <span ref={errorText} className={clsx(styles.errorText)}></span>
        </form>
    )
}