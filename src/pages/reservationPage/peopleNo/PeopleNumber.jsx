import classes from "./PeopleNumber.module.css";
import React from "react";

function PeopleNumber({ selectedPeople, setSelectedPeople }) {

    // 기본값을 0으로 설정
    const currentNum = selectedPeople || 0;

    const handlePlus = () => {
        if(currentNum < 10) {
            setSelectedPeople(currentNum + 1);
        }
        else {
            alert("최대 이용 인원은 10명 입니다.")
        }
    };

    const handleMinus = () => {
        if(currentNum > 1) {  // 1명까지만 감소 가능
            setSelectedPeople(currentNum - 1);
        }
        else {
            alert("최소 이용 인원은 1명 입니다.")
        }
    }

    return(
        <>
            <input type="button" value="-" className={classes.nBtn} onClick={handleMinus}/>
            <input type="text" value={currentNum} className={classes.number} readOnly/>
            <input type="button" value="+" className={classes.nBtn} onClick={handlePlus}/>
        </>
    );
}

export default PeopleNumber;