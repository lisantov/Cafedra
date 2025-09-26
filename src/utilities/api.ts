import type {
    TRegistrationData,
    TLoginData,
    TSuccessMessage,
    TProducts,
    TError, TGetProducts
} from "./types.ts";
import { serverUrl } from "./constants.ts";

export const getProducts = (): Promise<TGetProducts> => {
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

export const registerUser = (data: TRegistrationData): Promise<Response> => {
    return fetch(`${serverUrl}/signup`, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
};

export const loginUser = (data: TLoginData): Promise<Response> => {
    return fetch(`${serverUrl}/login`, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
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

export const getCart = (userToken: string): Promise<TProducts> => {
    return fetch(`${serverUrl}/cart`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((error: TError) => {
            console.error(`${error.code}: ${error.message}`);
        })
}

export const submitOrder = (userToken: string): Promise<TSuccessMessage> => {
    return fetch(`${serverUrl}/order`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        },
        method: 'POST'
    })
        .then((response) => {
            if(response.ok) return response.json();
        })
        .catch((error: TError) => {
            console.error(`${error.code}: ${error.message}`);
        })
}

export const getOrders = (userToken: string): Promise<Response> => {
    return fetch(`${serverUrl}/order`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    })
}