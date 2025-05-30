import React, {useEffect, useState} from 'react';
import classes from './TimeSelect.module.css';

function TimeSelect({ timeUnit, selectedTime, setSelectedTime, availableTimes, onTimeSelect}) {
    // 시간 상태별 슬롯 관리
    const [bookedSlots, setBookedSlots] = useState([]); // BOOKED - 마감
    const [blockedSlots, setBlockedSlots] = useState([]); // BLOCKED - 선택가능하지만 제한있음
    const [availableSlots, setAvailableSlots] = useState([]); // AVAILABLE - 완전히 선택가능
    const [errorMessage, setErrorMessage] = useState('');

    const slotsNeeded = timeUnit - 1;

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
        // "2025-06-03T11:00" 형식에서 시간 추출
        const timePart = timeString.split('T')[1];
        const [hour, minute] = timePart.split(':').map(Number);

        const baseIndex = (hour - 11) * 2;

        if (minute === 30) {
            return baseIndex + 1;
        }

        return baseIndex;
    };

    useEffect(() => {
        if(availableTimes && typeof availableTimes === 'object') {
            const booked = [];
            const blocked = [];
            const available = [];

            Object.entries(availableTimes).forEach(([timeString, status]) => {
                const slotIndex = convertTimeToSlotIndex(timeString);

                if (slotIndex >= 0 && slotIndex < timeSlots.length) {
                    switch(status) {
                        case 'BOOKED':
                            booked.push(slotIndex);
                            break;
                        case 'BLOCKED':
                            blocked.push(slotIndex);
                            break;
                        case 'AVAILABLE':
                            available.push(slotIndex);
                            break;
                    }
                }
            });
            setBookedSlots(booked);
            setBlockedSlots(blocked);
            setAvailableSlots(available);
        } else {
            setBookedSlots([]);
            setBlockedSlots([]);
            setAvailableSlots([]);
        }
    }, [availableTimes, timeSlots.length]);

    const handleTimeClick = (index) => {
        setErrorMessage('');

        if (bookedSlots.includes(index)) {
            setErrorMessage("이미 마감된 시간입니다");
            return;
        }

        if (!availableSlots.includes(index) && !blockedSlots.includes(index) && !bookedSlots.includes(index)) {
            setErrorMessage("선택할 수 없는 시간입니다");
            return;
        }

        if (selectedTime === index) {
            setSelectedTime(null);
            onTimeSelect && onTimeSelect(null);
            setErrorMessage(''); // 선택 해제 시 에러 메시지도 제거
            return;
        }

        // 4. 23시 종료 제한 체크
        const endSlotIndex = index + slotsNeeded;
        const slot23 = (23 - 11) * 2; // = 24

        if (endSlotIndex > slot23) {
            setErrorMessage("23시 이후에 끝나는 상영은 불가능합니다");
            return;
        }

        for (let i = index; i < index + slotsNeeded && i < timeSlots.length; i++) {
            if (bookedSlots.includes(i)) {
                setErrorMessage("선택한 시간대에 이미 예약된 시간이 포함되어 있습니다");
                return;
            }
        }
        if (blockedSlots.includes(index)) {
            setErrorMessage("관람에 필요한 시간이 부족하거나 예약할 수 없는 시간입니다");
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

    // 슬롯의 상태에 따른 클래스 결정
    const getSlotClassName = (index) => {
        const classNames = [classes.clickBox];

        if (bookedSlots.includes(index)) {
            classNames.push(classes.booked);
        }
        else if (blockedSlots.includes(index)) {
            classNames.push(classes.blocked);
        }
        else if (availableSlots.includes(index)) {
            classNames.push(classes.available);
        }
        else {
            classNames.push(classes.unavailable);
        }

        if (selectedTime !== null && index >= selectedTime && index < selectedTime + slotsNeeded) {
            classNames.push(classes.selected);
        }

        return classNames.join(' ');
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
                            className={getSlotClassName(index)}
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