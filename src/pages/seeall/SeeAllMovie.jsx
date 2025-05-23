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
import {axiosgroupedByGenre} from "../api/axios.js";
import  { useEffect } from 'react';
import Loading from "../components/loading/Loading.jsx";
import {useNavigate} from "react-router-dom";

function SeeAllMovie() {
    const [selectedMovieData,handleSelectMovie, handleClosePopUp ] = useMoviePopUp();
    // const [searchTerm, setSearchTerm] = useState('');
    const [movieData, setMovieData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navi = useNavigate();


    useEffect(() => {
        const fetchMovieData = async () => {
            setIsLoading(true);
            try{
                const response = await axiosgroupedByGenre();
                setMovieData(response.data.payload);
            }catch{
                console.error("영화를 못가져옴");
            }
            setIsLoading(false);
        }

        fetchMovieData();
    },[])


    // const handleSearchChange = (e) => {
    //     setSearchTerm(e.target.value);
    // };

    if (isLoading) {
        return <Loading />;
    }
    return (
        <>

            <div className={classes["netflix_app"]}>
                {/* 검색바 */}
                {/*<div className={classes["search_container"]}>*/}
                {/*    <div className={classes["search_bar"]}>*/}
                {/*        <input*/}
                {/*            type="text"*/}
                {/*            placeholder="영화 제목을 검색하세요"*/}
                {/*            value={searchTerm}*/}
                {/*            onChange={handleSearchChange}*/}
                {/*        />*/}
                {/*        <button className={classes["search_button"]}>*/}
                {/*            <FaSearch />*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className={classes.content}>
                {movieData.map((genre) => (
                    <div className={classes.category} key={genre.genreId}>
                        <div className={classes.ctWrap}>
                            <div className={classes.leftTitleLine}></div>
                            <h2 className={classes["category_title"]}>{genre.engName}</h2>
                            <div className={classes.rightTitleLine}></div>
                        </div>
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        loop={true}
                        slidesPerView={5.5}
                        spaceBetween={20}
                        className={classes["movie_slider"]}
                        breakpoints={{
                        320: { slidesPerView: 2.5, spaceBetween: 10 },
                        1024: { slidesPerView: 5.5, spaceBetween: 10 },
                        }}
                    >
                        {genre.movies.slice(0,20).map((movie) => (
                            <SwiperSlide key={movie.movieId}>
                                <div className={classes["movie_card"]}>
                                    <div
                                        className={classes["movie_poster"]}
                                        style={{ backgroundImage: `url(${movie.posterUrl})` }}
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
                        <div className={classes.seeMoreWrap}>
                            <span onClick={() => navi("/AllMovie/"+genre.genreId)}>장르 더보기</span>
                        </div>
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