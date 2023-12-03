import {
    useEffect,
    useState,
    useReducer,
} from 'react';

const actionTypes = {
    SET_WITH_GENRES : 'SET_WITH_GENRES',
    SET_YEAR: 'SET_YEAR',
};

const paramsReducer = (state, action) => {
    switch(action.type) {
        case actionTypes.SET_YEAR: 
            return {
                ...state,
                primary_release_year: action.payload.primary_release_year,
            };
        case actionTypes.SET_WITH_GENRES:
            return {
                ...state,
                with_genres: action.payload.with_genres,
            };
        default:
            return state
    }
}

export default function useDiscoverMovie() {
    const [params, paramsDisptach] = useReducer(paramsReducer, {
        with_genres: [],
    })
    const [apiResponse, setApiResponse] = useState({
        data: null,
        status: 'idle'
    });
    const [fetchPreviousYearMoviesResponse, setFetchPreviousYearMoviesResponse] = useState({
        data: null,
        status: 'idle'
    });
    const [fetchNextYearMoviesResponse, setFetchNextYearMoviesResponse] = useState({
        data: null,
        status: 'idle'
    });
    const [moviesByYearList, setMoviesByYearList] = useState([]);

    useEffect(() => {
        // debounced function call for filters
        const getMoviesTimeout = setTimeout(() => getMovies({
            setApiResponse,
            year: 2012,
            processMoviesByYearList: (results) => setMoviesByYearList((currentList) => currentList.concat({
                year: 2012,
                results
            }))
        }), 1000);
        return () => clearTimeout(getMoviesTimeout);
    }, [params]);

    const fetchNextYearMovies = () => {
        if(
            fetchNextYearMoviesResponse.status === 'pending' || 
            apiResponse.status === 'pending' || 
            fetchPreviousYearMoviesResponse.status === 'pending' || 
            moviesByYearList.length === 0) {
            return
        }
        const nextYear = moviesByYearList.length > 0? moviesByYearList[moviesByYearList.length - 1].year + 1: 2012;
        const currentYear = new Date().getFullYear();
        if(nextYear > currentYear) {
            return
        }
        getMovies({
            setApiResponse: setFetchNextYearMoviesResponse,
            year: nextYear,
            processMoviesByYearList: (results) => {
                setMoviesByYearList((currentList) => currentList.concat({
                    year: nextYear,
                    results
                }))
            }
        });
    };
    const fetchPreviousYearMovies = () => {
        if(
            fetchPreviousYearMoviesResponse.status === 'pending' || 
            apiResponse.status === 'pending' || 
            fetchNextYearMoviesResponse.status === 'pending' || 
            moviesByYearList.length === 0) {
            return
        }
        const previousYear = moviesByYearList.length > 0? moviesByYearList[0].year - 1: 2012;
        getMovies({
            setApiResponse: setFetchPreviousYearMoviesResponse,
            year: previousYear,
            processMoviesByYearList: (results) => {
                setMoviesByYearList((currentList) => {
                    const newArr = currentList.slice();
                    newArr.unshift({
                        year: previousYear,
                        results
                    });
                    return newArr;
                });
            }
        });
    };


    const getMovies = async ({
        setApiResponse,
        year,
        processMoviesByYearList
    }) => {
        try {
            setApiResponse({
                ...apiResponse,
                status: 'pending'
            });

            const response = await fetch(
            "https://api.themoviedb.org/3/discover/movie?" + 
            "api_key=2dca580c2a14b55200e784d157207b4d&" + 
            "sort_by=popularity.desc&" +
            `primary_release_year=${year}&` + 
            "page=1&" + 
            "vote_count.gte=100" + 
            `&with_genres=${params.with_genres.map(g => g.name).join('|')}`, 
            {
                method: 'GET'
            });
            const responseData = await response.json();
            setApiResponse({
                data: responseData,
                status: 'resolved'
            });
            processMoviesByYearList(responseData.results)
        } catch (err) {
            setApiResponse({
                ...apiResponse,
                status: 'rejected'
            });
        }
    };

    const handleSelectGenres = (selectedGenres = []) => {
        paramsDisptach({
            type: actionTypes.SET_WITH_GENRES,
            payload: {
                with_genres: selectedGenres,
            }
        });
        setMoviesByYearList([]);
    };

    return {
        moviesByYearList,
        apiResponse,
        fetchNextYearMoviesResponse,
        fetchPreviousYearMoviesResponse,
        fetchNextYearMovies,
        fetchPreviousYearMovies,
        paramsDisptach,
        params,
        handleSelectGenres
    }
}