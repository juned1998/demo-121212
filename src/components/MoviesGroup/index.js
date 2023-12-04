import MovieInfoCard from "../MovieInfoCard";
import styles from './styles.module.scss';
export default function MoviesGroup({
    moviesForTheYear,
    genres,
}) {
    const {
        year,
        results = []
    } = moviesForTheYear;
    
    const resultsWithGenres = results.map(movie => {
        movie.genres = genres.filter(genre => movie.genre_ids.includes(genre.id));
        return movie;
    });

    return (
        <section 
        className={styles.moviesGroup}>
            <h2>{year}</h2>
            {resultsWithGenres.length > 0?
            <div className={styles.moviesGroup__moviesContainer}>
                {resultsWithGenres.map(movie => {
                    return (
                        <MovieInfoCard 
                        key={movie.id}
                        data={movie}
                        />
                    )
                })}
            </div>:
            <div className={styles.moviesGroup__empty}>
                <h2>No Movies</h2>
            </div>}
        </section>
    )
}