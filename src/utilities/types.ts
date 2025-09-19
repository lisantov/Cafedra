export type TRegistrationData = {
    fio: string;
    email: string;
    password: string;
};

export type TRegistrationSuccess = {
    user_token: string;
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