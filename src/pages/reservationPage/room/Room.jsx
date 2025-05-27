import classes from "./Room.module.css";
import React from "react";

function Room({ selectedRoom, setSelectedRoom}) {
    const handleRoomSelect = (roomId) => {
        setSelectedRoom(roomId);
    }
    const roomData = [
        {id: 1, url: '/roomImg/room1.jpg', name: 'SERENE', peopleNo: '2~3인'},
        {id: 2, url: '/roomImg/room2.jpg', name: 'CELESTIA', peopleNo: '2~3인'},
        {id: 3, url: '/roomImg/room3.jpg', name: 'ASTRAL', peopleNo: '4~5인'},
        {id: 4, url: '/roomImg/room4.jpg', name: 'VERDANT', peopleNo: '8~10인'}
    ];

    return(
        <div className={classes.roomContainer}>
            {roomData.map(room => (
                <div key={room.id} className={classes.rBox}>
                    <div className={classes.rImg} onClick={() => handleRoomSelect(room.id)}>
                        <img src={room.url} alt={room.name} />
                    </div>
                    <div className={classes.innerBox} onClick={() => handleRoomSelect(room.id)}>
                        <div
                            className={`${classes.chkBox} ${selectedRoom === room.id ? classes.checked : ''}`}
                        >
                            {selectedRoom === room.id && <div className={classes.checkMark}>✓</div>}
                        </div>
                        <div className={classes.rName}>
                            {room.name} ({room.peopleNo})
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Room;