
import classes from './Sidebar.module.css';
import {axiosLogout} from "../../api/axios.js";
import {useNavigate,useLocation} from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) {
  const navi = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    axiosLogout().then(res => {
      if (res.status === 200) {
        alert("로그아웃 되었습니다.");
        navi("/login")
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
            {!["/join", "/login"].includes(location.pathname) && (
              <>
                <li>
                  <a onClick={()=> {navi("/");
                    toggleSidebar();}}>HOME</a>
                </li>
                <li>
                  <a onClick={()=> {navi("/seeAllMovie");
                    toggleSidebar();}}>BROWSE MOVIES</a>
                </li>
                <li>
                  <a onClick={()=> {navi("/myPage"); toggleSidebar();}}>MY PAGE</a>
                </li>
              </>
            )}
            <li>
              <a onClick={()=> {navi("/aboutUs");
              toggleSidebar();}}>ABOUT US</a>
            </li>
            {!["/join", "/login"].includes(location.pathname) && (
              <li>
                <a onClick={()=> {navi("/roomSelect");
                toggleSidebar();}}>REVIEW</a>
              </li>
            )}
          </ul>
          <button className={`${classes.logout} ${classes.btn2}`} onClick={()=>{handleLogout(); toggleSidebar();}}>LOGOUT</button>
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