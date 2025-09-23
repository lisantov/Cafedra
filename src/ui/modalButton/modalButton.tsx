import clsx from "clsx";
import styles from './modalButton.module.css';
import { type ReactNode, useState} from "react";
import ReactDOM from "react-dom";

interface ButtonProps {
    isOpen: boolean;
    setIsOpen: (val: boolean) =>  void;
    isPrimary?: boolean;
    buttonText?: string;
    onClick?: () => void;
    children: ReactNode;
    modalRootId?: string;
}

export const ModalButton = ({
    buttonText = 'Кнопка',
    isOpen,
    setIsOpen,
    isPrimary = false,
    onClick = () => {},
    children,
    modalRootId
}: ButtonProps) => {
    const modalRoot = document.querySelector(`#${modalRootId}`)

    const showModal = () => {
        setIsOpen(true);
    }

    const handleClick = () => {
        showModal();
        onClick();
    }

    return (
        <>
            <button onClick={handleClick} className={clsx(styles.button, isPrimary && styles.buttonPrimary)}>
                {buttonText}
            </button>
            {isOpen && ReactDOM.createPortal(children, modalRoot!)}
        </>
    )
}