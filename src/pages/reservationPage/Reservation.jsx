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

    // 현재 보고 있는 달 상태 추가
    const [activeStartDate, setActiveStartDate] = useState(new Date());

    const formatDateForAPI = (date) => {
        // 로컬 시간대 기준으로 YYYY-MM-DD 형식 생성
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatYearMonthForAPI = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    };
//  문자열을 로컬 Date 객체로 변환 지금은 안써서 주석처리
//     const parseLocalDate = (dateString) => {
//         const [year, month, day] = dateString.split('-').map(Number);
//         return new Date(year, month - 1, day); // month는 0부터 시작
//     };

    // 방과 영화가 선택되면 예약 가능한 날짜 가져오기
    useEffect(() => {
        if (selectedRoom && selectedMovie) {
            const fetchAvailableDates = async () => {
                try {
                    const currentDate = new Date();
                    const yearMonth = formatYearMonthForAPI(currentDate);

                    const response = await axiosAvailableDates(selectedRoom, selectedMovie.movieId, yearMonth);
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

    // 달이 변경될 때 해당 월의 데이터 가져오기
    useEffect(() => {
        if (selectedRoom && selectedMovie && activeStartDate) {
            const fetchMonthAvailableDates = async () => {
                try {
                    const yearMonth = formatYearMonthForAPI(activeStartDate);

                    const response = await axiosAvailableDates(selectedRoom, selectedMovie.movieId, yearMonth);

                    // 기존 데이터와 새로운 데이터를 병합
                    setAvailableDates(prev => ({
                        ...prev,
                        ...response.data.payload
                    }));
                } catch (error) {
                    console.error("Error fetching availableDates for month: ", error);
                }
            }
            fetchMonthAvailableDates();
        }
    }, [selectedRoom, selectedMovie, activeStartDate]);

    // 방 영화 날짜가 선택되면 예약가능한 시간 가져오기
    useEffect(() => {
        if(selectedRoom && selectedMovie && selectedDate) {
            const fetchAvailableTimes = async () => {
                try {
                    const formattedDate = formatDateForAPI(selectedDate); // 수정된 함수 사용
                    const response = await axiosAvailableTimes(selectedRoom, selectedMovie.movieId, formattedDate);

                    setAvailableTimes(response.data.payload.availableTimes);
                    setTimeUnit(response.data.payload.timeUnit);
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

    const calculateTotalPrice = (roomPrice, timeUnit) => {
        if(!roomPrice || !timeUnit || roomPrice <= 0 || timeUnit <=0 ){
            return 0;
        }
        return roomPrice * timeUnit;
    };
    const formatPrice = (price) => {
        if(price === 0 ) return "0원";
        return price.toLocaleString('ko-KR') + "원";
    };
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        if (selectedRoom && timeUnit && roomData.length > 0) {
            const selectedTheater = roomData.find(room => room.theaterId === selectedRoom);
            if (selectedTheater && selectedTheater.price) {
                const calculatedPrice = calculateTotalPrice(selectedTheater.price, timeUnit);
                setTotalPrice(calculatedPrice);
                console.log(`Price calculation: ${selectedTheater.price} * ${timeUnit} = ${calculatedPrice}`);
            } else {
                setTotalPrice(0);
            }
        } else {
            setTotalPrice(0);
        }
    }, [selectedRoom, timeUnit, roomData]);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const isRoomStepActive = selectedPeople !== null;
    const isDateStepActive = selectedPeople !== null && selectedRoom !== null;
    const isTimeStepActive = selectedPeople !== null && selectedRoom !== null && selectedDate !== null;
    const isReserveButtonActive = selectedPeople !== null && selectedRoom !== null && selectedDate !== null && selectedTimeInfo !== null;

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
        setAvailableDates({});
    };

    const handlePeopleSelect = (peopleCount) => {
        setSelectedPeople(peopleCount);
        setSelectedRoom(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedTimeInfo(null);
    };

    const selectedTheater = roomData.find(room => room.theaterId === selectedRoom);

    const getDateClass = ({ date, view }) => {
        if (view === 'month') {
            const dateString = formatDateForAPI(date); // 수정된 함수 사용

            if (Object.keys(availableDates).length > 0) {
                if (availableDates[dateString] === true) {
                    return 'available-date';
                } else if (availableDates[dateString] === false) {
                    return 'unavailable-date';
                }
            }
            return 'unavailable-date';
        }
        return null;
    };

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            const dateString = formatDateForAPI(date); // 수정된 함수 사용

            if (Object.keys(availableDates).length > 0) {
                return availableDates[dateString] !== true;
            }

            // API 데이터가 없으면 모든 날짜 비활성화
            return true;
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

    // 상영관이용 최종금액


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
                                    <li>상영관별로 예약 가능한 날짜가 다릅니다</li>
                                    <li>회색으로 표시된 날짜는 예약이 불가능한 날입니다</li>
                                    <li>파란색으로 표시된 날짜만 선택 가능합니다</li>
                                </ul>
                            </div>
                            <Calendar
                                onChange={handleDateChange}
                                value={selectedDate}
                                tileClassName={getDateClass}
                                tileDisabled={tileDisabled}
                                locale="ko-KR"
                                formatDay={(locale, date) => date.getDate()}
                                showNeighboringMonth={false}
                                next2Label={null}
                                prev2Label={null}
                                nextLabel="›"
                                prevLabel="‹"
                                onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
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
                        <div className={classes.box}>
                            {totalPrice > 0 ? formatPrice(totalPrice) : "0 원" }
                        </div>
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
                        roomData={selectedTheater}
                        totalPrice={totalPrice}
                    />
                </div>
            </div>
        </>
    );
}

export default Reservation;