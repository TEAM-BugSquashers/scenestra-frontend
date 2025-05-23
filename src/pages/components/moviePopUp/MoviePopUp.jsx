import classes from './MoviePopUp.module.css';
import React, {useEffect, useState} from 'react';
import {axiosBindMovie} from "../../api/axios.js";

function MoviePopUp({movie, onClose}) {
    const [movieData,setMovieData] = useState(null);

    useEffect(()=>{

        if (!movie) return;

        const combineMovie = async () => {
            try {
                const response = await axiosBindMovie(movie.movieId);
                setMovieData(response.data.payload);
            } catch (error) {
                console.error(error);
            }
        }

        combineMovie();
    },[movie])

    if(!movie) return null;

    return (
        <>
            <div className={classes.popUpPan} onClick={onClose}>
                <div className={classes.moviePopUp}>
                    <div className={classes.movieDetailImg}>
                        <img src={movieData?.posterUrl} alt={movieData?.title} />
                    </div>
                    <div className={classes.movieDetail}>
                        <div className={classes.popXBox} onClick={onClose}>
                            <div className={classes.xLeft}></div>
                            <div className={classes.xRight}></div>
                        </div>
                        <h2 className={`${classes["movieTitle"]} wTitle`}>{movieData?.title}</h2>
                        <div className={`${classes["releaseYear"]} body2 wSub`}>{movieData?.openDate}</div>
                        <div className={`${classes["movieDesc"]} body2`}>
                            감독: {movieData?.director}
                        </div>
                        <div className={`${classes["movieDesc"]} body2`}>
                            장르: {movieData?.numAudience}
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