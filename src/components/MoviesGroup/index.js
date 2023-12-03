import { useEffect, useRef, useState } from "react";
import MovieInfoCard from "../MovieInfoCard";
import styles from './styles.module.scss';
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
export default function MoviesGroup({
    moviesForTheYear,
    genres,
}) {
    // const [visible, setVisible] = useState(true);
    const sectionRef = useRef(null);
    // useIntersectionObserver(sectionRef, {
    //     threshold: 0,
    //     rootMargin: '500px 0px 500px 0px',
    // }, (entry) => setVisible(entry.isIntersecting));

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
        ref={sectionRef}
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