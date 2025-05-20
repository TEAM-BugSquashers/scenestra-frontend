import classes from './MoviePopUp.module.css';
import React from 'react';

function MoviePopUp({movieData, selectedId}) {

    if(!selectedId) return null;

    const selectedMovie = movieData.find(movie => movie.id === selectedId);

    if(!selectedMovie) return null;

    return (
        <>
            <div className={classes.moviePopUp}>
                <div className={classes.movieDetailImg}>
                    <img src={selectedMovie.image} alt={selectedMovie.title} />
                </div>
                <div className={classes.movieDetail}>
                    <div className={classes.movieDetailTitle}>
                        <h2>{selectedMovie.title}</h2>

                    </div>
                    <div className={classes.movieDetailDesc}>
                    </div>
                </div>
            </div>
        </>
        );
}

export default MoviePopUp;