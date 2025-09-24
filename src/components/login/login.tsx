import clsx from "clsx";
import styles from "./login.module.css";

import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { type SyntheticEvent, useRef, useState } from "react";
import { validateEmail, validatePassword } from "../../utilities/validation.ts";
import type { TError, TLoginData, TLoginSuccess } from "../../utilities/types.ts";
import { setToken } from "../../utilities/token.ts";
import { loginUser } from "../../utilities/api.ts";

type Login = {
    email: string;
    password: string;
}

interface LoginProps {
    onLogin: () => void;
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
        handleLogin({
            email: userInfo.email,
            password: userInfo.password,
        });
    }

    const handleLogin = (data: TLoginData) => {
        loginUser(data)
            .then((resp): Promise<TLoginSuccess> => {
                if(resp.ok) return resp.json()
                else throw resp;
            })
            .then((data: TLoginSuccess) => {
                if(errorText.current) errorText.current.textContent = '';
                setToken(data.data.user_token);
                onLogin();
            })
            .catch(async (error) => {
                if(errorText.current) errorText.current.textContent = '';

                try {
                    const errorData: TError = await error.json();
                    console.error('Ошибка при авторизации:', errorData);

                    if(errorData) {
                        if(errorText.current) {
                            errorText.current.textContent =  'Ошибка при авторизации: Неправильный логин или пароль';
                        }
                    } else {
                        if(errorText.current) errorText.current.textContent = 'Ошибка при авторизации';
                    }
                }
                catch (parseError) {
                    console.error('Ошибка при обработке ответа:', parseError);
                    if (errorText.current) errorText.current.textContent = 'Ошибка при авторизации';
                }
            })
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