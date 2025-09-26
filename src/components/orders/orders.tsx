import styles from './orders.module.css';
import clsx from "clsx";

import { useEffect, useState } from "react";
import type {TError, TOrder, TOrders} from "../../utilities/types.ts";
import { getOrders } from "../../utilities/api.ts";
import { getToken, isCurrentTokenExpired } from "../../utilities/token.ts";
import { Order } from "../../ui/order";

export const Orders = () => {
    const [orders, setOrders] = useState<TOrder[]>([]);
    const ordersComponents = orders.map(order => {
        return <Order productsId={order.products} orderPrice={order.order_price} orderId={order.id} key={order.id}/>
    })

    useEffect(() => {
        updateOrders();
    }, [])

    const updateOrders = () => {
        if(!isCurrentTokenExpired()) {
            const token = getToken()!.value;
            getOrders(token)
                .then(response => {
                    if(response.ok) return response.json();
                    else throw response;
                })
                .then((data: TOrders) => {
                    setOrders(data.data)
                })
                .catch((error: TError) => {
                    console.error(`${error.code}: ${error.message}`);
                })

        }
    }

    return (
        orders.length ? (
            <div className={clsx(styles.catalog)}>
                {ordersComponents}
            </div>
        ) : <p className={clsx(styles.catalogSpan)}>Нету оформленных заказов</p>
    )
};