import classes from './Reservation.module.css';
import Calendar from 'react-calendar';
import React, {useEffect, useState} from 'react';
import Room from './room/Room.jsx';
import TimeSelect from "./timeSelect/TimeSelect.jsx";
import PeopleNumber from "./peopleNo/PeopleNumber.jsx";
import 'react-calendar/dist/Calendar.css';
import ResultPopUp from "./resultPopUp/ResultPopUp.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {axiosAvailableDates, axiosAvailableTimes, axiosCapacity, axiosRoom} from "../api/axios.js";

function Reservation() {
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTimeInfo, setSelectedTimeInfo] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [roomData, setRoomData] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState(null);
    const [capacityData, setCapacityData] = useState([]);
    const [availableDates, setAvailableDates] = useState({}); // 예약 가능한 날짜 데이터
    const [availableTimes, setAvailableTimes] = useState({});
    const [timeUnit, setTimeUnit] = useState(null); // timeUnit 추가

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axiosRoom();
                setRoomData(response.data.payload);
            } catch (error) {
                console.error("Error fetching roomData: ", error);
            }
        };
        fetchRoomData();
    }, []);

    // 인원수 선택 시 필터된 데이터 가져오기
    useEffect(() => {
        if (!selectedPeople || selectedPeople === 0) {
            return;
        }

        const fetchCapacity = async () => {
            try {
                const response = await axiosCapacity(selectedPeople);
                console.log(response.data.payload);
                setCapacityData(response.data.payload);
                setRoomData(response.data.payload);
            } catch (error) {
                console.error("Error peopleSelected ", error);
            }
        };

        fetchCapacity();
    }, [selectedPeople]);

    // 방과 영화가 선택되면 예약 가능한 날짜 가져오기
    useEffect(() => {
        if (selectedRoom && selectedMovie) {
            const fetchAvailableDates = async () => {
                try {
                    const currentDate = new Date();
                    const yearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

                    const response = await axiosAvailableDates(selectedRoom, selectedMovie.movieId, yearMonth);
                    console.log("AvailableDates: ", response.data.payload);
                    setAvailableDates(response.data.payload);
                } catch (error) {
                    console.error("Error fetching availableDates: ", error);
                    setAvailableDates({});
                }
            }
            fetchAvailableDates();
        } else {
            setAvailableDates({});
        }
    }, [selectedRoom, selectedMovie]);

    // 방 영화 날짜가 선택되면 예약가능한 시간 가져오기
    useEffect(() => {
        if(selectedRoom && selectedMovie && selectedDate) {
            const fetchAvailableTimes = async () => {
                try {
                    const formattedDate = selectedDate.toISOString().split('T')[0]; // "2025-05-30"
                    const response = await axiosAvailableTimes(selectedRoom, selectedMovie.movieId, formattedDate);

                    console.log("AvailableTimes: ", response.data.payload.availableTimes);
                    console.log("TimeUnit: ", response.data.payload.timeUnit);

                    setAvailableTimes(response.data.payload.availableTimes);
                    setTimeUnit(response.data.payload.timeUnit); // timeUnit 저장
                } catch (error) {
                    console.error("Error fetching available times: ", error);
                    setAvailableTimes([]);
                    setTimeUnit(null);
                }
            };
            fetchAvailableTimes();
        } else {
            setAvailableTimes([]);
            setTimeUnit(null);
        }
    }, [selectedRoom, selectedMovie, selectedDate]);

    useEffect(() => {
        if(location.state?.selectedMovie) {
            setSelectedMovie(location.state.selectedMovie);
        } else {
            navigate('/');
        }
    }, [location.state, navigate]);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const isRoomStepActive = selectedPeople !== null;
    const isDateStepActive = selectedPeople !== null && selectedRoom !== null;
    const isTimeStepActive = selectedPeople !== null && selectedRoom !== null && selectedDate !== null;
    const isReserveButtonActive = selectedPeople !== null && selectedRoom !== null && selectedDate !== null && selectedTimeInfo !== null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const oneMonthLater = new Date(tomorrow);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
        setSelectedTimeInfo(null);
    };

    const handleRoomSelect = (roomId) => {
        setSelectedRoom(roomId);
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedTimeInfo(null);
    };

    const handlePeopleSelect = (peopleCount) => {
        setSelectedPeople(peopleCount);
        setSelectedRoom(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedTimeInfo(null);
    };

    // 날짜별 스타일 클래스 결정
    const getDateClass = ({ date, view }) => {
        if (view === 'month') {
            const checkDate = new Date(date);
            checkDate.setHours(0, 0, 0, 0);

            // 과거 날짜
            if (checkDate <= today) {
                return 'past-date';
            }

            // 한 달 이후 날짜
            if (checkDate > oneMonthLater) {
                return 'unavailable-date';
            }

            // API에서 받은 예약 가능 여부 확인
            const dateString = checkDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식

            if (Object.keys(availableDates).length > 0) {
                if (availableDates[dateString] === true) {
                    return 'available-date';
                } else if (availableDates[dateString] === false) {
                    return 'unavailable-date';
                }
            }

            // 기본적으로 예약 가능한 날짜로 표시 (API 데이터가 없을 때)
            return 'available-date';
        }
        return null;
    };

    // 날짜 비활성화 여부 결정
    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            const checkDate = new Date(date);
            checkDate.setHours(0, 0, 0, 0);

            // 과거 날짜나 한 달 이후는 항상 비활성화
            if (checkDate <= today || checkDate > oneMonthLater) {
                return true;
            }

            // API에서 받은 예약 가능 여부 확인
            const dateString = checkDate.toISOString().split('T')[0];

            if (Object.keys(availableDates).length > 0) {
                return availableDates[dateString] === false;
            }

            return false; // API 데이터가 없으면 활성화
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

    if (!selectedMovie) {
        return (
            <div className={classes.outerBox}>
                <div className={classes.titleBox}>
                    <div className={classes.line1}></div>
                    <h2 className={classes.RTitle}>RESERVATION</h2>
                    <div className={classes.line2}></div>
                </div>
                <div className={classes.innerBox}>
                    <div>영화를 먼저 선택해주세요.</div>
                    <button onClick={() => navigate('/')} className="btn2">
                        영화 선택하러 가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={classes.outerBox}>
                <div className={classes.titleBox}>
                    <div className={classes.line1}></div>
                    <h2 className={classes.RTitle}>RESERVATION</h2>
                    <div className={classes.line2}></div>
                </div>
                <div className={classes.innerBox}>
                    <div>
                        <div className={`${classes["sectionTitle"]} subtitle`}>선택한영화</div>
                        <div className={classes.selectedMovie}>
                            <div className={classes.movieImg}><img src={selectedMovie.poster} alt={selectedMovie.title} /></div>
                            <div className={classes.movieDesc}>
                                <h2>{selectedMovie.title}</h2>
                                <p>감독: {selectedMovie.director}</p>
                                <p>장르: {selectedMovie.genreNames}</p>
                                <p>상영시간: {selectedMovie.showTime} 분</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.box}>
                        <div className={`${classes["sectionTitle"]} subtitle`}>총 예약인원</div>
                        <div className={classes.box}>
                            <PeopleNumber
                                selectedPeople={selectedPeople}
                                setSelectedPeople={handlePeopleSelect}
                            />
                        </div>
                    </div>
                    <div className={`${classes.box} ${!isRoomStepActive ? classes.disabled : ''}`}>
                        <div className={`${classes["sectionTitle"]} subtitle`}>상영관선택</div>
                        <div className={classes.box}>
                            <Room
                                selectedRoom={selectedRoom}
                                setSelectedRoom={handleRoomSelect}
                                roomData={roomData}
                                selectedPeople={selectedPeople}
                            />
                        </div>
                    </div>
                    <div className={`${classes.box} ${!isDateStepActive ? classes.disabled : ''}`}>
                        <div className={`${classes["sectionTitle"]} subtitle`}>날짜선택</div>
                        <div className={`${classes["reserveBox"]} box`}>
                            <div className={classes.reservationInfo}>
                                <h3 className={classes.reserveTitle}>예약안내</h3>
                                <ul>
                                    <li>당일 예약은 불가능합니다.</li>
                                    <li>한 달 이내의 날짜만 선택 가능합니다</li>
                                    <li>상영관별로 예약 가능한 날짜가 다릅니다</li>
                                    <li>회색으로 표시된 날짜는 예약이 불가능한 날입니다</li>
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
                    <div className={`${classes.box} ${!isTimeStepActive ? classes.disabled : ''}`}>
                        <div className={`${classes["sectionTitle"]} subtitle`}>시간선택</div>
                        <div className={classes.box}>
                            <TimeSelect
                                movieDuration={selectedMovie.showTime}
                                selectedTime={selectedTime}
                                setSelectedTime={setSelectedTime}
                                availableTimes={availableTimes}
                                timeUnit={timeUnit}
                                onTimeSelect={(timeInfo) => {
                                    setSelectedTimeInfo(timeInfo);
                                }}
                            />
                        </div>
                    </div>
                    {selectedDate && (
                        <div className={classes.box}>
                            <div className={`${classes["sectionTitle"]} subtitle`}>예약일시</div>
                            <div>
                                {formatDate(selectedDate)}
                                {selectedTimeInfo && (
                                    <div>
                                        선택시간: {selectedTimeInfo.startTime} ~ {selectedTimeInfo.endTime}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className={classes.box}>
                        <div className={`${classes["sectionTitle"]} subtitle`}>현장결제금액</div>
                        <div className={classes.box}>10,000 원</div>
                    </div>
                </div>
                <div className={classes.btnBox}>
                    <button className={`${classes["reserveBtn"]} btn2 ${!isReserveButtonActive ? classes.disabledbtn : ''}`}
                            onClick={openPopup}>
                        RESERVE NOW
                    </button>
                    <ResultPopUp
                        isOpen={isPopupOpen}
                        onClose={closePopup}
                        reservationData={selectedDate}
                        timeInfo={selectedTimeInfo}
                        movieInfo={selectedMovie}
                    />
                </div>
            </div>
        </>
    );
}

export default Reservation;