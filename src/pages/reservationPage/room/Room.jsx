import classes from "./Room.module.css";
import React from "react";

function Room({ selectedRoom, setSelectedRoom, roomData}) {


    const handleRoomSelect = (roomId) => {
        setSelectedRoom(roomId);
    }
    const peopleNo = (name) => {
        switch(name) {
            case 'SERENE':
            case 'CELESTIA':
                return '2~3인';
            case 'ASTRAL':
                return '4~5인';
            case 'VERDANT':
                return '8~10인';
            default:
                return '2~3인';
        }
    };
    return(
        <div className={classes.roomContainer}>
            {roomData.map(room => (
                <div key={room.theaterId} className={classes.rBox}>
                    <div className={classes.rImg} onClick={() => handleRoomSelect(room.theaterId)}>
                        <img src={room.image} alt={room.name} />
                    </div>
                    <div className={classes.innerBox} onClick={() => handleRoomSelect(room.theaterId)}>
                        <div
                            className={`${classes.chkBox} ${selectedRoom === room.theaterId ? classes.checked : ''}`}
                        >
                            {selectedRoom === room.theaterId && <div className={classes.checkMark}>✓</div>}
                        </div>
                        <div className={classes.rName}>
                            {room.name} ({peopleNo(room.name)})
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Room;