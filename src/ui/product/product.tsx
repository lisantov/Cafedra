import clsx from "clsx";
import styles from './product.module.css';

import preloadImage from '../../assets/preload.png';
import type {ReactNode} from "react";

interface ProductProps {
    productImageUrl?: string;
    productTitle: string;
    productDescription: string;
    productPrice: number;
    children?: ReactNode;
}

export const Product = ({
    productImageUrl = preloadImage,
    productTitle,
    productDescription,
    productPrice,
    children
}: ProductProps) => {
    return (
        <article className={clsx(styles.product)}>
            <div style={{ backgroundImage: `url(${productImageUrl})` }} className={clsx(styles.productImage)} />
            <div className={clsx(styles.productTitleContainer)}>
                <span className={clsx(styles.productPrice)}>{productPrice} р.</span>
                <h2 className={clsx(styles.productTitle)}>{productTitle}</h2>
                <p className={clsx(styles.productDescription)}>{productDescription}</p>
            </div>
            {children}
        </article>
    )
}