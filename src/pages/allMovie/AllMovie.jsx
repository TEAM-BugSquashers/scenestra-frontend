import classes from './AllMovie.module.css';
import {useEffect, useState} from "react";
import {axiosGenreId} from "../api/axios.js";
import MoviePopUp from "../components/moviePopUp/MoviePopUp.jsx";
import useMoviePopUp from "../hooks/useMoviePopUp.jsx";
import {useParams} from "react-router-dom";

function AllMovie() {
    const [selectedMovieData, handleSelectMovie, handleClosePopUp] = useMoviePopUp();
    const [movieData, setMovieData] = useState([]);
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    // 영화 데이터 가져오기
    const fetchMovieData = async () => {
        if (!id) return;

        setLoading(true);
        try {
            console.log(`API 호출 시작 - 장르 ID: ${id}`);
            const response = await axiosGenreId(id, 1);
            console.log("API 응답:", response);

            const movies = response.data.payload;
            setMovieData(movies);

        } catch(error) {
            console.error("영화를 못가져옴", error);
        } finally {
            setLoading(false);
        }
    };

    // id가 변경되면 데이터 fetch
    useEffect(() => {
        fetchMovieData();
    }, [id]);

    return(
        <>
            {movieData.length > 0 && (
                <div className={classes.videoWrap}>
                    <video src={movieData[0].videoUrl} autoPlay loop muted playsInline>
                    </video>
                    <div className={classes.genreNameWrap}>
                        <div className={classes.leftLine}></div>
                        <div className={classes.genreName}>{movieData[0].engName}</div>
                        <div className={classes.rightLine}></div>
                    </div>
                </div>
            )}

            <div className={classes.wrap}>
                {movieData.map((genre) => (
                    genre.movies.map((movie) => (
                        <div
                            className={classes.movieArea}
                            key={movie.movieId}
                            style={{ backgroundImage: `url(${movie.posterUrl})` }}
                            onClick={() => handleSelectMovie(movie)}>
                        </div>
                    ))
                ))}
            </div>

            {loading && (
                <div className={classes.loading}>
                    영화를 불러오는 중...
                </div>
            )}

            <MoviePopUp movie={selectedMovieData} onClose={handleClosePopUp}/>
        </>
    );
}

export default AllMovie;