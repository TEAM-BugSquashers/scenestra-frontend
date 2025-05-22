import classes from './ForYou.module.css';
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

import { Mousewheel, Pagination } from 'swiper/modules';
import MoviePopUp from "../components/moviePopUp/MoviePopUp.jsx";
import {Route, useNavigate} from "react-router-dom";
import {axiosTest} from "../api/axios.js";
import useMoviePopUp from "../hooks/useMoviePopUp.jsx";

const MovieSlide = ({movieSrc, genre, isActive, topPostData, onSelectMovie}) => {
    const movieRef = useRef(null);
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if(movieRef.current) {
            if(isActive) {
                movieRef.current.play();
            }
            else {
                movieRef.current.pause();
            }
        }
    }, [isActive]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }
    const contentStyle = {
        bottom: isHovered ? '115%' : '40%',
        transition: 'bottom 0.5s ease'
    };
    const handleContainerClick = () => {
        setIsHovered(false);
    }
    return (
        <div className={classes.movieContainer}
            onClick={handleContainerClick}
        >
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
                <div className={classes.movieContent} style={contentStyle}>
                    <div className={classes.line1} />
                    <h2 className={classes.genreTitle}>{genre}</h2>
                    <div className={classes.line2} />
                </div>
                {isHovered && (
                    <div className={classes.topMovies}>
                        <div className={classes.postersContainer}>
                            {topPostData.map(poster => (
                                <div
                                    key={poster.id}
                                    className={classes.posterItem}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectMovie(poster.id);
                                    }}
                                >
                                    <img
                                        src={poster.image}
                                        alt={poster.title}
                                        className={classes.posterImage}
                                    />
                                </div>
                            ))}
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

function ForYou(){
    const [activeIndex, setActiveIndex ] = useState(0);
    const [selectedMovieData, handleSelectMovie, handleClosePopUp ] = useMoviePopUp();
    useEffect(() => {
        axiosTest()
    }, []);

    const movies = [
        {id: 1, url: 'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/WarNapoleon.mp4', genre: 'WAR' },
        {id: 2, url: 'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/CrimeNightmare+Alley.mp4', genre: 'CRIME' },
        {id: 3, url: 'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/FantasyTheLordOfTheRings.mp4', genre: 'FANTASY' },
        {id: 4, url:'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/WarNapoleon.mp4', genre: 'BEST'},
        {id: 5, url:'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/CrimeNightmare+Alley.mp4', genre: 'NEW' }
    ];
    const topPostData = [
        {
            id: 1,
            image: '/posterimage/더랍스터.jpg',
            title:'더랍스터',
            director: '감독이름',
            genre: '장르',
            runtime: '상영시간',
            releaseYear: '개봉연도'
        },
        {
            id: 2,
            image: '/posterimage/엑시트.jpg',
            title:'엑시트',
            director: '감독이름',
            genre: '장르',
            runtime: '상영시간',
            releaseYear: '개봉연도'
        },
        {
            id: 3,
            image: '/posterimage/파묘.jpg',
            title:'파묘',
            director: '감독이름',
            genre: '장르',
            runtime: '상영시간',
            releaseYear: '개봉연도'
        },
        {
            id: 4,
            image: '/posterimage/CallMeByYourName.jpg',
            title:'CallMeByYourName',
            director: '감독이름',
            genre: '장르',
            runtime: '상영시간',
            releaseYear: '개봉연도'
        },
        {
            id: 5,
            image: '/posterimage/하얼빈.jpg',
            title:'하얼빈',
            director: '감독이름',
            genre: '장르',
            runtime: '상영시간',
            releaseYear: '개봉연도'
        }
    ]

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    }
    const onSelectMovie = (movieId) => {
        const selectedMovie = topPostData.find(movie => movie.id === movieId);
        handleSelectMovie(selectedMovie);
    };

    return (
        <>
            <div className={classes.backgroundPan}>
                <div className={classes.pageContainer}>
                    <MoviePopUp
                        movie={selectedMovieData}
                        onClose={handleClosePopUp}
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
                                    topPostData={topPostData}
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