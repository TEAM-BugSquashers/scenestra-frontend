
import classes from './Header.module.css';
import {useNavigate} from "react-router-dom";



function Header({ toggleMenu, isMenuOpen }) {

    const navi = useNavigate();

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <a onClick={()=>navi("/")} className={classes.a}>SCENESTRA</a>
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
    </header>
  );
}

export default Header;