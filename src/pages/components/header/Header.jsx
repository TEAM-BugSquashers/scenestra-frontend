
import classes from './Header.module.css';

function Header({ toggleMenu, isMenuOpen }) {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <a href="#">SCENESTRA</a>
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