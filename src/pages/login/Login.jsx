import './Login.css'
import {useEffect, useState} from "react";

function Login() {
// State to track which image should be visible (the rest will be faded out)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Images data with their respective classNames and positions
    const imagesData = [
        {
            src: "./img/8.jpeg",
            alt: "",
            className: "imgEight",
            style: {
                width: '110%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -46.5%)',
                transition: 'opacity 1s ease-in-out',
            }
        },
        {
            src: "./img/1.jpg",
            alt: "",
            className: "imgOne",
            style: {
                width: '115%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -49.7%)',
                transition: 'opacity 1s ease-in-out',
            }
        },
        {
            src: "./img/3.jpg",
            alt: "",
            className: "imgThree",
            style: {
                width: '102%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-49.8%, -49%)',
                transition: 'opacity 1s ease-in-out',
            }
        },
        {
            src: "./img/5.jpg",
            alt: "",
            className: "imgFive",
            style: {
                width: '132%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-49.4%, -45%)',
                transition: 'opacity 1s ease-in-out',
            }
        },
        {
            src: "./img/7.jpg",
            alt: "",
            className: "imgSeven",
            style: {
                width: '160%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50.4%, -50.3%)',
                transition: 'opacity 1s ease-in-out',
            }
        },
        {
            src: "./img/9.jpeg",
            alt: "",
            className: "imgNine",
            style: {
                width: '140%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -45.55%)',
                transition: 'opacity 1s ease-in-out',
            }
        },
        {
            src: "./img/11.jpg",
            alt: "",
            className: "imgEleven",
            style: {
                width: '161%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-48.4%, -53.55%)',
                transition: 'opacity 1s ease-in-out',
            }
        },
    ];

    // Effect to change image every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
        }, 5000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, [imagesData.length]);

    return (
        <div className="App">
            <header>
                <div className="logo">SCENESTRA</div>
            </header>

            <div className="sectionWrap">
                {/* sectionLeft */}
                <section className="sectionLeft">
                    <div className="videoBox">
                        <video src="./img/casablanca.mp4" autoPlay muted loop playsInline></video>
                    </div>
                    <div className="imgBox">
                        {imagesData.map((image, index) => (
                            <img
                                key={image.className}
                                src={image.src}
                                alt={image.alt}
                                className={image.className}
                                style={{
                                    ...image.style,
                                    opacity: index === currentImageIndex ? 1 : 0,
                                    zIndex: index === currentImageIndex ? 700 - index : 600 - index,
                                }}
                            />
                        ))}
                    </div>
                </section>

                {/* sectionRight */}
                <section className="sectionRight">
                    <div className="rightWrap">
                        <form action="#" className="rightWrapTop">
                            <input type="text" placeholder="아이디" />
                            <input type="password" placeholder="비밀번호" />
                            <label htmlFor="rmbrId" className="rmbrIdLbl">
                                <input type="checkbox" id="rmbrId" />
                                <div className="chkBx">
                                    <div className="chkMk">L</div>
                                </div>
                                아이디 기억하기
                            </label>
                            <button type="submit">LOG IN</button>
                        </form>
                        <div className="rightWrapBot">
                            <a href="#">
                                <button>아이디/비밀번호 찾기</button>
                            </a>
                            <a href="#">
                                <button>회원가입</button>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Login
