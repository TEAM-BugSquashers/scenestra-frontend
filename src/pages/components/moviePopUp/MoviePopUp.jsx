import classes from './MoviePopUp.module.css';
import React, {useEffect, useState} from 'react';
import {axiosBindMovie} from "../../api/axios.js";

function MoviePopUp({movie, onClose}) {
    const [movieData,setMovieData] = useState(null);

    useEffect(() => {
        if (!movie || !movie.movieId) {
            setMovieData(null); // 영화가 없으면 데이터도 초기화
            return;
        }

        // 새로운 영화가 선택되면 기존 데이터 즉시 초기화
        setMovieData(null);

        const combineMovie = async () => {
            try {
                const response = await axiosBindMovie(movie.movieId);
                setMovieData(response.data.payload);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        }

        combineMovie();
    }, [movie]);

    if(!movie) return null;

    return (
        <>
            <div className={classes.popUpPan} onClick={onClose}
                    onClick={(e) => e.stopPropagation()}
            >
                <div className={classes.moviePopUp}>
                    <div className={classes.movieDetailImg}>
                        <img src={movieData?.posterUrl} alt={movieData?.title} />
                    </div>
                    <div className={classes.movieDetail}>
                        <div className={classes.popXBox} onClick={onClose}>
                            <div className={classes.xLeft}></div>
                            <div className={classes.xRight}></div>
                        </div>
                        <div className={classes.titleBox}>
                            <div className={classes.cBox}></div>
                        <h1 className={`${classes["movieTitle"]} wTitle`}>{movieData?.title}</h1>
                        </div>
                        <div className={`${classes["releaseYear"]} body2 wSub`}>개봉: {movieData?.openDate.slice(0,4)}년</div>
                        <div className={`${classes["movieDesc"]} body2`}>
                            감독: {movieData?.director}
                        </div>
                        <div className={`${classes["movieDesc"]} body2`}>
                            장르: {Array.isArray(movieData?.genreNames)
                            ? movieData.genreNames.join(', ')
                            : movieData?.genreNames}
                        </div>
                        <div className={`${classes["movieDesc"]} body2`}>
                            상영시간: {movieData?.showTime}분
                        </div>
                        <div className={`${classes["selectMovieBtn"]} btn2`}>영화선택</div>
                    </div>
                </div>
            </div>
        </>
        );
}

export default MoviePopUp;