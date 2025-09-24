import clsx from "clsx";
import styles from './cartProduct.module.css';
import deleteIcon from '../../assets/delete_button.svg';

import type { TCartProduct } from "../../utilities/types.ts";
import {hostName} from "../../utilities/constants.ts";
import type {SyntheticEvent} from "react";

interface ProductProps {
    product: TCartProduct;
    deleteProduct: (cart_id: string) => void;
    increaseProduct: (id: string) => void;
    decreaseProduct: (cart_id: string) => void;
}

export const CartProduct = ({
    product,
    deleteProduct,
    increaseProduct,
    decreaseProduct
}: ProductProps) => {
    const { image, name, amount, totalPrice, id, cart_id } = product;

    const handleDelete = (e: SyntheticEvent) => {
        e.stopPropagation();
        deleteProduct(cart_id[0]);
        cart_id.shift();
    }

    const increase = (e: SyntheticEvent) => {
        e.stopPropagation();
        increaseProduct(id);
    }

    const decrease = (e: SyntheticEvent) => {
        e.stopPropagation();
        decreaseProduct(cart_id[0]);
    }

    return (
        <article className={clsx(styles.product)}>
            <div style={{ backgroundImage: `url(${hostName}/${image})` }} className={clsx(styles.productImage)} />
            <div className={clsx(styles.productTitleContainer)}>
                <div className={clsx(styles.topContainer)}>
                    <h2 className={clsx(styles.productTitle)}>{name}</h2>
                    <div className={clsx(styles.buttonsContainer)}>
                        <button onClick={decrease} className={clsx(styles.button)}>-</button>
                        <span className={clsx(styles.amountText)}>{amount}</span>
                        <button onClick={increase} className={clsx(styles.button)}>+</button>
                    </div>
                </div>
                <span className={clsx(styles.productPrice)}>{totalPrice} р.</span>
            </div>
            <button onClick={handleDelete} className={clsx(styles.deleteButton)}>
                <img src={deleteIcon} alt="Иконка корзины"/>
            </button>
        </article>
    )
}