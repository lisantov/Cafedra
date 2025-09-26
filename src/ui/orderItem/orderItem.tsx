import clsx from "clsx";
import styles from './orderItem.module.css';

interface ProductProps {
    productsTitle: string;
    productsAmount: number;
}

export const OrderItem = ({
    productsTitle,
    productsAmount,
}: ProductProps) => {


    return (
        <div className={clsx(styles.orderItem)}>
            <p>{productsTitle}</p>
            <span>x{productsAmount}</span>
        </div>
    )
}