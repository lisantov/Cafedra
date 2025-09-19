import type {
    TRegistrationData,
    TLoginSuccess,
    TLoginData,
    TSuccessMessage,
    TProducts,
    TError
} from "./types.ts";
import { serverUrl } from "./constants.ts";

export const getProducts = (): Promise<TProducts> => {
    return fetch(`${serverUrl}/products`, {
        method: 'GET',
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((error: TError) => {
            console.error(`${error.code}: ${error.message}`);
        })
}

export const registerUser = (data: TRegistrationData): Promise<TLoginSuccess> => {
    return fetch(`${serverUrl}/signup`, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((error: TError) => {
            console.error(`${error.code}: ${error.message}`);
        })
};

export const loginUser = (data: TLoginData): Promise<TLoginSuccess> => {
    return fetch(`${serverUrl}/login`, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((error: TError) => {
            console.error(`${error.code}: ${error.message}`);
        })
};

export const logout = (userToken: string): Promise<TSuccessMessage> => {
    return fetch(`${serverUrl}/logout`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        },
        method: 'GET'
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((error: TError) => {
            console.error(`${error.code}: ${error.message}`);
        })
};

export const setProduct = (productId: string, userToken: string, method: 'POST' | 'DELETE'): Promise<TSuccessMessage> => {
    return fetch(`${serverUrl}/cart/${productId}`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        },
        method: method
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((error: TError) => {
            console.error(`${error.code}: ${error.message}`);
        })
};