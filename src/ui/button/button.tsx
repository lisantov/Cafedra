import clsx from "clsx";
import styles from './button.module.css';
import type {ReactNode} from "react";

interface ButtonProps {
    isPrimary?: boolean;
    isDisabled?: boolean;
    onClick?: () => void;
    type?: 'submit' | 'reset' | 'button';
    children?: ReactNode;
}

export const Button = ({
    isPrimary = false,
    isDisabled = false,
    onClick = () => {},
    type = 'button',
    children
}: ButtonProps) => {
    return (
        <button type={type} onClick={onClick} className={clsx(styles.button, isPrimary && styles.buttonPrimary, isDisabled && styles.buttonDisabled)} disabled={isDisabled}>
            {children}
        </button>
    )
}