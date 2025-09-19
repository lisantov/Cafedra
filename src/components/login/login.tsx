import clsx from "clsx";
import styles from './login.module.css';
import {Input} from "../../ui/input";
import {useState} from "react";
import {validateEmail, validatePassword} from "../../utilities/validation.ts";
import {Button} from "../../ui/button";

type Login = {
    email: string;
    password: string;
}

export const Login = () => {
    const [isFormValid, setIsFormValid] = useState<{[key in keyof Login]: boolean}>({
        email: false,
        password: false,
    });

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

    return (
        <form className={clsx(styles.form)}>
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
        </form>
    )
}