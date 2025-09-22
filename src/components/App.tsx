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

import type {
    TError,
    TLoginData,
    TLoginSuccess,
    TProduct, TProducts,
    TRegistrationData,
} from "../utilities/types.ts";
import { useEffect, useState } from "react";
import { getToken, isExpired, removeToken, setToken } from "../utilities/token.ts";
import { getProducts, loginUser, logout, registerUser, setProduct } from "../utilities/api.ts";
import { hostName } from "../utilities/constants.ts";
import { Cart } from "./cart/cart.tsx";
import {ModalButton} from "../ui/modalButton";

function App() {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [isLogging, setIsLogging] = useState<boolean>(false);
    const [products, setProducts] = useState<TProduct[]>([]);

    const handleProductButton = (id: string, method: 'POST' | 'DELETE') => () => {
        if(!isCurrentTokenExpired()) {
            const token = getToken()!.value;
            setProduct(id, token, method)
        }
    }

    const productsComponents = products.map((product, index) => {
        return (
            <Product
                productTitle={product.name}
                productImageUrl={hostName+'/'+product.image}
                productDescription={product.description}
                productPrice={product.price}
                key={index}
            >
                {isLogged &&
                    <ProductButton
                        onAdd={handleProductButton(product.id, 'POST')}
                        onRemove={handleProductButton(product.id, 'DELETE')}
                    />
                }
            </Product>
        )
    })

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

    const isCurrentTokenExpired = (): boolean => {
        const token = getToken();
        if(token) return isExpired(token.timeStamp);
        return true;
    }

    useEffect(() => {
        getProducts()
            .then((data: TProducts) => {
                setProducts(data.data);
            })
            .catch((error: TError) => {
                console.error(`${error.code}: ${error.message}`);
            });
        if(!isCurrentTokenExpired()) {
            setIsLogged(true);
        }
    }, []);

    const handleRegistration = (data: TRegistrationData): string | null => {
        let errorMessage = null;
        registerUser(data)
            .then((data: TLoginSuccess) => {
                setToken(data.data.user_token);
                setIsLogged(true);
                setIsRegistering(false);
            })
            .catch((error: TError) => {
                console.error(`${error.code}: ${error.message}`);
                errorMessage = error.message;
            })
        return errorMessage;
    }

    const handleLogin = (data: TLoginData): string | null => {
        let errorMessage = null;
        loginUser(data)
            .then((data: TLoginSuccess) => {
                setToken(data.data.user_token);
                setIsLogged(true);
                setIsLogging(false);
            })
            .catch((error: TError) => {
                console.error(`${error.code}: ${error.message}`);
                errorMessage = error.message;
            })
        return errorMessage;
    }

    const handleLogout = () => {
        if(!isCurrentTokenExpired()) {
            const token = getToken()!.value;
            logout(token)
                .then(() => {
                    removeToken();
                    setIsLogged(false);
                })
        }
    }

    return (
    <>
        <Header logo={<Logo onClick={handleLogo} />}>
            {isLogged ? (
                <>
                    <ModalButton
                        modalRootId='react-modals'
                        isPrimary
                    >
                        Оформленные заказы
                    </ModalButton>
                    <Button isPrimary >Корзина</Button>
                    <Button onClick={handleLogout} >Выйти</Button>
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
                    <Login onLogin={handleLogin} />
                </>
            ) : (
                <Catalog>
                    {productsComponents}
                </Catalog>
            )}
        </Main>
        <div id='react-modals'>
        </div>
    </>
    )
}

export default App
