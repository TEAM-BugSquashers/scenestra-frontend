import classes from './Result.module.css'
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Result() {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        reservationResult,
        reservationInfo,
        movieDetails,
        theaterDetails,
        timeDetails,
        peopleCount,
        totalPrice
    } = location.state || {};
    // 디버깅용 (나중에 제거)
    console.log("=== 전달받은 데이터 ===");
    console.log("movieDetails: ", movieDetails);
    console.log("roomData: ", theaterDetails);
    console.log("timeDetails: ", timeDetails);
    console.log("peopleCount: ", peopleCount);
    console.log("reservationInfo: ", reservationInfo)
    console.log("reservationResult: ", reservationResult.payload.reservationId)

    if(!reservationResult || !reservationInfo ) {
        return (
            <div>
                <h1 className={classes.info}>예약 정보를 찾을 수 없습니다.</h1>
                <button
                    onClick={() => navigate("/")}
                    className={`${classes["backHome"]} btn1`}>RETURN TO HOME</button>
            </div>
        )
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    };
    return(
        <>
            <div className={classes.outer}>
                <h1 className={classes.info}>예약이 완료되었습니다.</h1>
                <div className={classes.resultBox}>
                    <div className={classes.titleBox}>
                        <div className={classes.line1}></div>
                        <h2 className={classes.RTitle}>RESULT</h2>
                        <div className={classes.line2}></div>
                    </div>
                    <div className={classes.inner}>
                        <div className={classes.descBox}>
                            <p>예약번호: {theaterDetails?.name.slice(0, 3)}{reservationResult.payload.reservationId}–
                                {reservationInfo.date.slice(5, 7)}{reservationInfo.date.slice(8, 10)}–
                                {reservationInfo.time.slice(0, 2)}{reservationInfo.time.slice(3, 5)}</p>
                            <p>영화: {movieDetails?.title || '정보없음'}</p>
                            <p>상영관: {theaterDetails?.name || '정보없음'}</p>
                            <p>날짜: {formatDate(reservationInfo.date)}</p>
                            <p>시간: {timeDetails?.startTime} ~ {timeDetails?.endTime}</p>
                            <p>인원: {peopleCount || reservationInfo.numPeople}명</p>
                            <p>현장결제금액: {totalPrice?.toLocaleString('ko-KR') || '0'}원</p>
                        </div>
                        <div className={classes.imgBox}>
                            <img src={movieDetails?.poster} alt={movieDetails?.title} />
                        </div>
                    </div>
                    <button
                        onClick={() => {navigate("/")}}
                        className={`${classes["backHome"]} btn1`}>RETURN TO HOME</button>
                </div>
            </div>
        </>
    );
}

export default Result;