import styles from './styles.module.scss';
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

    const shortDescription = overview.split('.')[0] + '.';
    return (
        <div className={styles.movieInfoCard}>
            <img 
            alt=''
            src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
            className={styles.movieInfoCard__img} />
            <div className={styles.movieInfoCard__details}>
                <h3>{title}</h3>
                <h4>{vote_average}</h4>
                <h4>{genres.map(genre => genre.name).join(', ')}</h4>
                <p>{shortDescription}</p>
            </div>
        </div>
    )
}