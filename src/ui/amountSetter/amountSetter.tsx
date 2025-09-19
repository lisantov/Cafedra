import clsx from "clsx";
import styles from './amountSetter.module.css';
import { useState } from "react";

import { Button } from '../button';

interface AmountSetterProps {
    initialValue?: number;
    onAmountUp?: () => void;
    onAmountDown?: () => void;
}

export const AmountSetter = ({
    initialValue = 1,
    onAmountUp = () => {},
    onAmountDown = () => {},
}: AmountSetterProps) => {
    const [amount, setAmount] = useState(initialValue);

    const handleAmountDown = () => {
        if(amount > 0) {
            setAmount(amount - 1);
            onAmountDown();
        }
    };

    const handleAmountUp = () => {
        setAmount(amount + 1);
        onAmountUp();
    };

    return (
        <div className={clsx(styles.setterContainer)}>
            <Button isPrimary onClick={handleAmountDown} >-</Button>
            <input className={clsx(styles.setterInput)} disabled type="number" value={amount}/>
            <Button isPrimary onClick={handleAmountUp} >+</Button>
        </div>
    )
};