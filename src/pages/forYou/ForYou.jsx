import classes from './ForYou.module.css';
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

import { Mousewheel, Pagination } from 'swiper/modules';
import {Route, useNavigate} from "react-router-dom";
import {axiosTest} from "../api/axios.js";

const MovieSlide = ({movieSrc, genre, isActive }) => {
    const movieRef = useRef(null);
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const topPostData = [
        {id: 1, image: '/posterimage/더랍스터.jpg', title:'더랍스터' },
        {id: 2, image: '/posterimage/엑시트.jpg', title:'엑시트' },
        {id: 3, image: '/posterimage/파묘.jpg', title:'파묘' },
        {id: 4, image: '/posterimage/CallMeByYourName.jpg', title:'CallMeByYourName' },
        {id: 5, image: '/posterimage/하얼빈.jpg', title:'하얼빈' }
    ]

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

    const showMovieHandler = () => {
        setIsClicked(!isClicked);
    }
    const contentStyle = {
        bottom: isClicked ? '34%' : '10%'
    };

    return (
        <div className={classes.movieContainer}>
            <video
                ref={movieRef}
                className={classes.backgroundMovie}
                loop
                muted
                playsInline
            >
                <source src={movieSrc} type="video/mp4" />
            </video>
            <div className={classes.bottomContainer}>
                <div className={classes.movieContent} style={contentStyle}>
                    <div className={classes.line1} />
                    <h1 onClick={showMovieHandler}>{genre}</h1>
                    <div className={classes.line2} />
                </div>
                {isClicked && (
                    <div className={classes.topMovies}>
                        <div className={classes.postersContainer}>
                            {topPostData.map(poster => (
                                <div key={poster.id} className={classes.posterItem}>
                                    <img
                                        src={poster.image}
                                        alt={poster.title}
                                        className={classes.posterImage}
                                    />
                                </div>
                            ))}
                            <button className={classes.allMovieShowBtn} onClick={()=>navigate("/seeAllMoive")}>전체영화보기</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

function ForYou(){


    const [activeIndex, setActiveIndex ] = useState(0);

    useEffect(() => {
        axiosTest()
    }, []);

    //영화정보 넣을때 사용자가 선호장르 설정하지 않으면 4(Best),5(New) 만 보여주게 해야됩니다.
    const movies = [
        {id: 1, url: 'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/WarNapoleon.mp4', genre: 'WAR' },
        {id: 2, url: 'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/CrimeNightmare+Alley.mp4', genre: 'CRIME' },
        {id: 3, url: 'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/FantasyTheLordOfTheRings.mp4', genre: 'FANTASY' },
        {id: 4, url:'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/WarNapoleon.mp4', genre: 'BEST'},
        {id: 5, url:'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/CrimeNightmare+Alley.mp4', genre: 'NEW' }
    ];


    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    }
    return (
        <>
            <div className={classes.pageContainer}>
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
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}

export default ForYou;