import styles from './styles.module.scss';

export default function Pill({
    onClick = () => {},
    label = '',
    isActive = false,
}) {
    return (
        <button 
        className={`${styles.pill} ${isActive? styles.active: ''}`}
        onClick={onClick}>
            {label}
        </button>
    )
}