
import classes from './Sidebar.module.css';
import {axiosLogout} from "../../api/axios.js";
import {Navigate, useNavigate} from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    axiosLogout().then(res => {
      if (res.status === 200) {
        alert("로그아웃 되었습니다.");
        navigate("/login")
      }
    }).catch(err => {
      alert(err.message);
    });

  };
  return (
    <>
      <div className={`${classes.sidebar} ${isOpen ? classes.open : ''}`}>
        <nav className={classes.nav}>
          <ul>
            <li><a href="/">My Page</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Review</a></li>
          </ul>
          <button className={classes.logout} onClick={()=>{handleLogout()}}>Logout</button>
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