import classes from './Login.module.css';
import {useEffect, useState} from "react";
import {axiosLogin} from "../api/axios.js";
import { useNavigate } from 'react-router-dom';

function Login() {
    // login form state
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // current theater image state
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    // theater image array (className)
    const imageClasses = [
        'imgEight',
        'imgThree',
        'imgFive',
        'imgSeven',
        'imgNine',
        'imgEleven',
        'imgOne'
    ];

    // theater image slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % imageClasses.length);
        }, 5000);

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [imageClasses.length]);

    // changing opacity and zIndex of theater images
    const getImageStyle = (index) => {
        return {
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 700 : 700 - ((index + 1) * 10)
        };
    };

    // login form submission handler
    const handleSubmit = () => {
        // console.log('form submitted:', { userId, password, rememberMe });
        axiosLogin(userId, password)
            .then(response => {
                if (response.status === 200) {
                    navigate("/");
                } else {
                    alert(`로그인에 성공했으나, 예상치 못한 응답입니다: ${response.status}`);
                }
            })
            .catch(error => {
                let errorMessage = "로그인 중 오류가 발생했습니다.";
                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                alert(errorMessage);
                console.error('Login error:', error);
            });
    };

    // navigate to user registration page (in new tab)
    const goToJoin = () => {
        window.location.href = '/join';
    };

    // Toggle remember me checkbox, NOT YET CREATED
    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <div className={classes["sectionWrap"]}>
            {/* Section Left */}
            <div className={classes["sectionLeft"]}>

                {/* Theater Images */}
                <div className={classes["imgBox"]}>
                    <img
                        src="./img/8.jpeg"
                        alt=""
                        className={classes["imgEight"]}
                        style={getImageStyle(0)}
                    />
                    <img
                        src="./img/3.jpg"
                        alt=""
                        className={classes["imgThree"]}
                        style={getImageStyle(1)}
                    />
                    <img
                        src="./img/5.jpg"
                        alt=""
                        className={classes["imgFive"]}
                        style={getImageStyle(2)}
                    />
                    <img
                        src="./img/7.jpg"
                        alt=""
                        className={classes["imgSeven"]}
                        style={getImageStyle(3)}
                    />
                    <img
                        src="./img/9.jpeg"
                        alt=""
                        className={classes["imgNine"]}
                        style={getImageStyle(4)}
                    />
                    <img
                        src="./img/11.jpg"
                        alt=""
                        className={classes["imgEleven"]}
                        style={getImageStyle(5)}
                    />
                    <img
                        src="./img/1.jpg"
                        alt=""
                        className={classes["imgOne"]}
                        style={getImageStyle(6)}
                    />
                    {/* Movie Video */}
                    <div className={classes["videoBox"]}>
                        <video
                            src="https://scenestra.s3.ap-northeast-2.amazonaws.com/video/casablanca.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                        ></video>
                    </div>
                </div>
            </div>

            {/* Section Right */}
            <div className={classes["sectionRight"]}>
                {/* Right Content Wrap */}
                <div className={classes["rightContentWrap"]}>
                    {/* Top */}
                    <div className={classes["rightContentWrapTop"]}>
                        <input
                            type="text"
                            placeholder="아이디"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                }
                            }}
                        />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit();
                                }
                            }}
                        />
                        <div
                            className={`${classes["rmbrIdLbl"]} bMainLight`}
                            onClick={toggleRememberMe}
                        >
                            <input
                                type="checkbox"
                                id="rmbrId"
                                checked={rememberMe}
                                onChange={toggleRememberMe}
                                style={{ display: 'none' }}
                            />
                            <div className={classes["chkBx"]}>
                                <div className={classes["chkMk"]} style={rememberMe ? { display: 'block' } : { display: 'none' }}>L</div>
                            </div>
                            아이디 기억하기
                        </div>
                        <button
                            onClick={handleSubmit} className={`bBg bPri`}
                        >
                            LOG IN
                        </button>
                    </div>

                    {/* Bottom */}
                    <div className={classes["rightContentWrapBot"]}>
                        <button>
                            아이디/비밀번호 찾기
                        </button>
                        <button onClick={goToJoin}>
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login
