import clsx from "clsx";
import styles from './order.module.css';
import { getProducts } from "../../utilities/api.ts";
import type { TGetProducts, TOrderProduct } from "../../utilities/types.ts";
import { useEffect, useState } from "react";
import { OrderItem } from "../orderItem";

interface ProductProps {
    productsId: string[];
    orderId: string;
    orderPrice: number;
}

export const Order = ({
    productsId,
    orderId,
    orderPrice
}: ProductProps) => {
    const [products, setProducts] = useState<TOrderProduct[]>([]);
    const orderItems = products.map(product => {
        return <OrderItem productsTitle={product.name} productsAmount={product.amount} />
    })
    const getOrderProducts = () => {
        getProducts()
            .then((data: TGetProducts) => {
                const orderProducts: TOrderProduct[] = [];
                productsId.forEach(id => {
                    data.data.forEach(product => {
                        if(product.id === id) {
                            const ifAlreadyThere = orderProducts.findIndex(p => p.id === id);
                            if(ifAlreadyThere !== -1) {
                                orderProducts[ifAlreadyThere].amount += 1;
                            }
                            orderProducts.push({
                                ...product,
                                amount: 1
                            })
                        }
                    })
                })
                setProducts(orderProducts);
            })
    }

    useEffect(() => {
        getOrderProducts();
    }, [])


    return (
        <article className={clsx(styles.order)}>
            <div className={clsx(styles.productsContainer)}>
                {orderItems}
            </div>
            <div className={clsx(styles.orderInfo)}>
                <p className={clsx(styles.orderSpan)}>Номер заказа: {orderId}</p>
                <p className={clsx(styles.orderSpan)}>{orderPrice} р.</p>
            </div>
        </article>
    )
}