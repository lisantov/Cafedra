import type {TStoredToken} from "./types.ts";

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const TOKEN_TTL_MS = Number(import.meta.env.VITE_TOKEN_TTL_MS);

export const isExpired = (timeStamp?: number): boolean => {
    if(!timeStamp) return false;

    const now = new Date().getTime();
    const diff = now - timeStamp;

    return diff > TOKEN_TTL_MS;
}

export const setToken = (access_token: string) => {
    localStorage.setItem(
        TOKEN_KEY,
        JSON.stringify({
            value: access_token,
            timeStamp: new Date().getTime(),
        })
    )
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const getToken = (): TStoredToken | null => {
    let result = null;

    const storedToken = localStorage.getItem(TOKEN_KEY)
    if(storedToken) result = JSON.parse(storedToken);

    return result;
}