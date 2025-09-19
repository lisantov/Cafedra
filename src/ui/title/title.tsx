import styles from './title.module.css';
import type {ReactNode} from "react";

interface  TitleProps {
    children?: ReactNode;
}

export const Title = ({
    children
}: TitleProps) => {
    return <h2 className={styles.title}>{children}</h2>;
}