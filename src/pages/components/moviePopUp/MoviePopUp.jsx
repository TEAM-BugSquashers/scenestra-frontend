import classes from './MoviePopUp.module.css';
import React from 'react';

function MoviePopUp({movie, onClose}) {

    if(!movie) return null;

    return (
        <>
            <div className={classes.popUpPan} onClick={onClose}
                    onClick={(e) => e.stopPropagation()}
            >
                <div className={classes.moviePopUp}>
                    <div className={classes.movieDetailImg}>
                        <img src={movie.image} alt={movie.title} />
                    </div>
                    <div className={classes.movieDetail}>
                        <div className={classes.popXBox} onClick={onClose}>
                            <div className={classes.xLeft}></div>
                            <div className={classes.xRight}></div>
                        </div>
                        <div className={classes.titleBox}>
                            <div className={classes.cBox}></div>
                            <h1 className={`${classes["movieTitle"]} wTitle`}>{movie.title}</h1>
                        </div>
                        <div className={`${classes["releaseYear"]} subTitle `}>{movie.releaseYear}</div>
                        <div className={`${classes["movieDesc"]} body2`}>
                            감독: {movie.director}
                        </div>
                        <div className={`${classes["movieDesc"]} body2`}>
                            장르: {movie.genre}
                        </div>
                        <div className={`${classes["movieDesc"]} body2`}>
                            상영시간: {movie.runtime}분
                        </div>
                        <div className={`${classes["selectMovieBtn"]} btn2`}>영화선택</div>
                    </div>
                </div>
            </div>
        </>
        );
}

export default MoviePopUp;