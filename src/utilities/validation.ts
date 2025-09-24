export type TValidation = {
    isValid: boolean;
    errorText: string;
}

export const defaultValidate = (value: string): TValidation => {
    const regex = /^[A-Za-zА-Яа-яЁё\s]+$/;
    if(regex.test(value) && value.length > 0) {
        return {
            isValid: true,
            errorText: ''
        }
    }
    else if(value.length > 0) {
        return  {
            isValid: false,
            errorText: 'Введён недопустимый символ'
        }
    }
    else {
        return  {
            isValid: false,
            errorText: 'Поле не может быть пустым'
        }
    }
}

export const validateEmail = (value: string): TValidation => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? {
        isValid: true,
        errorText: ''
    } : {
        isValid: false,
        errorText: 'Введён некорректный email'
    }
}


export const validatePassword = (value: string): TValidation => {
    if (!value) return {
            isValid: false,
            errorText: 'Пароль не может быть пустым'
        }

    if (value.length <6) return {
        isValid: false,
        errorText: 'Пароль должен содержать минимум 6 символов'
    }

    if (!/[A-ZА-Я]/.test(value)) return {
        isValid: false,
        errorText: 'Пароль должен содержать хотя бы одну заглавную букву'
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};:'",.<>/?\\|`~]/.test(value)) return {
        isValid: false,
        errorText: 'Пароль должен содержать хотя бы один символ'
    }
    return {
        isValid: true,
        errorText: ''
    }
}