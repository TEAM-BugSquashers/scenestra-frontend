import classes from './ResultPopUp.module.css';
import React from "react";
import { useNavigate } from "react-router-dom";

function ResultPopUp({ isOpen, onClose, reservationData, timeInfo, movieInfo, roomData, totalPrice }) {
    const navigate = useNavigate();

    if(!isOpen) return null;
    console.log('팝업에서 받은 roomData:', roomData);
    console.log('roomData.name:', roomData?.name);

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
                            onClick={() => {navigate("/result");}}
                            className={`${classes["reserveBtn"]} btn2`}>RESERVATION</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultPopUp;