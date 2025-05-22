import classes from './Reservation.module.css';
import Calendar from 'react-calendar';
import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Room from '../components/room/Room.jsx';

// import {axiosgroupedByGenre} from "../api/axios.js";


function Reservation() {
    const [ value, onChange] = useState(new Date());

    return(
        <>
            <div className={classes.outerBox}>
            {/*    가장큰박스*/}
                <div className={classes.titleBox}>
                    <div className={classes.line1}></div>
                    <h2 className={classes.RTitle}>RESERVATION</h2>
                    <div className={classes.line2}></div>
                </div>
                <div className={classes.innerBox}>
                {/*예약에 필요한 상세내용들 들어가는 박스*/}
                    <div>
                        <div className={`${classes["sectionTitle"]} subtitle`}>선택한영화</div>
                        <div className={classes.selectedMovie}>
                            <div className={classes.movieImg}></div>
                            <div className={classes.movieDesc}>
                                <h2>영화제목</h2>
                                <div>상영시간</div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.box}>
                        <div className={`${classes["sectionTitle"]} subtitle`}>총 예약인원</div>
                        <div className={classes.box}>
                            <button className={classes.nBtn}>-</button>
                            <input type="text" value="1" className={classes.number}/>
                            <button className={classes.nBtn}>+</button>
                        </div>
                    </div>
                    <div>
                        <div className={`${classes["sectionTitle"]} subtitle`}>상영관선택</div>
                        <div className={classes.box}>
                            <Room />
                        </div>
                    </div>
                    <div className={classes.box}>
                        <div className={`${classes["sectionTitle"]} subtitle`}>시간선택</div>
                        <div className={classes.box}></div>
                    </div>
                    <div className={classes.box}>
                        <div className={`${classes["sectionTitle"]} subtitle`}>날짜선택</div>
                        <div className={classes.box}>
                            <Calendar
                                onChange={onChange} value={value}/>
                        </div>
                    </div>
                    <div className={classes.box}>
                        <div className={`${classes["sectionTitle"]} subtitle`}>현장결제금액</div>
                        <div className={classes.box}>10,000 원</div>
                    </div>
                </div>
                <div className={classes.btnBox}>
                    <button className={`${classes["reserveBtn"]} btn2 wTitle`}>RESERVE NOW</button>
                </div>
            </div>
        </>
    )
}

export default Reservation;