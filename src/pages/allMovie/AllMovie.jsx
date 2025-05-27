import classes from './AllMovie.module.css';
import {useEffect, useState} from "react";
import {axiosGenreId} from "../api/axios.js";
import MoviePopUp from "../components/moviePopUp/MoviePopUp.jsx";
import useMoviePopUp from "../hooks/useMoviePopUp.jsx";
import {useParams} from "react-router-dom";

function AllMovie() {
    const [selectedMovieData, handleSelectMovie, handleClosePopUp] = useMoviePopUp();
    const [movieData, setMovieData] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        if(id === undefined) return; // null 대신 undefined 체크

        const fetchMovieData = async () => {
            try{
                console.log("API 호출 시작");
                const response = await axiosGenreId(id);
                console.log("API 응답:", response);
                console.log("영화 데이터:", response.data.payload);
                setMovieData(response.data.payload);
            }catch(error){
                console.error("영화를 못가져옴", error);
                if(error.response) {
                    console.error("HTTP 상태 코드:", error.response.status);
                    console.error("서버 응답 데이터:", error.response.data);
                }
            }
        }

        fetchMovieData();
    }, [id])

    return(
        <>
            <div className={classes.wrap}>
                {movieData.map((genre) => (
                    // 각 장르별로 영화들을 렌더링
                    genre.movies.map((movie) => (
                        <div className={classes.movieArea}
                             key={movie.movieId} // 영화의 고유 ID 사용
                             style={{ backgroundImage: `url(${movie.posterUrl})` }}
                             onClick={() => handleSelectMovie(movie)}>
                            {/* 영화 제목이나 다른 정보를 표시하고 싶다면: */}
                            {/* <div className={classes.movieTitle}>{movie.title}</div> */}
                        </div>
                    ))
                ))}
            </div>
            <MoviePopUp movie={selectedMovieData}
                        onClose={handleClosePopUp}/>
        </>
    );
}

export default AllMovie;