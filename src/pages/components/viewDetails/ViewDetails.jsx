
import classes from './viewDetails.module.css'
import {useEffect, useState} from "react";
import {axiosViewReservationDeteails} from "../../api/axios.js";

function ViewDetails({ reservationId, onClose }){
    const [reservationData, setReservationData] = useState(null);
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가

    useEffect(() => {
        if (!reservationId) return;

        const fetchReservationData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axiosViewReservationDeteails(reservationId);
                setReservationData(response.data.payload);
                console.log('상세 데이터:', response.data.payload);
            } catch (error) {
                console.log('에러 발생:', error);
                setError('예약 정보를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        }
        fetchReservationData();
    }, [reservationId])

    return(
        <div className={classes.viewPan} onClick={onClose}>
            { !loading && (
            <div className={classes.viewWrap}>
                {/* 닫기 버튼 */}
                <button onClick={onClose} className={classes.closeButton}>
                    ✕
                </button>

                <h3>예약 상세 정보</h3>

                {/*{loading && <p>로딩 중...</p>}*/}
                {/*{error && <p style={{color: 'red'}}>{error}</p>}*/}

                {reservationData && (
                    <div>
                        <p><strong>예약 ID:</strong> {reservationId}</p>
                        <p><strong>날짜:</strong> {reservationData.date}</p>
                        <p><strong>사용자:</strong> {reservationData.username}</p>
                        <p><strong>전화번호:</strong> {reservationData.mobile}</p>
                        <p><strong>시작시간:</strong> {reservationData.startTime}</p>
                        <p><strong>종료시간:</strong> {reservationData.endTime}</p>
                        <p><strong>시간단위(시):</strong> {reservationData.timeUnit}</p>
                        <p><strong>관람객수(명):</strong> {reservationData.numPeople}</p>
                        <p><strong>사용여부:</strong> {reservationData.statusString}</p>
                        <p><strong>영화제목:</strong> {reservationData.movieTitle}</p>
                        <p><strong>상영관 이름:</strong> {reservationData.theaterName}</p>


                    </div>
                )}
            </div>
            )}
        </div>
    )
}

export default ViewDetails;