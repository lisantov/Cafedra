import { Header } from "./header";
import { Main } from "./main";
import {Catalog} from "./catalog";
import { Registration } from "./registration";
import { Login } from "./login";

import { Button } from "../ui/button";
import { Title } from "../ui/title";
import { Product } from "../ui/product";
import { ProductButton } from "../ui/productButton";
import { Logo } from '../ui/logo';

import type {TError, TRegistrationData, TRegistrationSuccess} from "../utilities/types.ts";
import { useState } from "react";
import { serverUrl } from "../utilities/constants.ts";
import { setToken } from "../utilities/token.ts";

function App() {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [isLogging, setIsLogging] = useState<boolean>(false);

    const handleLogo = () => {
        if(isRegistering) setIsRegistering(false);
        if(isLogging) setIsLogging(false);
    }

    const handleRegistrationButton = () => {
        if(isLogging) setIsLogging(false);
        if(!isRegistering) setIsRegistering(true);
    }

    const handleLoginButton = () => {
        if(isRegistering) setIsRegistering(false);
        if(!isLogging) setIsLogging(true);
    }

    const handleRegistration = (data: TRegistrationData): string | null => {
        let errorMessage = null;
        console.log(data);
        fetch(`${serverUrl}/signup`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then((response) => {
                if(response.ok) return response.json();
            })
            .then((data: TRegistrationSuccess) => {
                setToken(data.user_token);
                setIsLogged(true);
                setIsRegistering(false);
            })
            .catch((error: TError) => {
                console.error(`${error.code}: ${error.message}`);
                errorMessage = error.message;
            })
        return errorMessage;
    }

    return (
    <>
        <Header logo={<Logo onClick={handleLogo} />}>
            {isLogged ? (
                <>
                    <Button isPrimary >Оформленные заказы</Button>
                    <Button isPrimary >Корзина</Button>
                    <Button >Выйти</Button>
                </>
            ) : (
                <>
                    <Button isPrimary onClick={handleLoginButton} >Войти</Button>
                    <Button onClick={handleRegistrationButton} >Зарегистрироваться</Button>
                </>
            )}
        </Header>
        <Main>
            {isRegistering ? (
                <>
                    <Title>Регистрация</Title>
                    <Registration onRegister={handleRegistration} />
                </>
            ) : isLogging ? (
                <>
                    <Title>Вход в аккаунт</Title>
                    <Login />
                </>
            ) : (
                <Catalog>
                    <Product productTitle="Имба" productDescription="Лучшая в мире" productPrice={100}>
                        { isLogged && <ProductButton />}
                    </Product>
                    <Product productTitle="Имба" productDescription="Лучшая в мире" productPrice={100}>
                        { isLogged && <ProductButton />}
                    </Product>
                    <Product productTitle="Имба" productDescription="Лучшая в мире" productPrice={100}>
                        { isLogged && <ProductButton />}
                    </Product>
                    <Product productTitle="Имба" productDescription="Лучшая в мире" productPrice={100}>
                        { isLogged && <ProductButton />}
                    </Product>
                    <Product productTitle="Имба" productDescription="Лучшая в мире" productPrice={100}>
                        { isLogged && <ProductButton />}
                    </Product>
                    <Product productTitle="Имба" productDescription="Лучшая в мире" productPrice={100}>
                        { isLogged && <ProductButton />}
                    </Product>
                </Catalog>
            )}
        </Main>
    </>
    )
}

export default App
