import './Login.css'
import {useEffect, useState} from "react";

function Login() {
// State to track current image
    const [currentIndex, setCurrentIndex] = useState(0);

    // Image data array with their specific properties
    const imageData = [
        {
            src: "./img/8.jpeg",
            className: "imgEight",
            width: "110%",
            transform: "translate(-50%, -46.5%)"
        },
        {
            src: "./img/1.jpg",
            className: "imgOne",
            width: "116%",
            transform: "translate(-50.3%, -49.7%)"
        },
        {
            src: "./img/3.jpg",
            className: "imgThree",
            width: "102%",
            transform: "translate(-49.8%, -49%)"
        },
        {
            src: "./img/5.jpg",
            className: "imgFive",
            width: "132%",
            transform: "translate(-49.4%, -45%)"
        },
        {
            src: "./img/7.jpg",
            className: "imgSeven",
            width: "160%",
            transform: "translate(-50.4%, -50.3%)"
        },
        {
            src: "./img/9.jpeg",
            className: "imgNine",
            width: "140%",
            transform: "translate(-50%, -45.55%)"
        },
        {
            src: "./img/11.jpg",
            className: "imgEleven",
            width: "165%",
            transform: "translate(-48.45%, -53.6%)"
        }
    ];

    // Login form state
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // Effect for image rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % imageData.length);
        }, 5000);

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [imageData.length]);

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { userId, password, rememberMe });
        // Add your login logic here
    };

    // CSS styles as React objects
    const styles = {
        // Font face is included in the head of the HTML document
        body: {
            margin: 0,
            backgroundColor: '#32271e',
            color: '#ebdfce',
            fontFamily: "'Pretendard-Regular', sans-serif",
        },
        sectionWrap: {
            display: 'flex',
        },
        sectionLeft: {
            width: '70%',
            height: '100vh',
            position: 'relative',
        },
        sectionRight: {
            width: '30%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        videoBox: {
            width: '40%',
            overflow: 'hidden',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 800,
        },
        video: {
            width: '100%',
        },
        imgBox: {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
        },
        rightContentWrap: {
            width: 'calc(100% - 120px)',
        },
        rightContentWrapTop: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
        },
        rightContentWrapBot: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        input: {
            width: '100%',
            height: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#b2a69b',
            padding: '10px',
            border: '1px solid',
            borderRadius: '7px',
            boxSizing: 'border-box',
            outline: 'none',
        },
        rmbrIdLbl: {
            fontSize: '13px',
            color: '#b2a69b',
            opacity: 0.6,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
        },
        chkBx: (isChecked) => ({
            width: '15px',
            height: '15px',
            backgroundColor: isChecked ? '#b2a69b' : 'rgba(255, 255, 255, 0.1)',
            color: '#b2a69b',
            border: '1px solid',
            borderRadius: '3px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
        }),
        chkMk: {
            fontSize: '15px',
            transform: 'rotateY(180deg) rotateZ(-45deg)',
            color: '#32271e',
        },
        loginButton: {
            width: '100%',
            height: '40px',
            backgroundColor: '#32271e',
            color: '#b2a69b',
            fontFamily: '"Noto Serif KR", serif',
            fontWeight: 500,
            marginTop: '10px',
            padding: '0px',
            border: '1px solid',
            borderRadius: '7px',
            boxSizing: 'border-box',
            lineHeight: '40px',
            textAlign: 'center',
            cursor: 'pointer',
        },
        utilityButton: {
            backgroundColor: 'transparent',
            color: '#b2a69b',
            fontFamily: "'Pretendard-Regular', sans-serif",
            opacity: 0.6,
            border: 'none',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.body}>
            <div style={styles.sectionWrap}>
                {/* Section Left */}
                <div style={styles.sectionLeft}>
                    {/* Movie Video */}
                    <div style={styles.videoBox}>
                        <video
                            src="./img/casablanca.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={styles.video}
                        ></video>
                    </div>

                    {/* Theater Images */}
                    <div style={styles.imgBox}>
                        {imageData.map((image, index) => (
                            <img
                                key={image.className}
                                src={image.src}
                                alt=""
                                className={image.className}
                                style={{
                                    width: image.width,
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: image.transform,
                                    opacity: index === currentIndex ? 1 : 0,
                                    zIndex: index === currentIndex ? 700 : 700 - ((index + 1) * 10),
                                    transition: 'opacity 1s ease-in-out',
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Section Right */}
                <div style={styles.sectionRight}>
                    {/* Right Content Wrap */}
                    <div style={styles.rightContentWrap}>
                        {/* Top */}
                        <form
                            style={styles.rightContentWrapTop}
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                placeholder="아이디"
                                style={styles.input}
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="비밀번호"
                                style={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div
                                style={styles.rmbrIdLbl}
                                onClick={() => setRememberMe(!rememberMe)}
                            >
                                <div style={styles.chkBx(rememberMe)}>
                                    {rememberMe && <div style={styles.chkMk}>L</div>}
                                </div>
                                아이디 기억하기
                            </div>
                            <button
                                type="submit"
                                style={styles.loginButton}
                            >
                                LOG IN
                            </button>
                        </form>

                        {/* Bottom */}
                        <div style={styles.rightContentWrapBot}>
                            <button style={styles.utilityButton}>
                                아이디/비밀번호 찾기
                            </button>
                            <button style={styles.utilityButton}>
                                회원가입
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login
