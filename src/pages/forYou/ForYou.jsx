import classes from './ForYou.module.css';
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

import { Mousewheel, Pagination } from 'swiper/modules';

const MovieSlide = ({movieSrc, genre, isActive }) => {
    const movieRef = useRef(null);
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
            <div className={classes.movieContent}>
                <div className={classes.line1} />
                <h1>{genre}</h1>
                <div className={classes.line2} />
            </div>
        </div>
    );
};

function ForYou(){

    const [activeIndex, setActiveIndex ] = useState(0);
    const movies = [
        {id: 1, url: 'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/WarNapoleon.mp4', genre: 'War' },
        {id: 2, url: 'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/CrimeNightmare+Alley.mp4', genre: 'Crime' },
        {id: 3, url: 'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/FantasyTheLordOfTheRings.mp4', genre: 'Fantasy' },
        {id: 4, url:'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/WarNapoleon.mp4', genre: 'Best'},
        {id: 5, url:'https://scenestra.s3.ap-northeast-2.amazonaws.com/video/CrimeNightmare+Alley.mp4', genre: 'New' }
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