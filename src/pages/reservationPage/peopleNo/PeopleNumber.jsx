import classes from "./PeopleNumber.module.css";
import React, { useState } from "react";

function PeopleNumber() {

    const [ num, setNum ] = useState(1);
    const handlePlus = () => {
        if(num < 10) {
            setNum(preNum => preNum + 1);
        }
        else {
            alert("최대 이용 인원은 10명 입니다.")
        }
    };
    const handleMinus = () => {
        if(num > 1) {
            setNum(preNum => preNum - 1);
        }
        else {
            alert("최소 이용 인원은 1명 입니다.")
        }
    }

    return(
        <>
            <input type="button" value="-" className={classes.nBtn} onClick={handleMinus}/>
            <input type="text" value={num} className={classes.number} readOnly/>
            <input type="button" value="+" className={classes.nBtn} onClick={handlePlus}/>
        </>
    );
}

export default PeopleNumber;