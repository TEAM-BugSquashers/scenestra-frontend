import React, {useEffect, useState} from 'react';
import classes from './TimeSelect.module.css';

function TimeSelect({ timeUnit, selectedTime, setSelectedTime, availableTimes, onTimeSelect}) {

    const [bookedSlots, setBookedSlots] = useState([]);
    const [blockedSlots, setBlockedSlots] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const slotsNeeded = timeUnit - 1;
    const systemNeeded = timeUnit;

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
        const timePart = timeString.split('T')[1];

        let hour, minute;

        if (timePart.includes('30분')) {
            // "15 30분:00:00" 형식
            const hourPart = timePart.split(' ')[0];
            hour = parseInt(hourPart);
            minute = 30;
        } else {
            // "15:00:00" 형식
            const [hourStr, minuteStr] = timePart.split(':');
            hour = parseInt(hourStr);
            minute = parseInt(minuteStr);
        }

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
            setErrorMessage('');
            return;
        }

        // 청소시간 30분 포함
        const userEndSlotIndex = index + slotsNeeded;

        if (userEndSlotIndex > timeSlots.length) {
            setErrorMessage("23시 이후에 끝나는 상영시간은 선택할 수 없습니다");
            return;
        }

        for (let i = index; i < index + systemNeeded && i < timeSlots.length; i++) {
            if (bookedSlots.includes(i)) {
                setErrorMessage("선택할 수 없는 시간대가 포함되어 있습니다.");
                return;
            }
        }

        if (blockedSlots.includes(index)) {
            setErrorMessage("관람에 필요한 시간이 부족하거나 예약할 수 없는 시간입니다");
            return;
        }

        setSelectedTime(index);

        if (onTimeSelect) {
            const startTime = timeSlots[index];
            const endIndex = index + slotsNeeded;
            let endTime;

            if (endIndex < timeSlots.length) {
                endTime = timeSlots[endIndex];
            } else if (endIndex === timeSlots.length) {
                endTime = "23시";
            } else {
                endTime = "23시";
            }

            onTimeSelect({
                startTime: startTime,
                endTime: endTime,
                startIndex: index,
                slotsNeeded: slotsNeeded,
                systemNeeded: systemNeeded,
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

        if(selectedTime !== null && index >= selectedTime && index < selectedTime + slotsNeeded){
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
            </div>
            <div className={classes.selectableBox}>
                <div className={classes.infoBox}>
                    <div className={classes.sBox}>
                        <div className={classes.selectable}></div>
                        선택가능
                    </div>
                    <div className={classes.sBox}>
                        <div className={classes.end}></div>
                        마감
                    </div>
                </div>
                <div className={classes.error}>{errorMessage}</div>
            </div>
        </>
    );
}

export default TimeSelect;