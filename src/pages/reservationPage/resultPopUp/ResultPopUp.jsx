import classes from './ResultPopUp.module.css';
import React from "react";
import { useNavigate } from "react-router-dom";
import {axiosReservation} from "../../api/axios.js";

function ResultPopUp({ isOpen, onClose, reservationData, timeInfo, movieInfo, roomData, totalPrice, selectedPeople }) {
    const navigate = useNavigate();

    if(!isOpen) return null;

    const handleReservation = async () => {
        try {
            const formatDateForAPI = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };

            const formatTimeForAPI = (timeStr) => {
                if (timeStr.includes('30분')) {
                    const hour = timeStr.split('시')[0].padStart(2, '0');
                    return `${hour}:30:00`;
                } else if (timeStr.includes('시')) {
                    const hour = timeStr.split('시')[0].padStart(2, '0');
                    return `${hour}:00:00`;
                }
                return timeStr.includes(':') ? (timeStr.includes(':00:00') ? timeStr : timeStr + ':00') : timeStr;
            };

            const reservationPayload = {
                "theaterId": Number(roomData?.theaterId),
                "movieId": String(movieInfo?.id || movieInfo?.movieId), // id 필드 확인
                "date": formatDateForAPI(reservationData),
                "time": formatTimeForAPI(timeInfo?.startTime), // 수정된 시간 형식 변환
                "numPeople": Number(selectedPeople)
            };

            console.log('=== 수정된 전송 데이터 ===');
            console.log('원본 시간:', timeInfo?.startTime);
            console.log('변환된 시간:', formatTimeForAPI(timeInfo?.startTime));
            console.log('reservationPayload:', reservationPayload);

            const response = await axiosReservation(reservationPayload);

            if(response.status === 200 || response.status === 201) {
                navigate("/result", {
                    state: {
                        reservationResult: response.data,
                        reservationInfo: reservationPayload,
                        movieDetails: movieInfo,
                        theaterDetails: roomData,
                        timeDetails: timeInfo,
                        peopleCount: selectedPeople,
                        totalPrice: totalPrice
                    }
                });
            }
        } catch (error) {
            console.error("예약 실패:", error);
            console.error("서버 에러 응답:", error.response?.data);
            alert('예약 중 오류가 발생했습니다.');
        }
    }
    return (
        <>
            <div className={classes.overlay}>
                <div className={classes.popUp}>
                    <h2 className={classes.popupTitle}>MAKE A RESERVATION</h2>
                    {/*팝업내용*/}
                    <div className={classes.descBox}>
                        <p>영화: {movieInfo.title} </p>
                        <p>상영관: {roomData?.name || '상영관 정보 없음'}</p>
                        <p>날짜: {reservationData?.toLocaleDateString('ko-KR',{
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            weekday: 'long'
                        })}</p>
                        <p>시간: {timeInfo?.startTime} ~ {timeInfo?.endTime}</p>
                        <p>현장결제금액: {totalPrice.toLocaleString('ko-KR')}원</p>
                    </div>
                    <div className={classes.btnBox}>
                        <button className={`${classes["closeBtn"]} btn2`} onClick={onClose} >CANCEL</button>
                        <button
                            onClick={handleReservation}
                            className={`${classes["reserveBtn"]} btn2`}>RESERVATION</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultPopUp;