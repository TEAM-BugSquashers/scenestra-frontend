
import classes from './Header.module.css';

function Header({ toggleMenu, isMenuOpen }) {
  return (
    <header>
      <div className={classes.logo}>
        <a href="#">SCENESTRA</a>
      </div>
      <button 
        className={`${classes.hamburgerBtn} ${isMenuOpen ? classes.open : ''}`}
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