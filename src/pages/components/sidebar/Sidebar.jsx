
import classes from './Sidebar.module.css';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      <div className={`${classes.sidebar} ${isOpen ? classes.open : ''}`}>
        <nav className={classes.nav}>
          <ul>
            <li><a href="/">My Page</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Review</a></li>
          </ul>
          <button className={`${classes.logout} ${classes.btn2}`}>Logout</button>
        </nav>
      </div>
      
      {isOpen && <div 
        className={classes.background} 
        onClick={toggleSidebar}
      ></div>}
    </>
  );
}

export default Sidebar;