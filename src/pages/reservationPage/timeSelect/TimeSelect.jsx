import React, { useState } from 'react';
import classes from './TimeSelect.module.css';

function TimeSelect({ movieDuration, selectedTime, setSelectedTime, onTimeSelect}) {
    // 시간선택불가능한 영역 표시용 임시데이터
    const [unavailableSlots, setUnavailableSlots ] = useState([0, 1, 2, 3, 16,17,18]);

    // 에러 메시지 상태 추가
    const [errorMessage, setErrorMessage] = useState('');

    const getSlotsNeeded = (duration) => {
        return Math.ceil(duration / 30);
    };

    const slotsNeeded = getSlotsNeeded(movieDuration);
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
    const timeSlots = generateTimeSlots();

    const handleTimeClick = (index) => {
        // 에러 상태 초기화
        setErrorMessage('');

        if(unavailableSlots.includes(index)) {
            setErrorMessage("선택불가능한 시간입니다");
            return;
        }

        if(selectedTime === index) {
            setSelectedTime(null);
            onTimeSelect && onTimeSelect(null);
            return;
        }
        // 연속 칸 확인: 현재 인덱스부터 필요한 칸만큼 선택 가능한지 체크
        for(let i = 0; i < slotsNeeded; i++) {
            if(index + i >= timeSlots.length || unavailableSlots.includes(index + i)) {
                setErrorMessage("선택불가능한 시간입니다");
                return;
            }
        }
        setSelectedTime(index);

        if(onTimeSelect) {
            const startTime = timeSlots[index];

            const endIndex = index + slotsNeeded;
            let endTime;

            if(endIndex < timeSlots.length) {
                endTime = timeSlots[endIndex];
            } else {
                const lastSlotsIndex = index + slotsNeeded - 1;
                const lastSlot = timeSlots[lastSlotsIndex];
                if(lastSlot.includes('30분')) {
                    const hour = parseInt(lastSlot) + 1;
                    endTime = `${hour}시`;
                }else {
                    endTime = lastSlot.replace('시', '시 30분');
                }
            }
            onTimeSelect({
                startTime: startTime,
                endTime: endTime,
                startIndex: index,
                slotsNeeded: slotsNeeded,
                movieDuration: movieDuration
            });
        }
    };

    return (
        <>
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
                            className={`${classes.clickBox} ${
                                unavailableSlots.includes(index) ? classes.unavailable :
                                    (selectedTime !== null && index >= selectedTime && index < selectedTime + slotsNeeded)
                                        ? classes.selected : ''}`}
                            onClick={() => handleTimeClick(index)}
                        >
                        </div>
                    ))}
                </div>
                <div className={classes.selectableBox}>
                    <div className={classes.sbox}>
                        <div className={classes.selectable}></div>
                        선택가능
                    </div>
                    <div className={classes.sbox}>
                        <div className={classes.end}></div>
                        마감
                    </div>
                    <div className={classes.error}>{errorMessage}</div>
                </div>
            </div>
        </>
    );
}

export default TimeSelect;