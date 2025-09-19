import styles from './logo.module.css';
import logo from '../../assets/logo_accent.png';

interface LogoProps {
    onClick?: () => void;
}

export const Logo = ({
    onClick
}: LogoProps) => {
    return <img src={logo} className={styles.logo} alt="Логотип лучшей компании" onClick={onClick}/>;
}