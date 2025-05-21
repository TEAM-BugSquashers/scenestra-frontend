import classes from './MoviePopUp.module.css';
import React from 'react';

function MoviePopUp({movie, onClose}) {

    if(!movie) return null;

    return (
        <>
            <div className={classes.moviePopUp}>
                <div className={classes.movieDetailImg}>
                    <img src={movie.image} alt={movie.title} />
                </div>
                <div className={classes.movieDetail}>
                    <div className={classes.popXBox} onClick={onClose}>
                        <div className={classes.xLeft}></div>
                        <div className={classes.xRight}></div>
                    </div>
                    <h2 className={classes.movieTitle}>{movie.title}</h2>
                    <div className={classes.releaseYear}>{movie.releaseYear}</div>
                    <div>감독: {movie.director}</div>
                    <div>장르: {movie.genre}</div>
                    <div>상영시간: {movie.runtime}분</div>
                    <div className={classes.selectMovieBtn}>영화선택</div>
                </div>
            </div>
        </>
        );
}

export default MoviePopUp;