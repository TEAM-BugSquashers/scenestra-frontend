import classes from './ReviewSelect.module.css'

function ReviewSelect(){

    return(
        <>
            <div className={classes.wrap}>

                <div className={classes["section_header"]}>
                    <div></div>
                    <h2>THEATER GUIDE</h2>
                    <div></div>
                </div>

                <nav>
                    <a href="Room.html">
                        {/* <img src="" alt="A관" /> */}
                        <div>
                            <div></div>
                            <span>상영관이름</span>
                        </div>
                    </a>
                    <a href="Room.html">
                        {/* <img src="" alt="B관" /> */}
                        <div>
                            <div></div>
                            <span>상영관이름</span>
                        </div>
                    </a>
                    <a href="Room.html">
                        {/* <img src="" alt="C관" /> */}
                        <div>
                            <div></div>
                            <span>상영관이름</span>
                        </div>
                    </a>
                    <a href="Room.html">
                        {/* <img src="" alt="D관" /> */}
                        <div>
                            <div></div>
                            <span>상영관이름</span>
                        </div>
                    </a>
                </nav>
            </div>

            
        </>
    );
}
export default ReviewSelect;