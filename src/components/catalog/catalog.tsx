import styles from './catalog.module.css';

import type { ReactNode } from "react";

interface HeaderProps {
    children: ReactNode;
}

export const Catalog = ({
    children
}: HeaderProps) => {
    return (
        <div className={styles.catalog}>
            {children}
        </div>
    )
};