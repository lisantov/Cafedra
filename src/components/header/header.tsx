import clsx from "clsx";
import type { ReactNode } from "react";

import styles from './header.module.css';


interface HeaderProps {
    logo?: ReactNode;
    children?: ReactNode;
}

export const Header = ({
    children,
    logo
}: HeaderProps) => {
    return (
        <header className={clsx(styles.header)}>
            {logo}
            <nav className={clsx(styles.content)}>
                {children}
            </nav>
        </header>
    )
};