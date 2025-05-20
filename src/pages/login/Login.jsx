import './Login.css'
import {useEffect, useState} from "react";
import {axiosLogin} from "../api/axios.js";
import { useNavigate } from 'react-router-dom';

function Login() {
    // State to track current image
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    // Login form state
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // Images array with their classNames for reference
    const imageClasses = [
        'imgEight',
        'imgOne',
        'imgThree',
        'imgFive',
        'imgSeven',
        'imgNine',
        'imgEleven'
    ];

    // Effect for image rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % imageClasses.length);
        }, 5000);

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [imageClasses.length]);

    // Form submission handler
    const handleSubmit = () => {
        console.log('Form submitted:', { userId, password, rememberMe });
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
        // Add your login logic here
    };

    // Get dynamic styles for images based on current index
    const getImageStyle = (index) => {
        return {
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 700 : 700 - ((index + 1) * 10)
        };
    };

    // Toggle remember me checkbox
    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <div className="sectionWrap">
            {/* Section Left */}
            <div className="sectionLeft">

                {/* Theater Images */}
                <div className="imgBox">
                    <img
                        src="./img/8.jpeg"
                        alt=""
                        className="imgEight"
                        style={getImageStyle(0)}
                    />
                    <img
                        src="./img/1.jpg"
                        alt=""
                        className="imgOne"
                        style={getImageStyle(1)}
                    />
                    <img
                        src="./img/3.jpg"
                        alt=""
                        className="imgThree"
                        style={getImageStyle(2)}
                    />
                    <img
                        src="./img/5.jpg"
                        alt=""
                        className="imgFive"
                        style={getImageStyle(3)}
                    />
                    <img
                        src="./img/7.jpg"
                        alt=""
                        className="imgSeven"
                        style={getImageStyle(4)}
                    />
                    <img
                        src="./img/9.jpeg"
                        alt=""
                        className="imgNine"
                        style={getImageStyle(5)}
                    />
                    <img
                        src="./img/11.jpg"
                        alt=""
                        className="imgEleven"
                        style={getImageStyle(6)}
                    />
                    {/* Movie Video */}
                    <div className="videoBox">
                        <video
                            src="./img/casablanca.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                        ></video>
                    </div>
                </div>
            </div>

            {/* Section Right */}
            <div className="sectionRight">
                {/* Right Content Wrap */}
                <div className="rightContentWrap">
                    {/* Top */}
                    <div className="rightContentWrapTop">
                        <input
                            type="text"
                            placeholder="아이디"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div
                            className="rmbrIdLbl"
                            onClick={toggleRememberMe}
                        >
                            <input
                                type="checkbox"
                                id="rmbrId"
                                checked={rememberMe}
                                onChange={toggleRememberMe}
                                style={{ display: 'none' }}
                            />
                            <div className="chkBx">
                                <div className="chkMk" style={rememberMe ? { display: 'block' } : { display: 'none' }}>L</div>
                            </div>
                            아이디 기억하기
                        </div>
                        <button
                            onClick={handleSubmit}
                        >
                            LOG IN
                        </button>
                    </div>

                    {/* Bottom */}
                    <div className="rightContentWrapBot">
                        <button>
                            아이디/비밀번호 찾기
                        </button>
                        <button>
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login
