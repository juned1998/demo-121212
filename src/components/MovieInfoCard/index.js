import { 
    useState,
    useRef,
 } from 'react';
import styles from './styles.module.scss';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
export default function MovieInfoCard({
    data
}) {
    const {
        poster_path,
        title,
        vote_average,
        genres,
        overview
    } = data;
    const [visible, setVisible] = useState(false);
    const cardRef = useRef(null);
    useIntersectionObserver(cardRef, {
        threshold: 0,
        rootMargin: '100px 0px 100px 0px',
    }, (entry) => setVisible(entry.isIntersecting));

    const shortDescription = overview.split('.')[0] + '.';
    return (
        <div 
        ref={cardRef} 
        className={styles.movieInfoCard}>
            {visible && 
            <>
            <img 
            alt={title}
            src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
            className={styles.movieInfoCard__img} />
            <div className={styles.movieInfoCard__details}>
                <h3>{title}</h3>
                <h4>{vote_average}</h4>
                <h4>{genres.map(genre => genre.name).join(', ')}</h4>
                <p>{shortDescription}</p>
            </div>
            </>}
        </div>
    )
}