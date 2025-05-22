import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaHome, FaSearch, FaPlay, FaUserAlt } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import classes from './SeeAllMovie.module.css';
import { useState } from 'react';
import useMoviePopUp from "../hooks/useMoviePopUp.jsx";
import MoviePopUp from "../components/moviePopUp/MoviePopUp.jsx";

const categories = [
    {
    id: 1,
    title: "좋아 보의 취향저격 베스트 콘텐츠",
    movies: [
        { id: 1, title: "쥬라기월드", image: "https://image.tmdb.org/t/p/w500/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 2, title: "캐롤", image: "https://image.tmdb.org/t/p/w500/wbmxnsv41vsg5UEaNDlf203dOWw.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 3, title: "스핏파이어", image: "https://image.tmdb.org/t/p/w500/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 4, title: "애나벨", image: "https://image.tmdb.org/t/p/w500/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 5, title: "그녀의 이름을 불러줘", image: "https://image.tmdb.org/t/p/w500/v3Mo77Qjp6pctpD4eJaNT6kFRSB.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 6, title: "패이노원", image: "https://image.tmdb.org/t/p/w500/oHqmSc7J9w4ZhoXyoSrpYWoxSTr.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 7, title: "스타트", image: "https://image.tmdb.org/t/p/w500/ms9rj78yE6tPfj21orC3Dw7VZq6.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 }
    ]
    },
    {
    id: 2,
    title: "놓아보기 추천 시리즈",
    movies: [
        { id: 1, title: "지형의 세계", image: "https://m.media-amazon.com/images/M/MV5BNzVjOWEwYjEtNDJhOC00YjUyLThjMWItMDQwZGY1ODM4YzI3XkEyXkFqcGc@._V1_SX300.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 2, title: "부부의 세계", image: "https://image.tmdb.org/t/p/w500/stBfbqMabmJRvPTmecy65CTdeXh.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 3, title: "미스터", image: "https://image.tmdb.org/t/p/w500/2mU8qUbYKlHBdmDDbCmKLuqXd1m.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 4, title: "스위트", image: "https://image.tmdb.org/t/p/w500/8PmxsTT77KBlmT3OWyf3Q09yBOy.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 5, title: "애니유", image: "https://image.tmdb.org/t/p/w500/l4WXg5oQPK6GVlISKQNIUGb8rKJ.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 6, title: "하이에나", image: "https://image.tmdb.org/t/p/w500/taEVBdVSqYo9YeN3ycw2SosklZL.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 7, title: "그녀의 이름을 불러줘", image: "https://image.tmdb.org/t/p/w500/o6DNV9PiMeF1a9kCgNb3HMFgk9h.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 }
    ]
    },
    {
    id: 3,
    title: "가족이 함께 보는 시리즈",
    movies: [
        { id: 1, title: "정글", image: "https://image.tmdb.org/t/p/w500/5fwJNsGi0nolXIXTaaccUPqX84y.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 2, title: "동물원", image: "https://image.tmdb.org/t/p/w500/2grhfMw97MGbat6aH4lFSUnVDFE.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 3, title: "사파리", image: "https://image.tmdb.org/t/p/w500/hJ1XNmBbNQtlcK61xZfpCAA0qCY.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 4, title: "뽀로로", image: "https://m.media-amazon.com/images/M/MV5BMmJlZTkzOWMtYjBmMi00MWY2LTg0YTUtNGUzZjI0MzgxYTY4XkEyXkFqcGc@._V1_SX300.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 5, title: "기차", image: "https://image.tmdb.org/t/p/w500/gmaECzWTfgBl4bbN9i7TXQ2gwte.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 6, title: "파파야", image: "https://image.tmdb.org/t/p/w500/qDWA7fB4cZ4sBP6YgwlxvraDHi7.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 },
        { id: 7, title: "바다", image: "https://image.tmdb.org/t/p/w500/fbGCmMp0HlYnAPv28GOENPShezM.jpg",releaseYear: 2015, director: "콜린 트레보로우", genre: "액션, 어드벤처", runtime: 124 }
    ]
    }
];

function SeeAllMovie() {
    const [selectedMovieData,handleSelectMovie, handleClosePopUp ] = useMoviePopUp();

    const [searchTerm, setSearchTerm] = useState('');


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>

            <div className={classes["netflix_app"]}>
                {/* 검색바 */}
                <div className={classes["search_container"]}>
                    <div className={classes["search_bar"]}>
                        <input
                            type="text"
                            placeholder="영화나 시리즈를 검색하세요"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button className={classes["search_button"]}>
                            <FaSearch />
                        </button>
                    </div>
                </div>

                <hr></hr>

                <div className={classes.content}>
                {categories.map((category) => (
                    <div className={classes.category} key={category.id}>
                    <h1 className={classes["category_title"]}>{category.title}</h1>
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        loop={true}
                        slidesPerView={5.5}
                        spaceBetween={10}
                        className={classes["movie_slider"]}
                        breakpoints={{
                        320: { slidesPerView: 2.5, spaceBetween: 10 },
                        1024: { slidesPerView: 5.5, spaceBetween: 10 },
                        }}
                    >
                        {category.movies.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <div className={classes["movie_card"]}>
                                    <div
                                        className={classes["movie_poster"]}
                                        style={{ backgroundImage: `url(${movie.image})` }}
                                        onClick={() => handleSelectMovie(movie)}
                                    >
                                        <div className={classes["movie_overlay"]}>
                                            <div className={classes.h3}>{movie.title}</div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    </div>
                ))}
                </div>

                {/* <nav className={classes["bottom_nav"]}>
                <div className={`${classes["nav_item"]} ${classes.active}`}>
                    <FaHome />
                    <span>홈</span>
                </div>
                <div className={classes["nav_item"]}>
                    <FaSearch />
                    <span>검색</span>
                </div>
                <div className={classes["nav_item"]}>
                    <FaPlay />
                    <span>재생</span>
                </div>
                <div className={classes["nav_item"]}>
                    <FaUserAlt />
                    <span>키즈</span>
                </div>
                </nav> */}

                {selectedMovieData && (
                    <MoviePopUp
                        movie={selectedMovieData}
                        onClose={handleClosePopUp}
                    />
                )}
            </div>
    </>
    );
}

export default SeeAllMovie;