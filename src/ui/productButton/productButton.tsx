import clsx from "clsx";
import styles from './productButton.module.css';
import { useState } from "react";

interface ButtonProps {
    buttonText?: string;
    onAdd?: () => void;
    onClick?: () => void;
}

export const ProductButton = ({
    buttonText = 'Добавить в корзину',
    onAdd = () => {},
    onClick = () => {}
}: ButtonProps) => {
    const [isInCart, setIsInCart] = useState<boolean>(false);

    const handleClick = () => {
        setIsInCart(true);
        onAdd();
        onClick();
    }

/*
    ИЗ-ЗА ОГРАНИЧЕНИЙ API ВОЗМОЖНОСТИ ИСПОЛЬЗОВАНИЯ ВАРИАНТА С ПЕРЕКЛЮЧАТЕЛЕМ КОЛИЧЕСТВА НЕТУ =(
    И вообще никаких приколов не придумать, не нравится
    const handleAdd = () => {
        setAmount(amount + 1);
        onAdd();
    }

    const handleRemove = () => {
        setAmount(amount - 1);
        onRemove();
    }
    return (
        <>
            { !isInCart ? (
                    <>
                        <button type='button' onClick={handleClick} className={clsx(styles.productButton)}>
                            {buttonText}
                        </button>
                    </>
                ) : (
                    <>
                        <button type='button' onClick={handleClick} className={clsx(styles.productButton)}>
                            {buttonText}
                        </button>
                             <AmountSetter initialValue={amount} onAmountDown={handleRemove} onAmountUp={handleAdd} />
                        }
                    </>
                )
            }
        </>
    )
*/

    return (
        <button type='button' onClick={handleClick} className={clsx(styles.productButton, isInCart && styles.disabled)} disabled={isInCart}>
            { !isInCart ? buttonText : "Уже в корзине" }
        </button>
    )
}