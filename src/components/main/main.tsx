import styles from './main.module.css';

import type { ReactNode } from "react";

interface HeaderProps {
    children: ReactNode;
}

export const Main = ({
    children
}: HeaderProps) => {
    return (
        <main className={styles.main}>
            {children}
        </main>
    )
};