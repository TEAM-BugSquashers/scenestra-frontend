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

                <div className={classes.nav}>
                    <a href="">
                        {/* <img src="" alt="A관" /> */}
                        <div>
                            <div></div>
                            <span>상영관이름</span>
                        </div>
                    </a>
                    <a href="">
                        {/* <img src="" alt="B관" /> */}
                        <div>
                            <div></div>
                            <span>상영관이름</span>
                        </div>
                    </a>
                    <a href="">
                        {/* <img src="" alt="C관" /> */}
                        <div>
                            <div></div>
                            <span>상영관이름</span>
                        </div>
                    </a>
                    <a href="">
                        {/* <img src="" alt="D관" /> */}
                        <div>
                            <div></div>
                            <span>상영관이름</span>
                        </div>
                    </a>
                </div>
            </div>

            
        </>
    );
}
export default ReviewSelect;