import classes from './ReviewSelect.module.css'
import {useNavigate} from "react-router-dom";
import {axiosTheaters} from "../api/axios.js";
import {useEffect, useState} from "react";

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

                <div className={classes.nav}>
                    {theaterData.map((theater) => (
                        <div
                            key={theater.theaterId}
                            onClick={() => navi("/Review/"+theater.theaterId)}
                            className={classes.simpleCard}
                        >
                            <img src={theater.image} alt={theater.name} />
                            <div className={classes.simpleOverlay}>
                                <div className={classes.theaterName}>{theater.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ReviewSelect;