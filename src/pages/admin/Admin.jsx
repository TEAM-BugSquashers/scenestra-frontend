import classes from './Admin.module.css';


function Admin() {
    const customerInfo=[
        {
            date:"2025-10-30",
            name:"asdf",
            resNum:"<EMAIL>",
            roomNum:"1234567890",
            runTime:"10:00",
            peopleNum: "4",
        },
        {
            date:"2025-11-30",
            name:"asdf2",
            resNum:"<EMAIL>",
            roomNum:"25",
            runTime:"12:00",
            peopleNum: "1",
        },
        {
            date:"2002-01-30",
            name:"asdf3",
            resNum:"<EMAIL>",
            roomNum:"2513",
            runTime:"17:00",
            peopleNum: "3",
        },
        {
            date:"2002-01-30",
            name:"asdf3",
            resNum:"<EMAIL>",
            roomNum:"2513",
            runTime:"17:00",
            peopleNum: "3",
        }]
    return (
        <>
            <div className={classes.wrap}>
                <h1 className={classes.header}>예약관리 현황</h1>
                <div className={classes.gridContainer}>
                    {customerInfo.map((info, index) => (
                        <section key={index} className={classes.section}>
                            <article className={classes.article}>
                                <div className={classes.title}>
                                    <div>{info.date}</div>
                                    <div>{info.name}</div>
                                </div>

                                <div className={classes.resNum}>
                                    <h3>resNum</h3>
                                    <p>{info.resNum}</p>
                                </div>
                                <div className={classes.roomNum}>
                                    <h3>roomNum</h3>
                                    <p>{info.roomNum}</p>
                                </div>

                                <div className={classes.runTime}>
                                    <h3>runTime</h3>
                                    <p>{info.runTime}</p>
                                </div>
                                <div className={classes.peopleNum}>
                                    <h3>peopleNum</h3>
                                    <p>{info.peopleNum}</p>
                                </div>
                            </article>
                        </section>
                    ))}
                </div>
            </div>
        </>
    );
}
export default Admin;