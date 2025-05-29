import React, {useEffect, useState} from 'react';
import classes from './TimeSelect.module.css';

function TimeSelect({ timeUnit, selectedTime, setSelectedTime, availableTimes, onTimeSelect}) {
    // 시간선택불가능한 영역 표시용 임시데이터
    const [unavailableSlots, setUnavailableSlots ] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // timeUnit을 직접 사용 (API에서 받아온 슬롯 수)
    const slotsNeeded = timeUnit;

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

    const convertTimeToSlotIndex = (timeString) => {
        const time = timeString.split('T')[1];
        const [hour, minute] = time.split(':').map(Number);

        const baseIndex = (hour - 11) * 2;

        if (minute === 30) {
            return baseIndex + 1;
        }

        return baseIndex;
    };

    useEffect(() => {
        if(availableTimes && Array.isArray(availableTimes)) {
            const allSlots = Array.from({length: timeSlots.length}, (_, i) => i);
            const availableSlotIndices = availableTimes.map(timeString => convertTimeToSlotIndex(timeString)
            ).filter(index => index >= 0 && index < timeSlots.length);
            const unavailableSlotIndices = allSlots.filter(slot => !availableSlotIndices.includes(slot)
            );
            setUnavailableSlots(unavailableSlotIndices);
        } else {
            const allSlots = Array.from({ length: timeSlots.length }, (_, i) => i);
            setUnavailableSlots(allSlots);
        }
    }, [availableTimes, timeSlots.length])

    const handleTimeClick = (index) => {
        setErrorMessage('');

        // 1. 예약 불가능한 시간 체크 (시작 시간만)
        if (unavailableSlots && unavailableSlots.includes(index)) {
            setErrorMessage("선택불가능한 시간입니다");
            return;
        }
        // 2. 이미 선택된 시간 클릭 시 선택 해제
        if (selectedTime === index) {
            setSelectedTime(null);
            onTimeSelect && onTimeSelect(null);
            return;
        }

        // 3. 23시 종료 제한 체크
        const endSlotIndex = index + slotsNeeded;
        const slot23 = (23 - 11) * 2; // = 24

        if (endSlotIndex > slot23) {
            setErrorMessage("23시 이후에 끝나는 상영은 불가능합니다");
            return;
        }

        setSelectedTime(index);

        if (onTimeSelect) {
            const startTime = timeSlots[index];
            const endIndex = index + slotsNeeded;
            let endTime;

            if (endIndex < timeSlots.length) {
                endTime = timeSlots[endIndex];
            } else {
                // 23시 이후 종료시간 계산
                const extraSlots = endIndex - timeSlots.length;
                if (extraSlots === 1) {
                    endTime = "23시";
                } else if (extraSlots === 2) {
                    endTime = "23시 30분";
                } else {
                    endTime = "24시";
                }
            }

            onTimeSelect({
                startTime: startTime,
                endTime: endTime,
                startIndex: index,
                slotsNeeded: slotsNeeded,
                timeUnit: timeUnit
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
                    <div className={classes.sBox}>
                        <div className={classes.selectable}></div>
                        선택가능
                    </div>
                    <div className={classes.sBox}>
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