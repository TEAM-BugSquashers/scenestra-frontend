import classes from './ForYou.module.css';
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

import { Mousewheel, Pagination } from 'swiper/modules';
import MoviePopUp from "../components/moviePopUp/MoviePopUp.jsx";
import { Route, useNavigate } from "react-router-dom";
import { axiosRecommend, axiosTest } from "../api/axios.js";
import useMoviePopUp from "../hooks/useMoviePopUp.jsx";

const MovieSlide = ({ movieSrc, genre, isActive, currentMoviesData, onSelectMovie }) => {
    const movieRef = useRef(null);
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (movieRef.current) {
            const video = movieRef.current;

            if (isActive) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Video play failed:", error);
                    });
                }
            } else {
                video.pause();
            }
        }
    }, [isActive]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const contentStyle = {
        bottom: isHovered ? '110%' : '40%',
        transition: 'bottom 0.5s ease'
    };
    const noneBlock = {
        opacity: isHovered ? '0' : '1',
    }

    const handleContainerClick = () => {
        setIsHovered(false);
    }

    return (
        <div className={classes.movieContainer} onClick={handleContainerClick}>
            <video
                ref={movieRef}
                className={classes.backgroundMovie}
                loop
                muted
                playsInline
            >
                <source src={movieSrc} type="video/mp4" />
            </video>
            <div className={classes.bottomContainer}
                 onMouseEnter={handleMouseEnter}
                 onClick={(e) => e.stopPropagation()}
            >
                <div className={classes.mobile} style={noneBlock}>클릭하여 영화 목록 보기</div>
                <div className={classes.movieContent} style={contentStyle}>
                    <div className={classes.line1} />
                    <h1 className={classes.genreTitle}>{genre}</h1>
                    <div className={classes.line2} />
                </div>
                {isHovered && (
                    <div className={classes.topMovies}>
                        <div className={classes.postersContainer}>
                            {currentMoviesData && currentMoviesData.length > 0 ? (
                                currentMoviesData.slice(0, 7).map(movie => (
                                    <div
                                        key={movie.movieId}
                                        className={classes.posterItem}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSelectMovie(movie.movieId);
                                        }}
                                    >
                                        <img
                                            src={movie.posterUrl}
                                            alt={movie.title}
                                            className={classes.posterImage}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div>Loading movies...</div>
                            )}
                            <button
                                className={classes.allMovieShowBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate("/seeAllMoive");
                                }}
                            >
                                전체영화보기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

function ForYou() {
    const [moviesData, setMoviesData] = useState({
        bestMovies: [],
        genreMovies: [],
        newMovies: []
    });

    useEffect(() => {
        const fetchMoviesData = async () => {
            try {
                const response = await axiosRecommend();
                console.log("Recommend Movies: ", response.data);

                setMoviesData({
                    bestMovies: response.data.payload.bestMovies || [],
                    genreMovies: response.data.payload.genreMovies || [],
                    newMovies: response.data.payload.newMovies || []
                });

            } catch (error) {
                console.error("Error fetching movies: ", error);
            }
        };

        fetchMoviesData();
        axiosTest();
    }, []);

    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedMovieData, handleSelectMovie, handleClosePopUp] = useMoviePopUp();

    // 동적으로 movies 배열 생성
    const movies = React.useMemo(() => {
        const movieSlides = [];

        moviesData.genreMovies.forEach((genreData) => {
            movieSlides.push({
                id: genreData.genreId,
                url: genreData.videoUrl,
                genre: genreData.engName,
                genreId: genreData.genreId
            });
        });

        movieSlides.push({
            id: 'best',
            url: 'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/Bestinsideout.mp4',
            genre: 'BEST',
            type: 'best'
        });
        movieSlides.push({
            id: 'new',
            url: 'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/NewCatcintheMuseum.mp4',
            genre: 'NEW',
            type: 'new'
        });

        return movieSlides;
    }, [moviesData.genreMovies]);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    }

    const onSelectMovie = (movieId) => {
        const currentMovies = getCurrentMoviesData();
        const selectedMovie = currentMovies.find(movie => movie.movieId === movieId);

        if (selectedMovie) {
            // movieId를 포함한 객체로 전달
            const movieForPopup = {
                movieId: selectedMovie.movieId, // 이 부분 추가
                id: selectedMovie.movieId,
                title: selectedMovie.title,
                image: selectedMovie.posterUrl,
                showTime: selectedMovie.showTime,
                director: selectedMovie.director,
                openDate: selectedMovie.openDate,
                numAudience: selectedMovie.numAudience
            };
            handleSelectMovie(movieForPopup);
        }
    };
    const getCurrentMoviesData = () => {
        const currentSlide = movies[activeIndex];

        if (!currentSlide) return [];

        if (currentSlide.type === 'best') {
            return moviesData.bestMovies;
        } else if (currentSlide.type === 'new') {
            return moviesData.newMovies;
        } else if (currentSlide.genreId) {
            const genreData = moviesData.genreMovies.find(genre => genre.genreId === currentSlide.genreId);
            return genreData ? genreData.movies : [];
        }

        return [];
    };

    return (
        <>
            <div className={classes.backgroundPan}>
                <div className={classes.pageContainer}>
                    <MoviePopUp
                        movie={selectedMovieData}
                        onClose={handleClosePopUp}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <Swiper
                        direction={'vertical'}
                        slidesPerView={1}
                        spaceBetween={30}
                        mousewheel={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Mousewheel, Pagination]}
                        className={classes.forYouSwiper}
                        initialSlide={0}
                        onSlideChange={handleSlideChange}
                    >
                        {movies.map((movie, index) => (
                            <SwiperSlide key={movie.id} className={classes.forYouSlide}>
                                <MovieSlide
                                    movieSrc={movie.url}
                                    genre={movie.genre}
                                    isActive={index === activeIndex}
                                    currentMoviesData={getCurrentMoviesData()}
                                    onSelectMovie={onSelectMovie}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
}

export default ForYou;