import clsx from "clsx";
import styles from './cart.module.css';
import {useCallback, useEffect, useRef, useState} from "react";
import type {TCartProduct, TProducts} from "../../utilities/types.ts";
import { CartProduct } from "../../ui/cartProduct";
import { getToken, isCurrentTokenExpired } from "../../utilities/token.ts";
import { getCart, setProduct } from "../../utilities/api.ts";

interface CartProps {
    close?: () => void;
}

export const Cart = ({
    close = () => {}
}: CartProps) => {
    const cartWrap = useRef<HTMLDivElement | null>(null);
    const [cart, setCart] = useState<TCartProduct[]>([]);

    const increaseProduct = useCallback((id: string) => {
        addProduct(id);

        setCart((cart) => {
            return cart.map(prod => {
                if(prod.id === id) {
                    const newAmount = prod.amount + 1;

                    return {
                        ...prod,
                        amount: newAmount,
                        totalPrice: prod.price * newAmount
                    }
                }
                return prod;
            })
        })
    }, []);

    const decreaseProduct = useCallback((id: string) => {
        removeProduct(id);

        setCart((cart) => {
            return cart.map(prod => {
                if(prod.id === id && prod.amount > 1) {
                    const newAmount = prod.amount - 1;

                    return {
                        ...prod,
                        amount: newAmount,
                        totalPrice: prod.price * newAmount
                    }
                }
                return prod;
            })
        })
    }, []);

    const deleteProduct = useCallback((id: string) => {
        console.log(id);
        const product = cart.filter()

        if (product) {
            for (let i = 0; i < product.amount; i++) {
                removeProduct(id);
            }
        }

        setCart((cart) => {
            return cart.filter(prod => prod.id !== id);
        })
    }, []);

    const products = cart.map(prod => {
       return <CartProduct decreaseProduct={decreaseProduct} increaseProduct={increaseProduct} deleteProduct={deleteProduct} product={prod} key={prod.id} />
    });

    const handleClose = () => {
        if(cartWrap.current) {
            cartWrap.current.classList.add(clsx(styles.close));
            setTimeout(close, 300);
        }
    }

    const actualizeProducts = () => {
        if(!isCurrentTokenExpired()) {
            const token = getToken()!.value;
            getCart(token)
                .then((data: TProducts) => {
                    const groupedProducts = data.data.reduce((grouped: TCartProduct[], product) => {
                        const existingProductIndex = grouped.findIndex(p => {
                            return p.id === product.product_id
                        });

                        if (existingProductIndex !== -1) {
                            const existingProduct = grouped[existingProductIndex];
                            existingProduct.amount += 1;
                            existingProduct.totalPrice = existingProduct.price * existingProduct.amount;
                        } else {
                            grouped.push({
                                id: product.product_id,
                                name: product.name,
                                description: product.description,
                                image: product.image,
                                price: product.price,
                                amount: 1,
                                totalPrice: product.price,
                                cart_id: product.id
                            });
                        }

                        return grouped;
                    }, []);

                    setCart(groupedProducts);
                })
        }
    }

    const removeProduct = (id: string) => {
        if(!isCurrentTokenExpired()) {
            const token = getToken()!.value;
            setProduct(id, token, 'DELETE');
        }
    }

    const addProduct = (id: string) => {
        if(!isCurrentTokenExpired()) {
            const token = getToken()!.value;
            setProduct(id, token, 'POST');
        }
    }

    useEffect(() => {
        actualizeProducts();
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
                            {products}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}