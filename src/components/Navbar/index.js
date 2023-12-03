import styles from './styles.module.scss';
import movieFixLogo from './../../moviefix.svg';
import Pill from '../Pill';

export default function Navbar({
    genres,
    genresLoadingStatus,
    selectedGenres,
    onSelectGenre
}) {
    return (
        <nav className={styles.nav}>
            <div className={styles.nav__brand}>
                <img 
                alt='Moviefix'
                src={movieFixLogo} />
            </div>
            {genresLoadingStatus === 'resolved' &&
            <div className={styles.nav__genreFilter}>
                <Pill 
                label='All'
                isActive={selectedGenres.length === 0 || genres.length === selectedGenres.length}
                onClick={() => onSelectGenre([])}
                />
                {genres.map(genre => {
                    const isActive = selectedGenres.filter(sG => sG.id === genre.id).length > 0;
                    return (
                        <Pill 
                        isActive={isActive}
                        onClick={
                            () => 
                            isActive? 
                            onSelectGenre(selectedGenres.filter(sg => sg.id !== genre.id)): 
                            onSelectGenre(selectedGenres.concat(genre))
                        }
                        key={genre.id}
                        label={genre.name}/>
                    )
                })}
            </div>}
        </nav>
    )
}
