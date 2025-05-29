import classes from "./AboutUs.module.css";
import React, { useState, useEffect } from "react";

function AboutUs() {
    const [fadeClass, setFadeClass] = useState('');
    const [ currentIndex, setCurrentIndex ] = useState(0);

const roomImg = [
    {id: 1, url: '/roomImg/room1.jpg'},
    {id: 2, url: '/roomImg/room2.jpg'},
    {id: 3, url: '/roomImg/room3.jpg'},
    {id: 4, url: '/roomImg/room4.jpg'}
];


    useEffect(() => {
        const interval = setInterval(() => {
            setFadeClass('fade-out'); // 페이드 아웃 시작

            setTimeout(() => {
                setCurrentIndex(prev => (prev + 1) % roomImg.length);
                setFadeClass('fade-in'); // 페이드 인 시작
            }, 250); // 0.25초 후 이미지 변경

            setTimeout(() => {
                setFadeClass(''); // 클래스 제거
            }, 500); // 0.5초 후 클래스 제거
        }, 3000);

        return () => clearInterval(interval);
    }, [roomImg.length]);

    return(
        <>
            <div className={classes.container}>
                {/*소개글*/}
                <div className={classes.about}>
                    <div className={classes.titleBox}>
                        <div className={classes.line}></div>
                        <h1 className={classes.title}>ABOUT SCENESTRA</h1>
                        <div className={classes.line}></div>
                    </div>
                    <div className={classes.descBox}>
                        <div className={classes.imgBox}>
                            <img
                                src={roomImg[currentIndex].url}
                                alt={`Room ${roomImg[currentIndex].id}`}
                                className={classes.fadeClass}
                            />
                        </div>
                        <div className={classes.scenestra}>
                            <div className={classes.headline}>
                                <img src= '/icon/clapperboard.png'  alt="" />
                                <p className={classes.subTitle}>SCENESTRA</p>
                            </div>
                        </div>
                    </div>
                </div>
            {/*    이용요금표*/}
                <div className={classes.price}>
                    <div className={classes.titleBox}>
                        <div className={classes.line}></div>
                        <h1 className={classes.title}>PRICING GUIDELINES</h1>
                        <div className={classes.line}></div>
                    </div>

                </div>
            {/*    이용수칙*/}
                <div className={classes.rules}>
                    <div className={classes.titleBox}>
                        <div className={classes.line}></div>
                        <h1 className={classes.title}>THEATER GUIDE</h1>
                        <div className={classes.line}></div>
                    </div>

                </div>
            </div>
        </>
    );
}
export default AboutUs;