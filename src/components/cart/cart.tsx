import clsx from "clsx";
import styles from './cart.module.css';
import {useState, useEffect, useRef} from "react";
import type { TProduct } from "../../utilities/types.ts";

interface CartProps {
    close: () => void;
}

export const Cart = ({
    close
}: CartProps) => {
    const [products, setProducts] = useState<TProduct[]>([]);
    const productsComponent = products.map((product, index) => {
        return
    })
    const cartWrap = useRef<HTMLDivElement | null>(null);

    const handleClose = () => {
        if(cartWrap.current) {
            cartWrap.current.classList.add(clsx(styles.close));
            setTimeout(close, 300);
        }
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [])

    return (
        <div className={clsx(styles.cartWrapper)} ref={cartWrap}>
            <div className={clsx(styles.cartOverlay)} onClick={handleClose}></div>
            <div className={clsx(styles.cart)}>
                <button className={clsx(styles.cartClose)} onClick={handleClose}></button>
                <h4 className={clsx(styles.cartTitle)}>Корзина</h4>
                <div className={clsx(styles.cartContainer)}>
                    {!products.length ? (
                        <span className={clsx(styles.cartText)}>Корзина пуста</span>
                    ) : (
                        <div className={clsx(styles.productContainer)}>
                            {productsComponent}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}