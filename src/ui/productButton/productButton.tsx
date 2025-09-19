import clsx from "clsx";
import styles from './productButton.module.css';
import {useEffect, useState} from "react";
import {AmountSetter} from "../amountSetter";

interface ButtonProps {
    buttonText?: string;
    isPrimary?: boolean;
    onAdd?: () => void;
    onRemove?: () => void;
}

export const ProductButton = ({
    buttonText = 'Добавить в корзину',
    onAdd = () => {},
    onRemove = () => {},
}: ButtonProps) => {
    const [isInCart, setIsInCart] = useState<boolean>(false);
    const [amount, setAmount] = useState<number>(0);

    const handleClick = () => {
        setIsInCart(true);
        setAmount(1);
        onAdd();
    }

    const handleAdd = () => {
        setAmount(amount + 1);
        onAdd();
    }

    const handleRemove = () => {
        setAmount(amount - 1);
        onRemove();
    }

    useEffect(() => {
        if(amount === 0) setIsInCart(false);
    }, [amount]);

    return (
        <>
            {!isInCart ? (
                    <>
                        <button type='button' onClick={handleClick} className={clsx(styles.productButton)}>
                            {buttonText}
                        </button>
                    </>
                ) : (
                    <>
                        <AmountSetter initialValue={amount} onAmountDown={handleRemove} onAmountUp={handleAdd} />
                    </>
                )
            }
        </>
    )
}