import React, { useState } from 'react';
import classes from './TimeSelect.module.css';

function TimeSelect() {
    const [ selectedTime, setSelectedTime ] = useState(null)

    const generateTimeSlots = () => {
        const slots = [];
        for(let hour = 11; hour < 23; hour++) {
            slots.push(`${hour}시`);
            if(hour < 23) {
                slots.push(`${hour}시 30분`);
            }
        }
        return slots;
    };
    const generateDisplayTimes = () => {
        const times = [];
        for(let hour = 11; hour <= 23; hour++) {
            times.push(`${hour}시`);
        }
        return times;
    };

    const displayTime = (time) => {
        if(time.includes('30분')) {
            return '';
        }
        return time;
    };
    const timeSlots = generateTimeSlots();
    const displayTimes = generateDisplayTimes();
    const handleTimeClick = (index) => {
        console.log(`${index}번째 시간 클릭됨: `, timeSlots[index]);
        setSelectedTime(index);
    }

    return (
        <>
            <div className={classes.timeContainer}>
                <h3>시간선택박스만들기</h3>
                <p>여기에 시간표 넣을것임</p>
            </div>
            <div className={classes.timeSelectBox}>
                <div className={classes.timeTextRow}>
                    {timeSlots.map((time, index) => (
                        <div key={index} className={classes.timeLabel}>
                            {time.includes('30분') ? '' : time}
                        </div>
                    ))}
                    <div className={classes.timeLabel}>23시</div>
                </div>

                {/* 박스들만 따로 */}
                <div className={classes.timeBox}>
                    {timeSlots.map((time, index) => (
                        <div
                            key={index}
                            className={classes.clickBox}
                            onClick={() => handleTimeClick(index)}
                        >
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TimeSelect;