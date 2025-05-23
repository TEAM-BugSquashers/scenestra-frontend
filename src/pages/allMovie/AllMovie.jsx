import classes from './AllMovie.module.css';
import {useEffect, useState} from "react";
import {axiosGenreId} from "../api/axios.js";
import MoviePopUp from "../components/moviePopUp/MoviePopUp.jsx";
import useMoviePopUp from "../hooks/useMoviePopUp.jsx";
import {useParams} from "react-router-dom";

function AllMovie() {
    const [selectedMovieData,handleSelectMovie, handleClosePopUp ] = useMoviePopUp();
    const [movieData, setMovieData] = useState([]);
    const {id} = useParams();

    useEffect(() => {

        if(id === null) return;
        const fetchMovieData = async () => {
            try{
                console.log("API 호출 시작");
                const response = await axiosGenreId(id);
                console.log("API 응답:", response); // 추가
                console.log("영화 데이터:", response.data.payload);
                setMovieData(response.data.payload);
            }catch(error){
                console.error("영화를 못가져옴");
                if(error.response) {
                    console.error("HTTP 상태 코드:", error.response.status);
                    console.error("서버 응답 데이터:", error.response.data);
                }
            }
        }

        fetchMovieData();
    },[id])

    return(

        <>
            <div className={classes.wrap}>
                {movieData.map((movie) => (
                        <div className={classes.movieArea}
                             key={movie.movieId}
                             style={{ backgroundImage: `url(${movie.posterUrl})` }}
                             onClick={() => handleSelectMovie(movie)}>
                        </div>
                    ))}

            </div>
            <MoviePopUp movie={selectedMovieData}
                        onClose={handleClosePopUp}/>
        </>
    );
}
export default AllMovie;