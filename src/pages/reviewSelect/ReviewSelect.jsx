import classes from './ReviewSelect.module.css'
import {useNavigate} from "react-router-dom";
import {axiosTheaters} from "../api/axios.js";
import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
// Swiper 모듈들 import 추가
import { Navigation, Pagination, Scrollbar, A11y, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cards';

function ReviewSelect(){
    const [theaterData, setTheaterData] = useState([]);

    useEffect(() => {
        const fetchMovieData = async () => {
            try{
                const response = await axiosTheaters();
                setTheaterData(response.data.payload);
            }catch(error){
                console.error("상영관을 못가져옴", error);
            }
        }
        fetchMovieData();
    }, [])

    const navi = useNavigate();

    return(
        <>
            <div className={classes.wrap}>
                <div className={classes["section_header"]}>
                    <div></div>
                    <h2 className={classes.h2}>THEATER GUIDE</h2>
                    <div></div>
                </div>

                <Swiper
                    modules={[Scrollbar, A11y, EffectCards]}
                    effect="cards"
                    grabCursor={true}
                    cardsEffect={{
                        slideShadows: false, // 그림자 비활성화
                    }}
                    centeredSlides={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                >
                    {theaterData.map((theater) => (
                        <SwiperSlide key={theater.theaterId}>
                            <div
                                onClick={() => navi("/Review/"+theater.theaterId)}
                                className={classes.simpleCard}
                            >
                                <img src={theater.image} alt={theater.name} />
                                <div className={classes.simpleOverlay}>
                                    <div className={classes.theaterName}>{theater.name}</div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}

export default ReviewSelect;