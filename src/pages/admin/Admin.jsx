import classes from './Admin.module.css';
import {useEffect, useState} from "react";
import { axiosViewALlReservation} from "../api/axios.js";
import ViewDetails from "../components/viewDetails/ViewDetails.jsx";

function Admin() {


    const [useThisShit, setUseThisShit] = useState([])
    const [selectedReservationId, setSelectedReservationId] = useState(null);

    const handleSelectReservationClick = (reservationId) => {
        setSelectedReservationId(reservationId);
    }


    useEffect(()=>{
        const fetchAllReservation = async () => {
            try{
                const response = await axiosViewALlReservation();
                console.log(response.data.payload);
                setUseThisShit(response.data.payload);
            }catch(error){
                console.log(error);
            }
        }
        fetchAllReservation();
    },[])

    useEffect (()=>{
        const articles = document.querySelectorAll(`.${classes.article}`);
        articles.forEach((el) => {
            el.classList.add(classes.active);
        });
    },[useThisShit])

    // useEffect(()=>{
    //     try{
    //         fetchAllReservation
    //     }
    // })

    return (
        <>
            <div className={classes.wrap}>
                <h1 className={classes.header}>CURRENT RESERVATIONS</h1>
                <div className={classes.gridContainer}>
                    {useThisShit.map((info) => (
                        <article key={info.reservationId} className={classes.article} onClick={() => handleSelectReservationClick(info.reservationId)}>
                            <div className={classes.title} style={{
                                color:
                                    info.statusString === '이용 완료' ? '#8C82784C' : info.statusString === '확정' ? '#32271e' : info.statusString === '취소' ? 'red' : 'transparent'
                            }}>
                                <div style={{
                                    textDecoration: info.statusString === '취소' ? 'line-through' : 'none'
                                }}>{info.date}</div>
                                <div
                                    // style={{
                                    //     color:
                                    //         info.statusString === '이용 완료' ? 'gray' : info.statusString === '확정' ? '#32271e' : info.statusString === '취소' ? 'red' : 'transparent'
                                    // }}
                                >
                                    {info.username}
                                    <span className={classes.statusString}>({info.statusString})</span>
                                </div>
                            </div>

                            <div className={classes.resNum}>
                                <h3>Reservation Id</h3>
                                <p>{info.reservationId}</p>
                            </div>
                            <div className={classes.roomNum}>
                                <h3>Room Name</h3>
                                <p>{info.theaterName}</p>
                            </div>

                            <div className={classes.runTime}>
                                <h3>Run Time</h3>
                                <p>{info.timeUnit}</p>
                            </div>
                            <div className={classes.peopleNum}>
                                <h3>Headcount</h3>
                                <p>{info.numPeople}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {selectedReservationId && (
                <ViewDetails
                    reservationId={selectedReservationId}
                    onClose={() => setSelectedReservationId(null)}
                />
            )}
        </>
    );
}
export default Admin;