import React, {useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import useMoviePopUp from "../hooks/useMoviePopUp.jsx";
import MoviePopUp from "../components/moviePopUp/MoviePopUp.jsx";
import {axiosSearchMovies} from "../api/axios.js";
import Loading from "../components/loading/Loading.jsx";
import importClasses from './SearchResult.module.css';

function SearchResult() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState([]);
    const [selectedMovieData, handleSelectMovie, handleClosePopUp] = useMoviePopUp();

    const [isLoading , setIsLoading] = useState(false);


    useEffect(() => {
        if (query) {
            setIsLoading(true);
            axiosSearchMovies(query)
                .then(res => {
                        setResults(res.data.payload)
                        setIsLoading(false);
                        console.log(res.data.payload);
                    }
                )
                .catch(err => console.log(err));
        }
    }, [query]);

    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            <div  className={importClasses.query}>"{query}"에 대한 검색결과</div>
            <div className={importClasses.wrap}>
                {results.length === 0 ? (
                    <div className={importClasses.noResult}>"{query}"에 대한 검색 결과가 없습니다</div>
                ) : (
                    results.map((movie) => (
                        <div
                            className={importClasses.movieArea}
                            key={movie.movieId}
                            style={{ backgroundImage: `url(${movie.posterUrl})` }}
                            onClick={() => handleSelectMovie(movie)}>
                        </div>
                    ))
                )}
            </div>

            <MoviePopUp movie={selectedMovieData} onClose={handleClosePopUp}/>
        </>
    );
}
export default SearchResult;