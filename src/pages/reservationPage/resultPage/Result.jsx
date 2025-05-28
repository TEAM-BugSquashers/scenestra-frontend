import classes from './Result.module.css'
import React from "react";
import { useNavigate } from "react-router-dom";

function Result() {
    const navigate = useNavigate();
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
                            <p>예약번호: </p>
                            <p>영화: </p>
                            <p>상영관:</p>
                            <p>날짜: </p>
                            <p>시간: </p>
                            <p>현장결제금액:  원</p>
                        </div>
                        <div className={classes.imgBox}></div>
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