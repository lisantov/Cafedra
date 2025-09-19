export type TRegistrationData = {
    fio: string;
    email: string;
    password: string;
};

export type TLoginData = {
    email: string;
    password: string;
};

export type TProduct = {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
};

export type TProducts = {
    data: TProduct[];
}

export type TSuccessMessage = {
    message: string;
}

export type TLoginSuccess = {
    data: {
        user_token: string;
    }
};

export type TError = {
    code: number;
    message: string
    errors: Record<string, string>
};

export type TStoredToken = {
    value: string;
    timeStamp: number;
};