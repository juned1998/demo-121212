import MoviesGroup from "./components/MoviesGroup";
import Navbar from "./components/Navbar";
import useDiscoverMovie from "./hooks/useDiscoverMovie";
import styles from './styles.module.scss';
import useMovieGenreList from './hooks/useMovieGenreList';
import { useEffect, useLayoutEffect, useRef } from "react";
import useIntersectionObserver from "./hooks/useIntersectionObserver";

function App() {

  const {
    moviesByYearList = [],
    fetchNextYearMovies,
    fetchNextYearMoviesResponse,
    fetchPreviousYearMovies,
    fetchPreviousYearMoviesResponse,
    params,
    handleSelectGenres
  } = useDiscoverMovie();
  const movieGenreList = useMovieGenreList();
  const observerTopTarget = useRef(null);
  const observerBottomTarget = useRef(null);

  useIntersectionObserver(observerTopTarget, { 
    threshold: 0, 
    rootMargin: '0px 0px 100px 0px',
  }, (entry) => entry.isIntersecting && fetchPreviousYearMovies());

  useIntersectionObserver(observerBottomTarget, { 
    threshold: 0, 
    rootMargin: '100px 0px 0px 0px',
  }, (entry) => entry.isIntersecting && fetchNextYearMovies());



  useLayoutEffect(() => {
    if(fetchPreviousYearMoviesResponse.status === 'resolved') {
      const sections = document.getElementsByTagName('section');
      if(sections.length > 1) {
        const style = window.getComputedStyle(sections[0]) || sections[0].currentStyle;
        const verticalMargins = parseFloat(style.marginTop.replace('px', '')) + parseFloat(style.marginBottom.replace('px', ''));
        window.scrollTo({
          top: (sections[0].offsetHeight + verticalMargins) + window.scrollY
        })
      }
    }
  }, [fetchPreviousYearMoviesResponse])

  return (
    <>
      <Navbar 
      onSelectGenre={handleSelectGenres}
      selectedGenres={params.with_genres}
      genres={movieGenreList.genres}
      genresLoadingStatus={movieGenreList.apiResponse.status}
      />
      <main
      className={styles.container}>
        <div ref={observerTopTarget}>
        {fetchPreviousYearMoviesResponse.status === 'pending' && <h2>Loading</h2>}
        </div>
        {moviesByYearList.map(data => {
          return (
            <MoviesGroup 
            genres={movieGenreList.genres}
            key={data.year}
            moviesForTheYear={data}
            />
          )
        })}
        <div ref={observerBottomTarget}>
        {fetchNextYearMoviesResponse.status === 'pending' && <h2>Loading</h2>}
        </div>
      </main>
    </>
  );
}

export default App;
