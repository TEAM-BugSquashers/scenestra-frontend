import classes from './Reservation.module.css';
import Calendar from 'react-calendar';
import React, {useEffect, useState} from 'react';
import Room from './room/Room.jsx';
import TimeSelect from "./timeSelect/TimeSelect.jsx";
import PeopleNumber from "./peopleNo/PeopleNumber.jsx";
import 'react-calendar/dist/Calendar.css';
import ResultPopUp from "./resultPopUp/ResultPopUp.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {axiosAvailableTimes, axiosRoom} from "../api/axios.js";


function Reservation() {

    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedTimeInfo, setSelectedTimeInfo] = useState(null);
    // 리액트캘린더 이벤트와 관련된 부분
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const [ selectedMovie, setSelectedMovie ] = useState(null);
    const [roomData, setRoomData] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axiosRoom();
                setRoomData(response.data.payload)
            } catch (error) {
                console.error("Error fetching roomData: ", error);
            }
        };

        fetchRoomData();
    }, []);

    useEffect(() => {
        if (selectedRoom && selectedMovie) {
            const fetchAvailableTimes = async () => {
                try {
                    const currentDate = new Date();
                    const yearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

                    console.log("전송할 데이터:");
                    console.log("selectedRoom:", selectedRoom);
                    console.log("selectedMovie.movieId:", selectedMovie.movieId);
                    console.log("yearMonth:", yearMonth);


                    const response = await axiosAvailableTimes(selectedRoom, selectedMovie.movieId, yearMonth);
                    console.log("AvailableTimes: ", response.data);
                } catch (error) {
                    console.error("Error fetching availabletimes: ", error);
                }
            }
            fetchAvailableTimes();
        }
    }, [selectedRoom, selectedMovie]);


    useEffect(()=> {
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
    // 상영관 금액 가져오기


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
                                    <li>또 쓸 말이 있으려나... ?</li>
                                    <li>없으려나..?</li>
                                    <li>이 칸을 그대로 써야하나 말아야하나</li>
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
                                onTimeSelect={(timeInfo) => {
                                    setSelectedTimeInfo(timeInfo);
                                }}
                             />
                        </div>
                    </div>
                    {/* 선택된 날짜 시간 출력 */}
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