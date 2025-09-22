import clsx from "clsx";
import styles from './modalButton.module.css';
import { type ReactNode, useState} from "react";
import ReactDOM from "react-dom";
import {Cart} from "../../components/cart/cart.tsx";

interface ButtonProps {
    isPrimary?: boolean;
    children?: ReactNode;
    modalRootId: string;
}

export const ModalButton = ({
    isPrimary = false,
    children,
    modalRootId
}: ButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const modalRoot = document.querySelector(`#${modalRootId}`)

    const showModal = () => {
        setIsModalOpen(true);
    }

    const hideModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <button onClick={showModal} className={clsx(styles.button, isPrimary && styles.buttonPrimary)}>
                {children}
            </button>
            {isModalOpen && ReactDOM.createPortal((<Cart close={hideModal}/>), modalRoot!)}
        </>
    )
}