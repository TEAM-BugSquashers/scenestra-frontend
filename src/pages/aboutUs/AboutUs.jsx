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
                            />
                        </div>
                        <div className={classes.scenestra}>
                            <div className={classes.iconTitle}>
                                <img src= '/icon/clapperboard.png'  alt="" />
                                <p className={classes.subTitle}>SCENESTRA</p>
                            </div>
                            <p>따뜻한 조명, 편안한 소파, 그리고 오롯이 나만의 시간을 위한 스크린.</p>
                            <p>SCENESTRA는 단 한명을 위한 몰입부터, 소중한 이들과의 특별한 순간까지</p>
                            <p> 1~10인을 위한 프라이빗 상영관 4개를 준비했습니다.</p>
                            <ul>
                                <li>1~3인용 상영관 2개 - 조용한 휴식을 위한 공간</li>
                                <li>4~5인용 상영관 1개 - 친구들과의 영화시간</li>
                                <li>6~10인용 상영관 1개 - 소규모 모임에 딱 맞는 공간</li>
                            </ul>
                            <div className={classes.iconTitle}>
                                <img src= '/icon/video-camera.png'  alt="" />
                                <p>대형 스크린과 돌비 애트모스 사운드</p>
                            </div>
                            <div className={classes.iconTitle}>
                                <img src= '/icon/wine.png'  alt="" />
                                <p>고급스러운 인테리어와 프라이버시 보장</p>
                            </div>
                            <b className={classes.bbb}>지금, 당신만의 시네마를 만나보세요.</b>
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
                    <div className={classes.tableBox}>
                        <table border="1" cellPadding="15" >
                            <thead>
                            <tr>
                                <th> </th>
                                <th>인원</th>
                                <th>요금(30분)</th>
                                <th>옵션</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th className={classes.name}>SERENE</th>
                                <td>1~3인</td>
                                <td>10,000</td>
                                <td>100인치 대형 스크린
                                    9.1ch스피커
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.name}>CELESTIA</th>
                                <td>1~3인</td>
                                <td>10,000</td>
                                <td>100인치 대형 스크린
                                    9.1ch스피커
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.name}>ASTRAL</th>
                                <td>4~5인</td>
                                <td>20,000</td>
                                <td>120인치 대형 스크린
                                    돌비 애트모스 스피커
                                </td>
                            </tr>
                            <tr>
                                <th className={classes.name}>VERDANT</th>
                                <td>6~10인</td>
                                <td>30,000</td>
                                <td>150인치 초대형 스크린
                                    돌비 애트모스 스피커
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <ul>
                            <li>이용시간: 이용 시간은 30분 단위로 적용되며, 최소 이용 시간은 2시간입니다.</li>
                            <li> 정원기준
                                <div>
                                    <ul>
                                        <li>SERENE / CELESTIA: 1~3인</li>
                                        <li>ASTRAL: 4~5인</li>
                                        <li>VERDANT: 6~10인</li>
                                    </ul>
                                    ※ 기준 인원을 초과할 경우 입장이 불가능합니다.
                                </div>
                            </li>
                            <li>예약 및 입장
                                <div>
                                    <ul>
                                        <li>당일 예약은 불가합니다. 반드시 사전 예약 후 이용해 주세요.</li>
                                        <li>예약할 때 </li>
                                    </ul>
                                </div>
                            </li>
                            <li>장비안내
                                <div>
                                    <ul>
                                        <li>전 객실 고화질 프로젝터 및 고성능 음향 시스템 완비</li>
                                        <li>개인 기기 연결(Bluetooth, HDMI 등) 가능 여부는 사전에 문의해 주세요.</li>
                                    </ul>
                                </div>
                            </li>
                            <li>결제방법: 예약 당시 안내 된 요금은 입장 시 현장에서 결제합니다.</li>
                        </ul>
                    </div>
                </div>
            {/*    이용수칙*/}
                <div className={classes.rules}>
                    <div className={classes.titleBox}>
                        <div className={classes.line}></div>
                        <h1 className={classes.title}>THEATER GUIDE</h1>
                        <div className={classes.line}></div>
                    </div>
                    <div className={classes.ruleGuide}>
                        <div className={classes.iconTitle}>
                            <img src= '/icon/protest.png'  alt="" />
                            <p className={classes.info}>프라이빗 상영관 이용 안내</p>
                        </div>
                        <div>
                            <p className={classes.rule}>공간 이용 및 에티켓</p>
                            <ul>
                                <li>상영관 내에서는 신발을 벗고 입장해 주세요. (슬리퍼가 제공됩니다.)</li>
                                <li>이용 후 쓰레기 및 개인 물품은 정리 부탁드립니다.</li>
                                <li>다음 고객님을 위해 쾌적한 환경 유지 및 정숙한 이용에 협조해 주세요.</li>
                            </ul>
                        </div>
                        <div>
                            <p className={classes.rule}>커스터마이징 및 장비 이용</p>
                            <ul>
                                <li>조명 밝기, 음향 크기 등은 요청 시 맞춤 조정이 가능합니다.</li>
                                <li>Bluetooth, HDMI 등 개인 기기 연결은 사전 문의 후 이용해 주세요.</li>
                                <li>시설 또는 장비 훼손 시, 수리 비용이 청구될 수 있습니다.</li>
                            </ul>
                        </div>
                        <div>
                            <p className={classes.rule}>프라이버시 및 보안</p>
                            <ul>
                                <li>고객님의 프라이버시를 위해 외부인의 출입은 엄격히 제한됩니다.</li>
                                <li>관 내 설치된 CCTV는 보안 목적에 한하여 최소한으로 운영됩니다.</li>
                            </ul>
                        </div>
                        <div>
                            <p className={classes.rule}>금지사항</p>
                            <ul>
                                <li>상영관 및 전 구역은 금연 구역입니다.</li>
                                <li>음주 상태의 입장은 제한될 수 있습니다.</li>
                                <li>무단 촬영, 저작권 위반 콘텐츠의 상영은 금지됩니다.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AboutUs;