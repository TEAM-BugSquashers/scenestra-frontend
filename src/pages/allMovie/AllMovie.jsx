import classes from './AllMovie.module.css';
import {useEffect, useState, useCallback} from "react";
import {axiosGenreId} from "../api/axios.js";
import MoviePopUp from "../components/moviePopUp/MoviePopUp.jsx";
import useMoviePopUp from "../hooks/useMoviePopUp.jsx";
import {useParams} from "react-router-dom";

function AllMovie() {
    const [selectedMovieData, handleSelectMovie, handleClosePopUp] = useMoviePopUp();
    const [movieData, setMovieData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const {id} = useParams();

    // fetchMovieData를 useCallback으로 메모이제이션
    const fetchMovieData = useCallback(async (currentPage) => {
        if (loading) return;

        setLoading(true);
        try {
            console.log(`API 호출 시작 - 페이지: ${currentPage}`);
            const response = await axiosGenreId(id, currentPage);
            console.log("API 응답:", response);

            const newMovies = response.data.payload;

            if (newMovies.length === 0) {
                setHasMore(false);
                setLoading(false);
                return;
            }

            if (newMovies.length < 10) {
                setHasMore(false);
            }

            if (currentPage === 1) {
                setMovieData(newMovies);
            } else {
                setMovieData(prev => [...prev, ...newMovies]);
            }

        } catch(error) {
            console.error("영화를 못가져옴", error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [id, loading]);

    // 스크롤 이벤트 핸들러
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop
                >= document.documentElement.offsetHeight - 100) {
                if (!loading && hasMore) {
                    setPage(prevPage => prevPage + 1);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore, setPage]);

    // 페이지 변경시 데이터 fetch
    useEffect(() => {
        if (id === undefined) return;
        fetchMovieData(page);
    }, [id, page, fetchMovieData]);

    // id가 변경되면 리셋
    useEffect(() => {
        if (id === undefined) return;

        setMovieData([]);
        setHasMore(true);
        setLoading(false);
        setPage(1);
        fetchMovieData(1); // 직접 호출
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

            {!hasMore && !loading && (
                <div className={classes.noMore}>
                    모든 영화를 불러왔습니다.
                </div>
            )}

            <MoviePopUp movie={selectedMovieData} onClose={handleClosePopUp}/>
        </>
    );
}

export default AllMovie;