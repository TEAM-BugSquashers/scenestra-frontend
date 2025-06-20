import classes from './Header.module.css';
import {useNavigate, useLocation} from "react-router-dom";
import { FaHome, FaSearch, FaPlay, FaUserAlt } from 'react-icons/fa';
import {useState} from "react";


function Header({ toggleMenu, isMenuOpen }) {
    const[click, setClick] = useState(false);
    const navi = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleSearch = () => {
        if (!searchTerm.trim()) return;
        navi(`/search?q=${encodeURIComponent(searchTerm)}`);
    };

    const handleClick = () => {
        setClick(!click);
        console.log(click);
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <a onClick={()=>navi("/")} className={classes.a}>SCENESTRA</a>
            </div>

            <div className={classes.hamBtnWrap}>
                <div></div>

                <div className={classes.rightSection}>

                        <>
                    {/* 검색바 */}
                            <div
                                className={classes.searchWrapper}
                                style={
                                    ["/join", "/login"].includes(location.pathname)
                                        ? { opacity: 0, pointerEvents: 'none' }
                                        : {}
                                }
                            >
                                <div className={`${classes["search_container"]} ${click ? classes.open : ''}`}>
                                    <div className={classes["search_bar"]}>
                                        <input
                                            type="text"
                                            placeholder="영화 제목을 검색하세요"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSearch();
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <button className={classes["search_button"]} onClick={handleClick}>
                                    <FaSearch />
                                </button>
                            </div>
                        </>

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