import classes from './ReviewSelect.module.css'
import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'
import { useState } from 'react';

function ReviewSelect(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
    };

    return(
        <>
            <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            <Sidebar isOpen={isMenuOpen} toggleSidebar={toggleMenu} />

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