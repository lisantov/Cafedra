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

export type TCartAnswerProduct = TProduct & {
    product_id: string;
}

export type TProducts = {
    data: TCartAnswerProduct[];
}

export type TGetProducts = {
    data: TProduct[]
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
    errors?: Record<string, string[]>[];
};

export type TStoredToken = {
    value: string;
    timeStamp: number;
};

export type TCartProduct = TProduct & {
    amount: number;
    totalPrice: number;
    cart_id: string[];
}

export type TOrder = {
    id: string,
    products: string[],
    order_price: number
}

export type TOrders = {
    data: TOrder[]
}

export type TOrderProduct = TProduct & {
    amount: number;
}