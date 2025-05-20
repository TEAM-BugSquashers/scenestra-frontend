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
                    <div className={classes.movieDetailTitle}>
                        <h2 className={classes.movieTitle}>{movie.title}</h2>
                        <p className={classes.releaseYear}>{movie.releaseYear}</p>
                    </div>
                    <div>
                        <p>감독: {movie.director}</p>
                        <p>장르: {movie.genre}</p>
                        <p>상영시간: {movie.runtime}분</p>
                    </div>
                </div>
            </div>
        </>
        );
}

export default MoviePopUp;