import classes from './AllMovie.module.css';
import {useEffect, useState} from "react";
import {axiosGenreId} from "../api/axios.js";
import MoviePopUp from "../components/moviePopUp/MoviePopUp.jsx";
import useMoviePopUp from "../hooks/useMoviePopUp.jsx";

function AllMovie() {
    const [selectedMovieData,handleSelectMovie, handleClosePopUp ] = useMoviePopUp();
    const [movieData, setMovieData] = useState([]);
    //
    // useEffect(() => {
    //     const fetchMovieData = async () => {
    //         try{
    //             console.log("API 호출 시작");
    //             const response = await axiosGenreId(1);
    //             console.log("API 응답:", response); // 추가
    //             console.log("영화 데이터:", response.data.payload);
    //             setMovieData(response.data.payload);
    //         }catch{
    //             console.error("영화를 못가져옴");
    //         }
    //     }
    //
    //     fetchMovieData();
    // },[])
    useEffect(() => {
        const fetchMovieData = async () => {
            try{
                console.log("API 호출 시작");
                const response = await axiosGenreId(4);
                console.log("API 응답:", response);
                if (response.data && response.data.isSuccess && response.data.payload) {
                    setMovieData(response.data.payload);
                } else {
                    console.error("유효하지 않은 데이터입니다:", response.data);
                    // 에러 상태 처리도 추가 가능
                }

            }catch(error){
                console.error("전체 에러 객체:", error);
                console.error("에러 메시지:", error.message);
                console.error("에러 응답:", error.response);

                if(error.response) {
                    console.error("HTTP 상태 코드:", error.response.status);
                    console.error("서버 응답 데이터:", error.response.data);
                }

                // 네트워크 에러인지 확인
                if(error.code === 'ERR_NETWORK') {
                    console.error("네트워크 에러: 서버가 실행되지 않았을 수 있습니다");
                }
            }
        }

        fetchMovieData();
    },[])
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