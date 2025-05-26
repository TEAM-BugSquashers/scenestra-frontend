import classes from './Header.module.css';
import {useNavigate} from "react-router-dom";
import { FaHome, FaSearch, FaPlay, FaUserAlt } from 'react-icons/fa';
import {useState} from "react";


function Header({ toggleMenu, isMenuOpen }) {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const[click, setClick] = useState(false);
    const handleClick = () => {
        setClick(!click);
        console.log(click);
    }

    const navi = useNavigate();

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <a onClick={()=>navi("/")} className={classes.a}>SCENESTRA</a>
            </div>

            <div className={classes.hamBtnWrap}>
                <div></div>

                <div className={classes.rightSection}>
                    {/* 검색바 */}
                    <div className={classes.searchWrapper}>
                        <div className={`${classes["search_container"]} ${click ? classes.open : ''}`}>
                            <div className={classes["search_bar"]}>
                                <input
                                    type="text"
                                    placeholder="영화 제목을 검색하세요"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        <button className={classes["search_button"]} onClick={handleClick}>
                            <FaSearch />
                        </button>
                    </div>

                    <button
                        className={`${classes.hamburgerBtn} ${classes.btn2} ${isMenuOpen ? classes.open : ''}`}
                        onClick={toggleMenu}
                        aria-label="메뉴"
                    >
                        <span className={classes.hamburgerLine}></span>
                        <span className={classes.hamburgerLine}></span>
                        <span className={classes.hamburgerLine}></span>
                    </button>

                </div>
            </div>
        </header>
    );
}

export default Header;