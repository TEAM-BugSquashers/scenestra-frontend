import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaHome, FaSearch, FaPlay, FaUserAlt } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import classes from './SeeAllMovie.module.css';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar'
import { useState } from 'react';


const categories = [
    {
    id: 1,
    title: "좋아 보의 취향저격 베스트 콘텐츠",
    movies: [
        { id: 1, title: "쥬라기월드", image: "https://search.pstatic.net/common?type=f&size=174x196&quality=75&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmdi%2Fpi%2F000004626%2FPM462627_115717_000.jpg" },
        { id: 2, title: "캐롤", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FINTERVIEW%2F59008_cover_20250411024522.jpg" },
        { id: 3, title: "스핏파이어", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FMAKING%2F58827_cover_20250228023750.jpg" },
        { id: 4, title: "애나벨", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FMAKING%2F58926_cover_20250317012048.jpg" },
        { id: 5, title: "그녀의 이름을 불러줘", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FMAKING%2F58995_cover_20250328044817.jpg" },
        { id: 6, title: "패이노원", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FMAKING%2F58997_cover_20250331105130.jpg" },
        { id: 7, title: "스타트", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FMAKING%2F59022_cover_20250404053849.jpg" }
    ]
    },
    {
    id: 2,
    title: "놓아보기 추천 시리즈",
    movies: [
        { id: 1, title: "지형의 세계", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FMAKING%2F59070_cover_20250411055358.jpg" },
        { id: 2, title: "부부의 세계", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FMAKING%2F59081_cover_20250415114601.jpg" },
        { id: 3, title: "미스터", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FMAKING%2F59102_cover_20250418114408.jpg" },
        { id: 4, title: "스위트", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FMUSICVIDEO%2F59046_cover_20250409015258.jpg" },
        { id: 5, title: "애니유", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FMUSICVIDEO%2F59132_cover_20250424101947.jpg" },
        { id: 6, title: "하이에나", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FTRAILER%2F58737_cover_20250213041343.jpg" },
        { id: 7, title: "그녀의 이름을 불러줘", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FTRAILER%2F58832_cover_20250304021429.jpg" }
    ]
    },
    {
    id: 3,
    title: "가족이 함께 보는 시리즈",
    movies: [
        { id: 1, title: "정글", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FTRAILER%2F58900_cover_20250312051534.jpg" },
        { id: 2, title: "동물원", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FTRAILER%2F58931_cover_20250318113641.jpg" },
        { id: 3, title: "사파리", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FTRAILER%2F58933_cover_20250318030639.jpg" },
        { id: 4, title: "뽀로로", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FTRAILER%2F58967_cover_20250324062513.jpg" },
        { id: 5, title: "기차", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FTRAILER%2F58981_cover_20250326110926.jpg" },
        { id: 6, title: "파파야", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FTRAILER%2F58987_cover_20250327045758.jpg" },
        { id: 7, title: "바다", image: "https://search.pstatic.net/common?type=f&size=450x255&quality=85&direct=true&src=https%3A%2F%2Fssl.pstatic.net%2Fimgmovie%2Fmultimedia%2FMOVIECLIP%2FTRAILER%2F58988_cover_20250327051220.jpg" }
    ]
    }
];

function SeeAllMovie() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Sidebar isOpen={isMenuOpen} toggleSidebar={toggleMenu} />

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
                            >
                                <div className={classes["movie_overlay"]}>
                                <h3>{movie.title}</h3>
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
            </div>
    </>
    );
}

export default SeeAllMovie;