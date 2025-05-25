import classes from './Reservation.module.css';
import Calendar from 'react-calendar';
import React, { useState } from 'react';
import Room from './room/Room.jsx';
import TimeSelect from "./timeSelect/TimeSelect.jsx";
import PeopleNumber from "./peopleNo/PeopleNumber.jsx";
import 'react-calendar/dist/Calendar.css';

// import {axiosgroupedByGenre} from "../api/axios.js";

function Reservation() {

    // 리액트캘린더 이벤트와 관련된 부분
    const [selectedDate, setSelectedDate] = useState(null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const oneMonthLater = new Date(tomorrow);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log('선택된 날짜:', date);
    };

    const getDateClass = ({ date, view }) => {
        if (view === 'month') {
            const checkDate = new Date(date);
            checkDate.setHours(0, 0, 0, 0);

            if (checkDate <= today) {
                return 'past-date';
            }
            if (checkDate > oneMonthLater) {
                return 'unavailable-date';
            }
            return 'available-date';
        }
        return null;
    };

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            const checkDate = new Date(date);
            checkDate.setHours(0, 0, 0, 0);

            return checkDate <= today || checkDate > oneMonthLater;
        }
        return false;
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    };

    return (
        <>
            <div className={classes.outerBox}>
                {/* 가장큰박스 */}
                <div className={classes.titleBox}>
                    <div className={classes.line1}></div>
                    <h2 className={classes.RTitle}>RESERVATION</h2>
                    <div className={classes.line2}></div>
                </div>
                <div className={classes.innerBox}>
                    {/* 예약에 필요한 상세내용들 들어가는 박스 */}
                    <div>
                        <div className={`${classes["sectionTitle"]} subtitle`}>선택한영화</div>
                        <div className={classes.selectedMovie}>
                            <div className={classes.movieImg}></div>
                            <h2>영화제목</h2>
                            <div>상영시간</div>
                        </div>
                    </div>
                    <div className={classes.box}>
                        <div className={`${classes["sectionTitle"]} subtitle`}>총 예약인원</div>
                        <div className={classes.box}>
                            <PeopleNumber />
                        </div>
                    </div>
                    <div>
                        <div className={`${classes["sectionTitle"]} subtitle`}>상영관선택</div>
                        <div className={classes.box}>
                            <Room />
                        </div>
                    </div>
                    <div className={classes.box}>
                        <div className={`${classes["sectionTitle"]} subtitle`}>날짜선택</div>
                        <div className={`${classes["reserveBox"]} box`}>
                            <div className={classes.reservationInfo}>
                                <h3 className={classes.reserveTitle}>예약안내</h3>
                                <ul>
                                    <li>당일 예약은 불가능합니다.</li>
                                    <li>한 달 이내의 날짜만 선택 가능합니다</li>
                                    <li>또 쓸 말이 있으려나... ?</li>
                                    <li>없으려나..?</li>
                                </ul>
                            </div>
                            <Calendar
                                onChange={handleDateChange}
                                value={selectedDate}
                                minDate={tomorrow}
                                maxDate={oneMonthLater}
                                tileClassName={getDateClass}
                                tileDisabled={tileDisabled}
                                locale="ko-KR"
                                formatDay={(locale, date) => date.getDate()}
                                showNeighboringMonth={false}
                                next2Label={null}
                                prev2Label={null}
                                nextLabel="›"
                                prevLabel="‹"
                            />
                        </div>
                    </div>
                    <div className={classes.box}>
                        <div className={`${classes["sectionTitle"]} subtitle`}>시간선택</div>
                        <div className={classes.box}>
                            {/* <TimeSelect /> */}
                        </div>
                    </div>
                    {/* 선택된 날짜 출력 */}
                    {selectedDate && (
                        <div className={classes.box}>
                            <div className={`${classes["sectionTitle"]} subtitle`}>예약일시</div>
                            <div className={classes.selectedDate}>
                                {formatDate(selectedDate)}
                            </div>
                        </div>
                    )}
                    <div className={classes.box}>
                        <div className={`${classes["sectionTitle"]} subtitle`}>현장결제금액</div>
                        <div className={classes.box}>10,000 원</div>
                    </div>
                </div>
                <div className={classes.btnBox}>
                    <button className={`${classes["reserveBtn"]} btn2`}>RESERVE NOW</button>
                </div>
            </div>
        </>
    );
}

export default Reservation;