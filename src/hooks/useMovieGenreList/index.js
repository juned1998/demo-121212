import {
    useState,
    useEffect,
} from 'react';

export default function useMovieGenreList() {
    const [apiResponse, setApiResponse] = useState({
        data: null,
        status: 'idle'
    });
    useEffect(() => {
        getMovieGenreList();
    }, []);

    const getMovieGenreList = async () => {
        try {
            setApiResponse({
                ...apiResponse,
                status: 'pending'
            });
            const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d', {
                method: 'GET'
            });
            setApiResponse({
                data: await response.json(),
                status: 'resolved'
            });
        } catch (err) {
            setApiResponse({
                ...apiResponse,
                status: 'rejected'
            });
        }
    };

    const {
        genres = []
    } = apiResponse.status === 'resolved'? apiResponse.data: {};

    return {
        genres,
        apiResponse
    };

}