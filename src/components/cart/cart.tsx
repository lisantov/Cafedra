import clsx from "clsx";
import styles from './cart.module.css';
import {useCallback, useEffect, useRef, useState} from "react";
import type {TCartProduct, TProducts} from "../../utilities/types.ts";
import { CartProduct } from "../../ui/cartProduct";
import { getToken, isCurrentTokenExpired } from "../../utilities/token.ts";
import {getCart, setProduct, submitOrder} from "../../utilities/api.ts";
import {Button} from "../../ui/button";

interface CartProps {
    close?: () => void;
}

export const Cart = ({
    close = () => {}
}: CartProps) => {
    const cartWrap = useRef<HTMLDivElement | null>(null);
    const [cart, setCart] = useState<TCartProduct[]>([]);
    const totalPrice = cart.reduce((sum, product) => sum + product.totalPrice, 0);

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

    const decreaseProduct = useCallback((cart_id: string) => {
        removeProduct(cart_id);

        setCart((cart) => {
            return cart.map(prod => {
                if(prod.cart_id[0] === cart_id && prod.amount > 1) {
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

    const deleteProduct = (cart_id: string) => {
        const product = cart.filter(prod => prod.cart_id[0] === cart_id)[0];
        console.log(cart);
        if (product) {
            product.cart_id.forEach(id => {
                removeProduct(id);
            })
        }

        setCart((cart) => {
            return cart.filter(prod => prod.cart_id[0] !== cart_id);
        })
    };

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
                            existingProduct.cart_id.push(product.id);
                        } else {
                            grouped.push({
                                id: product.product_id,
                                name: product.name,
                                description: product.description,
                                image: product.image,
                                price: Number(product.price),
                                amount: 1,
                                totalPrice: product.price,
                                cart_id: [product.id]
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
            setProduct(id, token, 'DELETE')
                .then(() => {
                    actualizeProducts();
                })
        }
    }

    const addProduct = (id: string) => {
        if(!isCurrentTokenExpired()) {
            const token = getToken()!.value;
            setProduct(id, token, 'POST')
                .then(() => {
                    actualizeProducts();
                })
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

    const handleSubmit = () => {
        if(!isCurrentTokenExpired()) {
            const token = getToken()!.value;
            submitOrder(token)
                .then(() => {
                    actualizeProducts();
                })
        }
    }

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
                        <>
                            <div className={clsx(styles.productContainer)}>
                                {products}
                            </div>
                            <div className={clsx(styles.cartSubmitContainer)}>
                                <h4 className={clsx(styles.cartTotal)}>Итого: {totalPrice} р.</h4>
                                <Button onClick={handleSubmit} isPrimary>Оформить заказ</Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}