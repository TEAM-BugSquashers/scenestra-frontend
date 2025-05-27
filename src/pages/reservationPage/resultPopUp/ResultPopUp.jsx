import classes from './ResultPopUp.module.css';
import React from "react";

function ResultPopUp({ isOpen, onClose}) {
    if(!isOpen) return null;

    return (
        <>
            <div className={classes.overlay}>
                <div className={classes.popUp}>
                    <h2 className={classes.popupTitle}>MAKE A RESERVATION?</h2>
                    <div className={classes.popXBox} onClick={onClose}>
                        <div className={classes.xLeft}></div>
                        <div className={classes.xRight}></div>
                    </div>
                    {/*팝업내용*/}
                    <div className={classes.descBox}>
                        <p>영화:</p>
                        <p>상영관:</p>
                        <p>날짜:</p>
                        <p>시간:</p>
                        <p>현장결제금액:</p>
                    </div>
                    <div className={classes.btnBox}>
                        <button>CANCEL</button>
                        <button>RESERVATE</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultPopUp;