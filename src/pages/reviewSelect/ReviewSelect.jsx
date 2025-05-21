import classes from './ReviewSelect.module.css'
import {useNavigate} from "react-router-dom";

function ReviewSelect(){
    const navi = useNavigate();
    return(
        <>
            <div className={classes.wrap}>

                <div className={classes["section_header"]}>
                    <div></div>
                    <h2 className={classes.h2}>THEATER GUIDE</h2>
                    <div></div>
                </div>

                <div className={classes.nav}>
                    <a onClick={()=> navi("/Review")} className={classes.a}>
                        {/* <img src="" alt="A관" /> */}
                        <div>
                            <div></div>
                            <span>상영관이름</span>
                        </div>
                    </a>
                    <a onClick={()=> navi("/Review")} className={classes.a}>
                        {/* <img src="" alt="B관" /> */}
                        <div>
                            <div></div>
                            <span>상영관이름</span>
                        </div>
                    </a>
                    <a onClick={()=> navi("/Review")} className={classes.a}>
                        {/* <img src="" alt="C관" /> */}
                        <div>
                            <div></div>
                            <span>상영관이름</span>
                        </div>
                    </a>
                    <a onClick={()=> navi("/Review")} className={classes.a}>
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